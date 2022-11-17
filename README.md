# Hi Nest!

NestJS + TypeORM + GraphQL Toy Project

## Description

## Installation

```bash
$ npm install
```

## Configuration

Configuration with `.env` file should be done before running the app.

### How to configure

Construct `key = value` style configuration

- At:
  - Development mode: `.env.dev` file
  - Production mode: `.env.prod` file
- About:
  - `APP_PORT`: Application listening port
  - `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE`: Database configurations
  - `JWT_SECRET_ACCESS`, `JWT_SECRET_REFRESH`: JWT secret key for access token and refresh token

### Example configuration

```
APP_PORT = 3000
DB_HOST = localhost
DB_PORT = 5432
DB_USERNAME = postgres
DB_PASSWORD = postgres
DB_DATABASE = hi-nest
JWT_SECRET_ACCESS = ACCESS
JWT_SECRET_REFRESH = REFRESH
```

## Running the app

```bash
# build
$ npm run build

# development mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
