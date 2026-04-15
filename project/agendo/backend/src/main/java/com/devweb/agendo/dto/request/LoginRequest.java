package com.devweb.agendo.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;

public record LoginRequest(
        @NotEmpty(message = "E-mail é obrigatório") @Email String email,
        @NotEmpty(message = "Senha é obrigatória") String senha
) {
}
