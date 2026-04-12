# /daily — Agentic Coding News tick

하나의 뉴스레터 tick을 수행한다. 아래 Phase를 순서대로 실행하라.

## 사전 설정

```
DATE = KST 기준 오늘 날짜 (YYYY-MM-DD)
RAW_DIR = data/raw/${DATE}
FETCHED_AT = Math.floor(Date.now() / 1000) — tick 시작 시 1회 스냅샷
```

tick 번호 결정: Bash로 아래 실행 후 stdout 숫자를 TICK_NUM으로 사용한다.

```bash
bun -e "
import{Database}from'bun:sqlite';
import*as v from'sqlite-vec';
const db=new Database('db/app.db');
db.loadExtension(v.getLoadablePath());
const d=new Date(Date.now()+9*3600000).toISOString().slice(0,10);
const r=db.query(\"SELECT COUNT(*) as c FROM articles WHERE slug LIKE ?||'%'\").get(d);
console.log((r?.c??0)+1);
db.close();
"
```

---

## Phase 0: Session check

1. ToolSearch로 `mcp__claude-in-chrome__tabs_context_mcp`를 로드한 뒤 호출하여 Chrome 연결 확인.
2. 연결 실패 시 1회 재시도. 2회 실패 시 Chrome MCP를 SKIP으로 표시하고 Phase 1로 진행 (RSS/HN/Reddit만 수행).
3. 연결 성공 시 탭 목록에서 x.com, threads.net 로그인 여부를 확인한다.
   - 로그인 안 된 소스는 해당 소스만 SKIP 표시.

---

## Phase 1: Collect (Bash)

```bash
bun run src/phases/collect.ts
```

stdout JSON의 `totalInserted`를 확인한다. 0이면 경고만 남기고 계속 진행한다.

---

## Phase 2: Pre-scan (Chrome MCP)

Phase 0에서 Chrome MCP가 SKIP이면 이 Phase 전체를 건너뛴다.

각 소스(X, Threads)에 대해 — 해당 소스가 SKIP이 아닌 경우만:

### X pre-scan

1. `tabs_create_mcp`로 새 탭 생성.
2. `navigate`로 `https://x.com/home` 이동. 15초 대기.
3. 스크롤 6회 수행:
   ```
   javascript_tool로 실행: window.scrollBy(0, window.innerHeight * 0.9)
   ```
   각 스크롤 사이 1.2초 대기 (wait 또는 다음 호출까지 자연 지연).
4. JS 스니펫 실행: Read 도구로 `src/sources/x.ts` 파일을 읽고, `X_SNIPPETS["x.timeline.v1"]`에 해당하는 IIFE 문자열 전체를 복사하여 `javascript_tool`에 전달한다.
   - 반환값은 `JSON.stringify(ExtractionResult[])` 형태.
   - JSON.parse하여 배열이 아니면 에러로 간주.
5. 결과를 Write 도구로 `${RAW_DIR}/x-prescan.jsonl`에 저장 (한 줄에 하나의 JSON).

### Threads pre-scan

1. `tabs_create_mcp`로 새 탭 생성.
2. `navigate`로 `https://www.threads.net/` 이동. 15초 대기.
3. 스크롤 6회 (동일 방식).
4. Read 도구로 `src/sources/threads.ts`를 읽고, `THREADS_SNIPPETS["threads.foryou.v1"]` IIFE를 `javascript_tool`에 전달.
5. 결과를 `${RAW_DIR}/threads-prescan.jsonl`에 저장.

**실패 처리**: 어떤 소스든 navigate/javascript_tool이 15초 내 응답 없거나 에러 시, 해당 소스만 SKIP 처리하고 다음 소스로 진행.

---

## Phase 3: Keyword (LLM self-reasoning)

Phase 2 결과가 모두 비었으면(두 소스 모두 SKIP 또는 0건), Phase 1의 collect 결과에서 텍스트를 추출하여 키워드를 선정한다.

1. Phase 2 결과 JSONL 파일들을 Read로 읽는다 (없으면 Phase 1 결과 DB에서 최근 50건 텍스트 사용).
2. `src/phases/keyword.ts`의 `buildKeywordPrompt` 규칙을 따라 키워드 3개를 직접 선정한다:
   - 소문자, 2-20자, ASCII 또는 한글만
   - 일반적 단어 금지 (ai, news, code, update, new)
   - 예: `["claude mcp", "cursor agent", "devin benchmark"]`
3. 키워드를 작업 메모리에 보관. DB에 저장하지 않는다.

Phase 2가 완전히 SKIP이면 Phase 4도 건너뛴다.

---

## Phase 4: Deep-scan (Chrome MCP)

Phase 0에서 Chrome MCP SKIP이면 건너뛴다.

