# Hi Nest!

Nestjs Backend Toy Project

## Description

- Nest.js Basics
  - Controllers/Services
  - DTOs and Validation
  - Tests using Jest
- TypeORM
  - PostgreSQL Configuration
  - Basic CRUD
  - Table Join
- GraphQL
  - Migrating APIs using GraphQL
- Configuration
  - dotenv configuration
  - cross-env configuration
  - environment validation
  - API call logging
- Authentication
  - JWT Token
  - Refresh Token
  - Password, Token Encryption
  - Guards
  - Custom Decorator
- Deployment
  - AWS EC2, RDS
  - Zero downtime Deployment with PM2
  - Deployment Automation with Github Actions

## Prerequisites

- Node.js version 16 should be installed

```bash
$ sudo curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
$ sudo apt-get install -y nodejs
```

- pm2 should be installed for global environment

```bash
$ npm install -g pm2
```

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

# production mode start
$ npm run start:prod

# production mode restart
$ npm run restart

# production mode end
$ npm run end
```
