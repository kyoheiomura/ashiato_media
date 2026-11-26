import Image from "next/image";
import Link from "next/link";
import { Paw, Sparkle } from "@/components/Doodles";
import { JsonLd } from "@/components/JsonLd";
import { PetList, SectionHead, ThemeLinks } from "@/components/Parts";
import { PostCard, SampleNote } from "@/components/PostCard";
import { PostRail } from "@/components/PostRail";
import { SITE } from "@/data/site";
import { getAllPets, getAllPosts } from "@/lib/content";
import { pageMeta } from "@/lib/meta";

/*
 * トップ。上から順に、
 * 見出しと重ねた写真 → あたらしいあしあと（横に流す）→ テーマ → うちの子たち → 重ねかた → 投稿のさそい → 姉妹サイト
 */
export const metadata = pageMeta({ absoluteTitle: SITE.defaultTitle, path: "/" });

/** 投稿が載るまで。実際に順番のある手順なので番号を付ける */
const STEPS = [
  { verb: "撮る", body: "さんぽの途中、ごはんの前、ねているところ。特別な日でなくてかまいません。スマートフォンの1枚で十分です。" },
  { verb: "送る", body: "写真にひとことを添えて、フォームから送ってください。うちの子の名前と、呼んでほしいニックネームも一緒に。" },
  { verb: "重なる", body: `${SITE.name}に載ると、うちの子のページに1枚ずつ重なっていきます。あとから見返すと、その子の年表になります。` },
];

/** 最初の画面に重ねる見本の3枚。投稿の新着とは連動させない（差し替えるときはここだけ） */
const HERO_PHOTOS = {
  front: { src: "/images/post/shiratama-salon.jpg", alt: "玄関で、水色のバンダナをつけてこちらを見上げる白いトイプードル" },
  left: "/images/post/mugi-leaves.jpg",
  right: "/images/post/kuromame-window.jpg",
};

const i = (n: number) => ({ "--i": n }) as React.CSSProperties;

