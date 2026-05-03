# 📚 Agendo — Gerenciador Inteligente de Cronograma de Estudos

## 🧠 Visão Geral

O **Agendo** é uma aplicação web desenvolvida para auxiliar estudantes na criação e gerenciamento de **cronogramas de estudo personalizados e inteligentes**.

A principal proposta do sistema é resolver problemas comuns como:
- Falta de organização nos estudos.
- Dificuldade em distribuir matérias com pesos diferentes ao longo do tempo.
- Esquecimento de tarefas ou conteúdos.
- Baixa produtividade por falta de planejamento.

O Agendo utiliza um **Algoritmo de Pesos Dinâmicos** para gerar automaticamente um cronograma com base nas preferências, dificuldade e importância de cada matéria, ajudando a manter uma rotina de estudos eficiente, intercalada e equilibrada.

---

## 🏗️ Arquitetura (Monorepo)

O projeto segue uma arquitetura em camadas com separação clara entre o cliente, a API e a persistência de dados:

```text
[ React + Vite (Frontend Web) ]
            ↓ (JSON / JWT)
      [ API RESTful ]
            ↓
[ Spring Boot (Backend) ]
            ↓
   [ PostgreSQL (DB) ]
```

### 🔹 Frontend
- Desenvolvido com **React + TypeScript**
- Responsável pela interface do usuário e consumo da API REST
- **SEO dinâmico** com `react-helmet-async` (meta tags, Open Graph)
- HTML semântico e acessibilidade (`aria-labels`)
- Tema claro/escuro

### 🔹 Backend
- Desenvolvido com **Spring Boot**
- Responsável pela lógica de negócio, segurança (Spring Security/JWT) e algoritmo de geração
- Documentação interativa da API com **Swagger/OpenAPI 3** (`springdoc-openapi`)
- Gerenciamento de versionamento de banco com **Flyway**

### 🔹 Banco de Dados
- Armazena usuários, matérias, sessões de estudo (cronogramas) e configurações de cronograma

---

## 🗂️ Dicionário de Dados

### 👤 Usuário (`usuarios`)
| Campo        | Tipo      | Descrição            |
|--------------|-----------|----------------------|
| id           | Long      | Identificador único  |
| nome         | String    | Nome do usuário      |
| email        | String    | Email de login       |
| senha        | String    | Senha criptografada  |
| created_at   | Timestamp | Data de criação      |
| updated_at   | Timestamp | Data de atualização  |

---

### 📖 Matéria (`materias`)
| Campo        | Tipo     | Descrição                   |
|--------------|----------|-----------------------------| 
| id           | Long     | Identificador único         |
| nome         | String   | Nome da matéria             |
| dificuldade  | Integer  | Nível de dificuldade (1-10)  |
| importância  | Integer  | Peso da matéria (1-10)       |
| hex          | String   | Código hex da cor da tarefa |
| usuario_id   | Long     | Relação com o usuário       |

---

### 🗓️ Cronograma / Sessão de Estudo (`sessoes`)
| Campo        | Tipo     | Descrição                   |
|--------------|----------|-----------------------------| 
| id           | Long     | Identificador único         |
| data         | Date     | Data do estudo              |
| hora_inicio  | Time     | Horário de início do bloco  |
| hora_fim     | Time     | Horário de fim do bloco     |
| status       | String   | Status da sessão (`PENDENTE` / `CONCLUIDA`) |
| concluido    | Boolean  | Flag rápida de progresso    |
| materia_id   | Long     | Matéria associada           |
| usuario_id   | Long     | Dono do cronograma          |

---

### ⚙️ Configuração do Cronograma (`configuracoes_cronograma`)
| Campo        | Tipo      | Descrição                                |
|--------------|-----------|------------------------------------------|
| id           | Long      | Identificador único                      |
| data_limite  | Date      | Data limite para conclusão do cronograma |
| usuario_id   | Long      | Relação 1:1 com o usuário (UNIQUE)       |
| created_at   | Timestamp | Data de criação                          |
| updated_at   | Timestamp | Data de atualização                      |

**Tabelas auxiliares (@ElementCollection):**

| Tabela | Campos | Descrição |
|--------|--------|-----------|
| `configuracoes_cronograma_dias` | `configuracao_id`, `dia_semana` | Dias da semana disponíveis (1=Seg, 7=Dom) |
| `configuracoes_cronograma_turnos` | `configuracao_id`, `inicio`, `fim` | Turnos de estudo disponíveis |
| `configuracoes_cronograma_materias` | `configuracao_id`, `nome`, `dificuldade`, `importancia` | Snapshot das matérias configuradas |

---

## 🔌 Endpoints da API

### 🔑 Autenticação (`/auth`)
| Método | Endpoint          | Descrição                    | Auth |
|--------|-------------------|------------------------------|------|
| POST   | `/auth/login`     | Login com email e senha      | ❌   |
| POST   | `/auth/registrar` | Cadastro de novo usuário     | ❌   |

### 📅 Cronogramas (`/cronogramas`)
| Método | Endpoint                       | Descrição                                     | Auth |
|--------|--------------------------------|-----------------------------------------------|------|
| GET    | `/cronogramas`                 | Buscar sessões do cronograma do usuário        | ✅   |
| POST   | `/cronogramas/gerar`           | Gerar novo cronograma com base na configuração | ✅   |
| PATCH  | `/cronogramas/{id}/concluir`   | Alternar status de conclusão de uma sessão     | ✅   |