각 키워드에 대해, 각 소스(X, Threads)에서 — 해당 소스가 SKIP이 아닌 경우:

### X deep-scan (키워드당)

1. `navigate`로 `https://x.com/search?q=${encodeURIComponent(keyword)}&f=live` 이동.
2. 스크롤 4회.
3. Read로 `src/sources/x.ts` 읽고 `X_SNIPPETS["x.search.v1"]` IIFE를 `javascript_tool`에 전달.
4. 결과를 `${RAW_DIR}/x-deep.jsonl`에 append (Write).

### Threads deep-scan (키워드당)

1. `navigate`로 `https://www.threads.net/search?q=${encodeURIComponent(keyword)}&serp_type=default` 이동.
2. 스크롤 4회.
3. Read로 `src/sources/threads.ts` 읽고 `THREADS_SNIPPETS["threads.search.v1"]` IIFE를 `javascript_tool`에 전달.
4. 결과를 `${RAW_DIR}/threads-deep.jsonl`에 append.

**스크롤 누적 한도**: 소스당 pre-scan + deep-scan 합산 20회를 넘기면 즉시 해당 소스 중단.

---

## Phase 5: Ingest MCP results (Bash)

Chrome MCP에서 수집된 데이터가 있을 때만 실행:

```bash
bun run src/phases/ingest_mcp.ts ${RAW_DIR}
```

JSONL 파일이 없으면 이 Phase를 건너뛴다.

---

## Phase 6: Embed (Bash)

```bash
bun run src/phases/embed.ts
```

stdout JSON의 `embedded` 수를 확인한다.

---

## Phase 7: Dedupe (Bash)

```bash
bun run src/phases/dedupe.ts
```

stdout JSON에서 `candidates` 배열을 확인한다. 빈 배열이면 "오늘 새로운 뉴스 없음"으로 기록하고 Phase 8-10을 건너뛴다.

---

## Phase 8: Article write (LLM self-reasoning)

1. Phase 7의 candidates를 `src/phases/rank.ts`의 `buildArticlePrompt(candidates, DATE)` 형식으로 구성한다:
   - 각 candidate를 `[N] (source) score=S\ntitle\ntext(400자)\nurl: URL` 형태로 나열
   - 최대 30개
2. 위 프롬프트의 지시에 따라 한국어 뉴스 기사를 직접 작성한다:
   - 제목 (60자 이내)
   - 요약 (1문장 TL;DR)
   - 본문 (마크다운, 각 항목에 `[N](url)` 인용)
3. 결과를 `{"title":"...","summary":"...","bodyMd":"...","usedIndices":[1,3,5]}` JSON으로 생성한다.
4. `parseArticle` 규칙으로 검증: title과 bodyMd가 비어있으면 안 된다. usedIndices의 각 인덱스는 1-based이며 candidates 배열에 매핑하여 postIds를 도출한다.

---

## Phase 9: Render (Bash)

Phase 8의 결과 JSON에 `tickNum: TICK_NUM`을 추가하여 render.ts에 stdin으로 전달:

```bash
echo '{"title":"...","summary":"...","bodyMd":"...","postIds":[1,2,3],"tickNum":TICK_NUM}' | bun run src/phases/render.ts
```

stdout JSON에서 `articleId`, `mdPath`, `slug`를 확인한다.

---

## Phase 10: Publish (Bash)

```bash
bun run src/phases/publish.ts ARTICLE_ID MD_PATH "TITLE"
```

ARTICLE_ID, MD_PATH, TITLE은 Phase 9 결과에서 가져온다.

---

## 실패 처리 규칙

- **Chrome MCP 불가**: Phase 2/4 건너뛰고 RSS/HN/Reddit만으로 진행 (graceful degradation).
- **Phase 1 totalInserted=0**: 경고 남기고 계속. Phase 6에서 embed할 새 포스트가 없으면 자연스럽게 통과.
- **Phase 7 candidates 빈 배열**: "새 뉴스 없음" 로그 후 Phase 8-10 전체 건너뛰기.
- **Phase 8 JSON 파싱 실패**: 1회 재시도 (다시 작성). 2회 실패 시 tick 중단.
- **자정(KST) 경계**: FETCHED_AT을 tick 시작 시 고정하므로 tick 중 날짜가 바뀌어도 모든 데이터가 같은 날짜에 귀속된다. 단, DATE 변수도 tick 시작 시 고정하라.

## 완료 보고

tick이 끝나면 아래 형태로 요약을 출력하라:

```
Tick TICK_NUM 완료 (DATE)
- collect: X inserted, Y skipped
- mcp: X/Threads pre-scan N건, deep-scan M건 (또는 SKIP)
- embed: N embedded
- dedupe: N candidates, M dropped
- article: "제목" → slug
- publish: pushed=true/false
```
