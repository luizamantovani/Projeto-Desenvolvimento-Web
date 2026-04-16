package com.devweb.agendo.controller;

import com.devweb.agendo.config.TokenConfig;
import com.devweb.agendo.dto.request.LoginRequest;
import com.devweb.agendo.dto.request.RegistroUsuarioRequest;
import com.devweb.agendo.dto.response.LoginResponse;
import com.devweb.agendo.dto.response.RegistrarUsuarioResponse;
import com.devweb.agendo.model.Usuario;
import com.devweb.agendo.repository.UsuarioRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final TokenConfig tokenConfig;

    public AuthController(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, TokenConfig tokenConfig) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.tokenConfig = tokenConfig;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(request.email(), request.senha());
        Authentication authentication = authenticationManager.authenticate(authToken);

        Usuario usuario = (Usuario) authentication.getPrincipal();
        String token = tokenConfig.generateToken(usuario);

        return ResponseEntity.ok(new LoginResponse(token));
    }

    @PostMapping("/registrar")
    public ResponseEntity<RegistrarUsuarioResponse> registrarUsuario(@Valid @RequestBody RegistroUsuarioRequest request) {
        Usuario novoUsuario = new Usuario();
        novoUsuario.setNome(request.nome());
        novoUsuario.setEmail(request.email());
        novoUsuario.setSenha(passwordEncoder.encode(request.senha()));

        usuarioRepository.save(novoUsuario);

        return ResponseEntity.status(HttpStatus.CREATED).body(new RegistrarUsuarioResponse(novoUsuario.getNome(), novoUsuario.getEmail()));
    }
}
