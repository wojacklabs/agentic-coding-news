---
layout: default
title: "Outworked — Animal Crossing 스타일 Claude Code 에이전트 사무실 UI"
---

<a href="../2026-04-13" class="back-link">&larr; 4월 13일 목록</a>

# Outworked — 에이전트 사무실 오픈소스

<div class="meta-line"><span class="tag tag-hn">HN</span> 17:34 KST</div>

> Claude Code 에이전트들을 **동물의 숲 스타일 사무실 UI**에 픽셀 캐릭터로 배치해 관찰·조작하는 오픈소스. v0.3.0에서 iMessage 채널, 내장 브라우저, 스케줄링 기능이 추가됨. HN 총 92점.

어제의 "Claude 픽셀 사무실" 트렌드가 본격적인 도구로 구체화된 사례입니다. 단순 시각화를 넘어 **실제 작업 분배·통신·모니터링 레이어**로 진화하고 있습니다.

<div class="context-block">
<h4>실전 기법 핵심</h4>
<p><strong>v0.3.0 신기능:</strong></p>
<ul>
<li><strong>iMessage 채널</strong> — 에이전트가 사람에게 문자를 보내고, 사람이 에이전트에게 답장 가능</li>
<li><strong>내장 브라우저</strong> — 에이전트가 웹 페이지 탐색·상호작용</li>
<li><strong>스케줄링</strong> — 반복 작업, 특정 시각 트리거</li>
<li>채널 확장성: iMessage 외 Slack·Discord 등 쉽게 추가</li>
</ul>
<p><strong>활용 시나리오:</strong></p>
<ul>
<li>여러 Claude Code 에이전트를 이슈별로 분배 → 각 에이전트가 작업하는 모습을 실시간 관찰</li>
<li>에이전트가 정보 필요 시 iMessage로 사용자에게 질문 → 외출 중에도 답변</li>
<li>정기 체크 작업(매일 아침 리포트, 배포 확인)을 에이전트에게 스케줄링</li>
</ul>
</div>

<div class="context-block">
<h4>왜 중요한가</h4>
<p>Claude Code 에이전트가 <strong>1명이 아니라 팀으로 운용</strong>되는 시나리오가 현실이 되고 있습니다. 그럴 때 <strong>관찰·지휘 UI</strong>가 중요해지는데, 터미널 로그 grep으로는 한계. Outworked 같은 시각적 지휘소가 새로운 레이어로 등장한 것. 또한 iMessage 통합은 <em>핸즈프리 원격 제어</em> 트렌드와 맞닿아 있습니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>에이전트 Observability 트렌드</strong>: 같은 날 HN에 올라온 "Show HN: Real-time dashboard for Claude Code agent teams"(Agents Observe)도 같은 고민의 다른 해법. Outworked는 공간적 메타포, Agents Observe는 대시보드 메타포를 택함.</p>
<p><strong>iMessage 통합의 함정</strong>: macOS sandbox 때문에 iMessage 자동화는 AppleScript + Shortcuts 조합이 가장 안정적. <a href="https://github.com/outworked/outworked" class="source-link">GitHub: outworked/outworked</a> · <a href="https://github.com/outworked/outworked/releases/tag/v0.3.0" class="source-link">v0.3.0 릴리스</a></p>
</div>
