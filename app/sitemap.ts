import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";
import { getAllPets, getAllPosts, getThemeIndex } from "@/lib/content";

// noindex のページ（投稿の少ないテーマ）は入れない
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${SITE.url}${path}`;
  const posts = getAllPosts();
  const latest = posts[0]?.date;
  return [
    ...["/", "/post/", "/pet/", "/theme/", "/join/", "/privacy/"].map((p) => ({ url: url(p), lastModified: ["/", "/post/"].includes(p) ? latest : undefined })),
    ...getThemeIndex()
      .filter((t) => t.count >= 3)
      .map((t) => ({ url: url(`/theme/${t.slug}/`) })),
    ...getAllPets().map((p) => ({ url: url(`/pet/${p.slug}/`), lastModified: p.latest })),
    ...posts.map((p) => ({ url: url(`/post/${p.id}/`), lastModified: p.date })),
  ];
}
