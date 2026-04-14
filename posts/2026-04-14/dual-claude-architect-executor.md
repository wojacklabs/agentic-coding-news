---
layout: default
title: "Claude.ai를 설계자·Claude Code를 실행자로 나누는 dual-Claude 프로덕션 워크플로우"
---

<a href="../2026-04-14" class="back-link">&larr; 4월 14일 목록</a>

# dual-Claude Workflow — 설계/실행 분리

<div class="meta-line"><span class="tag tag-reddit">Reddit</span> 09:35 KST</div>

> 솔로 개발자가 프로덕션 웹 앱을 운영하며 확립한 "Claude.ai는 아키텍트, Claude Code는 executor" 분리 워크플로우 사용기.

<div class="context-block">
<h4>출처 핵심 (Reddit 글에서 확인되는 내용만)</h4>

<p><strong>글 제목 (직접 인용):</strong></p>
<blockquote>"How I ship a production web app solo with a dual-Claude workflow: Claude.ai as architect, Claude Code as executor"</blockquote>

<p><strong>작성자 맥락</strong>: 프랑스 지역의 약 5k users potential을 대상으로 하는 civic polling platform을 혼자 운영하는 솔로 개발자.</p>

<p><strong>핵심 역할 분담 (제목에서 확인):</strong></p>
<ul>
<li><strong>Claude.ai</strong> → architect (설계 역할)</li>
<li><strong>Claude Code</strong> → executor (실행 역할)</li>
</ul>

<p><strong>참고</strong>: 구체적 핸드오프 방식, 세션 간 컨텍스트 전달 방법, 실패 시 루프백 처리 등 워크플로우의 세부 단계는 candidate text가 잘려 이 기사 출처 범위에서 확인되지 않음.</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 Claude Code는 "파일 편집·실행"에 강하지만 전체 시스템 구조 토론에는 컨텍스트 오버헤드가 큰 편입니다. <strong>Claude.ai 채팅에서 아키텍처를 확정 → Claude Code에 executor로 떨어뜨리는 2단계 분리</strong>는 Anthropic의 GAN-inspired harness(Planner/Generator/Evaluator)와 비슷한 맥락으로 읽히며, 솔로 개발자 규모에서 실무적으로 재현 가능한 패턴일 수 있습니다. 다만 구체 핸드오프 포맷(마크다운 명세? JSON 계약?)이 이 기사 출처 범위에서는 확인되지 않아 실행 이식은 원 스레드의 후속 내용 확인이 필요합니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>Claude.ai vs Claude Code 경계</strong>: 일반적으로 Claude.ai는 브라우저 기반 대화형 UI, Claude Code는 터미널 기반 파일 제어 에이전트로 포지셔닝됩니다. 대화와 실행을 의도적으로 분리해서 운영하는 사례가 늘어나는 추세입니다.</p>
<p><strong>원문</strong>: <a href="https://www.reddit.com/r/ClaudeAI/comments/1skqvp2/how_i_ship_a_production_web_app_solo_with_a/" class="source-link">r/ClaudeAI 원 스레드</a></p>
</div>
