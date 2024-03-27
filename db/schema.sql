DROP DATABASE IF EXISTS users_db;

CREATE DATABASE users_db;

USE users_db;

CREATE TABLE users (
    id          INT             AUTO_INCREMENT PRIMARY KEY,
    username    VARCHAR(30)     NOT NULL UNIQUE,
    email       VARCHAR(255)    NOT NULL UNIQUE,
    password    VARCHAR(64)     NOT NULL,
    create_at   TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
)