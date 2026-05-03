package com.devweb.agendo.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Resumo do usuário retornado no login")
public record UsuarioLoginResponse(
        @Schema(description = "ID do usuário", example = "1")
        Long id,
        @Schema(description = "Nome do usuário", example = "João da Silva")
        String nome, 
        @Schema(description = "E-mail do usuário", example = "joao@teste.com")
        String email) {

}
