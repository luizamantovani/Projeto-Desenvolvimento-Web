package com.devweb.agendo.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
@Tag(name = "Teste de Segurança", description = "Endpoint simples para testar a proteção das rotas que exigem autenticação")
@SecurityRequirement(name = "bearer-jwt")
public class TestController {

    @Operation(summary = "Testar rota protegida", description = "Retorna uma mensagem de sucesso se o token JWT for válido.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Acesso autorizado. Retorna a mensagem de teste."),
            @ApiResponse(responseCode = "401", description = "Usuário não autenticado (token inválido ou ausente)."),
            @ApiResponse(responseCode = "403", description = "Acesso proibido.")
    })
    @GetMapping
    public String test() {
        return "Testando Segurança";
    }
}
