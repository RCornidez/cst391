# Activity 1

- Author: Rodrigo Cornidez
- Date: February 12, 2026

## Introduction
In this activity we are expanding on the previously initialized MusicAPI from activity 0. We are creating models, queries, data access objects, controllers, and routes. This is a Model-View-Controller (MVC) setup that is organized by separating by domain: artists, albums, and tracks. We also setup a custom logger and database connection service that facilitates the queries made by the data access objects. 

## Screen Recording
- [Activity 1 online video](https://youtu.be/YysoLBRzFns)
- [Activity 1 mp4 Download](./screen_recording.mp4)

## Setup
*.env file contents*

These environment variables were used in the express API and compose.yml config to definte the crucial variables in the app and the database.

```txt
MY_SQL_DB_HOST=127.0.0.1
MY_SQL_DB_USER=root
MY_SQL_DB_PASSWORD=root
MY_SQL_DB_PORT=3306
MY_SQL_DB_DATABASE=music
MY_SQL_DB_CONNECTION_LIMIT=10

PORT=5000
NODE_ENV=development
GREETING=Hello from the environment file. Be kind to the environment!
```

*container compose configuration file*

I used a container to manage MySQL because it was fast to initialize and maintain.
```yml
services:
  mysql:
    image: mysql:8.0
    container_name: mysql-db
    restart: unless-stopped
    env_file:
      - ./MusicAPI/.env
    environment:
      MYSQL_ROOT_PASSWORD: ${MY_SQL_DB_PASSWORD}
      MYSQL_DATABASE: ${MY_SQL_DB_DATABASE}
    command: --default-authentication-plugin=mysql_native_password
    ports:
      - "${MY_SQL_DB_PORT}:3306"
    volumes:
      - mysql_data:/var/lib/mysql
      - ./MusicDB.sql:/docker-entrypoint-initdb.d/01-MusicDB.sql

volumes:
  mysql_data:
```

## Conclusion
This activity allowed me to learn about the importants of project organization, meaningful logging, and robust error handling. It was interesting to work directly with SQL queries and create a simple but functional database connection handler. Being exposed to Express with Typescript is new territory for me so its interesting to get this practice under my belt and get more familiar with the syntax.