---
layout: default
title: "Ask HN — CLAUDE.md / agents.md에서 가장 효과 있던 한 줄 컬렉션"
---

<a href="../2026-04-13" class="back-link">&larr; 4월 13일 목록</a>

# CLAUDE.md 베스트 한 줄 모음

<div class="meta-line"><span class="tag tag-hn">HN</span> 17:34 KST</div>

> "당신의 CLAUDE.md / agents.md에 넣은 줄 중 가장 효과 좋았던 한 줄은?" — HN 커뮤니티가 자신의 실전 규칙을 공유. 모호성을 제거하는 "계획 강제" 패턴이 압도적 다수.

일반적인 "good coding" 조언이 아니라, 실제로 에이전트가 자주 실패하던 지점을 막기 위해 쓰인 **구체적 한 줄들**이 특히 실용적입니다.

<div class="context-block">
<h4>실전 — 반복 등장하는 고효율 한 줄 패턴</h4>
<p><strong>1. 계획 강제 (가장 인기):</strong></p>
<pre><code>CRITICAL: Always make a detailed plan with sections for
Analysis, Approach, Steps, and Verification before writing any code.</code></pre>
<p>→ LLM이 작업 규모를 먼저 인정하게 해 "just fix it" 엉뚱 수정 방지.</p>

<p><strong>2. 불확실성 선언 강제:</strong></p>
<pre><code>If you are unsure about any API, file location, or user intent,
stop and ask rather than guessing.</code></pre>
<p>→ hallucination 감소. "추정 대신 질문" 규칙.</p>

<p><strong>3. 검증 gate:</strong></p>
<pre><code>Before declaring a task complete, run the exact command listed
in TEST_COMMAND and paste the output.</code></pre>
<p>→ "다 됐습니다" 거짓 완료 방지.</p>

<p><strong>4. 범위 제한:</strong></p>
<pre><code>Change only the lines that trace directly to the request.
Do not reformat, rename, or refactor adjacent code.</code></pre>
<p>→ 무관한 diff 확산 차단.</p>

<p><strong>5. 롤백 지점 체크포인트:</strong></p>
<pre><code>Before any non-trivial change: git add -A && git commit -m "checkpoint: &lt;what&gt;".
When an approach fails, revert to the last checkpoint.</code></pre>
<p>→ 실패한 접근 잔재 방지.</p>
</div>

<div class="context-block">
<h4>왜 중요한가</h4>
<p>CLAUDE.md는 <strong>팀의 "운영 노하우"가 축적되는 유일한 위치</strong>. 일반적 조언("good code를 써라")은 효과가 없고, <em>과거에 구체적으로 실패한 지점을 막는 한 줄</em>이 효과적. HN 스레드는 이런 "상처로 학습한 규칙"의 집단 공유장. 자신의 CLAUDE.md를 주기적으로 업데이트하지 않으면 같은 실수를 반복합니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>CLAUDE.md 로딩 순서</strong>: 전역(<code>~/.claude/CLAUDE.md</code>) → 프로젝트 루트(<code>CLAUDE.md</code>) → 상위 디렉토리까지 자동 merge. 세션마다 실제로 Claude의 컨텍스트에 주입됨.</p>
<p><strong>agents.md</strong>: 여러 에이전트 플랫폼(Cursor, Codex 포함)에서 호환되는 범용 명칭. Claude Code는 <code>CLAUDE.md</code>와 <code>agents.md</code> 모두 자동 인식. <a href="https://news.ycombinator.com/item?id=47465415" class="source-link">Ask HN 원 스레드</a></p>
</div>
