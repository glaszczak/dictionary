<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
  <a href="https://pl.reactjs.org/" target="blank"><img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" width="320" height="170" alt="React Logo" /></a>
</p>

## Installation

```bash
# install dependencies for both api and web
$ yarn
```

## Running the app

```bash
# start the docker containers for MongoDB, PostgreSQL and pgAdmin
$ docker-compose up
```

### Setup PostgreSQL database

Open [http://localhost:5050/](http://localhost:5050/) to open the pgAdmin interface.

- Enter username and password using environment variables: ${PGADMIN_DEFAULT_EMAIL} and ${PGADMIN_DEFAULT_PASSWORD}

- Click on to Servers -> Create -> Server
  - name: your-server-name

- Go to Connection tab
  - Host (to get Host use `$ ifconfig |grep inet` => do not use '127.0.0.1' but i.e. '192.168.1.126' instead.)
  - Maintenence database: ${POSTGRES_DATABASE}
  - Username: ${POSTGRES_USER}
  - Password: ${POSTGRES_PASSWORD}

### Start the server and the client

```bash
# run api in development mode
$ yarn start:dev

# run web in development mode
$ yarn start
```

Open [http://localhost:3000](http://localhost:3000) to view application it in the browser.

### MongoDB

Runs the app in the development mode.

Open [http://localhost:8081](http://localhost:8081) to connect to MongoDB database.

## Development

```bash
# check code and fix with linter
$ yarn lint

# check that files are formatted correctly
$ yarn prettier --check .

# format all files with prettier
$ yarn prettier --write .
```

## Application

### Authentication

To register user send POST request on `http://localhost:9000/api/auth/register` with following body:

```json
{
  "fullName" : "User Name",
  "email": "user@example.com",
  "password": "yourPassword"
}
```

To login user and get JWT token send POST request on `http://localhost:9000/api/auth/login` with following body:

```json
{
  "email": "user@example.com",
  "password": "yourPassword"
}
```
