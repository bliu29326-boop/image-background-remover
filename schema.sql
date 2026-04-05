-- Auth.js D1 Adapter Schema (rebuilt for stable Auth.js v5 + @auth/d1-adapter usage)
DROP TABLE IF EXISTS accounts;
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS verification_tokens;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id TEXT PRIMARY KEY,
  name TEXT,
  email TEXT,
  emailVerified INTEGER,
  image TEXT
);

CREATE UNIQUE INDEX users_email_unique ON users(email);

CREATE TABLE accounts (
  userId TEXT NOT NULL,
  type TEXT NOT NULL,
  provider TEXT NOT NULL,
  providerAccountId TEXT NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at INTEGER,
  token_type TEXT,
  scope TEXT,
  id_token TEXT,
  session_state TEXT,
  refresh_token_expires_in INTEGER,
  PRIMARY KEY (provider, providerAccountId),
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX accounts_userId_idx ON accounts(userId);

CREATE TABLE sessions (
  sessionToken TEXT PRIMARY KEY,
  userId TEXT NOT NULL,
  expires INTEGER NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX sessions_userId_idx ON sessions(userId);

CREATE TABLE verification_tokens (
  identifier TEXT NOT NULL,
  token TEXT NOT NULL,
  expires INTEGER NOT NULL,
  PRIMARY KEY (identifier, token)
);

CREATE UNIQUE INDEX verification_tokens_token_unique ON verification_tokens(token);
