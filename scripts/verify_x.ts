import { Window } from "happy-dom";
import {
  X_SNIPPETS,
  parseMetricText,
  extractStatusId,
} from "../src/sources/x.ts";
import { coerceRawToPost } from "../src/lib/extract.ts";
import type { ExtractionResult } from "../src/lib/mcp.ts";

function assert(cond: unknown, msg: string): asserts cond {
  if (!cond) throw new Error(`verify_x: ${msg}`);
}

// ---------- (1) helper unit tests ----------
assert(parseMetricText("1.2K") === 1200, "1.2K");
assert(parseMetricText("3.4M") === 3_400_000, "3.4M");
assert(parseMetricText("2B") === 2_000_000_000, "2B");
assert(parseMetricText("") === 0, "empty");
assert(parseMetricText("42") === 42, "plain number");
assert(parseMetricText("1,234") === 1234, "comma-grouped number");
assert(extractStatusId("/alice/status/123") === "123", "status id");
assert(extractStatusId("/alice") === null, "no status id");
console.log("✓ parseMetricText + extractStatusId");

// ---------- (2) DOM round-trip via happy-dom ----------
const SAMPLE = `
<!-- 0: Alice — full counts via -count nodes, english lang -->
<article data-testid="tweet">
  <div data-testid="User-Name"><a role="link" href="/alice">Alice</a></div>
  <div data-testid="tweetText" lang="en">Hello <b>world</b> agents</div>
  <a href="/alice/status/1111111111"><time datetime="2026-04-10T12:00:00.000Z">1h</time></a>
  <div role="group">
    <div data-testid="reply-count">12</div>
    <div data-testid="retweet-count">1.2K</div>
    <div data-testid="like-count">3.4M</div>
    <div data-testid="view-count">5K</div>
  </div>
</article>

<!-- 1: Bob reposted — retweet, must be excluded -->
<article data-testid="tweet">
  <div data-testid="socialContext">Bob reposted</div>
  <div data-testid="User-Name"><a role="link" href="/carol">Carol</a></div>
  <div data-testid="tweetText">retweeted content, must be excluded</div>
  <a href="/carol/status/2222222222"><time datetime="2026-04-10T11:00:00.000Z">2h</time></a>
  <div role="group"><div data-testid="like-count">99</div></div>
</article>

<!-- 2: Brand — english ad via placementTracking -->
<article data-testid="tweet">
  <div data-testid="placementTracking"></div>
  <div data-testid="User-Name"><a role="link" href="/brand">Brand</a></div>
  <div data-testid="tweetText">Buy our product now</div>
  <a href="/brand/status/3333333333"><time datetime="2026-04-10T10:00:00.000Z">3h</time></a>
  <div role="group"><div data-testid="like-count">50</div></div>
</article>

<!-- 3: Dave — plain post, single count -->
<article data-testid="tweet">
  <div data-testid="User-Name"><a role="link" href="/dave">Dave</a></div>
  <div data-testid="tweetText">Second legit post</div>
  <a href="/dave/status/4444444444"><time datetime="2026-04-10T09:30:00.000Z">4h</time></a>
  <div role="group"><div data-testid="like-count">500</div></div>
</article>

<!-- 4: Alice virtual-scroll duplicate -->
<article data-testid="tweet">
  <div data-testid="User-Name"><a role="link" href="/alice">Alice</a></div>
  <div data-testid="tweetText">Virtual scroll duplicate</div>
  <a href="/alice/status/1111111111"><time datetime="2026-04-10T12:00:00.000Z">1h</time></a>
  <div role="group"><div data-testid="like-count">10</div></div>
</article>

<!-- 5: Eve — quote tweet. Own status is 5555555555 (wraps <time>).
     Inner quoted link references /quotedauthor/status/9999999999 first. -->
<article data-testid="tweet">
  <div data-testid="User-Name"><a role="link" href="/eve">Eve</a></div>
  <div data-testid="tweetText">Outer tweet commenting on quote</div>
  <div role="link" tabindex="0">
    <a href="/quotedauthor/status/9999999999">quoted</a>
    <div data-testid="tweetText">Inner quoted content</div>
  </div>
  <a href="/eve/status/5555555555"><time datetime="2026-04-10T08:00:00.000Z">5h</time></a>
  <div role="group"><div data-testid="reply-count">3</div></div>
</article>

<!-- 6: Frank — korean body, metrics only via aria-label -->
<article data-testid="tweet">
  <div data-testid="User-Name"><a role="link" href="/frank">Frank</a></div>
  <div data-testid="tweetText" lang="ko">에이전틱 코딩 한글 포스트</div>
  <a href="/frank/status/6666666666?s=20"><time datetime="2026-04-10T07:00:00.000Z">6h</time></a>
  <div role="group">
    <button data-testid="reply" aria-label="5 Replies. Reply"></button>
    <button data-testid="retweet" aria-label="25 Retweets. Retweet"></button>
    <button data-testid="like" aria-label="1,234 Likes. Like"></button>
    <button data-testid="view" aria-label="10K Views. View post analytics"></button>
  </div>
</article>

<!-- 7: KorBrand — korean ad via socialContext text "광고" -->
<article data-testid="tweet">
  <div data-testid="socialContext">광고</div>
  <div data-testid="User-Name"><a role="link" href="/korbrand">KorBrand</a></div>
  <div data-testid="tweetText">한국 광고 내용</div>
  <a href="/korbrand/status/7777777777"><time datetime="2026-04-10T06:00:00.000Z">7h</time></a>
</article>
`;

