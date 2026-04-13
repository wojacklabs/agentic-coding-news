---
layout: default
title: "Ask HN — CLAUDE.md / agents.md에서 가장 효과 있던 한 줄 컬렉션"
---

<a href="../2026-04-13" class="back-link">&larr; 4월 13일 목록</a>

# CLAUDE.md 베스트 한 줄 모음

<div class="meta-line"><span class="tag tag-hn">HN</span> 17:34 KST · 정정 18:11 KST</div>

> "당신의 CLAUDE.md / agents.md에 넣은 줄 중 가장 효과 좋았던 한 줄은?" — Ask HN 스레드. 계획 강제부터 페르소나 부여, defensive 금지, ASCII 다이어그램 활용까지 다양한 실전 한 줄 공유.

> ⚠️ **정정**: 초기 발행본에는 댓글 인용이 추측·재구성되어 있었습니다(사용자 지적). 실제 HN 스레드를 다시 읽고 댓글들을 출처와 함께 verbatim으로 교체했습니다.

<div class="context-block">
<h4>OP의 출발 — khasan222</h4>
<p>"CRITICAL: Always make detailed plan with sections for Analysis, specifications, to do list to achieve the spec, and a step by step manual testing strategy for any request a user makes."</p>
<p>→ <strong>계획 단계 분해 강제</strong>: Analysis · Specifications · To-do · Manual testing 4섹션. 모호한 요청을 받았을 때 LLM이 곧장 코드부터 쓰지 않게 막는 패턴.</p>
</div>

<div class="context-block">
<h4>댓글에서 공유된 한 줄들 (verbatim)</h4>

<p><strong>muzani — 페르소나 부여</strong></p>
<p>"You are Murphy, a senior engineer. Infrastructure breaks around you like you're cursed... You've learned to write code like it's going to break. Defensive patterns."</p>
<p>→ 캐릭터·역할극으로 LLM의 코드 스타일(defensive)을 한 방향으로 강하게 정렬.</p>

<p><strong>ravila4 — 4가지 룰</strong></p>
<ol>
<li><strong>The table flip rule</strong>: "NEVER implement backward compatibility without explicit approval... Just change the schema."</li>
<li>"Make extensive use of ASCII diagrams for explaining concepts, code flow, and architecture."</li>
<li>"I have ADHD (mainly distraction component) and can lose track of time when hyperfocused." — <em>본인 개인 정보</em>를 CLAUDE.md에 넣어 LLM 응답 톤·페이스를 조정</li>
<li>"You don't use emojis (except for japanese kaomoji)."</li>
</ol>

<p><strong>jwang987 — defensive 금지 (정반대 입장)</strong></p>
<p>"Prefer the most straightforward way of implementation. No defensive programming... DO NOT use getattr or isinstance or defensive programming patterns."</p>
<p>→ muzani와 정반대. CLAUDE.md 룰은 사람마다 철학 차이가 큼을 보여줌.</p>

<p><strong>iExploder — 변경 부작용 점검</strong></p>
<p>"Check for bugs and unintended side effects introduced by our changes."</p>

<p><strong>digikata — 포맷팅 룰</strong></p>
<p>"When writing tables in markdown files, text align data in the columns for readability."</p>

<p><strong>jordanbonnet — 메타 룰</strong></p>
<p>"When I tell you to do something more than once, add a rule to Claude.md."</p>
<p>→ <strong>CLAUDE.md를 자라게 하는 룰</strong>. 같은 지시 반복 → 룰로 영구화.</p>
</div>

<div class="context-block">
<h4>왜 흥미로운가</h4>
<p>이 스레드의 가치는 <strong>한 줄의 다양성</strong>입니다. defensive 강제(muzani) ↔ defensive 금지(jwang987)처럼 정반대 룰이 공존하고, ravila4처럼 본인의 ADHD를 알려주는 사례까지 등장. 즉 CLAUDE.md는 "정답"이 아니라 <strong>각자의 작업 방식·취향·약점에 맞춰 다듬는 개인화 레이어</strong>입니다. jordanbonnet의 메타룰("두 번 이상 지시하면 룰로 추가")은 이를 자라게 하는 메커니즘.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>CLAUDE.md 로딩 순서</strong>: 전역(<code>~/.claude/CLAUDE.md</code>) → 프로젝트 루트(<code>CLAUDE.md</code>) → 상위 디렉토리까지 자동 merge. 세션마다 Claude의 컨텍스트에 주입됨.</p>
<p><strong>agents.md</strong>: 여러 에이전트 플랫폼(Cursor, Codex 포함)에서 호환되는 범용 명칭. Claude Code는 <code>CLAUDE.md</code>와 <code>agents.md</code> 모두 자동 인식. <a href="https://news.ycombinator.com/item?id=47465415" class="source-link">Ask HN 원 스레드</a></p>
</div>
