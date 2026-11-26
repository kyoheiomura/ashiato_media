import { PageHero, PetList } from "@/components/Parts";
import { SampleNote } from "@/components/PostCard";
import { SITE } from "@/data/site";
import { KINDS } from "@/data/vocab";
import { getAllPets } from "@/lib/content";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "うちの子たち（ペットの一覧）",
  description: `${SITE.name}に投稿している、うちの子たちの一覧です。その子のページで、これまでの投稿を順にたどれます。`,
  path: "/pet/",
});

export default function PetsPage() {
  const pets = getAllPets();
  return (
    <>
      <PageHero crumbs={[{ href: "/pet/", label: "うちの子たち" }]} title="うちの子たち" lead={<p>その子のページをひらくと、これまでのあしあとを順にたどれます。</p>} />
      <div className="container-page">
        {KINDS.map((k) => {
          const list = pets.filter((p) => p.kind === k.slug);
          if (list.length === 0) return null;
          return (
            <section key={k.slug} aria-labelledby={`kind-${k.slug}`} className="pt-12 min-[768px]:pt-16">
              <h2 id={`kind-${k.slug}`} className="flex items-center gap-3 text-[1.375rem] min-[768px]:text-[1.625rem]">
                {k.label}
                <span className="num rounded-full bg-yellow px-2.5 text-[0.75rem] leading-[1.9]">
                  {list.length}
                  <span className="sr-only">ひき</span>
                </span>
              </h2>
              <div className="mt-8">
                <PetList pets={list} />
              </div>
            </section>
          );
        })}
        <SampleNote className="mt-12" />
      </div>
    </>
  );
}
