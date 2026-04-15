---
layout: default
title: "teardown.fyi — Claude + Playwright로 웹사이트 125개 해체, dark pattern tracker·feature flag 자동 발굴"
---

<a href="../2026-04-16" class="back-link">&larr; 4월 16일 목록</a>

# teardown.fyi — Claude Playwright Teardown

<div class="meta-line"><span class="tag tag-reddit">Reddit</span> 03:47 KST</div>

> 원래는 procurement agent가 웹사이트를 탐색하게 하려고 Claude에게 사이트 해체를 맡겼는데, 부산물로 tracker·feature flag·노출된 데이터가 계속 튀어나왔다. ~125개 사이트 run 후 OSS 공개 (<code>hayabhay/teardown</code> + teardown.fyi). r/ClaudeAI score 38, posted 2026-04-16 01:33 KST.

<div class="context-block">
<h4>출처 핵심 (Reddit selftext에서 확인되는 내용만)</h4>

<p><strong>기원 (직접 인용):</strong></p>
<blockquote>"i'm building agents for procurement & one thread has been to let claude systematically deconstruct a website so agents can navigate them."</blockquote>

<p><strong>부산물 관찰 (직접 인용):</strong></p>
<blockquote>"but as i've been doing this, like a piñata, interesting things keep falling off -- from trackers, to interesting feature flags to even some over-exposed data."</blockquote>

<p><strong>사이트 수</strong>: "i've run it for about ~125 websites so far"</p>

<p><strong>발견 예시 (직접 인용):</strong></p>
<blockquote>"WebMD -- Browsing a depression or diabetes page on WebMD tags your ad profile with health-condition labels sent to 20+ bidders — most visitors never see a consent prompt."</blockquote>
<blockquote>"Legacy.com -- Wunderkind's retargeting config collects the deceased's name and obituary date as behavioral variables -- timed to a 15-day bereavement window."</blockquote>
<blockquote>"Pornhub -- Every ad impression sends your IP address, ISP, and zip code to the ad network in a protobuf payload — on every page view, not just login."</blockquote>

<p><strong>저자 주의 (직접 인용):</strong></p>
<blockquote>"of course, these are claude generated & it can yolo & infer things that are nothing-burgers but interesting starting points nonetheless!"</blockquote>

<p><strong>공개</strong>: oss repo <code>github.com/hayabhay/teardown</code> + <code>teardown.fyi</code></p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 웹사이트의 tracker·feature flag 조사는 Lighthouse·WhoTracksMe 같은 결정적 도구가 담당해왔지만, <strong>"LLM이 페이지 구조·네트워크 요청·JS 소스를 보며 의도를 추론"</strong>하는 접근은 (a) 결정 규칙으로 잡기 어려운 "의도적 설계" 패턴(bereavement window 타이밍 같은)을 짚어낼 수 있고 (b) 125개 샘플처럼 스케일 run이 가능. 작성자가 <strong>"claude generated & it can yolo & infer"</strong>라고 스스로 한계를 명시한 점이 중요 — <strong>"starting point로 쓰고 사람이 검증"</strong>하는 워크플로. Claude Code 파워유저에게는 Playwright + LLM을 묶어 site auditing을 OSS로 공개한 실제 사례로 참고 가치가 있습니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>Playwright</strong>: 일반적으로 Microsoft가 주도하는 브라우저 자동화 라이브러리. 여러 언어 바인딩이 있고 헤드리스 크롤링·인터랙션 캡처에 널리 쓰임.</p>
<p><strong>dark pattern</strong>: 일반적으로 사용자의 선택을 불리한 쪽으로 유도하는 UI·UX 설계. tracker·consent prompt 회피도 광의로 포함.</p>
<p><strong>원문</strong>: <a href="https://www.reddit.com/r/ClaudeAI/comments/1smb8kj/claude_playwright_to_teardown_websites_and/" class="source-link">r/ClaudeAI 원 스레드</a></p>
</div>
