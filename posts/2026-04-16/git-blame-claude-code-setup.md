---
layout: default
title: "Git blame your Claude Code setup — ~/.claude을 git으로 버전 관리해 skills·agents·hooks 이력 추적"
---

<a href="../2026-04-16" class="back-link">&larr; 4월 16일 목록</a>

# ~/.claude을 dev project처럼 관리

<div class="meta-line"><span class="tag tag-hn">HN</span> 15:47 KST</div>

> <code>git init ~/.claude</code>로 Claude Code 설정을 버전 관리. <code>.gitignore</code>로 cache·debug·telemetry·history·plugins 제외. skills·agents·hooks·CLAUDE.md는 항상 커밋, settings.json·statusline은 조건부 커밋. 여러 컴퓨터 동기화 + 문제 skill을 바로 revert 가능. Omar Ali Khan, posted 2026-04-16, HN (47788707).

<div class="context-block">
<h4>출처 핵심 (breaking-changes.blog에서 확인되는 내용만)</h4>

<p><strong>작성자</strong>: Omar Ali Khan, posted 2026-04-16.</p>

<p><strong>핵심 주장 (직접 인용):</strong></p>
<blockquote>"save your Claude skills and more to git"</blockquote>

<p><strong>기대 효과 (블로그 기반 요약):</strong></p>
<ul>
<li>여러 컴퓨터 간 setup 동기화</li>
<li>skill을 iterative하게 개발</li>
<li>문제 있는 변경을 revert</li>
</ul>

<p><strong>셋업 명령 (블로그):</strong></p>
<pre><code>git init ~/.claude
# .gitignore 작성
# 프라이빗 원격에 push
# 다른 머신에서 pull/push로 동기화</code></pre>

<p><strong>디렉토리 분류 (블로그 트리 요약):</strong></p>
<ul>
<li><strong>항상 커밋</strong>: <code>CLAUDE.md</code>, <code>skills/</code>, <code>commands/</code>, <code>agents/</code>, <code>hooks/</code></li>
<li><strong>조건부 커밋</strong>: <code>settings.json</code>, <code>statusline-command.sh</code></li>
<li><strong>커밋 금지</strong>: <code>cache/</code>, <code>debug/</code>, <code>file-history/</code>, <code>telemetry/</code>, <code>history.jsonl</code>, <code>plugins/</code></li>
</ul>

<p><strong>skill 공유성 (블로그 인용):</strong></p>
<p>저자는 skill을 "다른 사람과 공유" 가능하고, "other harnesses에서 symlink로 재사용" 가능하다고 명시 — "skills are now an open standard"라는 전제.</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 Claude Code 사용자는 <code>~/.claude/</code>를 "설정 폴더"로만 취급해왔지만, 이번 주 다룬 주제들(Cherny 공식 진단의 "skills 과다 로드", PSA audit의 "170 agents ghosts", lazy-loading skills로 1K 절감)은 모두 <strong>"이 폴더를 적극 관리해야 하는 코드 자산"</strong>임을 시사합니다. 이 글은 그 관리 패턴으로 <strong>git 버전관리</strong>를 제안 — 커밋 분류(항상/조건부/금지)와 <code>plugins/</code>·<code>cache/</code> 제외가 핵심 실무 팁. <code>plugins/</code>를 "절대 커밋 금지"로 둔 건 플러그인 마켓이 자체적으로 업데이트되기 때문에 로컬 스냅샷이 오히려 충돌을 만들 수 있다는 함의. Notch Pilot이 <code>settings.json</code>을 자동 편집하는 시나리오(어제 tick 4)를 생각하면 "조건부" 분류가 딱 맞아떨어집니다 — 자동 도구가 건드리는 파일은 상황에 따라 선택 커밋. <strong>claude-code-system-prompts 같은 비공식 diff 레포와 결합</strong>하면 "나의 설정 변경" + "공식 버전의 system prompt 변경"을 동시에 추적하는 관찰 체계를 완성할 수 있습니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>~/.claude/ 구조</strong>: 일반적으로 Claude Code의 사용자 설정 디렉토리로, skills·commands·agents·hooks·settings.json·cache·history 등이 저장됨.</p>
<p><strong>plugins/ vs skills/</strong>: 일반적으로 plugins는 외부 마켓/registry에서 설치된 번들, skills는 사용자가 자유롭게 추가 가능한 .md 기반 가이드. plugins는 자체 업데이트 수명주기를 가짐.</p>
<p><strong>statusline-command.sh</strong>: 일반적으로 Claude Code TUI의 하단 statusline에 표시될 내용을 생성하는 사용자 스크립트.</p>
<p><strong>원문</strong>: <a href="https://breaking-changes.blog/treat-your-claude-code-setup-like-a-dev-project/" class="source-link">breaking-changes.blog/treat-your-claude-code-setup-like-a-dev-project</a></p>
<p><strong>HN discussion</strong>: <a href="https://news.ycombinator.com/item?id=47788707" class="source-link">news.ycombinator.com/item?id=47788707</a></p>
</div>
