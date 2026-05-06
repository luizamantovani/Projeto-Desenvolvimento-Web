package com.devweb.agendo.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RedefinirSenhaRequest(
        @NotBlank(message = "O token não pode estar vazio")
        String token,
        
        @NotBlank(message = "A nova senha não pode estar vazia")
        @Size(min = 6, message = "A senha deve ter pelo menos 6 caracteres")
        String novaSenha
) {}
