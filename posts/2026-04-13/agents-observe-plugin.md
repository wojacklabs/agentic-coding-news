---
layout: default
title: "Agents Observe — Claude Code Hooks 기반 실시간 멀티에이전트 대시보드"
---

<a href="../2026-04-13" class="back-link">&larr; 4월 13일 목록</a>

# Agents Observe — Hooks 기반 대시보드

<div class="meta-line"><span class="tag tag-hn">HN</span> 21:39 KST</div>

> Claude Code Hooks를 활용해 PreToolUse/PostToolUse 이벤트를 실시간으로 캡처·시각화하는 오픈소스 대시보드. Claude Code 플러그인으로 설치, 슬래시 명령 5종 제공.

<div class="context-block">
<h4>출처 핵심 (GitHub README에서 확인되는 내용만)</h4>

<p><strong>핵심 목적</strong>: "Real-time observability dashboard for Claude Code agents" with "powerful filtering, searching, and visualization of multi-agent sessions."</p>

<p><strong>제공 기능 (verbatim):</strong></p>
<ul>
<li>"Watch tool calls stream in as they happen (PreToolUse → PostToolUse with results)"</li>
<li>"See the full agent hierarchy — which subagent was spawned by which parent"</li>
<li>"Filter by agent, tool type, or search across all events"</li>
<li>"Expand any event to see the full payload, command, and result"</li>
<li>자동 생성된 세션 이름으로 과거 세션 브라우징 (예: "twinkly-hugging-dragon")</li>
</ul>

<p><strong>Claude Code 통합 — 플러그인 설치 + 슬래시 명령:</strong></p>
<ul>
<li><code>/observe</code> — 대시보드 열기 + 서버 상태 확인</li>
<li><code>/observe status</code> — 서버 health, version, runtime, config</li>
<li><code>/observe start/stop/restart</code> — 서버 라이프사이클</li>
<li><code>/observe logs</code> — Docker 컨테이너 로그</li>
<li><code>/observe debug</code> — 설치/연결 진단</li>
</ul>

<p><strong>이벤트 캡처 메커니즘 (직접 인용):</strong></p>
<blockquote>"The hook script is a dumb pipe — it reads the raw event from stdin, adds the project name, and POSTs it to the server."</blockquote>

<p><strong>기술 스택:</strong></p>
<ul>
<li>Backend: Node.js + Hono routes + SQLite + WebSocket</li>
<li>Frontend: React 19 + shadcn UI</li>
<li>Infra: Docker 컨테이너</li>
</ul>

<p><strong>실행 요건</strong>: Docker(컨테이너) + Node.js(hook script). 기본 대시보드 포트 <code>http://localhost:4981</code>.</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 멀티 에이전트 환경에서 "어떤 에이전트가 무엇을 하고 있는지" 파악하기 어렵습니다. Agents Observe는 Claude Code의 <strong>Hooks 시스템을 그대로 활용</strong>한다는 점에서 추가 침습 없이 도입할 수 있는 운영 도구로 보입니다. 슬래시 명령으로 서버 라이프사이클까지 묶은 점도 실용적이며, 향후 팀 단위 Claude Code 운영에서 일반 패턴이 될 가능성이 있습니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>Claude Code Hooks</strong>: 일반적으로 PreToolUse, PostToolUse, UserPromptSubmit 등 이벤트 시점에 외부 스크립트를 호출하는 메커니즘. stdin으로 raw event JSON을 받아 사용자가 임의 처리 가능.</p>
<p><strong>원문</strong>: <a href="https://github.com/simple10/agents-observe" class="source-link">github.com/simple10/agents-observe</a></p>
<p><strong>HN discussion</strong>: <a href="https://news.ycombinator.com/item?id=47602986" class="source-link">news.ycombinator.com/item?id=47602986</a></p>
</div>
