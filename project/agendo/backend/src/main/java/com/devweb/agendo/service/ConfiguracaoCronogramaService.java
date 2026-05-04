package com.devweb.agendo.service;

import com.devweb.agendo.dto.request.ConfiguracaoCronogramaRequest;
import com.devweb.agendo.dto.response.ConfiguracaoCronogramaResponse;
import com.devweb.agendo.model.ConfiguracaoCronograma;
import com.devweb.agendo.model.MateriaEmbeddable;
import com.devweb.agendo.model.TurnoEmbeddable;
import com.devweb.agendo.model.Usuario;
import com.devweb.agendo.repository.ConfiguracaoCronogramaRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ConfiguracaoCronogramaService {

    private final ConfiguracaoCronogramaRepository repository;

    public ConfiguracaoCronogramaService(ConfiguracaoCronogramaRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public ConfiguracaoCronograma salvar(Usuario usuario, ConfiguracaoCronogramaRequest request) {
        ConfiguracaoCronograma config = repository.findByUsuarioId(usuario.getId())
                .orElse(new ConfiguracaoCronograma());

        config.setUsuario(usuario);
        config.setDataLimite(request.dataLimite());

        config.setDiasSemanaDisponiveis(request.diasSemanaDisponiveis());

        config.setTurnos(
                request.turnos().stream()
                        .map(t -> new TurnoEmbeddable(t.inicio(), t.fim()))
                        .toList()
        );

        config.setMaterias(
                request.materias().stream()
                        .map(m -> new MateriaEmbeddable(m.nome(), m.dificuldade(), m.importancia(), m.hex()))
                        .toList()
        );

        return repository.save(config);
    }

    public Optional<ConfiguracaoCronogramaResponse> buscarPorUsuario(Usuario usuario) {
        return repository.findByUsuarioId(usuario.getId())
                .map(config -> new ConfiguracaoCronogramaResponse(
                        config.getDataLimite(),
                        config.getDiasSemanaDisponiveis(),
                        config.getTurnos().stream()
                                .map(t -> new ConfiguracaoCronogramaResponse.TurnoResponse(t.getInicio(), t.getFim()))
                                .toList(),
                        config.getMaterias().stream()
                                .map(m -> new ConfiguracaoCronogramaResponse.MateriaResponse(m.getNome(), m.getDificuldade(), m.getImportancia(), m.getHex()))
                                .toList()
                ));
    }
}
