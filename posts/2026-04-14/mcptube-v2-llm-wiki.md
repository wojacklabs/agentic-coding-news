---
layout: default
title: "Mcptube v2 — Karpathy LLM Wiki 패턴을 YouTube에 적용, Claude Code 연동 MCP"
---

<a href="../2026-04-14" class="back-link">&larr; 4월 14일 목록</a>

# Mcptube v2 — Vision + FTS5 MCP

<div class="meta-line"><span class="tag tag-hn">HN</span> 21:50 KST</div>

> Stanford/Berkeley AI 강의 영상을 검색·질문 가능한 MCP 서버로 만든 도구의 v2. Karpathy "LLM Wiki" 아이디어를 적용해 ingest 시점에 transcript + scene change + vision description을 wiki 페이지로 누적.

<div class="context-block">
<h4>출처 핵심 (HN 포스트 본문에서 확인되는 내용만)</h4>

<p><strong>v1 배경 (직접 인용):</strong></p>
<blockquote>"Built v1 of mcptube a few months ago. It performs transcript search and implements Q&amp;A as an MCP server. It got traction (34 stars, my first open-source PR, some notable stargazers like CEO of Trail of Bits). But v1 re-searched raw chunks from scratch every query. So I rebuilt it."</blockquote>

<p><strong>v2 (mcptube-vision) 아키텍처 (직접 인용):</strong></p>
<blockquote>"v2 (mcptube-vision) follows Karpathy's LLM Wiki pattern. At ingest time, it extracts transcripts, detects scene changes with ffmpeg, describes key frames via a vision model, and writes structured wiki pages. Knowledge compounds across videos rather than being re-discovered. FTS5 + a two-stage agent (narrow then reason) for retrieval."</blockquote>

<p><strong>운영 모드:</strong></p>
<ul>
<li>CLI (BYOK — Bring Your Own Key)</li>
<li>MCP 서버</li>
</ul>

<p><strong>테스트된 클라이언트 (직접 인용):</strong></p>
<blockquote>"I tested MCPTube with Claude Code, Claude Desktop, VS Code Copilot, Cursor, and others. Zero API key needed server-side."</blockquote>

<p><strong>설치</strong>: <code>pip install mcptube</code>.</p>

<p><strong>향후 계획 (작성자 언급):</strong> SaaS 플랫폼 — playlist ingestion, team wikis. 얼리 액세스 페이지(<code>0xchamin.github.io/mcptube/</code>) 공유.</p>

<p><strong>작성자가 논의하고 싶다는 아키텍처 트레이드오프:</strong> FTS5 vs vectors / file-based wiki vs DB / scene-change vs fixed-interval sampling.</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 YouTube 긴 영상에서 "특정 설명"을 찾으려면 scrub 작업이 필요합니다. Mcptube는 <strong>MCP 서버 형태</strong>로 이 검색·Q&amp;A를 Claude Code 세션에서 바로 쓸 수 있게 만듭니다. 특히 v2의 <strong>"ingest 시점에 vision model + FTS5 wiki"</strong> 접근은 쿼리마다 raw chunk를 재검색하는 v1 대비 지식 축적이 가능하다는 점이 설계적 차이. Karpathy LLM Wiki 패턴이 실제 MCP 구현에 적용된 사례로 참고 가치가 있습니다. 단 vision 모델 호출 비용·wiki 품질 검증은 별도 확인이 필요합니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>FTS5</strong>: 일반적으로 SQLite의 full-text search extension. 가볍고 파일 한 개로 배포 가능해 MCP 서버 embed에 적합합니다.</p>
<p><strong>BYOK(Bring Your Own Key)</strong>: 일반적으로 사용자가 자기 API 키를 제공하고 서버는 키를 저장하지 않는 방식. 서버 측 비용·책임 분리.</p>
<p><strong>원문</strong>: <a href="https://github.com/0xchamin/mcptube" class="source-link">github.com/0xchamin/mcptube</a></p>
<p><strong>HN discussion</strong>: <a href="https://news.ycombinator.com/item?id=47754559" class="source-link">news.ycombinator.com/item?id=47754559</a></p>
</div>
