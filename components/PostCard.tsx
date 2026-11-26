import Image from "next/image";
import Link from "next/link";
import { Camera } from "@/components/Doodles";
import { themeOf } from "@/data/vocab";
import { getPet, petName, type PostEntry } from "@/lib/content";
import { ageAt, formatDate, formatStamp, isoDate } from "@/lib/format";

type Props = {
  post: PostEntry;
  headingLevel?: "h2" | "h3" | "h4";
  priority?: boolean;
  /** うちの子のページでは、だれの投稿かを出さない */
  showPet?: boolean;
};

/**
 * 投稿カード。白いふちの中に縦長の写真（日付・枚数・テーマのしるし）→ ひとこと → 本文の出だし → うちの子。
 * カード全体が投稿へのリンク（見出しのリンクを全面に広げる）。うちの子の行だけは、その子のページへ。
 */
export function PostCard({ post, headingLevel = "h3", priority, showPet = true }: Props) {
  const Heading = headingLevel;
  const pet = getPet(post.pet)!;
  const theme = themeOf(post.themes[0]);
  const age = ageAt(pet.born, post.date);
  return (
    <article className="card group relative flex h-full flex-col p-2.5 transition-[translate] duration-300 hover:-translate-y-1">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-blush">
        <Image src={post.photos[0].src} alt={post.photos[0].alt} fill sizes="(min-width: 1024px) 23vw, (min-width: 640px) 45vw, 75vw" priority={priority} className="photo-zoom object-cover" />
        <time dateTime={isoDate(post.date)} className="num absolute top-2.5 left-2.5 rounded-full bg-yellow px-2.5 text-[0.75rem] leading-[1.9]">
          <span aria-hidden="true">{formatStamp(post.date)}</span>
          <span className="sr-only">{formatDate(post.date)}</span>
        </time>
        {post.photos.length > 1 && (
          <span className="num absolute top-2.5 right-2.5 flex items-center gap-1 rounded-full bg-ink/75 px-2 text-[0.75rem] leading-[1.9] text-white">
            <Camera className="size-3.5" />
            {post.photos.length}
            <span className="sr-only">枚</span>
          </span>
        )}
        {theme && <span className="chip absolute bottom-2.5 left-2.5 !bg-paper">{theme.label}</span>}
      </div>
      <div className="flex flex-1 flex-col px-2.5 pt-4 pb-2.5">
        <Heading className="phrase font-extrabold text-[1.0625rem] leading-[1.55]">
          <Link href={`/post/${post.id}/`} className="after:absolute after:inset-0 after:rounded-[var(--radius-soft)] after:content-[''] group-hover:underline group-hover:decoration-coral group-hover:decoration-2">
            {post.title}
          </Link>
        </Heading>
        <p className="mt-1.5 line-clamp-2 text-[0.8125rem] leading-[1.75] text-sub">{post.body}</p>
        {showPet && (
          <>
            <div aria-hidden="true" className="min-h-4 flex-1" />
            <Link href={`/pet/${pet.slug}/`} className="relative z-10 -mx-1 flex items-center gap-2.5 rounded-full border-t border-dashed border-line px-1 pt-3 hover:[&_.pet-name]:underline">
              <span className="relative block size-9 shrink-0 overflow-hidden rounded-full bg-blush">
                <Image src={pet.icon.src} alt="" fill sizes="36px" className="object-cover" />
              </span>
              <span className="min-w-0 text-[0.75rem] leading-[1.5]">
                <span className="pet-name block truncate text-[0.8125rem] font-bold">{petName(pet)}</span>
                <span className="block truncate text-sub">
                  {pet.breed}
                  {age && `・${age}`}
                </span>
              </span>
            </Link>
          </>
        )}
      </div>
    </article>
  );
}

export function PostGrid({
  posts,
  headingLevel,
  priorityCount = 0,
  showPet,
  note = true,
}: {
  posts: PostEntry[];
  headingLevel?: "h2" | "h3" | "h4";
  priorityCount?: number;
  showPet?: boolean;
  /** 掲載イメージの注釈を下に添えるか。同じページで先に出しているときは false */
  note?: boolean;
}) {
  return (
    <>
      <ul className="grid grid-cols-2 gap-3 min-[640px]:gap-5 min-[900px]:grid-cols-3 min-[1100px]:grid-cols-4">
        {posts.map((p, i) => (
          <li key={p.id} className="reveal">
            <PostCard post={p} headingLevel={headingLevel} priority={i < priorityCount} showPet={showPet} />
          </li>
        ))}
      </ul>
      {note && posts.length > 0 && <SampleNote />}
    </>
  );
}

/**
 * いま載っている投稿は掲載イメージ用の架空のものなので、投稿を見せる場所の下に必ず添える。同じページに何度も出さない。
 * 実際の投稿に入れ替えたら、このコンポーネントごと消す。
 */
export function SampleNote({ className = "mt-8" }: { className?: string }) {
  return <p className={`${className} text-[0.75rem] leading-[1.9] text-sub`}>※ いまは掲載イメージです。投稿と飼い主は架空のもので、写真はAIで作成しています。実際の投稿は、集まり次第掲載します。</p>;
}
