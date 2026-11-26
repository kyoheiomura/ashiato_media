import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/Parts";
import { SampleNote } from "@/components/PostCard";
import { SITE } from "@/data/site";
import { getThemeIndex, postsOfTheme } from "@/lib/content";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "テーマからさがす",
  description: `さんぽ、ごはん、ねがお。${SITE.name}の投稿を、場面ごとにまとめて見られます。`,
  path: "/theme/",
});

export default function ThemesPage() {
  const themes = getThemeIndex();
  return (
    <>
      <PageHero crumbs={[{ href: "/theme/", label: "テーマからさがす" }]} title="テーマからさがす" lead={<p>さんぽ、ごはん、ねがお。見たい場面だけを、まとめて見られます。数字は投稿の数です。</p>} />
      <div className="container-page pt-8 min-[768px]:pt-10">
        <ul className="grid gap-4 min-[640px]:grid-cols-2 min-[1024px]:grid-cols-3 min-[1024px]:gap-6">
          {themes.map((t) => {
            const photos = postsOfTheme(t.slug).slice(0, 3);
            return (
              <li key={t.slug} className="reveal">
                <Link href={`/theme/${t.slug}/`} className="card group flex h-full items-center gap-5 p-5 transition-[translate] duration-300 hover:-translate-y-1">
                  <span className="flex shrink-0 -space-x-7">
                    {photos.map((p, idx) => (
                      <span key={p.id} className="relative block aspect-[4/5] w-16 overflow-hidden rounded-[0.875rem] border-[3px] border-paper bg-blush" style={{ rotate: `${(idx - 1) * 6}deg`, zIndex: 3 - idx }}>
                        <Image src={p.photos[0].src} alt="" fill sizes="64px" className="object-cover" />
                      </span>
                    ))}
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-2.5">
                      <span className="text-[1.1875rem] font-extrabold group-hover:underline group-hover:decoration-coral group-hover:decoration-2">{t.label}</span>
                      <span className="num rounded-full bg-yellow px-2.5 text-[0.75rem] leading-[1.9]">
                        {t.count}
                        <span className="sr-only">件</span>
                      </span>
                    </span>
                    <span className="phrase mt-1 block text-[0.8125rem] leading-[1.7] text-sub">{t.lead}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <SampleNote />
      </div>
    </>
  );
}
