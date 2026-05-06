package com.devweb.agendo.controller;

import com.devweb.agendo.config.TokenConfig;
import com.devweb.agendo.dto.request.LoginRequest;
import com.devweb.agendo.dto.request.RegistroUsuarioRequest;
import com.devweb.agendo.dto.request.EsqueciSenhaRequest;
import com.devweb.agendo.dto.request.RedefinirSenhaRequest;
import com.devweb.agendo.config.JWTUserData;
import java.util.Optional;

import com.devweb.agendo.dto.response.LoginResponse;
import com.devweb.agendo.dto.response.RegistrarUsuarioResponse;
import com.devweb.agendo.dto.response.UsuarioLoginResponse;
import com.devweb.agendo.model.Email;
import com.devweb.agendo.model.Usuario;
import com.devweb.agendo.repository.SessaoRepository;
import com.devweb.agendo.repository.UsuarioRepository;
import com.devweb.agendo.service.EmailService;
import jakarta.validation.Valid;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "Autenticação", description = "Endpoints para gerenciamento de login e registro de usuários")
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

    @Operation(summary = "Realizar login", description = "Autentica o usuário com base no e-mail e senha informados, retornando um token JWT caso as credenciais sejam válidas.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Login realizado com sucesso. Retorna o token JWT e os dados básicos do usuário."),
            @ApiResponse(responseCode = "400", description = "Requisição inválida (ex: campos obrigatórios faltando)."),
            @ApiResponse(responseCode = "401", description = "Credenciais inválidas (não autorizado)."),
            @ApiResponse(responseCode = "403", description = "Acesso proibido.")
    })
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

    @Operation(summary = "Registrar novo usuário", description = "Cria um novo usuário na aplicação e envia um e-mail de boas-vindas.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Usuário registrado com sucesso."),
            @ApiResponse(responseCode = "400", description = "Requisição inválida (ex: campos obrigatórios faltando ou e-mail já em uso).")
    })
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

    @Operation(summary = "Solicitar recuperação de senha", description = "Gera um token de recuperação (mock) e envia um e-mail de recuperação caso o usuário exista.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Solicitação processada com sucesso."),
            @ApiResponse(responseCode = "400", description = "Requisição inválida.")
    })
    @PostMapping("/esqueci-senha")
    public ResponseEntity<String> esqueciSenha(@Valid @RequestBody EsqueciSenhaRequest request) {
        usuarioRepository.findUserByEmail(request.email()).ifPresent(userDetails -> {
            Usuario usuario = (Usuario) userDetails;
            String token = tokenConfig.generateToken(usuario);
            emailService.sendPasswordRecoveryEmail(usuario.getEmail(), token);
        });
        return ResponseEntity.ok("Se o e-mail existir em nossa base de dados, um link de recuperação foi enviado.");
    }

    @Operation(summary = "Redefinir senha", description = "Redefine a senha do usuário utilizando o token JWT enviado para o e-mail.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Senha redefinida com sucesso."),
            @ApiResponse(responseCode = "400", description = "Token inválido, expirado ou usuário não encontrado.")
    })
    @PostMapping("/redefinir-senha")
    public ResponseEntity<String> redefinirSenha(@Valid @RequestBody RedefinirSenhaRequest request) {
        Optional<JWTUserData> userData = tokenConfig.validateToken(request.token());
        if (userData.isEmpty()) {
            return ResponseEntity.badRequest().body("Token inválido ou expirado.");
        }
        
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(userData.get().usuarioId());
        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Usuário não encontrado.");
        }
        
        Usuario usuario = usuarioOpt.get();
        usuario.setSenha(passwordEncoder.encode(request.novaSenha()));
        usuarioRepository.save(usuario);
        
        return ResponseEntity.ok("Senha redefinida com sucesso.");
    }
}
