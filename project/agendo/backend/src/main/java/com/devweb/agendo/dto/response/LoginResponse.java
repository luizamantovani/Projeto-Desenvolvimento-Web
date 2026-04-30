package com.devweb.agendo.dto.response;

public record LoginResponse(
        String token,
        UsuarioLoginResponse usuarioLoginResponse,
        Boolean possuiCronograma) {
}

