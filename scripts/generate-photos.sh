#!/bin/bash
# 掲載イメージ（ダミー）用の写真を AI（Codex 組み込みの image_gen）で作る。人は写さない。
#   bash scripts/generate-photos.sh          … まだ無い写真だけ作る
#   FORCE=1 bash scripts/generate-photos.sh  … すべて作り直す
set -u
cd "$(dirname "$0")/.."
P=public/images/post
LOG_DIR=artifacts/photos
mkdir -p "$P" "$LOG_DIR"

STYLE="Candid everyday snapshot taken by a pet owner with a smartphone in Japan, vertical 4:5 portrait framing, natural light, authentic and unposed, gentle warm colors, sharp focus on the animal. No humans visible, no text, no letters, no logos, no watermark."

MUGI="a red Shiba Inu adult dog with a cream muzzle wearing a mustard yellow collar"
SHIRA="a small white toy poodle with a fluffy round teddy bear cut"
KURO="a sleek black short-haired cat with yellow eyes wearing a thin red collar"
HANA="an elderly red long-haired miniature dachshund with a graying muzzle"
SORA="a young orange tabby cat with white paws"
MOCHI="a small white and gray Netherland Dwarf rabbit"

gen() { # gen <名前> <プロンプト>
  local out="$P/$1.jpg"
  if [ -f "$out" ] && [ "${FORCE:-0}" != "1" ]; then echo "あり: $out"; return; fi
  local raw="$LOG_DIR/$1.png"
  codex exec --sandbox workspace-write --skip-git-repo-check --cd "$PWD" "Codex 組み込みの image_gen ツール（gpt-image-2）を直接呼んで画像を1枚作ってください。
API キーも Python/Node スクリプトも不要です。

プロンプト: '$2 $STYLE'
サイズ: 1024x1280
保存先: $raw" > "$LOG_DIR/$1.log" 2>&1
  sips -s format jpeg -s formatOptions 84 "$raw" --out "$out" > /dev/null && echo "できた: $out"
}

gen mugi-leaves "$MUGI walking on a park path covered with yellow ginkgo leaves in autumn, looking back at the camera, leash leading out of frame." &
gen mugi-nap "$MUGI sleeping belly-up on a beige rug in a sunny Japanese living room, paws in the air." &
gen mugi-sea "$MUGI standing on a sandy beach on a cloudy day, ears blown by the wind, the sea behind." &
gen mugi-sea2 "Close-up of dog paw prints in wet sand on a beach, with $MUGI small and blurred in the background." &
wait
gen shiratama-salon "$SHIRA freshly groomed, sitting on a wooden floor by the front door at home wearing a small pale blue bandana, looking up at the camera." &
gen shiratama-gohan "$SHIRA sitting politely in front of a ceramic dog bowl in a kitchen, staring at the bowl, waiting." &
gen shiratama-birthday "$SHIRA sitting next to a tiny dog-safe birthday cake with two unlit candles on a low table, paper garland softly blurred behind." &
gen shiratama-birthday2 "$SHIRA asleep on a sofa cushion next to a crumpled party hat, evening lamp light." &
wait
gen kuromame-window "$KURO sitting on a windowsill looking outside through a sheer curtain, morning light, seen from behind and the side." &
gen kuromame-box "$KURO squeezed inside a too-small cardboard delivery box on the floor, only head and front paws sticking out, looking at the camera." &
gen hana-walk "$HANA walking slowly on a quiet residential street in the soft late afternoon sun, low camera angle." &
gen hana-blanket "$HANA asleep wrapped in a knitted mustard blanket on a sofa, only the face showing." &
wait
gen sora-play "$SORA leaping to catch a feather wand toy in a living room, motion slightly blurred, the toy stick coming in from the edge of the frame." &
gen sora-shelf "$SORA sitting on top of a tall wooden bookshelf looking down at the camera, a toppled small plant pot beside." &
gen mochi-greens "$MOCHI eating a green komatsuna leaf on a straw mat, cheeks puffed." &
gen mochi-room "$MOCHI stretched out flat and relaxed on a wooden floor in a living room, a small tunnel toy behind." &
wait
echo "完了"
