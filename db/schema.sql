PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;

-- Collected raw posts from social sources (X, Threads, HN, Reddit, RSS)
CREATE TABLE IF NOT EXISTS posts (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  source       TEXT    NOT NULL,          -- 'x' | 'threads' | 'hn' | 'reddit' | 'rss'
  source_id    TEXT    NOT NULL,          -- native id from the source
  url          TEXT    NOT NULL,
  author       TEXT,
  title        TEXT,
  text         TEXT    NOT NULL,
  lang         TEXT,
  posted_at    INTEGER NOT NULL,          -- unix seconds
  fetched_at   INTEGER NOT NULL,
  score        REAL    DEFAULT 0,         -- engagement-derived score
  UNIQUE(source, source_id)
);
CREATE INDEX IF NOT EXISTS idx_posts_posted_at  ON posts(posted_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_fetched_at ON posts(fetched_at DESC);

-- Published news articles (one per tick)
CREATE TABLE IF NOT EXISTS articles (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  slug         TEXT    NOT NULL UNIQUE,   -- e.g. 2026-04-12-tick-03
  title        TEXT    NOT NULL,
  summary      TEXT,
  body_md      TEXT    NOT NULL,
  status       TEXT    NOT NULL DEFAULT 'draft',  -- draft | published
  created_at   INTEGER NOT NULL,
  published_at INTEGER
);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at DESC);

-- Run/phase metrics (cost, latency, counts)
CREATE TABLE IF NOT EXISTS metrics (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  run_id     TEXT    NOT NULL,
  phase      TEXT    NOT NULL,
  key        TEXT    NOT NULL,
  value      REAL,
  note       TEXT,
  created_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_metrics_run ON metrics(run_id, phase);

-- Vector indexes (256d MRL from text-embedding-3-small)
CREATE VIRTUAL TABLE IF NOT EXISTS posts_vec USING vec0(
  post_id   INTEGER PRIMARY KEY,
  embedding float[256]
);

CREATE VIRTUAL TABLE IF NOT EXISTS articles_vec USING vec0(
  article_id INTEGER PRIMARY KEY,
  embedding  float[256]
);
