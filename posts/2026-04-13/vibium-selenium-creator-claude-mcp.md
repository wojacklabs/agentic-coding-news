---
layout: default
title: "Vibium — Selenium 창시자가 21년 만에 다시 만든 브라우저 자동화 MCP"
---

<a href="../2026-04-13" class="back-link">&larr; 4월 13일 목록</a>

# Vibium — Selenium 창시자의 Claude Code MCP

<div class="meta-line"><span class="tag tag-hn">HN</span> 17:34 KST</div>

> Selenium을 21년 전에 시작한 창시자가 "오늘 AI 시대에 새로 시작한다면 이렇게 만들겠다"며 공개한 브라우저 자동화 MCP. HN 443점으로 Claude Code 커뮤니티 전면 주목.

`claude mcp add vibium -- npx -y vibium` 한 줄로 Claude Code에 연결됩니다. `npm install vibium`만 하면 Go 바이너리·브라우저·BiDi·MCP가 한꺼번에 준비되는 "dev never sees it" 철학이 핵심입니다.

<div class="context-block">
<h4>실전 기법 핵심</h4>
<p><strong>설치·연결 (한 줄):</strong></p>
<pre><code>claude mcp add vibium -- npx -y vibium</code></pre>
<p><strong>설계 원칙:</strong></p>
<ul>
<li><strong>Go 바이너리 단일 파일</strong>이 브라우저 제어·WebDriver BiDi·MCP 프로토콜을 통합 처리</li>
<li>개발자는 <code>npm install vibium</code> 한 줄만 — 셋업 스크립트·driver 다운로드 없음</li>
<li>AI 에이전트와 인간 모두가 같은 API로 사용 가능 ("for AI and humans")</li>
<li>Python·Java 바인딩 예정 — 지금은 Node.js 우선</li>
</ul>
<p><strong>기존 Selenium·Playwright와의 차이:</strong></p>
<ul>
<li>Selenium: 드라이버 별도 설치·버전 관리 필수</li>
<li>Playwright: MCP 래퍼 따로 만들어야 Claude Code에 연결</li>
<li>Vibium: MCP 서버가 <strong>내장</strong> — Claude Code에서 즉시 사용 가능한 첫 상용 브라우저 자동화</li>
</ul>
</div>

<div class="context-block">
<h4>왜 중요한가</h4>
<p>업계 전설인 Selenium 창시자가 "AI 에이전트 시대의 브라우저 자동화는 MCP 중심이어야 한다"고 설계 선언한 셈. Claude Code에 브라우저 도구가 필요할 때 <strong>기본 선택지</strong>가 될 가능성이 큽니다. 또한 <em>claude-in-chrome</em>(Anthropic 공식, 사용자 Chrome 세션 탈취형)과 달리 <strong>독립 브라우저 인스턴스</strong>를 쓰므로 테스팅·스크래핑 자동화 시나리오에 더 적합합니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>claude mcp add 명령</strong>: Claude Code CLI에서 MCP 서버를 프로젝트·전역에 등록하는 표준 커맨드. <code>-- npx -y PACKAGE</code> 형태로 npm 패키지를 즉석 설치·실행하는 패턴이 최근 MCP 서버 배포의 사실상 표준이 되고 있음.</p>
<p><strong>WebDriver BiDi</strong>: W3C가 표준화 중인 양방향 브라우저 제어 프로토콜. 기존 WebDriver보다 이벤트 기반 제어가 강력해 에이전트 시나리오에 적합. <a href="https://github.com/VibiumDev/vibium" class="source-link">GitHub: VibiumDev/vibium</a></p>
</div>
