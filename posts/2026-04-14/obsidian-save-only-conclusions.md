---
layout: default
title: "Obsidian에 notes 쌓기 중단, conclusions만 저장했더니 Claude가 실제로 기억하기 시작"
---

<a href="../2026-04-14" class="back-link">&larr; 4월 14일 목록</a>

# Obsidian — 결론만 저장 전략

<div class="meta-line"><span class="tag tag-reddit">Reddit</span> 15:38 KST</div>

> 약 10개 프로젝트에서 Claude Code를 쓰면서 Obsidian vault를 병행하는 셋업 사용자. "노트가 부족해서가 아니라 너무 많아서" AI가 동일한 결론을 반복 도출하는 문제를 겪은 뒤, 원시 컨텍스트 대신 결론만 저장하는 방향으로 전환했다는 사용기.

<div class="context-block">
<h4>출처 핵심 (Reddit 글에서 확인되는 내용만)</h4>

<p><strong>작성자 셋업 (직접 인용):</strong></p>
<blockquote>"I use Claude Code across ~10 projects. Obsidian vault alongside. The usual setup."</blockquote>

<p><strong>Pain point (직접 인용):</strong></p>
<blockquote>"The problem wasn't that I didn't have enough notes — I had too many. Research dumps, session logs, raw context. And somehow Claude and I would still reach the exact same conclusion we'd already made two weeks ago."</blockquote>

<p><strong>(candidate text 이 시점에서 잘림 — "Di..."로 끝남.)</strong></p>

<p><strong>참고</strong>: 작성자가 "결론만 저장"을 구체적으로 어떻게 구조화했는지(파일 이름 규칙, 태깅, Claude가 읽는 방식 등)는 candidate text가 잘려 이 기사 출처 범위에서 확인되지 않음. 제목의 "saving only conclusions"가 본문 전체 방향을 요약.</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 Obsidian + Claude Code 조합은 "모든 걸 기록해 두면 LLM이 다 기억할 것"이라는 가정으로 시작하지만, 실제로는 노트가 많을수록 컨텍스트 토큰 경쟁이 심해지고 중요한 결론이 잡음에 묻힙니다. <strong>"결론만 저장"은 사실상 LLM에게 주는 <code>memory</code>를 큐레이션 층으로 재정의</strong>하는 전략으로, 오늘 다른 Reddit 후보(CLAUDE.md cleanup)와 같은 방향을 가리킵니다. 구체 구현이 원문에 더 있을 것으로 보이므로 Obsidian/ Claude 조합을 운영 중이라면 원문 확인이 유용합니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>Obsidian + Claude Code 패턴</strong>: 일반적으로 Obsidian vault를 MCP 서버나 파일 시스템 참조로 Claude Code에 노출하는 방식이 쓰입니다. 정확한 연결 방식은 구현마다 다르며 이 기사 출처 범위에서는 별도 검증하지 않았습니다.</p>
<p><strong>원문</strong>: <a href="https://www.reddit.com/r/ClaudeAI/comments/1sl0m8n/i_stopped_hoarding_notes_in_obsidian_and_started/" class="source-link">r/ClaudeAI 원 스레드</a></p>
</div>
