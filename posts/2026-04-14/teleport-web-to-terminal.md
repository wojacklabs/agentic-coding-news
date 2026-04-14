---
layout: default
title: "Claude Code on the Web 태스크 프리즈 → /teleport로 터미널에서 인계해 해결 (X)"
---

<a href="../2026-04-14" class="back-link">&larr; 4월 14일 목록</a>

# /teleport — Web → Terminal 태스크 인계

<div class="meta-line"><span class="tag tag-x">X</span> 15:38 KST</div>

> Claude Code on the Web에서 태스크가 프리즈되던 문제를 <code>/teleport</code> 명령으로 터미널에 인계해서 정상 재개했다는 짧은 X 사용기.

<div class="context-block">
<h4>출처 핵심 (트윗에서 확인되는 내용만)</h4>

<p><strong>트윗 본문 (직접 인용):</strong></p>
<blockquote>"Claude Code on the Webでタスクがフリーズする問題、結局/teleportでターミナルでタスク引き継いで再開させたら普通に走った"</blockquote>

<p><strong>한국어 요약 (트윗 내용 그대로):</strong></p>
<ul>
<li>증상: Claude Code on the Web에서 태스크가 프리즈</li>
<li>해결: <code>/teleport</code> 명령으로 터미널에서 태스크 인계</li>
<li>결과: 터미널에서 정상 재개</li>
</ul>

<p><strong>참고</strong>: <code>/teleport</code> 명령의 공식 문서 위치, 정확한 작동 방식(세션 ID 이동? 컨텍스트 복사?), 지원 Claude Code 버전 등은 트윗에 포함되지 않음. 다른 tick에서 다룬 "Claude Code once in a while stalls" 현상의 대응책으로 읽힐 가능성도 있으나 트윗 자체가 그 관계를 명시하지는 않음.</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 Claude Code on the Web(브라우저)과 터미널 CLI는 같은 계정을 공유하지만 실행 환경은 분리되어 있어, 한쪽이 프리즈되면 작업을 놓치기 쉽습니다. <strong><code>/teleport</code>로 세션을 옮기는 방식</strong>이 가능하다면 장시간 작업의 복구 루틴으로 유용할 수 있습니다. 다만 이 트윗만으로는 명령의 공식 존재·기능 범위를 확정할 수 없으므로 실제 도입 전 공식 docs 확인이 안전합니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>Claude Code on the Web</strong>: 일반적으로 claude.ai 또는 별도 웹 엔트리로 제공되는 브라우저 기반 Claude Code 실행 환경을 가리키는 것으로 보이며, 터미널 CLI와는 세션 저장 위치·실행 컨텍스트가 다릅니다. 정확한 범주는 Anthropic 공식 docs를 참조해야 확정됩니다.</p>
<p><strong>원문</strong>: <a href="https://x.com/oubakiou/status/2043940243704033466" class="source-link">x.com/oubakiou/status/2043940243704033466</a></p>
</div>
