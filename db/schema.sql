DROP DATABASE IF EXISTS users_db;
DROP DATABASE IF EXISTS blogs_db;

CREATE DATABASE users_db;
CREATE DATABASE blogs_db;

USE users_db;
USE blogs_db;

CREATE TABLE users (
    id          INT             AUTO_INCREMENT PRIMARY KEY,
    username    VARCHAR(30)     NOT NULL UNIQUE,
    email       VARCHAR(255)    NOT NULL UNIQUE,
    password    VARCHAR(64)     NOT NULL,
    create_at   TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
)

CREATE TABLE blogs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    author_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id)
    REFERENCES users(id)
);
