---
layout: default
title: "Claude Code 2.1.107 OAuth 'Paste code here'에서 12시간 넘게 멈춤 — 재확장 본문"
---

<a href="../2026-04-15" class="back-link">&larr; 4월 15일 목록</a>

# OAuth 2.1.107 Paste Code Stuck

<div class="meta-line"><span class="tag tag-hn">HN</span> 00:50 KST</div>

> Claude Code 2.1.107의 OAuth 플로우가 "Paste code here if prompted >" 프롬프트에서 멈춰 12시간 넘게 진행 불가. xdotool로 타이핑해도 실패. Reddit·Discord엔 있으나 상태 페이지엔 없음. HN score 5, 04-14 posted.

<div class="context-block">
<h4>출처 핵심 (HN 본문에서 확인되는 내용만)</h4>

<p><strong>본문 직접 인용:</strong></p>
<blockquote>"Claude Code OAuth on 2.1.107 is stuck on `Paste code here if prompted &gt;` - Impossible to paste (tried many methods, INCLUDING typing with xdotool the OAuth), there is a serious error that seems under-reported outside of Reddit &amp; Discord right now, why isn't this considered an emergency and isn't reported on the status page."</blockquote>

<p><strong>문제 세부 (직접 인용):</strong></p>
<blockquote>"It's not about the account because the account isn't even validated yet, clicking on the link given, success, claude.com gives out the Token, then can't copy it back to Terminal (any terminal, tmux/ttyd/bash/vscode...)"</blockquote>

<p><strong>지원 대응 (직접 인용):</strong></p>
<blockquote>"Tried to contact Anthropic about it but the chatbot is unhelpful, hoping that they'll notice by posting here because we are probably talking about thousand of users stuck here."</blockquote>

<p><strong>타이핑 시도 (직접 인용):</strong></p>
<blockquote>"Typing the code (although very annoying) doesn't seem to work as well because it 'validates' it after typing maybe half of it and just early return."</blockquote>

<p><strong>정확한 문제 범위 (직접 인용):</strong></p>
<blockquote>"To be clear, pasting does work anywhere else than the specific OAuth frame with `Browser didn't open? Use the url below to sign in (c to copy)`."</blockquote>

<p><strong>참고</strong>: HN discussion의 댓글·Anthropic 공식 대응·resolution 여부는 이 기사 출처 범위에서 확인되지 않음. 장애 해결 여부는 Anthropic status page + HN discussion 추적 필요.</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 OAuth 흐름에서 "코드를 브라우저에서 받아 터미널에 붙여넣기"는 CLI 인증의 흔한 패턴입니다. 2.1.107에서 <strong>특정 OAuth 프레임의 붙여넣기만 막히는</strong> 것은 터미널 focus/IME 처리 문제로 추정되지만 원인은 글 밖. 신규 로그인이 안 되면 <strong>새 환경 셋업·신규 사용자 온보딩 불가</strong>로 이어집니다. 임시 우회는 이전 버전(2.1.98 등)으로 다운그레이드가 자주 언급되지만 이 글 본문에서는 우회 제시가 없음.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>Claude Code OAuth 플로우</strong>: 일반적으로 브라우저에서 Anthropic 계정 로그인 후 토큰 문자열을 발급받아 터미널에 붙여넣어 인증 완료. <code>Browser didn't open? Use the url below</code> 메시지는 브라우저 자동 오픈 실패 시 fallback 흐름.</p>
<p><strong>원문</strong>: <a href="https://news.ycombinator.com/item?id=47762585" class="source-link">news.ycombinator.com/item?id=47762585</a></p>
</div>
