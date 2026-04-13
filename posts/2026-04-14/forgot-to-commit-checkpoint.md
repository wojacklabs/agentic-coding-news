---
layout: default
title: "Forgot to commit? — Claude Code 도구 호출 직전 shadow repo 체크포인트 hook"
---

<a href="../2026-04-14" class="back-link">&larr; 4월 14일 목록</a>

# Shadow Repo Checkpoint Hook

<div class="meta-line"><span class="tag tag-reddit">Reddit</span> 06:41 KST</div>

> Claude Code의 Edit/MultiEdit 등 설정된 도구가 실행되기 직전에 외부 shadow repo에 체크포인트를 남기는 recovery 레이어. "커밋 안 하고 진행했는데 망가진" 상황 복구용.

<div class="context-block">
<h4>출처 핵심 (Reddit 글에서 확인되는 내용만)</h4>

<p><strong>도구 정의 (직접 인용):</strong></p>
<blockquote>"I built a small recovery layer for Claude Code. It keeps a shadow repo outside your checkout and checkpoints before configured Claude tools run"</blockquote>

<p><strong>예시 트리거 도구</strong> (candidate text에서 일부 노출):</p>
<ul>
<li><code>Edit(*)</code></li>
<li><code>Mul...</code> (잘림 — 일반적으로 <code>MultiEdit</code> 계열로 보이나 candidate text 범위에서 단어가 끊김)</li>
</ul>

<p><strong>동작 원리</strong>: shadow repo는 사용자의 실제 checkout 외부에 위치 → 사용자가 git을 직접 건드리지 않아도 변경 직전 스냅샷을 남김.</p>

<p><strong>참고</strong>: 도구 이름·GitHub URL·전체 트리거 도구 목록은 candidate text가 잘려 이 기사 출처 범위에서 확인되지 않음.</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 Claude Code의 자동 편집(<code>Edit</code>, <code>MultiEdit</code> 등)은 git history와 별개로 진행되어, 사용자가 commit을 깜빡하면 직전 상태 복구가 어렵습니다. <strong>shadow repo + Hook 트리거</strong> 패턴은 사용자의 워크플로우에 영향 없이 안전망을 까는 방식으로, 이전 fabrication 룰의 "checkpoint 강제"와 같은 목적을 자동화한 사례로 보입니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>Claude Code Hooks와의 결합</strong>: 일반적으로 PreToolUse hook을 활용하면 특정 도구가 실행되기 직전 임의 스크립트를 트리거할 수 있으므로, 이 도구는 PreToolUse 기반으로 보입니다(정확한 구현은 candidate text에서 확인 불가).</p>
<p><strong>원문</strong>: <a href="https://www.reddit.com/r/ClaudeAI/comments/1sko8a0/forgot_to_commit/" class="source-link">r/ClaudeAI 원 스레드</a></p>
</div>
