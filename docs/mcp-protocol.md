# /daily Chrome MCP Protocol

This document is read by **Claude L1** inside the `/daily` slash command
(see `.claude/commands/daily.md`, added in Step 10). The Bun runtime never
executes MCP tools; only Claude in an interactive session does.

All constants referenced below live in `src/lib/mcp.ts`.

## Phase 0 — Session check

1. Call `mcp__claude-in-chrome__tabs_context_mcp` to inspect the user's
   current Chrome tabs.
2. If the X or Threads session is not logged in, `read_console_messages`
   to confirm, then write a warning row to `metrics` with
   `phase='mcp.<source>'`, `key='skip'`, `note='login required'`, and
   skip that source for this tick. Other sources continue.
3. If there is no claude-in-chrome connection at all, abort the tick and
   surface a user-visible error. Retry once before giving up.

## Phase 1 — Pre-scan

For each `NavigationPlan` in `NAV_PLANS`:

1. Optionally `tabs_create_mcp` when `plan.openNewTab` is true — otherwise
   reuse an existing tab for that domain.
2. Execute `plan.preScanSteps` in order:
   - `navigate`: `mcp__claude-in-chrome__navigate`, honour `waitMs`.
   - `scroll`: run `times` scrolls via `javascript_tool`
     (`window.scrollBy(0, innerHeight*0.9)`). Pause between each scroll
     by `step.pauseMs` if set, otherwise `TIMEOUTS.waitAfterScrollMs`.
   - `extract`: run the JS snippet identified by `jsSnippetRef`
     (defined in `src/sources/{x,threads}.ts` — filled in during
     Steps 5 & 6). Append results to the `saveTo` bucket.
3. Never exceed `SCROLL_BUDGET.preScanMax` scrolls per preScan phase.
4. Claude L1 maintains a per-source scroll counter in working memory.
   Reset to 0 at the start of each plan and include pre-scan + deep-scan
   together when checking `plan.budget.scrollsMax`.

## Phase 2 — Keyword selection

1. After pre-scan, Claude reads all accumulated `ExtractionResult.text`
   values and picks exactly `SCROLL_BUDGET.deepScanKeywordCount`
   (= 3) hot keywords.
2. Keywords are normalised to lowercase; length 2–20 characters; ASCII
   and Korean Hangul are both allowed.
3. Keywords are ephemeral — they live in the L1 working memory and are
   not persisted to the database.

## Phase 3 — Deep-scan

For each selected keyword:

1. Build the steps with `plan.buildDeepScanSteps(keyword)` and execute
   them sequentially.
2. Each keyword may scroll at most `SCROLL_BUDGET.deepScanPerKeywordMax`
   (= 4) times.
3. Stop immediately if the cumulative scroll count would exceed
   `plan.budget.scrollsMax`.

## Phase 4 — Persist

1. For each bucket, convert the accumulated `ExtractionResult[]` to
   canonical `Post[]` with `coerceBatch(raws, source, fetchedAtSec)`
   from `src/lib/extract.ts`.
2. Call `insertPosts(db, posts)` from `src/sources/persist.ts`.
3. Record counters (bucket size, dropped items, scrolls used) in
   `metrics` under `phase='mcp.<source>'`.

## Failure handling

- Any step timeout (`TIMEOUTS.navigateMs` / `TIMEOUTS.jsExecMs`) or MCP
  error aborts the **current source only**; other sources still run.
- `javascript_tool` results must be an array. Anything else is a fail
  and counted in `metrics.extract_fail`.
- If `read_console_messages` shows a login wall, treat the source as
  skipped (see Phase 0 handling).

## Midnight (KST) boundary

- Snapshot `fetchedAtSec = Math.floor(Date.now() / 1000)` once at the
  start of the tick, reused for every `coerceRawToPost` call. This
  keeps every row in the tick attached to the same KST day even when
  the clock rolls over mid-run.
- `posted_at` comes from the scraped data — it may legitimately predate
  the snapshot.

## MCP tool call summary

```
tabs_context_mcp
  -> tabs_create_mcp?  (only when opening a new tab)
  -> navigate(url)
  -> javascript_tool(scroll snippet)   × plan.preScanSteps.scroll.times
  -> javascript_tool(extract snippet)
  -> (optional) get_page_text          (debug fallback)
  -> (optional) read_console_messages  (error triage)
```

Only the six tools listed in `CHROME_MCP_TOOLS` are permitted.
