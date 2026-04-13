---
layout: default
title: "Godogen — Claude Code Skills로 Godot 게임을 통째로 자동 생성"
---

<a href="../2026-04-13" class="back-link">&larr; 4월 13일 목록</a>

# Godogen — Claude Code Skills 파이프라인

<div class="meta-line"><span class="tag tag-hn">HN</span> 17:34 KST</div>

> Claude Code Skills 여러 개를 파이프라인으로 묶어 텍스트 프롬프트 하나에서 **플레이 가능한 Godot 4 게임 프로젝트**를 통째로 생성하는 오픈소스가 HN 337점.

"1년간 4번 재작성"했다는 실제 프로덕션 수준 Skills 조합 사례입니다. 텍스트 → 아키텍처 설계 → 2D/3D 에셋 생성 → GDScript 작성 → 시각 테스트까지 전 과정이 단일 파이프라인으로 자동화됩니다.

<div class="context-block">
<h4>실전 기법 핵심</h4>
<p><strong>파이프라인 단계 (각각 Skill 1개):</strong></p>
<ul>
<li>프롬프트 파싱 & 게임 컨셉 확정</li>
<li>프로젝트 아키텍처 설계 (Scene·Node 구조)</li>
<li>2D/3D 에셋 생성 (스프라이트, 모델)</li>
<li>GDScript 코드 생성 (게임 로직·물리)</li>
<li>시각 테스트 — 실제로 게임이 돌아가는지 스크린샷 기반 검증</li>
</ul>
<p><strong>왜 "믿을 수 있는" 출력이 나오는가</strong>:</p>
<ul>
<li>LLM에게 한 번에 전부 시키지 않고, <strong>각 Skill이 좁은 책임만</strong> 담당</li>
<li>단계별 검증 gate를 두어 실패 시 재시도 — Claude Code의 agent 루프가 관리</li>
<li>아키텍처 단계에서 나온 계약(interface)을 다음 단계가 지키도록 강제</li>
</ul>
</div>

<div class="context-block">
<h4>왜 중요한가</h4>
<p>"LLM에게 게임 만들어달라"는 요청이 <strong>한 번에는 잘 안 나오지만, 공정을 나누고 각 단계를 Skill로 모듈화하면 안정적으로 돌아간다</strong>는 실증. Claude Code Skills가 <strong>복잡한 창작 파이프라인의 기본 구성 단위</strong>로 쓰일 수 있음을 보여준 첫 대표 사례입니다. 같은 패턴을 웹 앱·데이터 파이프라인 전체에도 응용 가능.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>단계별 Skill 분할의 효과</strong>: LLM은 긴 태스크에서 context drift·hallucination 위험이 큼. 책임을 좁힌 Skill 여러 개로 릴레이하면 각 단계의 출력이 작고 검증 가능해져 결과 품질이 비약적으로 올라간다는 것이 이 프로젝트의 핵심 교훈.</p>
<p><strong>Godot</strong>: 오픈소스 게임 엔진. 텍스트 기반 프로젝트 파일과 GDScript가 LLM 친화적이라 이 실험에 적합했던 배경. <a href="https://github.com/htdt/godogen" class="source-link">GitHub: htdt/godogen</a></p>
</div>
