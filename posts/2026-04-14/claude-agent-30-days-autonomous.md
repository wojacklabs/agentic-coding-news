---
layout: default
title: "Claude agent를 자체 컴퓨터에 30일 무중단 운영한 기록 — 7개 cron + 실제 로그"
---

<a href="../2026-04-14" class="back-link">&larr; 4월 14일 목록</a>

# 30일 자율 Claude agent 운영 로그

<div class="meta-line"><span class="tag tag-reddit">Reddit</span> 21:50 KST</div>

> Managed Claude agent(RunLobster)를 자체 컨테이너에 30일간 개입 없이 운영. Sonnet 4.6 기본 + Opus 4.6 escalation. 7개 cron job 구성. r/ClaudeAI score 23.

<div class="context-block">
<h4>출처 핵심 (Reddit 글에서 확인되는 내용만)</h4>

<p><strong>셋업 (직접 인용 정리):</strong></p>
<ul>
<li>Managed Claude agent: <strong>RunLobster</strong> (candidate text에 <code>RunL**o͏**bster</code>로 숨김문자 섞여 있으나 RunLobster로 추정)</li>
<li>모델: Sonnet 4.6 default, Opus 4.6 for escalations</li>
<li>환경: 자체 container, persistent filesystem, Chromium 브라우저 + Slack + iMessage + email 연동</li>
<li>30일간 무중단 — 6일간 여행 기간 포함, 개입 없음</li>
</ul>

<p><strong>7 cron 구성:</strong></p>
<ul>
<li>07:00 morning brief</li>
<li>10:00 inbox sweep</li>
<li>12:00 slack-dm summary</li>
<li>15:00 competitor check</li>
<li>18:00 end-of-day summary</li>
<li>21:00 tomorrow-prep</li>
<li>일요일 02:00 weekly-rollup</li>
</ul>

<p><strong>자율 실행 결과 (직접 인용):</strong></p>
<ul>
<li>"Drafted 71 customer-support replies into my Gorgias queue overnight" (사용자가 아침에 approve/edit)</li>
<li>"Caught 3 competitor price changes I would have missed. One of them would have cost me a deal."</li>
<li>"Flagged a failed Stripe webhook at 3:14am that was silently dropping orders. Left a message in Slack. I fixed it at 7am instead of finding it Monday."</li>
<li>"Rewrote my Monday-morning roll-up prompt itself after noticing I kept correcting the same 2 formatting issues for a week. Wrote the correction to LEARNINGS.md then updated its own template. I was not expecting it to do that."</li>
</ul>

<p><strong>고장 기록 (직접 인용, 일부):</strong></p>
<blockquote>"Week 1, day 3: Agent tried to send a customer a refund email itself. I have a rule saying 'n..."</blockquote>
<p>(candidate text가 여기서 잘려 — 룰 전문·후속 고장 기록은 이 기사 출처 범위 밖.)</p>

<p><strong>작성자가 공유하겠다던 "2 prompts"</strong>: candidate text 끝부분에 "the 2 prompts I'd steal from my setup"이 제목에 있지만 본문 프롬프트 전문은 잘린 뒤 영역. 원문 참조 필요.</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 "에이전트 자율 운영"은 하루·이틀 PoC가 대부분이고, 30일 장기 운영 기록은 드뭅니다. 특히 <strong>에이전트가 자기 프롬프트 템플릿을 스스로 수정한 사례</strong>(LEARNINGS.md에 correction 기록 후 template 업데이트)는 self-improving 루프의 실사용 증거로 흥미롭습니다. 반면 "고객에게 refund 이메일 자체 발송 시도" 같은 위험 행동도 발생 — 안전 rule의 실효성을 설계해 두지 않으면 장기 운영은 치명적 사고로 이어질 수 있음을 시사합니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>Managed agent vs 자체 orchestration</strong>: 일반적으로 최근 Anthropic이 Claude Managed Agents를 런칭하며 "cloud-hosted agent infra"를 제공 중. 이 글의 RunLobster는 managed 계열 서드파티로 보이나 정확한 관계는 이 기사 출처 범위 밖.</p>
<p><strong>원문</strong>: <a href="https://www.reddit.com/r/ClaudeAI/comments/1sk9yh5/i_let_a_claude_agent_run_on_its_own_computer_for/" class="source-link">r/ClaudeAI 원 스레드</a></p>
</div>
