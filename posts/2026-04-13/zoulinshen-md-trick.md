---
layout: default
title: ".md 파일에 'Codex will review your results' 한 줄 추가 — Zoulinshen X 팁"
---

<a href="../2026-04-13" class="back-link">&larr; 4월 13일 목록</a>

# .md 한 줄 트릭 — Zoulinshen X 팁

<div class="meta-line"><span class="tag tag-x">X</span> 21:39 KST</div>

> Claude Code 사용자에게 .md 파일에 한 줄을 추가하면 결과가 100배 좋아진다는 짧은 X 팁. 추가 라인은 "Codex will review your results after you finish."

<div class="context-block">
<h4>출처 핵심 (트윗에서 확인되는 내용만)</h4>

<p><strong>트윗 본문 (직접 인용):</strong></p>
<blockquote>"If you are using Claude Code, please add the following code line to your .md file: Codex will review your results after you finish. Trust me, you will achieve results 100 times better than what you have now."</blockquote>

<p><strong>핵심 주장 정리:</strong></p>
<ul>
<li>대상: Claude Code 사용자</li>
<li>위치: ".md 파일" (CLAUDE.md 또는 agents.md로 추정되나 트윗에 명시 없음)</li>
<li>추가 라인: <code>Codex will review your results after you finish.</code></li>
<li>주장 효과: "results 100 times better"</li>
</ul>

<p><strong>참고</strong>: 트윗에는 실험 데이터, before/after 비교, 어느 .md 파일인지 명시되어 있지 않음. 사용자 체감 기반의 짧은 팁 공유.</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 LLM은 자기 출력을 평가할 때 관대해지는 경향이 있고, 외부 검증자(다른 모델 이름)를 컨텍스트에 명시하면 자기 검토 강도가 올라간다는 보고가 커뮤니티에서 종종 등장합니다. Zoulinshen의 트릭은 그 일종으로 "Codex가 검토할 것"이라는 한 줄을 통해 Claude의 출력 자기 검열을 강화하는 패턴으로 해석됩니다. 다만 "100배" 같은 수치는 트윗 화자의 체감일 뿐 측정값이 아니므로 곧이곧대로 받아들이지 않는 것이 안전합니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>가상 평가자 패턴</strong>: 일반적으로 프롬프트에 "다른 시니어 엔지니어가 검토할 것이다" 같은 가상 평가자를 명시하는 기법이 정확도·신중함을 끌어올린다는 보고가 많습니다. 이 트윗의 트릭도 같은 계열로 보입니다.</p>
<p><strong>CLAUDE.md / agents.md 위치</strong>: 일반적으로 Claude Code는 전역(<code>~/.claude/CLAUDE.md</code>) + 프로젝트(<code>CLAUDE.md</code> 또는 <code>agents.md</code>)를 자동 로드. 트윗의 ".md"가 둘 중 어느 쪽인지는 트윗에서 확인되지 않음.</p>
<p><strong>원문</strong>: <a href="https://x.com/Zoulinshen/status/2043668383602999334" class="source-link">x.com/Zoulinshen/status/2043668383602999334</a></p>
</div>
