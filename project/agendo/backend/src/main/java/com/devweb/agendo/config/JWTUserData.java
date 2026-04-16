package com.devweb.agendo.config;

import lombok.Builder;

@Builder
public record JWTUserData(
        Long usuarioId,
        String email
) {
}
