package com.devweb.agendo.controller;

import com.devweb.agendo.dto.request.GerarCronogramaRequest;
import com.devweb.agendo.dto.response.SessaoResponse;
import com.devweb.agendo.model.Materia;
import com.devweb.agendo.model.Sessao;
import com.devweb.agendo.model.Usuario;
import com.devweb.agendo.service.CronogramaService;
import com.devweb.agendo.service.SessaoService;
import jakarta.validation.Valid;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cronogramas")
@Tag(name = "Cronogramas", description = "Endpoints para gerenciamento do cronograma de estudos do usuário")
@SecurityRequirement(name = "bearer-jwt")
public class CronogramaController {

    private final CronogramaService cronogramaService;

    private final SessaoService sessaoService;

    public CronogramaController(CronogramaService cronogramaService, SessaoService sessaoService) {
        this.cronogramaService = cronogramaService;
        this.sessaoService = sessaoService;
    }

    @Operation(summary = "Buscar cronograma", description = "Retorna a lista de sessões de estudo (cronograma) do usuário autenticado.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Cronograma retornado com sucesso."),
            @ApiResponse(responseCode = "401", description = "Usuário não autenticado."),
            @ApiResponse(responseCode = "403", description = "Acesso proibido.")
    })
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

    @Operation(summary = "Gerar novo cronograma", description = "Gera um novo plano de estudos com base nas matérias, turnos e disponibilidade fornecidos pelo usuário autenticado.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Cronograma gerado com sucesso."),
            @ApiResponse(responseCode = "400", description = "Requisição inválida (ex: dados incompletos ou inconsistentes)."),
            @ApiResponse(responseCode = "401", description = "Usuário não autenticado."),
            @ApiResponse(responseCode = "403", description = "Acesso proibido.")
    })
    @PostMapping("/gerar")
    public ResponseEntity<List<SessaoResponse>> gerarPlano(@RequestBody @Valid GerarCronogramaRequest request,
                                                           @AuthenticationPrincipal Usuario usuarioLogado) {

        List<Materia> materias = request.materias().stream().map(dto -> {
            Materia m = new Materia();
            m.setNome(dto.nome());
            m.setDificuldade(dto.dificuldade());
            m.setImportancia(dto.importancia());

            m.setHex(dto.hex() != null ? dto.hex() : "#3B82F6");

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

    @Operation(summary = "Alternar status de conclusão da sessão", description = "Alterna o status de conclusão de uma sessão de estudo específica (pelo ID) para o usuário autenticado.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Status alterado com sucesso (sem conteúdo de retorno)."),
            @ApiResponse(responseCode = "401", description = "Usuário não autenticado."),
            @ApiResponse(responseCode = "403", description = "Acesso proibido."),
            @ApiResponse(responseCode = "404", description = "Sessão não encontrada.")
    })
    @PatchMapping("/{id}/concluir")
    public ResponseEntity<Void> alternarStatus(@PathVariable Long id,
                                               @AuthenticationPrincipal Usuario usuarioLogado) {
        Long usuarioLogadoId = usuarioLogado.getId();

        sessaoService.alternarStatusConclusao(id, usuarioLogadoId);

        return ResponseEntity.noContent().build();
    }
}