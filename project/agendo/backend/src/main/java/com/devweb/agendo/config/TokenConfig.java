package com.devweb.agendo.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.devweb.agendo.model.Usuario;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Component
public class TokenConfig  {

    private String secret = System.getenv("SECRET_KEY");

    public String generateToken(Usuario usuario) {
        return JWT.create()
                .withClaim("usuarioId", usuario.getId())
                .withSubject(usuario.getEmail())
                .withExpiresAt(Instant.now().plusSeconds(86400))
                .withIssuedAt(Instant.now())
                .sign(Algorithm.HMAC256(secret));
    }
}
