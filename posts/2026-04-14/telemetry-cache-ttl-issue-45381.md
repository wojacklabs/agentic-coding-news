---
layout: default
title: "GitHub issue #45381 — 텔레메트리 OFF 시 1시간 cache TTL이 5분으로 강등, CLOSED COMPLETED"
---

<a href="../2026-04-14" class="back-link">&larr; 4월 14일 목록</a>

# Telemetry → Cache TTL — Issue #45381

<div class="meta-line"><span class="tag tag-hn">HN</span> 18:37 KST</div>

> Claude Code에서 <code>DISABLE_TELEMETRY=1</code> 또는 <code>CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1</code>을 설정하면 원래 1시간 cache TTL을 받을 세션이 5분 TTL로 떨어진다는 버그 리포트. CLOSED (COMPLETED) 상태.

<div class="context-block">
<h4>출처 핵심 (GitHub Issue #45381에서 확인되는 내용만)</h4>

<p><strong>메타:</strong></p>
<ul>
<li>Reporter: <strong>EmpireJones</strong></li>
<li>Opened: 2026-04-08</li>
<li>Status: <strong>CLOSED (COMPLETED)</strong></li>
<li>Assigned: notitatall</li>
</ul>

<p><strong>주장 (직접 인용, 정리):</strong></p>
<blockquote>"When telemetry is disabled via <code>DISABLE_TELEMETRY=1</code> or <code>CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1</code>, sessions that would otherwise receive 1-hour prompt cache TTL fall back to 5-minute TTL instead."</blockquote>

<p><strong>기대 동작</strong>: Prompt cache TTL 선택은 telemetry 설정과 독립적이어야 함.</p>

<p><strong>재현 방법 — JSONL 로그 분석:</strong></p>
<p>세션 트랜스크립트(<code>~/.claude/projects/*/\*.jsonl</code>)에서 <code>usage.cache_creation</code> 메타데이터 확인:</p>
<ul>
<li><code>usage.cache_creation.ephemeral_1h_input_tokens</code> (0이 아니면 1시간 TTL 활성)</li>
<li><code>usage.cache_creation.ephemeral_5m_input_tokens</code> (0이 아니면 5분 TTL 활성)</li>
</ul>

<p><strong>리포터의 Python 재현 스크립트 결과:</strong></p>
<pre><code>baseline: rc=0 ttl=60m 1h=8215 5m=0
disable_telemetry: rc=0 ttl=5m 1h=0 5m=8094
disable_nonessential_traffic: rc=0 ttl=5m 1h=0 5m=8099</code></pre>
<p>→ telemetry OFF 시 1시간 TTL이 확실히 사라지고 5분만 활성화됨.</p>

<p><strong>확인 코멘트 (2026-04-13, @tavaresgmg)</strong>:</p>
<ul>
<li>macOS + Claude Code 2.1.104</li>
<li><code>DISABLE_TELEMETRY=1</code> 상태: 2500만+ 토큰이 5분 TTL로 처리</li>
<li>변수 제거 후 1시간 TTL 즉시 활성화</li>
<li>2500만+ cached tokens 전체에서 <code>ephemeral_1h_input_tokens</code>가 항상 0</li>
</ul>

<p><strong>환경·예외:</strong></p>
<ul>
<li>Windows, VS Code integrated terminal에서 최초 보고</li>
<li>Claude Opus (Max plan), API 경유</li>
<li>버전: 2.1.96 최초 보고, 2.1.104에서 확인</li>
<li>Bedrock + <code>ENABLE_PROMPT_CACHING_1H_BEDROCK=1</code>에서는 재현 안 됨</li>
</ul>

<p><strong>Anthropic 반응</strong>: 쓰레드에 특정 공식 답변은 보이지 않으나, 이슈가 assign 후 "COMPLETED"로 closed → 코드베이스에서 수정된 것으로 추정.</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 프라이버시 관점에서 텔레메트리를 끄는 사용자가 많지만, 그 결과 <strong>캐시 수명이 12배 짧아져(1h→5m) 실질 토큰 비용이 크게 증가</strong>한다면 사용자 선택에 일관성 없는 패널티가 부과되는 셈입니다. 이슈가 "COMPLETED"로 닫혔으므로 후속 버전에서 수정됐을 가능성이 높지만, 자신의 환경이 수정 반영된 버전인지 JSONL 로그의 <code>ephemeral_1h_input_tokens</code>로 직접 확인하는 것이 안전합니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>Prompt cache TTL 구조</strong>: 일반적으로 Anthropic API는 TTL 등급(5분/1시간)에 따라 cache write 단가가 다르며, 장기 세션에서는 1시간 TTL이 토큰 누적을 크게 줄입니다.</p>
<p><strong>원문</strong>: <a href="https://github.com/anthropics/claude-code/issues/45381" class="source-link">github.com/anthropics/claude-code/issues/45381</a></p>
<p><strong>HN discussion</strong>: <a href="https://news.ycombinator.com/item?id=47749757" class="source-link">news.ycombinator.com/item?id=47749757</a></p>
</div>
