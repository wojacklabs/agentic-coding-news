---
layout: default
title: "매 세션마다 프로젝트 재설명이 지겨워서 만들었다 — Claude Code 컨텍스트 지속 도구"
---

<a href="../2026-04-14" class="back-link">&larr; 4월 14일 목록</a>

# 세션 간 컨텍스트 지속 — 사용기

<div class="meta-line"><span class="tag tag-reddit">Reddit</span> 12:36 KST</div>

> Claude Code 새 세션마다 선호·프로젝트·워크플로우를 다시 설명해야 하는 문제에 지쳐 도구를 만들었다는 r/ClaudeAI 사용기. CLAUDE.md 작성만으로는 해결되지 않는다는 관찰 포함.

<div class="context-block">
<h4>출처 핵심 (Reddit 글에서 확인되는 내용만)</h4>

<p><strong>작성자의 pain point (직접 인용):</strong></p>
<blockquote>"The most frustrating thing about working with Claude Code is that with every new session, I had to reexplain my preferences, project and workflows to it. i would spend an hour working through a problem, get somewhere real, close the session, come back later, and start from zero again."</blockquote>

<p><strong>CLAUDE.md만으로는 부족하다는 언급(candidate 끝부분, 잘림):</strong></p>
<blockquote>"Writing a [CL..."</blockquote>
<p>(candidate text가 여기서 잘림 — 문맥상 "Writing a [CLAUDE.md]"로 이어지며 그것만으로는 해결되지 않는다는 흐름으로 보이지만 확정은 원문 확인 필요.)</p>

<p><strong>참고</strong>: 도구 이름, GitHub URL, 작동 메커니즘(외부 메모리? MCP 서버? Hook?) 등은 candidate text가 잘려 이 기사 출처 범위에서 확인되지 않음.</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 Claude Code는 세션 단위로 컨텍스트가 초기화되며, <code>CLAUDE.md</code>는 "매번 로드되는 기본 정보"를 담는 유일한 표준 경로입니다. 이 글의 pain point는 CLAUDE.md만으로는 <strong>"진행 중인 문제 상태"</strong>(해결한 부분, 남은 부분, 시도 실패 기록)를 유지하기 어렵다는 점을 시사합니다. 같은 목적의 도구들(ccrider 세션 검색, Mason MCP codebase 지도, 다양한 외부 메모리 시스템)이 동시에 등장하는 이유이기도 합니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>CLAUDE.md vs 세션 히스토리</strong>: 일반적으로 CLAUDE.md는 "정적 지식"을, JSONL 세션 로그는 "동적 대화 기록"을 담습니다. 이 둘을 잇는 자동 요약·메모리 레이어가 커뮤니티에서 반복 등장하는 카테고리입니다.</p>
<p><strong>원문</strong>: <a href="https://www.reddit.com/r/ClaudeAI/comments/1skvotz/i_got_tired_of_reexplaining_my_projects_to_claude/" class="source-link">r/ClaudeAI 원 스레드</a></p>
</div>
