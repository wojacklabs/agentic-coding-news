---
layout: default
title: "fwstack — Claude Code용 5개 deterministic dev 워크플로우, Flow Weaver 기반"
---

<a href="../2026-04-14" class="back-link">&larr; 4월 14일 목록</a>

# fwstack — deterministic Claude Code 워크플로우

<div class="meta-line"><span class="tag tag-reddit">Reddit</span> 09:35 KST</div>

> Flow Weaver로 구축한 5개의 deterministic 개발 워크플로우 패키지. 어제 공개 후 피드백을 반영해 "plan이 실제로 완료됐다는 증거가 없으면 반려"하도록 강화했다는 사용기.

<div class="context-block">
<h4>출처 핵심 (Reddit 글에서 확인되는 내용만)</h4>

<p><strong>도구 구성 (직접 인용·링크):</strong></p>
<ul>
<li><strong>fwstack</strong>: 5 deterministic dev workflows for Claude Code — GitHub <code>synergenius-fw/fwstack</code></li>
<li>기반: <strong>Flow Weaver</strong> — GitHub <code>synergenius-fw/flow-weaver</code></li>
</ul>

<p><strong>어제/오늘 변화 (직접 인용):</strong></p>
<blockquote>"Yesterday I published fwstack, 5 deterministic dev workflows for Claude Code, built with Flow Weaver. Got ratio'd. Fair enough."</blockquote>
<p>(작성자가 어제 공개 뒤 부정적 반응을 받아 "오늘은 plan 완료 증거가 없으면 반려"하도록 fwstack을 수정했다는 요지가 제목과 맞물림.)</p>

<p><strong>제목이 요약하는 변경</strong>: "Today fwstack rejects your plan if you can't prove it's done."</p>

<p><strong>참고</strong>: 5개 워크플로우의 구체 이름·단계 구성·"done 증명"의 메커니즘(테스트 통과? 파일 존재? git diff?)은 candidate text가 잘려 이 기사 출처 범위에서 확인되지 않음.</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 Claude Code 에이전트의 "다 했어요" 응답은 실제 검증 없이 나오는 경우가 많아, 커뮤니티에서는 "완료 증명을 코드로 강제하자"는 움직임이 반복 등장합니다. fwstack의 이번 변경은 그 요구에 대한 구체 응답 사례로, <strong>워크플로우 실행기 자체가 "증거 없으면 reject"</strong>하도록 설계한 점이 특징입니다. Claude Code Hooks 기반 유사 도구들과 비교해 보면 흥미로운 포지셔닝입니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>"ratio'd"</strong>: 일반적으로 SNS에서 좋아요 대비 부정 댓글이 압도적일 때 쓰는 용어로, 여기서는 Reddit에서 받은 부정적 반응을 가리키는 것으로 보입니다.</p>
<p><strong>Flow Weaver</strong>: 위 Reddit 글은 fwstack이 Flow Weaver "위에서" 빌드됐다고 언급합니다. Flow Weaver 자체의 정확한 기능·API는 이 기사 출처 범위에서 별도 검증하지 않았습니다.</p>
<p><strong>원문</strong>: <a href="https://www.reddit.com/r/ClaudeAI/comments/1skq2l0/got_ratiod_yesterday_today_fwstack_rejects_your/" class="source-link">r/ClaudeAI 원 스레드</a></p>
</div>
