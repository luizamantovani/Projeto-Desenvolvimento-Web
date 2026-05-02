# Roteiro de Apresentação: Agendo

## Visão Geral do Projeto

O **Agendo** é uma aplicação web moderna e inteligente voltada para estudantes que buscam otimizar suas rotinas de estudos. O principal objetivo da plataforma é resolver problemas de desorganização e falta de planejamento na hora de estudar, criando um ecossistema focado na eficiência e produtividade. Através de um algoritmo interno de pesos dinâmicos, o Agendo permite que o usuário cadastre suas matérias, classifique o grau de dificuldade e a importância de cada uma, e defina os horários em que está disponível para estudar. Com essas informações, o sistema gera automaticamente um cronograma equilibrado, distribuindo blocos de estudos de forma inteligente ao longo da semana. Além disso, a aplicação acompanha o progresso do usuário, fornecendo indicadores claros sobre sua evolução nas disciplinas. A solução foi arquitetada utilizando React no frontend, Spring Boot com PostgreSQL no backend e empacotada em contêineres utilizando Docker.

---

## Mapeamento de Requisitos (Checklist Acadêmico)

Abaixo detalhamos **ONDE** e **COMO** os requisitos obrigatórios foram implementados no projeto:

* **`README.md` documentando o projeto:** 
  O documento principal está devidamente localizado na raiz do projeto (`Projeto-Desenvolvimento-Web/README.md`) e aborda exaustivamente a visão geral, a arquitetura do monorepo (frontend, backend, banco de dados), o dicionário de dados, a stack tecnológica e fornece um guia prático de setup para os desenvolvedores e professores.
* **O site deve ser responsivo (desktop, tablet e celular):** 
  A responsividade foi assegurada utilizando os breakpoints utilitários do framework Tailwind CSS (`sm:`, `md:`, `lg:`). Na página inicial (`frontend/src/pages/Home.tsx`), as seções e grades colapsam de um layout horizontal para vertical em telas menores. O painel administrativo (`DashboardLayout.tsx`) oculta sua barra lateral, transformando-a de forma inteligente em um menu sanduíche mobile adaptável.
* **Incluir um menu interativo:** 
  A plataforma dispõe de múltiplos menus interativos. Na `Home.tsx`, há links e âncoras de navegação que deslizam pela landing page e botões dinâmicos de chamada para ação ("Começar Agora"). No ambiente logado do painel (`DashboardLayout.tsx`), existe uma "sidebar" interativa onde o usuário navega instantaneamente sem recarregar a página através do módulo de roteamento do React (`<Link>` e `useLocation` controlando as marcações de abas ativas).
* **Aplicar boas práticas de SEO:** 
  Implementado tanto diretamente no `frontend/index.html` (que define as metatags primordiais de `viewport`, atributos idiomáticos `lang="pt-br"` e a tag `<title>` amigável) quanto através de uma semântica HTML minuciosa no React. Componentes como `<header>`, `<nav>`, `<section>`, `<footer>` e a hierarquia ininterrupta de tags de título (`<h1>`, `<h2>`, `<h3>` em `Home.tsx`) foram usados para garantir rastreabilidade impecável pelos *web crawlers* dos mecanismos de busca.
* **Utilizar armazenamento local (Ex: LocalStorage):** 
  O uso nativo do `localStorage` do navegador é amplo. Na autenticação em `Login.tsx`, as chaves do token JWT e as informações do perfil do usuário são estocadas com segurança (`localStorage.setItem('@Agendo:token', ...)`). Essa técnica se estende no `ThemeToggle.tsx`, onde a customização do usuário entre modo claro e escuro (Light/Dark Mode) é permanentemente guardada para aprimorar a UX nas próximas sessões.
* **Ter pelo menos 5 funcionalidades:**
  1. **Cadastro e Gestão de Contas (`Cadastro.tsx`):** Registro formal de usuários com fluxo criptografado de dados no servidor e recepção do respectivo JWT token de acesso.
  2. **Configuração Qualitativa de Matérias (`ConfigurarPlano.tsx`):** Os estudantes podem elencar disciplinas e definir suas propriedades usando sliders finos de percepção de dificuldade e prioridade, engatando também seus horários vagos.
  3. **Geração Dinâmica do Cronograma de Estudos (`Cronograma.tsx`):** Cálculos interativos e representações baseadas na manipulação do DOM e via CSS/Inline Styles para renderizar de forma fluida os blocos exatos de tempo numa tabela temporal vertical similar a um calendário.
  4. **Acompanhamento Visual de Progresso (`Progresso.tsx`):** Uma tela dedicada como Dashboard de relatórios, exibindo estatísticas, o volume de sessões passadas concluídas e percentuais de assimilação na interface do usuário de forma clara.
  5. **Modo Claro / Escuro Inteligente (`ThemeToggle.tsx`):** Alternância completa do tema de interface da web app, construída aproveitando as classes `dark:` do Tailwind e o `matchMedia` do window de sistema.
