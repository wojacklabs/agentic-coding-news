---
layout: default
title: "Claude.ai/API/Code 4월 15일 장애 — API 복구 후에도 OAuth 로그인 블로킹 계속"
---

<a href="../2026-04-16" class="back-link">&larr; 4월 16일 목록</a>

# Claude 4월 15일 장애 — 로그인 계속 고장

<div class="meta-line"><span class="tag tag-hn">HN</span> 00:47 KST</div>

> 4월 15일 14:53 UTC 시작된 Claude 전 서비스 장애. claudestatus.com은 API는 16:01 UTC에 복구했다고 명시하지만 Claude.ai·Claude Code 로그인은 여전히 고장. HN score 165 (47779730), 134+ 댓글. posted 2026-04-15 14:44 UTC.

<div class="context-block">
<h4>출처 핵심 (claudestatus.com + HN 47779730에서 확인되는 내용만)</h4>

<p><strong>장애 상태 (claudestatus.com 직접 인용):</strong></p>
<blockquote>"The Claude API has fully recovered as of 8:01 PT / 16:01 UTC. We are currently working on mitigating the ongoing errors for Claude AI. Claude Code users who are logged in are still able to use it, but logging in is still broken."</blockquote>

<p><strong>Identified</strong>: 2026-04-15 14:53 UTC</p>

<p><strong>영향 범위 (status 페이지 명시)</strong>:</p>
<ul>
<li>Claude.ai — Degraded</li>
<li>Claude API — 16:01 UTC 복구 (Operational)</li>
<li>Claude Code — Degraded (로그인 불가, 기존 세션은 사용 가능)</li>
<li>Developer Console/platform.claude.com — Degraded</li>
</ul>

<p><strong>구체 에러 패턴 (status 페이지)</strong>:</p>
<ul>
<li>Login failures via OAuth</li>
<li>File upload issues</li>
<li>Authentication errors on Claude.ai and Claude Code</li>
<li>Image upload problems on mobile</li>
</ul>

<p><strong>지표 (status 페이지)</strong>:</p>
<ul>
<li>30-day uptime: Claude.ai 89.48%, Developer Console 91.37%, API 91.18%, Claude Code 90.85%</li>
<li>7-day reliability: 93.01%</li>
</ul>

<p><strong>HN 커뮤니티 관찰 (직접 인용):</strong></p>
<blockquote>"Seems to be a very regular occurrence starting around this time of day (14:30 UTC)... Claude Code returning: API Error: 500" — edf13</blockquote>
<blockquote>"US Pacific comes online while London is still working and they can't handle it. $380bn valuation btw." — walthamstow</blockquote>
<blockquote>"No amount of valuation can fix global supply issues for GPUs for inference. They're highly oversubscribed." — jjcm</blockquote>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 Claude Code 사용자는 OAuth 토큰이 만료되지 않는 한 로그인 중단에 즉시 노출되지 않지만, 이번 사건은 <strong>"기존 세션은 살고 신규 로그인만 고장"</strong>이라는 파티션드 장애입니다. 어제(2026-04-15) tick 1에서 다룬 <strong>2.1.107 OAuth paste bug</strong>와 이번 로그인 incident가 같은 날 중첩되며, 이 기간에 claude login을 시도한 사용자는 원인 식별이 어려울 수 있습니다 — 앱 버그인지, 서버 장애인지, 네트워크인지. 또한 HN edf13의 "14:30 UTC에 매일 정기적으로 발생"이라는 관찰이 사실이면 <strong>미 서부 피크 타임(08:30 PT)</strong>에 유럽 세션이 아직 남아 생기는 용량 부족 추정이 댓글에서 제기됐습니다. API는 1시간 8분 만에 복구, 로그인은 더 오래.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>OAuth 로그인 경로</strong>: 일반적으로 Claude Code는 <code>claude login</code> 시 OAuth flow를 거치고 세션 토큰을 로컬 저장. 로그인만 고장나면 신규 기기·재인증만 막힘.</p>
<p><strong>status page 지표 해석</strong>: 일반적으로 90% 초반 uptime은 SLA 수준에서 낮은 편. 여러 outage 누적이 반영된 것으로 보임.</p>
<p><strong>원문</strong>: <a href="https://claudestatus.com/" class="source-link">claudestatus.com</a></p>
<p><strong>HN discussion</strong>: <a href="https://news.ycombinator.com/item?id=47779730" class="source-link">news.ycombinator.com/item?id=47779730</a></p>
</div>
