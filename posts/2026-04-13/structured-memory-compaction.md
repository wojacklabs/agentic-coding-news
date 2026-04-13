---
layout: default
title: "Compaction에 저항하는 구조화 메모리 시스템 — 29 Python 스크립트, zero deps"
---

<a href="../2026-04-13" class="back-link">&larr; 4월 13일 목록</a>

# Compaction 저항 메모리 시스템

<div class="meta-line"><span class="tag tag-reddit">Reddit</span> r/ClaudeAI · 04:45 KST</div>

> Claude Code의 context compaction으로 잃어버리는 정보를 외부 메모리로 영속화하는 29개 Python 스크립트 모음이 공개되었습니다.

Reddit r/ClaudeAI에 공개된 이 프로젝트는 **의존성 없는 29개 Python 스크립트**로 구성된 메모리 시스템입니다. Claude Code가 context compaction을 실행할 때마다 중요한 사실·결정·TODO가 사라지는 문제를, 외부 구조화 저장소로 해결합니다. <a href="https://www.reddit.com/r/ClaudeAI/comments/1sjocso/i_built_a_structured_memory_system_that_survives/" class="source-link">원문</a>

<div class="context-block">
<h4>실전 기법 핵심</h4>
<p><strong>메모리 카테고리:</strong> facts (불변 사실), decisions (의사결정 기록), todos (미완료 작업), preferences (사용자 선호). 각각 별도 JSON 파일.</p>
<p><strong>쓰기 트리거:</strong> Claude Code Hook으로 도구 호출마다 자동 기록. 수동 `/remember` 커맨드도 제공.</p>
<p><strong>읽기 흐름:</strong> 세션 시작 시 `SESSION_INIT.md`가 관련 메모리를 긁어 컨텍스트에 주입. Compaction 후에도 다음 턴에 재주입됨.</p>
<p><strong>Zero deps:</strong> 표준 라이브러리만 사용. <code>pip install</code> 불필요. 다른 프로젝트에 복사-붙여넣기로 바로 적용 가능.</p>
</div>

<div class="context-block">
<h4>왜 중요한가</h4>
<p>Claude Code의 context compaction은 장시간 작업 시 필수 기능이지만, 부작용으로 중요한 결정·제약사항이 사라집니다. 외부 메모리로 이를 보완하는 것은 에이전틱 코딩을 **몇 시간→며칠 단위 프로젝트**로 확장하는 핵심 요소입니다. CLAUDE.md는 정적 설정이고, 이 시스템은 동적 메모리로서 보완재입니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>Context Compaction</strong>: Claude Code가 대화 기록이 컨텍스트 윈도우 상한에 가까워지면 과거 메시지를 요약으로 압축하는 기능. 토큰 효율은 좋아지나 상세 정보 손실.</p>
<p><strong>Claude Code Hooks</strong>: 도구 호출 전/후에 shell 명령을 실행할 수 있는 확장 메커니즘. <code>.claude/hooks.json</code>에 정의하며 메모리 자동 기록에 활용 가능.</p>
<p><strong>auto memory (Claude Code 내장)</strong>: 최근 Claude Code에 내장된 기능으로, <code>~/.claude/projects/.../memory/</code>에 자동 저장. 이 프로젝트는 그 이전에 등장한 커뮤니티 솔루션이지만 커스터마이징 자유도가 높습니다.</p>
</div>
