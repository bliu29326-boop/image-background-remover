-- Minimal schema for independently persisting signed-in Google users into D1
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id TEXT PRIMARY KEY,
  name TEXT,
  email TEXT NOT NULL,
  image TEXT,
  updated_at TEXT NOT NULL
);

CREATE UNIQUE INDEX users_email_unique ON users(email);
