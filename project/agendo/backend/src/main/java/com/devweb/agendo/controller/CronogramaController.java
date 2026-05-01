package com.devweb.agendo.controller;

import com.devweb.agendo.dto.request.GerarCronogramaRequest;
import com.devweb.agendo.dto.response.SessaoResponse;
import com.devweb.agendo.model.Materia;
import com.devweb.agendo.model.Sessao;
import com.devweb.agendo.model.Usuario;
import com.devweb.agendo.service.CronogramaService;
import com.devweb.agendo.service.SessaoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cronogramas")
public class CronogramaController {

    private final CronogramaService cronogramaService;

    private final SessaoService sessaoService;

    public CronogramaController(CronogramaService cronogramaService, SessaoService sessaoService) {
        this.cronogramaService = cronogramaService;
        this.sessaoService = sessaoService;
    }

    @GetMapping
    public ResponseEntity<List<SessaoResponse>> getCronograma(@AuthenticationPrincipal Usuario usuario) {
        List<Sessao> sessoes = cronogramaService.getCronograma(usuario);
        List<SessaoResponse> response = sessoes.stream()
                .map(s -> new SessaoResponse(
                        s.getId(),
                        s.getData(),
                        s.getHoraInicio(),
                        s.getHoraFim(),
                        s.isConcluido(),
                        s.getStatus().name(),
                        new SessaoResponse.MateriaResumo(
                                s.getMateria().getId(),
                                s.getMateria().getNome(),
                                s.getMateria().getHex()
                        )
                )).toList();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/gerar")
    public ResponseEntity<List<SessaoResponse>> gerarPlano(@RequestBody @Valid GerarCronogramaRequest request,
                                                           @AuthenticationPrincipal Usuario usuarioLogado) {

        List<Materia> materias = request.materias().stream().map(dto -> {
            Materia m = new Materia();
            m.setNome(dto.nome());
            m.setDificuldade(dto.dificuldade());
            m.setImportancia(dto.importancia());

            // Caso tenha implementado a cor HEX no DTO, descomente a linha abaixo:
            // m.setHex(dto.hex());

            m.setUsuario(usuarioLogado);
            return m;
        }).toList();

        List<CronogramaService.Turno> turnos = request.turnos().stream()
                .map(t -> new CronogramaService.Turno(t.inicio(), t.fim()))
                .toList();

        List<Sessao> cronograma = cronogramaService.gerarCronograma(
                usuarioLogado,
                materias,
                request.dataLimite(),
                request.diasSemanaDisponiveis(),
                turnos
        );

        List<SessaoResponse> response = cronograma.stream()
                .map(s -> new SessaoResponse(
                        s.getId(),
                        s.getData(),
                        s.getHoraInicio(),
                        s.getHoraFim(),
                        s.isConcluido(),
                        s.getStatus().name(),
                        new SessaoResponse.MateriaResumo(
                                s.getMateria().getId(),
                                s.getMateria().getNome(),
                                s.getMateria().getHex()
                        )
                )).toList();

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PatchMapping("/{id}/concluir")
    public ResponseEntity<Void> alternarStatus(@PathVariable Long id,
                                               @AuthenticationPrincipal Usuario usuarioLogado) {
        Long usuarioLogadoId = usuarioLogado.getId();

        sessaoService.alternarStatusConclusao(id, usuarioLogadoId);

        return ResponseEntity.noContent().build();
    }
}