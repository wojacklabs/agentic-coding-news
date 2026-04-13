---
layout: default
title: "Obsidian + Graphify로 Claude Code 토큰 499배 절감 — 오픈소스 가이드"
---

<a href="../2026-04-13" class="back-link">&larr; 4월 13일 목록</a>

# 토큰 499배 절감 가이드

<div class="meta-line"><span class="tag tag-reddit">Reddit</span> r/ClaudeAI · 09:51 KST</div>

> Obsidian 노트의 지식 그래프를 **Graphify**로 연결해 Claude Code 세션당 토큰을 499배 줄였다는 오픈소스 가이드가 공개되었습니다.

Reddit에 공개된 이 가이드는 **개인 지식 관리(PKM) 시스템을 에이전트의 외부 컨텍스트**로 전환하는 구체 레시피입니다. Obsidian의 [[wikilink]] 기반 그래프를 MCP 서버로 노출해, Claude Code가 관련 노트만 on-demand로 조회하게 만드는 구조입니다.

<div class="context-block">
<h4>실전 기법 핵심</h4>
<p><strong>구성요소:</strong></p>
<ul>
<li>Obsidian vault: 프로젝트 지식을 마크다운 노트로 저장, [[wikilink]]로 연결</li>
<li>Graphify: 노트 그래프를 MCP <code>search(query)</code> + <code>fetch(path)</code>로 노출</li>
<li>Claude Code: 전체 vault를 읽지 않고 필요한 노트만 pull</li>
</ul>
<p><strong>측정 결과:</strong> 동일 작업에서 기존 방식(vault 전체 주입) 대비 <strong>~499배 토큰 감소</strong>. Max 20x 사용자가 월 수십만 원 절감 가능.</p>
<p><strong>적용 순서:</strong> (1) Obsidian vault 생성 → (2) 프로젝트 아키텍처·결정·TODO를 노트로 작성 → (3) Graphify 설치 → (4) Claude Code에 MCP 서버로 등록 → (5) 세션에서 <code>search("auth flow")</code>로 호출</p>
</div>

<div class="context-block">
<h4>왜 중요한가</h4>
<p>토큰 절감 기법들이 "프롬프트 단축"에 몰려 있지만, 진짜 절감은 "컨텍스트 구조화"에서 나옵니다. PKM 도구와 MCP의 결합은 기존 지식 작업 방식을 그대로 에이전트에 접목하므로 학습 곡선이 낮습니다. 어제 발행한 MCP 50x 기법과 같은 철학이나 구체 구현은 다릅니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>Obsidian</strong>: 로컬 우선 마크다운 기반 지식 관리 앱. 위키링크·백링크·그래프 뷰가 특징이며 플러그인 생태계가 풍부합니다.</p>
<p><strong>PKM + AI 결합</strong>: Personal Knowledge Management 시스템을 AI 에이전트의 영속 메모리로 쓰는 패턴. Logseq, Roam Research도 유사 접근이 가능합니다.</p>
</div>
