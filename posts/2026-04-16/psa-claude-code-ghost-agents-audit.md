---
layout: default
title: "PSA — Claude Code setup 감사 결과 30,000 토큰(15%)이 유령 agents·skills·MCP로 소진, 타이핑 전에 사라짐"
---

<a href="../2026-04-16" class="back-link">&larr; 4월 16일 목록</a>

# Claude Code Ghost Agents — 30K Tokens 소실

<div class="meta-line"><span class="tag tag-reddit">Reddit</span> 09:47 KST</div>

> 평소보다 빨리 쿼터가 타는 걸 느낀 사용자가 자기 Claude Code setup을 감사 — 정의해두고 안 쓰는 agents ~170개 중 주당 사용은 ~10개, 한 번 설치 후 호출 안 한 skills, 7일째 미호출 MCP 서버들이 매 세션 context로 당겨지고 있었다. 총 ~30,000 tokens, Sonnet context window의 15%가 "타이핑 전" 사라짐. r/ClaudeAI posted 2026-04-15 22:30 KST.

<div class="context-block">
<h4>출처 핵심 (Reddit selftext에서 확인되는 내용만)</h4>

<p><strong>동기 (직접 인용):</strong></p>
<blockquote>"I was burning through Claude Code usage way faster than expected. So I audited what my setup was actually loading before I typed anything."</blockquote>

<p><strong>발견 (직접 인용):</strong></p>
<blockquote>"Every agent, skill, MCP server, and memory file I've added was getting pulled into context every single session. Including the ones I'd installed once, tested for a day, and forgotten about."</blockquote>

<p><strong>구체 수치 (직접 인용):</strong></p>
<blockquote>"Agents I'd defined and forgotten, ~170 of them, maybe 10 used in the last week. Skills I installed once and never invoked. MCP servers connected but not called in 7 days."</blockquote>
<blockquote>"Ghosts, all of it."</blockquote>
<blockquote>"~30,000 tokens. About 15% of Sonnet's context window. Gone before I wrote a single character."</blockquote>

<p><strong>tracking의 맹점 (직접 인용):</strong></p>
<blockquote>"The frustrating part is that none of it shows up in normal usage tracking. ccusage will tell you what you spent, but not that 15% of every session was gone before you typed anything."</blockquote>

<p><strong>조치 (직접 인용):</strong></p>
<blockquote>"Once I saw the breakdown, the cleanup took five minutes: archive the agents I wasn't using, disable the MCP servers that hadn't been called."</blockquote>

<p><strong>권유 (직접 인용):</strong></p>
<blockquote>"Some of you will have less. Some of you will have more and not realize it. The only way to know is to actually look."</blockquote>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 "skills·plugins·MCP 서버가 많을수록 에이전트가 강력해진다"는 직관이 있지만, 이번 글은 Boris Cherny의 issue #45756 공식 답변("People pulling in a large number of skills, or running many agents or background automations... surprise token usage")을 <strong>"170개 중 10개만 사용, 30K 토큰 매 세션 손실"</strong>이라는 구체 수치로 검증한 사례입니다. 핵심은 <strong>ccusage/일반 비용 집계 도구가 "타이핑 전 고정 오버헤드"를 안 보여준다는 맹점</strong> — 토큰이 실제 턴에 집계되지 않고 system/skills/memory 로딩에 묻히기 때문입니다. 같은 주 CodeBurn TUI가 "대화 응답 56% vs 코드 편집 21%"를 보인 것과 맞물려, <strong>"Claude Code 비용의 진짜 출처는 세션별 가변 비용보다 고정 context 인플레이션일 수 있다"</strong>는 가설이 강해집니다. 실무 권장은 (a) installed agents/skills/MCP를 주기적 purge, (b) 프로젝트별 MCP 서버만 활성화, (c) <code>~/.claude/</code> 구조 직접 점검.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>agents/skills/memory files의 context 주입</strong>: 일반적으로 Claude Code는 세션 시작 시 CLAUDE.md·서브에이전트 정의·skills 등을 system prompt에 미리 주입. "타이핑 전 로딩"은 이 단계의 총합.</p>
<p><strong>ccusage</strong>: 일반적으로 일별/모델별 Claude Code 비용 집계 CLI. 턴 외 고정 오버헤드 분리 표시 기능은 공식 제공되지 않음.</p>
<p><strong>원문</strong>: <a href="https://www.reddit.com/r/ClaudeAI/comments/1sm66h8/psa_audited_my_claude_code_setup_30000_tokens_15/" class="source-link">r/ClaudeAI 원 스레드</a></p>
</div>
