---
layout: default
title: "Google AI Studio + Cloud Run 하루 만에 6,100만원 청구 — 치명적 보안 허점"
---

<a href="../2026-04-13" class="back-link">&larr; 4월 13일 목록</a>

# AI Studio Cloud Run 비용 폭탄 경고

<div class="meta-line"><span class="tag tag-threads">Threads</span> #aithreads · 12:52 KST</div>

> Google AI Studio로 만든 앱을 Cloud Run에 배포한 후 단 하루에 6,100만 원의 Gemini API 비용이 청구된 사건이 공유되었습니다.

Threads @minorabanggu(score 24)가 3월 31일 **단 하루 만에 6,100만 원** 청구를 받은 실제 사고를 공유했습니다. 원인은 Google AI Studio가 생성하는 기본 배포 구조의 **치명적 보안 허점**으로, API 키와 엔드포인트가 프런트엔드에 노출되는 구조입니다.

<div class="context-block">
<h4>실전 방어 기법</h4>
<p><strong>즉시 점검해야 할 것:</strong></p>
<ul>
<li>Cloud Run에 배포한 AI Studio 앱의 API 키가 프런트엔드에 노출되지 않았는지 확인 (브라우저 개발자 도구 → Network 탭)</li>
<li>IP/Referer 기반 API 제한 설정 여부</li>
<li>Google Cloud Console에서 일일 예산 상한 설정</li>
<li>의심스러운 트래픽 패턴 알림 (Cloud Monitoring)</li>
</ul>
<p><strong>근본 해결:</strong></p>
<ul>
<li>프런트엔드에서 직접 Gemini API 호출 금지 — 반드시 백엔드 프록시 경유</li>
<li>API 키를 환경 변수로만 관리 (클라이언트 번들 포함 금지)</li>
<li>Quota 자동 차단: 월 예산 $100 초과 시 키 자동 비활성화 설정</li>
</ul>
</div>

<div class="context-block">
<h4>왜 중요한가</h4>
<p>에이전틱 도구가 "쉽게 프로토타입 → 쉽게 배포" 경로를 제공하면서, 보안 검토 없이 프로덕션에 올리는 사고가 늘고 있습니다. AI Studio 같은 노코드/로우코드 도구의 기본 설정은 개발 편의성에 최적화되어 있어, **배포 전 보안 검증이 필수**입니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>API Key Exposure</strong>: 프런트엔드 JavaScript에 API 키를 하드코딩하면 브라우저 사용자 누구나 추출 가능합니다. 자동화된 스크립트가 이를 긁어가서 악용하는 사례가 흔합니다.</p>
<p><strong>Google Cloud Budget Alerts</strong>: 사전 설정한 예산 초과 시 알림을 보내는 기능. 자동 차단은 아니므로 추가 로직 필요하며, 이번 사고는 24시간 내에 발생해 알림만으로는 막지 못했을 가능성이 높습니다.</p>
</div>
