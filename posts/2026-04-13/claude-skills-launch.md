---
layout: default
title: "Claude Skills 공식 런칭 — Simon Willison: 'MCP보다 큰 일일 수 있다'"
---

<a href="../2026-04-13" class="back-link">&larr; 4월 13일 목록</a>

# Claude Skills 공식 런칭

<div class="meta-line"><span class="tag tag-hn">HN</span> 17:34 KST</div>

> Anthropic이 "Agent Skills"를 공식 공개. HN 최상위(816점). Simon Willison은 "MCP보다 더 큰 일일 수 있다"(738점)며 구조적 중요성을 분석.

Claude Code·Claude API 에이전트에게 **재사용 가능한 "기술(Skill)"을 장착**하는 방식을 Anthropic이 엔지니어링 블로그에서 정식 문서화하고 런칭했습니다. HN 프런트 페이지에서 두 개의 관련 포스트가 1, 2위를 동시 점유하며 커뮤니티의 압도적 관심을 받고 있습니다.

<div class="context-block">
<h4>실전 핵심 — Skill이 무엇인가</h4>
<ul>
<li><strong>마크다운 파일 하나로 정의되는 능력 단위</strong>: <code>SKILL.md</code>에 이름·설명·사용법·스크립트 참조를 작성</li>
<li><strong>LLM이 스스로 호출 판단</strong>: 사용자가 요청하지 않아도 문맥에 맞게 해당 Skill을 자동 적용</li>
<li><strong>파일 시스템 기반</strong>: <code>.claude/skills/</code> 디렉토리에 배치 → 세션 시작 시 자동 발견·로드</li>
<li><strong>스크립트 동봉 가능</strong>: Skill 안에 Python/Bash 스크립트를 넣으면 LLM이 필요 시 실행</li>
<li><strong>공유 단위</strong>: Skill 폴더 하나가 그대로 패키지 → GitHub·내부 레지스트리로 유통</li>
</ul>
</div>

<div class="context-block">
<h4>Simon Willison의 분석 — "MCP보다 큰 일"</h4>
<p>Simon Willison은 자신의 블로그 글에서 <strong>Skills이 MCP보다 구조적으로 더 근본적</strong>이라는 주장을 폅니다:</p>
<ul>
<li>MCP는 <em>외부 도구 연결 프로토콜</em>이지만, Skills는 <em>에이전트의 행동 패턴 자체를 프로그래밍</em>하는 수단</li>
<li>MCP 서버 설치·인증·실행 오버헤드 없이, Skill은 단순 md 파일로 즉시 배포 가능</li>
<li>여러 Skills을 조합하면 MCP 서버 여러 개를 조합하는 것과 유사한 효과 — 더 가벼운 추상화</li>
<li>에이전트 관점에서 "문서"와 "기능"의 경계가 사라짐 — 문서가 곧 실행 가능한 능력</li>
</ul>
</div>

<div class="context-block">
<h4>왜 중요한가</h4>
<p>Claude Code 활용 심화의 관점에서 <strong>Skill은 새로운 1차 구성 요소</strong>입니다. 기존에 CLAUDE.md, slash commands, MCP 서버 3가지로 세션을 커스터마이즈했다면, 이제 <strong>Skill이 네 번째 축</strong>이 됩니다. 특히 팀 단위 지식·워크플로우 공유에 가장 적합한 단위이며, <a href="https://simonwillison.net/2025/Oct/16/claude-skills/" class="source-link">Simon Willison 분석</a>의 지적처럼 MCP의 일부 유스케이스를 대체할 가능성이 있습니다. <a href="https://www.anthropic.com/news/skills" class="source-link">Anthropic 공식 런칭</a>과 <a href="https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills" class="source-link">엔지니어링 블로그</a>에서 상세 설계 참조 가능.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>Skill vs MCP vs Slash Command</strong>:</p>
<ul>
<li><strong>MCP 서버</strong>: 외부 시스템(DB, API, 도구) 연결 — 프로세스 실행 필요</li>
<li><strong>Slash Command</strong>: 사용자가 명시적으로 호출하는 프롬프트 템플릿</li>
<li><strong>Skill</strong>: 에이전트가 문맥 판단으로 <em>자동 로드</em>하는 능력 단위 — 파일만 있으면 됨</li>
</ul>
<p><strong>디렉토리 위치</strong>: <code>~/.claude/skills/</code>(전역) 또는 <code>.claude/skills/</code>(프로젝트별). 이미 Claude Code가 찾아서 로드.</p>
</div>
