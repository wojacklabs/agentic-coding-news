---
layout: default
title: "design-extract — Claude Code에서 /extract-design 한 번으로 웹사이트 전체 디자인 시스템 추출"
---

<a href="../2026-04-16" class="back-link">&larr; 4월 16일 목록</a>

# design-extract — Claude Code 디자인 추출 플러그인

<div class="meta-line"><span class="tag tag-reddit">Reddit</span> 00:47 KST</div>

> <code>/extract-design https://stripe.com</code> 한 번이면 Claude Code가 색·폰트·간격·shadow·컴포넌트를 뽑아 AI-최적화 markdown + Tailwind/shadcn/React theme/Figma variables까지 8개 파일로 출력. r/ClaudeAI score 199, 58 comments, posted 2026-04-15.

<div class="context-block">
<h4>출처 핵심 (Reddit selftext에서 확인되는 내용만)</h4>

<p><strong>명령 (직접 인용):</strong></p>
<blockquote>"Just type /extract-design https://stripe.com in Claude Code and it pulls the entire design language — colors, fonts, spacing, shadows, components, everything."</blockquote>

<p><strong>출력의 핵심 (직접 인용):</strong></p>
<blockquote>"The main output is a markdown file specifically structured for Claude to understand. So you can extract a site's design, then tell Claude 'build me a landing page using this design system' and it actually nails it because it has the exact tokens, scales, and component patterns."</blockquote>

<p><strong>명령 옵션 (작성자 명시):</strong></p>
<ul>
<li><code>designlang diff stripe.com vercel.com</code> — 두 사이트 비교</li>
<li><code>--depth 5</code> — 여러 페이지 크롤로 사이트 전체 시스템</li>
<li><code>--screenshots</code> — buttons·cards·nav의 PNG 캡처</li>
<li><code>--dark</code> — dark mode 추출</li>
<li><code>designlang history</code> — 디자인 변경 이력 추적</li>
</ul>

<p><strong>npx 사용법 (직접 인용):</strong></p>
<blockquote>"Works as an npx tool too: npx designlang https://stripe.com"</blockquote>

<p><strong>출력 8개 파일 (직접 인용):</strong></p>
<ul>
<li>AI-optimized markdown (feed it to ChatGPT/Claude and it recreates the design)</li>
<li>Tailwind config, CSS variables, React theme, shadcn/ui theme</li>
<li>Visual HTML preview you can open in your browser</li>
<li>Figma Variables JSON for designer handoff</li>
<li>W3C design tokens</li>
</ul>

<p><strong>GitHub</strong>: <code>github.com/Manavarya09/design-extract</code></p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 Claude Code에 "이 디자인 베낀 랜딩을 만들어줘"라 지시하면 LLM이 스크린샷만 보고 근사치 tokens을 지어내 일관성이 무너지는 문제가 있습니다. <strong>design-extract의 핵심</strong>은 <strong>AI-optimized markdown</strong>을 만들어 "LLM이 정확한 tokens·scales·component pattern을 직접 읽고 구성"하게 하는 것 — 휴먼 디자이너용 파일(Figma variables, Tailwind config)과 LLM용 파일(구조화된 md)을 같은 소스에서 동시에 뽑는 워크플로입니다. <code>--depth</code>로 사이트 전체 일관성을 잡고 <code>designlang history</code>로 시간에 따른 변화를 추적하는 것은 design system 운영 측면에서도 유용합니다. 다만 저작권·스타일 복제의 경계는 사용자가 판단해야 합니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>W3C design tokens</strong>: 일반적으로 플랫폼 중립 디자인 값(색·타이포·간격 등) 표준. 여러 도구 간 동기화에 자주 사용.</p>
<p><strong>shadcn/ui theme·Figma Variables</strong>: 일반적으로 각각 React 컴포넌트 생태계·Figma 디자인 시스템에서 value 교환을 위한 포맷.</p>
<p><strong>원문</strong>: <a href="https://www.reddit.com/r/ClaudeAI/comments/1sm23sp/i_built_a_claude_code_plugin_that_extracts_any/" class="source-link">r/ClaudeAI 원 스레드</a></p>
</div>
