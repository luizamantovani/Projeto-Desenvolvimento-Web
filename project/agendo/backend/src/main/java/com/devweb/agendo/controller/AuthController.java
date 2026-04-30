package com.devweb.agendo.controller;

import com.devweb.agendo.config.TokenConfig;
import com.devweb.agendo.dto.request.LoginRequest;
import com.devweb.agendo.dto.request.RegistroUsuarioRequest;
import com.devweb.agendo.dto.response.LoginResponse;
import com.devweb.agendo.dto.response.RegistrarUsuarioResponse;
import com.devweb.agendo.dto.response.UsuarioLoginResponse;
import com.devweb.agendo.model.Email;
import com.devweb.agendo.model.Usuario;
import com.devweb.agendo.repository.SessaoRepository;
import com.devweb.agendo.repository.UsuarioRepository;
import com.devweb.agendo.service.EmailService;
import jakarta.validation.Valid;
//import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UsuarioRepository usuarioRepository;
    private final SessaoRepository sessaoRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final TokenConfig tokenConfig;
    private final EmailService emailService;

    public AuthController(UsuarioRepository usuarioRepository, SessaoRepository sessaoRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, TokenConfig tokenConfig, EmailService emailService) {
        this.usuarioRepository = usuarioRepository;
        this.sessaoRepository = sessaoRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.tokenConfig = tokenConfig;
        this.emailService = emailService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(request.email(), request.senha());
        Authentication authentication = authenticationManager.authenticate(authToken);

        Usuario usuario = (Usuario) authentication.getPrincipal();
        String token = tokenConfig.generateToken(usuario);

        UsuarioLoginResponse usuarioLoginResponse = new UsuarioLoginResponse(usuario.getId(), usuario.getNome(), usuario.getEmail());
        Boolean possuiCronograma = sessaoRepository.existsSessaoByUsuario(usuario);
        return ResponseEntity.ok(new LoginResponse(token, usuarioLoginResponse,  possuiCronograma));

//        ResponseCookie cookie = ResponseCookie.from("token", token)
//                .httpOnly(true)
//                .secure(true)
//                .path("/")
//                .maxAge(7 * 24 * 60 * 60) // 7 dias
//                .sameSite("Strict")
//                .build();

//        return ResponseEntity.ok()
//                .header(HttpHeaders.SET_COOKIE, cookie.toString())
//                .body(new LoginResponse(token));
    }

    @PostMapping("/registrar")
    public ResponseEntity<RegistrarUsuarioResponse> registrarUsuario(@Valid @RequestBody RegistroUsuarioRequest request) {
        Usuario novoUsuario = new Usuario();
        novoUsuario.setNome(request.nome());
        novoUsuario.setEmail(request.email());
        novoUsuario.setSenha(passwordEncoder.encode(request.senha()));
        usuarioRepository.save(novoUsuario);

        Email email = new Email(
                novoUsuario.getEmail(),
                "Bem-vindo ao Agendo!",
                novoUsuario.getNome()
        );
        emailService.sendEmail(email);

        return ResponseEntity.status(HttpStatus.CREATED).body(new RegistrarUsuarioResponse(novoUsuario.getNome(), novoUsuario.getEmail()));
    }
}
