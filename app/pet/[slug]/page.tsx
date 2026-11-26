import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Paw } from "@/components/Doodles";
import { PostCard, SampleNote } from "@/components/PostCard";
import { kindOf } from "@/data/vocab";
import { getAllPets, petName, type PostEntry, postsOfPet } from "@/lib/content";
import { ageAt, formatDate, formatMonth } from "@/lib/format";
import { pageMeta } from "@/lib/meta";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPets().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const pet = getAllPets().find((p) => p.slug === slug);
  if (!pet) return {};
  return pageMeta({
    title: `${petName(pet)}（${pet.breed}）のあしあと`,
    description: `${petName(pet)}（${pet.breed}）の毎日の投稿を、新しい順に重ねています。${pet.intro}`,
    path: `/pet/${pet.slug}/`,
  });
}

export default async function PetPage({ params }: Props) {
  const { slug } = await params;
  const pet = getAllPets().find((p) => p.slug === slug);
  if (!pet) notFound();
  const posts = postsOfPet(pet.slug);
  // 月ごとにまとめる（新しい月が上）
  const months: { label: string; posts: PostEntry[] }[] = [];
  for (const p of posts) {
    const label = formatMonth(p.date);
    const last = months.at(-1);
    if (last?.label === label) last.posts.push(p);
    else months.push({ label, posts: [p] });
  }
  const age = ageAt(pet.born, new Date());
  const facts = [kindOf(pet.kind)?.label, pet.breed, pet.sex === "male" ? "男の子" : pet.sex === "female" ? "女の子" : undefined, age, pet.area].filter(Boolean);

  return (
    <>
      <section className="mx-3 rounded-[2rem] bg-blush min-[768px]:mx-6 min-[768px]:rounded-[2.5rem]">
        <Breadcrumbs
          items={[
            { href: "/pet/", label: "うちの子たち" },
            { href: `/pet/${pet.slug}/`, label: petName(pet) },
          ]}
        />
        <div className="container-page flex flex-col items-center gap-x-12 gap-y-7 pt-8 pb-12 text-center min-[768px]:flex-row min-[768px]:pt-10 min-[768px]:pb-16 min-[768px]:text-left">
          <div className="pop-scale relative size-44 shrink-0 min-[768px]:size-56">
            <div className="relative size-full overflow-hidden rounded-full border-[7px] border-paper bg-paper">
              <Image src={pet.icon.src} alt={pet.icon.alt} fill priority sizes="224px" className="object-cover" />
            </div>
            <p className="num absolute -right-3 -bottom-1 flex size-[4.75rem] rotate-6 flex-col items-center justify-center rounded-full bg-yellow leading-none">
              <span className="text-[0.625rem]">あしあと</span>
              <span className="mt-1 text-[1.375rem]">
                {pet.count}
                <span className="text-[0.75rem]">こ</span>
              </span>
            </p>
          </div>
          <div className="min-w-0">
            <h1 className="pop-in text-[clamp(2rem,1.4rem+2.6vw,3.25rem)] leading-[1.3]">
              {petName(pet)}
              <span className="sr-only">のあしあと</span>
            </h1>
            <ul className="pop-in mt-3 flex flex-wrap justify-center gap-2 min-[768px]:justify-start" style={{ "--i": 1 } as React.CSSProperties}>
              {facts.map((f) => (
                <li key={f} className="chip !bg-paper">
                  {f}
                </li>
              ))}
            </ul>
            <p className="bubble phrase pop-in mt-5 inline-block max-w-[30rem] px-6 py-4 text-left text-[0.9375rem] leading-[1.9] font-bold" style={{ "--i": 2 } as React.CSSProperties}>
              {pet.intro}
            </p>
            <p className="pop-in mt-6 text-[0.8125rem] text-sub" style={{ "--i": 3 } as React.CSSProperties}>
              投稿：{pet.owner}／はじめての投稿：{formatDate(pet.first!)}
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="trail" className="container-page pt-12 min-[768px]:pt-16">
        <h2 id="trail" className="section-title">
          これまでのあしあと
        </h2>
        <div className="trail mt-8">
          {months.map((m) => (
            <section key={m.label} aria-label={m.label} className="relative pb-10 pl-12 min-[768px]:pl-16">
              <h3 className="flex min-h-9 items-center">
                <span aria-hidden="true" className="absolute left-0 flex size-9 items-center justify-center rounded-full bg-coral">
                  <Paw className="size-5 text-ink" />
                </span>
                <span className="num text-[1.125rem]">{m.label}</span>
              </h3>
              <ul className="mt-4 grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 min-[640px]:gap-5 min-[900px]:grid-cols-3 min-[1100px]:grid-cols-4">
                {m.posts.map((p, i) => (
                  <li key={p.id} className="reveal">
                    <PostCard post={p} headingLevel="h4" showPet={false} priority={i < 2 && m === months[0]} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
          <p className="relative flex min-h-9 items-center pl-12 text-[0.8125rem] font-bold text-sub min-[768px]:pl-16">
            <span aria-hidden="true" className="absolute left-0 flex size-9 items-center justify-center rounded-full bg-yellow">
              <Paw className="size-5 text-ink" />
            </span>
            {formatDate(pet.first!)}、ここからはじまりました。
          </p>
        </div>
        <SampleNote />
        <p className="mt-10 text-center">
          <Link href="/pet/" className="btn-outline">
            ほかの子のあしあとを見る
          </Link>
        </p>
      </section>
    </>
  );
}
