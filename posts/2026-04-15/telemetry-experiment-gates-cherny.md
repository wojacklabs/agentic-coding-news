---
layout: default
title: "Boris Cherny: 텔레메트리 OFF → experiment gates 비활성, Claude는 5m 기본값만 읽음"
---

<a href="../2026-04-15" class="back-link">&larr; 4월 15일 목록</a>

# Telemetry·Experiment Gates — Cherny 직접 설명

<div class="meta-line"><span class="tag tag-reddit">Reddit</span> 00:50 KST</div>

> Anthropic Boris Cherny가 X에서 남긴 설명: 텔레메트리 실험 gate는 client-side 캐시되며, 텔레메트리 끄면 gate도 비활성 → Claude가 기본값 5m만 읽음. r/ClaudeAI score 18.

<div class="context-block">
<h4>출처 핵심 (Reddit 글에서 확인되는 내용만)</h4>

<p><strong>Cherny 원 발언 (직접 인용, Reddit 글이 X 링크와 함께 게재):</strong></p>
<blockquote>"Separately, when we do this kind of experimentation, we use experiment gates that are cached client-side. When you turn off telemetry we also disable experiment gates -- we do not call home when telemetry is off -- so Claude reads the default value, which is 5m."</blockquote>

<p><strong>Cherny X 링크 (Reddit 글이 직접 제공):</strong></p>
<p><a href="https://x.com/bcherny/status/2043715740080222549?s=20" class="source-link">x.com/bcherny/status/2043715740080222549</a></p>

<p><strong>Reddit 작성자의 해석 (직접 인용):</strong></p>
<blockquote>"This means that if you have Telemetry enabled, then Anthropic will experiment different features on your account...like the latest prompt cache issue."</blockquote>

<p><strong>관련 GitHub Issue 작성됨 (Reddit 작성자 제공):</strong></p>
<p><a href="https://github.com/anthropics/claude-code/issues/47558" class="source-link">github.com/anthropics/claude-code/issues/47558</a> — 문서 업데이트 요청</p>

<p><strong>참고</strong>: Cherny 발언의 "5m"은 prompt cache TTL의 기본값을 가리키는 것으로 맥락상 읽힙니다. 단 Cherny 원 X 트윗의 앞·뒤 문맥(Separately 앞 문장) 전체는 이 기사 출처 범위에서 확인되지 않음.</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 이 정보는 두 가지 의미를 동시에 가집니다. 하나는 <strong>프라이버시 모델의 부수 효과</strong> — 텔레메트리를 끄면 Anthropic 측 실험에서 자동으로 opt-out됨. 다른 하나는 <strong>비용·기능 비대칭</strong> — telemetry ON 사용자는 1시간 TTL 같은 "실험적 기본값"을 우연히 받을 수 있지만 OFF 사용자는 항상 5분 기본값. "프라이버시 vs 비용"의 이면이 드러납니다. 같은 주제의 GitHub issue #45381(CLOSED COMPLETED)과 맞물려, Anthropic이 이미 이 동작을 수정했을 가능성도 있으므로 본인 환경 JSONL로 재검증이 권장됩니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>experiment gate</strong>: 일반적으로 클라이언트에 캐시된 feature flag 형태로, 서버가 사용자 계정에 실험 할당을 내려주면 클라이언트가 그 상태를 유지하는 메커니즘. 텔레메트리 OFF 시 서버로부터 업데이트가 안 오므로 기본값으로 고정됩니다.</p>
<p><strong>원문</strong>: <a href="https://www.reddit.com/r/ClaudeAI/comments/1skkc7m/when_you_turn_off_telemetry_anthropic_also/" class="source-link">r/ClaudeAI 원 스레드</a></p>
</div>
