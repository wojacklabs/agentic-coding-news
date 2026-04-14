---
layout: default
title: "YantrikDB — 잊고·합치고·모순 감지하는 AI 에이전트 메모리 DB, MCP 연결"
---

<a href="../2026-04-15" class="back-link">&larr; 4월 15일 목록</a>

# YantrikDB — Cognitive Memory Engine

<div class="meta-line"><span class="tag tag-hn">HN</span> 06:51 KST</div>

> Vector DB가 "저장만 하고 관리 안 함"이라는 문제 지적. consolidation·forgetting·contradiction detection을 1급 기능으로 가진 메모리 엔진. Rust 단일 바이너리 + MCP 연결 가능. HN score 10, 04-14 posted.

<div class="context-block">
<h4>출처 핵심 (HN 본문에서 확인되는 내용만)</h4>

<p><strong>문제 정의 (직접 인용):</strong></p>
<blockquote>"Vector databases store memories. They don't manage them. After 10k memories, recall quality degrades because there's no consolidation, no forgetting, no conflict resolution. Your AI agent just gets noisier."</blockquote>

<p><strong>YantrikDB 정의 (직접 인용):</strong></p>
<blockquote>"YantrikDB is a cognitive memory engine — embed it, run it as a server, or connect via MCP. It thinks about what it stores: consolidation collapses duplicate memories, contradiction detection flags incompatible facts, temporal decay with configurable half-life lets unimportant memories fade like human memory does."</blockquote>

<p><strong>3가지 핵심 기능:</strong></p>
<ul>
<li><strong>Consolidation</strong>: 중복 메모리 합치기</li>
<li><strong>Contradiction detection</strong>: incompatible facts 플래그</li>
<li><strong>Temporal decay</strong>: configurable half-life로 불필요한 메모리 자연 소멸</li>
</ul>

<p><strong>인프라 (직접 인용):</strong></p>
<blockquote>"Single Rust binary. HTTP + binary wire protocol. 2-voter + 1-witness HA cluster via Docker Compose or Kubernetes. Chaos-tested failover, runtime deadlock detection (parking_lot), per-tenant quotas, Prometheus metrics."</blockquote>

<p><strong>최근 작업 (직접 인용):</strong></p>
<blockquote>"Ran a 42-task hardening sprint last week — 1178 core tests, cargo-fuzz targets, CRDT property tests, 5 ops runbooks."</blockquote>

<p><strong>현 상태 (직접 인용):</strong></p>
<blockquote>"Live on a 3-node Proxmox homelab cluster with multiple tenants. Alpha — primary user is me, looking for the second one."</blockquote>
</div>

<div class="context-block">
<h4>왜 중요한가 (LLM 해석)</h4>
<p>일반적으로 LLM 에이전트의 메모리는 "벡터 검색 + 길이 제한"이 표준이라 시간이 지날수록 같은 사실이 여러 형태로 누적되고, 모순도 그대로 남아 hallucination 위험이 커집니다. <strong>"잊기·합치기·모순 감지"를 메모리 레이어가 직접 책임</strong>지는 접근은 인지과학적 직관과 부합하며, 특히 <strong>MCP로 노출되어 Claude Code에서 직접 사용 가능</strong>하다는 점이 통합 진입 장벽을 낮춥니다. Alpha 단계라 production 도입은 시기상조이지만, 메모리 관리 패턴 자체가 참고 가치 있습니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>parking_lot</strong>: 일반적으로 Rust의 빠른 mutex 라이브러리로 알려져 있으며, runtime deadlock detection 기능 포함.</p>
<p><strong>CRDT (Conflict-free Replicated Data Type)</strong>: 일반적으로 분산 환경에서 conflict 없이 병합 가능한 자료 구조. property test로 정확성 검증.</p>
<p><strong>원문</strong>: <a href="https://github.com/yantrikos/yantrikdb-server" class="source-link">github.com/yantrikos/yantrikdb-server</a></p>
<p><strong>HN discussion</strong>: <a href="https://news.ycombinator.com/item?id=47767119" class="source-link">news.ycombinator.com/item?id=47767119</a></p>
</div>
