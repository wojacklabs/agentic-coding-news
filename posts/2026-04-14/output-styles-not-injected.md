---
layout: default
title: "Claude Code의 Output Styles가 system prompt에 실제로 주입되지 않는 버그 보고"
---

<a href="../2026-04-14" class="back-link">&larr; 4월 14일 목록</a>

# Output Styles Not Injected — 버그 보고

<div class="meta-line"><span class="tag tag-reddit">Reddit</span> 06:41 KST</div>

> Claude Code가 Output Styles 파일을 인식해 statusline·<code>/config</code>에는 표시하지만, 실제 system prompt에는 주입하지 않는 것으로 보인다는 사용자 보고. 최근 체감 degradation의 또 다른 원인일 가능성.

<div class="context-block">
<h4>출처 핵심 (Reddit 글에서 확인되는 내용만)</h4>

<p><strong>핵심 주장 (직접 인용):</strong></p>
<blockquote>"Output Styles aren't being injected into the system prompt!"</blockquote>

<p><strong>증상의 sneaky 함:</strong></p>
<ul>
<li>Claude Code가 Output Style 파일을 <strong>인식은 함</strong></li>
<li>statusline에 이름 표시</li>
<li><code>/config</code>에서도 노출</li>
<li>그러나 내용 자체는... (candidate text에서 잘림)</li>
</ul>

<p><strong>맥락 표현 (Reddit 글의 톤):</strong></p>
<blockquote>"Found another cause of Claude Code degradation (and no, it's not an Opus 4.6 nerf this time either)."</blockquote>

<p><strong>참고</strong>: 재현 절차·테스트 명령·정확한 Claude Code 버전 등은 candidate text가 잘려 이 기사 출처 범위에서 확인되지 않음.</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 사용자는 Output Styles를 정의해 두면 그대로 적용된다고 신뢰하지만, statusline·config UI가 "활성된 것처럼" 보이는데도 실제 system prompt에 주입되지 않는다면 <strong>"왜 항상 같은 톤으로 응답하지?"</strong>의 원인이 될 수 있습니다. Adaptive Thinking·cache TTL 변경에 이어 Output Styles까지 의심 항목이 누적되는 추세는 사용자가 client-side 동작을 1차 자료(JSONL 로그)로 직접 검증해야 한다는 점을 다시 강조합니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>Output Styles</strong>: 일반적으로 Claude Code에서 응답 형식·톤·언어를 통일하기 위해 정의하는 파일 또는 설정 항목으로 알려져 있습니다. 정확한 정의·로딩 메커니즘은 Anthropic 공식 docs 참조가 필요하며, 이 기사 출처 범위에서는 별도 검증하지 않았습니다.</p>
<p><strong>원문</strong>: <a href="https://www.reddit.com/r/ClaudeAI/comments/1sko3sz/output_styles_arent_being_injected_into_the/" class="source-link">r/ClaudeAI 원 스레드</a></p>
</div>
