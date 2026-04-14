---
layout: default
title: "Claude Code Routines 공식 출시 — Schedule/API/GitHub trigger로 클라우드 자율 실행"
---

<a href="../2026-04-15" class="back-link">&larr; 4월 15일 목록</a>

# Claude Code Routines 공식 (Research Preview)

<div class="meta-line"><span class="tag tag-hn">HN</span> 03:51 KST</div>

> Anthropic이 Claude Code Routines 공식 docs 공개. 프롬프트 + 저장소 + 커넥터를 묶어 cloud 인프라에서 schedule/API/GitHub 이벤트로 자율 실행. Pro/Max/Team/Enterprise 플랜 + Claude Code on the web 활성화 시 사용. HN score 124, posted 2026-04-14.

<div class="context-block">
<h4>출처 핵심 (공식 docs verbatim)</h4>

<p><strong>한 줄 정의 (직접 인용):</strong></p>
<blockquote>"Put Claude Code on autopilot. Define routines that run on a schedule, trigger on API calls, or react to GitHub events from Anthropic-managed cloud infrastructure."</blockquote>

<p><strong>구조 (직접 인용):</strong></p>
<blockquote>"A routine is a saved Claude Code configuration: a prompt, one or more repositories, and a set of connectors, packaged once and run automatically. Routines execute on Anthropic-managed cloud infrastructure, so they keep working when your laptop is closed."</blockquote>

<p><strong>3가지 트리거:</strong></p>
<ul>
<li><strong>Scheduled</strong>: hourly/nightly/weekly 같은 반복 cadence</li>
<li><strong>API</strong>: 라우틴별 endpoint에 bearer token으로 HTTP POST</li>
<li><strong>GitHub</strong>: pull request·push·issues·workflow run 등 repo 이벤트 반응</li>
</ul>

<p>한 routine에 여러 트리거 조합 가능 (예: PR 리뷰가 nightly + deploy script + 신규 PR 모두에 반응).</p>

<p><strong>이용 가능 플랜 (직접 인용):</strong></p>
<blockquote>"Routines are available on Pro, Max, Team, and Enterprise plans with Claude Code on the web enabled. Create and manage them at claude.ai/code/routines, or from the CLI with <code>/schedule</code>."</blockquote>

<p><strong>API trigger 호출 예시 (직접 인용):</strong></p>
<pre><code>curl -X POST https://api.anthropic.com/v1/claude_code/routines/trig_01ABCDEFGHJKLMNOPQRSTUVW/fire \
  -H "Authorization: Bearer sk-ant-oat01-xxxxx" \
  -H "anthropic-beta: experimental-cc-routine-2026-04-01" \
  -H "anthropic-version: 2023-06-01" \
  -H "Content-Type: application/json" \
  -d '{"text": "Sentry alert SEN-4521 fired in prod. Stack trace attached."}'</code></pre>
<p>response body로 <code>claude_code_session_id</code>·<code>claude_code_session_url</code> 반환.</p>

<p><strong>GitHub 트리거 가능 이벤트 (docs 표 일부):</strong></p>
<p>Pull request, Pull request review, Push, Release, Issues, Issue comment, Workflow run, Workflow job, Workflow dispatch, Repository dispatch 등.</p>

<p><strong>실행 권한 (직접 인용):</strong></p>
<blockquote>"Routines run autonomously as full Claude Code cloud sessions: there is no permission-mode picker and no approval prompts during a run."</blockquote>

<p><strong>브랜치 보호 기본값 (직접 인용):</strong></p>
<blockquote>"By default, Claude can only push to branches prefixed with <code>claude/</code>. This prevents routines from accidentally modifying protected or long-lived branches."</blockquote>

<p><strong>제한:</strong></p>
<ul>
<li>스케줄 최소 간격: 1시간</li>
<li>일일 run 캡 (계정별)</li>
<li>GitHub 트리거: 라우틴별·계정별 시간당 캡, 초과 이벤트는 drop</li>
<li>API trigger 토큰은 한 번만 표시 (재조회 불가)</li>
</ul>

<p><strong>예시 use case (docs verbatim 일부):</strong></p>
<ul>
<li>Backlog maintenance: 주중 매일 밤 issue tracker 그루밍 + Slack 요약</li>
<li>Alert triage: 모니터링 도구가 endpoint 호출 → stack trace 분석 + 수정 PR draft</li>
<li>Bespoke code review: pull_request.opened에 반응 → 보안·성능·스타일 inline comment</li>
<li>Deploy verification: CD 파이프라인 호출 → smoke check + go/no-go 게시</li>
<li>Library port: 한 SDK repo의 merged PR을 다른 언어 SDK에 자동 포팅</li>
</ul>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 Claude Code는 사용자가 터미널을 열고 있는 동안만 실행됐는데, Routines는 <strong>"laptop closed에서도 동작하는 cloud 자율 실행"</strong>으로 패러다임을 확장합니다. <code>/schedule</code> CLI 명령은 기존 사용자에게도 친숙한 진입점. 핵심 차이는 (1) Anthropic이 인프라를 관리, (2) GitHub Webhook + API 호출이 1급 트리거, (3) <code>claude/</code> 브랜치 prefix로 안전망. <strong>"Permission mode가 없다"</strong>는 점은 운영 시 prompt 자체가 자기충족적이고 명시적이어야 함을 의미 — 잘못 작성하면 routine이 의도하지 않은 작업을 자동 수행할 위험이 있습니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>Routines vs Skills vs Hooks</strong>: 일반적으로 Skills는 "에이전트의 능력 정의", Hooks는 "이벤트 시 임의 스크립트 실행", Routines는 "전체 Claude Code 세션 자체를 외부 트리거로 시작". Anthropic 측 종속 인프라(클라우드)에서 돌아간다는 점이 Hooks와의 가장 큰 차이.</p>
<p><strong>research preview</strong>: 일반적으로 Anthropic 신기능은 Research Preview → GA 순서. 이 docs도 "Behavior, limits, and the API surface may change" 명시.</p>
<p><strong>원문</strong>: <a href="https://code.claude.com/docs/en/routines" class="source-link">code.claude.com/docs/en/routines</a></p>
<p><strong>HN discussion</strong>: <a href="https://news.ycombinator.com/item?id=47768133" class="source-link">news.ycombinator.com/item?id=47768133</a></p>
</div>
