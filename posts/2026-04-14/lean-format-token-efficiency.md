---
layout: default
title: "LEAN — LLM에 구조화 데이터를 먹일 때 JSON/TOON/ZON보다 효율적이라는 노테이션"
---

<a href="../2026-04-14" class="back-link">&larr; 4월 14일 목록</a>

# LEAN Format — 토큰 효율 벤치마크

<div class="meta-line"><span class="tag tag-reddit">Reddit</span> 09:35 KST</div>

> JSON의 중괄호·따옴표·쉼표·반복 키가 LLM 입력에서 토큰을 낭비하는 문제를 겨냥한 "LLM-Efficient Adaptive Notation" 포맷. 12개 데이터셋에서 JSON compact 대비 토큰 절감을 측정.

<div class="context-block">
<h4>출처 핵심 (Reddit 글에서 확인되는 내용만)</h4>

<p><strong>문제 제기 (직접 인용):</strong></p>
<blockquote>"If you're feeding structured data to LLMs, you're probably wasting tokens on JSON overhead: repeated keys, quotes, braces, commas."</blockquote>

<p><strong>포맷 이름·풀이</strong>: <strong>LEAN</strong> — "LLM-Efficient Adaptive Notation".</p>

<p><strong>벤치마크 (Reddit 글이 제시한 표 도입):</strong></p>
<ul>
<li>측정 기준: avg token savings vs JSON compact</li>
<li>데이터셋: 12개</li>
<li>정확한 수치 열: "Format | Savings | Lossless" (candidate text가 표 헤더 끝부분에서 잘림)</li>
</ul>

<p><strong>비교 대상 포맷</strong>: JSON, TOON, ZON (제목에 언급).</p>

<p><strong>참고</strong>: 구체 수치(각 포맷별 savings %), 인터랙티브 playground URL, GitHub 저장소, LEAN 스펙 정의 세부는 candidate text가 잘려 이 기사 출처 범위에서 확인되지 않음.</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 LLM에 큰 JSON을 통째로 넣으면 구조 정보(키 이름·중괄호·따옴표)가 토큰을 크게 잡아먹습니다. Claude Code 세션에서 MCP tool이 JSON을 주고받을 때 이 비용이 누적되므로, 토큰 효율 포맷은 잠재적으로 큰 의미가 있습니다. 다만 lossless인지 여부와 LLM이 해당 포맷을 얼마나 안정적으로 parse하는지가 실제 가치의 관건이고, 이 기사 출처 범위에서는 숫자·검증 결과를 확인하지 못했으므로 "가설적 관심 항목"으로 두는 것이 안전합니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>TOON, ZON</strong>: 일반적으로 LLM 입력용으로 제안된 대체 노테이션 계열로 알려져 있으나, 정확한 스펙·채택도는 이 기사 출처 범위 밖이며 별도 확인이 필요합니다.</p>
<p><strong>원문</strong>: <a href="https://www.reddit.com/r/ClaudeAI/comments/1skoxhv/introducing_lean_a_format_that_beats_json_toon/" class="source-link">r/ClaudeAI 원 스레드</a></p>
</div>
