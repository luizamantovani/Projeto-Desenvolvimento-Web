package com.devweb.agendo.service;

import com.devweb.agendo.model.Email;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class EmailService {

    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    @Value("${spring.mail.username}")
    private String remetente;

    public EmailService(JavaMailSender mailSender, TemplateEngine templateEngine) {
        this.mailSender = mailSender;
        this.templateEngine = templateEngine;
    }

    @Async
    public void sendEmail(Email email) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            Context context = new Context();

            context.setVariable("nomeUsuario", email.body());

            String htmlTemplate = templateEngine.process("email-template", context);

            helper.setFrom(remetente);
            helper.setTo(email.to());
            helper.setSubject(email.subject());
            helper.setText(htmlTemplate, true);

            mailSender.send(message);

            System.out.println("Email enviado com sucesso!");

        } catch (MessagingException e) {
            System.err.println("Falha ao enviar e-mail: " + e.getMessage());
            throw new RuntimeException("Erro ao enviar e-mail", e);
        }
    }
}
