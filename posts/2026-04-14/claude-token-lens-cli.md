---
layout: default
title: "claude-token-lens — Claude Code quota를 tool·agent 단위로 live 브레이크다운하는 CLI"
---

<a href="../2026-04-14" class="back-link">&larr; 4월 14일 목록</a>

# claude-token-lens — 세션별 토큰 소스 분해

<div class="meta-line"><span class="tag tag-reddit">Reddit</span> 03:34 KST</div>

> Claude Code 기본 <code>/stats</code>가 총량만 보여주는 한계를 보완해, 세션 파일을 읽어 tool/agent 단위 live 토큰 소비를 보여주는 오픈소스 CLI.

<div class="context-block">
<h4>출처 핵심 (Reddit 글에서 확인되는 내용만)</h4>

<p><strong>동기</strong>:</p>
<blockquote>"Been hitting quota limits way faster than expected, with no clue where tokens were going."</blockquote>

<p><strong>기본 <code>/stats</code>의 한계</strong>: "The built-in <code>/stats</code> only shows a total — no breakdown."</p>

<p><strong>도구 이름</strong>: <strong>claude-token-lens</strong>.</p>

<p><strong>작동 방식 (직접 인용):</strong></p>
<blockquote>"It reads the same session files Claude Code writes and gives a live, per-source token breakdown."</blockquote>

<p><strong>사용 예시(candidate에 노출된 부분)</strong>: <code>claude-token-</code> (candidate text에서 명령어가 잘려 끊김)</p>

<p><strong>참고</strong>: 설치 방법, 실제 실행 명령 전체, GitHub URL 등은 candidate text가 잘려 이 기사 출처 범위에서는 확인되지 않음.</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 Claude Code 세션에서 "어디로 토큰이 새는지"는 Tool별·Subagent별로 불균형이 큰 경우가 많습니다. MCP 서버 하나만 잘못 구성해도 세션 토큰을 대량 소비할 수 있어, tool·agent 단위 브레이크다운은 비용 튜닝의 첫 단계에 해당합니다. <code>/stats</code>가 총량만 주는 구조를 보조하는 CLI는 이 첫 단계에서 유용해 보이며, 세션 로그 파일을 외부에서 읽어 분석하는 접근은 다른 튜닝 스크립트에도 응용 가능한 패턴입니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>Claude Code 세션 파일 위치(일반)</strong>: 일반적으로 <code>~/.claude/projects/&lt;project-hash&gt;/*.jsonl</code>에 대화와 tool 호출 로그가 저장됩니다. 이 CLI는 그 파일을 외부에서 파싱해 집계하는 것으로 보입니다.</p>
<p><strong>원문</strong>: <a href="https://www.reddit.com/r/ClaudeAI/comments/1skip25/i_built_a_cli_to_see_exactly_which_toolagent_is/" class="source-link">r/ClaudeAI 원 스레드</a></p>
</div>
