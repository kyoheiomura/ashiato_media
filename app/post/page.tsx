import { Paw } from "@/components/Doodles";
import { PageHero, ThemeLinks } from "@/components/Parts";
import { PostGrid } from "@/components/PostCard";
import { SITE } from "@/data/site";
import { getAllPosts } from "@/lib/content";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "みんなのあしあと（投稿の一覧）",
  description: `${SITE.name}に届いた、ペットとの毎日の投稿を新しい順に並べています。`,
  path: "/post/",
});

export default function PostsPage() {
  const posts = getAllPosts();
  return (
    <>
      <PageHero crumbs={[{ href: "/post/", label: "みんなのあしあと" }]} title={
          <>
            みんなのあしあと
            {/* 「あしあと」の横に、足あとをひとつ。飾りなので読み上げない */}
            <Paw className="ml-[0.3em] inline-block size-[0.85em] -translate-y-[0.08em] rotate-12 align-middle text-ink" />
          </>
        }
        lead={<p>届いた投稿を、新しい順に並べています。テーマを選ぶと、その場面だけをまとめて見られます。</p>} />
      <div className="container-page pt-8 min-[768px]:pt-10">
        <nav aria-label="テーマでしぼる">
          <ThemeLinks current="all" withAll />
        </nav>
        <p className="mt-8 text-[0.875rem] font-bold" role="status">
          <span className="num text-[1.25rem]">{posts.length}</span> 件
        </p>
        <div className="mt-4">
          <PostGrid posts={posts} headingLevel="h2" priorityCount={4} />
        </div>
      </div>
    </>
  );
}
