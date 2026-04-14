---
layout: default
title: "'매주 바뀌는 밑판 위에 쌓는 개발' — Claude 7개월 사용자의 AI 툴링 churn 기록"
---

<a href="../2026-04-14" class="back-link">&larr; 4월 14일 목록</a>

# AI 툴링 Churn — 3개월 14회 재조정

<div class="meta-line"><span class="tag tag-reddit">Reddit</span> 21:50 KST</div>

> Claude Pro·Max를 7개월간 쓴 개발자가 "매주 스택이 바뀐다"는 패턴을 문제 제기. 3개월간 의도치 않게 14번 재조정. Anthropic 단독 이슈 아닌 업계 전반 지적. r/ClaudeAI score 23.

<div class="context-block">
<h4>출처 핵심 (Reddit 글에서 확인되는 내용만)</h4>

<p><strong>작성자 배경</strong>: Claude Pro → Max 전환, 7개월 사용. 클라이언트용 small tools/automation 제작 중심.</p>

<p><strong>핵심 주장 (직접 인용):</strong></p>
<blockquote>"Every week, something changes. A model gets updated and suddenly the same prompt that worked reliably for two months produces different output. An API response structure shifts slightly. A feature gets deprecated or replaced. The context window behavior changes in ways that aren't documented. And none of this is unique to Anthropic, OpenAI does it, Google does it, every tool in the chain does it. The entire stack we're building on top of is moving constantly, and we're all just pretending that's fine."</blockquote>

<p><strong>개선 vs 손상의 혼재 (직접 인용):</strong></p>
<blockquote>"The problem isn't that things improve. The problem is that improvement and breakage are arriving in same package and there's no separation between the two. When Claude gets a model update, I have no way of knowing in advance which of my existing workflows will behave differently afterward."</blockquote>

<p><strong>작성자의 로그 수치:</strong></p>
<blockquote>"I've been keeping a log since January. In the last three months, I've had to adjust or rewrite parts of my setup fourteen times, not because I wanted to improve things, but because somethi..."</blockquote>
<p>(candidate text가 "somethi..."에서 잘림 — 나머지 로그 디테일은 이 기사 출처 범위 밖.)</p>

<p><strong>참고</strong>: 14번 재조정의 구체 내용·Anthropic에 대한 구체 요구사항·대안 제안 등은 candidate text가 잘려 확인되지 않음.</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 LLM API 기반 프로덕션 서비스를 운영하는 팀이 암묵적으로 겪는 문제 — "모델·SDK·API 동작이 조용히 변하고, 그 영향이 고객 피드백 시점에야 드러남" — 을 구체적으로 문서화한 사례입니다. Anthropic·OpenAI·Google 모두에 대한 비판이므로 Claude Code 전용 이슈는 아니지만, <strong>Claude Code 기반 워크플로우도 같은 churn에 노출</strong>된다는 점에서 관련 있습니다. 일반 지식으로는 버전 pinning, regression test suite, canary deployment 등이 완화책으로 거론되지만, 이 글의 상세 대안은 candidate text 범위 밖입니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>벤더 API의 silent change</strong>: 일반적으로 SaaS API는 semantic versioning 대신 "계속 개선"을 명분으로 silent change를 도입하는 경향이 있음. 프로덕션 의존성 관리 측면에서는 SLA + contract test + observability 3종 세트가 표준적 대응책으로 논의됩니다.</p>
<p><strong>원문</strong>: <a href="https://www.reddit.com/r/ClaudeAI/comments/1sl3yzt/were_all_building_on_top_of_something_that/" class="source-link">r/ClaudeAI 원 스레드</a></p>
</div>
