---
layout: default
title: "Claude Code 2.1.107 OAuth가 'Paste code here'에서 12시간 넘게 멈춤 — 긴급 보고"
---

<a href="../2026-04-14" class="back-link">&larr; 4월 14일 목록</a>

# OAuth 'Paste code here' 멈춤 (2.1.107)

<div class="meta-line"><span class="tag tag-hn">HN</span> 18:37 KST</div>

> Claude Code 2.1.107에서 OAuth 절차가 `Paste code here if prompted >` 프롬프트에서 멈춰 12시간 넘게 진행되지 않는다는 긴급 Ask HN 글. Reddit·Discord에서는 보고되고 있으나 공식 대응이 없다는 지적.

<div class="context-block">
<h4>출처 핵심 (HN 글에서 확인되는 내용만)</h4>

<p><strong>본문 (직접 인용):</strong></p>
<blockquote>"Claude Code OAuth on 2.1.107 is stuck on `Paste code here if prompted >` - Impossible to paste (tried many methods, INCLUDING typing with xdotool the OAuth), there is a serious error that seems under-reported outside of Reddit &amp; Discord right now, why isn't this considered an emergency a..."</blockquote>

<p>(candidate text가 "emergency a..."에서 잘림.)</p>

<p><strong>확인되는 구체 사실:</strong></p>
<ul>
<li>영향 버전: <strong>Claude Code 2.1.107</strong></li>
<li>증상: OAuth 플로우가 <code>Paste code here if prompted &gt;</code>에서 멈춤</li>
<li>시도한 방법: 복사·붙여넣기 여러 방법 + <code>xdotool</code>로 직접 타이핑도 실패</li>
<li>작성자 인식: "Reddit &amp; Discord에서 보고됐으나 공식 대응 부족"</li>
<li>HN 제목의 "down for &gt;12 hours"는 작성자가 12시간 넘게 이 상태가 지속 중임을 시사</li>
</ul>

<p><strong>참고</strong>: 공식 Anthropic status page 상태, 우회 방법(다운그레이드 등), 영향 받은 사용자 수, OS/플랫폼별 재현 여부 등은 candidate text가 잘려 이 기사 출처 범위에서 확인되지 않음. 이 글은 사용자 긴급 제보이며, 공식 answer 여부는 HN discussion 확인이 필요합니다.</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 OAuth 플로우는 Claude Code 최초 로그인·인증 갱신에 필수이므로, 이 단계가 막히면 <strong>새 세션을 열 수 없거나 기존 세션의 만료 후 재인증 불가</strong> 문제로 이어질 수 있습니다. 이미 로그인된 세션을 쓰는 사용자는 당장 영향이 없어 보고가 분산되는 경향이 있고, 그 결과 "공식 대응 지연" 체감이 커집니다. 이 문제를 겪고 있다면 2.1.107 업그레이드를 보류하거나 이전 버전 유지가 일시적 우회가 될 수 있으나, 이 기사 출처 범위에서 우회 명령은 확인되지 않았습니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>xdotool</strong>: 일반적으로 X11 환경에서 키보드 이벤트를 프로그램적으로 발생시키는 리눅스 유틸리티. 작성자가 <code>xdotool</code>로도 실패했다고 언급한 점은 단순 붙여넣기 차단이 아니라 입력 수신 자체가 막힌 상태를 시사합니다.</p>
<p><strong>원문</strong>: <a href="https://news.ycombinator.com/item?id=47762585" class="source-link">news.ycombinator.com/item?id=47762585</a></p>
</div>
