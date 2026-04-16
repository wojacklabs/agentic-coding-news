---
layout: default
title: "Anthropic 공식 — Claude Code 세션 관리 & 1M context: /usage 신설, /rewind·/compact·/clear 사용 기준"
---

<a href="../2026-04-16" class="back-link">&larr; 4월 16일 목록</a>

# Anthropic 공식 — Session & 1M Context 가이드

<div class="meta-line"><span class="tag tag-hn">HN</span> 21:47 KST</div>

> Anthropic Thariq Shihipar(technical staff)가 claude.com/blog에 올린 공식 가이드. 신규 <code>/usage</code> 슬래시 커맨드 릴리스 + 세션 수명·<code>/rewind</code>·<code>/compact</code>·<code>/clear</code>·subagent 사용 기준을 공식 정리. 이번 주 Boris Cherny의 #45756 답변과 연속선상. posted 2026-04-15, HN score 6 (47791027).

<div class="context-block">
<h4>출처 핵심 (claude.com/blog 공식 글에서 확인되는 내용만)</h4>

<p><strong>작성자</strong>: Thariq Shihipar, Anthropic technical staff. posted 2026-04-15.</p>

<p><strong>신규 커맨드 출시 (직접 인용):</strong></p>
<blockquote>"We released /usage, a new slash command to help you understand your usage with Claude Code."</blockquote>

<p><strong>핵심 원칙 — 새 task는 새 session (직접 인용):</strong></p>
<blockquote>"When you start a new task, you should also start a new session."</blockquote>

<p><strong>rewind 사용 (직접 인용):</strong></p>
<blockquote>"the better move may be to rewind to just after the file reads, and re-prompt with what you learned"</blockquote>
<p>단축키: double-tap Esc 또는 <code>/rewind</code> — 이후 메시지는 context에서 drop.</p>

<p><strong>/compact vs /clear 구분 (블로그 기반 요약):</strong></p>
<ul>
<li><code>/compact</code>: 자동으로 대화 히스토리 요약, hint 가능 — 예: <code>/compact focus on auth refactor</code></li>
<li><code>/clear</code>: 수동으로 무엇을 가져갈지 사용자가 직접 기록 → 전적인 통제</li>
</ul>

<p><strong>Subagent 사용 기준 (직접 인용):</strong></p>
<blockquote>"when you know in advance that a chunk of work will produce a lot of intermediate output you won't need again"</blockquote>
<p>판단 테스트 (직접 인용):</p>
<blockquote>"Will I need this tool output again, or just the conclusion?"</blockquote>

<p><strong>1M context의 의의 (블로그 기반 요약):</strong></p>
<p>"longer tasks more reliably, for example building a full-stack app from scratch" 가능. context 커지면 "slight impact on performance" (context rot)이 있어 proactive compacting과 함께 써야 한다는 권고.</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 이번 주 Claude Code 커뮤니티의 큰 주제가 <strong>"1M context + skills 과다 + cache miss로 quota가 빨리 탄다"</strong>였는데, 이 글은 <strong>Anthropic의 공식 1차 대응</strong>입니다. 특히 <code>/usage</code> 신설은 Boris Cherny가 issue #45756에서 "/feedback으로 debug"를 요청한 것보다 한 단계 위의 self-service 도구 — 사용자가 자기 세션 사용을 스스로 분해 가능. Subagent 판단 기준 <strong>"중간 출력이 결론만 남으면 되는지"</strong>는 이번 주 소개된 evo 플러그인·willow-1.7의 parallel agent 설계와 정확히 맞물리고, PSA 30K ghost tokens audit이 지적한 "170 agents 중 10개 사용"의 해결 방향(주요 작업은 subagent로 분리)을 공식 확인. <code>/rewind</code>를 "correction 대신" 쓰라는 조언은 기존 사용 패턴과 다른 방향이라 실무에 정착하려면 시간이 필요해 보입니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>context rot</strong>: 일반적으로 context가 커질수록 오래된 무관 내용이 현재 작업을 방해해 모델 성능이 떨어지는 현상. 공식 블로그가 이 용어를 사용해 인정한 점이 주목할 만함.</p>
<p><strong>/rewind</strong>: 일반적으로 이전 메시지로 점프해 이후 대화를 버리는 슬래시 커맨드. double-Esc가 동일 작동.</p>
<p><strong>Thariq Shihipar</strong>: 일반적으로 Claude Code 팀의 공식 커뮤니케이션을 담당하는 Anthropic 기술 스태프.</p>
<p><strong>원문</strong>: <a href="https://claude.com/blog/using-claude-code-session-management-and-1m-context" class="source-link">claude.com/blog/using-claude-code-session-management-and-1m-context</a></p>
<p><strong>HN discussion</strong>: <a href="https://news.ycombinator.com/item?id=47791027" class="source-link">news.ycombinator.com/item?id=47791027</a></p>
</div>
