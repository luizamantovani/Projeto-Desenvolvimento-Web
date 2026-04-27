package com.devweb.agendo.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public record GerarCronogramaRequest(

        @NotNull(message = "A data limite é obrigatória.")
        LocalDate dataLimite,

        @NotEmpty(message = "Selecione ao menos um dia da semana disponível.")
        List<Integer> diasSemanaDisponiveis, // [1, 2, 3, 4, 5] para seg a sex

        @NotEmpty(message = "Defina os turnos de estudo.")
        @Valid
        List<TurnoRequest> turnos,

        @NotEmpty(message = "Adicione as matérias.")
        @Valid
        List<MateriaRequest> materias

) {
    public record TurnoRequest(
            @NotNull(message = "A hora de início é obrigatória.")
            LocalTime inicio,

            @NotNull(message = "A hora de fim é obrigatória.")
            LocalTime fim
    ) {}

    public record MateriaRequest(
            @NotBlank(message = "O nome da matéria não pode estar vazio.")
            String nome,
            
            @Min(value = 1, message = "A dificuldade mínima é 1 (Fácil).")
            @Max(value = 10, message = "A dificuldade máxima é 10 (Difícil).")
            Integer dificuldade,

            // A nova abordagem do slider
            @Min(value = 1, message = "A importância mínima é 1.")
            @Max(value = 10, message = "A importância máxima é 10.")
            Integer importancia
    ) {}
}