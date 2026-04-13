---
layout: default
title: "MCP 서버로 1M+ LOC 코드베이스를 ~500라인 컨텍스트로 압축"
---

<a href="../2026-04-13" class="back-link">&larr; 4월 13일 목록</a>

# 1M LOC → 500라인 MCP

<div class="meta-line"><span class="tag tag-reddit">Reddit</span> r/ClaudeAI · 07:20 KST</div>

> 100만 라인 이상의 대형 코드베이스를 Claude 컨텍스트에 ~500라인만 노출하면서도 작업 가능하게 만드는 MCP 서버가 Reddit에서 feedback을 받고 있습니다.

단순히 파일을 "읽지 않는" 방식이 아니라, **코드베이스의 구조·의존성·엔트리포인트를 요약해 500라인 내에 압축**하는 MCP 서버 설계입니다. Claude는 이 요약을 보고 어느 파일을 깊이 읽을지 결정합니다.

<div class="context-block">
<h4>실전 기법 핵심</h4>
<p><strong>MCP 서버 구조:</strong></p>
<ul>
<li><code>get_overview()</code>: 디렉토리 트리 + 주요 엔트리포인트 + 공통 패턴 요약 (~200라인)</li>
<li><code>get_module(path)</code>: 특정 모듈의 클래스·함수·export 시그니처만 (~100라인/모듈)</li>
<li><code>search_code(pattern)</code>: ripgrep 기반 정확 검색, 결과만 반환</li>
<li><code>read_file(path, range)</code>: 필요 시 특정 파일 특정 구간만 읽기</li>
</ul>
<p><strong>500라인 예산 분배:</strong> overview 200라인 + 현재 모듈 시그니처 200라인 + 검색 결과 100라인. Claude는 이 상태에서 의미 있는 변경을 시작할 수 있음.</p>
<p><strong>Obsidian 접근과 차이:</strong> Obsidian은 사람이 만든 노트를 재활용하고, 이 방식은 **코드 자체에서 자동 생성된 요약**을 제공. 기존 대규모 레거시에 바로 적용 가능.</p>
</div>

<div class="context-block">
<h4>왜 중요한가</h4>
<p>대기업 코드베이스는 100만~1000만 라인이 흔합니다. Claude Code로 이런 규모를 다루려면 전체 주입은 불가능하고, 영리한 요약이 필수입니다. 이 MCP는 "코드 구조 요약"을 자동화하여, 레거시 프로젝트에도 에이전트를 적용할 수 있게 합니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>Hierarchical Context</strong>: 대규모 코드베이스를 "계층적"으로 다루는 접근. 먼저 상위 레벨 요약 → 필요 시 하위 상세로 드릴다운. OS의 가상 메모리 페이징과 유사한 원리입니다.</p>
<p><strong>Tree-sitter</strong>: 언어별 파서 라이브러리로, 코드에서 함수/클래스 시그니처를 빠르게 추출할 때 사용됩니다. 이 MCP 서버의 구조 요약에 활용될 가능성이 높습니다.</p>
</div>
