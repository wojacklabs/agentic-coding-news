// X (Twitter) DOM extraction snippets.
//
// The exported snippets are raw browser-JS strings (IIFE returning a
// JSON-stringified `ExtractionResult[]`). Claude L1 hands the snippet
// directly to `javascript_tool` during `/daily`. The Bun runtime only
// touches them via happy-dom inside `scripts/verify_x.ts`.

/** "1.2K" → 1200, "3.4M" → 3_400_000, unparseable → 0. */
export function parseMetricText(s: string | null | undefined): number {
  if (!s) return 0;
  const t = s.replace(/[,\s]/g, "").toUpperCase();
  const m = t.match(/^([\d.]+)([KMB])?$/);
  if (!m) {
    const n = Number(t);
    return Number.isFinite(n) ? Math.trunc(n) : 0;
  }
  const base = Number(m[1]);
  if (!Number.isFinite(base)) return 0;
  const mult =
    m[2] === "B" ? 1e9 : m[2] === "M" ? 1e6 : m[2] === "K" ? 1e3 : 1;
  return Math.round(base * mult);
}

/** `/user/status/1234` → "1234". */
export function extractStatusId(
  href: string | null | undefined,
): string | null {
  if (!href) return null;
  const m = href.match(/\/status\/(\d+)/);
  return m && m[1] ? m[1] : null;
}

// Inline browser JS used by both timeline and search paths. Returns
// JSON.stringify(ExtractionResult[]).
//
// This string is eval'd exactly once — `javascript_tool` runs it in the
// page context in production, `new Function(...)` runs it via happy-dom
// during verify. Any `\\` in this template literal therefore becomes a
// single `\` in the evaluated source, which is what RegExp/char escapes
// need.
const X_EXTRACT_BODY = `
  const parseMetric = (s) => {
    if (!s) return 0;
    const t = String(s).replace(/[,\\s]/g, "").toUpperCase();
    const m = t.match(/^([\\d.]+)([KMB])?$/);
    if (!m) { const n = Number(t); return Number.isFinite(n) ? Math.trunc(n) : 0; }
    const base = Number(m[1]);
    if (!Number.isFinite(base)) return 0;
    const mult = m[2] === "B" ? 1e9 : m[2] === "M" ? 1e6 : m[2] === "K" ? 1e3 : 1;
    return Math.round(base * mult);
  };
  const statusId = (href) => {
    if (!href) return null;
    const m = String(href).match(/\\/status\\/(\\d+)/);
    return m && m[1] ? m[1] : null;
  };
  // aria-label often looks like "1,234 Likes. Like" — pull the first number.
  const firstNumberFromLabel = (label) => {
    if (!label) return 0;
    const m = String(label).match(/[\\d,.]+[KMB]?/i);
    return m ? parseMetric(m[0]) : 0;
  };
  const seen = new Set();
  const out = [];
  const articles = document.querySelectorAll('article[data-testid="tweet"]');
  for (const art of articles) {
    try {
      // --- Exclude ads / promoted tweets (structural + multi-lingual text) ---
      if (art.querySelector('[data-testid="placementTracking"]')) continue;
      if (art.querySelector('[aria-label*="Promoted" i]')) continue;
      const social = art.querySelector('[data-testid="socialContext"]');
      const socialText = social ? (social.textContent || "").trim() : "";
      // substring match — "reposted", "Retweeted" etc. have trailing letters
      if (/repost|retweet|재게시|리트윗/i.test(socialText)) continue;
      if (/^(ad|promoted|sponsored|광고|프로모션)$/i.test(socialText)) continue;

      // --- Body text ---
      const textEl = art.querySelector('[data-testid="tweetText"]');
      const text = textEl ? (textEl.textContent || "").trim() : "";
      if (!text) continue;
      const lang = textEl && textEl.getAttribute ? textEl.getAttribute("lang") : null;

      // --- Author handle ---
      let author = null;
      const userName = art.querySelector('[data-testid="User-Name"]');
      if (userName) {
        const link = userName.querySelector('a[role="link"][href^="/"]');
        const href = link ? link.getAttribute("href") : null;
        if (href) author = href.replace(/^\\//, "").split("/")[0] || null;
      }

      // --- Tweet URL + id ---
      //
      // The status anchor wrapping <time> is always the article's own
      // permalink — prefer it so quoted tweets don't steal the sourceId.
      let sourceId = null;
      let url = null;
      const timeEl = art.querySelector("time[datetime]");
      const timeAnchor =
        timeEl && timeEl.closest ? timeEl.closest('a[href*="/status/"]') : null;
      if (timeAnchor) {
        const h = timeAnchor.getAttribute("href") || "";
        const id = statusId(h);
        if (id) {
          sourceId = id;
          url = h.startsWith("http") ? h : "https://x.com" + h;
        }
      }
      if (!sourceId) {
        const links = art.querySelectorAll('a[href*="/status/"]');
        for (const a of links) {
          const h = a.getAttribute("href") || "";
          const id = statusId(h);
          if (id) {
            sourceId = id;
            url = h.startsWith("http") ? h : "https://x.com" + h;
            break;
          }
        }
      }
      if (!sourceId) continue;
      if (seen.has(sourceId)) continue;
      seen.add(sourceId);

      const postedAt = timeEl ? timeEl.getAttribute("datetime") : null;

      // --- Metrics ---
      //
      // Primary path: [data-testid$="-count"] text nodes (test-friendly).
      // Fallback path: aria-label on like/retweet/reply/view buttons,
      // which is how the real X DOM renders counts now that the textContent
      // of count nodes is often the empty string.
      let rawScore = 0;
      const group = art.querySelector('[role="group"]');
      if (group) {
        const counts = group.querySelectorAll('[data-testid$="-count"]');
        for (const c of counts) rawScore += parseMetric(c.textContent);
        if (rawScore === 0) {
          const buttons = group.querySelectorAll(
            '[data-testid="like"],[data-testid="retweet"],[data-testid="reply"],[data-testid="view"]',
          );
          for (const b of buttons) {
            rawScore += firstNumberFromLabel(b.getAttribute("aria-label"));
          }
        }
      }

      out.push({
        sourceId: sourceId,
        url: url,
        author: author,
        title: null,
        text: text,
        postedAt: postedAt,
        rawScore: rawScore,
        lang: lang,
      });
    } catch (_e) { /* skip malformed card */ }
  }
  return JSON.stringify(out);
`;

function wrap(body: string): string {
  return `(() => {${body}})()`;
}

/**
 * Snippet registry keyed by `NavigationStep.jsSnippetRef`.
 * Timeline and search pages currently share the same DOM shape.
 */
export const X_SNIPPETS: Record<string, string> = {
  "x.timeline.v1": wrap(X_EXTRACT_BODY),
  "x.search.v1": wrap(X_EXTRACT_BODY),
};
