---
layout: default
title: "AppControl MCP for Windows — Claude Code/Desktop이 시스템 자원·보안 이력 read-only 조회"
---

<a href="../2026-04-15" class="back-link">&larr; 4월 15일 목록</a>

# AppControl MCP — Windows 시스템 정보

<div class="meta-line"><span class="tag tag-hn">HN</span> 03:51 KST</div>

> Windows 시스템 모니터링 데이터(CPU/GPU/메모리/디스크/온도/서명 검증/접근 로그)를 Claude·Cursor·Windsurf 등 AI 어시스턴트에 read-only 노출하는 MCP 서버. HN score 6, posted 2026-04-14.

<div class="context-block">
<h4>출처 핵심 (GitHub README에서 확인되는 내용만)</h4>

<p><strong>도구 정의</strong>: AppControl MCP는 AppControl 데스크톱 앱이 수집한 historical performance·security 정보를 MCP 서버로 노출. <strong>read-only access</strong>.</p>

<p><strong>리소스 모니터링 항목:</strong></p>
<ul>
<li>CPU, GPU, memory, disk usage</li>
<li>Temperature sensor data</li>
<li>Per-application resource consumption</li>
</ul>

<p><strong>보안·프라이버시:</strong></p>
<ul>
<li>Binary signature verification (unsigned application 식별)</li>
<li>Publisher/certificate tracking</li>
<li>Application access logs (webcam, microphone, location)</li>
<li>Quarantine rules and blocked process events</li>
<li>Process execution history</li>
</ul>

<p><strong>설치 옵션 3가지:</strong></p>
<ol>
<li>MCPB Package — Claude Desktop Settings → Extensions에서 설치</li>
<li>Claude Code Plugin: <code>/plugin install appcontrol-mcp@appcontrollabs</code></li>
<li>Standalone Executable — <code>.exe</code> 파일 + MCP settings 직접 설정</li>
</ol>

<p><strong>지원 클라이언트:</strong></p>
<p>Claude Desktop & Claude Code, Cursor, Windsurf, VS Code, OpenAI Codex, Gemini.</p>

<p><strong>예시 쿼리 (README verbatim):</strong></p>
<ul>
<li>"What unsigned applications are running?"</li>
<li>"Which apps accessed my webcam while idle?"</li>
<li>"Show blocked processes from the last 24 hours"</li>
<li>"What caused my fan to spike?"</li>
<li>"Which binaries have changed hashes recently?"</li>
</ul>

<p><strong>요구사항</strong>: Windows 전용. AppControl 앱이 MCP API enabled로 실행 중이어야 함.</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 MCP 서버는 SaaS API 연결 위주로 알려져 있는데, AppControl은 <strong>로컬 OS 시스템 정보를 LLM에 자연어로 노출</strong>하는 카테고리로 흥미로운 사례입니다. "What caused my fan to spike?"·"Which apps accessed my webcam while idle?" 같은 질의는 시스템 관리자가 평소 manual log grep으로 처리하던 것을 LLM 친화적으로 만든 것. read-only로 제한된 점이 보안 측면에서 합리적이며, Claude Code Plugin marketplace 경유 설치(<code>/plugin install</code>)도 표준 패턴 정착을 보여줍니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>MCPB Package</strong>: 일반적으로 Claude Desktop의 Extension 형식. <code>.mcpb</code> 파일을 다운로드해 Settings에서 설치. CLI 셋업 없이 일반 사용자도 MCP 서버 도입 가능.</p>
<p><strong><code>/plugin install</code></strong>: 일반적으로 Claude Code의 plugin marketplace 명령. 일관된 설치 경험.</p>
<p><strong>원문</strong>: <a href="https://github.com/AppControlLabs/appcontrol-mcp-go/" class="source-link">github.com/AppControlLabs/appcontrol-mcp-go/</a></p>
<p><strong>HN discussion</strong>: <a href="https://news.ycombinator.com/item?id=47766443" class="source-link">news.ycombinator.com/item?id=47766443</a></p>
</div>
