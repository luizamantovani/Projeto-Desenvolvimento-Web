package com.devweb.agendo.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Resposta após o registro de um novo usuário")
public record RegistrarUsuarioResponse(
        @Schema(description = "Nome do usuário registrado", example = "João da Silva")
        String nome,
        @Schema(description = "E-mail do usuário registrado", example = "joao@teste.com")
        String email
) {
}
