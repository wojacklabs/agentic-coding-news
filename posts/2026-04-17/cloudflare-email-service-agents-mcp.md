---
layout: default
title: "Cloudflare Email Service for Agents — Claude Code가 MCP로 이메일 send/receive, onEmail hook + Durable Objects 상태"
---

<a href="../2026-04-17" class="back-link">&larr; 4월 17일 목록</a>

# Cloudflare Email Service — Agents Integration

<div class="meta-line"><span class="tag tag-hn">HN</span> 00:47 KST</div>

> Cloudflare Email Service가 public beta 진입. Claude Code·Cursor·Copilot 같은 코딩 에이전트가 Cloudflare MCP 서버를 통해 이메일 send. 에이전트 쪽은 <code>onEmail</code> hook으로 수신, Durable Objects로 상태 유지, HMAC-SHA256 서명으로 안전한 reply routing. posted 2026-04-16, HN score 143 (47792593).

<div class="context-block">
<h4>출처 핵심 (Cloudflare 블로그 블로그에서 확인되는 내용만)</h4>

<p><strong>제품 (블로그 기반 요약)</strong>: Email Sending (신규 public beta) + Email Routing (기존). 통합해 "Cloudflare Email Service"로 출시.</p>

<p><strong>에이전트 동작 (블로그 기반 요약)</strong>:</p>
<ul>
<li>에이전트는 <code>onEmail</code> hook으로 이메일 수신</li>
<li>비동기로 여러 시스템 간 처리 + 독립적으로 응답 가능</li>
<li>Durable Objects로 stateful conversation memory</li>
<li>HMAC-SHA256 서명으로 reply routing 보안</li>
<li>Workers binding으로 send 네이티브 지원</li>
</ul>

<p><strong>MCP 통합 (직접 인용):</strong></p>
<blockquote>"Email is now available through the Cloudflare MCP server"</blockquote>

<p><strong>Claude Code 명시 (직접 인용):</strong></p>
<blockquote>"Agents run everywhere, whether it's coding agents like Claude Code, Cursor, or Copilot running locally or in remote environments."</blockquote>

<p><strong>Wrangler CLI (블로그):</strong></p>
<pre><code>wrangler email send --to "teammate@example.com" --from "agent@your-domain.com"</code></pre>

<p><strong>Workers binding (블로그):</strong></p>
<pre><code>await env.EMAIL.send({to: "user@example.com", from: "notifications@your-domain.com"})</code></pre>

<p><strong>가격</strong>: 이 블로그 범위에서 확인되지 않음.</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 에이전트가 이메일을 보내려면 (a) SMTP 서비스 직접 연동 (b) Gmail MCP 같은 개별 서비스 OAuth를 거쳐야 했습니다. Cloudflare가 <strong>MCP 서버 하나로 send + <code>onEmail</code> hook으로 receive</strong>를 통합 제공하는 접근은, 어제 다룬 Claude Cowork + Gmail MCP 런던 flat hunt 레시피 같은 워크플로의 <strong>플랫폼 중립 대안</strong>을 제공합니다. 특히 <strong>Durable Objects로 "하나의 conversation"에 대한 여러 에이전트 세션 상태 보존</strong>은 이번 주 Claude Code Desktop 재설계에서 강조된 "parallel sessions"와 맞닿습니다. HMAC-SHA256 서명 reply routing은 <strong>에이전트가 보낸 메일에 대한 답장만을 신뢰 처리</strong>하는 암묵적 인증 — prompt injection이 실리는 random inbound를 차단하는 기본 방어선. 다만 Cloudflare 생태계 lock-in이 전제되므로 self-hosted 대안(willow-1.7의 local SAFE manifest 등)과 비교해 선택해야 합니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>Cloudflare Workers / Durable Objects</strong>: 일반적으로 edge runtime과 stateful 객체 스토리지. 세션 상태·카운터 등 작은 state를 지역 분산해 유지.</p>
<p><strong>HMAC-SHA256 reply routing</strong>: 일반적으로 발신 시 서명된 reply-to 주소를 만들고, 회신 시 서명 검증으로 "우리가 보낸 메일의 답장"만 받는 패턴. 스팸·스푸핑 방어.</p>
<p><strong>Cloudflare MCP server</strong>: 일반적으로 Cloudflare 공식 MCP 서버로 여러 Cloudflare 서비스(Workers·D1·R2 등)를 에이전트에 노출.</p>
<p><strong>원문</strong>: <a href="https://blog.cloudflare.com/email-for-agents/" class="source-link">blog.cloudflare.com/email-for-agents</a></p>
<p><strong>HN discussion</strong>: <a href="https://news.ycombinator.com/item?id=47792593" class="source-link">news.ycombinator.com/item?id=47792593</a></p>
</div>
