-- deletes database if it exists
DROP DATABASE IF EXISTS mandatory2_db;
-- creates empty database
CREATE DATABASE mandatory2_db;
-- selects database
USE mandatory2_db;

CREATE TABLE IF NOT EXISTS users (
  id            INT           PRIMARY KEY AUTO_INCREMENT,
  fullname      VARCHAR(50),
  email         VARCHAR(50),
  username      VARCHAR(20),
  password      VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id            INT           PRIMARY KEY AUTO_INCREMENT,
  email         VARCHAR(50)   NOT NULL,
  token         VARCHAR(255)  NOT NULL,
  expires_at    DATETIME      NOT NULL
);

-- just an example
INSERT INTO users(fullname,email,username,password)
VALUES('FULLNAME','Example@example.com','USERNAME','ENCRYPTED-PASSWORD')