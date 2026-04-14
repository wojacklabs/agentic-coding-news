---
layout: default
title: "투명 API 프록시로 발견된 fallback-percentage: 0.5 헤더 — 11,505 호출 독립 검증"
---

<a href="../2026-04-14" class="back-link">&larr; 4월 14일 목록</a>

# fallback-percentage: 0.5 — 프록시 분석

<div class="meta-line"><span class="tag tag-reddit">Reddit</span> 19:00 KST</div>

> 투명 API 프록시로 Claude 요청을 캡처해 <code>fallback-percentage: 0.5</code> 헤더를 발견. 11,505 호출 7일 독립 복제로 "zero variance, fixed per-account parameter" 확인. r/ClaudeAI score 221.

<div class="context-block">
<h4>출처 핵심 (Reddit 글에서 확인되는 내용만)</h4>

<p><strong>업데이트 (2026-04-11 23:00, 직접 인용):</strong></p>
<blockquote>"Independent replication with 11,505 API calls over 7 days confirms fallback-percentage: 0.5 is completely fixed — zero variance, not time-based, not peak/off-peak, not load-based. Fixed per-account parameter."</blockquote>

<p><strong>추가 발견:</strong></p>
<ul>
<li>"14% of calls had the weekly quota as binding constraint, not the 5h window."</li>
<li>"some Max 5x accounts have <code>overage-status: allowed</code> while mine has <code>overage: rejected + org_level_disabled</code>. Same plan, different treatment, zero transparency."</li>
</ul>

<p><strong>정정 1 (작성자 자기 수정):</strong></p>
<blockquote>"overage: rejected is a user-controlled billing setting, not account-level targeting. My mistake — I had overage disabled myself. The fallback-percentage: 0.5 finding stands independently."</blockquote>

<p><strong>정정 2 — <code>fallback-percentage</code>의 공식 정의:</strong></p>
<p>claude-rate-monitor(Claude CLI reverse-engineered)에서 확인된 정의: "Fallback rate when rate-limited (e.g., 0.5 = 50% throughput)" → rate-limit 시 graceful degradation 메커니즘.</p>

<p><strong>관찰된 이상 현상 (직접 인용):</strong></p>
<blockquote>"However the header appears on every request including fresh sessions with 100% quota remaining and shows zero variance across 11,505 calls including during overage events. Exact mechanism still unknown."</blockquote>

<p>즉 원래는 rate-limit 시에만 적용되어야 하는 graceful degradation 값이 <strong>quota 100% 남은 신규 세션까지 포함한 모든 요청에 항상 고정 표시</strong>된다는 점이 미결 의문.</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 API 응답 헤더는 벤더가 내부적으로 쓰는 제어 정보의 일부가 노출된 것이며, 사용자가 역공학 없이는 확인하기 어렵습니다. <code>fallback-percentage: 0.5</code>가 <strong>모든 요청에 고정</strong>되어 있다는 관찰은 "정말 50% throughput을 항상 적용받는가" vs "단순히 상한 표시 헤더이고 실제 동작은 다른가"라는 두 해석으로 갈립니다. 작성자는 두 번째일 수 있다고 여지를 남겼습니다. 다만 동일 Max 플랜에서 계정별로 <code>overage-status</code>가 다르게 노출된다는 점은 <strong>정책의 계정별 차등이 불투명하게 존재</strong>한다는 증거가 될 수 있어 주시할 만합니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>투명 API 프록시</strong>: 일반적으로 HTTPS 트래픽을 중계하며 요청/응답 헤더·본문을 캡처하는 도구(mitmproxy, Charles 등). Claude 계정의 API 키를 본인 환경에서만 쓰는 조건으로 분석 가능.</p>
<p><strong>원문</strong>: <a href="https://www.reddit.com/r/ClaudeAI/comments/1sip74m/i_set_up_a_transparent_api_proxy_and_found/" class="source-link">r/ClaudeAI 원 스레드</a></p>
</div>
