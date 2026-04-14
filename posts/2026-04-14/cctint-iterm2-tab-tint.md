---
layout: default
title: "cctint — Claude Code 세션 상태에 따라 iTerm2 탭 배경을 tint하는 도구"
---

<a href="../2026-04-14" class="back-link">&larr; 4월 14일 목록</a>

# cctint — iTerm2 탭 tint

<div class="meta-line"><span class="tag tag-reddit">Reddit</span> 09:35 KST</div>

> 여러 Claude Code 세션을 동시에 열어둘 때 어떤 탭이 "지금 주의가 필요한지" 한눈에 보이도록 iTerm2 탭 배경 색을 상태에 따라 바꿔주는 작은 도구.

<div class="context-block">
<h4>출처 핵심 (Reddit 글에서 확인되는 내용만)</h4>

<p><strong>도구 이름·URL (candidate text에 링크 포함):</strong></p>
<ul>
<li>이름: <strong>cctint</strong></li>
<li>GitHub: <code>github.com/bschwitz3/cctint</code> (Reddit 글이 직접 링크)</li>
</ul>

<p><strong>기능 정의 (직접 인용):</strong></p>
<blockquote>"tints your iTerm2 tab background based on Claude Code's current state."</blockquote>

<p><strong>작성자 의도 (직접 인용):</strong></p>
<blockquote>"Nothing fancy, just makes it obvious at a glance which session needs attention when you have a bunch open."</blockquote>

<p><strong>참고</strong>: 어떤 "상태"에 어떤 색을 매핑하는지, 설치 명령, 지원 OS/iTerm 버전 등 세부는 candidate text가 잘려 이 기사 출처 범위에서 확인되지 않음.</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 여러 Claude Code 세션을 동시에 굴리면 어느 세션이 질문 대기 중인지, 어느 세션이 tool 실행 중인지 tab 제목만으로는 구분이 어렵습니다. <strong>색으로 상태를 부호화</strong>하는 것은 visual workload를 낮추는 단순하지만 실용적 접근입니다. 같은 아이디어를 Claude Code Hooks(PostToolUse 등)와 iTerm AppleScript API로 확장하면 커스텀 대시보드를 경량으로 구축할 수 있습니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>iTerm2 탭 tint API</strong>: 일반적으로 iTerm2는 AppleScript와 Python API로 탭 배경색을 변경할 수 있습니다. 외부 스크립트가 Claude Code의 상태 신호(예: Hooks)를 받아 AppleScript를 호출하는 방식이 자연스럽습니다.</p>
<p><strong>원문</strong>: <a href="https://www.reddit.com/r/ClaudeAI/comments/1sks2is/how_i_stay_focused_across_multiple_claude_code/" class="source-link">r/ClaudeAI 원 스레드</a></p>
</div>
