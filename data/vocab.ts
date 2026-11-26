/** 投稿のテーマ。増やすときはここに足す（slug は URL に使う） */
export const THEMES = [
  { slug: "sanpo", label: "さんぽ", lead: "いつもの道も、はじめての道も。" },
  { slug: "gohan", label: "ごはん", lead: "待てのかお、たべるかお。" },
  { slug: "negao", label: "ねがお", lead: "見ているだけで、ねむくなる。" },
  { slug: "asobi", label: "あそび", lead: "夢中になっている、その瞬間。" },
  { slug: "odekake", label: "おでかけ", lead: "いっしょに行った、あの場所。" },
  { slug: "itazura", label: "いたずら", lead: "怒れなかった、あの日のこと。" },
  { slug: "ouchi", label: "おうち", lead: "お気に入りの場所で、いつものように。" },
  { slug: "kinenbi", label: "きねんび", lead: "誕生日、うちの子記念日。" },
  { slug: "trimming", label: "トリミング", lead: "さっぱりした日の、とくいげなかお。" },
] as const;

export type ThemeSlug = (typeof THEMES)[number]["slug"];
export const THEME_SLUGS = THEMES.map((t) => t.slug) as [ThemeSlug, ...ThemeSlug[]];
export const themeOf = (slug: string) => THEMES.find((t) => t.slug === slug);

/** 動物の種類。うちの子の一覧の区切りに使う */
export const KINDS = [
  { slug: "dog", label: "いぬ" },
  { slug: "cat", label: "ねこ" },
  { slug: "other", label: "ちいさな家族" },
] as const;

export type KindSlug = (typeof KINDS)[number]["slug"];
export const KIND_SLUGS = KINDS.map((k) => k.slug) as [KindSlug, ...KindSlug[]];
export const kindOf = (slug: string) => KINDS.find((k) => k.slug === slug);
