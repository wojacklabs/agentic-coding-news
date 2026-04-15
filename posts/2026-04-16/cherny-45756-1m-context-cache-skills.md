---
layout: default
title: "Boris Cherny의 issue #45756 답변 — 1M context가 쿼터 위험, 400k 기본값 검토 중·skills/plugins 과다 로드도 원인"
---

<a href="../2026-04-16" class="back-link">&larr; 4월 16일 목록</a>

# Claude Code 팀 공식 진단 — Quota Exhaustion

<div class="meta-line"><span class="tag tag-reddit">Reddit</span> 06:47 KST</div>

> "Pro Max 5x Quota Exhausted in 1.5 Hours" issue #45756에 Boris Cherny(Claude Code 팀)가 원인 2가지를 공식 지목: (1) 1M context window + 1시간 prompt cache 조합에서 세션이 stale해질 때 full cache miss가 비싸다, (2) skills·subagents·background automation 대량 로드가 surprise token 소비. 400k 기본값 전환 검토 중, <code>CLAUDE_CODE_AUTO_COMPACT_WINDOW=400000 claude</code>로 미리 시험 가능. r/ClaudeAI score 280, 84 comments, posted 2026-04-13.

<div class="context-block">
<h4>출처 핵심 (GitHub issue #45756 Boris Cherny 공식 comment + Reddit에서 확인되는 내용만)</h4>

<p><strong>comment URL</strong>: <code>github.com/anthropics/claude-code/issues/45756#issuecomment-4231739206</code>, posted 2026-04-12T14:51:49Z.</p>

<p><strong>공식 진단 1 — 1M context + cache TTL 조합 (직접 인용):</strong></p>
<blockquote>"Prompt cache misses when using 1M token context window are expensive. Since Claude Code uses a 1 hour prompt cache window for the main agent, if you leave your computer for over an hour then continue a stale session, it's often a full cache miss."</blockquote>

<p><strong>대응 방향 (직접 인용):</strong></p>
<blockquote>"To improve this, we have shipped a few UX improvements (eg. to nudge you to /clear before continuing a long stale session), and are investigating defaulting to 400k context instead, with an option to configure your context window to up to 1M if preferred. To experiment with this now, try: CLAUDE_CODE_AUTO_COMPACT_WINDOW=400000 claude."</blockquote>

<p><strong>공식 진단 2 — skills / agents / automation 과다 로드 (직접 인용):</strong></p>
<blockquote>"People pulling in a large number of skills, or running many agents or background automations, which sometimes happens when using a large number of plugins. This was the case for a surprisingly large number of users, and we are actively working on (a) improving the UX to make these cases more visible to users and (b) more intelligently truncating, pruning, and scheduling non-main tasks to avoid surprise token usage."</blockquote>

<p><strong>배제된 가설 (직접 인용):</strong></p>
<blockquote>"In the process, we ruled out a large number of hypotheses: adaptive thinking, other kinds of harness regressions, model and inference regressions."</blockquote>

<p><strong>리포트 요청 (직접 인용):</strong></p>
<blockquote>"The most actionable thing for people running into this is to run /feedback, and optionally post the feedback ids here."</blockquote>

<p><strong>커뮤니티 반론 1 — cache TTL 모순 (henrikhildre, 2026-04-13):</strong></p>
<blockquote>"Jarred Sumner says here that you swapped to 5 min TTL in March, I guess then the issue compounds quite a bit with 1M tokens? Are we currently on 5 min or 1 hr TTL for the main agent and can we swap on the user end?"</blockquote>

<p><strong>커뮤니티 반론 2 — 1M 기능 자체 번복 지적 (seanGSISG, 2026-04-14):</strong></p>
<blockquote>"The 1M context window shipped as a headline feature. Now it's a quota hazard the team wants to default away from? And I can promise you the issue is not leaving sessions open overnight or resuming old sessions constantly."</blockquote>

<p><strong>Reddit 요약 (원 스레드 작성자):</strong> TL;DR — 문제 인지 + agent session 오래 두면 full cache miss + 새 대화 시작 권장 + skills/agents 선별 로드 + /feedback 활용.</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 이번 주 r/ClaudeAI·GitHub에서 "Claude Code가 quota를 너무 빨리 태운다"는 보고가 여러 갈래로 쌓였는데(AMD 디렉터 분석·efficienist.com 20K invisible tokens·cache TTL 1h→5m 전환 등), <strong>Boris Cherny의 이번 답변은 "공식적으로 인정된 두 원인"을 정리한 첫 번째 정식 진단</strong>입니다. 특히 두 번째 원인인 <strong>"skills/subagents/plugins 과다 로드가 surprise token 소비"</strong>는 그동안 커뮤니티에서 막연히 의심받던 대목을 Anthropic이 명시적으로 인정한 것으로, <strong>"skills를 많이 설치할수록 좋다"는 플러그인 경제 흐름과 정반대의 파워유저 조언</strong>을 준 셈입니다. 또 <code>CLAUDE_CODE_AUTO_COMPACT_WINDOW=400000</code> 환경변수는 당장 사용자가 쓸 수 있는 완화책이지만, 1M을 headline feature로 밀어놓고 400k로 되돌리는 흐름은 seanGSISG의 지적처럼 제품 일관성 이슈를 낳습니다. henrikhildre의 질문(현재 TTL이 5m인지 1h인지)은 이 스레드에서 명확히 답해지지 않아, <strong>cache TTL 실제 값</strong>은 여전히 사용자가 프록시로 확인해야 할 영역.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>1M context window</strong>: 일반적으로 2025년 후반부터 Sonnet에 도입된 확장 컨텍스트. Claude Code가 기본값으로 채택.</p>
<p><strong>prompt cache window</strong>: 일반적으로 Anthropic API가 대화 prefix를 cache해 reuse하는 시간 창. 만료되면 다음 요청은 full input을 다시 billed tokens로 계산.</p>
<p><strong>Boris Cherny</strong>: 일반적으로 Claude Code의 주요 Anthropic 엔지니어로 GitHub·X에서 공식 커뮤니케이션 담당.</p>
<p><strong>원문 Reddit</strong>: <a href="https://www.reddit.com/r/ClaudeAI/comments/1sk4wfx/the_creator_of_claude_code_notes_on_the_current/" class="source-link">r/ClaudeAI 원 스레드</a></p>
<p><strong>GitHub comment</strong>: <a href="https://github.com/anthropics/claude-code/issues/45756#issuecomment-4231739206" class="source-link">github.com/anthropics/claude-code/issues/45756#issuecomment-4231739206</a></p>
</div>
