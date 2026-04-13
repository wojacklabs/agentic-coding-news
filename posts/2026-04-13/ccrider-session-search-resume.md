---
layout: default
title: "ccrider — Claude Code 세션을 검색·재개하는 TUI/CLI/MCP 도구"
---

<a href="../2026-04-13" class="back-link">&larr; 4월 13일 목록</a>

# ccrider — 세션 풀텍스트 검색·재개

<div class="meta-line"><span class="tag tag-hn">HN</span> 17:34 KST</div>

> Claude Code의 모든 세션 히스토리를 SQLite에 동기화해 **풀텍스트 검색·재개**할 수 있게 해주는 단일 Go 바이너리. TUI, CLI, MCP 세 가지 인터페이스 제공.

"과거에 Claude와 뭘 이야기했더라" 문제를 근본적으로 해결합니다. 세션 파일(`~/.claude/projects/*/`)을 SQLite로 인덱싱해 grep보다 훨씬 강력한 검색과 즉시 재개가 가능합니다.

<div class="context-block">
<h4>실전 기법 핵심</h4>
<p><strong>세 가지 사용 방식:</strong></p>
<ul>
<li><strong>TUI 모드 (기본)</strong> — 세션 브라우저 + 풀텍스트 검색, fzf 스타일 인터랙티브</li>
<li><strong>CLI 모드</strong> — 스크립트에서 <code>ccrider search "..."</code> 형태로 쿼리</li>
<li><strong>MCP 모드</strong> — Claude Code 자체에 MCP 서버로 붙여, 에이전트가 과거 세션을 참조</li>
</ul>
<p><strong>작동 방식:</strong></p>
<ul>
<li>단일 Go 바이너리 — 의존성 없음</li>
<li>사용할 때마다 <code>~/.claude/projects/</code>의 JSONL 세션 파일을 SQLite에 증분 동기화</li>
<li>풀텍스트 인덱스로 메시지 본문·툴 호출·파일 경로 검색 가능</li>
</ul>
<p><strong>MCP 모드의 위력</strong>: 에이전트가 "이전에 이 버그 어떻게 해결했지?"를 스스로 검색 → 과거 해법 재사용. 메모리 시스템과 상호 보완.</p>
</div>

<div class="context-block">
<h4>왜 중요한가</h4>
<p>Claude Code의 세션은 기본적으로 "휘발성" — 컴팩션되면 정보가 사라지고, 새 세션은 처음부터 시작. ccrider는 <strong>세션을 1급 자산으로 승격</strong>시킵니다. 특히 MCP 모드로 에이전트가 자기 과거를 참조할 수 있다는 점은, 사실상 <strong>외부 장기 메모리</strong>가 됩니다. auto-memory·CLAUDE.md·Skills와 또 다른 축.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>Claude Code 세션 저장 위치</strong>: <code>~/.claude/projects/&lt;project-hash&gt;/*.jsonl</code>. 각 세션이 JSONL 한 파일. 기본 상태로는 검색 수단이 없음.</p>
<p><strong>메모리 vs 세션 히스토리</strong>: 메모리(<code>memory/</code>)는 요약된 영구 지식. 세션 히스토리는 원본 대화. ccrider는 원본 대화를 검색 가능 자산으로 변환. <a href="https://github.com/neilberkman/ccrider" class="source-link">GitHub: neilberkman/ccrider</a></p>
</div>
