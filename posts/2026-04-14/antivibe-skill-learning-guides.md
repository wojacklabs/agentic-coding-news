---
layout: default
title: "AntiVibe — Claude Code가 쓴 코드에 학습 가이드를 자동 생성하는 Skill"
---

<a href="../2026-04-14" class="back-link">&larr; 4월 14일 목록</a>

# AntiVibe — Skill + Subagent + Hook

<div class="meta-line"><span class="tag tag-reddit">Reddit</span> 19:00 KST</div>

> "AI가 코드 쓰고 나는 배운 게 없다"는 vibecoding 문제를 겨냥해, Claude Code가 완료한 태스크마다 학습용 markdown 가이드를 자동 생성하는 Skill 공개. subagents + hooks + scripts 조합. r/ClaudeAI score 42.

<div class="context-block">
<h4>출처 핵심 (Reddit 글에서 확인되는 내용만)</h4>

<p><strong>작성자 동기 (직접 인용):</strong></p>
<blockquote>"Been using Claude Code heavily and noticed a pattern: AI writes the code, I ship it, I learn nothing. Felt like I was getting faster but dumber at the same time."</blockquote>

<p><strong>도구 이름</strong>: <strong>AntiVibe</strong>.</p>

<p><strong>작동 방식 (직접 인용):</strong></p>
<blockquote>"a Claude Code skill that generates deep-dive learning guides for every piece of AI-written code. After Claude finishes a task, you run /antivibe (or let the hook auto-trigger it) and get a markdown file explaining:"</blockquote>

<p><strong>markdown 가이드 5섹션:</strong></p>
<ul>
<li>What the code does</li>
<li>Why it was designed that way</li>
<li>When to use these patterns</li>
<li>What alternatives exist</li>
<li>Curated links to actual good resources</li>
</ul>

<p><strong>기술 조합 (직접 인용):</strong></p>
<blockquote>"It uses subagents, hooks, and scripts, so it plugs right into your existing Claude Code workflow."</blockquote>

<p><strong>GitHub</strong>: <code>github.com/mohi-devhub/antivibe</code></p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 vibecoding(LLM에 맡기고 수락 버튼만 누르는 흐름)은 속도를 주지만 학습 축적이 사라지는 부작용이 있습니다. <strong>"태스크 완료 직후" 자동으로 학습 가이드를 생성하는 패턴</strong>은 Claude Code Hooks(PostToolUse 등)의 자연스러운 사용처 중 하나입니다. subagents로 분석 작업을 분리하고 hook으로 자동 트리거 묶는 구성은 최근 Skills 런칭과 맞물려 나타나는 표준 템플릿에 가깝습니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>Skill + Hook 조합</strong>: 일반적으로 Skill은 "에이전트에게 새 능력 부여", Hook은 "이벤트 시점에 스크립트 자동 실행"을 담당. 두 메커니즘을 묶으면 사용자 명시 호출 없이도 원하는 워크플로우가 자동 발동합니다.</p>
<p><strong>원문</strong>: <a href="https://www.reddit.com/r/ClaudeAI/comments/1sil29t/i_built_a_claude_code_skill_that_teaches_you_what/" class="source-link">r/ClaudeAI 원 스레드</a></p>
</div>
