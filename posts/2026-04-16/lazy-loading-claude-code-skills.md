---
layout: default
title: "Lazy-loading Claude Code Skills — 87개 skill을 1개 stub로 교체해 턴당 ~1K 토큰 절감"
---

<a href="../2026-04-16" class="back-link">&larr; 4월 16일 목록</a>

# Lazy-loading Skills — Ghost Tokens 해법

<div class="meta-line"><span class="tag tag-hn">HN</span> 12:47 KST</div>

> "Claude Code는 설치된 모든 skill의 이름·설명을 매 턴 system prompt에 인라인한다" — 이 오버헤드를 해결하는 기법 공개. 87개 gws/persona/recipe skills를 <code>skills-lazy/</code>로 이동하고 키워드 rich stub 1개만 남기면, system prompt에서 ~1.2K → ~100 tokens. 인덱스(~1.5K)는 stub가 trigger될 때만 로드. 턴당 ~1K tokens 절감. posted 2026-04-15, HN score 1 (47781535).

<div class="context-block">
<h4>출처 핵심 (wallfacer.ai 블로그에서 확인되는 내용만)</h4>

<p><strong>작성자</strong>: Paul Denya, wallfacer.ai. posted 2026-04-15.</p>

<p><strong>문제 정의 (블로그 기반 요약):</strong></p>
<p>"Claude Code inlines every installed skill's name and description into the system prompt on every turn" — 설치해두고 안 쓰는 skill도 매 턴 토큰을 먹는다.</p>

<p><strong>해법 — lazy directory 이동 + stub (블로그):</strong></p>
<p>skill metadata 파일을 <code>skills-lazy/</code>로 옮겨 auto-discovery에서 빠지게 하고, keyword-rich description을 가진 stub skill 1개가 해당 그룹을 대표. 모델이 stub을 trigger할 때만 자식 skill 파일을 read.</p>

<p><strong>구체 명령 (직접 인용):</strong></p>
<pre><code>cd .claude
mkdir -p skills-lazy/gws
mv skills/gws-* skills/persona-* skills/recipe-* skills-lazy/gws/</code></pre>

<p><strong>결과 수치 (직접 인용):</strong></p>
<ul>
<li>Before: "System prompt listed all 87 gws/persona/recipe skills inline, at a conservative count 1.2k tokens"</li>
<li>After: "one <code>gws</code> entry (~100 tokens) in the system prompt. The index (~1.5k tokens) only loads when the stub fires"</li>
<li>"Net savings: ~1k tokens per turn"</li>
</ul>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 이번 주 주요 주제인 "Claude Code ghost tokens / skills 과다 로드"를 <strong>실제 절약 수치까지 보여주며 해결하는 첫 번째 구체 패턴</strong>입니다. Boris Cherny의 #45756 공식 답변이 "skills/plugins/agents 과다가 surprise token 소비"를 인정하고, PSA audit이 "170 agents 중 10개만 사용, 매 세션 30K 토큰 소멸"을 측정한 데 이어, <strong>이 글은 "안 쓰는 skill을 lazy 디렉토리로 빼고 stub만 남기면 된다"</strong>는 유저 공간 해법을 제시합니다. Anthropic의 공식 수정(intelligent truncation/pruning)이 나오기 전, 지금 당장 쓸 수 있는 workaround. 핵심은 <strong>auto-discovery에서 빠지되, keyword-rich stub으로 여전히 "불러질 수 있게" 유지</strong>하는 설계. 턴당 ~1K 절감은 세션이 길어질수록 누적돼 의미가 커집니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>skill auto-discovery</strong>: 일반적으로 Claude Code는 <code>.claude/skills/</code> 디렉토리의 .md 파일을 세션 시작 시 자동 감지해 system prompt에 삽입. 개수에 비례한 토큰 소비.</p>
<p><strong>stub skill 패턴</strong>: 일반적으로 하나의 대표 skill이 "이 그룹의 진입점" 역할을 하고, 필요 시에만 자식 skill을 read 도구로 로드하는 2단계 접근.</p>
<p><strong>원문</strong>: <a href="https://www.wallfacer.ai/blog/lazy-loading-claude-code-skills" class="source-link">wallfacer.ai/blog/lazy-loading-claude-code-skills</a></p>
<p><strong>HN discussion</strong>: <a href="https://news.ycombinator.com/item?id=47781535" class="source-link">news.ycombinator.com/item?id=47781535</a></p>
</div>
