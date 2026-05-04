package com.devweb.agendo.model;

import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MateriaEmbeddable {
    private String nome;
    private int dificuldade;
    private int importancia;
}
