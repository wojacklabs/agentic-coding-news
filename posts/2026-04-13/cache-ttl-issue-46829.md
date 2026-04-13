---
layout: default
title: "GitHub Issue #46829 — Claude Code cache TTL 1h → 5m 전환 논쟁, Anthropic CLOSED"
---

<a href="../2026-04-13" class="back-link">&larr; 4월 13일 목록</a>

# Cache TTL 이슈 — Anthropic 답변 포함

<div class="meta-line"><span class="tag tag-hn">HN</span> 19:02 KST</div>

> 사용자가 119,866 API calls를 분석해 "2026-03-06 1h→5m 기본값 전환"을 주장한 GitHub 이슈. Anthropic staff가 "의도된 최적화, 후퇴가 아님"이라 답변하며 CLOSED (NOT_PLANNED) 처리.

<div class="context-block">
<h4>출처 핵심 (GitHub Issue #46829에서 확인되는 내용만)</h4>

<p><strong>메타정보:</strong></p>
<ul>
<li>Reporter: <strong>seanGSISG</strong></li>
<li>Date Filed: 2026-04-12</li>
<li>Status: <strong>CLOSED (NOT_PLANNED)</strong></li>
</ul>

<p><strong>리포터의 주장 (직접 인용):</strong></p>
<blockquote>"Analysis of raw Claude Code session JSONL files spanning Jan 11 – Apr 11, 2026 shows that Anthropic appears to have silently changed the prompt cache TTL default from 1 hour to 5 minutes sometime in early March 2026."</blockquote>

<p><strong>증거 — 119,866 API calls 분석 (Linux + Windows 2대):</strong></p>
<table>
<tr><th>Phase</th><th>기간</th><th>행태</th></tr>
<tr><td>1</td><td>Jan 11–31</td><td>5m only (<code>ephemeral_1h</code> 부재/0)</td></tr>
<tr><td>2</td><td>Feb 1–Mar 5</td><td><strong>1h only</strong> — 33+ 연속일, 5m 토큰 0</td></tr>
<tr><td>3</td><td>Mar 6–7</td><td>전환기 — 5m 토큰 재등장</td></tr>
<tr><td>4</td><td>Mar 8–Apr 11</td><td>5m 우위 — 1h 대비 5:1</td></tr>
</table>

<p><strong>리포터 비용 계산:</strong></p>
<ul>
<li>claude-sonnet-4-6: 총 $949.08 overpaid (17.1% waste), 3월만 $719.09 (25.9% waste), 2월만 $12.32 (1.1% — 1h 활성 시)</li>
<li>claude-opus-4-6: 총 $1,581.80 overpaid (17.1% waste)</li>
</ul>

<p><strong>리포터가 제시한 요율:</strong></p>
<ul>
<li>Sonnet: cache_write_5m $3.75/MTok, cache_write_1h $6.00/MTok, cache_read $0.30/MTok</li>
<li>Opus: cache_write_5m $6.25/MTok, cache_write_1h $10.00/MTok, cache_read $0.50/MTok</li>
</ul>

<p><strong>Anthropic staff 답변 (Jarred-Sumner, 직접 인용):</strong></p>
<blockquote>"The March 6 change makes Claude Code cheaper, not more expensive. 1h TTL for every request could cost more, not less."</blockquote>
<blockquote>"Prompt cache optimization is something the Claude Code team invests heavily in on an ongoing basis. Different request types benefit from different TTL tiers, and the client selects per request. The March 6 change you spotted is part of that ongoing optimization work — it wasn't a regression, on balance it lowers total cost for users across the request mix."</blockquote>

<p><strong>Anthropic 설명 핵심:</strong></p>
<ol>
<li>3월 6일 변경은 의도된 것, 진행 중인 최적화의 일부</li>
<li>"single global default"가 아니라 <strong>클라이언트가 요청별로 TTL을 선택</strong>하는 설계</li>
<li>1h write는 5m write보다 더 비쌈(대략 base input의 2× vs 1.25×) — one-shot request에서는 오히려 1h가 손해</li>
<li>v2.1.90에서 quota 초과 세션의 quota 소비 관련 클라이언트 버그 수정</li>
</ol>

<p><strong>분석 도구</strong>: cnighswonger/claude-code-cache-fix의 <code>quota-analysis --source</code> 모드. 가격 자료는 2026-04-09 업데이트된 Anthropic <code>rates.json</code>.</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>이 이슈는 "사용자가 느낀 체감(비용 급증)"과 "Anthropic의 설계 의도(요청별 최적화)"가 정면으로 부딪힌 드문 공개 논쟁입니다. Status가 CLOSED(NOT_PLANNED)라는 점은 Anthropic이 이 변경을 회귀로 보지 않는다는 입장을 공식화한 것으로 읽힙니다. 일반적으로 캐시 TTL 정책은 내부 API 변경 사항이라 공지 없이 조정되며, 사용자는 JSONL 로그 같은 1차 자료 분석으로만 역추적할 수 있습니다. 이 이슈는 그런 역추적 방법론을 구체적 수치와 함께 공유했다는 점에서 참고할 만합니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>Prompt cache 요율 구조(일반)</strong>: Anthropic 공식 가격표는 cache write(TTL 등급별 차등)와 cache read를 구분합니다. 유사 상품 전반적으로 cache read는 일반 input의 1/10 수준으로 저렴하게 책정되는 것이 일반적입니다.</p>
<p><strong>JSONL 로그 활용</strong>: 일반적으로 Claude Code 세션 로그는 <code>~/.claude/projects/</code> 하위에 JSONL로 저장되며, <code>cache_creation_input_tokens</code> / <code>cache_read_input_tokens</code> 필드로 TTL 분포를 직접 집계할 수 있습니다.</p>
<p><strong>원문</strong>: <a href="https://github.com/anthropics/claude-code/issues/46829" class="source-link">github.com/anthropics/claude-code/issues/46829</a></p>
</div>
