---
layout: default
title: "Claude Agent Skills 공식 런칭 — Apps / Developer Platform / Claude Code 통합"
---

<a href="../2026-04-13" class="back-link">&larr; 4월 13일 목록</a>

# Claude Agent Skills 공식 런칭

<div class="meta-line"><span class="tag tag-hn">HN</span> 19:02 KST</div>

> Anthropic이 "Agent Skills"를 공식 공개. Skills는 "Claude가 필요할 때 로드할 수 있는 instructions, scripts, resources를 포함한 폴더". HN 최상위.

<div class="context-block">
<h4>출처 핵심 (Anthropic 공식 블로그에서 확인되는 내용만)</h4>
<p>Anthropic은 Skills를 다음과 같이 정의:</p>
<ul>
<li>"folders that include instructions, scripts, and resources that Claude can load when needed"</li>
<li>"Claude will only access a skill when it's relevant to the task at hand"</li>
</ul>
<p>네 가지 특성:</p>
<ul>
<li><strong>Composable</strong>: 여러 Skills가 함께 작동, Claude가 자동으로 판별·조율</li>
<li><strong>Portable</strong>: 동일한 포맷이 Claude Apps, Claude Code, API에서 작동</li>
<li><strong>Efficient</strong>: 필요할 때만 필요한 컴포넌트를 로드</li>
<li><strong>Powerful</strong>: 실행 가능한 코드를 포함할 수 있음 — "token generation보다 programming이 더 신뢰할 수 있는 작업"에 사용</li>
</ul>
<p>제공 플랫폼 3곳:</p>
<ol>
<li><strong>Claude Apps</strong> — Pro, Max, Team, Enterprise 플랜. 사용자 작업에 맞춰 자동 호출</li>
<li><strong>Claude Developer Platform (API)</strong> — 새 <code>/v1/skills</code> 엔드포인트로 프로그래밍 제어</li>
<li><strong>Claude Code</strong> — 개발 환경에 통합</li>
</ol>
<p>Anthropic 제공 기본 Skills:</p>
<ul>
<li>Excel 스프레드시트 읽기·생성(수식 포함)</li>
<li>PowerPoint 프레젠테이션 생성</li>
<li>Word 문서 생성</li>
<li>PDF 채우기·생성</li>
</ul>
<p>커스텀 Skill을 대화형으로 만들도록 안내하는 <strong>skill-creator</strong> skill도 함께 제공. Team/Enterprise 관리자는 먼저 조직 레벨에서 Skills를 활성화해야 함.</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 Claude Code 사용자는 <code>CLAUDE.md</code>, slash commands, MCP 서버 세 가지로 세션을 확장해 왔습니다. Skills는 이들과 독립된 <strong>네 번째 확장 축</strong>으로 보입니다. 특히 "Portable — 같은 포맷이 Apps·Code·API에서 작동"은 팀 단위 지식을 한 번 작성해 여러 환경에서 재사용할 수 있다는 점에서 실무적 가치가 큽니다. 실행 가능한 코드를 포함할 수 있다는 점은 결정적 계산·변환 작업을 LLM 토큰 생성이 아니라 결정적 스크립트로 처리할 수 있게 해줍니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>Skill vs MCP</strong>: 유사 도구로 MCP 서버가 있으나, 두 방식의 자리매김에 대해서는 <a href="https://simonwillison.net/2025/Oct/16/claude-skills/" class="source-link">Simon Willison의 분석</a>이 함께 주목받고 있습니다(별도 기사 참조).</p>
<p><strong>공식 출처</strong>: <a href="https://www.anthropic.com/news/skills" class="source-link">Anthropic 공식 발표</a> (현재 <a href="https://claude.com/blog/skills" class="source-link">claude.com/blog/skills</a>로 리다이렉트)</p>
<p><strong>HN discussion</strong>: <a href="https://news.ycombinator.com/item?id=45607117" class="source-link">news.ycombinator.com/item?id=45607117</a></p>
</div>
