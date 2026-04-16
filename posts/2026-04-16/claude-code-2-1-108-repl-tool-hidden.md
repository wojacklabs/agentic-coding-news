---
layout: default
title: "Claude Code v2.1.108의 hidden REPL tool — CLAUDE_CODE_REPL=true로 JS 코드로 tools 일괄 호출·Haiku·MCP bridge 가능"
---

<a href="../2026-04-16" class="back-link">&larr; 4월 16일 목록</a>

# v2.1.108 Hidden REPL Tool

<div class="meta-line"><span class="tag tag-reddit">Reddit</span> 09:47 KST</div>

> Claude Code v2.1.108에 숨겨진 REPL tool 공개. <code>CLAUDE_CODE_REPL=true</code>로 native installation에서 활성화. <code>sh()</code>·<code>haiku()</code>·<code>gh()</code>·<code>await mcp__server__tool()</code> 같은 유틸을 JavaScript 코드로 일괄 호출해 tool call 왕복 비용 절감. Codex는 2월부터, Claude Code는 이번 주 도입. r/ClaudeAI posted 2026-04-16 00:24 KST, 43 upvotes.

<div class="context-block">
<h4>출처 핵심 (Reddit selftext에서 확인되는 내용만)</h4>

<p><strong>핵심 동작 (직접 인용):</strong></p>
<blockquote>"Claude Code v2.1.108's new hidden REPL tool lets Claude explore the file system, use Haiku, and call tools, all using JavaScript code."</blockquote>

<p><strong>목적 — tool call 왕복 절감 (직접 인용):</strong></p>
<blockquote>"This way it can perform many tool calls in one go and programmatically process their results, instead of waiting for each tool call to finish, looking at the raw output, and then finally processing the results. This could allow the model to get much more done in a single request, saving time and tokens."</blockquote>

<p><strong>활성화 방법 (직접 인용):</strong></p>
<blockquote>"You can enable this tool if you have the native installation of CC v2.1.108 by setting the $CLAUDE_CODE_REPL environment variable to true."</blockquote>

<p><strong>호출 패턴 예시 (직접 인용):</strong></p>
<pre><code>o.cwd = sh("pwd");
o.mdFiles = rg("^p?npm (start|dev)");
o.readme = cat("README.md")</code></pre>

<p><strong>유틸 카탈로그 (selftext 그대로)</strong>:</p>
<ul>
<li><strong>Shell & File</strong>: <code>sh(cmd, ms?)</code> / <code>cat(path, off?, lim?)</code> / <code>put(path, content)</code></li>
<li><strong>Search & Glob</strong>: <code>rg(pat, path?, {A,B,C,glob,head,type,i}?)</code> / <code>rgf(pat, path?, glob?)</code> / <code>gl(pat, path?)</code></li>
<li><strong>GitHub</strong>: <code>gh(args)</code> — runs <code>gh &lt;args&gt;</code> with <code>-R ${REPO}</code> injected automatically</li>
<li><strong>AI</strong>: <code>haiku(prompt, schema?)</code> — one-turn model sampling (lightweight AI call)</li>
<li><strong>Tool Bridging</strong>: <code>await Edit({...})</code>, <code>await NotebookEdit({...})</code>, <code>await mcp__server__tool({...})</code></li>
<li><strong>Custom Tools</strong>: <code>registerTool(name, desc, schema, handler)</code> / <code>unregisterTool(name)</code> / <code>listTools()</code> / <code>getTool(name)</code></li>
<li><strong>Utilities</strong>: <code>log</code>, <code>str</code>, <code>shQuote(s)</code>, <code>chdir(path)</code>, <code>REPO</code></li>
</ul>

<p><strong>특수 규칙 (직접 인용):</strong></p>
<ul>
<li>"Variables persist across REPL calls"</li>
<li>"No import/require/process/Node globals"</li>
<li><code>sh</code>/<code>cat</code>/<code>rg</code>는 실패 시 error text 반환 (throw 안 함)</li>
<li><code>rgf</code>/<code>gl</code>는 실패 시 <code>[]</code> 반환</li>
</ul>

<p><strong>참조 링크</strong>: <code>github.com/Piebald-AI/claude-code-system-prompts/releases/tag/v2.1.108</code>. Codex의 동일 기능은 <code>openai/codex/pull/10674</code> (2026-02 도입). 유사 선행은 <code>google/zx</code>.</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 Claude Code는 매 tool call마다 "call → 결과 반환 → 모델 재추론 → 다음 call" 왕복을 돌아 토큰·latency가 증가합니다. REPL tool은 <strong>JS 한 덩어리 안에서 여러 tool을 즉시 실행하고 결과를 변수로 재사용</strong>하게 해 이 왕복을 하나로 묶습니다. 특히 <code>haiku(prompt)</code>로 내부에서 가벼운 모델 sampling을 섞을 수 있어, <strong>Sonnet/Opus 세션 내부에 Haiku sub-sampling을 inline</strong>하는 구조가 표준화될 수 있습니다. 또 <code>await mcp__server__tool()</code> bridging으로 <strong>MCP 생태계가 REPL 코드 안에서 직접 호출 가능한 함수</strong>가 되는 점이 중요 — MCP를 "별도 tool" 취급에서 "programmable primitive"로 끌어올립니다. <code>registerTool</code>까지 있으면 모델이 자기 세션 내부에 동적으로 tool을 만들어 쓰는 실험이 가능. 주의: hidden flag로 숨어있고 native installation 한정 — npm 전역 버전 등에는 적용 안 될 수 있습니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>zx</strong>: 일반적으로 Google의 JavaScript + shell 스크립트 통합 도구. <code>await $\`cmd\`</code> 스타일로 async JS 안에서 bash-like 사용.</p>
<p><strong>tool call 왕복 비용</strong>: 일반적으로 매 tool call은 모델 응답·호출·결과 되돌림·재추론 4단계로 이어져, 하나의 논리 작업에 다수의 inference 라운드가 필요. batch 실행은 이 비용을 크게 줄임.</p>
<p><strong>Piebald-AI system prompts 레포</strong>: 일반적으로 Claude Code 각 버전 system prompt를 수집·공개하는 비공식 저장소. 릴리스 diff 비교에 자주 사용.</p>
<p><strong>원문</strong>: <a href="https://www.reddit.com/r/ClaudeAI/comments/1sm99pj/claude_code_v21108s_new_hidden_repl_tool_is_cool/" class="source-link">r/ClaudeAI 원 스레드</a></p>
</div>
