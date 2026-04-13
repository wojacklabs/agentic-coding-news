---
layout: default
title: "CLAUDE.md를 정리했더니 에이전트 세션이 눈에 띄게 빨라졌다 — 사용기"
---

<a href="../2026-04-14" class="back-link">&larr; 4월 14일 목록</a>

# CLAUDE.md Cleanup 사용기

<div class="meta-line"><span class="tag tag-reddit">Reddit</span> 06:41 KST</div>

> Claude Code 데일리 사용자가 CLAUDE.md를 정리한 뒤 에이전트의 redundant tool 호출이 줄고 세션이 빨라졌다는 사용기. <code>awesome-claude-code</code> 레포를 참조해 best practice 적용.

<div class="context-block">
<h4>출처 핵심 (Reddit 글에서 확인되는 내용만)</h4>

<p><strong>작성자 배경 (직접 인용):</strong></p>
<blockquote>"Been using Claude Code daily for a few months. Sessions felt off, agents doing redundant tool calls, burning time on files that clearly weren't there, re-inferring stuff I'd already told it."</blockquote>

<p><strong>참고한 자료</strong>: <code>awesome-claude-code</code> 레포지토리 — Reddit 글이 명시적으로 링크.</p>

<p><strong>결과 주장</strong>: 정리 후 "agent sessions got noticeably faster" (제목).</p>

<p><strong>참고</strong>: 작성자가 구체적으로 무엇을 제거·유지했는지의 항목 리스트는 candidate text가 잘려 이 기사 출처 범위에서 확인되지 않음. 제목은 "here's what I removed"이라고 약속하지만, 본문 상세는 잘림.</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 CLAUDE.md는 "더 많이 적을수록 좋다"는 직관과 반대로 <strong>긴 CLAUDE.md가 컨텍스트를 무겁게 만들어 redundant 탐색·재추론을 유발</strong>한다는 보고가 누적되어 왔습니다. 이 사용기는 그 가설을 일치시키는 사례로, "한 번 정리하고 어떤 항목이 redundant tool 호출의 트리거였는지 확인"하는 운영 루틴이 가치 있을 수 있음을 시사합니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>awesome-claude-code</strong>: 일반적으로 GitHub의 awesome-* 시리즈 중 Claude Code 관련 도구·패턴·CLAUDE.md 예시를 큐레이션한 레포로 알려짐. 정확한 URL은 candidate text가 잘려 이 기사에서 별도 명시하지 않음.</p>
<p><strong>원문</strong>: <a href="https://www.reddit.com/r/ClaudeAI/comments/1skn98k/cleaned_up_my_claudemd_and_my_agent_sessions_got/" class="source-link">r/ClaudeAI 원 스레드</a></p>
</div>
