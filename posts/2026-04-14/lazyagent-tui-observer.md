---
layout: default
title: "Lazyagent — Claude Code·Codex·OpenCode 에이전트 실행을 한 곳에서 관찰하는 터미널 TUI"
---

<a href="../2026-04-14" class="back-link">&larr; 4월 14일 목록</a>

# Lazyagent — 멀티 에이전트 TUI Observer

<div class="meta-line"><span class="tag tag-hn">HN</span> 18:37 KST</div>

> Claude Code·Codex·OpenCode 세 가지 에이전트의 실행 이벤트를 훅/플러그인으로 수집해 한 터미널 TUI에서 관찰하는 도구. 여러 에이전트를 동시에 돌릴 때 "지금 뭐 하고 있는지" 한눈에 보이도록 설계.

<div class="context-block">
<h4>출처 핵심 (GitHub README에서 확인되는 내용만)</h4>

<p><strong>핵심 정의 (직접 인용):</strong></p>
<blockquote>"a terminal TUI app for watching what ai agents are doing."</blockquote>

<p>프로젝트·세션·에이전트·서브에이전트·도구·프롬프트·출력을 한 인터페이스에 표시.</p>

<p><strong>지원 에이전트 3종:</strong></p>
<ol>
<li><strong>Claude Code</strong>: <code>~/.claude/settings.json</code>에 등록된 런타임 hook으로 통합</li>
<li><strong>Codex</strong>: <code>~/.codex/hooks.json</code> 통한 hook 구성</li>
<li><strong>OpenCode</strong>: <code>~/.config/opencode/plugins/lazyagent.ts</code> TypeScript 플러그인</li>
</ol>

<p><strong>설치 방법:</strong></p>
<ul>
<li>Homebrew: <code>brew install --cask lazyagent</code></li>
<li>Go: <code>go install github.com/chojs23/lazyagent/cmd/lazyagent@latest</code></li>
<li>Nix: <code>nix run github:chojs23/lazyagent</code></li>
<li>Curl: <code>curl -fsSL https://raw.githubusercontent.com/chojs23/lazyagent/main/scripts/install.sh | sh</code></li>
<li>소스 빌드: <code>go build -o ./bin/lazyagent ./cmd/lazyagent</code></li>
</ul>

<p><strong>이벤트 수집 (Claude 경로):</strong></p>
<p>PreToolUse, PostToolUse, SessionStart, SessionEnd, Stop, SubagentStop, Notification, UserPromptSubmit 캡처.</p>

<p><strong>데이터 저장</strong>: SQLite, 기본 경로 <code>~/.lazyagent/observe.db</code>. 환경변수로 커스터마이즈 가능.</p>

<p><strong>Codex 활성화</strong>: <code>features.codex_hooks = true</code> 설정 필요.</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 Claude Code만 써도 subagents가 늘어나면 "어느 subagent가 어느 도구를 호출 중인지" 파악이 어려워지고, 여기에 Codex·OpenCode까지 병행하면 관찰 부담이 배가됩니다. Lazyagent는 <strong>세 에이전트의 이벤트를 같은 스키마로 SQLite에 모으는</strong> 접근이라, 사후 디버깅·토큰 소비 분석의 기반 자료로 활용 가능합니다. Claude Code Hooks를 그대로 쓴다는 점에서 추가 침습도 적습니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>Claude Code Hooks 이벤트 종류</strong>: 일반적으로 PreToolUse/PostToolUse/SessionStart/SessionEnd/Stop/SubagentStop/Notification/UserPromptSubmit 등이 노출되며, 각 이벤트는 stdin으로 raw JSON을 외부 스크립트에 전달합니다.</p>
<p><strong>원문</strong>: <a href="https://github.com/chojs23/lazyagent" class="source-link">github.com/chojs23/lazyagent</a></p>
<p><strong>HN discussion</strong>: <a href="https://news.ycombinator.com/item?id=47741279" class="source-link">news.ycombinator.com/item?id=47741279</a></p>
</div>