* **Consumir pelo menos uma API externa e exibir os dados:** 
  Em se tratando de arquitetura dissociada (SPA vs API REST), do ponto de vista da aplicação cliente React, a comunicação base faz-se com uma "API Externa" provida pelo Backend em Spring Boot. O Front-end utiliza amplamente a Fetch API assíncrona do JavaScript padrão (`fetch` dentro de arquivos vitais como o `authService.ts` e `Cronograma.tsx`) para puxar o esquema, horários e estado das aulas através de GETs do endereço parametrizado da variável `VITE_API_URL`, desconstruindo o JSON de resposta e renderizando esse material consumido de forma dinâmica em tela. Concomitantemente o Frontend realiza requisições HTTPS para CDNs globais a fim de baixar a estilização das Google Fonts e bibliotecas de iconografia sem sobrecarregar seu pacote.
* **Adicionar funcionalidade de envio de email:** 
  Completamente operacional e integrada no backend através do `EmailService` no backend. Ao ocorrer a criação de uma nova conta pelo front, a classe `AuthController` engatilha este serviço, o qual formatará e despachará confiavelmente um e-mail automatizado via SMTP com o conteúdo de boas-vindas e confirmação na caixa real do novo aluno, servindo como uma notificação transacional autêntica.
* **Ter um sistema de login e logout (simulado ou real):** 
  Um sistema puramente real e protegido por rotas privadas no React. Todo o mecanismo foi blindado com a emissão e leitura do JWT Token (Spring Security). O login apura os valores pelo formulário na interface, submete com segurança a API e aloca o Token gerado no `LocalStorage`. O logout (posicionado na navegação superior do `DashboardLayout.tsx`) anula as sessões do LocalStorage, efetuando o descarte do token e ejetando o usuário compulsoriamente via redirecionamento ao login, blindando a área administrativa.
* **Realizar o Deploy do Projeto:** 
  O deploy abrangente da aplicação foi concluído subindo os serviços numa Máquina Virtual na **Oracle Cloud**. Como ferramenta facilitadora formidável dessa orquestração adotamos o **Docker Compose**. Evidenciamos que o arquivo estrutural, o `docker-compose.yml`, está propositalmente alojado **na raiz absoluta do projeto** (`Projeto-Desenvolvimento-Web/docker-compose.yml`), encarregado de virtualizar os sub-ambientes para o banco de dados PostgreSQL, efetuar o build estático e serviço de roteamento reverso para o React Front-end e executar o Java Spring Boot de backend sob containers interconectados confiavelmente na rede do Docker.

---

## Roteiro de Apresentação (Slide a Slide)

### Slide 1: Título e Apresentação Inicial
* **Tópicos Visuais:**
  * Logo elegante da plataforma Agendo.
  * Título central: "Agendo - Gerenciador Inteligente de Cronograma de Estudos".
  * Nome do apresentador, instituição e disciplina.
* **Fala do Apresentador (Script):**
  "Olá a todos. É com muito orgulho que nossa equipe apresenta hoje o Agendo, o nosso novo Gerenciador Inteligente de Cronograma de Estudos. Muitos estudantes, tanto no ensino médio quanto no nível universitário, sofrem diariamente com a desorganização: muitas vezes eles não sabem o que estudar, quando iniciar seus horários de estudos, ou acabam dando mais atenção do que deveriam às matérias fáceis e negligenciando perigosamente as disciplinas difíceis. Para sanar de vez essa dor, criamos o Agendo. Nossa plataforma web foca essencialmente em criar um ambiente digital que automatiza a montagem da sua rotina e fornece um estudo balanceado, equilibrando seus horários dinamicamente sem que você precise preencher planilhas maçantes."

### Slide 2: Identificação do Problema e Nossa Abordagem (Home Responsiva)
* **Tópicos Visuais:**
  * Pontos chave sobre dores comuns dos alunos (desorganização, desmotivação, sobrecarga).
  * Exibição visual animada da "Landing Page" (Home), ressaltando a estética da tela principal tanto na versão Desktop quanto na visão do smartphone.
* **Fala do Apresentador (Script):**
  "Para entendermos o peso desse projeto, precisamos enxergar o problema diário: a falta de tempo não é a grande inimiga do estudante, e sim a gestão ineficaz dele. A nossa abordagem técnica de solução partiu do zero para uma Landing Page de alto poder de conversão. A tela que vocês veem nas imagens conta com marcação HTML semântica e SEO cuidadosamente redigido. Mas não apenas isso, construímos o site pensando primariamente no uso Mobile, em telas menores, fazendo com que ele seja 100% responsivo através de classes utilitárias do Tailwind CSS. O aluno que deseja utilizar nosso produto muitas vezes entra de um celular dentro do ônibus a caminho do colégio, portanto o design se colapsa graciosamente assegurando que ele já entenda imediatamente a premissa e clique no botão de ação da plataforma."

