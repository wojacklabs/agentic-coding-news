---
layout: default
title: "Revdiff — 터미널에서 diff에 inline annotation 달고 AI 에이전트로 즉시 돌려보내는 TUI"
---

<a href="../2026-04-14" class="back-link">&larr; 4월 14일 목록</a>

# Revdiff — TUI Diff Reviewer

<div class="meta-line"><span class="tag tag-hn">HN</span> 18:37 KST</div>

> AI 에이전트가 생성한 코드 변경을 터미널에서 리뷰·어노테이트한 뒤, 결과를 stdout으로 내보내 같은 에이전트에 다시 피드백하는 TUI. Claude Code 전용 플러그인 포함.

<div class="context-block">
<h4>출처 핵심 (GitHub README에서 확인되는 내용만)</h4>

<p><strong>도구 정의 (직접 인용):</strong></p>
<blockquote>"TUI for reviewing diffs, files, and documents with inline annotations. Outputs structured annotations to stdout on quit, making it easy to pipe results into AI agents, scripts, or other tools."</blockquote>

<p><strong>설치:</strong></p>
<ul>
<li>Homebrew: <code>brew install umputun/apps/revdiff</code></li>
<li>Arch Linux (AUR): <code>paru -S revdiff</code></li>
<li>Binary: GitHub Releases에서 Debian/RPM/Linux/Darwin 각종 아키텍처</li>
</ul>

<p><strong>핵심 기능:</strong></p>
<ul>
<li>Full-file diff view + syntax highlighting</li>
<li>Intra-line word-diff 하이라이트 (<code>W</code>로 토글)</li>
<li>collapsed diff 모드, word wrap</li>
<li>line number + blame gutter</li>
<li>Vim 스타일 검색 (<code>/</code>, <code>n</code>, <code>N</code>) + hunk navigation</li>
<li>annotation 리스트 팝업 (<code>@</code> 키)</li>
<li>annotated 파일만 트리 필터</li>
<li>Markdown TOC 네비게이션 (단일 파일 검토용)</li>
<li><code>--all-files</code>로 git-tracked 전체 리뷰</li>
<li>Mercurial 자동 감지</li>
</ul>

<p><strong>Claude Code 통합 (README 상 "dedicated Claude Code plugin"):</strong></p>
<ul>
<li>Uncommitted/staged/branch diff 자동 감지</li>
<li>tmux·Zellij·kitty·wezterm 등 멀티플렉서 안에서 overlay로 실행</li>
<li>어노테이션을 캡처해 Claude에 피드백</li>
<li>"annotate → plan → fix → re-review" 루프 지원</li>
</ul>

<p><strong>설치 (Claude Code):</strong></p>
<pre><code>/plugin marketplace add umputun/revdiff
/plugin install revdiff@umputun-revdiff</code></pre>

<p>사용: <code>/revdiff</code> 또는 자연어 "review diff HEAD~1".</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 Claude Code가 생성한 코드 diff를 리뷰할 때, "어느 줄이 문제다"라는 피드백을 다시 에이전트에 전달하려면 스크린샷이나 텍스트 복사 등 번거로운 수동 작업이 필요합니다. Revdiff처럼 <strong>annotation → stdout → 에이전트 파이프</strong>를 한 줄로 이어주는 TUI는 리뷰 루프를 터미널 안에 가두는 점에서 속도상 유리합니다. Claude Code 전용 플러그인 형태를 제공한다는 점도 기존 플러그인 marketplace 흐름과 맞닿아 있습니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>annotate → pipe → AI 패턴</strong>: 일반적으로 개발자가 diff에 코멘트를 남기는 워크플로우는 GitHub PR 리뷰 UI에 종속돼 있었습니다. 터미널에서 같은 경험을 제공하고 결과를 stdout으로 즉시 재활용하는 방식은 에이전트 시대의 리뷰 루프 특화 패턴입니다.</p>
<p><strong>원문</strong>: <a href="https://github.com/umputun/revdiff" class="source-link">github.com/umputun/revdiff</a></p>
<p><strong>HN discussion</strong>: <a href="https://news.ycombinator.com/item?id=47742437" class="source-link">news.ycombinator.com/item?id=47742437</a></p>
</div>
