// P8: Claude L1 article-writing prompt builder + response parser.
// No LLM call here — daily.md orchestrator does the call.

const MAX_CANDIDATES = 30;

interface RankCandidate {
  post_id: number;
  source: string;
  title: string | null;
  text: string;
  url: string;
  score: number;
}

export interface ArticleOutput {
  title: string;
  summary: string;
  bodyMd: string;
  postIds: number[];
}

export function buildArticlePrompt(
  candidates: RankCandidate[],
  dateStr: string,
): string {
  const items = candidates
    .slice(0, MAX_CANDIDATES)
    .map(
      (c, i) =>
        `[${i + 1}] (${c.source}) score=${c.score}\n${c.title ?? "(no title)"}\n${c.text.slice(0, 400)}\nurl: ${c.url}`,
    )
    .join("\n---\n");

  return `You are a tech news editor for an agentic-coding daily newsletter.
Date: ${dateStr}. Below are ${Math.min(candidates.length, MAX_CANDIDATES)} curated posts.

Write a Korean-language daily article:
1. 제목 (한국어, 60자 이내)
2. 요약 (한국어, 1문장 TL;DR)
3. 본문 (한국어 마크다운, 각 항목에 [원문](url) 링크 포함)
   - 섹션 제목은 반드시 ### (h3)로 작성 (## 사용 금지)
   - "주목할 동향" 같은 부제목도 ###로 작성

Return ONLY valid JSON:
{"title":"...","summary":"...","bodyMd":"...","usedIndices":[1,3,5]}

Posts:
${items}`;
}

export function parseArticle(
  raw: string,
  candidates: RankCandidate[],
): ArticleOutput | null {
  const match = raw.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try {
    const obj = JSON.parse(match[0]) as Record<string, unknown>;
    const title =
      typeof obj["title"] === "string" ? obj["title"] : null;
    const summary =
      typeof obj["summary"] === "string" ? obj["summary"] : "";
    const bodyMd =
      typeof obj["bodyMd"] === "string" ? obj["bodyMd"] : null;
    if (!title || !bodyMd) return null;

    const usedIndices = Array.isArray(obj["usedIndices"])
      ? (obj["usedIndices"] as number[])
      : [];
    const postIds = usedIndices
      .map((idx) => candidates[idx - 1]?.post_id)
      .filter((id): id is number => id !== undefined);

    return { title, summary, bodyMd, postIds };
  } catch {
    return null;
  }
}
