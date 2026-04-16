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
- Desenvolvido com **React Native**
- Responsável pela interface do usuário
- Consome a API REST

### 🔹 Backend
- Desenvolvido com **Spring Boot**
- Responsável pela lógica de negócio
- Geração e gerenciamento dos cronogramas

### 🔹 Banco de Dados
- Armazena usuários, matérias e cronogramas

---

## 🗂️ Dicionário de Dados

### 👤 Usuário
| Campo        | Tipo      | Descrição            |
|--------------|-----------|----------------------|
| id           | Long      | Identificador único  |
| nome         | String    | Nome do usuário      |
| email        | String    | Email de login       |
| senha        | String    | Senha criptografada  |
| role         | String    | Nivel de acesso      |
| created_at   | Timestamp | Data de criação      |

---

### 📖 Matéria
| Campo        | Tipo     | Descrição                   |
|--------------|----------|-----------------------------|
| id           | Long     | Identificador único         |
| nome         | String   | Nome da matéria             |
| dificuldade  | Integer  | Nível de dificuldade (1-5)  |
| importância  | Integer  | Peso da matéria (1-5)       |
| cor_rex      | String   | Código hex da cor da tarefa |
| dificuldade  | Integer  | Nível de dificuldade (1-5)  |
| usuario_id   | Long     | Relação com o usuário       |

---

### 🗓️ Cronograma
| Campo        | Tipo     | Descrição                   |
|--------------|----------|-----------------------------|
| id           | Long     | Identificador único         |
| data         | Date     | Data do estudo              |
| hora_inicio  | Time     | Horário de inicio do bloco  |
| hora_fim     | Time     | Horário de fim do bloco     |
| status       | Long     | Identificador único         |
| concluido    | Boolean  | Flag rápida de progresso    |
| materia_id   | Long     | Matéria associada           |
| usuario_id   | Long     | Dono do cronograma          |

---

## ⚙️ Stack Tecnológica

### 📱 Frontend
- React
- Vite
- Tailwind CSS 

### 🔙 Backend
- Java 21
- Spring Boot 3+
- Spring Security
- Maven

### 🗄️ Banco de Dados
- PostgreSQL 

---

## 🚀 Guia de Setup

### 🔧 Pré-requisitos
- Node.js instalado
- Java JDK 21
- Maven
- Git
- PostgresSQL rodando localmente

---

### 📥 Clonar o repositório
```bash
git clone [https://github.com/seu-usuario/agendo.git](https://github.com/luizamantovani/Projeto-Desenvolvimento-Web)
cd agendo
```

---

### ▶️ Rodar o Backend (Spring Boot)

```bash
cd backend
./mvnw spring-boot:run
```

Ou no Windows:
```bash
mvnw spring-boot:run
```

A API estará disponível em:
```
http://localhost:8080
```

---

### 📱 Rodar o Frontend (React Native)

```bash
cd frontend
npm install
npx expo start
```

---

## 📌 Melhorias Futuras

[ ] Envio de notificações e resumo do cronograma por E-mail.
[ ] Integração com o Google Calendar.
[ ] Timer Pomodoro integrado aos blocos de estudo.
[ ] IA (LLM) para analisar o cronograma gerado e fornecer mensagens de motivação pedagógica. 
