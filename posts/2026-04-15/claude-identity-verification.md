---
layout: default
title: "Claude identity verification 공식 support — Persona 통한 정부 ID + 셀피 절차 도입"
---

<a href="../2026-04-15" class="back-link">&larr; 4월 15일 목록</a>

# Claude Identity Verification — 공식 Support

<div class="meta-line"><span class="tag tag-hn">HN</span> 21:49 KST</div>

> Anthropic이 Persona와 협력해 특정 경우 사용자에게 정부 ID + 셀피 기반 신원 인증을 요구하는 공식 support article 공개. HN score 69, posted 2026-04-15.

<div class="context-block">
<h4>출처 핵심 (Anthropic support article에서 확인되는 내용만)</h4>

<p><strong>트리거 조건 (직접 인용):</strong></p>
<blockquote>"You might see a verification prompt when accessing certain capabilities, as part of our routine platform integrity checks, or other safety and compliance measures."</blockquote>

<p><strong>영향 범위</strong>: "a few use cases"에 국한된다는 서술. 구체 사용자 세그먼트는 문서에 명시되지 않음.</p>

<p><strong>검증 방식 — Persona 협력:</strong></p>
<ul>
<li>정부 발행 사진 ID (passport, driver's license, national ID card)</li>
<li>카메라 장치로 live selfie</li>
<li>약 5분 소요</li>
</ul>

<p><strong>데이터 보호 (직접 인용):</strong></p>
<blockquote>"Your ID and selfie are collected and held by Persona, not on Anthropic's systems."</blockquote>
<blockquote>"We are not using your identity data to train our models."</blockquote>
<p>데이터는 전송·저장 양쪽에서 암호화.</p>

<p><strong>Claude Code 사용자 영향</strong>:</p>
<p>이 support article은 CLI 도구·API·Claude Code에 대한 구체 명시는 없음. 플랫폼 접근 전반 적용으로 읽히나 개발 도구 경로의 개별 영향은 문서 범위 밖.</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 API·CLI 도구 사용자는 ID verification 요구를 받는 경우가 드물었으나, 이번 정책은 <strong>"account activity나 compliance 필요에 따라 prompt"</strong>된다는 서술로 넓은 범위를 시사합니다. 동일 계정으로 Claude Code를 운영하는 프로덕션 환경에서는 세션 중간에 verification이 요구되면 운영 중단으로 이어질 수 있어, <strong>팀·기업 계정에서 사전 대비(verify 먼저 완료, 또는 별도 API key 분리)</strong>를 고려할 만합니다. Persona가 ID·selfie를 보유하고 Anthropic은 모델 학습에 쓰지 않는다고 명시한 점이 기본 프라이버시 보호 라인.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>Persona Identities</strong>: 일반적으로 미국 기반 KYC/KYB 인증 벤더. 여러 SaaS가 신원 검증에 위탁 사용.</p>
<p><strong>원문</strong>: <a href="https://support.claude.com/en/articles/14328960-identity-verification-on-claude" class="source-link">support.claude.com/en/articles/14328960-identity-verification-on-claude</a></p>
<p><strong>HN discussion</strong>: <a href="https://news.ycombinator.com/item?id=47775633" class="source-link">news.ycombinator.com/item?id=47775633</a></p>
</div>
