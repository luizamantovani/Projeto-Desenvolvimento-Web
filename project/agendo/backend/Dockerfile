# Etapa 1: Build
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Aproveita o cache do Docker para as dependências do Maven
COPY pom.xml .
RUN mvn dependency:go-offline

# Copia o código e compila
COPY src ./src
RUN mvn clean package -DskipTests

# Etapa 2: Execução (Runtime)
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Cria um grupo e um usuário sem privilégios administrativos
RUN addgroup -S agendogroup && adduser -S agendouser -G agendogroup

# Copia o .jar da etapa de build já trocando a propriedade para o novo usuário
COPY --chown=agendouser:agendogroup --from=build /app/target/*.jar app.jar

# Define que o container vai rodar com o usuário criado (e não como root)
USER agendouser:agendogroup

EXPOSE 8080

# O uso do 'exec' garante que o Spring Boot receba os sinais de shutdown corretamente
ENTRYPOINT ["sh", "-c", "exec java -jar app.jar"]