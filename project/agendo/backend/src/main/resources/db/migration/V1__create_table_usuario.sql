CREATE TABLE usuarios (
    id         SERIAL PRIMARY KEY,                  -- Identificador único (PK)
    nome       VARCHAR(255) NOT NULL,               -- Nome do usuário
    email      VARCHAR(255) NOT NULL UNIQUE,        -- Email de login (Unique)
    senha      VARCHAR(255) NOT NULL,               -- Senha criptografada (BCrypt)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Data de criação da conta
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Data da última atualização
);