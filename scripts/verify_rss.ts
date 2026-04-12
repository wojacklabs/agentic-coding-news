import { rmSync } from "node:fs";
import { resolve } from "node:path";
import { openDb } from "../src/lib/db.ts";
import type { Post } from "../src/lib/types.ts";
import {
  parseFeedXml,
  normalizeRssItem,
  stripHtml,
} from "../src/sources/rss.ts";
import { insertPosts } from "../src/sources/persist.ts";

const PROJECT_ROOT = resolve(import.meta.dir, "..");
const TMP_DB = resolve(PROJECT_ROOT, "db/verify_rss.db");

function cleanup() {
  for (const suffix of ["", "-wal", "-shm", "-journal"]) {
    try {
      rmSync(TMP_DB + suffix);
    } catch {
      /* noop */
    }
  }
}
cleanup();

const ATOM = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Sample Atom</title>
  <link href="https://example.com/"/>
  <entry>
    <id>tag:example.com,2026:agentic-1</id>
    <link rel="alternate" href="https://example.com/a1"/>
    <title>Agentic Coding &amp; Claude</title>
    <author><name>Alice</name></author>
    <published>2026-04-10T09:30:00Z</published>
    <summary type="html"><![CDATA[<p>Hello <b>world</b> &amp; agents.</p>]]></summary>
    <content type="html">&lt;p&gt;Full &amp;quot;slash&amp;quot; body&lt;/p&gt;</content>
  </entry>
  <entry>
    <id>tag:example.com,2026:agentic-2</id>
    <link rel="alternate" href="https://example.com/a2"/>
    <title>Second entry</title>
    <published>2026-04-11T03:30:00+09:00</published>
    <summary>Plain text second.</summary>
  </entry>
</feed>`;

const RSS2 = `<?xml version="1.0"?>
<rss version="2.0"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/">
<channel>
  <title>Sample RSS2</title>
  <link>https://news.example.org/</link>
  <description>demo</description>
  <item>
    <title>RSS item one</title>
    <link>https://news.example.org/one</link>
    <guid isPermaLink="false">news-guid-one</guid>
    <pubDate>Thu, 10 Apr 2026 09:00:00 GMT</pubDate>
    <dc:creator>Bob</dc:creator>
    <description><![CDATA[<p>Inline &#8211; desc</p>]]></description>
    <content:encoded><![CDATA[<h1>Heading</h1><p>Full body here</p><script>bad()</script>]]></content:encoded>
  </item>
  <item>
    <title>No guid item</title>
    <link>https://news.example.org/two</link>
    <pubDate>Fri, 11 Apr 2026 00:00:00 GMT</pubDate>
    <description>no guid, will be sha1'd</description>
  </item>
</channel>
</rss>`;

const rawAtom = parseFeedXml(ATOM, "https://example.com/feed.atom");
const rawRss = parseFeedXml(RSS2, "https://news.example.org/feed.xml");
if (rawAtom.length !== 2) throw new Error(`atom items: ${rawAtom.length}`);
if (rawRss.length !== 2) throw new Error(`rss2 items: ${rawRss.length}`);
console.log(`✓ parsed atom=${rawAtom.length} rss2=${rawRss.length}`);

const now = Math.floor(Date.UTC(2026, 3, 10, 10, 0, 0) / 1000); // 2026-04-10T10:00:00Z
const posts: Post[] = [...rawAtom, ...rawRss]
  .map((r) => normalizeRssItem(r, now))
  .filter((p): p is Post => p !== null);
if (posts.length !== 4) throw new Error(`normalized: ${posts.length}`);

// Check HTML stripping + entities on atom first item
const atomFirst = posts[0]!;
if (!atomFirst.text.includes('Full "slash" body')) {
  throw new Error(`atom entity decode failed: "${atomFirst.text}"`);
}
if (atomFirst.source_id !== "tag:example.com,2026:agentic-1") {
  throw new Error(`atom id mismatch: ${atomFirst.source_id}`);
}
// Title should be stripped of HTML entities (e.g. &amp; → &)
if (atomFirst.title !== "Agentic Coding & Claude") {
  throw new Error(`atom title not stripped: "${atomFirst.title}"`);
}

// Check rss content:encoded + script tag scrub
const rssFirst = posts[2]!;
if (rssFirst.source_id !== "news-guid-one") {
  throw new Error(`rss guid mismatch: ${rssFirst.source_id}`);
}
if (
  !rssFirst.text.includes("Heading") ||
  !rssFirst.text.includes("Full body here")
) {
  throw new Error(
    `rss content:encoded strip failed: "${rssFirst.text}"`,
  );
}
if (
  rssFirst.text.includes("<script>") ||
  rssFirst.text.includes("bad()")
) {
  throw new Error(`script tag not stripped: "${rssFirst.text}"`);
}

// Fallback sha1 id for no-guid item
const rssSecond = posts[3]!;
if (!rssSecond.source_id.startsWith("sha1:")) {
  throw new Error(`fallback sha1 missing: ${rssSecond.source_id}`);
}
console.log("✓ normalize + html strip + source_id rules OK");

// DB round-trip
const db = openDb(TMP_DB);
const first = insertPosts(db, posts);
if (first.inserted !== 4 || first.skipped !== 0) {
  throw new Error(`first insert: ${JSON.stringify(first)}`);
}
const second = insertPosts(db, posts);
if (second.inserted !== 0 || second.skipped !== 4) {
  throw new Error(`second insert: ${JSON.stringify(second)}`);
}
const countRow = db
  .query<{ c: number }, []>(
    "SELECT COUNT(*) AS c FROM posts WHERE source = 'rss'",
  )
  .get();
if (!countRow || countRow.c !== 4) {
  throw new Error(`db count: ${countRow?.c}`);
}
console.log(
  `✓ insertPosts OK (first=${first.inserted}, second.skipped=${second.skipped}, db=${countRow.c})`,
);

// stripHtml spot checks
const pbreak = stripHtml("<p>a</p><p>b</p>").replace(/\s+/g, "");
if (pbreak !== "ab") throw new Error(`stripHtml p break: "${pbreak}"`);
const entDecoded = stripHtml("&amp; &lt; &gt; &#39;");
if (entDecoded !== "& < > '") {
  throw new Error(`stripHtml entities: "${entDecoded}"`);
}
console.log("✓ stripHtml spot checks OK");

db.close();
cleanup();
console.log("STEP3_VERIFY_PASS");