const win = new Window();
win.document.body.innerHTML = SAMPLE;

// Expose the happy-dom document/window as globals so the snippet's bare
// `document` reference resolves the same way it does when javascript_tool
// runs it in a real Chrome tab.
const g = globalThis as unknown as {
  document: unknown;
  window: unknown;
};
const prevDoc = g.document;
const prevWin = g.window;
g.document = win.document;
g.window = win;

const snippet = X_SNIPPETS["x.timeline.v1"];
if (!snippet) throw new Error("verify_x: x.timeline.v1 missing");

let items: ExtractionResult[];
try {
  const runnable = new Function(`return ${snippet};`) as () => string;
  const jsonStr = runnable();
  items = JSON.parse(jsonStr) as ExtractionResult[];
} finally {
  g.document = prevDoc;
  g.window = prevWin;
}

console.log(`extracted=${items.length}`);
assert(items.length === 4, `expected 4 items, got ${items.length}`);

const alice = items.find((i) => i.sourceId === "1111111111");
const dave = items.find((i) => i.sourceId === "4444444444");
const eve = items.find((i) => i.sourceId === "5555555555");
const frank = items.find((i) => i.sourceId === "6666666666");
assert(!!alice, "alice present");
assert(!!dave, "dave present");
assert(!!eve, "eve present (quoted author 9999999999 must NOT win)");
assert(!!frank, "frank present (aria-label only metrics)");

// Alice: 12 + 1200 + 3_400_000 + 5_000 = 3_406_212
const expectedAliceScore = 12 + 1200 + 3_400_000 + 5_000;
assert(
  alice.rawScore === expectedAliceScore,
  `alice score=${alice.rawScore} != ${expectedAliceScore}`,
);
assert(alice.url === "https://x.com/alice/status/1111111111", "alice url");
assert(alice.author === "alice", "alice author");
assert(alice.text === "Hello world agents", `alice text: "${alice.text}"`);
assert(alice.postedAt === "2026-04-10T12:00:00.000Z", "alice postedAt");
assert(alice.lang === "en", "alice lang");

assert(dave.rawScore === 500, `dave score=${dave.rawScore}`);
assert(dave.text === "Second legit post", "dave text");

// Eve: time anchor must override quoted status link
assert(eve.sourceId === "5555555555", `eve sourceId wrong: ${eve.sourceId}`);
assert(eve.url === "https://x.com/eve/status/5555555555", "eve url");
assert(eve.author === "eve", "eve author");

// Frank: aria-label fallback (5 + 25 + 1234 + 10_000 = 11_264)
const expectedFrankScore = 5 + 25 + 1234 + 10_000;
assert(
  frank.rawScore === expectedFrankScore,
  `frank score=${frank.rawScore} != ${expectedFrankScore}`,
);
assert(frank.lang === "ko", "frank lang=ko");
assert(
  frank.url === "https://x.com/frank/status/6666666666?s=20",
  `frank url: ${frank.url}`,
);

// Exclusion checks
assert(
  !items.some((i) => i.sourceId === "2222222222"),
  "retweet must be excluded",
);
assert(
  !items.some((i) => i.sourceId === "3333333333"),
  "promoted must be excluded",
);
assert(
  !items.some((i) => i.sourceId === "9999999999"),
  "quoted author must not leak",
);
assert(
  !items.some((i) => i.sourceId === "7777777777"),
  "korean ad must be excluded",
);
console.log(
  "✓ DOM extraction (retweet + ad + korean-ad + quoted-leak excluded, virtual-scroll dedup)",
);

// ---------- (3) coerceRawToPost integration ----------
const now = Math.floor(Date.now() / 1000);
const post = coerceRawToPost(alice, "x", now);
assert(post !== null, "coerce non-null");
assert(post.source === "x", "source=x");
assert(post.source_id === "1111111111", "source_id");
assert(post.author === "alice", "post author");
assert(
  post.posted_at === Math.floor(Date.UTC(2026, 3, 10, 12, 0, 0) / 1000),
  `post posted_at: ${post.posted_at}`,
);
assert(post.score === expectedAliceScore, "post score propagated");
console.log("✓ coerceRawToPost integration");

console.log("STEP5_VERIFY_PASS");
