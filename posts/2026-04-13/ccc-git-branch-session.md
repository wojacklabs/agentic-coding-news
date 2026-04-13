---
layout: default
title: "Claude Code Context (ccc) — git branch별 세션 자동 재개"
---

<a href="../2026-04-13" class="back-link">&larr; 4월 13일 목록</a>

# CCC — git 브랜치별 세션 자동 재개

<div class="meta-line"><span class="tag tag-reddit">Reddit</span> r/ClaudeAI · 05:10 KST</div>

> 브랜치를 전환하면 해당 브랜치에서 작업하던 Claude Code 세션 컨텍스트를 자동으로 복원해주는 래퍼 도구 **ccc**가 공개되었습니다.

Git 브랜치 워크플로우와 Claude Code 세션을 1:1로 매핑하는 도구입니다. 기능 A 브랜치에서 Claude와 나눈 대화·결정이 기능 B 브랜치로 전환 후 돌아왔을 때 그대로 복원됩니다.

<div class="context-block">
<h4>실전 기법 핵심</h4>
<p><strong>동작 방식:</strong></p>
<ul>
<li>브랜치별로 <code>.claude/sessions/{branch-name}.jsonl</code>에 대화 로그 저장</li>
<li>git post-checkout hook이 트리거 → ccc가 현재 브랜치의 세션을 탐지</li>
<li>Claude Code 시작 시 해당 세션을 자동 주입</li>
</ul>
<p><strong>사용 시나리오:</strong> 멀티 기능 개발, PR 리뷰 왕복, 컨텍스트 스위칭이 잦은 워크플로우.</p>
<p><strong>설정:</strong> <code>ccc init</code> → <code>.git/hooks/post-checkout</code> 자동 설치. 프로젝트당 1회.</p>
</div>

<div class="context-block">
<h4>왜 중요한가</h4>
<p>개발자 일상은 브랜치 전환으로 가득합니다. 하지만 Claude Code의 기본 동작은 전환마다 컨텍스트가 휘발되어, 복귀 시 "우리 어디까지 얘기했지?" 재설명이 필요합니다. ccc는 git workflow와 에이전트 컨텍스트를 정합시켜 이 마찰을 제거합니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>Git hooks</strong>: <code>.git/hooks/</code>에 위치한 shell 스크립트로, commit/checkout/push 등 이벤트에 반응해 실행됩니다. post-checkout은 브랜치 전환 직후에 트리거됩니다.</p>
<p><strong>Claude Code Session 구조</strong>: 각 세션은 대화 기록·도구 호출 이력·결정을 JSONL로 저장. 외부에서 이를 읽어 컨텍스트로 재주입할 수 있습니다.</p>
</div>
