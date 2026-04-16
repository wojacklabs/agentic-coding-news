---
layout: default
title: "Claude Opus 4.7 공식 출시 — SWE-bench 3x, CursorBench 70%(vs 58%), 기본 effort xhigh, /ultrareview 신설"
---

<a href="../2026-04-17" class="back-link">&larr; 4월 17일 목록</a>

# Claude Opus 4.7 — 공식 릴리스

<div class="meta-line"><span class="tag tag-hn">HN</span> 00:47 KST</div>

> Anthropic이 2026-04-16 Claude Opus 4.7 공식 발표. SWE-bench Verified 3x, 93-task 코딩 벤치 +13%(4.6·Sonnet 4.6 모두 실패한 4개 포함 해결), CursorBench 70% vs 4.6 58%, BigLaw Bench 90.9%, Finance Agent 0.813. 기본 effort level <strong>xhigh</strong>로 상향, <strong>/ultrareview</strong> 신규 슬래시 커맨드 (Pro·Max 3회 무료), Auto mode Max 사용자 확대. 가격은 동일 ($5/$25 per MTok). HN 369 points, 297 comments (47793411).

<div class="context-block">
<h4>출처 핵심 (Anthropic 공식 발표 anthropic.com/news/claude-opus-4-7에서 확인)</h4>

<p><strong>발표 날짜</strong>: 2026-04-16.</p>

<p><strong>벤치마크 수치 (Anthropic 공식):</strong></p>
<ul>
<li>SWE-bench Verified: "3x more production tasks resolved than Opus 4.6"</li>
<li>93-task 코딩 벤치마크: "13% over Opus 4.6, including four tasks neither Opus 4.6 nor Sonnet 4.6 could solve"</li>
<li>CursorBench: 70% (vs. Opus 4.6의 58%)</li>
<li>BigLaw Bench: 90.9% (high effort)</li>
<li>Finance Agent: 0.813 vs 0.767 (General Finance module)</li>
<li>Terminal Bench: "Passed tasks prior Claude models failed"</li>
<li>CyberGym: 73.8</li>
</ul>

<p><strong>Claude Code 기능 변경 (공식):</strong></p>
<ul>
<li>기본 effort level이 모든 플랜에서 <code>xhigh</code>로 상향</li>
<li>신규 <code>/ultrareview</code> 슬래시 커맨드 — dedicated review 세션</li>
<li>Auto mode가 Max 사용자까지 확대</li>
<li>Pro·Max 사용자에게 ultrareview 3회 무료 제공</li>
</ul>

<p><strong>가격 (직접 인용):</strong></p>
<blockquote>"$5 per million input tokens and $25 per million output tokens"</blockquote>
<p>(Opus 4.6과 동일.)</p>

<p><strong>모델 ID & 배포 (공식):</strong></p>
<ul>
<li><code>claude-opus-4-7</code> via Claude API</li>
<li>Amazon Bedrock</li>
<li>Google Cloud Vertex AI</li>
<li>Microsoft Foundry</li>
</ul>

<p><strong>직접 인용 — 핵심 특성:</strong></p>
<blockquote>"handles complex, long-running tasks with rigor and consistency, pays precise attention to instructions, and devises ways to verify its own outputs"</blockquote>

<p><strong>커뮤니티 관찰 — HN 47793411 (cupofjoakim 의견, 검증 필요):</strong></p>
<blockquote>"Opus 4.7 uses an updated tokenizer that improves how the model processes text. The tradeoff is that the same input can map to more tokens—roughly 1.0–1.35× depending on the content type."</blockquote>
<p>이 토큰화기 변경 주장은 사용자 댓글이며 공식 확인은 이 글 범위 밖.</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 모델 릴리스 자체는 scope-out이지만, 이번 릴리스는 <strong>Claude Code 파워유저 동작에 직접 영향</strong>하는 변경이 여럿입니다. (1) <strong>기본 effort가 xhigh</strong> → 이전 medium/high 대비 추론 시간·토큰이 크게 증가 → 이번 주 내내 다룬 "quota가 너무 빨리 탄다" 문제와 역풍 관계. (2) <strong>/ultrareview</strong>는 Anthropic 공식 블로그 Thariq Shihipar의 <code>/usage</code>·<code>/rewind</code>·<code>/compact</code>·<code>/clear</code> 가이드 바로 다음에 나온 새 슬래시 커맨드로, "dedicated review 세션" 설계는 subagent 패턴(중간 출력 다시 안 볼 때 위임)의 공식화. (3) SWE-bench Verified 3x는 <strong>실제 production task 해결 능력</strong>이 정량 개선됐다는 뜻이며, 어제 Anthropic 2026 Trends Report의 Rakuten 12.5M LOC 7h single-run 케이스의 재현성을 강화. 다만 <strong>xhigh 기본 + 새 tokenizer(추정 1~1.35x 토큰)</strong>가 사실이면 동일 작업의 실비용이 크게 늘어날 여지가 있어, 파워유저는 <code>/usage</code>와 Notch Pilot·CodeBurn 같은 측정 도구로 비용 변화를 실측해야 안전합니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>SWE-bench Verified</strong>: 일반적으로 실제 GitHub issue→PR 매칭 벤치마크의 Anthropic·OpenAI 등이 재검증한 서브셋. "실제 production task 해결" 지표로 인용.</p>
<p><strong>effort level</strong>: 일반적으로 Claude Code의 low/medium/high/xhigh 설정이 모델의 추론 깊이·토큰 사용을 조절. xhigh가 가장 높음.</p>
<p><strong>Auto mode</strong>: 일반적으로 태스크 복잡도에 따라 모델·effort를 자동 선택하는 Claude Code 기능.</p>
<p><strong>공식 발표</strong>: <a href="https://www.anthropic.com/news/claude-opus-4-7" class="source-link">anthropic.com/news/claude-opus-4-7</a></p>
<p><strong>HN discussion</strong>: <a href="https://news.ycombinator.com/item?id=47793411" class="source-link">news.ycombinator.com/item?id=47793411</a></p>
</div>
