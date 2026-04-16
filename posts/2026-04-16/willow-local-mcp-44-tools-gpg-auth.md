---
layout: default
title: "willow-1.7 — Claude Code에 44개 tool 주는 local-first MCP 서버, Postgres knowledge graph + GPG 서명 ACL"
---

<a href="../2026-04-16" class="back-link">&larr; 4월 16일 목록</a>

# willow-1.7 — Local-first MCP + GPG SAFE

<div class="meta-line"><span class="tag tag-reddit">Reddit</span> 18:47 KST</div>

> 2년간 개발한 local-first MCP 서버. Claude Code가 세션 시작 시 stdio로 직접 파이프 연결, 44개 tool 노출. Persistent memory(Postgres atoms/entities/edges), SQLite 감사 추적, Ollama first + Groq/Cerebras/SambaNova fallback 추론 라우팅, Kart shell task queue, <strong>GPG-서명 manifest 기반 SAFE 권한 게이트</strong>. 17개 "AI professor" 에이전트를 각자 서명된 폴더로 운영 중. r/ClaudeAI posted 2026-04-16 16:29 KST.

<div class="context-block">
<h4>출처 핵심 (Reddit selftext에서 확인되는 내용만)</h4>

<p><strong>시작·프라이버시 (직접 인용):</strong></p>
<blockquote>"I built a local AI infrastructure layer that runs entirely on my machine. No cloud. No exposed ports. My data stays on my hardware."</blockquote>

<p><strong>연결 (직접 인용):</strong></p>
<blockquote>"willow-1.7 is a Model Context Protocol server. Claude Code connects to it at session start via stdio — no HTTP, no ports, no supervisor. A direct pipe."</blockquote>

<p><strong>44개 tool 카테고리 (selftext 그대로)</strong>:</p>
<ul>
<li><strong>Persistent memory</strong> — Postgres knowledge graph (atoms, entities, edges), 세션 간 생존</li>
<li><strong>Local storage</strong> — SQLite per collection, full audit trail + soft-delete</li>
<li><strong>Inference routing</strong> — "local Ollama first, then Groq / Cerebras / SambaNova as free-tier fallback if Ollama is down"</li>
<li><strong>Task queue</strong> — "Claude submits shell tasks to Kart, a worker that polls Postgres and executes them"</li>
<li><strong>SAFE authorization</strong> — GPG 서명 manifest 없으면 access denied</li>
<li><strong>Session handoffs</strong> — disk에 구조화된 handoff 문서를 쓰고 Postgres에 인덱싱</li>
</ul>

<p><strong>SAFE 권한 모델 (직접 인용):</strong></p>
<blockquote>"Each application that wants to access the knowledge graph has a folder on a separate partition (/media/willow/SAFE/Applications/&lt;app_id&gt;/)."</blockquote>
<p>폴더에는 <code>safe-app-manifest.json</code> + <code>safe-app-manifest.json.sig</code>가 있어야 하며, 매 접근마다 "folder exists → manifest present → signature present → gpg --verify passes" 4단계 검증. 하나라도 실패하면 deny + log.</p>

<blockquote>"No code changes to revoke access. Delete the folder, and that agent is done."</blockquote>

<p><strong>실 사용 스케일 (직접 인용):</strong></p>
<blockquote>"I've been running 17 AI professors through this gate for months. Each one has its own signed folder, its own permitted data streams, its own context. None of them can access data outside their declared scope."</blockquote>

<p><strong>로컬 추론 (직접 인용):</strong></p>
<blockquote>"Ollama runs the inference. Currently using qwen2.5:3b as the default. The system routes there first and falls back to free cloud APIs only if Ollama is unavailable."</blockquote>

<p><strong>후속 계획 (직접 인용):</strong></p>
<blockquote>"The longer plan: Yggdrasil. A small model trained on the operational patterns this system generates — session handoffs, ratified knowledge atoms, governance logs. When that model is trained, it replaces the cloud fleet entirely. The system becomes fully air-gappable."</blockquote>

<p><strong>부트스트랩 (직접 인용):</strong></p>
<blockquote>"There's a separate installer repo, willow-seed, that handles the full setup from scratch — clones the repo, creates the Postgres database, scaffolds the first SAFE agent entry, writes the MCP config. Stdlib only, no dependencies."</blockquote>

<p><strong>링크</strong>:</p>
<ul>
<li><code>github.com/rudi193-cmd/willow-1.7</code></li>
<li><code>github.com/rudi193-cmd/willow-seed</code></li>
<li><code>github.com/rudi193-cmd/SAFE</code> — 권한 사양</li>
</ul>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 Claude Code의 "persistent memory"를 구현한 MCP 서버는 여럿 있지만(어제 소개된 YantrikDB 등), willow의 차별점은 <strong>"SAFE" GPG 서명 manifest ACL</strong> 레이어입니다 — <code>plugins/</code> 생태계가 커지며 prompt injection·tool abuse 공격면이 늘어나는 상황에서 <strong>"filesystem이 ACL이다, 폴더를 지우면 권한이 사라진다"</strong>는 모델은 관리 비용을 크게 줄입니다. 17 AI professor 에이전트가 각자 서명된 폴더에서 scope 제약 하에 운영된다는 운영 실적은 <strong>"다중 에이전트 격리"를 OS의 filesystem + GPG로 해결</strong>하는 실험적 접근. <code>stdio</code> 직접 파이프 연결로 HTTP·ports 없이 동작하는 것도 공격면 축소에 유리. Inference routing의 "Ollama first, free cloud fallback"은 이번 주 Anthropic outage에서 드러난 "cloud dependency" 위험에 대한 또 다른 답변. 다만 개인 프로젝트로 완성도·유지관리는 검증 필요.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>MCP stdio transport</strong>: 일반적으로 MCP의 가장 기본 연결 모드로, 클라이언트가 프로세스를 자식으로 spawn하고 stdin/stdout을 message channel로 사용. HTTP/SSE보다 설정 간단하고 외부 네트워크 노출 없음.</p>
<p><strong>GPG detached signature</strong>: 일반적으로 파일과 분리된 별도 <code>.sig</code> 파일로 서명을 보관하는 방식. 파일 무결성·발신자 검증에 쓰임.</p>
<p><strong>SAFE spec</strong>: 이 프로젝트 고유 권한 사양으로, 범용 표준은 아님.</p>
<p><strong>Ollama + qwen2.5:3b</strong>: 일반적으로 Ollama는 로컬 LLM 서빙 도구, qwen2.5:3b는 Alibaba의 3B parameter 경량 모델.</p>
<p><strong>원문</strong>: <a href="https://www.reddit.com/r/ClaudeAI/comments/1smwjfg/i_built_a_localfirst_mcp_server_that_gives_claude/" class="source-link">r/ClaudeAI 원 스레드</a></p>
</div>
