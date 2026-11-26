import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs";
import { getAllPets, getThemeIndex, petName } from "@/lib/content";

/** セクションの見出し：小さな欧文（飾り）＋和文の見出し。まんなかに置く */
export function SectionHead({ id, en, title, lead }: { id: string; en: string; title: ReactNode; lead?: ReactNode }) {
  return (
    <div className="reveal mx-auto max-w-[36rem] text-center">
      <p aria-hidden="true" className="label">
        {en}
      </p>
      <h2 id={id} className="section-title mt-4">
        {title}
      </h2>
      {lead && <p className="phrase mt-3 text-[0.9375rem] leading-[1.9] text-sub">{lead}</p>}
    </div>
  );
}

/** 内側のページの見出し。うすいコーラルの面に、パンくず → h1 → 導入文 */
export function PageHero({ crumbs, title, lead, children }: { crumbs: Crumb[]; title: ReactNode; lead?: ReactNode; children?: ReactNode }) {
  return (
    <section className="mx-3 rounded-[2rem] bg-blush min-[768px]:mx-6 min-[768px]:rounded-[2.5rem]">
      <Breadcrumbs items={crumbs} />
      <div className="container-page pt-8 pb-12 min-[768px]:pt-12 min-[768px]:pb-16">
        <h1 className="pop-in max-w-[40rem] text-[clamp(1.625rem,1.2rem+1.8vw,2.5rem)] leading-[1.5] font-extrabold">{title}</h1>
        {lead && <div className="pop-in mt-4 max-w-[36rem] text-[0.9375rem] leading-[1.95]">{lead}</div>}
        {children}
      </div>
    </section>
  );
}

/** テーマのしるしの列。数字は投稿の数。current は今いるテーマ（"all" は「すべて」） */
export function ThemeLinks({ current, withAll = false, center = false }: { current?: string; withAll?: boolean; center?: boolean }) {
  const item = "flex min-h-12 items-center gap-2.5 rounded-full border-2 py-1.5 pr-3 pl-5 text-[0.9375rem] font-bold transition-colors";
  const on = "border-ink bg-ink text-white";
  const off = "border-transparent bg-paper hover:border-coral";
  return (
    <ul className={`flex flex-wrap gap-2.5 ${center ? "justify-center" : ""}`}>
      {withAll && (
        <li>
          <Link href="/post/" aria-current={current === "all" ? "page" : undefined} className={`${item} !pr-5 ${current === "all" ? on : off}`}>
            すべて
          </Link>
        </li>
      )}
      {getThemeIndex().map((t) => (
        <li key={t.slug} className={center ? "reveal reveal-pop" : ""}>
          <Link href={`/theme/${t.slug}/`} aria-current={current === t.slug ? "page" : undefined} className={`${item} ${current === t.slug ? on : off}`}>
            {t.label}
            <span className="num rounded-full bg-yellow px-2.5 text-[0.75rem] leading-[1.9] text-ink">
              {t.count}
              <span className="sr-only">件</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

type PetWithCount = ReturnType<typeof getAllPets>[number];

/** うちの子の丸いアイコンと名前。押すとその子のページへ */
export function PetBadge({ pet }: { pet: PetWithCount }) {
  return (
    <Link href={`/pet/${pet.slug}/`} className="group flex flex-col items-center text-center">
      <span className="relative block aspect-square w-full max-w-[9.5rem] overflow-hidden rounded-full border-[5px] border-paper bg-blush transition-[translate] duration-300 group-hover:-translate-y-1">
        <Image src={pet.icon.src} alt="" fill sizes="152px" className="photo-zoom object-cover" />
      </span>
      <span className="mt-3 text-[1.0625rem] font-extrabold group-hover:underline group-hover:decoration-coral group-hover:decoration-2">{petName(pet)}</span>
      <span className="text-[0.75rem] leading-[1.6] text-sub">
        {pet.kind === "other" ? pet.breed.replace(/（.*）/, "") : pet.breed}
      </span>
      <span className="num mt-1.5 rounded-full bg-yellow px-2.5 text-[0.75rem] leading-[1.9]">あしあと {pet.count}こ</span>
    </Link>
  );
}

export function PetList({ pets }: { pets: PetWithCount[] }) {
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-9 min-[560px]:grid-cols-3 min-[900px]:grid-cols-6">
      {pets.map((p) => (
        <li key={p.slug} className="reveal reveal-pop">
          <PetBadge pet={p} />
        </li>
      ))}
    </ul>
  );
}
