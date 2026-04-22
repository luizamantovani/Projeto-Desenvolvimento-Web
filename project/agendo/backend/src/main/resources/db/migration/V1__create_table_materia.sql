CREATE TABLE materias
(
    id          SERIAL PRIMARY KEY,
    nome        VARCHAR(255) NOT NULL,
    dificuldade INTEGER      NOT NULL,
    importancia INTEGER      NOT NULL,
    cor_hex     VARCHAR(7),
    usuario_id  BIGINT       NOT NULL,


    CONSTRAINT check_dificuldade CHECK (dificuldade BETWEEN 1 AND 10),
    CONSTRAINT check_importancia CHECK (importancia BETWEEN 1 AND 5),

    CONSTRAINT fk_usuario_materia
        FOREIGN KEY (usuario_id)
            REFERENCES usuarios (id)
            ON DELETE CASCADE
);