export default function Home() {
  const posts = getAllPosts();
  const pets = getAllPets();
  const latest = posts.slice(0, 8);

  return (
    <>
      <section aria-labelledby="hero-title" className="overflow-x-clip">
        {/* 狭い画面：見出し → 写真 → 説明とボタン。広い画面：左に見出しと説明、右に写真 */}
        <div className="container-page grid gap-x-10 pt-7 pb-14 min-[900px]:grid-cols-12 min-[900px]:grid-rows-[1fr_auto_auto_1fr] min-[900px]:pt-14 min-[900px]:pb-20">
          <div className="order-1 min-[900px]:order-none min-[900px]:col-span-6 min-[900px]:row-start-2">
            <p className="label pop-in">{SITE.descriptor}</p>
            <h1 id="hero-title" className="mt-4 text-[clamp(2rem,1rem+3.6vw,3.5rem)] leading-[1.15] font-extrabold min-[900px]:mt-6">
              <span className="pop-in block whitespace-nowrap" style={i(1)}>
                日々の<span className="paw-line">あしあと</span>を
              </span>
              <span className="pop-in block whitespace-nowrap" style={i(2)}>
                記録に残そう。
              </span>
            </h1>
          </div>

          <div className="order-3 mt-12 min-[900px]:order-none min-[900px]:col-span-6 min-[900px]:row-start-3 min-[900px]:mt-0">
            <p className="pop-in max-w-[30rem] leading-[2.05] min-[900px]:mt-6" style={i(3)}>
              {SITE.name}
              は、ペットと暮らす人が、うちの子の写真とひとことをシェアするメディアです。さんぽ、ごはん、ねがお。うちの子の毎日を、のこしていきませんか。
            </p>
            <div className="pop-in mt-7 flex flex-wrap items-center gap-x-7 gap-y-4 min-[900px]:mt-8" style={i(4)}>
              <Link href="/post/" className="btn-primary">
                みんなのあしあとを見る
              </Link>
              <Link href="/join/" className="link-quiet">
                うちの子を投稿する
              </Link>
            </div>
          </div>

          {/* 重ねた3枚の写真。投稿とは結びつけない、見本の3枚（HERO_PHOTOS） */}
          <div className="relative order-2 mx-auto mt-10 aspect-[1/1.02] w-full max-w-[26rem] self-center min-[900px]:order-none min-[900px]:col-span-6 min-[900px]:col-start-7 min-[900px]:row-span-4 min-[900px]:row-start-1 min-[900px]:mt-0 min-[900px]:max-w-[34rem] min-[900px]:justify-self-end">
            <div aria-hidden="true" className="pop-scale absolute top-[10%] left-[6%] h-[84%] w-[88%] rounded-[58%_42%_48%_52%/46%_56%_44%_54%] bg-coral" style={i(1)} />
            <div className="pop-scale absolute top-[9%] left-0 w-[50%]" style={i(2)}>
              <div className="relative aspect-[4/5] -rotate-[8deg] overflow-hidden rounded-[1.5rem] border-[6px] border-paper bg-blush">
                <Image src={HERO_PHOTOS.left} alt="" fill sizes="(min-width: 900px) 270px, 45vw" className="object-cover" />
              </div>
            </div>
            <div className="pop-scale absolute top-[3%] right-0 w-[50%]" style={i(3)}>
              <div className="relative aspect-[4/5] rotate-[7deg] overflow-hidden rounded-[1.5rem] border-[6px] border-paper bg-blush">
                <Image src={HERO_PHOTOS.right} alt="" fill sizes="(min-width: 900px) 270px, 45vw" className="object-cover" />
              </div>
            </div>
            <div className="pop-scale absolute top-[17%] left-[21%] w-[58%]" style={i(5)}>
              <div className="relative aspect-[4/5] -rotate-[1.5deg] overflow-hidden rounded-[1.75rem] border-[7px] border-paper bg-blush">
                <Image src={HERO_PHOTOS.front.src} alt={HERO_PHOTOS.front.alt} fill priority sizes="(min-width: 900px) 320px, 55vw" className="object-cover" />
              </div>
            </div>
            <p className="pop-scale absolute top-[11%] left-[15%] flex size-[4.25rem] -rotate-12 flex-col items-center justify-center rounded-full bg-yellow leading-none font-extrabold min-[900px]:size-20" style={i(7)}>
              <span className="text-[0.5625rem] tracking-[0.08em] min-[900px]:text-[0.625rem]">うちの子</span>
              <span className="mt-1 text-[0.8125rem] min-[900px]:mt-1.5 min-[900px]:text-[0.9375rem]">募集中</span>
            </p>
            {/* 案内の注釈。写真の下に置いて、しっぽでいちばん上の1枚を指す */}
            <p className="bubble bubble-up phrase pop-scale absolute right-0 -bottom-[4%] max-w-[13.5rem] px-5 py-3 text-[0.8125rem] leading-[1.7] font-bold min-[900px]:max-w-[15rem] min-[900px]:py-3.5 min-[900px]:text-[0.875rem]" style={i(8)}>
              写真に、ひとことを添えて。
              <span className="mt-0.5 block text-[0.75rem] font-medium text-sub">うちの子のページに、1枚ずつ重なります</span>
            </p>
            <Sparkle className="sway absolute top-0 left-[44%] size-8 text-yellow" />
            <Paw className="sway absolute bottom-[4%] left-[4%] size-9 -rotate-12 text-ink [animation-delay:-2s]" />
          </div>
        </div>
      </section>

      <section aria-labelledby="latest" className="mx-3 overflow-hidden rounded-[2rem] bg-blush py-12 min-[768px]:mx-6 min-[768px]:rounded-[2.5rem] min-[768px]:py-20">
        <div className="container-page">
          <SectionHead id="latest" en="New posts" title="あたらしい、あしあと" lead="みんなのうちの子の、いちばん新しい1日です。" />
          <div className="reveal mt-8 min-[768px]:mt-10">
            <PostRail label="あたらしい投稿">
              {latest.map((p, idx) => (
                <li key={p.id} className="w-[68%] min-[560px]:w-[42%] min-[900px]:w-[calc((100%-3rem)/3)] min-[1100px]:w-[calc((100%-4.5rem)/4)]">
                  <PostCard post={p} priority={idx < 2} />
                </li>
              ))}
            </PostRail>
          </div>
          <SampleNote className="mt-6" />
          <p className="reveal mt-8 text-center">
            <Link href="/post/" className="btn-outline">
              {posts.length}件すべてを見る
            </Link>
          </p>
        </div>
      </section>

      <section aria-labelledby="themes" className="container-page pt-20 min-[768px]:pt-28">
        <SectionHead id="themes" en="Themes" title="テーマからさがす" lead="ねがおだけ、ごはんだけ。見たいものだけ、まとめて見られます。" />
        <div className="mt-10">
          <ThemeLinks center />
        </div>
      </section>

      <section aria-labelledby="pets" className="container-page pt-20 min-[768px]:pt-28">
        <SectionHead id="pets" en="Our pets" title="うちの子たち" lead="その子のページをひらくと、これまでのあしあとを順にたどれます。" />
        <div className="mt-10">
          <PetList pets={pets.slice(0, 6)} />
        </div>
        <p className="reveal mt-10 text-center">
          <Link href="/pet/" className="link-quiet">
            うちの子たちを全員見る
          </Link>
        </p>
      </section>

      <section aria-labelledby="how" className="container-page pt-20 min-[768px]:pt-28">
        <SectionHead id="how" en="How it works" title="あしあとの、重ねかた" />
        <ol className="mt-12 grid gap-9 min-[768px]:grid-cols-3 min-[768px]:gap-8">
          {STEPS.map((s, idx) => (
            <li key={s.verb} className="reveal reveal-pop card relative p-7 pt-10">
              <span aria-hidden="true" className="num absolute -top-5 left-6 flex size-11 items-center justify-center rounded-full bg-ink text-[1.125rem] text-white">
                {idx + 1}
              </span>
              <p className="text-[1.375rem] font-extrabold">{s.verb}</p>
              {/* 幅のせまいカードなので、文節では折らずに行の端まで詰める */}
              <p className="mt-3 text-[0.9375rem] leading-[1.95] [word-break:normal]">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="post-cta" className="container-page pt-20 min-[768px]:pt-28">
        <div className="reveal relative overflow-hidden rounded-[2rem] bg-coral min-[768px]:rounded-[2.5rem]">
          <div className="relative grid items-center min-[900px]:grid-cols-2 min-[900px]:gap-8">
            <div className="p-8 min-[768px]:p-14">
              <h2 id="post-cta" className="text-[clamp(1.625rem,1.2rem+1.8vw,2.5rem)] leading-[1.5] font-extrabold">
                うちの子の今日を、
                <br />
                のせませんか。
              </h2>
              <p className="mt-4 max-w-[26rem] text-[0.9375rem] leading-[2]">犬も、猫も、うさぎも、鳥も。いっしょに暮らしている子なら、どの子でも。送りかたと、載せるときの決まりをまとめました。</p>
              <Link href="/join/" className="btn-primary mt-7">
                投稿のしかたを読む
              </Link>
            </div>
            {posts[3] && (
              <div className="relative min-h-[15rem] self-stretch min-[900px]:min-h-[23rem]">
                <Image src={posts[3].photos[0].src} alt="" fill sizes="(min-width: 900px) 40vw, 100vw" className="object-cover min-[900px]:rounded-l-[6rem]" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 姉妹サイト。触れると、tocotoco のミント（#6fd3c1）に変わる */}
      <section aria-labelledby="sister" className="container-page pt-12 min-[768px]:pt-16">
        <a href={SITE.sister.url} target="_blank" rel="noopener" className="reveal card group flex flex-col gap-5 p-7 transition-colors duration-300 hover:bg-[#6fd3c1] focus-visible:bg-[#6fd3c1] min-[768px]:flex-row min-[768px]:items-center min-[768px]:justify-between min-[768px]:p-10">
          <div>
            <p aria-hidden="true" className="label">
              姉妹サイト
            </p>
            <h2 id="sister" className="mt-3 text-[1.25rem] min-[768px]:text-[1.5rem]">
              {SITE.sister.name}（{SITE.sister.kana}）
              <span className="sr-only">（新しいタブで開きます）</span>
            </h2>
            <p className="mt-1 max-w-[34rem] text-[0.9375rem] leading-[1.9] text-sub transition-colors duration-300 group-hover:text-ink group-focus-visible:text-ink">うちの子をあずけるのは、どんな人だろう。トリマーさん本人に話を聞いた、{SITE.sister.descriptor}です。</p>
          </div>
          <span className="link-quiet shrink-0 group-hover:underline group-hover:decoration-ink group-hover:decoration-2">トリマーさんの話を読む</span>
        </a>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: SITE.name,
          alternateName: `${SITE.name} ${SITE.kind}`,
          url: `${SITE.url}/`,
          description: SITE.description,
          inLanguage: "ja",
        }}
      />
    </>
  );
}
