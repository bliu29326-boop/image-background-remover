-- Minimal auth schema for manual Google sign-in persistence into D1
DROP TABLE IF EXISTS accounts;
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS verification_tokens;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS debug_logs;

CREATE TABLE users (
  id TEXT PRIMARY KEY,
  name TEXT,
  email TEXT NOT NULL,
  emailVerified INTEGER,
  image TEXT
);

CREATE UNIQUE INDEX users_email_unique ON users(email);
