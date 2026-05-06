package com.devweb.agendo.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record EsqueciSenhaRequest(
        @NotBlank(message = "O email não pode estar vazio")
        @Email(message = "Email inválido")
        String email
) {}
