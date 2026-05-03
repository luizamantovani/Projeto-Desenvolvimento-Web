CREATE TABLE configuracoes_cronograma
(
    id          BIGSERIAL PRIMARY KEY,
    data_limite DATE NOT NULL,
    usuario_id  BIGINT NOT NULL UNIQUE,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_config_usuario
        FOREIGN KEY (usuario_id)
            REFERENCES usuarios (id)
            ON DELETE CASCADE
);

CREATE TABLE configuracoes_cronograma_dias
(
    configuracao_id BIGINT  NOT NULL,
    dia_semana      INTEGER NOT NULL,

    CONSTRAINT fk_dias_configuracao
        FOREIGN KEY (configuracao_id)
            REFERENCES configuracoes_cronograma (id)
            ON DELETE CASCADE
);

CREATE TABLE configuracoes_cronograma_turnos
(
    configuracao_id BIGINT NOT NULL,
    inicio          TIME   NOT NULL,
    fim             TIME   NOT NULL,

    CONSTRAINT fk_turnos_configuracao
        FOREIGN KEY (configuracao_id)
            REFERENCES configuracoes_cronograma (id)
            ON DELETE CASCADE
);

CREATE TABLE configuracoes_cronograma_materias
(
    configuracao_id BIGINT       NOT NULL,
    nome            VARCHAR(255) NOT NULL,
    dificuldade     INTEGER      NOT NULL CHECK (dificuldade BETWEEN 1 AND 10),
    importancia     INTEGER      NOT NULL CHECK (importancia BETWEEN 1 AND 10),

    CONSTRAINT fk_materias_configuracao
        FOREIGN KEY (configuracao_id)
            REFERENCES configuracoes_cronograma (id)
            ON DELETE CASCADE
);
