# Como rodar o projeto ZerÓbito localmente

## Requisitos Prévios

Antes de iniciar, certifique-se de ter instalado em seu sistema:

- [React JS](https://react.dev/) (versão 18.x ou superior)
- [Node.js](https://nodejs.org/en) (versão 20.x ou superior - LTS recomendada)
- [Yarn](https://yarnpkg.com/) (versão 1.22.x ou superior)
- [Docker & Docker Compose](https://www.docker.com/) (Docker Engine 20.10+ e Compose v2.x)


## Repositório `zerobito` - Aplicação Frontend
- Rode o comando `yarn` para instalar as dependências e o script `yarn start` para subir a aplicação
- Instale as dependências:
  ```bash
  yarn
  yarn start
  ```
- Acesse o frontend em [http:localhost:3000/](http://localhost:3000/)


## Repositório `zerobito-backend` - Aplicação backend em NestJS
- Suba os containers com Redis e Postgres utilizando o `docker-compose.yaml`:
    ```bash
    docker compose up
    ```
- Configure as variáveis de ambiente:
  - Copie o arquivo [env.example](https://github.com/SocialSoftwareLivingLab/zerobito-backend/blob/develop/.env.example) para `.env` (se não existir, crie o arquivo)
    - Segue um exemplo básico para rodar o backend local rapidamente:
        ```env
        TYPEORM_CONNECTION = postgres
        TYPEORM_HOST = localhost
        TYPEORM_USERNAME = postgres
        TYPEORM_PASSWORD = docker
        TYPEORM_DATABASE = zerobito
        TYPEORM_PORT = 5432

        JWT_SECRET = mysupersecret
        JWT_EXPIRES_IN = 3000

        URL_APLICACAO_FRONTEND = http://localhost:3000
        ```

 
- Instale as dependências:
    ```bash
    yarn
    ```
- Inicie o servidor em modo desenvolvimento:
    ```bash
    yarn start:dev
    ```
  - ℹ️ Na primeira execução, o servidor cria toda a base de dados. Após isso, pare o servidor e rode novamente para que ele consiga inicializar corretamente.
- Há um usuário root default, criado pelo seed [usuario-administrador.seed.ts](https://github.com/SocialSoftwareLivingLab/zerobito-backend/blob/develop/src/app/usuarios/seeds/usuario-administrador.seed.ts).

**Agora a aplicação está pronta para teste em [http:localhost:3000/](http://localhost:3000/)**
