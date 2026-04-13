---
layout: default
title: "eslint-plugin-ai-guard — Claude가 자주 생성하는 'AI slop' 패턴 차단 룰"
---

<a href="../2026-04-14" class="back-link">&larr; 4월 14일 목록</a>

# eslint-plugin-ai-guard

<div class="meta-line"><span class="tag tag-reddit">Reddit</span> 03:34 KST</div>

> Claude가 반복적으로 생성하는 empty catch, floating promise, await in loop, SQL string concat 등 패턴을 ESLint 단계에서 차단하는 오픈소스 플러그인.

<div class="context-block">
<h4>출처 핵심 (Reddit 글에서 확인되는 내용만)</h4>

<p><strong>작성자가 지적한 Claude 반복 생성 패턴:</strong></p>
<ul>
<li>empty catch blocks</li>
<li>floating promises</li>
<li><code>await</code> inside loops</li>
<li>SQL string concatenation</li>
<li>missing auth middleware</li>
<li>unsafe <code>JSON.parse()</code></li>
<li>hardcoded secrets</li>
</ul>

<p><strong>배경 주장 (직접 인용):</strong></p>
<blockquote>"Claude is incredibly powerful, but it keeps generating the same frustrating patterns over and over"</blockquote>

<p><strong>도구 이름</strong>: <strong>eslint-plugin-ai-guard</strong>. ESLint 플러그인 형태로 배포됨.</p>

<p><strong>참고</strong>: Reddit 글 본문은 candidate text에서 잘려있음. GitHub URL·설치 명령·정확한 룰 개수 등 상세 정보는 이 기사 출처 범위에 포함되지 않음.</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 Claude Code가 생성한 코드를 그대로 커밋할 때 가장 흔한 문제는 "일견 돌아가지만 프로덕션에서 터질" 패턴들입니다. 프롬프트로 막는 것보다 <strong>ESLint 같은 결정적 도구로 pre-commit 단계에서 차단</strong>하는 접근이 더 견고할 수 있습니다. 이 플러그인의 구체 룰 목록은 이미 Anthropic/HN에서 논의되던 "AI slop" 전형과 겹쳐서, CLAUDE.md에 금지 룰을 나열하기보다 ESLint로 강제하는 것이 유리한 패턴 후보들을 요약해 줍니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>ESLint 플러그인 패턴</strong>: 일반적으로 <code>eslint-plugin-*</code> 네이밍으로 배포되며, <code>.eslintrc</code>에서 <code>plugins</code>와 <code>rules</code>로 추가 룰을 활성화합니다.</p>
<p><strong>원문</strong>: <a href="https://www.reddit.com/r/ClaudeAI/comments/1skbdsc/stop_claude_from_generating_the_same_ai_slop_over/" class="source-link">r/ClaudeAI 원 스레드</a></p>
</div>
