/**
 * コンテンツを読む唯一の入口。ページはここの関数だけを使う。
 * 投稿をデータベースや CMS で受けるようになったら、このファイルの中身（読み込み元）だけを差し替える。
 */
import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";
import type { z } from "zod";
import { THEMES, type ThemeSlug } from "@/data/vocab";
import { PetSchema, PostSchema, type Pet, type Post } from "@/lib/schema";

const CONTENT_DIR = path.join(process.cwd(), "content");
const PUBLIC_DIR = path.join(process.cwd(), "public");

export type PetEntry = Pet;
export type PostEntry = Post & { id: string };

type Store = { pets: PetEntry[]; posts: PostEntry[] };
let cache: Store | null = null;

function listFiles(dir: string) {
  const full = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".yaml") && !f.startsWith("_"))
    .map((f) => path.join(full, f));
}

function formatIssues(rel: string, error: z.ZodError) {
  return `${rel}\n${error.issues.map((i) => `  - ${i.path.join(".") || "(全体)"}: ${i.message}`).join("\n")}`;
}

/** 全コンテンツを読み、検証する。1件でも不正があれば全件まとめて例外にする */
export function loadContent(): Store {
  if (cache && process.env.NODE_ENV === "production") return cache;
  const errors: string[] = [];
  const hasPhoto = (src: string) => fs.existsSync(path.join(PUBLIC_DIR, src));

  const pets: PetEntry[] = [];
  for (const file of listFiles("pet")) {
    const rel = path.relative(process.cwd(), file);
    const result = PetSchema.safeParse(YAML.parse(fs.readFileSync(file, "utf8")));
    if (!result.success) {
      errors.push(formatIssues(rel, result.error));
      continue;
    }
    if (result.data.slug !== path.basename(file, ".yaml")) errors.push(`${rel}\n  - slug とファイル名を一致させる`);
    if (!hasPhoto(result.data.icon.src)) errors.push(`${rel}\n  - icon.src: public${result.data.icon.src} がない`);
    pets.push(result.data);
  }

  const posts: PostEntry[] = [];
  for (const file of listFiles("post")) {
    const rel = path.relative(process.cwd(), file);
    const result = PostSchema.safeParse(YAML.parse(fs.readFileSync(file, "utf8")));
    if (!result.success) {
      errors.push(formatIssues(rel, result.error));
      continue;
    }
    const p = result.data;
    if (!pets.some((pet) => pet.slug === p.pet)) errors.push(`${rel}\n  - pet: content/pet/${p.pet}.yaml がない`);
    for (const ph of p.photos) {
      if (!hasPhoto(ph.src)) errors.push(`${rel}\n  - photos: public${ph.src} がない`);
    }
    posts.push({ ...p, id: path.basename(file, ".yaml") });
  }

  if (errors.length > 0) {
    throw new Error(`コンテンツの検証に失敗しました（${errors.length}件）\n\n${errors.join("\n\n")}`);
  }

  posts.sort((a, b) => b.date.getTime() - a.date.getTime() || a.id.localeCompare(b.id));
  cache = { pets, posts };
  return cache;
}

/** 呼び名：名前＋くん／ちゃん（「むぎくん」）。suffix があればそれを使う */
export function petName(pet: Pick<Pet, "name" | "sex" | "suffix">) {
  return pet.name + (pet.suffix ?? (pet.sex === "male" ? "くん" : pet.sex === "female" ? "ちゃん" : ""));
}

const showDrafts = process.env.SHOW_DRAFTS === "1";

/** 公開中の投稿（新しい順） */
export function getAllPosts(): PostEntry[] {
  return loadContent().posts.filter((p) => showDrafts || !p.draft);
}

export function getPost(id: string) {
  return getAllPosts().find((p) => p.id === id);
}

export function getPet(slug: string) {
  return loadContent().pets.find((p) => p.slug === slug);
}

/** その子の投稿（新しい順） */
export function postsOfPet(slug: string) {
  return getAllPosts().filter((p) => p.pet === slug);
}

export function postsOfTheme(theme: ThemeSlug) {
  return getAllPosts().filter((p) => p.themes.includes(theme));
}

/** うちの子の一覧。いちばん新しい投稿が新しい順。投稿がまだ無い子は出さない */
export function getAllPets() {
  const posts = getAllPosts();
  return loadContent()
    .pets.map((pet) => {
      const own = posts.filter((p) => p.pet === pet.slug);
      return { ...pet, count: own.length, latest: own[0]?.date, first: own.at(-1)?.date };
    })
    .filter((p) => p.count > 0)
    .sort((a, b) => b.latest!.getTime() - a.latest!.getTime());
}

/** テーマごとの投稿数（投稿のあるテーマだけ） */
export function getThemeIndex() {
  const posts = getAllPosts();
  return THEMES.map((t) => ({ ...t, count: posts.filter((p) => p.themes.includes(t.slug)).length })).filter((t) => t.count > 0);
}
