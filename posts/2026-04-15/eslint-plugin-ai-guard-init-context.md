---
layout: default
title: "eslint-plugin-ai-guard — 17 rules + <code>npx ai-guard init-context</code>로 CLAUDE.md 자동 생성"
---

<a href="../2026-04-15" class="back-link">&larr; 4월 15일 목록</a>

# eslint-plugin-ai-guard — 17 Rules + init-context

<div class="meta-line"><span class="tag tag-reddit">Reddit</span> 00:50 KST</div>

> Claude가 반복적으로 생성하는 7가지 패턴(empty catch, floating promises 등)을 잡아내는 ESLint 플러그인. v2에서 <code>npx ai-guard init-context</code>로 CLAUDE.md·.cursorrules·.github/copilot-instructions.md를 자동 생성. 1주 만에 1,200+ 다운로드. r/ClaudeAI score 7.

<div class="context-block">
<h4>출처 핵심 (Reddit 글에서 확인되는 내용만)</h4>

<p><strong>작성자가 지적한 Claude 반복 패턴 (직접 인용):</strong></p>
<blockquote>"empty catch blocks, floating promises, <code>await</code> inside loops, SQL string concatenation, missing auth middleware, unsafe <code>JSON.parse()</code>, hardcoded secrets, and more."</blockquote>

<p><strong>도구 구성:</strong></p>
<ul>
<li>이름: <strong>eslint-plugin-ai-guard</strong></li>
<li>형태: ESLint 플러그인 + zero-config CLI (<code>npx ai-guard run</code>)</li>
<li>룰 개수: <strong>17 targeted rules</strong></li>
</ul>

<p><strong>새 기능 — proactive init-context (직접 인용):</strong></p>
<pre><code>npx ai-guard init-context</code></pre>
<blockquote>"This single command asks which AI agents you use and instantly creates instruction files that Claude, Cursor, and GitHub Copilot read automatically:</blockquote>
<ul>
<li><code>CLAUDE.md</code> → Claude Code reads it natively</li>
<li><code>.cursorrules</code> → Cursor reads it natively</li>
<li><code>.github/copilot-instructions.md</code> → GitHub Copilot reads it natively</li>
</ul>

<p><strong>의도 전환:</strong></p>
<blockquote>"Now your AI agent is taught the 17 rules before it writes any code instead of you fixing lint errors afterwards."</blockquote>

<p><strong>다운로드 수치</strong>: "Already at 1,200+ downloads in the first week with zero marketing."</p>

<p><strong>GitHub</strong>: <a href="https://github.com/YashJadhav21/eslint-plugin-ai-guard" class="source-link">github.com/YashJadhav21/eslint-plugin-ai-guard</a></p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 "AI 생성 코드 품질" 문제는 두 가지 접근이 가능합니다. (1) 사후 lint로 잡기 (2) 사전 instruction으로 막기. ai-guard는 <strong>같은 룰셋을 두 층에서 동시에 적용</strong>하는 방식으로 "사전 + 사후" 일관성을 확보합니다. 특히 <code>init-context</code>가 CLAUDE.md·.cursorrules·copilot-instructions.md 세 파일을 동시에 생성해 멀티 에이전트 환경에서 룰 스플릿을 방지한다는 점이 실무적입니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>AI 에이전트별 instruction 파일 관행</strong>: 일반적으로 Claude Code는 <code>CLAUDE.md</code>·<code>agents.md</code>, Cursor는 <code>.cursorrules</code>, GitHub Copilot은 <code>.github/copilot-instructions.md</code>를 자동 인식. 각 파일이 따로 관리되면 룰 드리프트가 발생하기 쉬움.</p>
<p><strong>원문</strong>: <a href="https://www.reddit.com/r/ClaudeAI/comments/1skbdsc/stop_claude_from_generating_the_same_ai_slop_over/" class="source-link">r/ClaudeAI 원 스레드</a></p>
</div>
