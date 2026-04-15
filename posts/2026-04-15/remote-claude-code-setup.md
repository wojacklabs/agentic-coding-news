---
layout: default
title: "iPhone에서 집의 Claude Code 조작 — cmux + tmux + Tailscale + Echo iOS 셋업"
---

<a href="../2026-04-15" class="back-link">&larr; 4월 15일 목록</a>

# Remote Claude Code — local-feeling 셋업

<div class="meta-line"><span class="tag tag-hn">HN</span> 18:50 KST</div>

> 집 맥에서 돌아가는 다중 Claude Code 세션을 iPhone에서 local처럼 조작하는 공유 셋업. cmux + tmux + Tailscale + Echo iOS(+ Mosh 선택). <code>ccode</code> 셸 함수까지 gist로 공개. HN score 3, posted 2026-04-15.

<div class="context-block">
<h4>출처 핵심 (HN 포스트 본문에서 확인되는 내용만)</h4>

<p><strong>시나리오 (직접 인용):</strong></p>
<blockquote>"I run multiple Claude Code sessions on my Mac at home and control them from my iPhone while I'm out. I like this because it gives me maximum power and flexibility (I can use any plugin or CLI as if I were sitting there locally)."</blockquote>

<p><strong>스택 구성:</strong></p>
<ul>
<li><strong>cmux</strong> — 터미널 멀티플렉서 UI</li>
<li><strong>tmux</strong> — 연결 유지를 위한 세션 유지</li>
<li><strong>Tailscale</strong> — zero-config 암호화 네트워킹</li>
<li><strong>Echo app</strong> — iOS SSH 클라이언트</li>
<li><strong>Mosh</strong> (선택) — 네트워크 전환 시 auto-reconnect</li>
</ul>

<p><strong>포함된 함수 (직접 인용):</strong></p>
<blockquote>"The gist includes a ccode shell function that handles session naming, tmux lifecycle, continue/skip-permissions flags, and a pre-flight check so you don't get a blank window when there's nothing to continue."</blockquote>

<p><strong>gist URL</strong>: <code>gist.github.com/Reebz/99db98ad4d3c45ebed84989a13710788</code></p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 Anthropic이 어제 발표한 Claude Code Desktop "Dispatch from phone" 기능과 Routines가 공식 원격 솔루션이지만, 이 셋업은 <strong>Anthropic 인프라에 의존하지 않는 self-hosted 대안</strong>입니다. 플러그인·CLI·파일시스템이 모두 본인 맥에 있어서 "local-feeling"이 유지되고, Tailscale로 방화벽·포트 포워딩 없이 접근 가능. <code>ccode</code> 함수의 "pre-flight check so you don't get a blank window when there's nothing to continue"는 모바일에서 SSH 재접속 시 자주 겪는 UX 문제를 직접 해결한 세부입니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>Tailscale</strong>: 일반적으로 WireGuard 기반 mesh VPN. 여러 기기를 같은 사설 네트워크에 편입시켜 퍼블릭 IP·포트 포워딩 없이 상호 통신.</p>
<p><strong>Mosh</strong>: 일반적으로 SSH 위에 놓이는 모바일 친화 셸 클라이언트. 네트워크가 바뀌어도 세션이 유지되는 것이 핵심.</p>
<p><strong>원문</strong>: <a href="https://gist.github.com/Reebz/99db98ad4d3c45ebed84989a13710788" class="source-link">gist.github.com/Reebz/99db98ad4d3c45ebed84989a13710788</a></p>
<p><strong>HN discussion</strong>: <a href="https://news.ycombinator.com/item?id=47775039" class="source-link">news.ycombinator.com/item?id=47775039</a></p>
</div>
