CREATE TABLE usuarios (
                          id         SERIAL PRIMARY KEY,
                          nome       VARCHAR(255) NOT NULL,
                          email      VARCHAR(255) NOT NULL UNIQUE,
                          senha      VARCHAR(255) NOT NULL,
                          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE materias (
                          id BIGSERIAL PRIMARY KEY,
                          nome VARCHAR(255) NOT NULL,
                          dificuldade INTEGER NOT NULL CHECK (dificuldade BETWEEN 1 AND 3),
                          importancia INTEGER NOT NULL CHECK (importancia BETWEEN 1 AND 10),
                          hex VARCHAR(7),
                          usuario_id BIGINT NOT NULL,

                          CONSTRAINT fk_materias_usuario
                              FOREIGN KEY (usuario_id)
                                  REFERENCES usuarios(id)
                                  ON DELETE CASCADE
);

CREATE TABLE sessoes (
                         id BIGSERIAL PRIMARY KEY,
                         data DATE NOT NULL,
                         hora_inicio TIME NOT NULL,
                         hora_fim TIME NOT NULL,
                         concluido BOOLEAN DEFAULT FALSE,
                         status VARCHAR(20) NOT NULL,
                         materia_id BIGINT NOT NULL,
                         usuario_id BIGINT NOT NULL,

                         CONSTRAINT fk_sessoes_materia
                             FOREIGN KEY (materia_id)
                                 REFERENCES materias(id)
                                 ON DELETE CASCADE,

                         CONSTRAINT fk_sessoes_usuario
                             FOREIGN KEY (usuario_id)
                                 REFERENCES usuarios(id)
                                 ON DELETE CASCADE
);