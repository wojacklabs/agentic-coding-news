---
layout: default
title: "Claude Code vs Codex 보안 결정 감사 — 12 세션, bcrypt/JWT/CSRF/rate-limit 비교"
---

<a href="../2026-04-16" class="back-link">&larr; 4월 16일 목록</a>

# Claude Code vs Codex — Security Decisions Audit

<div class="meta-line"><span class="tag tag-hn">HN</span> 12:47 KST</div>

> Claude Code (Opus 4.6) vs Codex (GPT-5.4)에게 동일 프롬프트로 auth·file upload·search·admin·webhook·prod config 12 세션 수행시킨 보안 감사. 0/12 세션이 login rate limiting 추가, 9/12가 1자 패스워드 허용. Claude는 6/6 bcrypt + JWT 라이브러리 사용, Codex는 2/6에서 raw HMAC 직접 구현. FastAPI 92-96% vs Next.js 73-75% 컴플라이언스. amplifying.ai, posted 2026-04-16, HN score 2 (47782516).

<div class="context-block">
<h4>출처 핵심 (amplifying.ai/research/ai-security-decisions에서 확인되는 내용만)</h4>

<p><strong>실험 설정 (블로그 기반 요약)</strong>:</p>
<ul>
<li>Claude Code v2.1.88 (Opus 4.6) vs OpenAI Codex CLI 0.116.0 (GPT-5.4)</li>
<li>12 세션, 레포 2종: FastAPI (Python) + Next.js 14 (TypeScript)</li>
<li>동일 프롬프트: auth, file upload, search, admin controls, webhook, production config</li>
</ul>

<p><strong>공통 결함 (직접 인용):</strong></p>
<blockquote>"0 out of 12 sessions added rate limiting to the login endpoint. No session volunteered brute-force throttling."</blockquote>
<blockquote>"9/12 sessions accepted a single-character password"</blockquote>
<p>API docs production 노출(Codex: Swagger UI), security headers(X-Content-Type-Options·X-Frame-Options·HSTS) 미추가 공통.</p>

<p><strong>차이점 — Password hashing (직접 인용):</strong></p>
<p>Claude: 6/6 bcrypt. Codex: "PBKDF2 or scrypt from the standard library instead" of external packages.</p>

<p><strong>차이점 — JWT (직접 인용):</strong></p>
<p>Claude: 6/6 established library (jsonwebtoken, PyJWT). Codex: 2/6에서 raw HMAC 직접 구현, Python에서 <code>==</code> signature comparison 사용 (constant-time 아님).</p>

<p><strong>프레임워크 영향 (직접 인용):</strong></p>
<blockquote>"framework was the main changed variable"</blockquote>
<p>FastAPI: 92-96% compliance. Next.js: 73-75% compliance.</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 Claude Code 파워유저는 "auth 시스템 짜줘"라고 지시하고 결과를 신뢰하지만, 이 감사는 <strong>"명시적으로 요청하지 않은 보안 조치는 거의 안 나온다"</strong>는 실증을 제공합니다. Rate limiting 0%, 1자 패스워드 9/12 허용은 <strong>"보안 요구사항을 프롬프트에 구체 지시해야 한다"</strong>는 실무 교훈. Claude Code가 bcrypt·JWT 라이브러리를 일관 선택한 점은 긍정적이지만, <strong>프레임워크 차이(FastAPI vs Next.js에서 ~20% 갭)</strong>가 에이전트 차이보다 더 영향이 크다는 발견은 "올바른 프레임워크 선택이 올바른 에이전트 선택보다 중요할 수 있다"는 시사점을 줍니다. 프로덕션 배포 전 OWASP checklist + rate-limit·headers·password policy 프롬프트 추가가 권장됩니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>constant-time comparison</strong>: 일반적으로 signature 검증에서 <code>==</code> 대신 timing-safe comparison을 써야 timing attack 방지. Python <code>hmac.compare_digest()</code>가 표준.</p>
<p><strong>security headers</strong>: 일반적으로 X-Content-Type-Options·X-Frame-Options·HSTS 등은 브라우저 공격 벡터를 줄이는 기본 HTTP 응답 헤더. 프레임워크가 기본 세팅하지 않으면 개발자(또는 에이전트)가 명시 추가해야 함.</p>
<p><strong>원문</strong>: <a href="https://amplifying.ai/research/ai-security-decisions" class="source-link">amplifying.ai/research/ai-security-decisions</a></p>
<p><strong>HN discussion</strong>: <a href="https://news.ycombinator.com/item?id=47782516" class="source-link">news.ycombinator.com/item?id=47782516</a></p>
</div>
