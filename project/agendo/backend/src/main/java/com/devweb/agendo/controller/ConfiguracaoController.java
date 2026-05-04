package com.devweb.agendo.controller;

import com.devweb.agendo.dto.request.ConfiguracaoCronogramaRequest;
import com.devweb.agendo.dto.response.ConfiguracaoCronogramaResponse;
import com.devweb.agendo.model.Usuario;
import com.devweb.agendo.service.ConfiguracaoCronogramaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cronogramas/configuracao")
@Tag(name = "Configuração do Cronograma", description = "Endpoints para salvar e recuperar a configuração do cronograma do usuário")
@SecurityRequirement(name = "bearer-jwt")
public class ConfiguracaoController {

    private final ConfiguracaoCronogramaService service;

    public ConfiguracaoController(ConfiguracaoCronogramaService service) {
        this.service = service;
    }

    @Operation(summary = "Salvar configuração", description = "Salva ou atualiza a configuração do cronograma para o usuário autenticado.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Configuração salva com sucesso."),
            @ApiResponse(responseCode = "400", description = "Requisição inválida."),
            @ApiResponse(responseCode = "401", description = "Usuário não autenticado.")
    })
    @PostMapping
    public ResponseEntity<Void> salvar(@RequestBody @Valid ConfiguracaoCronogramaRequest request,
                                       @AuthenticationPrincipal Usuario usuario) {
        service.salvar(usuario, request);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Buscar configuração", description = "Retorna a última configuração de cronograma salva pelo usuário autenticado.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Configuração retornada com sucesso."),
            @ApiResponse(responseCode = "204", description = "Nenhuma configuração encontrada."),
            @ApiResponse(responseCode = "401", description = "Usuário não autenticado.")
    })
    @GetMapping
    public ResponseEntity<ConfiguracaoCronogramaResponse> buscar(@AuthenticationPrincipal Usuario usuario) {
        return service.buscarPorUsuario(usuario)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.noContent().build());
    }
}
