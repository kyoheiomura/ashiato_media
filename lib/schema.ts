import { z } from "zod";
import { KIND_SLUGS, THEME_SLUGS } from "@/data/vocab";

const slug = z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "半角の英小文字・数字・ハイフンだけ");
const photo = z.object({
  /** public からのパス（/images/post/xxx.jpg）。縦 4:5 */
  src: z.string().startsWith("/images/"),
  /** 写真の説明（読み上げ用）。何が写っているかを短く */
  alt: z.string().min(1),
});

/** うちの子（content/pet/<slug>.yaml） */
export const PetSchema = z.object({
  slug,
  name: z.string().min(1),
  kind: z.enum(KIND_SLUGS),
  /** 犬種・猫種など（「柴犬」「黒猫」） */
  breed: z.string().min(1),
  sex: z.enum(["male", "female"]).optional(),
  /** 名前のうしろに付ける呼び方。省くと、男の子は「くん」、女の子は「ちゃん」。付けたくないときは "" */
  suffix: z.string().optional(),
  /** 生まれた年月（YYYY-MM）。年齢の表示に使う。わからなければ省く */
  born: z.string().regex(/^\d{4}-\d{2}$/).optional(),
  /** 飼い主の呼び名（ニックネーム）。本名は載せない */
  owner: z.string().min(1),
  /** 都道府県まで。市区町村より細かい場所は載せない */
  area: z.string().optional(),
  /** ひとことの紹介 */
  intro: z.string().min(1),
  /** 丸いアイコンに使う写真 */
  icon: photo,
});

/** 投稿（content/post/<日付>-<名前>.yaml）。ファイル名がそのまま URL になる */
export const PostSchema = z.object({
  pet: slug,
  date: z.coerce.date(),
  /** 見出しになるひとこと（20字くらいまで） */
  title: z.string().min(1).max(32),
  /** 本文。短くていい */
  body: z.string().min(1),
  /** 1枚目がカードに出る */
  photos: z.array(photo).min(1).max(10),
  themes: z.array(z.enum(THEME_SLUGS)).min(1).max(3),
  draft: z.boolean().default(false),
});

export type Pet = z.infer<typeof PetSchema>;
export type Post = z.infer<typeof PostSchema>;
