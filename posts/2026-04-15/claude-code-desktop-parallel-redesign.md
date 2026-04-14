---
layout: default
title: "Claude Code Desktop 재설계 — Parallel sessions + Git worktree isolation + drag-drop layout"
---

<a href="../2026-04-15" class="back-link">&larr; 4월 15일 목록</a>

# Claude Code Desktop — Parallel Agentic 작업

<div class="meta-line"><span class="tag tag-reddit">Reddit</span> 06:51 KST</div>

> Anthropic이 Claude Code Desktop을 "parallel agentic work" 중심으로 재설계해 발표. r/ClaudeAI score 121. 공식 docs(<code>code.claude.com/docs/en/desktop</code>)에 전체 기능 명세 게재.

<div class="context-block">
<h4>출처 핵심 (Anthropic 공식 docs verbatim)</h4>

<p><strong>한 줄 정의 (직접 인용):</strong></p>
<blockquote>"Get more out of Claude Code Desktop: parallel sessions with Git isolation, drag-and-drop pane layout, integrated terminal and file editor, side chats, computer use, Dispatch sessions from your phone, visual diff review, app previews, PR monitoring, connectors, and enterprise configuration."</blockquote>

<p><strong>UI 위치</strong>: "The Code tab within the Claude Desktop app lets you use Claude Code through a graphical interface instead of the terminal."</p>

<p><strong>Desktop이 표준 Claude Code 위에 추가하는 기능 (직접 인용 목록):</strong></p>
<ul>
<li>Parallel sessions — automatic Git worktree isolation</li>
<li>Drag-and-drop layout — integrated terminal, file editor, and preview pane</li>
<li>Side chats — branch off without affecting the main thread</li>
<li>Visual diff review — inline comments</li>
<li>Live app preview — dev servers, HTML files, PDFs</li>
<li>Computer use — open apps and control screen on macOS and Windows</li>
<li>GitHub PR monitoring — auto-fix, auto-merge, auto-archive</li>
<li>Dispatch — send a task from your phone, get a session here</li>
<li>Scheduled tasks — run Claude on a recurring schedule</li>
<li>Connectors — GitHub, Slack, Linear 등</li>
<li>Local · SSH · cloud 환경 지원</li>
</ul>

<p><strong>참고</strong>: Reddit 글은 video 링크(<code>v.redd.it/j9kaqnone7vg1</code>)뿐이라 텍스트 본문이 없음. 이 기사의 fact는 모두 Anthropic 공식 docs(<a href="https://code.claude.com/docs/en/desktop.md" class="source-link">desktop.md</a>)에서 verbatim 인용. video 자체의 데모 내용은 fetch하지 않음.</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 Claude Code는 터미널 단일 세션이 기본이었는데, Desktop 재설계는 <strong>"여러 에이전트를 동시에 굴리는 사용자"</strong>를 1급 시민으로 격상시킵니다. <strong>Git worktree isolation은 평행 세션이 서로의 작업 트리를 침범하지 않게 하는 핵심 메커니즘</strong>으로, 같은 repo에서 동시에 여러 task를 돌릴 때 충돌을 자동 차단합니다. Side chats(메인 thread 영향 없는 분기), Visual diff review(inline comments), Computer use(앱 자동 조작), Dispatch(폰에서 작업 전송) 등은 어제 발표된 Routines와 함께 <strong>"laptop closed에서도 작동하는 Claude Code"</strong>의 큰 그림을 완성하는 조각입니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>Git worktree</strong>: 일반적으로 Git의 native 기능으로, 한 repo에 여러 working directory를 동시에 둘 수 있게 합니다. Claude Code Desktop의 parallel session이 이를 자동화한다는 의미는 사용자가 worktree 명령을 직접 치지 않아도 된다는 점.</p>
<p><strong>Computer use</strong>: 일반적으로 Anthropic의 Computer Use API는 화면을 보고 마우스/키보드를 조작하는 기능. macOS/Windows에서 Desktop 앱이 이 권한을 받아 외부 앱을 열고 조작 가능.</p>
<p><strong>원문</strong>: <a href="https://code.claude.com/docs/en/desktop.md" class="source-link">code.claude.com/docs/en/desktop</a></p>
<p><strong>Reddit 게시 (video)</strong>: <a href="https://www.reddit.com/r/ClaudeAI/comments/1slictc/" class="source-link">r/ClaudeAI 1slictc</a></p>
</div>
