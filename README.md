# agentic-coding-news

Daily news aggregator for agentic-coding topics.
Scans X, Threads, Hacker News, Reddit, and selected blog RSS feeds every 3 hours
via Claude Code `/loop` Cron, de-dupes against published articles using a local
SQLite + sqlite-vec RAG index, and publishes to GitHub Pages.

## Setup

```bash
bun install
cp .env.example .env
bun run verify     # sqlite-vec round-trip check
bun run init:db    # create db/app.db with schema
```

## Status

Step 1 — scaffolding + sqlite-vec verification.
