---
layout: default
title: "ingero — MCP-native observability, CUDA API uprobes를 SQLite에 저장해 Claude가 조회"
---

<a href="../2026-04-16" class="back-link">&larr; 4월 16일 목록</a>

# ingero — MCP as Kernel Observability Interface

<div class="meta-line"><span class="tag tag-hn">HN</span> 00:47 KST</div>

> Datadog식 기존 플랫폼 래퍼가 아니라 <strong>MCP-native observability</strong>로 raw kernel events·CUDA call stack을 직접 뽑고, <code>claude --mcp-config</code>로 연결해 investigations.db를 Claude Desktop/Ollama가 조회. ingero.io 블로그, posted 2026-04-14, HN score 31 (47778617).

<div class="context-block">
<h4>출처 핵심 (ingero.io 블로그 + HN 47778617에서 확인되는 내용만)</h4>

<p><strong>핵심 주장 (직접 인용):</strong></p>
<blockquote>"MCP is becoming the interface between AI agents and infrastructure data"</blockquote>

<p><strong>두 접근 대비 (블로그 기반 요약)</strong>: 기존 플랫폼(Datadog)을 MCP로 래핑하는 방식 vs. <strong>MCP-native observability</strong>로 전통 metric pipeline을 우회하는 방식.</p>

<p><strong>네이티브 접근의 데이터 (직접 인용):</strong></p>
<blockquote>"raw kernel events, CUDA call stacks, and causal chains"</blockquote>

<p><strong>tracer 구현 (직접 인용):</strong></p>
<blockquote>"traces CUDA Runtime and Driver APIs via uprobes, stores the results in SQLite"</blockquote>

<p><strong>설치·실행 명령 (블로그):</strong></p>
<pre><code>git clone https://github.com/ingero-io/ingero.git
cd ingero && make build
./bin/ingero mcp --db investigations/pytorch-dataloader-starvation.db</code></pre>

<p><strong>MCP 클라이언트 연결</strong>:</p>
<ul>
<li>Claude (<code>claude --mcp-config</code>) — <code>/tmp/ingero-mcp-dataloader.json</code>에 command 기반 서버 정의</li>
<li>Ollama (예: qwen3.5:27b, <code>pip install ollmcp</code>)</li>
<li>Claude Desktop</li>
</ul>

<p><strong>HN 커뮤니티 반응 (직접 인용):</strong></p>
<blockquote>"Most of MCP servers and Apps are way under-designed today. A lot of MCP B2B servers still wrap legacy APIs, and most MCP Apps try to reproduce a website experience instead of trying to reinvent the experience from scratch." — Eldodi</blockquote>
<blockquote>"Every week these model providers are coming out with new toys. I don't fault orgs for minimally investing in MCP when the space is moving so fast and there's no telling whether or not MCP is here to stay." — hrimfaxi</blockquote>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 AI 에이전트가 infra 문제를 조사할 때 Datadog·Grafana MCP 서버가 전처리된 metric·log를 반환하지만, ingero의 <strong>"raw kernel event + CUDA call stack 그대로"</strong> 접근은 LLM의 추론력을 실제 저수준 관찰 데이터에 직접 맞닿게 하는 실험입니다. 특히 PyTorch dataloader starvation 같은 워크로드별 근본 원인 조사에서, 애그리게이트된 metric으로는 놓치는 pattern을 호출 스택 수준에서 짚어낼 수 있다는 가설. 다만 HN Eldodi의 지적처럼 <strong>MCP 생태계는 여전히 legacy API 래퍼가 많아</strong>, ingero 같은 "clean-sheet" 디자인이 실사용에 얼마나 정착할지는 관찰 필요.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>uprobes</strong>: 일반적으로 Linux 커널의 유저 공간 함수 경계 trace 메커니즘. CUDA Runtime/Driver API 호출을 커널 수준에서 캡처 가능.</p>
<p><strong>MCP (Model Context Protocol)</strong>: 일반적으로 Anthropic이 시작한 AI 에이전트-도구/데이터 소스 연결 표준. Claude Code·Claude Desktop·Cursor 등이 클라이언트로 채택.</p>
<p><strong>원문</strong>: <a href="https://ingero.io/mcp-observability-interface-ai-agents-kernel-tracepoints/" class="source-link">ingero.io/mcp-observability-interface-ai-agents-kernel-tracepoints</a></p>
<p><strong>HN discussion</strong>: <a href="https://news.ycombinator.com/item?id=47778617" class="source-link">news.ycombinator.com/item?id=47778617</a></p>
</div>
