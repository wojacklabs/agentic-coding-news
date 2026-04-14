---
layout: default
title: "Claude Code 2.1.104 — 프롬프트 2번에 usage 49% 소진 (Pro·Max·Max20x 동시 보고, issue #47587)"
---

<a href="../2026-04-15" class="back-link">&larr; 4월 15일 목록</a>

# 프롬프트 2번 → usage 49% (Issue #47587)

<div class="meta-line"><span class="tag tag-hn">HN</span> 00:50 KST</div>

> Pro 사용자가 "Sonnet 1번 + Opus 1번, 총 2 프롬프트에 usage 49% 소진" 보고. Max·Max20x 사용자도 동시 확인. GitHub issue #45756과 연관 가능성. HN score 3, 04-14 posted.

<div class="context-block">
<h4>출처 핵심 (GitHub Issue #47587에서 확인되는 내용만)</h4>

<p><strong>메타:</strong></p>
<ul>
<li>Title: "[BUG] Usage limits gone crazy"</li>
<li>Reporter: <strong>hk-2029</strong></li>
<li>Status: Open</li>
<li>Created: 2026-04-13</li>
<li>Version: Claude Code 2.1.104</li>
</ul>

<p><strong>주요 주장 (직접 인용):</strong></p>
<blockquote>"I gave just 2 prompts, one to sonnet and another one to opus on claude code, and I reached 49% of my usage limit. This is not right."</blockquote>

<p><strong>경과 정리:</strong></p>
<ul>
<li>초기 경험: 하루 일찍 100% usage 도달</li>
<li>reset 이후: <strong>Sonnet 1 + Opus 1 = 2 prompts → 49%</strong></li>
<li>이전 버전에서는 정상 작동했다고 명시 (regression: Yes)</li>
</ul>

<p><strong>환경:</strong></p>
<ul>
<li>Platform: Anthropic API</li>
<li>OS: macOS</li>
<li>Terminal: Terminal.app</li>
</ul>

<p><strong>커뮤니티 확인 (댓글, 직접 인용):</strong></p>
<ul>
<li>niyaskc007: "Yes, Even I have the same issue"</li>
<li>doughawkinsnz: "Max 20x subscriber here. Same issue"</li>
<li>Script0r1x: "Same problem here"</li>
<li>ilanoh: "destroyed a 200$ plan weekly limits in a 3hrs pushy usage session"</li>
</ul>

<p><strong>관련 이슈 (댓글에서):</strong></p>
<p>Anthony Mineo가 issue #45756 링크 — "A severe prompt caching bug causing usage windows to spike across the board". Claude Code 팀의 Boris가 #45756에서 관련 caching 이슈에 답변했다고 언급.</p>

<p><strong>Anthropic 공식 응답</strong>: 이슈 #47587 본문에서는 <strong>Anthropic 팀의 공개 응답 없음</strong>. 8개 댓글 중 acknowledgment 미확인.</p>

<p><strong>재현 단계</strong>: 이슈에는 "na"로 표시 — 구체 재현 절차 미제공.</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 "프롬프트 1-2번에 50% 소진"은 <strong>prompt cache write 비용이 비정상 누적</strong>되는 경우 설명 가능합니다. 관련 이슈 #45756이 "caching bug causing usage windows to spike"로 명시된 점이 동일 방향. 오늘 커버한 다른 보고들(cache TTL 4월 2일 변경, v2.1.100+ 20K invisible tokens)과 같은 원인 가족으로 묶일 가능성이 높으며, Pro·Max·Max20x 모두 영향을 받는다는 점에서 <strong>플랜 별 아니라 전 계정 대상 이슈</strong>로 해석됩니다. 대응으로는 <code>--print</code> 모드 또는 프록시로 실제 billed tokens 직접 측정이 권장됩니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>Claude Code usage 표시 방식</strong>: 일반적으로 <code>/stats</code> 슬래시 명령으로 현재 세션 총량 확인 가능, 단 per-tool/agent breakdown은 없음(claude-token-lens 같은 외부 CLI가 보완). 49% 단일 수치만으로는 원인을 좁히기 어려워 JSONL 세션 로그 직접 분석이 병행되어야 안전.</p>
<p><strong>원문</strong>: <a href="https://github.com/anthropics/claude-code/issues/47587" class="source-link">github.com/anthropics/claude-code/issues/47587</a></p>
<p><strong>HN discussion</strong>: <a href="https://news.ycombinator.com/item?id=47765401" class="source-link">news.ycombinator.com/item?id=47765401</a></p>
</div>
