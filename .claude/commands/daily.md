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
2. `navigate`로 `https://x.com/search?q=%22claude%20code%22&f=live` 이동 (Claude Code Deep 주제에 맞춘 검색 URL, src/lib/mcp.ts X_PLAN과 동기화). 15초 대기.
3. 스크롤 10회 수행 (src/lib/mcp.ts SCROLL_BUDGET.preScanMax와 동기화):
   ```
   javascript_tool로 실행: window.scrollBy(0, window.innerHeight * 0.9)
   ```
   각 스크롤 사이 1.2초 대기.
4. JS 스니펫 실행: Read 도구로 `src/sources/x.ts` 파일을 읽고, `X_SNIPPETS["x.timeline.v1"]`(또는 검색 페이지용 `x.search.v1`)에 해당하는 IIFE 문자열 전체를 복사하여 `javascript_tool`에 전달한다.
   - 반환값은 `JSON.stringify(ExtractionResult[])` 형태.
   - JSON.parse하여 배열이 아니면 에러로 간주.
5. **[필수] JSONL 저장**: 결과를 Write 도구로 `${RAW_DIR}/x-prescan.jsonl`에 저장 (한 줄에 하나의 JSON object). Phase 5에서 이 파일을 읽어 DB에 insert하므로 이 단계 스킵 불가.

### Threads pre-scan

