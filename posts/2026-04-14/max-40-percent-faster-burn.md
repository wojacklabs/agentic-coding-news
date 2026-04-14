---
layout: default
title: "Claude Code Max가 한도를 40% 빨리 태우는 이유 — v2.1.100+ 20K invisible tokens 프록시 분석"
---

<a href="../2026-04-14" class="back-link">&larr; 4월 14일 목록</a>

# Max 40% 빨리 소진 — v2.1.100+ 20K 토큰

<div class="meta-line"><span class="tag tag-reddit">Reddit</span> 19:00 KST</div>

> Claude Code Max (5x plan) 사용자가 3일간 HTTP 프록시(<code>claude-code-logger</code>)로 4개 CC 버전 head-to-head 테스트. v2.1.100+가 서버 측에서 요청마다 ~20K invisible 토큰을 추가해 한도를 40% 빨리 태운다는 증거 제시. score 73.

<div class="context-block">
<h4>출처 핵심 (Reddit 글에서 확인되는 내용만)</h4>

<p><strong>TL;DR (직접 인용):</strong></p>
<blockquote>"Claude Code v2.1.100+ silently adds ~20K invisible tokens to every request, server-side. This eats your limits faster AND may degrade output quality. Downgrade to v2.1.98 for immediate relief. Proxy evidence below."</blockquote>

<p><strong>작성자 셋업:</strong></p>
<ul>
<li>Claude Code Max (5x plan)</li>
<li>3-5 parallel sessions + custom orchestration</li>
<li>증상: "usage limits started hitting way earlier than expected. What used to last a full workday started dying in 2-3 hours."</li>
</ul>

<p><strong>초기 의심 (배제된 원인):</strong></p>
<blockquote>"I assumed it was my setup (too many MCP servers, too much context). Spent a day optimizing. No improvement."</blockquote>

<p><strong>결정적 단서 (직접 인용):</strong></p>
<blockquote>"switching between two Max accounts on the same machine gave completely different token baselines. Same project, same CC version, same prompt (`1+1`). One account showed ~56K context, the other ~78K. A ~22K phantom gap that doesn't appear in any `/context` category."</blockquote>

<p><strong>테스트 방법:</strong></p>
<ul>
<li>HTTP 프록시: <code>claude-code-logger</code>로 full API request/response body 캡처</li>
<li>4개 CC 버전 head-to-head</li>
<li>모드: <code>--print</code> (cold cache, single API call, no session state)</li>
</ul>

<p><strong>결과 표 (candidate text에서 잘림 — 헤더만 확인):</strong></p>
<pre><code>| Version | Request size (bytes) | Billed tokens (cache_creation)</code></pre>
<p>표 본문의 구체 버전별 토큰 수치는 이 기사 출처 범위에서 확인되지 않음.</p>

<p><strong>참고</strong>: 다른 HN 기사 <code>efficienist.com</code> 분석(v2.1.98=49,726 → v2.1.100=69,922, +40%)과 수치적으로 정합. 단 이 Reddit 글의 표 전체는 원문 확인 필요.</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 Claude Max 구독자들 사이에서 "한도가 예전보다 빨리 떨어진다"는 불평이 누적되어 왔는데, 이 글은 <strong>두 계정 간 baseline 차이(56K vs 78K)</strong>라는 통제된 비교로 원인을 v2.1.100+에 좁혔습니다. 같은 기계·같은 프로젝트·같은 "1+1" 프롬프트에서 22K phantom gap이 보이면 사용자 측 원인 가능성이 거의 배제됩니다. 우회는 "<code>npx claude-code@2.1.98</code> 다운그레이드". 다만 다운그레이드는 최신 기능을 포기하는 트레이드오프가 있습니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong><code>--print</code> 모드</strong>: 일반적으로 Claude Code CLI에서 non-interactive로 단일 프롬프트를 실행하는 옵션. 세션 상태 영향 없이 요청 비교하기 좋은 컨트롤 환경.</p>
<p><strong>관련 보고</strong>: 같은 날 HN에 올라온 <code>efficienist.com</code> 분석(v2.1.98 49,726 → v2.1.100 69,922, +40%)이 수치적으로 수렴.</p>
<p><strong>원문</strong>: <a href="https://www.reddit.com/r/ClaudeAI/comments/1sj8o9l/why_claude_code_max_burns_limits_40_faster_with/" class="source-link">r/ClaudeAI 원 스레드</a></p>
</div>
