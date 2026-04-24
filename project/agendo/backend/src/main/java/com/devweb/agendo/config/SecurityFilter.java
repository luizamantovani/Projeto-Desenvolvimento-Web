package com.devweb.agendo.config;

import com.devweb.agendo.model.Usuario;
import com.devweb.agendo.repository.UsuarioRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.logging.log4j.util.Strings;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

@Component
public class SecurityFilter extends OncePerRequestFilter {

    private final TokenConfig tokenConfig;
    private final UsuarioRepository usuarioRepository;

    public SecurityFilter(TokenConfig tokenConfig, UsuarioRepository usuarioRepository) {
        this.tokenConfig = tokenConfig;
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String authorizedHeader = request.getHeader("Authorization");

        if (Strings.isNotEmpty(authorizedHeader) && authorizedHeader.startsWith("Bearer ")) {
            String token = authorizedHeader.substring("Bearer ".length());
            Optional<JWTUserData> optUser = tokenConfig.validateToken(token);

            if (optUser.isPresent()) {
                JWTUserData jwtUserData = optUser.get();

                Usuario usuario = (Usuario) usuarioRepository.findUserByEmail(jwtUserData.email())
                        .orElseThrow(() -> new RuntimeException("Usuário não encontrado no token"));

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(usuario, null, usuario.getAuthorities());

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }

        filterChain.doFilter(request, response);
    }
}
