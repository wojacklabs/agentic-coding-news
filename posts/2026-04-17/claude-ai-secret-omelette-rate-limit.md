---
layout: default
title: "Claude.ai 내부 API에서 발견된 'seven_day_omelette' 신규 rate limit 필드 — 알려지지 않은 기능의 한도"
---

<a href="../2026-04-17" class="back-link">&larr; 4월 17일 목록</a>

# Claude.ai Secret Feature — "omelette"

<div class="meta-line"><span class="tag tag-reddit">Reddit</span> 03:47 KST</div>

> Claude.ai <code>/settings/usage</code> 백엔드 API(<code>/api/organizations/&lt;uuid&gt;/usage</code>)에서 새 필드 <code>seven_day_omelette</code> 발견. 기존 <code>five_hour</code>·<code>seven_day</code>·<code>seven_day_sonnet</code>과 달리 <code>null</code>이 아니라 utilization 0%로 활성화. 포스팅 중에 <code>omelette_promotional</code>까지 추가 등장. 무엇을 대표하는 기능인지는 공개 안 됨. r/ClaudeAI score 11, posted 2026-04-17 01:14 KST.

<div class="context-block">
<h4>출처 핵심 (Reddit selftext에서 확인되는 내용만)</h4>

<p><strong>발견 API 경로 (직접 인용):</strong></p>
<blockquote>"You can see your Claude subscription's current rate limits here: https://claude.ai/settings/usage"</blockquote>
<blockquote>"The page uses a convenient API, https://claude.ai/api/organizations/&lt;uuid&gt;/usage, that returns a JSON object"</blockquote>

<p><strong>관측된 JSON 구조 (직접 인용):</strong></p>
<pre><code>{
    // Standard limits.
    "five_hour":        { "utilization": 5.0,  "resets_at": "..." },
    "seven_day":        { "utilization": 80.0, "resets_at": "..." },
    "seven_day_sonnet": { "utilization": 4.0,  "resets_at": "..." },

    // THIS IS NEW!
    "seven_day_omelette": { "utilization": 0.0, "resets_at": null },

    // These ones were used at various times in the past several months
    // and are no longer active; hence "null" instead of utilization: 0.0
    "seven_day_oauth_apps": null,
    "seven_day_opus": null,
    "seven_day_cowork": null,
    "iguana_necktie": null,
    // ====== THIS IS NEW as of April 16th ======
    "omelette_promotional": null,
    ...
}</code></pre>

<p><strong>해석 포인트 (작성자 본인의 맥락 설명)</strong>: <code>null</code> 필드는 "과거에 쓰였다 지금은 미사용" 상태, <code>utilization: 0.0</code>은 "현재 활성·아직 소비 없음" 상태로 구분된다고 제시.</p>

<p><strong>작성자 발견 시점 추가</strong>: 포스팅을 작성하는 중에 <code>omelette_promotional</code> 필드가 추가로 등장 — 2026-04-16에 새로 도입됐다고 주석.</p>

<p><strong>한계</strong>: <code>omelette</code>가 무엇을 표현하는 기능인지 이 글에서는 미확인. 어떤 사용자가 이 필드에 utilization을 기록하기 시작하는지, 계약 플랜별로 존재 여부가 다른지는 <strong>이 글 범위 밖</strong>.</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 Anthropic은 새 기능을 공개 블로그·설정 UI로 발표하지만, 이번 <code>seven_day_omelette</code>는 <strong>공개 발표 없이 내부 API에 먼저 등장한 신규 한도 엔트리</strong>입니다. 기존 <code>seven_day_opus</code>·<code>seven_day_cowork</code>·<code>iguana_necktie</code>(Claude Code Web의 $1000 free credits) 같은 "이름이 코드네임인 한도"가 지금은 null이고, <code>omelette</code>가 활성 상태로 들어온 패턴은 <strong>다음 기능 릴리스의 "사전 한도 세팅"일 가능성</strong>. 어제 출시된 <code>/ultrareview</code> 커맨드(Pro·Max 3회 무료)와 Opus 4.7 "Auto mode Max 확대" 흐름을 고려하면, 이 한도가 어떤 신규 작업 카테고리(예: 장시간 자율 에이전트, 대용량 artifact 빌드 등)와 연결될지가 다음 tick 관찰 포인트. 파워유저에게는 <strong>"claude.ai/api/organizations/&lt;uuid&gt;/usage JSON을 스크래핑해 필드 변화를 관찰"</strong>하는 것이 공식 발표 전에 변화를 포착하는 실용 기술.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>Claude.ai usage API</strong>: 일반적으로 설정 페이지 UI가 호출하는 내부 API로, 사용자 OAuth 세션으로 접근 가능. 외부 공개 SDK가 아님.</p>
<p><strong>코드네임 필드 패턴</strong>: 일반적으로 Anthropic은 출시 전 기능에 내부 코드네임(<code>iguana_necktie</code>·<code>omelette</code> 등)을 쓰고 이후 공개 이름으로 교체하거나 삭제해왔음. null vs 0.0 구분은 "과거/현재 활성" 판별에 유용.</p>
<p><strong>원문</strong>: <a href="https://www.reddit.com/r/ClaudeAI/comments/1sn86xs/new_secret_claudeai_feature_gets_its_own_rate/" class="source-link">r/ClaudeAI 원 스레드</a></p>
</div>
