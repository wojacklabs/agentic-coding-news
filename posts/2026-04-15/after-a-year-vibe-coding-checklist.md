---
layout: default
title: "Claude로 1년간 빌드한 제품 디자이너의 체크리스트 — vibe coding 이후 prod-ready까지"
---

<a href="../2026-04-15" class="back-link">&larr; 4월 15일 목록</a>

# Vibe Coding Post-MVP 체크리스트

<div class="meta-line"><span class="tag tag-reddit">Reddit</span> 21:49 KST</div>

> 14년차 제품 디자이너가 Claude로 1년간 여러 제품 빌드하며 얻은 "vibe coding 이후 AI가 해결 못 해주는 것" 체크리스트 — empty/error states, edge cases, mental model gaps, integrations. r/ClaudeAI score 12, posted 2026-04-15.

<div class="context-block">
<h4>출처 핵심 (Reddit 글에서 확인되는 내용만)</h4>

<p><strong>작성자 배경 (직접 인용):</strong></p>
<blockquote>"Hey builders! My name is Sankalp and I've been a product designer for the last 14 years. It's been a year since I started to build my own products using Claude."</blockquote>

<p><strong>문제 제기 (직접 인용):</strong></p>
<blockquote>"we think vibe coding will solve everything. It won't. It's just the starting line."</blockquote>

<p><strong>MVP 사례 (직접 인용):</strong></p>
<blockquote>"When I launched my first product using, I had a working MVP in 48 hours. I posted about it, got 400 email signups, and felt like I was onto something. The frontend was fine. The code worked. But the product wasn't ready for a stranger to trust it with their money."</blockquote>

<p><strong>체크리스트 5가지 (직접 인용):</strong></p>

<p><strong>1. Empty states</strong></p>
<ul>
<li>"What does a brand new user see when they land on your product and there's no data yet?"</li>
<li>"Design this screen first, not last"</li>
<li>"Most real users will see this before anything else"</li>
</ul>

<p><strong>2. Error states</strong></p>
<ul>
<li>"What does your product say when something goes wrong?"</li>
<li>"Build the failure path before the success path"</li>
<li>"Silent failures make users think your product is broken"</li>
</ul>

<p><strong>3. Edge cases</strong></p>
<ul>
<li>"AI builds the happy path beautifully"</li>
<li>"Prompt it specifically for what happens when input is empty, API times out, or user does something unexpected"</li>
<li>"Real users will find every path you didn't think about"</li>
</ul>

<p><strong>4. Mental model gaps</strong></p>
<ul>
<li>"Give your MVP to 5 people who don't know you"</li>
<li>"Watch them use it without explaining anything"</li>
<li>"Every hesitation is a broken flow you need to fix"</li>
<li>"You cannot find this by prompting Claude to review your UX"</li>
</ul>

<p><strong>5. Integrations</strong></p>
<ul>
<li>"Test auth, payments and emails on your live URL"</li>
<li>"Use a device you've never used before on a network you don't control"</li>
<li>"Not localhost, ever"</li>
<li>본문이 "Things that work perfec"에서 잘림 — 5번 항목 나머지는 이 기사 출처 범위 밖</li>
</ul>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 Claude Code/vibe coding으로 48시간 MVP는 쉬워졌지만, 이 글은 <strong>"MVP와 유료 결제 가능한 제품 사이의 gap"</strong>을 구체 체크리스트로 명시합니다. "AI가 happy path를 잘 만들지만 edge case·empty/error state는 사용자가 찾아낸다"는 관찰은 Claude Code에게 <strong>"edge case 프롬프트를 구체 지시"</strong>하는 실무 패턴으로 이어집니다. Mental model gap("Claude에게 UX 리뷰 프롬프트해도 안 보임" → 실제 5명 관찰 필요)은 LLM 루프 안에서 해결 안 되는 영역을 정확히 짚습니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>empty/error state first</strong>: 일반적으로 UX 업계에서 오랫동안 통용되는 원칙. AI 코딩 시대에도 여전히 사람이 설계해야 한다는 함의.</p>
<p><strong>원문</strong>: <a href="https://www.reddit.com/r/ClaudeAI/comments/1slziiu/after_a_year_of_building_with_claude_heres_what/" class="source-link">r/ClaudeAI 원 스레드</a></p>
</div>
