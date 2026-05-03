package com.devweb.agendo.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Resposta de sucesso após o login")
public record LoginResponse(
        @Schema(description = "Token JWT para autenticação", example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
        String token,
        @Schema(description = "Dados do usuário autenticado")
        UsuarioLoginResponse usuarioLoginResponse,
        @Schema(description = "Indica se o usuário já possui um cronograma gerado", example = "true")
        Boolean possuiCronograma) {
}
