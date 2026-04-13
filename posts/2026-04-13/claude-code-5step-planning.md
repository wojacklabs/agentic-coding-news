---
layout: default
title: "Claude Code 5단계 계획 워크플로우 — 모호한 아이디어를 상세 계획으로"
---

<a href="../2026-04-13" class="back-link">&larr; 4월 13일 목록</a>

# Claude Code 5단계 계획 워크플로우

<div class="meta-line"><span class="tag tag-x">X</span> 12:52 KST</div>

> Claude Code로 애매한 아이디어를 실행 가능한 상세 계획으로 변환하는 5단계 파이프라인이 공개되었습니다.

X에서 @sora19ai가 공유한 이 워크플로우는 **"Vibe Prompting"을 버리고 구조화된 리서치·검증을 거치는 프로젝트 계획 프로세스**입니다. 단순 코딩 요청 이전에 Claude가 충분한 맥락을 확보하고, 독립 리뷰까지 받게 설계했습니다.

<div class="context-block">
<h4>실전 기법 — 5단계</h4>
<ol>
<li><strong>Research (조사):</strong> 기존 코드베이스 조사 + 웹 Best Practices 검색. Claude가 자체적으로 관련 라이브러리·패턴을 찾게 함.</li>
<li><strong>Interview (인터뷰):</strong> 구조화된 Q&A로 숨겨진 요구사항을 드러냄. "어떤 사용자?", "에지 케이스?", "실패 시 대응?" 등을 Claude가 역으로 물어봄.</li>
<li><strong>External Review (외부 리뷰):</strong> 독립된 Claude 인스턴스로 초안 검토. 같은 세션이 아닌 새 세션에서 평가 요청.</li>
<li><strong>Refine (정제):</strong> 리뷰 피드백 반영 + 우선순위 재조정.</li>
<li><strong>Execute (실행):</strong> 상세화된 계획을 바탕으로 코드 생성 단계로 진입.</li>
</ol>
<p><strong>핵심 포인트:</strong> 각 단계를 별도 대화 또는 명시적 prompt로 분리하면, Claude가 단계별 역할에 집중하여 환각·누락이 줄어듭니다.</p>
</div>

<div class="context-block">
<h4>왜 중요한가</h4>
<p>에이전틱 코딩의 실패 원인 1순위는 "Claude에게 충분한 맥락을 주지 않은 것"입니다. 이 5단계 워크플로우는 사용자가 맥락 제공에 게으를 때도 Claude가 스스로 맥락을 수집하도록 강제합니다. 특히 Interview 단계는 명시적 요구사항 정리를 유도하여, 이후 코드 생성의 품질을 크게 개선합니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>Spec-Driven Development</strong>: 코드 작성 전에 상세 명세(spec)를 확정하는 전통적 개발 방법론. 이 5단계 워크플로우는 AI 에이전트 시대의 spec-driven을 재해석한 것입니다.</p>
<p><strong>Multi-Session Review Pattern</strong>: 같은 작업을 다른 Claude 세션이 독립적으로 검토하게 하여 편향을 줄이는 패턴. "같은 LLM, 다른 세션"의 self-consistency 효과를 활용합니다.</p>
</div>
