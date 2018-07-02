DROP DATABASE IF EXISTS cards;
CREATE DATABASE cards;

\c cards;

CREATE TABLE card (
  ID SERIAL PRIMARY KEY,
  title VARCHAR,
  description VARCHAR,
  image VARCHAR,
  hidden BOOLEAN
);

CREATE TABLE file (
  ID SERIAL PRIMARY KEY,
  card FOREIGN KEY (card),
  name VARCHAR,
  location VARCHAR
);

CREATE TABLE link (
  ID SERIAL PRIMARY KEY,
  card FOREIGN KEY (card),
  name VARCHAR,
  link VARCHAR
);