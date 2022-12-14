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
  - Automate Deployment Environment Configuration with Docker

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

## Setting Up

### Prerequisites

- Node.js version 16 should be installed

```bash
$ sudo curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
$ sudo apt-get install -y nodejs
```

- pm2 should be installed for global environment

```bash
$ npm install -g pm2
```

### Installation

```bash
$ npm install
```

### Execution

#### Development Mode

```bash
$ npm run start:dev
```

#### Production Mode

```bash
# build
$ npm run build

# start
$ npm run start:prod

# restart
$ npm run restart

# stop
$ npm run end
```

## Automated Deployment

### Deployment with docker

```bash
# build
$ sudo docker build -t hi-nest .

# start
$ sudo docker run -d -p 3000:3000 -it hi-nest
```

### Deployment with docker-compose

```bash
$ docker-compose up
```
