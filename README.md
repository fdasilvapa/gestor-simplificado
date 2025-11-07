# Gestor Simplificado 📊

Um sistema web completo para gestão de vendas e despesas, ideal para autônomos e pequenos empreendedores. Este projeto foi construído como um estudo prático de tecnologias modernas, incluindo um ambiente de desenvolvimento totalmente containerizado com Docker.

**📋 Índice**

* [Sobre o Projeto](#-sobre-o-projeto)
* [✨ Visuals](#-visuals)
* [🏛️ Arquitetura de Ecossistema (V2)](#️-arquitetura-de-ecossistema-v2)
* [✨ Funcionalidades](#-funcionalidades)
* [🚀 Tecnologias Utilizadas](#-tecnologias-utilizadas)
* [🏛️ Arquitetura e Planejamento (V1)](#️-arquitetura-e-planejamento-v1)
* [🏁 Começando (Desenvolvimento Local)](#-começando-desenvolvimento-local)
* [📄 Licença](#-licença)
* [👨‍💻 Contato](#-contato)

**🎯 Sobre o Projeto**

O **Gestor Simplificado** nasceu da necessidade de criar uma aplicação mais robusta e funcional, aplicando conceitos do mundo real. O objetivo principal é oferecer uma ferramenta simples para que um usuário possa controlar suas finanças, registrando entradas (vendas) e saídas (despesas) para, ao final, visualizar relatórios que ajudem na tomada de decisão.

O ambiente de desenvolvimento é totalmente containerizado com Docker.

**✨ Visuals**

| Dashboard | Vendas (Histórico) |
| :---: | :---: |
| ![Dashboard com filtros](./screenshots/dashboard.png) | ![Histórico de Vendas](./screenshots/sales.png) |
| **Despesas** | **Modal de Venda** |
| ![Tabela de Despesas](./screenshots/despesas.png) | ![Modal de Registro de Nova Venda](./screenshots/sales-modal.png) |

**🏛️ Arquitetura de Ecossistema (V2)**

Este projeto foi projetado como o "Serviço de Admin" (V1) de um ecossistema de microsserviços. Ele atua como o painel de controle privado e a fonte da verdade para o gerenciamento de produtos e finanças.

Ele expõe uma API segura que é consumida por um segundo projeto (V2), o **E-commerce Público**.

* **[Repositório do E-commerce (V2)](https://github.com/fdasilvapa/gestor-ecommerce)**: A vitrine pública que consome esta API para listar produtos e registrar vendas.

**✨ Funcionalidades**

* 🔐 **Autenticação:** Sistema completo de registro e login com tokens JWT e validação customizada.
* 📈 **Dashboard:** Painel principal com um resumo financeiro e filtros de período (Este Mês, Mês Passado, Últ. 6 Meses, etc.).
* 📦 **Gestão de Produtos:** CRUD completo (Criar, Ler, Atualizar, Deletar) com modais e feedback de usuário.
* 💸 **Registro de Despesas:** CRUD completo para despesas, com validação de formulário.
* 💰 **Registro de Vendas:** Sistema de "carrinho" para adicionar múltiplos produtos a uma nova venda, com cálculo de total em tempo real e atualização do histórico.
* 🛡️ **Segurança:** Proteção de rotas no frontend e backend, e tratamento de regras de negócio (ex: não permitir exclusão de produto associado a uma venda).

**🚀 Tecnologias Utilizadas**

O projeto foi dividido em duas partes principais:

**Backend:**
* [Node.js](https://nodejs.org/en/)
* [Express.js](https://expressjs.com/pt-br/)
* [Prisma ORM](https://www.prisma.io/)
* [PostgreSQL](https://www.postgresql.org/)
* [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)
* [JWT (JSON Web Token)](https://jwt.io/)

**Frontend:**
* [React](https://react.dev/) (com Hooks & Context API)
* [Vite](https://vitejs.dev/)
* [Tailwind CSS](https://tailwindcss.com/)
* [React Router](https://reactrouter.com/en/main)
* [Axios](https://axios-http.com/)
* [React Hot Toast](https://react-hot-toast.com/)

**🏛️ Arquitetura e Planejamento (V1)**

Este projeto não começou pelo código. Antes de tudo, foi feito um levantamento de requisitos, um roadmap de desenvolvimento e a modelagem da arquitetura do banco de dados para a V1.

Você pode conferir todos os artefatos de planejamento na [pasta /docs](./docs/) do projeto, incluindo:

* **[Documento de Requisitos (PDF)](./docs/GestorSimplificado-Requisitos.pdf):** Escopo, Requisitos Funcionais e Regras de Negócio.
* **[Arquitetura do Banco de Dados (PDF)](./docs/GestorSimplificado-ArquiteturaBD.pdf):** Diagrama ERD e definição de todas as tabelas e relacionamentos.
* **[Roadmap de Desenvolvimento (PDF)](./docs/GestorSimplificado-Roadmap.pdf):** O plano de fases do projeto, da Fase 1 (Docker) à Fase 4 (Dashboard).

**🏁 Começando (Desenvolvimento Local)**

Siga as instruções abaixo para executar o projeto em seu ambiente local.

**Pré-requisitos**

* [Git](https://git-scm.com)
* [Docker](https://www.docker.com/products/docker-desktop/)
* [Docker Compose](https://docs.docker.com/compose/install/)

**Instalação**

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/fdasilvapa/gestor-simplificado.git
    cd gestor-simplificado
    ```
2.  **Configure as Variáveis de Ambiente:**
    O projeto usa arquivos `.env` separados para o frontend e o backend.

    * **Backend:** Navegue até `backend/` e crie um arquivo `.env` (você pode copiar do `backend/.env.example`). Ele deve conter:
        ```env
        # Configuração do Banco de Dados
        DATABASE_URL="postgresql://myuser:mypassword@database:5432/mydatabase?schema=public"
        POSTGRES_USER=myuser
        POSTGRES_PASSWORD=mypassword
        POSTGRES_DB=mydatabase

        # Segurança
        JWT_SECRET=sua-chave-secreta-local-aqui

        # URL do Frontend (para desenvolvimento)
        CORS_ORIGIN=http://localhost:5173
        ```
    * **Frontend:** Navegue até `frontend/` e crie um arquivo `.env` (você pode copiar do `frontend/.env.example`). Ele deve conter:
        ```env
        # URL da API (para desenvolvimento)
        VITE_API_URL=http://localhost:3000/api
        ```

3.  **Suba os Containers com Docker Compose:**
    Volte para a pasta raiz (`gestor-simplificado/`) e rode:
    ```bash
    docker-compose up -d --build
    ```
4.  **Execute as Migrations do Prisma:**
    Com os containers em execução, rode:
    ```bash
    docker-compose exec backend npx prisma migrate dev
    ```

5.  **Acesse a aplicação local:**
    * **Frontend:** `http://localhost:5173`
    * **Backend:** `http://localhost:3000`

**📄 Licença**

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

**👨‍💻 Contato**

Felipe da Silva - [Github](https://github.com/fdasilvapa)
