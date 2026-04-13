---
layout: default
title: "AI 에이전트가 '당신을 아는' 개인 컨텍스트 레이어"
---

<a href="../2026-04-13" class="back-link">&larr; 4월 13일 목록</a>

# 개인 컨텍스트 레이어

<div class="meta-line"><span class="tag tag-reddit">Reddit</span> r/ClaudeAI · 03:51 KST</div>

> "AI 에이전트를 아무리 써도 매 세션마다 제로에서 시작한다"는 문제를 해결하기 위한 개인 맞춤 컨텍스트 레이어가 공개되었습니다.

Reddit r/ClaudeAI에 공유된 프로젝트는 사용자의 선호, 작업 히스토리, 프로젝트 컨텍스트를 축적하여 **모든 AI 에이전트가 '당신을 알게'** 만드는 레이어입니다. CLAUDE.md가 프로젝트 단위 컨텍스트를 다룬다면, 이 도구는 **사용자 단위 컨텍스트**에 집중합니다. <a href="https://www.reddit.com/r/ClaudeAI/comments/1sjk2fp/built_a_personal_context_layer_so_your_ai_agents/" class="source-link">원문</a>

<div class="context-block">
<h4>왜 중요한가</h4>
<p>오늘 다른 뉴스에서도 반복되는 주제("AI 에이전트의 메모리 문제")가 실제 솔루션으로 구체화되고 있습니다. 프로젝트 메모리(CLAUDE.md), 사용자 메모리(이 프로젝트), 조직 메모리(팀 규약) 등 여러 레이어의 메모리 시스템이 등장하는 추세입니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>메모리 계층</strong>: AI 에이전트의 컨텍스트를 "일시적(세션) → 프로젝트 → 사용자 → 조직" 순으로 계층화하는 접근. 각 레이어는 다른 생명주기와 접근 권한을 가집니다.</p>
<p><strong>USER.md 패턴</strong>: CLAUDE.md와 대비되는 사용자 단위 설정 파일로, 개발자의 선호하는 코딩 스타일, 자주 쓰는 도구, 언어 설정 등을 담습니다. 이번 프로젝트는 이 패턴을 도구화한 것입니다.</p>
</div>
