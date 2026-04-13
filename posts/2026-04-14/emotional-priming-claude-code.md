---
layout: default
title: "Emotional priming이 명시적 instruction보다 Claude 코드를 더 바꾼다 — 75 trials 실험"
---

<a href="../2026-04-14" class="back-link">&larr; 4월 14일 목록</a>

# Emotional Priming Experiment

<div class="meta-line"><span class="tag tag-reddit">Reddit</span> 06:41 KST</div>

> Sonnet 4.6에서 5개 코딩 task를 3가지 system prompt 조건 × 75 trials로 돌린 사용자 실험. 결론은 "감정적 priming이 명시적 instruction보다 Claude의 코드 스타일을 더 바꿨다".

<div class="context-block">
<h4>출처 핵심 (Reddit 글에서 확인되는 내용만)</h4>

<p><strong>실험 동기</strong>: 작성자가 "frustrating debugging session 후 Claude가 더 defensive한 코드를 쓰는 것 같다"는 체감을 검증하려 함.</p>

<p><strong>실험 설정 (직접 인용·정리):</strong></p>
<ul>
<li>Task: 5개의 ordinary coding tasks (parse cron, flatten object, rate limiter 등)</li>
<li>Model: Sonnet 4.6</li>
<li>Tool: <code>claude -p</code></li>
<li>System prompts: 3개 condition (구체 내용은 candidate text가 잘려 확인 불가)</li>
<li>Trials: 75 trials per condition</li>
</ul>

<p><strong>결론 (제목 요약)</strong>: "Emotional priming changes Claude's code more than explicit instruction does"</p>

<p><strong>참고</strong>: 정확한 priming 문구·결과 수치·비교 차트 등 세부는 candidate text가 잘려 이 기사 출처 범위에서 확인되지 않음.</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 프롬프트 엔지니어링 토론은 "명시적 룰을 잘 쓰자"에 집중되지만, 이 실험은 <strong>감정·맥락 어휘</strong>가 명시적 룰보다 더 큰 행동 변화를 유도한다는 가설을 작은 N으로 시도한 사례입니다. 결과가 사실이면 CLAUDE.md/system prompt 작성에서 어휘 톤 자체가 1차 설계 변수로 격상됩니다. 단 75 trials × 3 condition은 통계적으로 약하므로 결과를 일반화하기보다 "추가 검증해 볼 만한 가설" 정도로 받는 것이 안전합니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong><code>claude -p</code></strong>: 일반적으로 Claude Code CLI에서 비대화형으로 단발성 프롬프트를 실행하는 모드. 자동화 스크립트에서 자주 사용됩니다.</p>
<p><strong>원문</strong>: <a href="https://www.reddit.com/r/ClaudeAI/comments/1skmgef/emotional_priming_changes_claudes_code_more_than/" class="source-link">r/ClaudeAI 원 스레드</a></p>
</div>
