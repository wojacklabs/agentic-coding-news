---
layout: default
title: ".claude/ 디렉토리·hook events·settings를 한 페이지로 정리한 치트 시트"
---

<a href="../2026-04-14" class="back-link">&larr; 4월 14일 목록</a>

# Claude Code Folder Structure Reference

<div class="meta-line"><span class="tag tag-reddit">Reddit</span> 15:38 KST</div>

> 한 달 동안 Claude Code를 집중 사용하며 "어디에 뭐가 들어가는지"를 공식 docs 여러 페이지에서 계속 확인해야 했던 사용자가 만든 치트 시트. <code>.claude/</code> 디렉토리 레이아웃, hook 이벤트, settings 등을 한 페이지에 정리.

<div class="context-block">
<h4>출처 핵심 (Reddit 글에서 확인되는 내용만)</h4>

<p><strong>작성 동기 (직접 인용):</strong></p>
<blockquote>"Been using Claude Code pretty heavily for the past month, and kept getting tripped up on where things actually go. The docs cover it, but you're jumping between like 6 different pages trying to piece it together"</blockquote>

<p><strong>치트 시트가 커버하는 항목 (직접 인용):</strong></p>
<blockquote>"covers the .claude/ directory layout, hook events, setting..."</blockquote>
<p>(candidate text가 "setting..."에서 잘림. 전체 커버 목록은 이 기사 출처 범위에서 확인되지 않음.)</p>

<p><strong>참고</strong>: 치트 시트 파일 위치(GitHub?), 포맷(PDF/MD/이미지?), 라이선스 등은 candidate text가 잘려 이 기사 출처 범위에서 확인되지 않음. "Claude Code folder structure reference"가 제목이며, 본문 도입부 외 내용은 원문 참조 필요.</p>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 Claude Code는 기능 확장이 빠르고, <code>.claude/</code> 하위의 <code>skills/</code>·<code>agents/</code>·<code>commands/</code>·<code>hooks/</code>·<code>settings.json</code> 같은 여러 요소가 계속 추가되는 중이라 초기 사용자가 전체 구조를 파악하기 어렵습니다. "한 페이지 치트 시트"는 공식 docs의 파편화를 보완하는 커뮤니티 성격의 레퍼런스로, 팀 내부 온보딩 보조 자료로 활용 여지가 있습니다. 단 커뮤니티 제작물은 버전 지연 가능성이 있으므로 공식 docs와 교차 확인이 안전합니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong><code>.claude/</code> 디렉토리 일반 구성</strong>: 일반적으로 프로젝트 루트의 <code>.claude/</code>는 <code>commands/</code>(슬래시 명령), <code>skills/</code>(Skill 정의), <code>settings.json</code>(환경 설정) 등을 담으며, 전역 설정은 <code>~/.claude/</code>에 위치합니다. 정확한 구성은 Claude Code 버전에 따라 다를 수 있습니다.</p>
<p><strong>원문</strong>: <a href="https://www.reddit.com/r/ClaudeAI/comments/1skz810/claude_code_folder_structure_reference_made_this/" class="source-link">r/ClaudeAI 원 스레드</a></p>
</div>
