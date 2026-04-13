---
layout: default
title: "Waza(技) — 마크다운만으로 된 Claude Code Skill 라이브러리"
---

<a href="../2026-04-13" class="back-link">&larr; 4월 13일 목록</a>

# Waza(技) 오픈소스 Skill 라이브러리

<div class="meta-line"><span class="tag tag-threads">Threads</span> #aithreads · 12:52 KST</div>

> Mole 제작자 tw93이 만든 **Waza(技)** — 코드 한 줄 없이 마크다운만으로 구성된 Claude Code Skill 라이브러리가 Threads에서 score 51로 주목받고 있습니다.

"스킬이 수천 개인 시대에, 문서파일 8개로 해결한다"는 접근이 핵심입니다. Waza는 Claude Code의 Skills 메커니즘을 **최대한 단순화**하여, 복잡한 코드 없이 마크다운 문서만으로 수천 개의 작업 패턴을 구조화합니다.

<div class="context-block">
<h4>실전 기법 핵심</h4>
<p><strong>구성 원칙:</strong></p>
<ul>
<li>코드 0줄: 모든 로직이 마크다운 프롬프트로 표현됨</li>
<li>문서 8개로 분류: skill을 카테고리별로 나누어 검색 효율 확보</li>
<li>선언적 설계: "이런 요청이 오면 이렇게 답해라" 패턴</li>
</ul>
<p><strong>사용법:</strong> <code>.claude/skills/waza/</code> 디렉토리에 Waza 레포를 배치 → Claude Code가 자동 로드 → 필요 시 <code>/waza</code> 커맨드로 호출.</p>
<p><strong>장점:</strong> Python/TypeScript 의존성 없음. 비개발자도 기여 가능. 리뷰·버전 관리가 마크다운 diff로 단순.</p>
</div>

<div class="context-block">
<h4>왜 중요한가</h4>
<p>에이전틱 코딩 Skill 생태계가 **"코드 + 프롬프트" 복합 구조**로 가던 추세에서, Waza는 **"프롬프트 only"의 미니멀리즘**을 제안합니다. 진입 장벽이 낮아 커뮤니티 기여가 폭발적으로 증가할 수 있고, 코드 실행 권한 없이 쓸 수 있어 보안 리뷰도 간단합니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>Mole</strong>: tw93의 대표작 macOS 트레이 앱. 간단한 구조와 우아한 UX로 커뮤니티에서 인기를 얻었고, Waza도 같은 "단순성" 철학을 따릅니다.</p>
<p><strong>Claude Code Skills 메커니즘</strong>: <code>.claude/skills/</code>에 <code>SKILL.md</code> 파일을 두면 자동 인식됩니다. 코드를 함께 둘 수도 있지만 Waza처럼 순수 마크다운만으로도 충분히 동작합니다.</p>
</div>