### Slide 3: Arquitetura Tecnológica por Trás do Software
* **Tópicos Visuais:**
  * Diagrama de Arquitetura do Software (React conectando-se a API Java Spring Boot via Fetch, e então ao Banco de dados Postgres).
  * Menção técnica a LocalStorage e JWT.
* **Fala do Apresentador (Script):**
  "Por baixo dessa beleza visual, temos uma arquitetura forte de sistemas distribuídos e comunicação fluida. Escolhemos o React em arquitetura de Single Page Application. Ele propicia uma navegação rápida, em que telas como o nosso painel do usuário rodam com um menu lateral interativo que não força reinicialização em tempo de troca de rotas. Para gerenciar os dados da sessão, utilizamos intensamente a persistência do próprio navegador através do LocalStorage. Como lidamos com dados sensíveis, a comunicação usa tokens temporários JWT enviados por requisições Fetch diretas à nossa própria API externa baseada em Java Spring Boot, que processa a lógica densa de negócio antes de guardar no banco PostgreSQL."

### Slide 4: Realizando o Cadastro, Notificação e Segurança
* **Tópicos Visuais:**
  * Telas dos Formulários de Cadastro e Login e o Tema Claro/Escuro intercalando.
  * Ícone que representa o envio de uma notificação por e-mail no ato do cadastro.
* **Fala do Apresentador (Script):**
  "A base para oferecer suporte contínuo ao estudo dos usuários foi estabelecer um sistema real e altamente funcional de login e logout para resguardar a navegação. Assim que o aluno adentra pelo formulário e clica no registro, efetuamos a criação do perfil e criptografia segura da senha do lado do servidor. Nesse mesmíssimo momento do cadastro de conta, integramos uma funcionalidade automatizada em nosso backend de envio de e-mails usando Java Mail Sender por SMTP. O aluno, dentro de segundos após confirmar a intenção no front-end, já recebe na sua caixa de correspondência um e-mail customizado com as boas-vindas oficiais do ecossistema Agendo, firmando aquele primeiro engajamento confiável da aplicação web com as caixas de entrada de mundo real."

### Slide 5: Explorando as 5 Grandes Funcionalidades Interativas
* **Tópicos Visuais:**
  * Composição com miniaturas das páginas exclusivas do sistema (Configurar Plano, Visualizador de Cronograma interativo em colunas de horas, Dashboard de Progresso com botões interativos).
* **Fala do Apresentador (Script):**
  "A essência e valor de uso de todo o projeto explodem ao ingressar na área restrita. O estudante recebe logo de cara um ecossistema com 5 funcionalidades imersivas e ativas: Em primeiro plano, a edição de Perfil e as sessões geridas num ambiente restrito por login. O aluno então navega para configurar as matérias num painel super dinâmico de sliders determinando os pesos e importâncias, definindo disponibilidades diárias no calendário. Após registrar as demandas, ele requisita e consome os dados mastigados que a API cospe de volta, convertendo numa visualização matemática em colunas de horários, como uma verdadeira agenda eletrônica que preenche exatamente as janelas de disponibilidade nos tamanhos dos blocos na tela. Se ele conclui uma etapa do estudo, o painel central de progresso recebe isso com um sistema de pontuação e acompanhamento de sucesso, motivando o retorno dele na plataforma dia após dia. E detalhe, tudo acessível ativando a agradável opção noturna no sistema Dark Mode, salvando sempre no LocalStorage."

### Slide 6: Nossa Escala Cloud: Docker e o Processo de Deploy
* **Tópicos Visuais:**
  * Símbolos imponentes de Infraestrutura: Docker Compose e Oracle Cloud.
  * O código-fonte na estrutura de pastas raiz apontando o `docker-compose.yml`.
* **Fala do Apresentador (Script):**
  "Para consolidar que nossa plataforma estivesse apta para o mercado e a um toque de um hiperlink, ela tinha de ser publicada. Nós elaboramos a implementação de infraestrutura na Oracle Cloud, configurando uma Máquina Virtual e abrindo as portas do firewall para o mundo. O grande propulsor do nosso sucesso no projeto como equipe DevOps foi, sem dúvida, o Docker Compose. Não só configuramos containers manuais, como consolidamos toda a tríade do projeto no arquivo docker-compose central. Apenas localizando o arquivo `docker-compose.yml` que deixamos fixo estritamente na raiz do projeto do repositório, efetuamos um simples comando no console remoto da VM da Oracle que disparou as construções das imagens da API Java, rodou as migrações do banco de dados relacional e levantou o Nginx servindo nossos componentes do React empacotados, com perfeita orquestração. É o poder da tecnologia permitindo escala massiva e automatização limpa. Agradecemos muito a sua atenção e convidamos todos a experimentarem o Agendo!"
