---
layout: default
title: "evo — Claude Code 플러그인, parallel subagent + git worktree로 코드베이스 자동 최적화 tree search"
---

<a href="../2026-04-16" class="back-link">&larr; 4월 16일 목록</a>

# evo — Autoresearch for Code

<div class="meta-line"><span class="tag tag-reddit">Reddit</span> 06:47 KST</div>

> Karpathy의 autoresearch 아이디어(LLM이 자체 학습 실험을 돌려 자기 최고 점수를 이기는 루프)를 코드 최적화에 이식한 Claude Code 플러그인. <code>/evo:discover</code>로 최적화 타깃 탐색, <code>/evo:optimize</code>로 parallel subagent들이 각자 git worktree에서 실험. 단순 greedy가 아닌 tree search + regression gate + subagent 자율 가설 수립. r/ClaudeAI score 86, 29 comments, posted 2026-04-15.

<div class="context-block">
<h4>출처 핵심 (Reddit selftext에서 확인되는 내용만)</h4>

<p><strong>영감 (직접 인용):</strong></p>
<blockquote>"Inspired by Karpathy's autoresearch idea — an LLM runs training experiments autonomously to beat its own best score — but applied to code instead of ML training runs. I built this plugin as a way to set up an optimization loop on a codebase without writing the harness, scoring, and orchestration from scratch every time."</blockquote>

<p><strong>명령어 (직접 인용):</strong></p>
<blockquote>"/evo:discover explores your repo and picks an optimization target (could be a benchmark score, agent pass rate, latency, whatever fits)."</blockquote>
<blockquote>"/evo:optimize then spawns parallel subagents in background, each running experiments on its own git worktree. Experiments that improve the score get committed, the rest are discarded. There's a dashboard to watch the tree grow."</blockquote>

<p><strong>greedy hill climb과의 차이 (직접 인용):</strong></p>
<ul>
<li>"Tree search, not single-branch — multiple directions fork from any committed node"</li>
<li>"Subagents are semi-autonomous; they read failure traces and form their own hypotheses within their assigned brief"</li>
<li>"Regression gates can lock in behaviors you don't want to break"</li>
</ul>

<p><strong>호환성 (직접 인용):</strong></p>
<blockquote>"It's also a Codex plugin (same skills, different host). Both get a single-command install."</blockquote>

<p><strong>버전</strong>: "this is v0.2 so rough edges exist"</p>

<p><strong>GitHub</strong>: <code>github.com/evo-hq/evo</code></p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 Claude Code로 벤치마크·latency·agent pass rate을 올리려면 사람이 loop harness를 쓰고 결과를 수동 비교했지만, <strong>evo는 "optimization 루프 자체를 Claude Code 에이전트에게 위임"</strong>하는 변형입니다. 특히 <strong>subagent + git worktree + tree search</strong> 조합은 이번 주 Claude Code Desktop 재설계에서 부각된 "parallel sessions with worktree isolation" 개념을 플러그인 레벨로 구현한 첫 대표 사례 중 하나로, 격리된 실패가 깨끗이 폐기되고 성공만 commit되는 안전망이 매력. Boris Cherny가 같은 issue #45756에서 경고한 "skills/plugins 과다 로드가 surprise token 소비"와는 양면 — evo처럼 parallel subagent를 많이 띄우면 토큰 사용이 크게 늘 수밖에 없어, <strong>"가설 수 × 반복 수 × 세션 비용"</strong>을 미리 추산해야 실무 적용이 가능합니다. regression gate로 behavior lock하는 아이디어는 기존 벤치마크 기반 AutoML보다 실제 프로덕트 개선에 적합해 보입니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>Karpathy autoresearch</strong>: 일반적으로 LLM이 hyperparameter·아키텍처 실험을 직접 돌려 best metric을 스스로 갱신하는 개념. 학계에서 여러 변형 출현.</p>
<p><strong>git worktree</strong>: 일반적으로 단일 레포에 여러 디렉토리로 다른 브랜치를 동시 체크아웃하는 git 기능. 병렬 실험에 널리 쓰임.</p>
<p><strong>tree search vs greedy hill climb</strong>: 일반적으로 local optimum에 빠지지 않기 위해 여러 방향을 동시 탐색하는 설계. Monte Carlo tree search 계열에서 공통적인 아이디어.</p>
<p><strong>원문</strong>: <a href="https://www.reddit.com/r/ClaudeAI/comments/1slft9w/i_built_a_claude_code_plugin_that_optimizes_your/" class="source-link">r/ClaudeAI 원 스레드</a></p>
</div>
