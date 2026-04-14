---
layout: default
title: "Cache TTL follow-up — 4월 2일 06:23~06:55 UTC 1h→5m 크로스오버, 1,140 세션 분석"
---

<a href="../2026-04-15" class="back-link">&larr; 4월 15일 목록</a>

# Cache TTL April 2 Follow-up — 1,140 세션

<div class="meta-line"><span class="tag tag-reddit">Reddit</span> 00:50 KST</div>

> 이전 "Anthropic isn't the only reason you're hitting..." 토론의 후속. 1,140 세션 분석으로 2026-04-02 06:23~06:55 UTC에 <code>ephemeral_1h</code> → <code>ephemeral_5m</code> 완전 전환 시점 포착. 월 $277.80 추가 비용 프로젝션. r/ClaudeAI score 24.

<div class="context-block">
<h4>출처 핵심 (Reddit 글에서 확인되는 내용만)</h4>

<p><strong>문제 정리 (직접 인용):</strong></p>
<blockquote>"every turn in Claude Code logs which cache tier it used: <code>ephemeral_1h_input_tokens</code> or <code>ephemeral_5m_input_tokens</code>. only one is non-zero on any given turn. i queried my conversations.db across 1,140 sessions and plotted the distribution by date."</blockquote>

<p><strong>크로스오버 시점 (직접 인용):</strong></p>
<blockquote>"the crossover is clear. march 1 through april 1: 100% of turns used <code>ephemeral_1h</code>. april 2: mixed day (491 turns on 5m, 644 turns on 1h). april 3 onwards: 100% <code>ephemeral_5m</code>. the switch happened between 06:23 and 06:55 UTC on april 2. no announcement or changelog."</blockquote>

<p><strong>세션 수치 변화 (직접 인용):</strong></p>
<ul>
<li>전환 전: 하루 39 cache busts, $6.28/day in bust-triggered costs</li>
<li>전환 후: 하루 199 cache busts (5.1x 증가), $15.54/day</li>
</ul>

<p><strong>비용 기제 해석 (직접 인용):</strong></p>
<blockquote>"the cost multiplier is lower than the frequency multiplier because 1h-tier cache writes cost more per token, so per-bust cost went down slightly while frequency went up enough to overwhelm that. projected monthly delta from this one change: $277.80."</blockquote>

<p><strong>이전 토론 컨텍스트</strong>: 작성자는 "last week's token insights post ... some said the 5-minute cache TTL i described was wrong. max plan gets 1 hour, not 5 minutes. i checked the JSONLs. the problem is that we're both right." — Max plan 사용자들도 4/2 이후에는 5m로 밀림.</p>

<p><strong>첨부 이미지</strong>: <code>preview.redd.it/*.png</code> (이 기사 출처 범위에서는 이미지 내용 미검증).</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 GitHub issue #46829(3월 6일 변경, 119,866 API calls 분석, Anthropic "의도된 최적화" 답변)와 이번 글(4월 2일 변경, 1,140 세션)의 날짜가 다른 점이 흥미롭습니다. 두 분석이 서로 다른 사용자·계정·환경을 가리키므로, <strong>Anthropic의 TTL 정책 변경이 단발성이 아니라 다단계로 이뤄졌을 가능성</strong>을 시사합니다. 사용자가 <code>conversations.db</code>의 <code>ephemeral_*_input_tokens</code>로 직접 검증 가능하다는 재현 방법도 실무적으로 가치 있습니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>cache bust</strong>: 일반적으로 prompt cache에 저장된 컨텍스트가 TTL 만료·변경으로 무효화되어 새로 cache write가 필요한 상황. TTL이 짧을수록 bust 빈도가 증가해 누적 비용이 올라갑니다.</p>
<p><strong>원문</strong>: <a href="https://www.reddit.com/r/ClaudeAI/comments/1sk3m12/followup_anthropic_quietly_switched_the_default/" class="source-link">r/ClaudeAI 원 스레드</a></p>
</div>
