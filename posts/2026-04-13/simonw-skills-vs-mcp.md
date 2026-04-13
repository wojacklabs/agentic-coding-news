---
layout: default
title: "Simon Willison — Claude Skills가 MCP보다 더 큰 일일 수 있다"
---

<a href="../2026-04-13" class="back-link">&larr; 4월 13일 목록</a>

# Skills > MCP? Simon Willison의 분석

<div class="meta-line"><span class="tag tag-hn">HN</span> 19:02 KST</div>

> Simon Willison이 Claude Skills를 "MCP보다 더 큰 일일 수 있다"며 토큰 효율, 포맷 단순성, 생성 용이성 측면에서 분석. HN에서 Anthropic 공식 공지와 나란히 주목.

<div class="context-block">
<h4>출처 핵심 (Simon Willison 블로그에서 확인되는 주장만)</h4>

<p><strong>단순성에 대한 직접 인용:</strong></p>
<blockquote>"The core simplicity of the skills design is why I'm so excited about it."</blockquote>

<p><strong>포맷 비교:</strong></p>
<ul>
<li>MCP는 "a whole protocol specification"으로 여러 컴포넌트를 커버</li>
<li>Skills는 "Markdown with a tiny bit of YAML metadata"</li>
</ul>

<p><strong>토큰 비용 비교 (직접 인용):</strong></p>
<blockquote>"GitHub's official MCP on its own famously consumes tens of thousands of tokens of context."</blockquote>
<p>Skills는 반대로 "a few dozen extra tokens"만 쓴다고 함 — 상세 내용은 필요할 때만 로드되기 때문.</p>

<p><strong>Willison이 지적한 4가지 차이:</strong></p>
<ol>
<li><strong>Architecture</strong> — Skills는 기존 코딩 환경을 활용, MCP는 별도 프로토콜 구현 필요</li>
<li><strong>Portability</strong> — Skills는 Codex CLI, Gemini CLI 등 다른 모델·도구에서도 특별 구현 없이 작동</li>
<li><strong>Ease of creation</strong> — CLI 도구 필요 없음, 마크다운 파일만 드롭</li>
<li><strong>Token cost</strong> — MCP 구현보다 훨씬 낮은 오버헤드</li>
</ol>

<p><strong>예측 (직접 인용):</strong></p>
<blockquote>"I expect we'll see a Cambrian explosion in Skills which will make this year's MCP rush look pedestrian by comparison."</blockquote>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 기술 영역에서 Simon Willison은 신기술을 초기부터 분석해 온 해설자 중 하나로 평가됩니다. 그가 "MCP rush보다 더 큰 폭발"을 예측했다는 사실 자체가 업계 관점을 형성할 수 있습니다. 특히 "MCP의 토큰 오버헤드가 수만 토큰"이라는 관찰은 MCP를 다수 연결한 환경에서 실제 체감되는 부담으로, Skills의 "필요 시 로드" 설계가 이 문제를 해소할 수 있는지는 앞으로의 검증 지점입니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>Skills와 MCP의 상보성 여부</strong>: Willison은 둘 중 하나가 이긴다기보다 각자 다른 유스케이스에 적합할 것으로 보이는 관찰을 제시합니다. 결론이 난 상태는 아니며, 커뮤니티의 실제 사용 데이터가 쌓이면서 자리를 잡을 가능성이 큽니다.</p>
<p><strong>원문</strong>: <a href="https://simonwillison.net/2025/Oct/16/claude-skills/" class="source-link">simonwillison.net/2025/Oct/16/claude-skills/</a></p>
</div>
