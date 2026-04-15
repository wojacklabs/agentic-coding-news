---
layout: default
title: "Claude Code 2.1.108 릴리스 — /recap, ENABLE_PROMPT_CACHING_1H, Skill 자동 감지, /undo alias"
---

<a href="../2026-04-15" class="back-link">&larr; 4월 15일 목록</a>

# Claude Code 2.1.108 — 주요 기능

<div class="meta-line"><span class="tag tag-x">X</span> 09:51 KST</div>

> @hir08ma X 트윗이 2.1.108 (2026-04-14) 주요 기능 4가지를 요약. 공식 changelog(<code>code.claude.com/docs/en/changelog</code>)에서 상세 내용 verbatim 확인.

<div class="context-block">
<h4>출처 핵심 (Anthropic 공식 changelog 2.1.108에서 확인되는 내용만)</h4>

<p><strong>릴리스 날짜</strong>: 2026-04-14</p>

<p><strong>Prompt Caching Control (직접 인용):</strong></p>
<blockquote>"Added <code>ENABLE_PROMPT_CACHING_1H</code> env var to opt into 1-hour prompt cache TTL on API key, Bedrock, Vertex, and Foundry (<code>ENABLE_PROMPT_CACHING_1H_BEDROCK</code> is deprecated but still honored), and <code>FORCE_PROMPT_CACHING_5M</code> to force 5-minute TTL"</blockquote>

<p><strong>/recap Feature (직접 인용):</strong></p>
<blockquote>"Added recap feature to provide context when returning to a session, configurable in /config and manually invocable with /recap; force with <code>CLAUDE_CODE_ENABLE_AWAY_SUMMARY</code> if telemetry disabled"</blockquote>

<p><strong>Skill Tool Auto-Discovery (직접 인용):</strong></p>
<blockquote>"The model can now discover and invoke built-in slash commands like <code>/init</code>, <code>/review</code>, and <code>/security-review</code> via the Skill tool"</blockquote>

<p><strong>/undo Alias (직접 인용):</strong></p>
<blockquote>"<code>/undo</code> is now an alias for <code>/rewind</code>"</blockquote>

<p><strong>모델 스위칭 경고 (직접 인용):</strong></p>
<blockquote>"Improved <code>/model</code> to warn before switching models mid-conversation, since the next response re-reads the full history uncached"</blockquote>

<p><strong>Resume Picker 개선:</strong></p>
<blockquote>"Improved <code>/resume</code> picker to default to sessions from the current directory; press <code>Ctrl+A</code> to show all projects"</blockquote>

<p><strong>에러 메시지 개선:</strong></p>
<ul>
<li>Server rate limits를 plan usage limits와 구분 표시</li>
<li>5xx/529 에러에 <code>status.claude.com</code> 링크 표시</li>
<li>unknown slash command 시 가장 가까운 명령 제안</li>
</ul>

<p><strong>성능:</strong></p>
<blockquote>"Reduced memory footprint for file reads, edits, and syntax highlighting by loading language grammars on demand"</blockquote>

<p><strong>UI 개선:</strong></p>
<ul>
<li>Ctrl+O로 detailed transcript 볼 때 "verbose" 지시자 추가</li>
<li>startup 시 <code>DISABLE_PROMPT_CACHING*</code> 환경 변수로 prompt caching이 disabled이면 경고</li>
</ul>

<p><strong>주요 버그 수정:</strong></p>
<blockquote>"Multiple bug fixes including paste in <code>/login</code> code prompt, subscribers with <code>DISABLE_TELEMETRY</code> using correct cache TTL, Agent tool permissions, Bash tool output, session renaming, terminal escape codes, and diacritical marks handling."</blockquote>

<p><strong>X 트윗 원문 (hir08ma, verbatim):</strong></p>
<blockquote>"Claude Code 2.1.108. New Features: /recap — Summarizes context when rejoining a session after stepping away. ENABLE_PROMPT_CACHING_1H enables 1-hour cache TTL. Skill tool automatically detects and executes built-in commands like /init, /review, etc. /undo becomes an alias"</blockquote>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>이번 릴리스는 지난 주 커뮤니티가 제기한 <strong>세 가지 실제 운영 이슈에 대한 공식 대응</strong>이 눈에 띕니다:</p>
<ul>
<li><code>DISABLE_TELEMETRY</code>로 인한 5m TTL 강제 문제(issue #45381) → "<em>subscribers with DISABLE_TELEMETRY using correct cache TTL</em>" 수정</li>
<li>2.1.107 OAuth 'Paste code here' 문제 → "<em>paste in /login code prompt</em>" 수정</li>
<li>Cache TTL 제어 옵션 부재 → <code>ENABLE_PROMPT_CACHING_1H</code>/<code>FORCE_PROMPT_CACHING_5M</code> 명시적 제어 추가</li>
</ul>
<p>또 <strong>Skill tool이 빌트인 슬래시 명령 자동 호출</strong>이라는 변경은 Skills의 역할 확장을 시사합니다 — 기존 사용자 정의 Skill만 아니라 <code>/init</code>·<code>/review</code>·<code>/security-review</code> 같은 표준 워크플로우도 Skill 메커니즘 안으로 묶이는 방향.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>/rewind</strong>: 일반적으로 Claude Code의 세션 되돌리기 명령. 2.1.108부터 <code>/undo</code>라는 더 직관적인 이름으로 alias 제공.</p>
<p><strong>Cache TTL 제어 변수 정리</strong>:</p>
<ul>
<li><code>ENABLE_PROMPT_CACHING_1H</code>: 1h TTL opt-in (API key/Bedrock/Vertex/Foundry)</li>
<li><code>ENABLE_PROMPT_CACHING_1H_BEDROCK</code>: deprecated이나 여전히 honor됨</li>
<li><code>FORCE_PROMPT_CACHING_5M</code>: 5m TTL 강제</li>
<li><code>DISABLE_PROMPT_CACHING*</code>: 전체 prompt caching 비활성</li>
</ul>
<p><strong>원문 X 트윗</strong>: <a href="https://x.com/hir08ma/status/2044215694162833780" class="source-link">x.com/hir08ma/status/2044215694162833780</a></p>
<p><strong>공식 changelog</strong>: <a href="https://code.claude.com/docs/en/changelog" class="source-link">code.claude.com/docs/en/changelog</a> (v2.1.108 섹션)</p>
</div>
