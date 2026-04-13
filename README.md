# 📚 Agendo — Gerenciador Inteligente de Cronograma de Estudos

## 🧠 Visão Geral

O **Agendo** é um aplicativo mobile desenvolvido para auxiliar estudantes na criação e gerenciamento de **cronogramas de estudo personalizados**.

A principal proposta do sistema é resolver problemas comuns como:
- Falta de organização nos estudos  
- Dificuldade em distribuir matérias ao longo do tempo  
- Esquecimento de tarefas ou conteúdos  
- Baixa produtividade por falta de planejamento  

O Agendo gera automaticamente um cronograma com base nas preferências do usuário, ajudando a manter uma rotina eficiente e equilibrada.

---

## 🏗️ Arquitetura

O projeto segue uma arquitetura em camadas com separação entre frontend, backend e persistência de dados:

```
[ React Native (Frontend) ]
            ↓
      [ API REST ]
            ↓
[ Spring Boot (Backend) ]
            ↓
     [ Banco de Dados ]
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
| Campo        | Tipo     | Descrição            |
|--------------|----------|----------------------|
| id           | Long     | Identificador único  |
| nome         | String   | Nome do usuário      |
| email        | String   | Email de login       |
| senha        | String   | Senha criptografada  |

---

### 📖 Matéria
| Campo        | Tipo     | Descrição                   |
|--------------|----------|-----------------------------|
| id           | Long     | Identificador único         |
| nome         | String   | Nome da matéria             |
| dificuldade  | Integer  | Nível de dificuldade (1-5)  |
| usuario_id   | Long     | Relação com o usuário       |

---

### 🗓️ Cronograma
| Campo        | Tipo     | Descrição                   |
|--------------|----------|-----------------------------|
| id           | Long     | Identificador único         |
| data         | Date     | Data do estudo              |
| materia_id   | Long     | Matéria associada           |
| duracao      | Integer  | Tempo de estudo (minutos)   |
| usuario_id   | Long     | Dono do cronograma          |

---

## ⚙️ Stack Tecnológica

### 📱 Frontend
- React Native
- Expo 

### 🔙 Backend
- Java 17+
- Spring Boot 3+
- Maven

### 🗄️ Banco de Dados
- PostgreSQL 

---

## 🚀 Guia de Setup

### 🔧 Pré-requisitos
- Node.js instalado
- Java JDK 17+
- Maven
- Git
- Banco de dados configurado

---

### 📥 Clonar o repositório
```bash
git clone https://github.com/seu-usuario/agendo.git
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

- Notificações de estudo  
- Integração com calendário (Google Calendar)  
- Sistema de metas e desempenho  
- IA para sugestão de horários ideais  
