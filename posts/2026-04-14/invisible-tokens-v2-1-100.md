---
layout: default
title: "Claude Code v2.1.100부터 매 요청에 ~20k invisible tokens 추가 — 프록시 캡처 분석"
---

<a href="../2026-04-14" class="back-link">&larr; 4월 14일 목록</a>

# v2.1.100 Invisible Tokens — 프록시 분석

<div class="meta-line"><span class="tag tag-hn">HN</span> 18:37 KST</div>

> efficienist.com 블로그의 한 개발자가 HTTP 프록시로 Claude Code v2.1.98과 v2.1.100의 API 요청을 캡처·비교한 결과, v2.1.100이 매 요청에 약 20k 보이지 않는 토큰을 추가로 청구한다고 보고. HN에서 score 44.

<div class="context-block">
<h4>출처 핵심 (efficienist.com 블로그에서 확인되는 내용만)</h4>

<p><strong>영향 버전</strong>: Claude Code v2.1.100 이후.</p>

<p><strong>증거 방법</strong>: 개발자가 HTTP 프록시로 전체 API 요청을 캡처, v2.1.98 vs v2.1.100 토큰 청구 비교.</p>

<p><strong>구체 수치:</strong></p>
<ul>
<li>v2.1.98: <strong>49,726 tokens billed</strong></li>
<li>v2.1.100: <strong>69,922 tokens billed</strong></li>
<li>차이: <strong>~20,196 tokens (약 40% 증가)</strong></li>
</ul>

<p><strong>핵심 발견 (직접 인용):</strong></p>
<blockquote>"The v2.1.100 request was actually smaller in bytes sent from the client, which rules out the user side as the source."</blockquote>

<p>→ 클라이언트가 보낸 바이트는 오히려 더 작았으므로, 추가 토큰은 서버 측 또는 클라이언트 내부에서 추가된 것.</p>

<p><strong>우회 명령(순환 중)</strong>: 다운그레이드 — <code>npx claude-code@2.1.98</code></p>

<p><strong>중요한 단서</strong>:</p>
<blockquote>"hasn't been independently verified at scale, and Anthropic hasn't commented on it"</blockquote>
<p>복수 사용자가 프록시 테스트로 유사 결과를 확인했다는 언급은 있으나, 대규모 검증·Anthropic 공식 코멘트는 없는 상태.</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 Claude Max·Pro 플랜은 월 토큰 한도가 있는데, 매 요청 20k 추가 토큰은 <strong>실사용 한도를 대략 40% 줄이는 효과</strong>입니다. 사용자가 설정이나 입력을 바꾸지 않았는데도 쿼터가 빨리 떨어진다면 버전 업데이트가 원인일 수 있다는 점에서 실무적 함의가 큽니다. 다만 "~20k invisible tokens"는 단일 개발자의 프록시 측정이 1차 근거이므로, 본인 환경에서도 재현되는지 동일 방식으로 확인 후 대응하는 것이 안전합니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>HTTP 프록시로 Claude Code 디버깅</strong>: 일반적으로 <code>mitmproxy</code>나 <code>Charles Proxy</code> 같은 도구로 HTTPS 요청을 중계·캡처할 수 있습니다. API 키·인증 헤더가 함께 노출되므로 개인 키 환경에서만 시도해야 합니다.</p>
<p><strong>관련 이슈</strong>: 같은 주제의 다른 보고들(r/ClaudeAI "v2.1.100+ 20K invisible tokens" 포스트 등)이 최근 누적되고 있음.</p>
<p><strong>원문</strong>: <a href="https://efficienist.com/claude-code-may-be-burning-your-limits-with-invisible-tokens-you-cant-see-or-audit/" class="source-link">efficienist.com 블로그 글</a></p>
<p><strong>HN discussion</strong>: <a href="https://news.ycombinator.com/item?id=47754179" class="source-link">news.ycombinator.com/item?id=47754179</a></p>
</div>
