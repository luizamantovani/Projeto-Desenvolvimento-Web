package com.devweb.agendo.config;

import com.devweb.agendo.repository.UsuarioRepository;
import org.jspecify.annotations.NonNull;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AuthConfig implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;

    public AuthConfig(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public UserDetails loadUserByUsername(@NonNull String username) throws UsernameNotFoundException {
        return usuarioRepository.findUserByEmail(username).orElseThrow(() -> new UsernameNotFoundException(username));
    }
}
