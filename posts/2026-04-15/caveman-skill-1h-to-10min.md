---
layout: default
title: "Caveman Skill 사용기 — 복잡한 벤치마크 1시간 → 11분, 토큰 50% 감소"
---

<a href="../2026-04-15" class="back-link">&larr; 4월 15일 목록</a>

# Caveman Skill — 1h → 11min 벤치마크

<div class="meta-line"><span class="tag tag-reddit">Reddit</span> 06:51 KST</div>

> 친구 추천으로 Caveman 프로젝트 시도 — Unity AI 절차적 월드 생성 벤치마크에서 실행 시간 1시간 → 11분, 토큰 50% 절감, 결과는 동일. r/ClaudeAI score 5, 04-14 posted.

<div class="context-block">
<h4>출처 핵심 (Reddit 글에서 확인되는 내용만)</h4>

<p><strong>벤치마크 환경 (직접 인용):</strong></p>
<blockquote>"A friend just told me about Caveman project, and I gave it a try on this benchmark. Basically, it is a procedural world generation from scratch, pre-made, no assets, no tools."</blockquote>

<p><strong>이전 상황 (직접 인용):</strong></p>
<blockquote>"Testing the benchmark took more than 1 hour and was really annoying to benchmark. You could do 1 or 2 benchmarks in a day before you start wasting too many tokens."</blockquote>

<p><strong>Caveman 적용 결과 (직접 인용):</strong></p>
<blockquote>"But with caveman it was 11 minutes!"</blockquote>

<p><strong>품질 동등성 (직접 인용):</strong></p>
<blockquote>"It gives the exact same result as if I did it without the caveman, no difference."</blockquote>

<p><strong>제목의 토큰 절감 수치</strong>: "50% less token spent" — 본문 내 다른 곳에서 직접 측정 절차나 raw 수치는 candidate text 범위에 추가 없음.</p>

<p><strong>참고</strong>: Caveman GitHub URL은 작성자가 글 본문에 링크함 — <code>github.com/JuliusBrussee/caveman</code>. 측정 환경(Sonnet/Opus 어느 모델인지·context 크기·반복 횟수)은 candidate text가 짧아 이 기사 출처 범위에서 확인되지 않음.</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 "토큰 절감" 주장은 짧은 데모로는 의미가 적은데, 이 사용기는 <strong>"실행 시간 1h → 11min" + "결과 동등"</strong>이라는 두 metric을 함께 제시합니다. Caveman은 caveman-style speech(짧고 구조화된 영어)로 토큰을 줄이는 Skill이라는 정체가 다른 X 트윗에서 언급된 적 있으며(같은 날 score 0이지만 openclawradar X 트윗), 단일 사용자의 단일 벤치마크라는 한계가 있어도 수치가 인상적이라 시도 가치가 있습니다. 다만 raw 토큰 측정 데이터가 본문에 없어 정확 수치는 GitHub README 확인 필요.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>Caveman-style speech</strong>: 일반적으로 LLM에 짧은 명령형·단어형 입력을 줘서 응답 길이도 짧게 유도하는 패턴. 이 글의 Caveman은 그 아이디어를 Skill로 패키지한 것으로 보임 (정확한 메커니즘은 GitHub 확인 필요).</p>
<p><strong>원문</strong>: <a href="https://www.reddit.com/r/ClaudeAI/comments/1sl967a/i_just_used_caveman_and_it_reduced_generation/" class="source-link">r/ClaudeAI 원 스레드</a></p>
</div>
