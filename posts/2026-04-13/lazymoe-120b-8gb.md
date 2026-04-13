---
layout: default
title: "LazyMoE — 120B LLM을 8GB RAM에서 GPU 없이 실행"
---

<a href="../2026-04-13" class="back-link">&larr; 4월 13일 목록</a>

# 120B 모델을 8GB에서

<div class="meta-line"><span class="tag tag-reddit">Reddit</span> r/LocalLLaMA · 06:51 KST</div>

> lazy expert loading + TurboQuan 조합으로 120B 파라미터 MoE 모델을 8GB RAM에서 GPU 없이 구동하는 방식이 공개되었습니다.

Reddit r/LocalLLaMA에 공개된 **LazyMoE**(score 19)는 초대형 Mixture-of-Experts 모델을 실용적으로 로컬 실행하는 접근입니다. 전체 expert를 동시에 메모리에 올리지 않고 **활성화되는 expert만 lazy 로드**하는 방식으로, 기존에는 고사양 GPU 서버가 필요했던 120B급 모델을 일반 랩톱에서 돌릴 수 있게 했습니다. <a href="https://www.reddit.com/r/LocalLLaMA/comments/1sjoo9z/built_lazymoe_run_120b_llms_on_8gb_ram_with_no/" class="source-link">원문</a>

<div class="context-block">
<h4>왜 중요한가</h4>
<p>에이전틱 코딩이 로컬 LLM으로 확대되려면 "소비자 하드웨어에서 충분히 좋은 모델이 돌아가는가"가 관건이었습니다. LazyMoE의 접근은 품질을 유지하면서 하드웨어 장벽을 크게 낮추어, 개인 개발자도 대형 오픈 모델을 에이전트 백엔드로 쓸 수 있는 가능성을 제시합니다.</p>
</div>

<div class="context-block">
<h4>관련 배경 지식</h4>
<p><strong>Mixture of Experts (MoE)</strong>: 모델 내부를 여러 전문가(expert) 네트워크로 나누고, 입력마다 일부 expert만 활성화하는 아키텍처. 총 파라미터는 크지만 실제 추론에는 소수의 expert만 사용되어 효율적입니다. Mixtral, DeepSeek V3, Qwen 3 등이 대표적 MoE 모델입니다.</p>
<p><strong>Lazy Loading + Quantization</strong>: 필요한 expert만 디스크에서 RAM으로 가져오고, 양자화(TurboQuan)로 각 expert의 메모리 크기를 줄이는 방식. 추론 속도는 다소 느려지지만 메모리 제약을 극복할 수 있습니다.</p>
</div>
