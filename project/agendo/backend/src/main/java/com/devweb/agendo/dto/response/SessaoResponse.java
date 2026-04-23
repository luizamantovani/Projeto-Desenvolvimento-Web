package com.devweb.agendo.dto.response;

import java.time.LocalDate;
import java.time.LocalTime;

public record SessaoResponse(
        Long id,
                             LocalDate data,
                             LocalTime horaInicio,
                             LocalTime horaFim,
                             Boolean concluido,
                             String status,
                             MateriaResumo materia
) {
    public record MateriaResumo(
            Long id,
            String nome,
            String hex
    ) {
    }
}
