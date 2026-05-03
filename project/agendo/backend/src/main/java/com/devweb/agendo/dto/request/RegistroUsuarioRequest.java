package com.devweb.agendo.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;

@Schema(description = "Requisição para registro de um novo usuário")
public record RegistroUsuarioRequest(
        @Schema(description = "Nome do usuário", example = "João da Silva")
        @NotEmpty(message = "Nome é obrigatório") String nome,
        @Schema(description = "E-mail do usuário", example = "joao@teste.com")
        @NotEmpty(message = "E-mail é obrigatório") @Email String email,
        @Schema(description = "Senha do usuário", example = "senhaForte123")
        @NotEmpty(message = "Senha é obrigatória") String senha
) {
}
