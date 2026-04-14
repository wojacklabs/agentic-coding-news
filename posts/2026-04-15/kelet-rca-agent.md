---
layout: default
title: "Kelet — LLM 앱 실패 패턴을 자동 root cause 분석, Claude Code Skill 통합"
---

<a href="../2026-04-15" class="back-link">&larr; 4월 15일 목록</a>

# Kelet — LLM 앱 RCA Agent

<div class="meta-line"><span class="tag tag-hn">HN</span> 03:51 KST</div>

> AI agent가 "조용히 잘못된 답"을 내는 디버깅 문제를 자동화. trace+signal → fact 추출 → hypothesis → 클러스터링 → root cause + 수정 제안. Claude Code용 Kelet Skill 제공. HN score 30, posted 2026-04-14.

<div class="context-block">
<h4>출처 핵심 (HN 포스트 본문에서 확인되는 내용만)</h4>

<p><strong>작성자 배경 (직접 인용):</strong></p>
<blockquote>"I've spent the past few years building 50+ AI agents in prod (some reached 1M+ sessions/day), and the hardest part was never building them — it was figuring out why they fail."</blockquote>

<p><strong>문제 정의 (직접 인용):</strong></p>
<blockquote>"AI agents don't crash. They just quietly give wrong answers. You end up scrolling through traces one by one, trying to find a pattern across hundreds of sessions."</blockquote>

<p><strong>Kelet 작동 — 5단계 (직접 인용):</strong></p>
<ol>
<li>"You connect your traces and signals (user feedback, edits, clicks, sentiment, LLM-as-a-judge, etc.)"</li>
<li>"Kelet processes those signals and extracts facts about each session"</li>
<li>"It forms hypotheses about what went wrong in each case"</li>
<li>"It clusters similar hypotheses across sessions and investigates them together"</li>
<li>"It surfaces a root cause with a suggested fix you can review and apply"</li>
</ol>

<p><strong>핵심 인사이트 (직접 인용):</strong></p>
<blockquote>"individual session failures look random. But when you cluster the hypotheses, failure patterns emerge."</blockquote>

<p><strong>Claude Code 통합 (직접 인용):</strong></p>
<blockquote>"The fastest way to integrate is through the Kelet Skill for coding agents — it scans your codebase, discovers where signals should be collected, and sets everything up for you. There are also Python and TypeScript SDKs if you prefer manual setup."</blockquote>

<p><strong>가격</strong>: "currently free during beta. No credit card required."</p>

<p><strong>제공:</strong></p>
<ul>
<li>웹: <code>kelet.ai</code></li>
<li>Docs: <code>kelet.ai/docs/</code></li>
<li>Kelet Skill (coding agent용)</li>
<li>Python·TypeScript SDK (수동 설정용)</li>
</ul>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 LLM 앱 운영에서 가장 큰 비용은 "수십~수천 건의 trace 중 어디가 잘못된 패턴인지 사람이 찾는 시간"입니다. Kelet의 핵심 기여는 <strong>"세션별 fact 추출 → hypothesis → 클러스터링"</strong>의 3단계 자동화로, 단일 세션을 보면 random인 실패가 cluster에서 패턴으로 드러난다는 가설입니다. <strong>Claude Code Skill</strong> 형태 제공은 통합 진입 장벽을 낮추는 점이 흥미롭고, "코드베이스 스캔 후 signal 수집 위치 자동 발견" 부분이 핵심 가치 — 단 실제 정확도·노이즈는 도입 후 검증이 필요합니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>LLM-as-a-judge</strong>: 일반적으로 LLM 출력의 품질을 다른 LLM이 채점하는 평가 패턴. Kelet가 받는 signal 종류 중 하나로 언급됨.</p>
<p><strong>원문</strong>: <a href="https://kelet.ai/" class="source-link">kelet.ai</a></p>
<p><strong>HN discussion</strong>: <a href="https://news.ycombinator.com/item?id=47767606" class="source-link">news.ycombinator.com/item?id=47767606</a></p>
</div>
