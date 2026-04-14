---
layout: default
title: "Context Surgeon — 에이전트가 자기 컨텍스트 윈도우를 evict/replace/restore로 직접 수술"
---

<a href="../2026-04-14" class="back-link">&larr; 4월 14일 목록</a>

# Context Surgeon — 3 수술 도구

<div class="meta-line"><span class="tag tag-hn">HN</span> 18:37 KST</div>

> auto-compaction이 오래된 내용을 무차별 제거하는 것과 달리, AI 에이전트가 <strong>evict/replace/restore</strong> 3가지 도구로 자기 컨텍스트 메모리를 능동 관리하게 해주는 로컬 HTTP 프록시. Claude Code 지원.

<div class="context-block">
<h4>출처 핵심 (GitHub README에서 확인되는 내용만)</h4>

<p><strong>목적 (직접 인용):</strong></p>
<blockquote>"the agent three surgical tools — evict, replace, and restore — so it can manage its own memory."</blockquote>

<p><strong>3 도구의 역할:</strong></p>
<ul>
<li><strong>Evict</strong>: stale content 제거 후 <code>[evicted]</code> 자리표시자로 대체</li>
<li><strong>Replace</strong>: 긴 output을 에이전트가 쓴 짧은 요약으로 교체</li>
<li><strong>Restore</strong>: 이전에 evict된 내용을 필요 시 되살림</li>
</ul>

<p>일반 auto-compaction은 컨텍스트가 꽉 차면 오래된 것부터 무차별 drop하지만, Context Surgeon은 에이전트가 선택적으로 조작.</p>

<p><strong>작동 메커니즘</strong>: 로컬 HTTP 프록시로 동작</p>
<ol>
<li>CLI와 모델 제공자 사이 API 요청 intercept</li>
<li>메시지·tool result에 ID 부여 (예: <code>[tool result 2.1]</code>)</li>
<li>요청 발송 전 eviction directive 적용</li>
<li>restore를 위한 shadow store 유지</li>
</ol>

<p>에이전트는 shell tool을 통해 context surgery 명령을 호출.</p>

<p><strong>설치·호환:</strong></p>
<ul>
<li>설치: <code>npm install -g context-surgeon</code> (Node.js 22+ 필요)</li>
<li>지원: Codex CLI (subscription + API key), <strong>Claude Code</strong></li>
<li>미지원: Codex desktop app</li>
<li>"zero configuration" — 기존 CLI 명령을 wrap하는 방식</li>
</ul>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 Claude Code의 <code>/compact</code>는 자동 요약이라 사용자가 어느 내용이 남고 어느 내용이 사라졌는지 통제하기 어렵습니다. Context Surgeon의 <strong>에이전트 자체가 evict 대상을 지정하고 나중에 restore 가능</strong>한 설계는 "장시간 작업 중 특정 디버그 로그를 잠시 치워두다가 필요할 때 되살리는" 유즈케이스에 적합합니다. HTTP 프록시 방식이라 CLI를 wrap할 뿐 별도 권한이 필요 없다는 점도 도입 장벽이 낮습니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>shadow store</strong>: 일반적으로 evict한 내용의 백업을 외부 저장소에 두고, restore 시 원본을 되돌리는 패턴. 단 shadow store가 늘면 디스크·메모리 사용량도 증가하므로 retention 정책은 별도 고려가 필요합니다.</p>
<p><strong>원문</strong>: <a href="https://github.com/jackfruitsandwich/context-surgeon" class="source-link">github.com/jackfruitsandwich/context-surgeon</a></p>
<p><strong>HN discussion</strong>: <a href="https://news.ycombinator.com/item?id=47753430" class="source-link">news.ycombinator.com/item?id=47753430</a></p>
</div>
