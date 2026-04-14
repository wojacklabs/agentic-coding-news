---
layout: default
title: "Claude Code settings.json의 effortLevel·DISABLE_1M_CONTEXT 옵션 설명 (X)"
---

<a href="../2026-04-14" class="back-link">&larr; 4월 14일 목록</a>

# effortLevel·DISABLE_1M_CONTEXT — X 설명 스레드

<div class="meta-line"><span class="tag tag-x">X</span> 12:36 KST</div>

> Claude Code settings.json 각 옵션이 무엇을 하는지 설명하는 X 스레드. <code>effortLevel</code>에 [low|medium|high|max|auto] 값을 넣을 수 있다는 구체 정보 확인.

<div class="context-block">
<h4>출처 핵심 (트윗에서 확인되는 내용만)</h4>

<p><strong>트윗 본문 (직접 인용):</strong></p>
<blockquote>"This is what each option does in claude code: effortLevel: high - this is pretty obvious, it decides the effort level of your model, and you can set either [low|medium|high|max|auto]. DISABLE_1M_CONTEXT -"</blockquote>

<p><strong>확인되는 구체 사실:</strong></p>
<ul>
<li>옵션 이름: <code>effortLevel</code></li>
<li>역할: "model의 effort level 결정"</li>
<li>허용 값 5개: <code>low</code> | <code>medium</code> | <code>high</code> | <code>max</code> | <code>auto</code></li>
<li>추가 옵션 <code>DISABLE_1M_CONTEXT</code> 언급 (설명은 트윗이 잘려 이어지지 않음)</li>
</ul>

<p><strong>참고</strong>: 트윗 본문이 <code>DISABLE_1M_CONTEXT -</code> 뒤에서 잘려있음. 다른 옵션 항목(<code>MAX_THINKING_TOKENS</code>, <code>CLAUDE_CODE_DISABLE_AUTO_MEMORY</code> 등)이 후속 트윗에 있을 가능성은 이 기사 출처 범위에서 확인되지 않음.</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 Claude Code settings.json은 공식 문서에 각 옵션 허용 값 목록이 정리되어 있지만, 커뮤니티에서는 여전히 "effortLevel을 어떻게 쓰지?" 같은 질문이 반복됩니다. 이 트윗처럼 허용 값을 나열해 주는 짧은 레퍼런스는 초기 진입자가 공식 docs를 찾기 전에 빠르게 참고하기에 유용합니다. 다만 "<code>auto</code>가 실제로 무엇을 기준으로 level을 선택하는지"는 트윗에 없으므로 공식 docs를 별도 확인하는 것이 안전합니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>Claude Code settings.json 위치</strong>: 일반적으로 <code>~/.claude/settings.json</code>(전역) 또는 프로젝트의 <code>.claude/settings.local.json</code>에 위치합니다. <code>env</code>·<code>permissions</code> 등 블록과 함께 모델 파라미터를 튜닝할 수 있습니다.</p>
<p><strong>1M context 모드</strong>: 일반적으로 Claude의 확장 컨텍스트(100만 토큰) 사용 여부를 제어하는 플래그로 알려져 있습니다. 활성/비활성의 trade-off(용량 vs attention quality)는 별도 실험 영역입니다.</p>
<p><strong>원문</strong>: <a href="https://x.com/mdlahfir/status/2043894707303100642" class="source-link">x.com/mdlahfir/status/2043894707303100642</a></p>
</div>
