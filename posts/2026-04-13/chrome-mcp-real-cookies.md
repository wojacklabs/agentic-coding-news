---
layout: default
title: "실제 Chrome 쿠키·인증으로 AI 에이전트가 브라우저 제어하는 MCP 서버"
---

<a href="../2026-04-13" class="back-link">&larr; 4월 13일 목록</a>

# 실제 Chrome 세션 제어 MCP

<div class="meta-line"><span class="tag tag-reddit">Reddit</span> r/ClaudeAI · 09:30 KST</div>

> Playwright/Puppeteer를 별도로 셋업하지 않고도 사용자의 **진짜 Chrome 세션**(쿠키, 로그인, 확장 프로그램)을 그대로 활용하는 MCP 서버가 공개되었습니다.

기존 브라우저 자동화 도구들은 별도 헤드리스 브라우저를 띄워 매번 로그인부터 다시 해야 했습니다. 이 MCP 서버는 **이미 로그인된 사용자의 Chrome 인스턴스**에 직접 연결하여, 에이전트가 사용자 권한으로 GitHub/Notion/Slack 등을 조작할 수 있게 합니다. <small>참고: 이 뉴스 사이트도 동일한 패턴(claude-in-chrome MCP)으로 X·Threads 데이터를 수집하고 있습니다.</small>

<div class="context-block">
<h4>실전 기법 핵심</h4>
<p><strong>아키텍처:</strong></p>
<ul>
<li>Chrome Remote Debugging Protocol(CDP) 활용</li>
<li>사용자가 평소 쓰는 Chrome 프로필에 부착 → 쿠키·인증 자동 상속</li>
<li>MCP 도구로 노출: <code>navigate</code>, <code>click</code>, <code>type</code>, <code>screenshot</code>, <code>execute_js</code> 등</li>
</ul>
<p><strong>활용 시나리오:</strong></p>
<ul>
<li>로그인된 GitHub에서 PR 검토·코멘트</li>
<li>로그인된 Linear/Jira에서 이슈 생성</li>
<li>로그인된 Slack에서 메시지 작성</li>
<li>로그인된 SaaS 어드민 페이지 자동 조작</li>
</ul>
<p><strong>주의사항:</strong> 사용자의 모든 권한이 에이전트에 노출되므로, 신뢰할 수 있는 에이전트와 명확한 작업 범위를 정해 사용해야 합니다.</p>
</div>

<div class="context-block">
<h4>왜 중요한가</h4>
<p>에이전틱 워크플로우의 큰 장벽은 **"인증된 SaaS 접근"**입니다. 별도 API 키 발급, OAuth 셋업, 권한 부여 등이 필요합니다. 사용자 Chrome 세션 재활용 패턴은 이 모든 단계를 건너뛰어, 인간이 평소 하는 모든 웹 작업을 그대로 위임할 수 있게 합니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>Chrome DevTools Protocol (CDP)</strong>: Chrome이 외부에서 제어받기 위해 노출하는 표준 프로토콜. <code>--remote-debugging-port=9222</code>로 시작하면 다른 프로세스가 붙을 수 있습니다.</p>
<p><strong>claude-in-chrome MCP</strong>: Anthropic이 공식 제공하는 MCP 서버로, 같은 방식으로 사용자 Chrome 세션을 활용합니다. 이 뉴스 사이트의 X/Threads 수집도 이 메커니즘을 이용합니다.</p>
</div>
