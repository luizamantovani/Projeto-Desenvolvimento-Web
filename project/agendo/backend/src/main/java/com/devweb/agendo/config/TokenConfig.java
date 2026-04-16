package com.devweb.agendo.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.devweb.agendo.model.Usuario;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Optional;

@Component
public class TokenConfig {

    private String secret = System.getenv("SECRET_KEY");

    public String generateToken(Usuario usuario) {
        return JWT.create()
                .withClaim("usuarioId", usuario.getId())
                .withSubject(usuario.getEmail())
                .withExpiresAt(Instant.now().plusSeconds(86400))
                .withIssuedAt(Instant.now())
                .sign(Algorithm.HMAC256(secret));
    }

    public Optional<JWTUserData> validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);

            DecodedJWT decodedJWT = JWT.require(algorithm).build().verify(token);

            return Optional.of(JWTUserData.builder()
                    .usuarioId(decodedJWT.getClaim("usuarioId").asLong())
                    .email(decodedJWT.getSubject())
                    .build());
            
        } catch (JWTVerificationException e) {
            return Optional.empty();
        }
    }
}
