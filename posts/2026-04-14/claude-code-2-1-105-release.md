---
layout: default
title: "Claude Code 2.1.105 릴리스 — 'DO NOT TRIGGER' 태그, 5분 stalled stream 자동 차단 (X)"
---

<a href="../2026-04-14" class="back-link">&larr; 4월 14일 목록</a>

# Claude Code 2.1.105 — X 커뮤니티 요약

<div class="meta-line"><span class="tag tag-x">X</span> 09:35 KST</div>

> @claudecode_lab 계정의 2.1.105 릴리스 요약 트윗. non-Anthropic "DO NOT TRIGGER" 태그 추가, 5분 이상 지속되는 stalled API stream 자동 중단.

<div class="context-block">
<h4>출처 핵심 (트윗에서 확인되는 내용만)</h4>

<p><strong>트윗 본문 (직접 인용):</strong></p>
<blockquote>"Claude Code Version 2.1.105 Released. Key Highlights: Added non-Anthropic DO NOT TRIGGER tag to claude-api triggers - Prevents erroneous external calls. Automatically interrupts stalled API streams after 5 minutes - Falls back to non-streaming (prevents infinite..."</blockquote>

<p><strong>트윗에서 확인되는 변경 2건:</strong></p>
<ol>
<li>non-Anthropic <strong>"DO NOT TRIGGER"</strong> 태그를 <code>claude-api</code> trigger에 추가 → 잘못된 외부 호출 방지</li>
<li><strong>5분 이상 stalled된 API stream을 자동 interrupt</strong>, non-streaming으로 fallback (infinite [loop 추정] 방지)</li>
</ol>

<p><strong>참고</strong>: 트윗 본문이 "prevents infinite..." 부분에서 잘려있어 세 번째 문장 이후 내용은 확인되지 않음. 또 이 트윗은 @claudecode_lab이라는 팔로워 계정으로, Anthropic 공식 변경 로그가 아닌 커뮤니티 요약일 가능성이 있음(트윗 본문만으로는 공식/비공식 여부 구별 불가).</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 2번 변경("5분 stalled stream 자동 interrupt")은 앞서 이슈가 보고되던 "Claude Code just stalls" 현상(오늘 다른 tick에서 Reddit 후보로 등장)에 대한 직접적 대응으로 보입니다. 1번 "DO NOT TRIGGER" 태그는 외부 trigger가 잘못 fire되는 문제에 대한 가드라는 점에서 운영 안정성 개선입니다. 다만 <strong>이 기사는 공식 릴리스 노트가 아닌 X 요약</strong>에 기반하므로 세부 내용은 Anthropic 공식 changelog와 교차 확인이 필요합니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>버전 확인</strong>: 일반적으로 Claude Code 버전은 <code>claude --version</code> 또는 <code>/status</code>로 확인 가능합니다. 업데이트는 설치 경로에 따라 npm 또는 Homebrew를 통해 수행됩니다.</p>
<p><strong>원문</strong>: <a href="https://x.com/claudecode_lab/status/2043848951305252920" class="source-link">x.com/claudecode_lab/status/2043848951305252920</a></p>
</div>
