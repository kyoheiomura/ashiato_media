/** サイト名はここだけで決める。変えるときは NAME と NAME_EN を直せば全ページに反映される */
const NAME = "あしあと";
/** ロゴに小さく添えるローマ字 */
const NAME_EN = "ashiato";
const KIND = "ペットの日々メディア";

export const SITE = {
  name: NAME,
  nameEn: NAME_EN,
  /** title の末尾などに添える種別 */
  kind: KIND,
  /** ロゴの横に添える、何のメディアかの一言 */
  descriptor: "うちの子の記録をシェアするメディア",
  /** コンセプト。トップとフッター・OGP で使う */
  tagline: ["日々のあしあとを", "記録に残そう。"],
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://ashiato.example").replace(/\/$/, ""),
  /** トップの title。ほかのページは titleSuffix を付ける */
  defaultTitle: `${NAME}｜うちの子の記録をシェアする${KIND}`,
  titleSuffix: `｜${NAME} ${KIND}`,
  description:
    "あしあとは、ペットと暮らす人が、うちの子の写真とひとことをシェアするメディアです。さんぽ、ごはん、ねがお。なんでもない日の記録が、うちの子のあしあとになります。",
  /** 投稿を受け付ける窓口。公開前に、専用の投稿フォーム（写真を送れるもの）に差し替える */
  postFormUrl: "https://0450.co.jp/contact",
  /** お問い合わせの窓口（運営会社のフォーム） */
  contactUrl: "https://0450.co.jp/contact",
  /** 姉妹サイト：トリマーのインタビューメディア */
  sister: {
    name: "tocotoco",
    kana: "とことこ",
    descriptor: "トリマーのインタビューメディア",
    url: "https://media.raxus.inc/tocotoco/",
  },
  /** 載っている投稿が掲載イメージ（ダミー）のあいだは true。robots.txt で全面ブロックする */
  isDummyContent: true,
} as const;

/** 一覧の1ページに並べる投稿の数 */
export const PAGE_SIZE = 24;
