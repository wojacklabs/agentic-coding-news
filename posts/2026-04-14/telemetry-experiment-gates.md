---
layout: default
title: "Anthropic 텔레메트리를 끄면 실험 gate도 함께 비활성 — Boris Cherny X 인용"
---

<a href="../2026-04-14" class="back-link">&larr; 4월 14일 목록</a>

# Telemetry Off = Experiment Gates Off

<div class="meta-line"><span class="tag tag-reddit">Reddit</span> 06:41 KST</div>

> Anthropic의 Boris Cherny가 X에 남긴 발언을 정리한 r/ClaudeAI 글. "텔레메트리 끄면 client-side 캐시된 실험 gate도 함께 꺼진다"는 운영 영향 정보.

<div class="context-block">
<h4>출처 핵심 (Reddit 글에서 확인되는 내용만)</h4>

<p><strong>인용 출처</strong>: Boris Cherny X 발언 (<a href="https://x.com/bcherny/status/2043715740080222549?s=20" class="source-link">x.com/bcherny/status/2043715740080222549</a>) — Reddit 글 본문이 이 X URL을 직접 링크.</p>

<p><strong>Cherny 발언 (Reddit 글이 인용한 부분):</strong></p>
<blockquote>"Separately, when we do this kind of experimentation, we use experiment gates that are cached client-side. When you turn off telemetry we also disa..."</blockquote>

<p>(candidate text가 여기서 잘림. 전체 문장은 이 기사 출처 범위에서 확인되지 않으나, 패턴상 "we also disable [the experiment gates]"로 이어지는 것으로 보임 — 게시물 제목 자체가 그 결론.)</p>

<p><strong>제목이 요약하는 사실</strong>: "When you turn off telemetry, Anthropic also disable experiment gates."</p>

<p><strong>참고</strong>: Reddit 본문의 추가 분석·반응 댓글 등은 candidate text가 잘려 이 기사 출처 범위에서 확인되지 않음.</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 사용자가 텔레메트리를 끄는 동기는 프라이버시이지만, 그 부수 효과가 "실험적 기능에 자동 enroll되지 않게 된다"는 점은 운영자에게 의미가 있습니다. 최근 Claude Code 사용자 사이에서 "어느 날 갑자기 동작이 달라졌다"는 보고가 잦은데, 그 일부는 client-side 실험 gate가 enable 또는 disable됐기 때문일 수 있다는 함의로 해석할 수 있습니다. 즉 텔레메트리 on/off가 단순 데이터 수집 동의를 넘어 <strong>제품 행동 분기점</strong>을 좌우할 가능성이 있습니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>Experiment gate</strong>: 일반적으로 신기능을 점진적으로 롤아웃하기 위해 client-side에 캐시된 플래그로 분기 처리하는 기법. A/B 테스트나 dark launch에 쓰입니다.</p>
<p><strong>원문</strong>: <a href="https://www.reddit.com/r/ClaudeAI/comments/1skkc7m/when_you_turn_off_telemetry_anthropic_also/" class="source-link">r/ClaudeAI 원 스레드</a></p>
</div>
