---
layout: default
title: "AMD AI 디렉터 Stella Laurenzo, 7,000세션 분석으로 Claude Code 회귀 문서화"
---

<a href="../2026-04-14" class="back-link">&larr; 4월 14일 목록</a>

# AMD 디렉터 분석 — 7,000세션 수치

<div class="meta-line"><span class="tag tag-reddit">Reddit</span> 19:00 KST</div>

> AMD AI 디렉터 Stella Laurenzo가 2026-04-02 GitHub 이슈로 Claude Code 행동 회귀를 수치화. 7,000 세션 분석 기반. r/ClaudeAI에서 score 1820.

<div class="context-block">
<h4>출처 핵심 (Reddit 글에서 확인되는 내용만)</h4>

<p><strong>메타:</strong></p>
<ul>
<li>인물: Stella Laurenzo (AMD AI 디렉터)</li>
<li>문서 형식: GitHub 이슈</li>
<li>제출일: 2026-04-02</li>
<li>분석 범위: 약 7,000 세션</li>
</ul>

<p><strong>측정된 성능 회귀 (직접 인용):</strong></p>
<blockquote>"Claude Code reads code three times less, rewrites files twice as often, and abandons tasks at previously unseen rates."</blockquote>

<p><strong>Reddit 글이 정리한 근본 원인:</strong></p>
<blockquote>"Anthropic's March 2026 thinking content redaction reduced visible reasoning from 100% to zero over just eight days, triggering the behavioral collapse."</blockquote>

<p><strong>AMD 팀 대응:</strong></p>
<blockquote>"AMD's engineering team has already switched to a competing AI coding provider, citing Claude Code's inability to handle complex tasks reliably."</blockquote>

<p><strong>Laurenzo의 권고:</strong></p>
<ul>
<li>thinking visibility 복원</li>
<li>"guaranteed deep reasoning"용 premium tier 도입</li>
</ul>

<p><strong>패턴 지적:</strong></p>
<blockquote>"Anthropic shipped 14 releases alongside 5 outages in March 2026, suggesting quality assurance has not kept pace with rapid growth."</blockquote>

<p><strong>참고</strong>: Reddit 본문 끝부분의 GitHub 이슈 링크는 candidate text에서 <code>https://github.com/anthropics/cla</code>로 잘림. 전체 URL·이슈 번호·Anthropic 공식 응답은 이 기사 출처 범위에서 확인되지 않음.</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 Claude Code 성능 체감 저하는 정량화하기 어렵고, 개별 사용자 보고는 "내 환경 탓"이라는 반박을 받기 쉽습니다. AMD 같은 대형 벤더의 AI 디렉터가 <strong>7,000 세션 데이터로 세 가지 구체 지표</strong>를 제시한 것은 이 논쟁의 무게중심을 바꾸는 이벤트입니다. 특히 "thinking 가시성 100% → 0" 변화가 근본 원인으로 지목된 점은, 앞서 커뮤니티에서 보고되던 cache TTL 변경·invisible tokens·Output Styles 미주입 등과 같이 <strong>Anthropic의 client-side 조정이 사용자 체감에 반영되는 패턴</strong>과 일관됩니다. 다만 단일 디렉터의 분석이므로 Anthropic 공식 응답·독립 재현이 후속 단계에서 필요합니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>thinking content redaction</strong>: 일반적으로 Claude의 reasoning(사고 과정) 일부를 응답에서 숨기는 조치. 사용자는 최종 답변만 보게 되며, 디버깅·프롬프트 개선 시 "왜 이렇게 판단했는지" 추적이 어려워집니다.</p>
<p><strong>원문</strong>: <a href="https://www.reddit.com/r/ClaudeAI/comments/1sifepi/amd_ai_directors_analysis_confirms_lobotomization/" class="source-link">r/ClaudeAI 원 스레드</a></p>
</div>
