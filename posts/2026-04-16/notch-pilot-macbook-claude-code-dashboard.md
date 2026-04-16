---
layout: default
title: "Notch Pilot — MacBook 노치를 Claude Code 대시보드로, permission inline·세션 퍼센트·활동 heatmap 로컬 실행"
---

<a href="../2026-04-16" class="back-link">&larr; 4월 16일 목록</a>

# Notch Pilot — Notch as Claude Code Dashboard

<div class="meta-line"><span class="tag tag-reddit">Reddit</span> 09:47 KST</div>

> MacBook 상단 notch에 Claude Code 상태·permission prompt·세션 % 실시간 표시 — 메뉴바 아이콘·dock 아이콘 없이 notch에만. Anthropic usage 엔드포인트만 호출, 전부 로컬. <code>brew install --cask notch-pilot</code>. r/ClaudeAI posted 2026-04-16 08:04 KST.

<div class="context-block">
<h4>출처 핵심 (Reddit selftext에서 확인되는 내용만)</h4>

<p><strong>배치 (직접 인용):</strong></p>
<blockquote>"Notch Pilot lives in the MacBook notch (no menu bar icon, no dock icon)"</blockquote>

<p><strong>표시 항목 (직접 인용):</strong></p>
<ul>
<li>"Live 5-hour session % + weekly limits — the exact numbers from your Claude account page, pulled from the same oauth/usage endpoint Claude Code uses."</li>
<li>"Permission prompts rendered inline — shell commands get a code block, file edits get a red/green diff, URLs get parsed. Deny / Allow / Always allow, with 'always allow' writing to ~/.claude/settings.json."</li>
<li>"Every live session at a glance — project, model, uptime, permission mode. Click to see the activity timeline. Click the arrow to jump to the hosting terminal."</li>
<li>"A buddy that reacts to what Claude is doing — six styles, six colors, seven expressions. Shocked red eyes when it detects `rm -rf /` or `DROP TABLE`."</li>
<li>"24h activity heatmap with day-by-day history."</li>
</ul>

<p><strong>프라이버시 (직접 인용):</strong></p>
<blockquote>"Everything runs locally. No analytics, no telemetry. Only network call is Anthropic's own usage endpoint (which Claude Code already hits on your behalf)."</blockquote>

<p><strong>설치</strong>:</p>
<pre><code>brew tap devmegablaster/devmegablaster
brew install --cask notch-pilot</code></pre>

<p><strong>GitHub</strong>: <code>github.com/devmegablaster/Notch-Pilot</code></p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 Claude Code 사용자는 세션 % 확인·permission 승인을 각각 다른 경로(터미널·계정 페이지·settings.json)로 처리하지만, Notch Pilot은 <strong>"MacBook 노치"라는 디스플레이 상 always-visible 영역에 이를 통합</strong>한 접근입니다. 특히 <strong>"always allow"가 <code>~/.claude/settings.json</code>에 자동 기록</strong>되는 연동은 이미 settings.json을 수동 편집하던 파워유저 워크플로와 잘 맞습니다. <code>rm -rf /</code>·<code>DROP TABLE</code> 감지 시 시각적 경고는 최근 Boris Cherny 답변에서 강조된 "surprise token usage"보다 한 단계 앞의 "surprise destructive action" 방어에 집중한 점이 차별점. CodeBurn·notch pilot 같은 3rd party 툴이 Anthropic usage 엔드포인트를 직접 긁어쓰는 사례가 늘면서, <strong>공식 read API로 정식 개방될지</strong>가 다음 관찰 포인트. Windows/Linux는 노치가 없어 포팅 가능성 확인은 이 기사 범위 밖.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>MacBook notch</strong>: 일반적으로 2021 이후 MacBook Pro 상단 카메라 구역. 일부 앱이 이 공간을 UI 영역으로 활용.</p>
<p><strong>~/.claude/settings.json</strong>: 일반적으로 Claude Code가 permission·허용 명령 등을 저장하는 사용자 설정 파일. <code>allowedTools</code>·prompt 허가 규칙이 여기 기록.</p>
<p><strong>Claude 계정 usage 엔드포인트</strong>: 일반적으로 OAuth 세션으로만 접근되는 비공식 내부 API. 공식 SDK 제공 여부는 이 기사 범위 밖.</p>
<p><strong>원문</strong>: <a href="https://www.reddit.com/r/ClaudeAI/comments/1smm0mo/i_turned_my_macbook_notch_into_a_live_claude_code/" class="source-link">r/ClaudeAI 원 스레드</a></p>
</div>
