import { notFound } from "next/navigation";
import { PageHero, ThemeLinks } from "@/components/Parts";
import { PostGrid } from "@/components/PostCard";
import { THEMES, themeOf, type ThemeSlug } from "@/data/vocab";
import { postsOfTheme } from "@/lib/content";
import { pageMeta } from "@/lib/meta";

type Props = { params: Promise<{ theme: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return THEMES.map((t) => ({ theme: t.slug }));
}

export async function generateMetadata({ params }: Props) {
  const theme = themeOf((await params).theme);
  if (!theme) return {};
  return pageMeta({
    title: `「${theme.label}」のあしあと`,
    description: `「${theme.label}」の投稿をまとめました。${theme.lead}`,
    path: `/theme/${theme.slug}/`,
    // 薄いページを増やさないため、投稿が少ないうちはインデックスさせない
    noindex: postsOfTheme(theme.slug).length < 3,
  });
}

export default async function ThemePage({ params }: Props) {
  const theme = themeOf((await params).theme);
  if (!theme) notFound();
  const posts = postsOfTheme(theme.slug as ThemeSlug);
  return (
    <>
      <PageHero
        crumbs={[
          { href: "/theme/", label: "テーマからさがす" },
          { href: `/theme/${theme.slug}/`, label: theme.label },
        ]}
        title={`「${theme.label}」のあしあと`}
        lead={<p>{theme.lead}</p>}
      />
      <div className="container-page pt-8 min-[768px]:pt-10">
        <nav aria-label="テーマでしぼる">
          <ThemeLinks current={theme.slug} withAll />
        </nav>
        <p className="mt-8 text-[0.875rem] font-bold" role="status">
          <span className="num text-[1.25rem]">{posts.length}</span> 件
        </p>
        <div className="mt-4">
          {posts.length > 0 ? <PostGrid posts={posts} headingLevel="h2" priorityCount={4} /> : <p className="card p-10 text-center font-bold">このテーマの投稿は、まだありません。</p>}
        </div>
      </div>
    </>
  );
}
