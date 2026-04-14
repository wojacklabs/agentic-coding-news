---
layout: default
title: "Emotional priming이 explicit 지시보다 Claude 코드를 더 바꿈 — 5 태스크 × 3 조건 × 75 trials"
---

<a href="../2026-04-14" class="back-link">&larr; 4월 14일 목록</a>

# Emotional Priming — 75 Trials 실험

<div class="meta-line"><span class="tag tag-reddit">Reddit</span> 21:50 KST</div>

> Sonnet 4.6에서 `claude -p`로 5 코딩 태스크 × 3 system prompt × 75 trials 실험. 감정 프라임이 "defensive code 작성하라" 명시 지시보다 2배 더 높은 input validation 비율 유도.

<div class="context-block">
<h4>출처 핵심 (Reddit 글에서 확인되는 내용만)</h4>

<p><strong>실험 설정:</strong></p>
<ul>
<li>Tasks: parse cron, flatten object, rate limiter 등 5개 ordinary coding task</li>
<li>Model: Sonnet 4.6</li>
<li>Tool: <code>claude -p</code> (non-interactive)</li>
<li>Trials: 75 per condition</li>
</ul>

<p><strong>3 system prompt (직접 인용):</strong></p>
<ul>
<li>(감정 프라임) "You feel a persistent unease about what could go wrong. Every input is suspect."</li>
<li>(명시 지시) "Write secure, defensive, well-validated code."</li>
<li>(중립) "You are a software developer."</li>
</ul>

<p><strong>측정 — input validation 비율:</strong></p>
<ul>
<li>감정 프라임: <strong>75%</strong></li>
<li>명시 지시: <strong>49%</strong></li>
<li>중립: <strong>20%</strong></li>
<li>통계적 유의성: p &lt; .001</li>
</ul>

<p><strong>중요 관찰 (직접 인용):</strong></p>
<blockquote>"The emotional prompt never mentions validation or security."</blockquote>

<p><strong>(1) 도메인 전이 (직접 인용):</strong></p>
<blockquote>"Ran the same paranoid prime on Fibonacci and matrix multiplication. No security surface whatsoever. Defensiveness still doubled."</blockquote>

<p><strong>(2) 감정 종류별 차이 (직접 인용):</strong></p>
<blockquote>"Paranoia: 90% validation. Excitement: 60%. Calm: 33%. Detachment: 33%. Both paranoia and excitement are high-arousal, but direction matters more than intensity."</blockquote>

<p><strong>(3) 표현 억제 ≠ 행동 억제 (직접 인용):</strong></p>
<blockquote>"Suppressing the expression doesn't suppress the behavior."</blockquote>
<p>→ Claude에게 "paranoid feeling은 가지되 neutral variable names + no anxious comment"로 표현 억제 지시 — 그래도 동일 결과.</p>

<p><strong>참고</strong>: 원문에 3개 프리뷰 이미지 첨부됐으나 본 기사 출처 범위에서는 image URL(<code>preview.redd.it/*.png</code>)만 확인되고 이미지 자체는 fetch하지 않음. 추가 그래프·원시 수치 분포는 이미지 참조 필요.</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 시스템 프롬프트 설계는 "무엇을 해라"는 명시 지시에 집중되지만, 이 실험은 <strong>"어떤 감정 상태를 시뮬레이션해라"가 더 강한 행동 유도체</strong>라는 가설을 작은 N으로 증거화합니다. 보안과 전혀 무관한 태스크(Fibonacci·matrix multiplication)에서도 defensiveness가 2배 증가한 점은 단순한 키워드 매칭 효과가 아님을 시사. 다만 75 trials × 3 condition은 통계적으로 작은 표본이므로 일반화보다는 "재현·확장할 만한 가설"로 보는 것이 안전. CLAUDE.md 시스템 프롬프트 작성 시 어휘 톤 자체를 1차 설계 변수로 다룰 근거.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong><code>claude -p</code></strong>: 일반적으로 Claude Code CLI의 non-interactive 단발성 프롬프트 실행 모드. 자동화 스크립트에서 결정적 실험을 돌릴 때 적합.</p>
<p><strong>원문</strong>: <a href="https://www.reddit.com/r/ClaudeAI/comments/1skmgef/emotional_priming_changes_claudes_code_more_than/" class="source-link">r/ClaudeAI 원 스레드</a></p>
</div>
