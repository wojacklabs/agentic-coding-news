export type Source = "x" | "threads" | "hn" | "reddit" | "rss";

export interface Post {
  source: Source;
  source_id: string;
  url: string;
  author: string | null;
  title: string | null;
  text: string;
  lang: string | null;
  posted_at: number; // unix seconds
  fetched_at: number; // unix seconds
  score: number;
}
