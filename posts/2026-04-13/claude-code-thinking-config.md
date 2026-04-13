---
layout: default
title: "Claude Code 'Adaptive Thinking 비활성화' settings.json 4줄 — 성능 회복 실전 설정"
---

<a href="../2026-04-13" class="back-link">&larr; 4월 13일 목록</a>

# Adaptive Thinking 비활성화 settings

<div class="meta-line"><span class="tag tag-threads">Threads</span> <span class="tag tag-reddit">Reddit</span> 15:53 KST</div>

> Threads와 Reddit에서 동시에 등장한 주제 — 최근 Claude Code의 "Adaptive Thinking" 기능이 모델 성능을 떨어뜨린다는 분석과, 이를 비활성화하는 settings.json 4줄 설정.

Threads의 @withfox(20)와 @unclejobs.ai(10)가 공유한 **즉시 적용 가능한 settings.json 튜닝**, 그리고 Reddit r/ClaudeAI의 "Adaptive Thinking이 퇴행적 피드백 루프를 만드는가?" 분석이 같은 문제를 가리키고 있습니다.

<div class="context-block">
<h4>실전 설정 — settings.json env 블록</h4>
<pre><code>{
  "env": {
    "CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING": 1,
    "MAX_THINKING_TOKENS": "128000",
    "CLAUDE_CODE_DISABLE_1M_CONTEXT": 1,
    "CLAUDE_CODE_DISABLE_AUTO_MEMORY": 1
  }
}</code></pre>
<p><strong>각 변수의 역할:</strong></p>
<ul>
<li><code>DISABLE_ADAPTIVE_THINKING</code>: Claude가 "쉬운 문제"로 판단해 추론을 줄이는 자동 조절을 끔. 항상 깊이 사고하게 강제.</li>
<li><code>MAX_THINKING_TOKENS=128000</code>: 사고 단계 토큰 상한을 명시적으로 높이 설정.</li>
<li><code>DISABLE_1M_CONTEXT</code>: 1M 컨텍스트 모드 비활성화 (윈도우 비대화 방지).</li>
<li><code>DISABLE_AUTO_MEMORY</code>: 자동 메모리 시스템이 오래된·관련 없는 정보를 끌어오는 것을 막음.</li>
</ul>
<p><strong>출처:</strong> 전 Meta 개발자 Kun Chen이 공유한 설정. **"완벽한 해결책은 아니므로 참고만"**하라는 단서.</p>
<p><strong>적용 위치:</strong> <code>~/.claude/settings.json</code> 또는 프로젝트 루트의 <code>.claude/settings.local.json</code>.</p>
</div>

<div class="context-block">
<h4>왜 중요한가</h4>
<p>Claude Code의 자동 최적화 기능들이 사용자에게는 **"느려졌다"**, **"바보가 됐다"**로 체감되는 사례가 늘고 있습니다. 이 설정들은 Anthropic의 자동 비용 절감 메커니즘을 끄는 대신 **사용자가 토큰 비용을 받아들이고 품질을 우선**하는 선택입니다. Max 20x 사용자에게 특히 의미 있는 튜닝.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>Adaptive Thinking</strong>: Claude가 입력의 난이도를 자체 판단해 사고 깊이를 동적으로 조절하는 기능. 비용 절감에는 좋지만, 모델이 "쉬워 보이는데 실제로는 복잡한 문제"를 오판하면 품질이 급락합니다.</p>
<p><strong>1M Context Mode</strong>: Claude의 100만 토큰 컨텍스트 윈도우 사용 모드. 활성화하면 더 많이 담을 수 있지만, 모델의 attention이 분산되어 응답 품질이 떨어질 수 있다는 보고.</p>
<p><strong>Auto Memory</strong>: Claude Code의 자동 메모리 시스템(<code>~/.claude/projects/.../memory/</code>). 의도와 다르게 오래된 메모리를 끌어와 현재 작업과 충돌할 수 있음.</p>
</div>
