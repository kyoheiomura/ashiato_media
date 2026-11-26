# あしあと（ペットの日々メディア）

ペットと暮らす人が、うちの子の写真とひとことをシェアするメディア。
コンセプトは **日々のあしあとを記録に残そう。** 投稿は「うちの子」ごとのページに月ごとの年表として重なっていく。

トリマーのインタビューメディア tocotoco（`../trimmer_interview`）の姉妹サイト。仕組みとデザインの骨格（書体・角丸・黒いボタン・はずむ動き）は同じで、面の色だけコーラルに替えている。

## 技術

Next.js（App Router・全ページ静的生成）／TypeScript／Tailwind CSS v4／YAML（Zod で検証）。

| コマンド | 内容 |
|---|---|
| `npm run dev` | 開発サーバー（http://localhost:3200） |
| `npm run build` | ビルド。原稿に不備（写真が無い・項目が足りない）があると止まる |
| `npm run typecheck` | 型チェック |
| `bash scripts/generate-photos.sh` | 掲載イメージ用の写真を AI（Codex）で作る（`FORCE=1` で作り直し） |

## 投稿を載せる

1. はじめての子は `content/pet/<slug>.yaml` を作る（名前・種類・飼い主のニックネーム・アイコンの写真）
2. 写真を `public/images/post/` に置く（縦 4:5 がきれいに載る）
3. `content/post/<日付>-<子のslug>-<名前>.yaml` を作る（ファイル名がそのまま URL になる）。項目は `lib/schema.ts`
4. ファイル名が `_` で始まるものは読み込まれない（下書き置き場）
5. テーマを増やすときは `data/vocab.ts` の `THEMES` に足す

いまは運営が YAML を足して載せる形。投稿フォームやログインを付けるときは `lib/content.ts`（読み込みの唯一の入口）だけを差し替える。

## URL

| URL | 中身 |
|---|---|
| `/` | トップ（見出しと重ねた写真・新着・テーマ・うちの子たち・重ねかた・投稿のさそい・姉妹サイト） |
| `/post/`・`/post/<id>/` | 投稿の一覧・1件の投稿 |
| `/pet/`・`/pet/<slug>/` | うちの子の一覧・その子の年表 |
| `/theme/`・`/theme/<slug>/` | テーマから |
| `/join/`・`/privacy/` | 投稿のしかた・プライバシーポリシー |

## デザインの決まり

`app/globals.css` の冒頭を参照。面の色は `--color-coral` と `--color-blush` の2つ（tocotoco と同じミントにするなら `#6fd3c1` / `#d9f3ec`。ロゴと `app/icon.svg`・OGP の色も合わせる）。

## 公開前にやること

- `data/site.ts` の `postFormUrl` を、写真を送れる投稿フォームに差し替える（いまは運営会社のお問い合わせフォーム）
- `data/site.ts` の `isDummyContent` を `false` にする（robots.txt の全面ブロックが外れる）／`NEXT_PUBLIC_SITE_URL` を本番ドメインに
- ダミーの投稿（`content/`）と AI 生成の写真を実際の投稿に差し替え、`SampleNote` を消す
- プライバシーポリシーと、投稿写真の利用についての決まりを確定する
- サイト名「あしあと」の商標・同名サービスを確認する
