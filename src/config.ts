// Collection target constants. Not secret — committed to source.
// Override via env vars if needed (comma-separated).

function envList(key: string, fallback: string[]): string[] {
  const v = process.env[key];
  if (!v || v.trim() === "") return fallback;
  return v
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export const RSS_FEEDS: string[] = envList("RSS_FEEDS", [
  "https://simonwillison.net/atom/everything/",
  "https://www.latent.space/feed",
  "https://karpathy.github.io/feed.xml",
  "https://lilianweng.github.io/index.xml",
  "https://blog.langchain.dev/rss/",
]);

export const HN_KEYWORDS: string[] = envList("HN_KEYWORDS", [
  "agentic",
  "claude code",
  "cursor",
  "copilot",
  "llm coding",
]);

export const REDDIT_SUBS: string[] = envList("REDDIT_SUBS", [
  "ClaudeAI",
  "LocalLLaMA",
  "singularity",
  "ChatGPTCoding",
]);
