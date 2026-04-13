---
layout: default
title: "Claude의 Bash 도구를 뺏었다 — harness 가드가 뚫리던 원인 사용기"
---

<a href="../2026-04-14" class="back-link">&larr; 4월 14일 목록</a>

# Bash 도구 제한 — 사용기

<div class="meta-line"><span class="tag tag-reddit">Reddit</span> 03:34 KST</div>

> Claude Code의 harness를 단단히 짰다고 생각했는데 금지된 동작이 계속 뚫려서, 결국 Bash 도구를 빼버린 사용기. path-specific rules가 <code>Read</code> 트리거로 걸어둔 제약을 Bash가 우회하는 패턴을 지적.

<div class="context-block">
<h4>출처 핵심 (Reddit 글에서 확인되는 내용만)</h4>

<p><strong>문제 상황 (직접 인용):</strong></p>
<blockquote>"I thought I had Claude Code locked into a solid harness. But things kept slipping through that should have been prohibited, and finally I realized why..."</blockquote>

<p><strong>지적된 구체적 메커니즘:</strong></p>
<ul>
<li>작성자는 <code>Read</code> 툴에 걸리도록 <a href="https://code.claude.com/docs/en/memory#path-specific-rules" class="source-link">path-specific rules</a>(Claude Code 공식 문서 링크)를 정의</li>
<li>그런데 에이전트가 Bash를 선호해 Read를 우회 → rules가 안 걸림</li>
<li>작성자의 결론: "Agents *really* love Bash"</li>
</ul>

<p><strong>해결책</strong>: Bash 도구 자체를 빼는 방식으로 처리. (글 본문 후속 세부 내용은 candidate text에서 잘렸으며, 이 기사 출처 범위에서는 "Bash를 뺐다"는 결론까지만 확인됨.)</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 Claude Code의 보안·운영 룰은 파일 단위(<code>Read</code>, <code>Edit</code>)에 걸리는데, <strong>Bash 명령 한 줄로 동일 파일에 접근하면 룰이 잘 걸리지 않는</strong> 구조적 취약점이 있습니다. 이 사용기는 그 갭을 공식 문서(path-specific rules)와 함께 구체적으로 지적한 점에서 운영 룰을 짤 때 참고할 만합니다. 완전한 해법이 "Bash 제거"라는 점은 tradeoff가 크므로, 팀마다 Bash 허용 범위와 rule coverage를 점검하는 실마리로 삼는 것이 좋아 보입니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>path-specific rules</strong>: 일반적으로 Claude Code의 CLAUDE.md/memory 시스템에서 파일 경로 패턴에 따라 다른 행동 룰을 정의하는 기능. 작성자가 공식 문서 링크를 인용한 <a href="https://code.claude.com/docs/en/memory#path-specific-rules" class="source-link">공식 메모리 문서</a> 참조.</p>
<p><strong>원문</strong>: <a href="https://www.reddit.com/r/ClaudeAI/comments/1skd722/i_had_to_take_away_claudes_bash_tool_it_kept/" class="source-link">r/ClaudeAI 원 스레드</a></p>
</div>
