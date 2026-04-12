---
layout: default
title: "Qwen 3.5 28B REAP — 오픈소스 코딩 모델 초기 성능 리뷰"
---

<a href="../2026-04-13" class="back-link">&larr; 4월 13일 목록</a>

# Qwen 3.5 28B 코딩 성능

<div class="meta-line"><span class="tag tag-reddit">Reddit</span> r/LocalLLaMA · 04:23 KST</div>

> r/LocalLLaMA에서 Qwen 3.5 28B(REAP 변형)의 코딩 초기 실사용 리뷰가 올라왔습니다.

Reddit r/LocalLLaMA(score 4)에 공개된 리뷰는 Alibaba Qwen 3.5 28B의 REAP 파인튜닝 버전을 실제 코딩 과제에 써본 **초기 인상**을 공유합니다. 컨텍스트 이해, 다중 파일 변경, 에지 케이스 대응 등 실전 능력이 구체적으로 평가되었습니다. <a href="https://www.reddit.com/r/LocalLLaMA/comments/1sjprna/qwen_35_28b_a3b_reap_for_coding_initial/" class="source-link">원문</a>

<div class="context-block">
<h4>왜 중요한가</h4>
<p>28B 규모의 오픈 모델이 실전 코딩 품질을 보이는 경우, Claude/GPT 의존도를 낮추고 로컬/온프레미스 에이전트 구축이 가능해집니다. 기업의 프라이버시 요구와 비용 절감 모두에 직접 영향을 줍니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>Qwen 시리즈</strong>: Alibaba가 공개한 오픈소스 LLM 가족. Qwen 2.5부터 코딩 성능이 GPT-4 급으로 평가되었고, 3.x에서는 에이전트·tool-use 능력이 강화되었습니다. 중국 오픈소스 모델의 대표 주자 중 하나입니다.</p>
<p><strong>REAP</strong>: Regularized Ensemble-based Adaptive Paring의 약어로, MoE 모델을 압축·단축하는 기법입니다. 원본 모델의 expert 수를 줄여 메모리·속도를 개선하면서 품질 하락을 최소화합니다.</p>
</div>
