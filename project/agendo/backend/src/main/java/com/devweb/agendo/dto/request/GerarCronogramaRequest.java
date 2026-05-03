package com.devweb.agendo.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Schema(description = "Requisição para gerar um novo cronograma de estudos")
public record GerarCronogramaRequest(

        @Schema(description = "Data limite para conclusão do cronograma", example = "2024-12-31")
        @NotNull(message = "A data limite é obrigatória.")
        LocalDate dataLimite,

        @Schema(description = "Dias da semana disponíveis para estudo (1=Segunda, 7=Domingo)", example = "[1, 2, 3, 4, 5]")
        @NotEmpty(message = "Selecione ao menos um dia da semana disponível.")
        List<Integer> diasSemanaDisponiveis, // [1, 2, 3, 4, 5] para seg a sex

        @Schema(description = "Lista de turnos de estudo disponíveis")
        @NotEmpty(message = "Defina os turnos de estudo.")
        @Valid
        List<TurnoRequest> turnos,

        @Schema(description = "Lista de matérias para incluir no cronograma")
        @NotEmpty(message = "Adicione as matérias.")
        @Valid
        List<MateriaRequest> materias

) {
    @Schema(description = "Definição de um turno de estudo")
    public record TurnoRequest(
            @Schema(description = "Hora de início do turno", example = "08:00:00", type = "string", format = "time")
            @NotNull(message = "A hora de início é obrigatória.")
            LocalTime inicio,

            @Schema(description = "Hora de fim do turno", example = "12:00:00", type = "string", format = "time")
            @NotNull(message = "A hora de fim é obrigatória.")
            LocalTime fim
    ) {}

    @Schema(description = "Definição de uma matéria para estudo")
    public record MateriaRequest(
            @Schema(description = "Nome da matéria", example = "Matemática")
            @NotBlank(message = "O nome da matéria não pode estar vazio.")
            String nome,
            
            @Schema(description = "Nível de dificuldade da matéria (1 a 10)", example = "7")
            @Min(value = 1, message = "A dificuldade mínima é 1 (Fácil).")
            @Max(value = 10, message = "A dificuldade máxima é 10 (Difícil).")
            Integer dificuldade,

            // A nova abordagem do slider
            @Schema(description = "Nível de importância da matéria (1 a 10)", example = "9")
            @Min(value = 1, message = "A importância mínima é 1.")
            @Max(value = 10, message = "A importância máxima é 10.")
            Integer importancia
    ) {}
}