1. `tabs_create_mcp`로 새 탭 생성.
2. `navigate`로 `https://www.threads.net/search?q=claudecode&serp_type=tags` 이동 (Claude Code Deep 주제에 맞춘 #claudecode 태그 URL, src/lib/mcp.ts THREADS_PLAN과 동기화). 15초 대기.
   - 만약 위 URL이 빈 페이지면 fallback: `https://www.threads.net/search?q=claude%20code&serp_type=default`
3. 스크롤 8회 (src/lib/mcp.ts 동기화).
4. Read 도구로 `src/sources/threads.ts`를 읽고, `THREADS_SNIPPETS["threads.foryou.v1"]` IIFE를 `javascript_tool`에 전달.
5. **[필수] JSONL 저장**: 결과를 Write 도구로 `${RAW_DIR}/threads-prescan.jsonl`에 저장. Phase 5가 이 파일을 먹는다.

**실패 처리**: 어떤 소스든 navigate/javascript_tool이 15초 내 응답 없거나 에러 시, 해당 소스만 SKIP 처리하고 다음 소스로 진행. **JSONL 저장 단계 자체를 실패한 소스는 Phase 5에서 insert 되지 않으므로 Phase 8 본문에서 출처로 사용 금지.**

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
2. 스크롤 5회 (src/lib/mcp.ts SCROLL_BUDGET.deepScanPerKeywordMax 동기화).
3. Read로 `src/sources/x.ts` 읽고 `X_SNIPPETS["x.search.v1"]` IIFE를 `javascript_tool`에 전달.
4. **[필수] JSONL append**: 결과를 `${RAW_DIR}/x-deep.jsonl`에 append (Write). 기존 내용 뒤에 새 JSON 라인을 이어 쓴다.

### Threads deep-scan (키워드당)

1. `navigate`로 `https://www.threads.net/search?q=${encodeURIComponent(keyword)}&serp_type=default` 이동.
2. 스크롤 5회.
3. Read로 `src/sources/threads.ts` 읽고 `THREADS_SNIPPETS["threads.search.v1"]` IIFE를 `javascript_tool`에 전달.
4. **[필수] JSONL append**: 결과를 `${RAW_DIR}/threads-deep.jsonl`에 append.

**스크롤 누적 한도**: 소스당 pre-scan + deep-scan 합산 SCROLL_BUDGET.perSourceMax(25) 회를 넘기면 즉시 해당 소스 중단. 키워드 개수: X 3개, Threads 2개.

---

## Phase 5: Ingest MCP results (Bash, [필수])

**Phase 2 또는 Phase 4에서 JSONL 파일을 하나라도 썼다면 이 Phase를 반드시 실행한다.** 건너뛰면 Phase 8에서 X/Threads source-link 사용 금지 (fabrication 방지 룰).

```bash
ls -la ${RAW_DIR}/*.jsonl 2>/dev/null  # 먼저 파일 존재 확인
bun run src/phases/ingest_mcp.ts ${RAW_DIR}
```

**성공 조건**: stdout에 `{"inserted": N, ...}` 형태의 JSON이 출력되고 `inserted >= 0`이며 에러 없음.

**검증**:
```bash
bun -e "import{Database}from'bun:sqlite';
Database.setCustomSQLite('/opt/homebrew/opt/sqlite/lib/libsqlite3.dylib');
const db=new Database('db/app.db');
const r=db.query(\"SELECT source,COUNT(*) as c FROM posts WHERE fetched_at > strftime('%s','now','-1 hour') GROUP BY source\").all();
console.log(JSON.stringify(r));
db.close();"
```
최근 1시간 insert에 `x` 또는 `threads` source 카운트가 0보다 크면 Phase 8에서 해당 source-link를 본문으로 사용 가능.

**실패 처리**:
- ingest_mcp 에러 → 1회 재시도
- 2회 실패 시 이 tick에서 X/Threads source-link 사용 금지 상태로 표시하고 Phase 6 계속
- JSONL 파일이 하나도 없으면 Phase 5 자체 건너뛰기 (Chrome MCP 전체 SKIP된 경우)

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

### ⛔ 절대 금지 (fabrication 방지 핵심 규칙)

1. **본문(`bodyMd`의 도입·요약·"실전 핵심" 등 fact 섹션)에는 출처에 없는 사실을 추가하지 말 것.**
   - 출처에 등장하지 않는 인물·도구명·금액·날짜·수치·기능·코드 스니펫·인용문 일체 금지
   - "X에 따르면", "여러 사용자가 공유한다" 같은 표현은 실제 그런 데이터가 candidate에 있을 때만
   - 이 룰은 특히 본문 인용·예시 부분에 엄격 적용
2. **DB 텍스트가 잘려있어 검증이 부족하면, 해당 candidate는 본문 인용 대상에서 제외한다.**
   - URL을 알면 WebFetch로 원본을 가져와 추가 검증 후에만 사용
3. **출처에 없는 일반 지식은 `<div class="context-block"><h4>관련 배경 지식</h4>` 또는 `<h4>왜 중요한가</h4>` 섹션 안에서만 작성.**
   - 그 섹션 안의 LLM 분석·해설·용어 설명은 OK
   - 단 그 안에서도 "이 도구는 X 기능이 있다"처럼 출처 사실로 보일 표현은 금지. "일반적으로", "보통", "유사 도구는" 등 hedging 명시
4. **source-link는 이번 tick에서 DB에 insert된 post만 사용 가능.**
   - `hn`/`reddit`/`rss`: Phase 1에서 insert됐으면 OK
   - `x`/`threads`: **Phase 5 ingest_mcp가 성공**하고 Phase 5 검증 쿼리에서 해당 source 카운트 > 0일 때만 OK
   - Phase 5가 skip/실패한 tick에서는 X/Threads source-link 절대 사용 금지 (과거 tick 데이터가 DB에 있어도 이번 tick에서 insert 안 됐으면 사용 금지 — 이전 fabrication 재발 방지)
   - 출처 표시(meta-line의 <span class="tag tag-{source}">)는 candidate의 `source` 컬럼과 정확히 일치해야 함

### Phase 8 절차

1. Phase 7의 candidates를 `src/phases/rank.ts`의 `buildArticlePrompt(candidates, DATE)` 형식으로 구성한다:
   - 각 candidate를 `[N] (source) score=S\ntitle\ntext(400자)\nurl: URL` 형태로 나열
   - 최대 30개
2. 한국어 뉴스 기사를 작성한다 — **각 기사 1편마다 다음 단계를 모두 거친 뒤에 다음 기사로 넘어간다**:
   - **(a) 작성**: 제목 (60자 이내), 요약 (1문장 TL;DR), 본문 (마크다운, 각 항목에 `[N](url)` 인용)
   - **(b) 셀프 검증 (필수, 다음 기사 진행 전 차단)**:
     1. 본문에 등장한 모든 사실(인물명, 숫자, 금액, 도구명, 기능, 코드, 인용문)을 한 줄씩 나열
     2. 각 사실이 candidate text(또는 WebFetch 결과)의 어디에 등장하는지 한 줄로 매핑 확인
     3. 매핑이 안 되는 항목이 1개라도 있으면 → 해당 항목을 **본문에서 제거**(또는 "관련 배경 지식" 섹션으로 hedging 표현으로 이동)
     4. source-link href가 candidate URL과 정확히 일치하는지 확인
   - **(c) 통과 후에만 다음 기사로**
3. 결과를 `{"title":"...","summary":"...","bodyMd":"...","usedIndices":[1,3,5]}` JSON으로 생성한다.
4. `parseArticle` 규칙으로 검증: title과 bodyMd가 비어있으면 안 된다. usedIndices의 각 인덱스는 1-based이며 candidates 배열에 매핑하여 postIds를 도출한다.

### 본문 구조 권장

```
> 요약 (1문장)

(원본 글 요약 1-2문단 — candidate text 범위 내에서만)

<div class="context-block">
<h4>출처 핵심 (원본에서 확인되는 사실만)</h4>
- ...
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석 OK — 단, 출처 사실로 보일 표현 금지)</h4>
...
</div>

<div class="context-block">
<h4>관련 배경 지식 (LLM 일반 지식 OK)</h4>
...
</div>
```

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
