---
layout: default
title: ".claude/ 폴더 구조 — CLAUDE.md → rules → skills → agents 4계층 패턴"
---

<a href="../2026-04-13" class="back-link">&larr; 4월 13일 목록</a>

# .claude/ 폴더 4계층 구조 패턴

<div class="meta-line"><span class="tag tag-x">X</span> 15:53 KST</div>

> Claude Code 운영 효율을 좌우하는 **.claude/ 디렉토리 구조 패턴**이 X에서 공유되었습니다.

@oda_nobunaga10이 실전에서 정착시킨 **CLAUDE.md → rules → skills → agents** 4계층 구성. 이 구조가 자리 잡으면 Claude Code 운영이 "한순간 달라진다"는 평가입니다.

<div class="context-block">
<h4>실전 기법 — 4계층 역할</h4>
<ol>
<li><strong>CLAUDE.md (루트):</strong> 프로젝트 전체에 적용되는 최상위 컨텍스트. 스택, 컨벤션, 절대 규칙, 빌드 명령. 모든 세션 시작 시 자동 로드.</li>
<li><strong>.claude/rules/:</strong> 분야별 세부 규칙을 마크다운으로 모듈화. 예: <code>typescript.md</code>, <code>git-workflow.md</code>, <code>testing.md</code>. 필요시 CLAUDE.md에서 참조.</li>
<li><strong>.claude/skills/:</strong> 반복 작업을 패키지화한 Skill 모음. 예: <code>create-pr.md</code>, <code>generate-tests.md</code>, <code>refactor-component.md</code>. <code>/skill-name</code>으로 호출.</li>
<li><strong>.claude/agents/:</strong> 특화 sub-agent 정의. 코드 리뷰어, 테스트 작성자, 문서 생성자 등을 별도 인격으로 분리.</li>
</ol>
<p><strong>설정 순서:</strong> CLAUDE.md(즉시) → rules(스택 정해진 후) → skills(반복 발견 시) → agents(역할 분담 필요 시).</p>
</div>

<div class="context-block">
<h4>왜 중요한가</h4>
<p>Claude Code 사용자들이 흔히 빠지는 함정은 **모든 것을 CLAUDE.md 하나에 욱여넣는 것**입니다. 파일이 비대해지면 매 세션 토큰을 소모하고, 구체 작업 시 관련 없는 컨텍스트가 노이즈가 됩니다. 4계층 분리는 "필요한 것만 필요할 때" 로드되도록 합니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>Hierarchical Configuration</strong>: 설정을 계층화하는 패턴. UNIX의 <code>/etc/</code> 분할, ESLint의 config cascade와 유사한 접근입니다.</p>
<p><strong>Skill vs Agent vs Rule</strong>: Rule은 "항상 적용되는 제약", Skill은 "필요시 호출되는 작업 패키지", Agent는 "독립된 인격을 가진 sub-AI". 헷갈리기 쉽지만 역할이 다릅니다.</p>
</div>
