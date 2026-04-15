---
layout: default
title: "CodeBurn — Claude Code 세션 transcript를 읽어 task 유형별 토큰 사용 분류, LLM 호출 없이 결정적"
---

<a href="../2026-04-16" class="back-link">&larr; 4월 16일 목록</a>

# CodeBurn — Claude Code 토큰 가시화 TUI

<div class="meta-line"><span class="tag tag-reddit">Reddit</span> 03:47 KST</div>

> $200+/day 쓰던 Claude Code 사용자가 "어떤 활동이 토큰을 먹는지" 알고 싶어 만든 TUI. <code>~/.claude/projects/</code>의 세션 transcript을 직접 읽어 매 턴을 tool 사용 패턴으로 13 카테고리 분류 — LLM 호출 없이 결정적. 공개 1회에 <strong>"대화 응답(no tool use) 56%, 실제 edit/write 21%"</strong> 관찰. r/ClaudeAI score 836, 87 comments, posted 2026-04-14.

<div class="context-block">
<h4>출처 핵심 (Reddit selftext에서 확인되는 내용만)</h4>

<p><strong>문제의식 (직접 인용):</strong></p>
<blockquote>"been spending $200+/day on claude code and had zero visibility into what was eating the tokens. ccusage shows cost per model per day which is great but i wanted to know - is it the debugging thats expensive? the brainstorming? which project is burning the most?"</blockquote>

<p><strong>동작 원리 (직접 인용):</strong></p>
<blockquote>"it reads the session transcripts claude code already stores on disk (~/.claude/projects/) and classifies every turn into 13 categories based on tool usage patterns. no llm calls for the classification, fully deterministic."</blockquote>

<p><strong>표시 항목 (직접 인용):</strong></p>
<ul>
<li>"cost by task type (coding, debugging, exploration, brainstorming, etc)"</li>
<li>"cost by project, model, tool, and mcp server"</li>
<li>"daily activity chart with gradient bars"</li>
<li>"interactive - arrow keys to switch between today/week/month"</li>
<li>"swiftbar menu bar widget if you are on mac"</li>
</ul>

<p><strong>작성자 자신의 분석 결과 (직접 인용):</strong></p>
<blockquote>"turns out 56% of my spend is 'conversation' - turns where claude is just responding with no tool use. the actual coding (edits, writes) is only 21%. that was eye opening."</blockquote>

<p><strong>사용법 (직접 인용):</strong></p>
<blockquote>"npx codeburn if you want to try it. works with any claude code installation, no config needed."</blockquote>

<p><strong>GitHub</strong>: <code>github.com/AgentSeal/codeburn</code></p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 Claude Code 사용자는 <code>ccusage</code>로 일별 모델별 비용은 보지만 "어떤 종류의 턴이 비싼가"는 깜깜이입니다. CodeBurn이 <strong>"대화 응답(tool 없는 턴)이 전체 56%, 실제 코드 편집은 21%"</strong>라는 수치를 낸 건 실무자의 직관과 어긋날 수 있는 중요 관찰 — <strong>"AI가 코드 안 쓰고 얘기만 해도 그 자체로 많은 토큰을 태운다"</strong>는 의미. 이번 주 이 뉴스에서 다룬 다른 보고들(v2.1.100+ invisible tokens, cache TTL 5m, thinking block summarizer 가설)과 겹쳐보면, <strong>사용자가 직접 자기 세션을 분해해 원인을 짚는 워크플로</strong>가 "비용 급증 때 첫 번째로 돌릴 도구"로 자리잡을 수 있습니다. LLM 없이 결정적이라 실행이 싸고, session transcript는 Claude Code가 이미 디스크에 남기는 정식 산출물이라 별도 계측이 불필요한 점도 강점.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>~/.claude/projects/ session transcript</strong>: 일반적으로 Claude Code가 각 세션을 JSONL로 저장하는 디렉토리. <code>/compact</code>·<code>/resume</code>·후속 분석의 근거 자료.</p>
<p><strong>ccusage</strong>: 일반적으로 널리 쓰이는 Claude Code 비용 집계 CLI. 모델별/일별 집계 중심.</p>
<p><strong>swiftbar</strong>: 일반적으로 macOS 메뉴바에 커스텀 스크립트 출력을 띄우는 도구.</p>
<p><strong>원문</strong>: <a href="https://www.reddit.com/r/ClaudeAI/comments/1skqub5/tui_to_see_where_claude_code_tokens_actually_go/" class="source-link">r/ClaudeAI 원 스레드</a></p>
</div>
