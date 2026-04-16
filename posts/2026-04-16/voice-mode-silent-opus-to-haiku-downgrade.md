---
layout: default
title: "Claude 음성 모드 진입 시 Opus 4.6 → Haiku 4.5로 무음 다운그레이드 — UI에는 Opus 유지 표기"
---

<a href="../2026-04-16" class="back-link">&larr; 4월 16일 목록</a>

# Voice Mode Silent Downgrade

<div class="meta-line"><span class="tag tag-reddit">Reddit</span> 18:47 KST</div>

> Claude.ai에서 Opus 4.6으로 새 대화를 시작해 모델 확인 후 음성 모드로 전환하면, 응답은 "I'm Haiku 4.5"지만 UI 상단은 여전히 Opus 표기. 알림·선택 옵션 없음. 사용자는 (1) 항상 이랬는지, (2) Opus/Sonnet을 음성에서 강제할 방법, (3) UI·Settings에 공개 안 된 이유를 질문. r/ClaudeAI posted 2026-04-16 16:56 KST.

<div class="context-block">
<h4>출처 핵심 (Reddit selftext에서 확인되는 내용만)</h4>

<p><strong>관찰 과정 (직접 인용):</strong></p>
<blockquote>"I opened a new chat with Opus 4.6 selected as the default. Typed 'what model is this?' and got confirmation it was Opus 4.6. Then I switched to voice mode within the same conversation and asked again, turns out it had silently swapped me to Haiku 4.5."</blockquote>

<p><strong>UI 불일치 (직접 인용):</strong></p>
<blockquote>"no notification, no option to keep the model I'd originally selected. In fact opus remains visible at the top, but when asking it what model are you, it insists via voice it's Haiku 4.5."</blockquote>

<p><strong>작동 트리거 (직접 인용):</strong></p>
<blockquote>"You just get downgraded the moment you tap the voice chat icon."</blockquote>

<p><strong>미해결 질문 3가지 (직접 인용):</strong></p>
<blockquote>"1. Is this new behaviour, or has voice mode always locked to Haiku?<br>2. Is there any way to force voice mode to use Opus or Sonnet instead?<br>3. Why isn't this disclosed anywhere in the UI or settings?"</blockquote>

<p><strong>한계</strong>: 단일 사용자 보고. Anthropic 공식 응답은 이 글 범위 밖. 모델이 "자기 이름"을 정확히 답한다는 전제도 100% 신뢰 불가(모델 self-ID는 system prompt 의존적).</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 "silent model downgrade"는 파워유저에게 치명적입니다. Opus로 시작해 복잡한 설계를 얘기하다 음성으로 전환한 순간 Haiku가 답하면 <strong>문맥 이해·추론 품질이 갑자기 바뀌어도 사용자는 이유를 모릅니다</strong>. 이번 주 "Anthropic version pinning 제거"(04-15 tick 7)와 Boris Cherny의 "1M → 400k 기본값 검토" 흐름은 모두 <strong>"Anthropic이 사용자 모르게 모델·설정을 바꿀 여지가 넓다"</strong>는 우려를 키우는데, 이 보고는 그 우려를 UX 차원에서 보여주는 사례. 다만 모델이 <code>what model are you?</code>에 답하는 내용은 <strong>실제 추론 모델과 다를 수 있다</strong>는 점을 주의 — Haiku를 "Opus처럼 응답하도록" 프롬프트할 수도 있고, 반대로 시스템이 모델 이름을 system prompt에 주입해 혼동할 수도 있습니다. 정확한 확인은 API logs·billing·usage 엔드포인트로만 가능. Claude Code 파워유저는 voice chat 사용 전 이 동작을 실측하는 것이 안전.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>모델 self-identification 한계</strong>: 일반적으로 모델은 system prompt에 주입된 이름을 따라 답하는 경우가 많고, 실제 backing 모델과 다를 수 있음. usage 페이지·API response header가 더 정확.</p>
<p><strong>voice mode architecture</strong>: 일반적으로 voice input/output은 latency 제약이 크고, 작은·빠른 모델을 사용하는 설계가 업계 표준. 다만 대화 문맥 연속성·품질을 기대하는 사용자에게 사전 공지 없으면 UX 문제로 이어짐.</p>
<p><strong>원문</strong>: <a href="https://www.reddit.com/r/ClaudeAI/comments/1smwzz2/voice_mode_silently_downgrades_your_model/" class="source-link">r/ClaudeAI 원 스레드</a></p>
</div>
