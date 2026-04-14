---
layout: default
title: "Claude Code subagents를 '병렬 작업' 대신 '병렬 관점'으로 쓰기 — 설계 결정 사용기"
---

<a href="../2026-04-14" class="back-link">&larr; 4월 14일 목록</a>

# Subagents as Parallel Perspectives

<div class="meta-line"><span class="tag tag-reddit">Reddit</span> 12:36 KST</div>

> 대부분의 사람이 subagents를 "병렬 작업"(검색·리팩터 동시 실행)에 쓰지만, 같은 문제에 대한 "병렬 관점"으로 쓰는 사용기.

<div class="context-block">
<h4>출처 핵심 (Reddit 글에서 확인되는 내용만)</h4>

<p><strong>작성자가 제시한 구분 (직접 인용):</strong></p>
<blockquote>"Most of us use Claude Code's subagents for parallel <em>work</em> — search this, refactor that, concurrent execution. Lately I've been using them for something different: parallel <em>perspectives</em> on the same problem."</blockquote>

<p><strong>동기 (직접 인용 — 일부):</strong></p>
<blockquote>"If you've discussed design decisions with Claude Code long enough, you've hit this: the ag..."</blockquote>
<p>(candidate text가 여기서 잘림. 제목이 요약하는 "parallel perspectives on design decisions"가 본문의 핵심 주장으로 이어짐.)</p>

<p><strong>참고</strong>: 구체적 실행 방법(어떤 subagent 프롬프트로 어떤 관점을 고정했는지, 병합·판정 방식 등)은 candidate text가 잘려 이 기사 출처 범위에서 확인되지 않음.</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 subagents는 토큰·시간 절약을 위한 "작업 분할" 용도로 소개됩니다. 반면 이 글이 가리키는 <strong>"같은 문제에 서로 다른 역할/관점의 subagent를 띄우고 결과를 비교"</strong> 패턴은 Anthropic의 GAN-inspired harness(Planner/Generator/Evaluator 분리)와 같은 계열 — 생성과 평가를 독립시키는 일반화입니다. 디자인 결정처럼 "정답이 여럿 있는" 문제에서 단일 에이전트의 confirmation bias를 줄이는 구체 기법이 될 수 있습니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>Claude Code subagents</strong>: 일반적으로 <code>Task</code> 도구를 통해 별도 컨텍스트의 하위 에이전트를 띄우는 기능. 주 세션의 컨텍스트를 오염시키지 않고 탐색·분석을 분리할 때 사용됩니다.</p>
<p><strong>원문</strong>: <a href="https://www.reddit.com/r/ClaudeAI/comments/1skvxrn/using_claude_code_subagents_as_parallel/" class="source-link">r/ClaudeAI 원 스레드</a></p>
</div>
