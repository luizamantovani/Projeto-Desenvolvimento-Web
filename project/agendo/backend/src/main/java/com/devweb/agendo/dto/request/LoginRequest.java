package com.devweb.agendo.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;

@Schema(description = "Requisição para login de usuário")
public record LoginRequest(
        @Schema(description = "E-mail do usuário", example = "usuario@teste.com")
        @NotEmpty(message = "E-mail é obrigatório") @Email String email,
        @Schema(description = "Senha do usuário", example = "senha123")
        @NotEmpty(message = "Senha é obrigatória") String senha
) {
}
