package com.devweb.agendo.service;

import com.devweb.agendo.model.Materia;
import com.devweb.agendo.model.Sessao;
import com.devweb.agendo.model.Usuario;
import com.devweb.agendo.model.enums.StatusTarefa;
import com.devweb.agendo.repository.MateriaRepository;
import com.devweb.agendo.repository.SessaoRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CronogramaService {

    private static final int TEMPO_ESTUDO_MIN = 50;
    private static final int TEMPO_PAUSA_MIN = 15;
    private static final int TEMPO_SESSAO_ESTUDO = TEMPO_ESTUDO_MIN + TEMPO_PAUSA_MIN;

    private final MateriaRepository materiaRepository;
    private final SessaoRepository sessaoRepository;

    public CronogramaService(MateriaRepository materiaRepository, SessaoRepository sessaoRepository) {
        this.materiaRepository = materiaRepository;
        this.sessaoRepository = sessaoRepository;
    }

    public List<Sessao> getCronograma(Usuario usuario) {
        return sessaoRepository.findByUsuarioIdAndDataAfterOrderByDataAscHoraInicioAsc(usuario.getId(), LocalDate.now().minusDays(1));
    }

    /**
     * Gera o cronograma distribuindo as matérias até a data limite e SALVA na base de dados.
     */
    @Transactional
    public List<Sessao> gerarCronograma(Usuario usuario,
                                        List<Materia> materias,
                                        LocalDate dataLimite,
                                        List<Integer> diasSemanaDisponiveis,
                                        List<Turno> turnosDisponiveis) {

        List<Sessao> sessoesGeradas = new ArrayList<>();


        sessaoRepository.deleteByUsuarioIdAndDataAfter(usuario.getId(), LocalDate.now().minusDays(0));

        List<Materia> materiasParaSalvar = new ArrayList<>();
        for (Materia materia : materias) {
            materia.setUsuario(usuario);

            Materia materiaExistente = materiaRepository.findByUsuarioIdAndNome(usuario.getId(), materia.getNome());
            if (materiaExistente != null) {
                materiaExistente.setNome(materia.getNome());
                materiaExistente.setDificuldade(materia.getDificuldade());
                materiaExistente.setImportancia(materia.getImportancia());
                materiaExistente.setHex(materia.getHex());
                materiasParaSalvar.add(materiaExistente);
            } else {
                materiasParaSalvar.add(materia);
            }
        }

        List<Materia> materiasSalvas = materiaRepository.saveAll(materiasParaSalvar);

        // Calcula a lista de dias úteis com base na Data Limite e nos dias marcados
        List<LocalDate> datasCalculadas = calcularDatasNoIntervalo(
                LocalDate.now(),
                dataLimite,
                diasSemanaDisponiveis
        );

        // Mapear todos os "espaços" vazios
        List<SlotTempo> slotsVazios = mapearSlotsDisponiveis(datasCalculadas, turnosDisponiveis);
        int totalBlocosDisponiveis = slotsVazios.size();

        if (totalBlocosDisponiveis == 0 || materiasSalvas.isEmpty()) {
            return sessoesGeradas;
        }

        // Trava de Segurança (Fail Fast)
        if (totalBlocosDisponiveis < materiasSalvas.size()) {
            throw new IllegalArgumentException(
                    "Tempo insuficiente! Tem apenas " + totalBlocosDisponiveis + " blocos de estudo disponíveis no " +
                            "período, " +
                            "mas cadastrou " + materiasSalvas.size() + " matérias. Aumente o prazo ou o tempo diário " +
                            "de estudo."
            );
        }

        // Calcular a distribuição de blocos (Algoritmo de Pesos)
        Map<Materia, Integer> distribuicao = calcularDistribuicaoDeBlocos(materiasSalvas, totalBlocosDisponiveis);

        // Preencher os slots (Interleaving)
        preencherSlotsIntercalados(usuario, distribuicao, slotsVazios, sessoesGeradas);

        return sessaoRepository.saveAll(sessoesGeradas);
    }

    /**
     * Gera todas as datas entre hoje e o limite que casam com os dias da semana escolhidos.
     */
    private List<LocalDate> calcularDatasNoIntervalo(LocalDate inicio, LocalDate fim, List<Integer> diasPermitidos) {
        List<LocalDate> datas = new ArrayList<>();
        LocalDate atual = inicio;

        while (!atual.isAfter(fim)) {
            // getDayOfWeek().getValue() retorna 1 (Segunda) a 7 (Domingo)
            if (diasPermitidos.contains(atual.getDayOfWeek().getValue())) {
                datas.add(atual);
            }
            atual = atual.plusDays(1);
        }
        return datas;
    }

    private List<SlotTempo> mapearSlotsDisponiveis(List<LocalDate> dias, List<Turno> turnos) {
        List<SlotTempo> slots = new ArrayList<>();

        for (LocalDate data : dias) {
            for (Turno turno : turnos) {
                LocalTime horaAtual = turno.inicio();
                LocalTime limiteTurno = turno.fim();

                long minutosDisponiveis = java.time.Duration.between(horaAtual, limiteTurno).toMinutes();

                if (minutosDisponiveis < 0) {
                    minutosDisponiveis += 24 * 60;
                }

                long minutosGastos = 0;

                while (minutosGastos + TEMPO_ESTUDO_MIN <= minutosDisponiveis) {

                    LocalTime horaFimFoco = horaAtual.plusMinutes(TEMPO_ESTUDO_MIN);
                    slots.add(new SlotTempo(data, horaAtual, horaFimFoco));

                    horaAtual = horaAtual.plusMinutes(TEMPO_SESSAO_ESTUDO);
                    minutosGastos += TEMPO_SESSAO_ESTUDO;
                }
            }
        }
        return slots;
    }

    private Map<Materia, Integer> calcularDistribuicaoDeBlocos(List<Materia> materias, int totalBlocos) {
        Map<Materia, Integer> distribuicao = new HashMap<>();

        double pesoTotal = materias.stream()
                .mapToDouble(m -> m.getDificuldade() * m.getImportancia())
                .sum();

        int blocosDistribuidos = 0;

        for (Materia m : materias) {
            double pesoMateria = m.getDificuldade() * m.getImportancia();
            double proporcao = pesoMateria / pesoTotal;
            int blocosDaMateria = (int) Math.round(proporcao * totalBlocos);

            if (blocosDaMateria == 0) blocosDaMateria = 1;

            distribuicao.put(m, blocosDaMateria);
            blocosDistribuidos += blocosDaMateria;
        }

        ajustarDiferencaArredondamento(materias, distribuicao, totalBlocos, blocosDistribuidos);
        return distribuicao;
    }

    private void preencherSlotsIntercalados(Usuario usuario, Map<Materia, Integer> distribuicao,
                                            List<SlotTempo> slotsVazios, List<Sessao> sessoesGeradas) {

        Materia ultimaMateriaAgendada = null;

        for (SlotTempo slot : slotsVazios) {
            Materia materiaEscolhida = escolherProximaMateria(distribuicao, ultimaMateriaAgendada);

            if (materiaEscolhida != null) {
                distribuicao.put(materiaEscolhida, distribuicao.get(materiaEscolhida) - 1);

                Sessao sessao = new Sessao();
                sessao.setUsuario(usuario);
                sessao.setMateria(materiaEscolhida);
                sessao.setData(slot.data());
                sessao.setHoraInicio(slot.inicio());
                sessao.setHoraFim(slot.fim());
                sessao.setStatus(StatusTarefa.PENDENTE);
                sessao.setConcluido(false);

                sessoesGeradas.add(sessao);
                ultimaMateriaAgendada = materiaEscolhida;
            }
        }
    }

    private Materia escolherProximaMateria(Map<Materia, Integer> distribuicao, Materia ultimaMateria) {
        return distribuicao.entrySet().stream()
                .filter(entry -> entry.getValue() > 0)
                .sorted((e1, e2) -> {
                    if (e1.getKey().equals(ultimaMateria)) return 1;
                    if (e2.getKey().equals(ultimaMateria)) return -1;
                    return e2.getValue().compareTo(e1.getValue());
                })
                .map(Map.Entry::getKey)
                .findFirst()
                .orElse(null);
    }

    private void ajustarDiferencaArredondamento(List<Materia> materias, Map<Materia, Integer> distribuicao,
                                                int totalBlocos, int blocosDistribuidos) {
        int diferenca = totalBlocos - blocosDistribuidos;

        if (diferenca != 0) {
            materias.sort((m1, m2) -> Integer.compare(
                    m2.getDificuldade() * m2.getImportancia(),
                    m1.getDificuldade() * m1.getImportancia()
            ));

            int index = 0;
            int maxIteracoes = totalBlocos * 2;
            int iteracoesAtuais = 0;

            while (diferenca > 0 && iteracoesAtuais < maxIteracoes) {
                Materia m = materias.get(index % materias.size());
                distribuicao.put(m, distribuicao.get(m) + 1);
                diferenca--;
                index++;
                iteracoesAtuais++;
            }

            while (diferenca < 0 && iteracoesAtuais < maxIteracoes) {
                Materia m = materias.get(index % materias.size());
                if (distribuicao.get(m) > 1) {
                    distribuicao.put(m, distribuicao.get(m) - 1);
                    diferenca++;
                }
                index++;
                iteracoesAtuais++;
            }
        }
    }

    public record Turno(LocalTime inicio, LocalTime fim) {
    }

    private record SlotTempo(LocalDate data, LocalTime inicio, LocalTime fim) {
    }
}