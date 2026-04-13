---
layout: default
title: "Anthropic, 조용히 기본 cache TTL을 1시간 → 5분으로 단축 — 비용 충격"
---

<a href="../2026-04-13" class="back-link">&larr; 4월 13일 목록</a>

# Cache TTL 1h → 5min 조용한 변경

<div class="meta-line"><span class="tag tag-reddit">Reddit</span> 17:34 KST</div>

> 4월 2일 Anthropic이 기본 cache TTL을 **1시간 → 5분**으로 조용히 변경. Claude Code 사용자들의 토큰 비용이 이유 없이 급증한 원인이 드러남. r/ClaudeAI에서 JSONL 로그 분석으로 검증.

"최근 Claude Code가 토큰을 너무 많이 쓴다"는 체감의 실체. 프롬프트 캐시가 매번 재생성되면서 cache write/read 비율이 심각하게 무너진 상태입니다.

<div class="context-block">
<h4>실전 핵심 — JSONL 로그로 검증하는 방법</h4>
<p><strong>확인 방법:</strong></p>
<ul>
<li>Claude Code 세션 JSONL(<code>~/.claude/projects/.../session.jsonl</code>)에서 <code>cache_creation_input_tokens</code>와 <code>cache_read_input_tokens</code> 비율 비교</li>
<li>건강한 세션: cache_read가 압도적으로 많아야 함 (재사용 효율)</li>
<li>4월 2일 이후: 5분 지나면 cache miss → cache_creation이 반복 발생 → 비용 폭증</li>
</ul>
<p><strong>플랜별 차이:</strong></p>
<ul>
<li>Max 플랜: 여전히 1시간 TTL 유지 (공식 정책)</li>
<li>Pro/기본 API: 5분으로 단축됨</li>
<li>공지 없이 변경되어 상당 기간 논쟁 → JSONL 증거로 확정</li>
</ul>
<p><strong>대응:</strong></p>
<ul>
<li><code>anthropic-beta: extended-cache-ttl-2025-04-11</code> 헤더를 명시적으로 보내거나 SDK에서 TTL 지정</li>
<li>장기 작업은 한 번에 묶어 5분 안에 끝내도록 배치</li>
<li>비용 이슈면 Max 플랜 고려</li>
</ul>
</div>

<div class="context-block">
<h4>왜 중요한가</h4>
<p>Claude Code의 체감 비용·속도가 나빠졌다는 사용자 보고의 <strong>근본 원인 중 하나</strong>가 이 기본값 변경. Anthropic의 "Adaptive Thinking"(어제 다룸)과 함께, <strong>사용자에게 공지 없이 조정되는 내부 파라미터</strong>가 체감 품질에 큰 영향을 미친다는 구조적 문제를 드러냅니다. 팀·조직 레벨에서 API 비용을 관리한다면 JSONL 로그 기반 모니터링이 이제 필수.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>Prompt Caching TTL</strong>: Anthropic API의 프롬프트 캐시는 설정된 TTL 동안 유지되며, TTL 내에 재사용하면 <em>cache read 가격</em>(매우 저렴)으로 청구. TTL이 지나면 <em>cache write</em>(일반 가격의 1.25배)가 다시 발생.</p>
<p><strong>cache_read vs cache_creation 비율</strong>: 장기 대화에서는 1:10 이상이 건강한 비율. 이 비율이 1:1 근처로 떨어지면 캐시가 사실상 무용. <a href="https://www.reddit.com/r/ClaudeAI/comments/1sk3m12/followup_anthropic_quietly_switched_the_default/" class="source-link">원 분석 Reddit</a></p>
</div>