### ⚙️ Configuração (`/cronogramas/configuracao`)
| Método | Endpoint                        | Descrição                                              | Auth |
|--------|---------------------------------|--------------------------------------------------------|------|
| POST   | `/cronogramas/configuracao`     | Salvar ou atualizar a configuração do cronograma       | ✅   |
| GET    | `/cronogramas/configuracao`     | Buscar a última configuração salva do usuário           | ✅   |

> 📖 Documentação interativa disponível em `/swagger-ui.html` quando o backend está rodando.

---

## 🖥️ Páginas do Frontend

| Rota           | Página              | Descrição                                                    |
|----------------|----------------------|--------------------------------------------------------------|
| `/`            | Home                 | Landing page pública                                         |
| `/login`       | Login                | Autenticação de usuário                                      |
| `/cadastro`    | Cadastro             | Registro de novo usuário                                     |
| `/progresso`   | Progresso (Dashboard)| Visão geral de progresso e estatísticas                      |
| `/configurar`  | Configurar Plano     | Definir matérias, turnos, dias e data limite                 |
| `/cronograma`  | Cronograma           | Visualização do cronograma (dia/semana/mês) com controle de sessões |

---

## ⚙️ Stack Tecnológica

### 📱 Frontend
- TypeScript
- React
- Vite
- Tailwind CSS
- react-helmet-async (SEO)
- react-router-dom

### 🔙 Backend
- Java 21
- Spring Boot 3+
- Spring Security (JWT)
- springdoc-openapi (Swagger)
- Flyway
- Maven

### 🗄️ Banco de Dados
- PostgreSQL 

### 🛠️ DevOps
- Docker / Docker Compose 
---

## 🚀 Guia de Setup

### 🔧 Pré-requisitos
- Node.js instalado
- Java JDK 21
- Maven
- Git
- PostgreSQL rodando localmente

---

### 📥 Clonar o repositório
```bash
git clone https://github.com/luizamantovani/Projeto-Desenvolvimento-Web agendo
cd agendo
```

---

### ▶️ Rodar o Backend (Spring Boot)

Antes de iniciar, crie um arquivo .env na raiz do backend ou configure as variáveis de ambiente com as suas credenciais locais:

```Snippet
DB_USERNAME=postgres
DB_PASSWORD=sua_senha
DB_HOST=localhost
DB_PORT=5432
DB_NAME=agendo

SECRET_KEY=sua_chave_secreta_jwt

MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=seu_email@gmail.com
MAIL_PASSWORD=sua_app_password
```
Para rodar a aplicação:

```bash
cd backend
./mvnw spring-boot:run
```

Ou no Windows:
```bash
mvnw spring-boot:run
```

A API estará disponível em `http://localhost:8080`

---

### 📱 Rodar o Frontend (React)

```bash
cd frontend
npm install
npm run dev
```
O site estará disponível no endereço local fornecido pelo Vite (geralmente `http://localhost:5173`)

---

### 🐳 Executando com Docker Compose
Esta é a forma mais rápida de subir o ambiente completo.
Certifique-se de ter um arquivo .env na raiz do projeto configurado.

#### 1. Configurar o `.env`
Na raiz do projeto, criar um arquivo `.env` e inserir o seguinte substituindo os valores:
```
# Banco de Dados
DB_NAME=agendo
DB_USERNAME=postgres
DB_PASSWORD=sua_senha_segura
DB_PORT=5432

# Autenticação Backend
SECRET_KEY=sua_chave_secreta_jwt_aqui

# Configurações de E-mail (Backend)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=seu_email@gmail.com
MAIL_PASSWORD=sua_app_password

# Frontend
VITE_API_URL=http://localhost:8080
```

#### 2. Subir os Containers
No terminal, na raiz do projeto, execute:
```
docker compose up -d --build
```

#### 3. Configuração do Compose
O arquivo docker-compose.yml orquestra os seguintes serviços:
- db: PostgreSQL 16.
- backend: API Spring Boot (disponível em :8080).
- frontend: React + Nginx (disponível em :80).

#### 4. Encerrar o Ambiente
```
docker compose down
```

---

## 📂 Estrutura do Projeto

```
project/agendo/
├── backend/
│   └── src/main/java/com/devweb/agendo/
│       ├── config/          # Security, JWT, CORS
│       ├── controller/      # REST Controllers
│       ├── dto/             # Request/Response DTOs
│       ├── model/           # Entidades JPA
│       ├── repository/      # Repositórios Spring Data
│       └── service/         # Lógica de negócio
│   └── src/main/resources/
│       ├── db/migration/    # Migrations Flyway (V1, V2)
│       └── application.properties
├── frontend/
│   └── src/
│       ├── components/      # Componentes reutilizáveis
│       ├── pages/           # Páginas da aplicação
│       ├── service/         # Serviços de API (auth, configuração)
│       └── types/           # Tipos TypeScript
```

---

## 📌 Possíveis Melhorias Futuras

- [ ] Envio de notificações e resumo do cronograma por E-mail.
- [ ] Integração com o Google Calendar.
- [ ] Timer Pomodoro integrado aos blocos de estudo.
- [ ] IA (LLM) para analisar o cronograma gerado e fornecer mensagens de motivação pedagógica. 
