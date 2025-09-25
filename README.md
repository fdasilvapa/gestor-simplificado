**Gestor Simplificado 📊**

Um sistema web completo para gestão de vendas e despesas, ideal para autônomos e pequenos empreendedores. Este projeto foi construído como um estudo prático de tecnologias modernas, incluindo um ambiente de desenvolvimento totalmente containerizado com Docker.

**📋 Índice**

*   [Sobre o Projeto](#sobre-o-projeto)
*   [✨ Funcionalidades](#funcionalidades)
*   [🚀 Tecnologias Utilizadas](#tecnologias-utilizadas)
*   [🏁 Começando](#começando)
    *   [Pré-requisitos](#pré-requisitos)
    *   [Instalação](#instalação)
*   [🛰️ Acessando a Aplicação](#acessando-a-aplicação)
*   [📄 Licença](#licença)
*   [👨‍💻 Contato](#contato)

**🎯 Sobre o Projeto**

O **Gestor Simplificado** nasceu da necessidade de criar uma aplicação mais robusta e funcional, aplicando conceitos do mundo real. O objetivo principal é oferecer uma ferramenta simples para que um usuário possa controlar suas finanças, registrando entradas (vendas) e saídas (despesas) para, ao final, visualizar relatórios que ajudem na tomada de decisão.

Todo o ambiente de desenvolvimento foi projetado para ser executado dentro de containers Docker, simulando um ambiente de produção e facilitando a configuração inicial do projeto.

**✨ Funcionalidades**

*   🔐 **Autenticação:** Sistema completo de registro e login com tokens JWT.
*   📈 **Dashboard:** Painel principal com um resumo financeiro do mês (total de vendas, despesas e saldo).
*   📦 **Gestão de Produtos:** CRUD completo para cadastrar os produtos ou serviços que você vende.
*   💰 **Registro de Vendas:** Registre suas vendas, associando produtos e gerando um histórico.
*   💸 **Registro de Despesas:** Cadastre todas as suas despesas, classificando-as por categoria.
*   📄 **Relatórios:** Gere relatórios simples para visualizar seu desempenho por período.

**🚀 Tecnologias Utilizadas**

O projeto foi dividido em duas partes principais:

**Backend:**

*   [Node.js](https://nodejs.org/en/)
*   [Express.js](https://expressjs.com/pt-br/)
*   [Prisma ORM](https://www.prisma.io/)
*   [PostgreSQL](https://www.postgresql.org/)
*   [Docker](https://www.docker.com/)
*   [JWT (JSON Web Token)](https://jwt.io/)

**Frontend:**

*   [React](https://react.dev/)
*   [Vite](https://vitejs.dev/)
*   [Tailwind CSS](https://tailwindcss.com/)
*   [React Router](https://reactrouter.com/en/main)

**🏁 Começando**

Siga as instruções abaixo para executar o projeto em seu ambiente local.

**Pré-requisitos**

Antes de começar, você vai precisar ter as seguintes ferramentas instaladas em sua máquina:

*   [Git](https://git-scm.com)
*   [Docker](https://www.docker.com/products/docker-desktop/)
*   [Docker Compose](https://docs.docker.com/compose/install/) (geralmente já vem com o Docker Desktop)

**Instalação**

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/fdasilvapa/gestor-simplificado.git
    cd gestor-simplificado
    ```
2.  **Configure as Variáveis de Ambiente:**
    O projeto utiliza um arquivo `.env` na raiz para configurar o banco de dados e as chaves de segurança. Crie um arquivo chamado `.env` e copie o conteúdo do arquivo `.env.example` (que você deve criar) nele.
    Exemplo de conteúdo para o seu arquivo `.env`:
    ```
    # Configuração do Banco de Dados PostgreSQL
    # O "DB_HOST" deve ser o nome do serviço do banco de dados no docker-compose.yml (ex: "database")
    DATABASE_URL="postgresql://myuser:mypassword@database:5432/mydatabase?schema=public"

    # Variáveis usadas pelo serviço do Docker para criar o banco
    POSTGRES_USER=myuser
    POSTGRES_PASSWORD=mypassword
    POSTGRES_DB=mydatabase

    # Chave secreta para gerar os tokens JWT (pode ser qualquer string segura)
    JWT_SECRET=sua-chave-secreta-super-segura-aqui
    ```
3.  **Suba os Containers com Docker Compose:**
    Este comando irá construir as imagens e iniciar todos os serviços (backend, frontend e banco de dados).
    ```bash
    docker-compose up -d --build
    ```
4.  **Execute as Migrations do Prisma:**
    Com os containers em execução, rode o seguinte comando para que o Prisma crie as tabelas no banco de dados.
    ```bash
    docker-compose exec backend npx prisma migrate dev
    ```

Pronto! O ambiente está totalmente configurado e em execução.

**🛰️ Acessando a Aplicação**

*   **Frontend (Aplicação React):** http://localhost:5173
*   **Backend (API Node.js):** http://localhost:3000

**📄 Licença**

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](https://www.google.com/search?q=LICENSE&authuser=1) para mais detalhes.

**👨‍💻 Contato**

Felipe - [Github](https://github.com/fdasilvapa)

