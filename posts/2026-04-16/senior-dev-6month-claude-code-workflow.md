---
layout: default
title: "Senior 개발자의 6개월 Claude Code 워크플로우 — plan mode·step-by-step·/simplify·세션 말미 retro"
---

<a href="../2026-04-16" class="back-link">&larr; 4월 16일 목록</a>

# 6개월 일일 사용 시니어 개발자 팁

<div class="meta-line"><span class="tag tag-reddit">Reddit</span> 21:47 KST</div>

> 시니어 풀스택 개발자가 6개월간 Claude Code를 매일 써본 후 정리한 워크플로우. 핵심: plan mode 필수, step 1만 요청·리뷰·다음 step, 버그는 본인이 고치지 말고 Claude에게, <code>/simplify</code>로 over-engineering 정리, 세션 말미 "what did you learn" retro 저장. r/ClaudeAI posted 2026-04-16 21:34 KST.

<div class="context-block">
<h4>출처 핵심 (Reddit selftext에서 확인되는 내용만)</h4>

<p><strong>시니어 개발자의 체크리스트 (직접 인용):</strong></p>

<p>1. plan mode (직접 인용):</p>
<blockquote>"Use 'plan' mode for anything complex. Before Claude writes a single line, I let it lay out its approach. This saves me a lot of back-and-forth."</blockquote>

<p>2. 한 번에 한 step만 (직접 인용):</p>
<blockquote>"Only ask for the first step. If you say 'implement the whole feature', it will go off the rails. That's why I usually just ask for step one and review it before asking for step two. Tedious but worth it."</blockquote>

<p>3. preview 사용 (직접 인용):</p>
<blockquote>"Use the preview. Sounds obvious but a lot of people skip it."</blockquote>

<p>4. 버그는 Claude가 직접 고치게 (직접 인용):</p>
<blockquote>"Don't fix bugs yourself, let Claude fix them. I know it's tempting to just patch it quickly, but if you fix it yourself, Claude doesn't learn the context. I let Claude correct its own mistakes so it builds a better mental model of my codebase."</blockquote>

<p>5. /simplify를 review 전에 (직접 인용):</p>
<blockquote>"Run /simplify before doing a review. Claude tends to over-engineer. That's why I let it clean up first."</blockquote>

<p>6. 세션 말미 retro (직접 인용):</p>
<blockquote>"Do a retro at the end of each session. I regularly ask Claude 'what did you learn during this session?' and save the output. It's a great way to build up institutional knowledge."</blockquote>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 이런 "나만의 워크플로우" 글은 개인 습관 공유에 그치는 경우가 많지만, 이 리스트는 <strong>이번 주 Anthropic 공식 가이드와 놀라울 정도로 맞물립니다</strong>. (1) plan mode = Thariq의 "proactive compacting"과 목적 동일(사전 설계로 context rot 방지), (2) step 1만 요청 = Cherny의 "stale session은 full cache miss" 경고와 호환(짧은 세션 유지), (3) "Claude가 자기 버그 고치게 하라" = 공식 가이드의 "better mental model 유지", (4) 세션 말미 retro는 Anthropic 공식 블로그의 /compact 패턴을 <strong>자연어 프롬프트로 구현</strong>한 버전 — "무엇을 배웠나"를 물어 markdown으로 저장하면 차기 세션의 실질적 CLAUDE.md 업데이트 소스가 됨. 주의: <code>/simplify</code>는 글에서는 슬래시 커맨드처럼 쓰여 있으나, Claude Code 공식 빌트인인지 사용자 정의 커맨드인지는 <strong>이 글 범위 밖</strong>이므로 동일 이름으로 동작하지 않을 수 있습니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>plan mode</strong>: 일반적으로 Claude Code에서 Shift+Tab으로 진입하는 모드. 파일 변경 없이 설계·탐색만 수행 후 사용자 승인을 받아 실행 단계로 전환.</p>
<p><strong>"session retro" 프롬프트</strong>: 일반적으로 대화 말미에 "이번 세션에서 배운 것" 요약을 요청해 markdown으로 저장하는 비공식 패턴. 공식 도구 대신 자연어로 <code>/compact</code>의 의도를 표현.</p>
<p><strong>원문</strong>: <a href="https://www.reddit.com/r/ClaudeAI/comments/1sn27yu/claude_code_workflow_tips_after_6_months_of_daily/" class="source-link">r/ClaudeAI 원 스레드</a></p>
</div>
