---
layout: default
title: "Opus 4.7 출시 하루 만에 — MRCR long context 256K 92→59%·1M 78→32% 퇴보, 토크나이저 1.35x 주장"
---

<a href="../2026-04-17" class="back-link">&larr; 4월 17일 목록</a>

# Opus 4.7 — 하루 뒤 역풍

<div class="meta-line"><span class="tag tag-reddit">Reddit</span> 03:47 KST</div>

> Opus 4.7 출시 24시간 안에 나온 사용자 벤치마크 역풍. MRCR v2 8-needle context benchmark 기준 Opus 4.6 91.9% → Opus 4.7 59.2% (256K), 78.3% → 32.2% (1M). 토크나이저가 동일 입력을 1.35x 더 많은 토큰으로 매핑한다는 주장 — 사용자 체감 비용 ~50% 증가. r/ClaudeAI 143 upvotes, 66 comments, posted 2026-04-17 01:32 KST.

<div class="context-block">
<h4>출처 핵심 (Reddit selftext에서 확인되는 내용만)</h4>

<p><strong>작성자 주장 요약 (직접 인용):</strong></p>
<blockquote>"First, they reduced the number of tokens in Opus 4.6; we can all feel it. Opus 4.6 has simply become lazier and duller."</blockquote>
<blockquote>"Now they're 'updating' the tokenizer, and the Opus 4.7 model will consume 1.35 times more tokens—according to user tests, 50% more than Opus 4.6 and 100% more than other proprietary models. In other words, our limits have gotten even tighter."</blockquote>
<blockquote>"According to initial user tests, Opus 4.7 loses context significantly more often—a regression."</blockquote>

<p><strong>MRCR v2 8-needle 벤치마크 — 작성자가 제시한 수치 (직접 인용):</strong></p>
<ul>
<li>256K:
  <ul>
    <li>Opus 4.6: 91.9%</li>
    <li>Opus 4.7: 59.2%</li>
  </ul>
</li>
<li>1M:
  <ul>
    <li>Opus 4.6: 78.3%</li>
    <li>Opus 4.7: 32.2%</li>
  </ul>
</li>
</ul>

<p><strong>사용자 결론 (직접 인용):</strong></p>
<blockquote>"My x20 subscription ended just yesterday. I'm not even going to try this new model with this kind of attitude."</blockquote>

<p><strong>출처의 출처</strong>: 작성자가 scores와 cost 주장 근거로 X 포스트 3개를 참조 — <code>x.com/AiBattle_/status/2044797382697607340</code>, <code>x.com/songjunkr/status/2044795867589493130</code>, <code>x.com/Angaisb_/status/2044790798772822493</code>. 이 기사는 X 원문을 직접 인용하지 않고 작성자의 Reddit 요약에 한정.</p>

<p><strong>같은 주제의 병행 보고</strong>: r/ClaudeAI 1sn6eyd (182 upvotes, "PSA: Opus 4.7 is much worse at MRCR Long Context than 4.6")와 1sn7d6g (26 upvotes, "Regression Comparisons From Opus 4.7 to Opus 4.6 for long context reasoning, Opus 4.7 Data From System Card") 모두 동일 방향의 관찰.</p>

<p><strong>한계</strong>: (a) 작성자는 모두 커뮤니티 벤치마크를 인용하며, Anthropic 공식 응답은 이 글 범위 밖. (b) MRCR 수치의 원 평가자(AiBattle_)가 사용한 정확한 프로토콜·샘플 크기는 이 글 범위 밖. (c) 토크나이저 1.35x 주장은 어제 tick 1에서도 HN cupofjoakim(47793411)이 동일하게 제시했으나 공식 확인 부재.</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 상위 모델 업그레이드는 긴 컨텍스트 성능을 유지·개선하는 방향으로 나오지만, 이번 커뮤니티 보고는 <strong>"256K·1M에서 절반 정도로 퇴보"</strong>라는 극단적 수치를 제시합니다. 이것이 재현된다면, 어제 Anthropic 공식 Session 관리 블로그(Thariq Shihipar)의 "새 task는 새 session"·"proactive /compact" 권고가 <strong>단순 best practice가 아니라 4.7에서 작동 보장 조건</strong>이 됩니다. 토크나이저 변경으로 동일 입력이 1.35x 토큰이 되는 게 사실이면, 가격이 그대로여도 <strong>실효 단가는 ~35% 상승</strong>. 기본 effort가 xhigh로 상향된 어제 릴리스 노트와 겹치면 "동일 작업당 비용은 훨씬 더"가 될 가능성. 파워유저는 (a) <code>claude-opus-4-6</code> 유지 가능성(버전 pinning 제거 이후 어디까지 가능한지 재확인), (b) CodeBurn·Notch Pilot 같은 측정 도구로 실제 토큰 소비 비교, (c) MRCR 자체 재현 — 이 세 가지로 방어선을 구성해야 합니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>MRCR (Multi-Round Co-reference Resolution)</strong>: 일반적으로 긴 문맥 안의 여러 참조 해결 능력을 측정하는 벤치마크. 8-needle은 문맥에 숨겨진 8개의 "needle"(핵심 조각)을 모두 찾는 변형.</p>
<p><strong>tokenizer 1.35x 주장 검증 방법</strong>: 일반적으로 동일 텍스트를 Opus 4.6 vs 4.7 API에 보내 <code>usage.input_tokens</code>를 비교하면 직접 확인 가능. Anthropic 공식 tokenizer 문서 업데이트 여부도 관찰 포인트.</p>
<p><strong>x20 subscription</strong>: 일반적으로 Claude Max의 $200/mo 상위 플랜(Max20x) 구어체 표기.</p>
<p><strong>원문</strong>: <a href="https://www.reddit.com/r/ClaudeAI/comments/1sn8ovi/opus_47_is_50_more_expensive_with_context/" class="source-link">r/ClaudeAI 원 스레드</a></p>
</div>
