package com.devweb.agendo.model;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.time.LocalTime;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TurnoEmbeddable {
    private LocalTime inicio;
    private LocalTime fim;
}
