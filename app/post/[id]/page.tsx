import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PostGrid, SampleNote } from "@/components/PostCard";
import { SITE } from "@/data/site";
import { kindOf, themeOf } from "@/data/vocab";
import { getAllPosts, getPet, getPost, petName, postsOfPet } from "@/lib/content";
import { ageAt, formatDate, isoDate } from "@/lib/format";
import { pageMeta } from "@/lib/meta";

type Props = { params: Promise<{ id: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props) {
  const post = getPost((await params).id);
  if (!post) return {};
  const pet = getPet(post.pet)!;
  return pageMeta({
    title: `${post.title}（${petName(pet)}・${pet.breed}）`,
    description: post.body.replace(/\s+/g, " ").slice(0, 110),
    path: `/post/${post.id}/`,
    ogType: "article",
  });
}

export default async function PostPage({ params }: Props) {
  const post = getPost((await params).id);
  if (!post) notFound();
  const pet = getPet(post.pet)!;
  const own = postsOfPet(pet.slug);
  // その子の投稿の中で、何番目のあしあとか（古い順に数える）
  const nth = own.length - own.findIndex((p) => p.id === post.id);
  const others = own.filter((p) => p.id !== post.id).slice(0, 4);
  const all = getAllPosts();
  const idx = all.findIndex((p) => p.id === post.id);
  const newer = all[idx - 1];
  const older = all[idx + 1];
  const age = ageAt(pet.born, post.date);

  return (
    <>
      <Breadcrumbs
        items={[
          { href: "/post/", label: "みんなのあしあと" },
          { href: `/post/${post.id}/`, label: post.title },
        ]}
      />
      <article className="container-page grid gap-x-12 gap-y-8 pt-6 min-[900px]:grid-cols-12 min-[900px]:pt-10">
        <div className="space-y-4 min-[900px]:col-span-6 min-[900px]:space-y-6">
          {post.photos.map((ph, n) => (
            <div key={ph.src} className={`${n === 0 ? "pop-scale" : "reveal"} relative mx-auto aspect-[4/5] max-w-[32rem] overflow-hidden rounded-[2rem] border-[8px] border-paper bg-blush`}>
              <Image src={ph.src} alt={ph.alt} fill priority={n === 0} sizes="(min-width: 900px) 512px, 92vw" className="object-cover" />
            </div>
          ))}
        </div>

        <div className="min-[900px]:col-span-6">
          <div className="min-[900px]:sticky min-[900px]:top-28">
            <p className="pop-in flex flex-wrap items-center gap-2.5">
              <time dateTime={isoDate(post.date)} className="num rounded-full bg-yellow px-3 text-[0.8125rem] leading-[2]">
                {formatDate(post.date)}
              </time>
              <span className="text-[0.8125rem] font-bold text-sub">
                {petName(pet)}の、{nth}こめのあしあと
              </span>
            </p>
            <h1 className="pop-in mt-4 text-[clamp(1.75rem,1.3rem+2vw,2.75rem)] leading-[1.45]" style={{ "--i": 1 } as React.CSSProperties}>
              {post.title}
            </h1>
            <p className="pop-in mt-6 text-[1.0625rem] leading-[2.15] whitespace-pre-line" style={{ "--i": 2 } as React.CSSProperties}>
              {post.body.trim()}
            </p>
            <ul aria-label="テーマ" className="pop-in mt-7 flex flex-wrap gap-2" style={{ "--i": 3 } as React.CSSProperties}>
              {post.themes.map((t) => (
                <li key={t}>
                  <Link href={`/theme/${t}/`} className="chip min-h-9 !px-4 !text-[0.8125rem] hover:bg-coral">
                    #{themeOf(t)?.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Link href={`/pet/${pet.slug}/`} className="pop-in card group mt-9 flex items-center gap-4 p-4 pr-6" style={{ "--i": 4 } as React.CSSProperties}>
              <span className="relative block size-[4.5rem] shrink-0 overflow-hidden rounded-full bg-blush">
                <Image src={pet.icon.src} alt="" fill sizes="72px" className="object-cover" />
              </span>
              <span className="min-w-0 flex-1 leading-[1.6]">
                <span className="block text-[1.125rem] font-extrabold group-hover:underline group-hover:decoration-coral group-hover:decoration-2">{petName(pet)}</span>
                <span className="block text-[0.8125rem] text-sub">
                  {kindOf(pet.kind)?.label}・{pet.breed}
                  {age && `・このとき${age}`}
                </span>
                <span className="block text-[0.8125rem] text-sub">投稿：{pet.owner}</span>
              </span>
              <span className="link-quiet hidden min-[480px]:inline-flex">あしあとを見る</span>
            </Link>
          </div>
        </div>
      </article>

      {others.length > 0 && (
        <section aria-labelledby="others" className="container-page pt-20 min-[768px]:pt-28">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="others" className="text-[1.375rem] min-[768px]:text-[1.75rem]">
              {petName(pet)}の、ほかのあしあと
            </h2>
            <Link href={`/pet/${pet.slug}/`} className="link-quiet">
              {own.length}こすべてを見る
            </Link>
          </div>
          <div className="mt-6">
            <PostGrid posts={others} showPet={false} note={false} />
          </div>
        </section>
      )}

      <nav aria-label="前後の投稿" className="container-page pt-16 min-[768px]:pt-20">
        <ul className="grid gap-3 min-[640px]:grid-cols-2">
          <li>
            {newer && (
              <Link href={`/post/${newer.id}/`} className="card flex h-full items-center gap-4 p-4 hover:[&_.t]:underline">
                <span aria-hidden="true" className="ml-2 size-2.5 shrink-0 -rotate-135 border-t-2 border-r-2 border-ink" />
                <span className="min-w-0 flex-1">
                  <span className="block text-[0.75rem] font-bold text-sub">あたらしい投稿</span>
                  <span className="t block truncate font-bold">{newer.title}</span>
                </span>
                <span className="relative block aspect-[4/5] w-12 shrink-0 overflow-hidden rounded-[0.625rem] bg-blush">
                  <Image src={newer.photos[0].src} alt="" fill sizes="48px" className="object-cover" />
                </span>
              </Link>
            )}
          </li>
          <li>
            {older && (
              <Link href={`/post/${older.id}/`} className="card flex h-full items-center gap-4 p-4 hover:[&_.t]:underline">
                <span className="relative block aspect-[4/5] w-12 shrink-0 overflow-hidden rounded-[0.625rem] bg-blush">
                  <Image src={older.photos[0].src} alt="" fill sizes="48px" className="object-cover" />
                </span>
                <span className="min-w-0 flex-1 text-right">
                  <span className="block text-[0.75rem] font-bold text-sub">まえの投稿</span>
                  <span className="t block truncate font-bold">{older.title}</span>
                </span>
                <span aria-hidden="true" className="mr-2 size-2.5 shrink-0 rotate-45 border-t-2 border-r-2 border-ink" />
              </Link>
            )}
          </li>
        </ul>
        <SampleNote />
      </nav>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SocialMediaPosting",
          headline: post.title,
          articleBody: post.body.trim(),
          datePublished: isoDate(post.date),
          image: post.photos.map((p) => `${SITE.url}${p.src}`),
          author: { "@type": "Person", name: pet.owner },
          url: `${SITE.url}/post/${post.id}/`,
          inLanguage: "ja",
        }}
      />
    </>
  );
}
