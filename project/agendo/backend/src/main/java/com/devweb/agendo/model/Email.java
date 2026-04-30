package com.devweb.agendo.model;

public record Email (
        String to,
        String subject,
        String body
) {
}
