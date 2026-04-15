---
layout: default
title: "'Writing should have a soul' — 개인 글쓰기 anti-pattern을 캡처하는 Claude Skill 오픈소스"
---

<a href="../2026-04-15" class="back-link">&larr; 4월 15일 목록</a>

# Writing Claude Skill — 개인 Voice Capture

<div class="meta-line"><span class="tag tag-hn">HN</span> 15:49 KST</div>

> Lago 창업자가 자신의 글쓰기 anti-pattern(AI가 쓰는 것과 실제 보내는 것의 차이)을 Skill로 템플릿화해 오픈소스 공개. "주간 몇 시간 절약" 주장. HN score 8, 04-13 posted.

<div class="context-block">
<h4>출처 핵심 (getlago.substack.com 본문 WebFetch에서 확인되는 내용만)</h4>

<p><strong>Skill 핵심 정의 (직접 인용):</strong></p>
<blockquote>"My skill captures my anti-patterns, the gap between what AI drafts and what I actually send."</blockquote>

<p><strong>저자의 시간 절감 주장 (직접 인용):</strong></p>
<blockquote>"It saves me hours every week."</blockquote>

<p><strong>원칙 — 4가지:</strong></p>
<ul>
<li><strong>Soul over taste</strong>: "Writing should have a soul" — 단순 문체 다듬기 이상의 목적</li>
<li><strong>Authenticity</strong>: 수년간의 실제 편집 이력을 역공학 — "무엇을 유지하고 무엇을 지웠는지"</li>
<li><strong>Voice preservation</strong>: 비원어민 영어 패턴(짧은 문장, 직설적 언어, ornate transition 최소화)을 제약이 아닌 특징으로 수용</li>
<li><strong>Structural capture</strong>: "반복·구조·포맷팅"은 시스템화 가능하지만 감정 콘텐츠는 불가 — <em>"the repetition, the structure, the formatting"은 시스템화하되 감정은 체계화하지 않음</em></li>
</ul>

<p><strong>공개 방식 (직접 인용):</strong></p>
<blockquote>"The template is the easy part."</blockquote>
<p>→ 저자는 템플릿 자체는 쉬운 부분이고, 개인 사용자가 자신의 편집 이력을 통찰로 추출하는 것이 본질이라고 주장.</p>

<p><strong>핵심 조건 (직접 인용):</strong></p>
<blockquote>"you uncovered a truth, you deeply need to let some thoughts or feelings out."</blockquote>

<p><strong>GitHub</strong>: <code>github.com/getlago/inside-lago-voice-skill</code> (empty structure 템플릿).</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 Claude Skill은 "기술적 기능"을 담는 것으로 소개되지만, 이 사례는 <strong>개인의 글쓰기 스타일·anti-pattern을 Skill로 체계화</strong>한 실전 응용 — 사용자가 LLM 출력에 매번 반복하는 수정을 Skill에 한 번 기록하면, 다음부터는 그 수정이 사전에 반영된 초안이 나오는 흐름. 다만 "years of actual edits reverse-engineering"이라는 접근은 개인마다 재현이 어렵고, 저자도 "template is the easy part"라 말하며 개인 데이터 수집이 본질임을 인정합니다. Claude Code 전용이라기보다는 <strong>Skill 포맷 자체의 응용 사례</strong>로 의미 있습니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>Lago</strong>: 일반적으로 오픈소스 빌링 엔진(getlago.com)을 개발하는 회사. 이 글은 Lago 창업자의 개인 substack 포스트.</p>
<p><strong>원문 글</strong>: <a href="https://getlago.substack.com/p/open-sourcing-my-writing-claude-skill" class="source-link">getlago.substack.com</a></p>
<p><strong>Skill 템플릿</strong>: <a href="https://github.com/getlago/inside-lago-voice-skill" class="source-link">github.com/getlago/inside-lago-voice-skill</a></p>
<p><strong>HN discussion</strong>: <a href="https://news.ycombinator.com/item?id=47746699" class="source-link">news.ycombinator.com/item?id=47746699</a></p>
</div>
