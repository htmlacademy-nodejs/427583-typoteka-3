CREATE TABLE users(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  email varchar(255) NOT NULL,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  password_hash varchar(255) NOT NULL,
  avatar varchar(255) NOT NULL
);
CREATE TABLE articles(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,

)
