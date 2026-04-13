---
layout: default
title: "로컬 Claude Code + 음성 모드 + iMessage 제어 — 핸즈프리 워크플로우"
---

<a href="../2026-04-13" class="back-link">&larr; 4월 13일 목록</a>

# Voice + iMessage 핸즈프리 셋업

<div class="meta-line"><span class="tag tag-reddit">Reddit</span> r/ClaudeAI · 09:30 KST</div>

> 키보드 없이 음성으로 명령하고 iMessage로 원격 제어하는 Claude Code 멀티모달 셋업이 풀 데모 영상과 함께 공개되었습니다.

키보드 입력에 묶이지 않는 **차세대 코딩 인터페이스**를 시연한 사례입니다. 운전 중·요리 중에도 코드를 명령할 수 있고, 외출 시 iMessage로 원격 모니터링/지시가 가능합니다.

<div class="context-block">
<h4>실전 셋업 핵심</h4>
<p><strong>구성요소:</strong></p>
<ul>
<li>음성 입력: macOS Whisper 로컬 모델 → Claude Code 명령으로 변환</li>
<li>음성 출력: macOS say 또는 ElevenLabs로 응답 읽어주기</li>
<li>iMessage 브릿지: 사용자의 iMessage를 폴링 → Claude Code 입력으로 라우팅</li>
<li>응답 라우팅: Claude의 응답을 다시 iMessage로 회신</li>
</ul>
<p><strong>활용 시나리오:</strong></p>
<ul>
<li>코드 빌드/테스트가 도는 동안 다른 일하면서 음성으로 추가 작업 지시</li>
<li>외출 중 iMessage로 "오류 났는데 봐줘" → Claude가 분석 후 회신</li>
<li>접근성 — 손 사용이 어려운 환경에서의 코딩</li>
</ul>
<p><strong>주의:</strong> iMessage 브릿지는 macOS sandbox와 충돌 가능. AppleScript + Shortcuts 조합이 가장 안정적.</p>
</div>

<div class="context-block">
<h4>왜 중요한가</h4>
<p>에이전틱 코딩이 **"앉아서 키보드 치는 활동"**의 정의에서 벗어나는 신호입니다. 음성·메시지 인터페이스는 코딩 작업을 일상의 다른 활동과 병행 가능하게 만들고, 접근성을 크게 확대합니다. ChronoPlanner(어제 발행) 같은 생활 통합 트렌드의 연장선.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>Whisper</strong>: OpenAI가 공개한 오픈소스 음성 인식 모델. macOS에서는 whisper.cpp로 GPU 없이 빠르게 로컬 추론 가능합니다.</p>
<p><strong>iMessage Automation</strong>: macOS에서 iMessage는 SQLite DB(<code>~/Library/Messages/chat.db</code>)에 메시지를 저장합니다. 이를 폴링하면 새 메시지를 감지할 수 있습니다. AppleScript + osascript 조합으로 메시지 발송도 가능.</p>
</div>
