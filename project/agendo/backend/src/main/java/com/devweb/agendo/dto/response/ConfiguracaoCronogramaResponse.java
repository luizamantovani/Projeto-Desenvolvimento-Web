package com.devweb.agendo.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Schema(description = "Resposta com a configuração do cronograma salva pelo usuário")
public record ConfiguracaoCronogramaResponse(

        @Schema(description = "Data limite para conclusão do cronograma", example = "2024-12-31")
        LocalDate dataLimite,

        @Schema(description = "Dias da semana disponíveis para estudo", example = "[1, 2, 3, 4, 5]")
        List<Integer> diasSemanaDisponiveis,

        @Schema(description = "Lista de turnos de estudo")
        List<TurnoResponse> turnos,

        @Schema(description = "Lista de matérias")
        List<MateriaResponse> materias
) {
    @Schema(description = "Turno de estudo")
    public record TurnoResponse(
            @Schema(description = "Hora de início do turno", example = "08:00:00")
            LocalTime inicio,
            @Schema(description = "Hora de fim do turno", example = "12:00:00")
            LocalTime fim
    ) {}

    @Schema(description = "Matéria de estudo")
    public record MateriaResponse(
            @Schema(description = "Nome da matéria", example = "Matemática")
            String nome,
            @Schema(description = "Nível de dificuldade", example = "7")
            int dificuldade,
            @Schema(description = "Nível de importância", example = "9")
            int importancia,
            @Schema(description = "Cor hexadecimal da matéria", example = "#3B82F6")
            String hex
    ) {}
}
