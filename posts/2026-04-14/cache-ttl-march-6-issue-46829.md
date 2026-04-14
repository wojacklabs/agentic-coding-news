---
layout: default
title: "Anthropic이 3월 6일 cache TTL을 1h→5m으로 조용히 다운그레이드 — GitHub issue #46829"
---

<a href="../2026-04-14" class="back-link">&larr; 4월 14일 목록</a>

# Cache TTL 1h→5m 조용한 변경 (Issue #46829)

<div class="meta-line"><span class="tag tag-hn">HN</span> 19:00 KST</div>

> 사용자가 119,866 API calls 분석으로 2026-03-06 시점에 Anthropic이 prompt cache TTL 기본값을 1시간에서 5분으로 변경했다고 보고. HN score 104. Anthropic staff(Jarred-Sumner) "의도된 최적화" 답변 후 CLOSED (NOT_PLANNED).

<div class="context-block">
<h4>출처 핵심 (GitHub Issue #46829에서 확인되는 내용만)</h4>

<p><strong>메타:</strong></p>
<ul>
<li>Reporter: seanGSISG</li>
<li>Date Filed: 2026-04-12</li>
<li>Status: CLOSED (NOT_PLANNED)</li>
</ul>

<p><strong>리포터 주장 (직접 인용):</strong></p>
<blockquote>"Analysis of raw Claude Code session JSONL files spanning Jan 11 – Apr 11, 2026 shows that Anthropic appears to have silently changed the prompt cache TTL default from 1 hour to 5 minutes sometime in early March 2026."</blockquote>

<p><strong>증거 — 119,866 API calls 분석 (Linux + Windows 2대):</strong></p>
<table>
<tr><th>Phase</th><th>기간</th><th>행태</th></tr>
<tr><td>1</td><td>Jan 11–31</td><td>5m only</td></tr>
<tr><td>2</td><td>Feb 1–Mar 5</td><td>1h only — 33일간 5m 토큰 0</td></tr>
<tr><td>3</td><td>Mar 6–7</td><td>전환기 — 5m 토큰 재등장</td></tr>
<tr><td>4</td><td>Mar 8–Apr 11</td><td>5m 우위, 1h 대비 5:1</td></tr>
</table>

<p><strong>리포터 비용 계산:</strong></p>
<ul>
<li>claude-sonnet-4-6: 총 $949.08 overpaid (17.1%), 3월만 $719.09 (25.9%)</li>
<li>claude-opus-4-6: 총 $1,581.80 overpaid (17.1%)</li>
</ul>

<p><strong>Anthropic staff (Jarred-Sumner) 답변 (직접 인용):</strong></p>
<blockquote>"The March 6 change makes Claude Code cheaper, not more expensive. 1h TTL for every request could cost more, not less."</blockquote>
<blockquote>"Prompt cache optimization is something the Claude Code team invests heavily in on an ongoing basis. Different request types benefit from different TTL tiers, and the client selects per request. The March 6 change you spotted is part of that ongoing optimization work — it wasn't a regression, on balance it lowers total cost for users across the request mix."</blockquote>

<p><strong>Anthropic 설명 4요점:</strong></p>
<ol>
<li>3월 6일 변경은 의도된 최적화</li>
<li>"single global default"가 아니라 클라이언트가 요청별로 TTL 선택</li>
<li>1h write가 5m write보다 비쌈(대략 base input의 2× vs 1.25×) — one-shot request에서는 오히려 1h가 손해</li>
<li>v2.1.90에서 quota 초과 세션의 quota 소비 관련 클라이언트 버그 수정</li>
</ol>

<p><strong>분석 도구</strong>: cnighswonger/claude-code-cache-fix의 <code>quota-analysis --source</code> 모드. 가격은 Anthropic <code>rates.json</code> (2026-04-09 업데이트).</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 이 이슈는 "사용자 체감(비용 증가)" vs "Anthropic 공식 입장(최적화)"이 정면으로 부딪힌 드문 공개 논쟁입니다. CLOSED (NOT_PLANNED)는 Anthropic이 이를 회귀로 보지 않는다는 공식화로 읽힙니다. 오늘 등장한 issue #45381("telemetry OFF 시 cache TTL 강등")과 조합하면, <strong>동일한 TTL 메커니즘 주변에서 여러 보고가 누적</strong>되고 있다는 점이 드러납니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>JSONL 세션 로그 기반 역추적</strong>: 일반적으로 <code>~/.claude/projects/*/*.jsonl</code>의 <code>usage.cache_creation</code>에서 <code>ephemeral_1h_input_tokens</code> / <code>ephemeral_5m_input_tokens</code> 비율로 TTL 분포를 집계할 수 있습니다. 공개 정책 변경 없이도 사용자가 직접 포착 가능.</p>
<p><strong>원문</strong>: <a href="https://github.com/anthropics/claude-code/issues/46829" class="source-link">github.com/anthropics/claude-code/issues/46829</a></p>
<p><strong>HN discussion</strong>: <a href="https://news.ycombinator.com/item?id=47736476" class="source-link">news.ycombinator.com/item?id=47736476</a></p>
</div>
