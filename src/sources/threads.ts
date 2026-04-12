// Threads (Meta) hidden JSON extraction snippets.
//
// Strategy: 1st path — parse `<script type="application/json" data-sjs>`
// elements embedded by the Threads SPA. These contain thread_items with
// full metadata (timestamps, like counts, usernames, shortcodes).
// 2nd path (fallback) — DOM-walk `[data-pressable-container]` elements
// when hidden JSON yields zero results (e.g. Meta changed the embed).
//
// Exported `THREADS_SNIPPETS` is keyed by `NavigationStep.jsSnippetRef`.

const THREADS_EXTRACT_BODY = `
  // --- findDeep: recursively collect all values under a target key ---
  // WeakSet visited guard to avoid re-traversing shared subtrees, and
  // depth cap (30) to prevent stack overflow on deeply nested JSON.
  const findDeep = (obj, targetKey) => {
    const results = [];
    const visited = new WeakSet();
    const walk = (node, depth) => {
      if (depth > 30 || node === null || typeof node !== "object") return;
      if (visited.has(node)) return;
      visited.add(node);
      if (Array.isArray(node)) {
        for (const item of node) walk(item, depth + 1);
        return;
      }
      for (const key of Object.keys(node)) {
        if (key === targetKey) {
          results.push(node[key]);
        }
        walk(node[key], depth + 1);
      }
    };
    walk(obj, 0);
    return results;
  };

  // --- Parse all data-sjs script tags ---
  const scripts = document.querySelectorAll('script[type="application/json"][data-sjs]');
  let allItems = [];
  for (const script of scripts) {
    try {
      const json = JSON.parse(script.textContent || "");
      // thread_items is the primary key in For You / search JSON
      const pushItem = (item) => {
        if (!item || !item.post) return;
        // Carry item-level ad flags onto the post for downstream filtering
        const post = item.post;
        if (item.is_ad) post.__is_ad = true;
        if (item.sponsored) post.__sponsored = true;
        allItems.push(post);
      };
      const threadItemsArrays = findDeep(json, "thread_items");
      for (const arr of threadItemsArrays) {
        if (Array.isArray(arr)) {
          for (const item of arr) pushItem(item);
        }
      }
      // Some responses nest under "threads" -> each thread has thread_items
      const threadsArrays = findDeep(json, "threads");
      for (const arr of threadsArrays) {
        if (Array.isArray(arr)) {
          for (const thread of arr) {
            if (thread && thread.thread_items && Array.isArray(thread.thread_items)) {
              for (const item of thread.thread_items) pushItem(item);
            }
          }
        }
      }
    } catch (_e) { /* skip unparseable script tags */ }
  }

  // --- Dedup + map to ExtractionResult ---
  const seen = new Set();
  const out = [];
  for (const post of allItems) {
    try {
      const code = post.code || null;
      const id = post.id || post.pk || null;
      const sourceId = code || (id ? String(id) : null);
      if (!sourceId) continue;
      if (seen.has(sourceId)) continue;
      seen.add(sourceId);

      const text = (post.caption && post.caption.text) || "";
      if (!text.trim()) continue;

      const username = (post.user && post.user.username) || null;
      const takenAt = typeof post.taken_at === "number" ? post.taken_at : null;
      const likeCount = typeof post.like_count === "number" ? post.like_count : 0;

      // Exclude ads: item-level flags (__is_ad, __sponsored) and
      // post-level flags (is_paid_partnership, branded content)
      if (post.__is_ad || post.__sponsored) continue;
      if (post.is_paid_partnership) continue;
      if (post.is_ad) continue;
      if (Array.isArray(post.sponsor_tags) && post.sponsor_tags.length > 0) continue;
      const tpai = post.text_post_app_info;
      if (tpai && (tpai.is_branded_content || tpai.sponsor_tags_is_branded_content)) continue;

      const url = (username && code)
        ? "https://www.threads.net/@" + username + "/post/" + code
        : null;
      if (!url) continue;

      out.push({
        sourceId: sourceId,
        url: url,
        author: username,
        title: null,
        text: text.trim(),
        postedAt: takenAt,
        rawScore: likeCount,
        lang: null,
      });
    } catch (_e) { /* skip malformed item */ }
  }

  // --- Fallback: DOM-based extraction if hidden JSON yielded nothing ---
  if (out.length === 0) {
    const containers = document.querySelectorAll("[data-pressable-container]");
    for (const el of containers) {
      try {
        const textEl = el.querySelector("[dir]");
        const text = textEl ? (textEl.textContent || "").trim() : "";
        if (!text) continue;

        // Find the post link (usually an <a> with /@username/post/CODE path)
        let postUrl = null;
        let author = null;
        let sourceId = null;
        const links = el.querySelectorAll('a[href*="/post/"]');
        for (const a of links) {
          const href = a.getAttribute("href") || "";
          const m = href.match(/\\/@([^/]+)\\/post\\/([A-Za-z0-9_-]+)/);
          if (m) {
            author = m[1];
            sourceId = m[2];
            postUrl = href.startsWith("http") ? href : "https://www.threads.net" + href;
            break;
          }
        }
        if (!sourceId || seen.has(sourceId)) continue;
        seen.add(sourceId);

        // Try to extract a timestamp from a <time> element.
        // Fallback to current unix seconds when <time> is absent so that
        // coerceRawToPost does not drop the entire post (it returns null
        // when postedAt resolves to null).
        const timeEl = el.querySelector("time[datetime]");
        const postedAt = timeEl
          ? timeEl.getAttribute("datetime")
          : (Date.now() / 1000 | 0);

        out.push({
          sourceId: sourceId,
          url: postUrl,
          author: author,
          title: null,
          text: text,
          postedAt: postedAt,
          rawScore: 0,
          lang: null,
        });
      } catch (_e) { /* skip */ }
    }
  }

  return JSON.stringify(out);
`;

function wrap(body: string): string {
  return `(() => {${body}})()`;
}

/**
 * Snippet registry keyed by `NavigationStep.jsSnippetRef`.
 * For You and search pages share the same data-sjs JSON shape.
 */
export const THREADS_SNIPPETS: Record<string, string> = {
  "threads.foryou.v1": wrap(THREADS_EXTRACT_BODY),
  "threads.search.v1": wrap(THREADS_EXTRACT_BODY),
};
