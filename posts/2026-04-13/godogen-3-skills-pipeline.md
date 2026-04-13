---
layout: default
title: "Godogen — 3개의 Claude Code Skills로 Godot 4 게임 프로젝트 전체 생성"
---

<a href="../2026-04-13" class="back-link">&larr; 4월 13일 목록</a>

# Godogen — 3 Skills 파이프라인

<div class="meta-line"><span class="tag tag-hn">HN</span> 19:02 KST</div>

> 자연어 설명으로 Godot 4 게임 프로젝트 전체를 생성하는 오픈소스 Claude Code Skills 집합. 아키텍처 설계·에셋 생성·C# 코드·스크린샷 QA를 한 파이프라인으로 자동화.

<div class="context-block">
<h4>출처 핵심 (GitHub README에서 확인되는 내용만)</h4>
<p><strong>3개 Claude Code Skills 구성:</strong></p>
<ol>
<li><strong>godogen</strong> (orchestrator) — 전체 파이프라인을 단일 1M 토큰 컨텍스트 윈도우에서 실행</li>
<li><strong>godot-api</strong> (forked, Sonnet 기반) — Godot class API 조회</li>
<li><strong>visual-qa</strong> (forked) — 스크린샷 분석과 시각 디버깅 (Gemini Flash + Claude vision)</li>
</ol>

<p><strong>파이프라인 단계:</strong></p>
<ul>
<li>Architecture planning and design</li>
<li>Asset generation (이미지, 3D 모델, 애니메이션 스프라이트)</li>
<li>C# code generation for Godot 4</li>
<li>Screenshot capture from running engine</li>
<li>Visual QA and bug fixing</li>
<li>Iterative refinement</li>
</ul>

<p><strong>에셋 생성 도구 분담:</strong></p>
<ul>
<li>Gemini: references/characters</li>
<li>xAI Grok: textures/objects/video</li>
<li>Tripo3D: 3D 변환</li>
</ul>

<p><strong>출력물</strong>: 실제 동작하는 Godot 4 프로젝트 — Scene 트리, C# 스크립트(.NET 9), 에셋 구조, 2D·3D 지원.</p>

<p><strong>설치·사용:</strong></p>
<pre><code>./publish.sh ~/my-game
./publish.sh --force ~/my-game  # 기존 target 정리</code></pre>
<p>이후 만들어진 폴더에서 Claude Code를 열고 게임을 설명.</p>

<p><strong>개발 히스토리 (README에서 직접 확인):</strong></p>
<ul>
<li>2026-03-09 — 초기 릴리스 (2 Skill 아키텍처)</li>
<li>2026-03-25 — xAI Grok 영상 생성(애니메이션 스프라이트용) 추가</li>
<li>2026-04-03 — 단일 컨텍스트 아키텍처로 통합, task executor를 main godogen skill에 병합</li>
<li>2026-04-06 — GDScript → C# / .NET 9 마이그레이션. "Eliminates GDScript's Variant type inference errors — compiler catches mistakes before runtime"</li>
</ul>

<p><strong>하드웨어</strong>: commodity hardware에서 실행. VM 친화적, channel/remote control 지원.</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>Skills 여러 개를 묶어 단계별 책임을 분할한 실제 프로덕션 사례. 일반적으로 LLM 단일 호출로 복잡한 창작 파이프라인을 돌리면 품질이 불안정한데, 이 프로젝트는 "orchestrator + API 조회 + 시각 QA" 3가지 역할로 나눈 구조를 보여줍니다. 특히 최근 업데이트에서 오히려 두 Skill을 하나의 컨텍스트로 "통합"한 점이 흥미로운데, 분할·통합의 균형점에 대한 실전 힌트로 읽힙니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>Godot</strong>: 오픈소스 게임 엔진. 유사 선택지로는 Unity·Unreal이 있지만 Godot의 C#/.NET 스크립트는 LLM 친화적인 텍스트 프로젝트 구조가 장점입니다.</p>
<p><strong>fork된 Skill</strong>: README가 "forked"라고 표기한 것은 기존 Claude Code용 Skill을 분기해 맞춤화했다는 의미로 해석됩니다(일반적으로 "forked" 용어 기준).</p>
<p><strong>원문</strong>: <a href="https://github.com/htdt/godogen" class="source-link">github.com/htdt/godogen</a></p>
</div>
