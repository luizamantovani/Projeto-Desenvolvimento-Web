package com.devweb.agendo.controller;

import com.devweb.agendo.dto.request.GerarCronogramaRequest;
import com.devweb.agendo.dto.response.SessaoResponse;
import com.devweb.agendo.model.Materia;
import com.devweb.agendo.model.Sessao;
import com.devweb.agendo.model.Usuario;
import com.devweb.agendo.service.CronogramaService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/cronogramas")
public class CronogramaController {

    private final CronogramaService cronogramaService;

    public CronogramaController(CronogramaService cronogramaService) {
        this.cronogramaService = cronogramaService;
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
                        s.getConcluido(),
                        s.getStatus().name(),
                        new SessaoResponse.MateriaResumo(
                                s.getMateria().getId(),
                                s.getMateria().getNome(),
                                s.getMateria().getHex()
                        )
                )).toList();

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}