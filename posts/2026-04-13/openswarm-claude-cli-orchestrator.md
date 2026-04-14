---
layout: default
title: "OpenSwarm — Claude Code CLI를 Linear 이슈 워커로 묶는 멀티 에이전트 오케스트레이터"
---

<a href="../2026-04-13" class="back-link">&larr; 4월 13일 목록</a>

# OpenSwarm — Linear/Discord/CI 통합

<div class="meta-line"><span class="tag tag-hn">HN</span> 21:39 KST</div>

> Claude Code CLI·OpenAI·로컬 모델을 Linear 이슈 워커/리뷰어 파이프라인으로 묶고, Discord 명령으로 제어하는 TypeScript 오케스트레이터.

<div class="context-block">
<h4>출처 핵심 (GitHub README에서 확인되는 내용만)</h4>

<p><strong>핵심 정의 (직접 인용):</strong></p>
<blockquote>"orchestrates multiple AI agents as autonomous code workers. It picks up Linear issues, runs Worker/Reviewer pair pipelines, reports to Discord, and retains long-term memory via LanceDB."</blockquote>

<p><strong>다중 모델 지원</strong>: Claude Code CLI, OpenAI GPT/Codex, 로컬 모델(Ollama / LMStudio / llama.cpp). Discord 명령으로 런타임에 프로바이더 전환 가능.</p>

<p><strong>코드 인텔리전스</strong>:</p>
<ul>
<li>code registry — 8개 프로그래밍 언어 across, complexity scoring + test mapping</li>
<li>"BS Detector" — empty catch blocks, hardcoded secrets 등 나쁜 패턴 식별</li>
</ul>

<p><strong>자율 파이프라인</strong>:</p>
<ul>
<li>Linear 이슈를 스케줄대로 fetch</li>
<li>Worker → Reviewer 에이전트 처리</li>
<li>이슈 상태 자동 업데이트</li>
<li>선택 단계: tester, documenter</li>
</ul>

<p><strong>메모리 시스템</strong>: LanceDB + Xenova embeddings. 인지 메모리는 similarity·importance·recency·frequency를 결합한 hybrid retrieval 공식 사용.</p>

<p><strong>Discord 제어</strong>: task dispatch, scheduling, monitoring, pair session management 전체 명령 인터페이스.</p>

<p><strong>설치</strong>:</p>
<pre><code>npm install -g @intrect/openswarm
openswarm</code></pre>
<p>실행하면 TUI chat 인터페이스가 열림.</p>

<p><strong>외부 통합</strong>:</p>
<ul>
<li>Linear: API key + team ID, 이슈 추적·자동 작업 할당</li>
<li>GitHub: CLI 통합, CI 모니터링</li>
<li>Discord: 봇 토큰, 명령 인터페이스·알림</li>
</ul>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 Claude Code 단일 인스턴스로는 장시간 자율 작업이 어렵고 "stall, loop, non-compiling" 같은 문제가 자주 보고됩니다. OpenSwarm은 Worker/Reviewer 분리 + Linear 이슈 → 코드 → CI 모니터링 → Discord 보고로 이어지는 <strong>파이프라인 자동화</strong>를 제공합니다. 다중 프로바이더 지원으로 Claude Code 외 옵션도 열어둔 점은 운영 안정성 측면에서 흥미로운 선택입니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>LanceDB</strong>: 일반적으로 컬럼지향 벡터 데이터베이스. 임베딩 검색에 사용.</p>
<p><strong>Xenova embeddings</strong>: Transformers.js 기반 임베딩 라이브러리, 로컬 실행.</p>
<p><strong>원문</strong>: <a href="https://github.com/Intrect-io/OpenSwarm" class="source-link">github.com/Intrect-io/OpenSwarm</a></p>
<p><strong>HN discussion</strong>: <a href="https://news.ycombinator.com/item?id=47160980" class="source-link">news.ycombinator.com/item?id=47160980</a></p>
</div>
