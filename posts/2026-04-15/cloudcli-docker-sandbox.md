---
layout: default
title: "CloudCLI — Claude Code를 Docker sandbox에서 격리 실행, 웹/모바일 UI 제공"
---

<a href="../2026-04-15" class="back-link">&larr; 4월 15일 목록</a>

# CloudCLI — Docker Sandbox + Web UI

<div class="meta-line"><span class="tag tag-reddit">Reddit</span> 06:51 KST</div>

> 오픈소스 CloudCLI(전 claudecodeui)에 Docker Sandbox 지원 추가. <code>npx @cloudcli-ai/cloudcli@latest sandbox ~/my-project</code> 한 줄로 격리 환경에서 Claude Code 실행, web UI URL 발급. r/ClaudeAI score 6, 04-14 posted.

<div class="context-block">
<h4>출처 핵심 (Reddit 글에서 확인되는 내용만)</h4>

<p><strong>도구 정체 (직접 인용):</strong></p>
<blockquote>"I maintain CloudCLI, an open source web/mobile UI for AI Coding agents like Claude Code, Gemini and Codex (https://github.com/siteboon/claudecodeui if you are not aware)"</blockquote>

<p><strong>새로 추가된 기능 (직접 인용):</strong></p>
<blockquote>"We recently added Docker Sandbox support and I wanted to share it here. The idea is simple, Docker sandbox allows you to run agents in an isolated environment and we've created a template to also add a webui on top of it and interact with your sandbox instead of a terminal."</blockquote>

<p><strong>실행 명령:</strong></p>
<pre><code>npx @cloudcli-ai/cloudcli@latest sandbox ~/my-project</code></pre>

<p><strong>요구사항</strong>: docker sbx 설치 필요.</p>

<p><strong>Docker repo</strong>: <code>hub.docker.com/r/cloudcliai/sandbox</code></p>

<p><strong>동작 (직접 인용):</strong></p>
<blockquote>"This starts Claude Code by default inside an isolated sandbox and gives you a URL. Your project files sync in real time, credentials stay outside the sandbox."</blockquote>

<p><strong>알려진 제한 (직접 인용):</strong></p>
<blockquote>"It's still experimental as Docker's sbx setup itself is pretty new and there might be some issues. It's worth noting that the sbx CLI needs to be installed separately and port forwarding doesn't survive restarts"</blockquote>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 Claude Code가 권한이 강한 명령(파일 편집·shell 실행)을 자유롭게 내리는 환경이라, sandbox 격리는 위험 작업 시 합리적 안전망입니다. CloudCLI 접근은 (1) <strong>credentials는 sandbox 외부에 유지</strong> (2) <strong>project files는 real-time sync</strong> (3) <strong>web/mobile UI로 터미널 외 접근</strong> 세 가지 결합이 특징. Anthropic의 새 Routines·Desktop redesign과 다른 방향(로컬 격리 vs cloud autorun)이지만 같은 "터미널 의존도 낮추기" 흐름. Docker sbx 자체가 새로운 기능이라 production 안정성은 별도 검증 필요.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>Docker sbx</strong>: 일반적으로 Docker가 최근 도입한 sandbox CLI 기능. 표준 컨테이너보다 더 강한 격리를 제공하는 것으로 알려져 있으며, 별도 설치가 필요한 신규 기능.</p>
<p><strong>원문</strong>: <a href="https://www.reddit.com/r/ClaudeAI/comments/1slld23/docker_sandbox_templates_for_running_claude_code/" class="source-link">r/ClaudeAI 원 스레드</a></p>
</div>
