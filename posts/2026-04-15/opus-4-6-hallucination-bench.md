---
layout: default
title: "bridgebench 리더보드 — Opus 4.6 hallucination 76.9 score, fabrication 29.1%"
---

<a href="../2026-04-15" class="back-link">&larr; 4월 15일 목록</a>

# bridgebench Hallucination — Opus 4.6

<div class="meta-line"><span class="tag tag-hn">HN</span> 15:49 KST</div>

> HN 포스트 제목은 "Opus 4.6 hallucinates twice as more today than when it released". 링크된 bridgebench.ai 리더보드(2026-04-14)에는 현재 Opus 4.6 점수와 이전 버전 점수 두 행이 공개. 단 "twice as more" 주장 자체를 검증할 과거 시점 비교 데이터는 페이지에 없음.

<div class="context-block">
<h4>출처 핵심 (bridgebench.ai/hallucination에서 확인되는 내용만)</h4>

<p><strong>리더보드 날짜</strong>: 2026-04-14</p>

<p><strong>두 행 비교 (WebFetch 결과):</strong></p>
<table>
<tr><th>버전</th><th>Score</th><th>Accuracy</th><th>Fabrication rate</th></tr>
<tr><td>Claude Opus 4.6 (April 14)</td><td>76.9</td><td>72.2%</td><td>29.1%</td></tr>
<tr><td>Claude Opus 4.6 (earlier)</td><td>73.3</td><td>68.3%</td><td>33.0%</td></tr>
</table>

<p><strong>벤치마크 구성 (직접 인용):</strong></p>
<blockquote>"30 tasks across 6 clusters with 175 questions — verified by code execution and ground truth"</blockquote>

<p><strong>HN 글 제목 주장과 실제 데이터 차이</strong>:</p>
<ul>
<li>HN 제목: "hallucinates twice as more today than when it released"</li>
<li>페이지 실제 데이터: 현재 fabrication 29.1% vs earlier 33.0% — 오히려 <strong>fabrication이 줄어든 수치</strong>로 표시됨</li>
<li>"when released" 시점의 과거 데이터는 페이지에서 확인되지 않음</li>
</ul>

<p><strong>참고</strong>: 두 행의 "earlier" 의미(며칠 전·최초 출시일·다른 모델 버전)는 페이지 자체로 확정 불가. HN 제목 주장은 이 기사 출처 범위에서 직접 지지 근거를 찾지 못했음.</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 "모델이 시간이 지나며 퇴화한다"는 체감은 여러 사용자 보고(AMD 디렉터 7000세션 분석, Max 구독자 유지비용 증가 등)와 어느 정도 맥락을 공유합니다. 그러나 <strong>bridgebench 리더보드의 현재 공개 수치는 Opus 4.6의 fabrication rate가 33.0% → 29.1%로 <em>감소</em>한 것으로 나와</strong>, HN 제목의 "twice as more"를 직접 뒷받침하지 않습니다. 벤치마크의 "earlier" 컬럼 정의가 명확하지 않아 두 값의 비교 맥락(동일 태스크 셋? 다른 하위 모델?)을 페이지 외부 자료로 보완해야 의미 있는 해석이 가능합니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>fabrication rate</strong>: 일반적으로 "모델이 근거 없는 사실을 만들어내는 비율". hallucination의 하위 지표로 자주 사용.</p>
<p><strong>code-verified benchmark</strong>: 일반적으로 답변을 프로그램으로 직접 검증하는 방식. 주관적 채점을 배제할 수 있으나 태스크 커버리지에 한계.</p>
<p><strong>원문</strong>: <a href="https://www.bridgebench.ai/hallucination" class="source-link">bridgebench.ai/hallucination</a></p>
<p><strong>HN discussion</strong>: <a href="https://news.ycombinator.com/item?id=47749164" class="source-link">news.ycombinator.com/item?id=47749164</a></p>
</div>
