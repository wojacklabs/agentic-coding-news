---
layout: default
title: "'Caveman English'로 토큰 아끼기는 역효과일 수 있다"
---

<a href="../2026-04-13" class="back-link">&larr; 4월 13일 목록</a>

# Caveman English의 함정

<div class="meta-line"><span class="tag tag-reddit">Reddit</span> r/ClaudeAI · 09:01 KST</div>

> 프롬프트를 극단적으로 짧게 줄이면 토큰은 아끼지만 모델 응답 품질이 떨어져 결과적으로 더 많은 반복 호출이 필요해진다는 분석.

Reddit r/ClaudeAI에서 최근 유행하는 **"caveman English"** — 관사·접속사·조동사를 제거한 극단적 단축 프롬프트 — 가 실제로는 역효과일 수 있다는 지적이 나왔습니다. 토큰 30% 절감하려다 모델이 의도를 오해하고 2-3배 재시도를 요구하면 총 토큰 소비는 오히려 증가합니다. <a href="https://www.reddit.com/r/ClaudeAI/comments/1sjpyx9/maybe_not_the_best_idea_to_sav_tokens_using/" class="source-link">원문</a>

<div class="context-block">
<h4>실전 기법 핵심</h4>
<p><strong>측정해야 할 지표:</strong> "프롬프트 토큰"이 아니라 "작업 완료까지 총 토큰". 프롬프트 + 응답 + 재시도 전부 합산.</p>
<p><strong>효과적 토큰 절감 방향:</strong></p>
<ul>
<li>대용량 첨부 대신 요약본 전달 (파일 → 필요 구간만)</li>
<li>중복 지시 제거 (CLAUDE.md에 상주 규칙 넣기)</li>
<li>도구 호출 결과 트렁케이트 (기본 50KB → 필요시 10KB)</li>
<li>Sonnet으로 drafting + Opus로 critical review (모델 라우팅)</li>
</ul>
<p><strong>피해야 할 패턴:</strong> "plz fix bug in auth.ts func handleLogin broken cant login" 처럼 극단 단축. 동일 의도를 2문장으로 표현하는 것이 오히려 효율적.</p>
</div>

<div class="context-block">
<h4>왜 중요한가</h4>
<p>Claude Max 20x 사용자들이 토큰 절약에 몰두하면서 나온 부작용입니다. 프롬프트 엔지니어링은 "짧게 vs 길게"의 단순 이분법이 아니라 **"의도를 명확히 전달하는 최소 길이"**를 찾는 문제입니다. 잘못된 최적화가 오히려 비용을 증가시키는 사례는 소프트웨어 성능 최적화에서도 흔합니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>Tokenization</strong>: LLM은 입력을 subword 토큰으로 분할합니다. 관사·접속사는 자주 쓰여 토큰화 효율이 높아(1-2 토큰) 제거해도 절약 효과가 작습니다. 반대로 이들을 없애면 모델이 의미 파싱에 더 많은 추론 자원을 씁니다.</p>
<p><strong>Retry Amplification</strong>: 모호한 프롬프트 → 잘못된 응답 → 사용자 재지시 → 재생성의 루프. 한 번의 명확한 프롬프트가 3번의 모호한 프롬프트보다 저렴합니다.</p>
</div>
