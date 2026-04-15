---
layout: default
title: "ClawRun — 오픈소스 AI 에이전트 호스팅·라이프사이클 관리, Vercel Sandbox 기반"
---

<a href="../2026-04-15" class="back-link">&larr; 4월 15일 목록</a>

# ClawRun — 에이전트 호스팅 + 라이프사이클

<div class="meta-line"><span class="tag tag-hn">HN</span> 12:50 KST</div>

> 오픈소스 AI 에이전트를 secure sandbox에 배포·관리하는 호스팅 레이어. Vercel Sandbox 기본, sleep/wake 자동화 + multi-channel (Telegram/Discord/Slack/WhatsApp). <code>npx clawrun deploy</code> 한 줄 배포. HN score 25, 04-14 posted.

<div class="context-block">
<h4>출처 핵심 (GitHub README WebFetch에서 확인되는 내용만)</h4>

<p><strong>정체 (직접 인용):</strong></p>
<blockquote>"a hosting and lifecycle layer for open-source AI agents."</blockquote>

<p><strong>기본 sandbox</strong>: 현재 Vercel Sandbox. 추가 provider는 계획 중.</p>

<p><strong>관리하는 라이프사이클 단계:</strong></p>
<ul>
<li>startup</li>
<li>heartbeat monitoring</li>
<li>snapshot/resume</li>
<li>wake-on-message triggering</li>
</ul>

<p><strong>주요 기능:</strong></p>
<ul>
<li>Single-command 배포</li>
<li>Persistent sandbox + sleep/wake 자동화 (activity 기반)</li>
<li>Multi-channel 메시징 통합: Telegram, Discord, Slack, WhatsApp</li>
<li>Web 대시보드 + CLI 관리·실시간 채팅</li>
<li>비용 추적·예산 enforcement</li>
<li>Pluggable architecture — 에이전트/provider/채널 모두 확장 가능</li>
</ul>

<p><strong>설치:</strong></p>
<pre><code>npx clawrun deploy</code></pre>

<p><strong>스택</strong>: TypeScript 88.6% (monorepo, pnpm workspaces + Turbo). 라이선스 Apache-2.0.</p>

<p><strong>Claude Code 지원 여부</strong>: README의 <code>AGENTS.md</code>에서 지원 에이전트 명세를 참조하라는 언급이 있으나, 이 기사 출처 범위(GitHub README WebFetch 결과)에서는 <strong>Claude Code가 명시적 지원 에이전트로 나열되지 않음</strong>. "pluggable architecture"가 Claude Code 포함을 시사할 수는 있으나 확정 불가.</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 Anthropic의 Routines는 클로즈드 Anthropic 인프라에서만 돌아가는 반면, ClawRun 같은 <strong>오픈소스 호스팅 레이어</strong>는 "Vercel Sandbox 포함 다중 provider 선택"·"에이전트 프레임워크 플러그블"이라는 독립적 운영 옵션을 제공합니다. sleep/wake + multi-channel은 24/7 자율 에이전트의 기본 요건이라, <strong>Claude Code와 이 계열 호스팅을 결합하려면</strong> ClawRun의 AGENTS.md 확인 + 수동 플러그인 작성이 필요할 가능성이 있습니다. scope 경계에 걸친 도구이므로 Claude Code 단독 사용자보다는 멀티 에이전트 환경을 구축하려는 팀에 더 관련이 큽니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>Vercel Sandbox</strong>: 일반적으로 격리된 cloud 실행 환경 제공. sleep/wake 같은 lifecycle 원형 기능이 이미 포함되어 있음.</p>
<p><strong>원문</strong>: <a href="https://github.com/clawrun-sh/clawrun" class="source-link">github.com/clawrun-sh/clawrun</a></p>
<p><strong>HN discussion</strong>: <a href="https://news.ycombinator.com/item?id=47770020" class="source-link">news.ycombinator.com/item?id=47770020</a></p>
</div>
