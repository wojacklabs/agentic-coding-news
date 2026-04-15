---
layout: default
title: "Claude의 thinking block이 second model로 요약·압축되고 있다는 가설 — summarizer leak 관찰 보고"
---

<a href="../2026-04-16" class="back-link">&larr; 4월 16일 목록</a>

# Thinking Block Summarizer 가설

<div class="meta-line"><span class="tag tag-reddit">Reddit</span> 00:47 KST</div>

> 펜테스트 중 우연히 관찰된 "summarizer가 본인 task framing을 노출한 스크린샷". 작성자 가설: Claude의 thinking block이 표시 전에 별도 모델 인스턴스에 의해 rewrite·compress된다. 토큰 사용량 급증과 thinking block 길이 단축의 원인 추정. r/ClaudeAI score 30, posted 2026-04-14 20:21 KST.

<div class="context-block">
<h4>출처 핵심 (Reddit selftext에서 확인되는 내용만)</h4>

<p><strong>발견 맥락 (직접 인용):</strong></p>
<blockquote>"Pen testing my app SSS and caught something interesting on the side."</blockquote>

<p><strong>핵심 가설 (직접 인용):</strong></p>
<blockquote>"Claude's thinking blocks now appear to be processed by a second model instance whose job is to rewrite and compress them before they're shown to the user. Pretty sure this is the anti-CoT-distillation move, makes it way harder for anyone scraping responses to train a competitor on Claude's raw reasoning traces."</blockquote>

<p><strong>관찰 근거 (직접 인용):</strong></p>
<blockquote>"The tell: when this summarizer breaks, it doesn't fail silently, it leaks its own task framing into the displayed thinking. Screenshot attached. Notice the language, 'rewrite,' 'compressed,' 'guidelines,' 'next thinking chunk that needs to be compressed and rewritten.' That's not the main model talking to itself, that's a summarizer agent whose input got malformed and started asking for the missing chunk out loud."</blockquote>

<p><strong>시사점 3가지 (직접 인용):</strong></p>
<blockquote>"1. Every thinking response now potentially involves at least two model calls (reasoner + summarizer). That's a real cost/latency multiplier even if the summarizer is cheaper."</blockquote>
<blockquote>"2. If the summarizer is what users are reading, 'Claude's thinking' as displayed isn't Claude's actual reasoning anymore, it's a sanitized rewrite of it. Worth knowing for anyone using thinking blocks as a debugging signal."</blockquote>
<blockquote>"3. CoT scrapers training on Claude.ai output are now scraping the summary, not the original, which is the entire point."</blockquote>

<p><strong>관련 증상 연결 (직접 인용):</strong></p>
<blockquote>"Wanted to share a hypothesis on what could be causing the increased token usage, and the funky thing where thinking blocks haven't been procing lately, or come through way shorter than they used to."</blockquote>

<p><strong>한계</strong>: 단일 사용자의 스크린샷 + 가설. Anthropic의 공식 확인은 문서 범위 밖.</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 Claude Code·Claude.ai 사용자가 보는 "extended thinking" 블록은 모델의 원raw CoT라고 가정되지만, 이 가설이 사실이면 <strong>"내가 보고 있는 건 summarizer가 다시 쓴 요약"</strong>이 됩니다. 이는 이번 주 커뮤니티에서 계속 보고된 <strong>(a) 토큰 사용량 급증(Pro 2번 프롬프트 49% 소진, Max 40% 빨리 소진)</strong>과 <strong>(b) thinking block이 전보다 짧게 나오거나 안 나오는 문제</strong>를 동시에 설명할 수 있는 단일 원인 후보입니다 — reasoner + summarizer 2단계 호출로 토큰은 더 쓰고 표시는 compressed. 또 디버깅 신호로 thinking block을 쓰는 파워유저에게는 <strong>"표시 내용과 실제 추론 사이에 gap이 있을 수 있다"</strong>는 중요한 주의 사항입니다. 다만 단일 screenshot 기반 가설이므로 독립 재현·Anthropic 공식 응답이 필요합니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>CoT distillation</strong>: 일반적으로 LLM의 raw chain-of-thought를 수집해 더 작은 모델 학습에 재사용하는 기법. 프런티어 모델 제공자가 방어하려는 핵심 자산 중 하나.</p>
<p><strong>summarizer agent 패턴</strong>: 일반적으로 긴 출력·reasoning을 별도 모델로 압축하는 아키텍처. Chat UI에서 "reasoning preview"처럼 보이는 단축된 텍스트가 대표 예시.</p>
<p><strong>원문</strong>: <a href="https://www.reddit.com/r/ClaudeAI/comments/1sl5ru2/claude_thinking_blocks_are_being_summarized_by_a/" class="source-link">r/ClaudeAI 원 스레드</a></p>
</div>
