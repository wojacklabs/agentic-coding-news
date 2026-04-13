---
layout: default
title: "badi — 반복 명령·잃어버린 컨텐츠를 정리하는 Claude Code 워크플로우 시스템"
---

<a href="../2026-04-13" class="back-link">&larr; 4월 13일 목록</a>

# badi — Claude Code 워크플로우 시스템

<div class="meta-line"><span class="tag tag-x">X</span> 09:30 KST</div>

> X에서 KanFatih가 매일 사용하는 자체 도구 **badi** — Claude Code를 "구조화된 운영체제"로 만드는 오픈소스 워크플로우 시스템을 공개했습니다.

수개월간 Claude Code를 쓰면서 **반복 명령**, **잃어버린 컨텐츠**, **복잡한 config 관리**에 시달린 끝에 만든 도구입니다. Claude Code의 기본 CLI 위에 워크플로우 레이어를 얹어 일관된 운영 환경을 제공합니다.

<div class="context-block">
<h4>실전 기법 핵심</h4>
<p><strong>해결하는 문제:</strong></p>
<ul>
<li>같은 명령을 매번 타이핑 — badi는 명령 템플릿화</li>
<li>세션 간 전환 시 컨텐츠 분실 — badi는 컨텐츠 저장소 제공</li>
<li>config 파일이 .claude/ 안에 흩어짐 — badi는 통일된 config 인터페이스</li>
</ul>
<p><strong>적용 시나리오:</strong> 매일 같은 PR 리뷰·테스트·커밋 패턴이 있는 개발자, 여러 프로젝트를 동시 운영하는 컨설턴트.</p>
</div>

<div class="context-block">
<h4>왜 중요한가</h4>
<p>Claude Code의 강력함은 "유연성"이지만, 같은 사용자가 매일 비슷한 작업을 반복하면 그 유연성이 오히려 부담이 됩니다. badi 같은 워크플로우 도구는 **개인의 반복 패턴을 결정성 있게 자동화**하여, 에이전트의 비결정성을 보완합니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>Workflow Layer Pattern</strong>: 강력한 저수준 도구(Claude Code) 위에 사용자별 반복 작업을 자동화하는 상위 레이어. 비슷한 사례로 Claudraband(어제 발행), ccc(어제 발행) 등이 있습니다.</p>
<p><strong>Operating System Metaphor</strong>: 단일 명령 도구를 "OS"로 재해석하는 접근. 파일·세션·config·명령을 통합 관리하는 메타-인터페이스 계층입니다.</p>
</div>
