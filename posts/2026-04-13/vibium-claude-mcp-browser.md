---
layout: default
title: "Vibium — Claude Code에 한 줄로 붙이는 MCP 브라우저 자동화"
---

<a href="../2026-04-13" class="back-link">&larr; 4월 13일 목록</a>

# Vibium — Claude Code MCP 브라우저

<div class="meta-line"><span class="tag tag-hn">HN</span> 19:02 KST</div>

> `claude mcp add vibium -- npx -y vibium mcp` 한 줄로 Claude Code에 연결되는 브라우저 자동화 MCP. JavaScript·Python·Java 바인딩 제공.

<div class="context-block">
<h4>출처 핵심 (GitHub README에서 확인되는 내용만)</h4>

<p><strong>설치:</strong></p>
<pre><code>npm install -g vibium
npx skills add https://github.com/VibiumDev/vibium --skill vibe-check</code></pre>

<p><strong>Claude Code에 연결:</strong></p>
<pre><code>claude mcp add vibium -- npx -y vibium mcp</code></pre>

<p><strong>Gemini CLI에 연결:</strong></p>
<pre><code>gemini mcp add vibium npx -y vibium mcp</code></pre>

<p><strong>언어 바인딩 (모두 async/sync API 지원):</strong></p>
<ul>
<li>JavaScript/TypeScript (npm package)</li>
<li>Python (pip package)</li>
<li>Java (Maven Central & Gradle)</li>
</ul>

<p><strong>작동 방식</strong>: MCP 서버가 "structured tool use instead of CLI"를 제공. AI 에이전트가 MCP를 통해 브라우저를 제어. 설치 시 Vibium 바이너리 다운로드 + Chrome 자동 가져오기.</p>

<p><strong>프로젝트 주체</strong>: GitHub 조직 <strong>VibiumDev</strong>. README에는 개별 creator 이름이 명시되어 있지 않음.</p>
</div>

<div class="context-block">
<h4>HN 포스트에서의 자기 주장 (별개 출처)</h4>
<p>HN에 올라온 이 프로젝트 Show HN 포스트 본문에서 작성자는 다음과 같이 자기 소개:</p>
<blockquote>"i started the selenium project 21 years ago. vibium is what i'd build if i started over today with ai agents in mind."</blockquote>
<p>단, 이 주장은 HN 본문의 작성자 자기 주장이며 GitHub README에는 언급되지 않음. 실제 Selenium 창시자와의 동일인 여부는 이 기사의 출처 범위에서는 확인되지 않음.</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 Claude Code에 브라우저 자동화 기능을 붙이려면 Playwright·Puppeteer 같은 별도 도구 설치 + MCP 래퍼 작성의 두 단계가 필요했습니다. Vibium은 "한 줄 설치 + 내장 MCP"로 이 과정을 단축합니다. 다중 런타임(Claude Code / Gemini CLI) 호환을 처음부터 표방한 점도 특징입니다. 단, 저자의 "Selenium 창시자" 주장은 실제 정체성 검증 전까지는 참고용으로 두는 것이 안전합니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong><code>claude mcp add</code></strong>: Claude Code CLI에서 MCP 서버를 등록하는 표준 명령. 일반적으로 <code>-- npx -y PACKAGE</code> 형태가 npm 패키지 즉석 실행 패턴으로 흔히 쓰입니다.</p>
<p><strong>원문</strong>: <a href="https://github.com/VibiumDev/vibium" class="source-link">github.com/VibiumDev/vibium</a></p>
<p><strong>HN discussion</strong>: <a href="https://news.ycombinator.com/item?id=46377597" class="source-link">news.ycombinator.com/item?id=46377597</a></p>
</div>
