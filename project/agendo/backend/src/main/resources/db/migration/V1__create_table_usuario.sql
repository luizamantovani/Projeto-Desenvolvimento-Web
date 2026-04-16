CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY, -- Identificador único (PK) [cite: 743]
    nome VARCHAR(255) NOT NULL, -- Nome do usuário [cite: 743]
    email VARCHAR(255) NOT NULL UNIQUE, -- Email de login (Unique) [cite: 744]
    senha VARCHAR(255) NOT NULL, -- Senha criptografada (BCrypt) [cite: 744]
    role VARCHAR(50) DEFAULT 'ROLE_USER', -- Nível de acesso [cite: 744, 745]
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Data de criação da conta [cite: 745]
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Data da última atualização [cite: 745]
);