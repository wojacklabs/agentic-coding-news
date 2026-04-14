---
layout: default
title: "Revdiff — Claude Code ExitPlanMode 후킹으로 plan 단계까지 annotate 루프에 편입"
---

<a href="../2026-04-14" class="back-link">&larr; 4월 14일 목록</a>

# Revdiff — diff + plan mode 양쪽 루프

<div class="meta-line"><span class="tag tag-hn">HN</span> 21:50 KST</div>

> 터미널 diff 리뷰어 Revdiff의 Show HN. 두 줄 특징 요약: (1) Claude Code 세션 안에서 <code>/revdiff main</code> 호출 → 터미널 오버레이로 annotate 루프 (2) 별도 revdiff-planning 플러그인이 ExitPlanMode 이벤트를 후킹해 plan 단계까지 동일 루프.

<div class="context-block">
<h4>출처 핵심 (HN 포스트 본문에서 확인되는 내용만)</h4>

<p><strong>제작 동기 (직접 인용):</strong></p>
<blockquote>"Plenty of diff viewers exist, and some can even feed notes back to an agent, but none of them fit that flow for me - they pulled me out of the terminal into a separate app, or the round-trip back to the agent was clunky."</blockquote>

<p><strong>diff 리뷰 루프 (직접 인용):</strong></p>
<blockquote>"From a Claude Code session I type <code>/revdiff main</code> or just say 'review diff for last 3 commits' - it opens as a terminal overlay on top of the agent session. I read the diff, drop annotations on any line, hunk, or file, then quit. The annotations go straight back to the agent, which picks them up and starts working on them. When the agent is done, revdiff reopens on the new changes so I can annotate again - and this loop continues until I quit without leaving any annotations."</blockquote>

<p><strong>plan mode 지원 — <code>revdiff-planning</code> 플러그인 (직접 인용):</strong></p>
<blockquote>"There's a separate revdiff-planning plugin that hooks into Claude Code's plan mode - the moment the agent finishes a plan and calls ExitPlanMode, revdiff opens automatically on the plan text. I annotate the parts I disagree with or want expanded, quit, and the agent revises the plan before writing any code."</blockquote>

<p><strong>UI 구조</strong>: two-pane TUI — 왼쪽 file tree, 오른쪽 syntax-highlighted diff. Vim 스타일 단축키 지원(candidate text가 "Vim-s..."에서 잘림).</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 Claude Code의 plan mode는 에이전트가 <code>ExitPlanMode</code> tool call로 plan을 최종화하는데, 사용자 피드백을 직접 받아 plan을 수정할 표준 UI가 없습니다. revdiff-planning은 <strong>plan 단계에서 리뷰 → annotate → 수정</strong> 루프를 TUI로 구현한 구체적 사례로, Claude Code Hooks와 plan mode를 묶는 패턴으로 재사용 가능합니다. diff 리뷰 루프도 "annotate → agent 작업 → 재열기"의 수렴 조건(annotation 없이 종료)을 명시적으로 정의한 점이 실용적.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>ExitPlanMode</strong>: 일반적으로 Claude Code의 plan mode에서 에이전트가 계획을 완료하고 실제 편집 단계로 전환할 때 호출하는 tool. 이 전환 시점이 사용자 개입이 가장 가치 있는 순간.</p>
<p><strong>원문</strong>: <a href="https://github.com/umputun/revdiff" class="source-link">github.com/umputun/revdiff</a></p>
<p><strong>HN discussion</strong>: <a href="https://news.ycombinator.com/item?id=47742437" class="source-link">news.ycombinator.com/item?id=47742437</a></p>
</div>
