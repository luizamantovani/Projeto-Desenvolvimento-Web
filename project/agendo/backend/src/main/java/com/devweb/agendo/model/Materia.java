package com.devweb.agendo.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "materias")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Materia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private int dificuldade;

    private int importancia;

    private String hex;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

}
