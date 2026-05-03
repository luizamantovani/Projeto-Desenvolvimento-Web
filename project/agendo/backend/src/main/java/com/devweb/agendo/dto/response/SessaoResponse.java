package com.devweb.agendo.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDate;
import java.time.LocalTime;

@Schema(description = "Resposta contendo os detalhes de uma sessão de estudo")
public record SessaoResponse(
        @Schema(description = "ID da sessão", example = "1")
        Long id,
        @Schema(description = "Data da sessão", example = "2024-10-15")
        LocalDate data,
        @Schema(description = "Hora de início da sessão", example = "08:00:00", type = "string", format = "time")
        LocalTime horaInicio,
        @Schema(description = "Hora de fim da sessão", example = "10:00:00", type = "string", format = "time")
        LocalTime horaFim,
        @Schema(description = "Indica se a sessão foi concluída", example = "false")
        Boolean concluido,
        @Schema(description = "Status atual da sessão", example = "PENDENTE")
        String status,
        @Schema(description = "Resumo da matéria associada à sessão")
        MateriaResumo materia
) {
    @Schema(description = "Resumo da matéria")
    public record MateriaResumo(
            @Schema(description = "ID da matéria", example = "1")
            Long id,
            @Schema(description = "Nome da matéria", example = "Matemática")
            String nome,
            @Schema(description = "Cor hexadecimal associada à matéria", example = "#FF5733")
            String hex
    ) {
    }
}
