package com.devweb.agendo.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "configuracoes_cronograma")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class ConfiguracaoCronograma {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "data_limite", nullable = false)
    private LocalDate dataLimite;

    @OneToOne
    @JoinColumn(name = "usuario_id", nullable = false, unique = true)
    private Usuario usuario;

    @ElementCollection
    @CollectionTable(
            name = "configuracoes_cronograma_dias",
            joinColumns = @JoinColumn(name = "configuracao_id")
    )
    @Column(name = "dia_semana")
    private List<Integer> diasSemanaDisponiveis;

    @ElementCollection
    @CollectionTable(
            name = "configuracoes_cronograma_turnos",
            joinColumns = @JoinColumn(name = "configuracao_id")
    )
    private List<TurnoEmbeddable> turnos;

    @ElementCollection
    @CollectionTable(
            name = "configuracoes_cronograma_materias",
            joinColumns = @JoinColumn(name = "configuracao_id")
    )
    private List<MateriaEmbeddable> materias;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
