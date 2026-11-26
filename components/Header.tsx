import Link from "next/link";
import { Logo } from "@/components/Logo";
import { MobileMenu } from "@/components/MobileMenu";
import { SITE } from "@/data/site";

const NAV = [
  { href: "/post/", label: "みんなのあしあと" },
  { href: "/pet/", label: "うちの子たち" },
  { href: "/theme/", label: "テーマからさがす" },
];

/** 画面が狭いときは、ロゴ・「投稿する」ボタン・メニューのボタンだけにする（ほかのリンクはメニューの中） */
export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur">
      <div className="container-page relative flex h-16 items-center justify-between gap-3 min-[768px]:h-20">
        <Link href="/" aria-label={`${SITE.name} ホーム`} className="flex shrink-0 items-center gap-4 py-1">
          <Logo />
          <span aria-hidden="true" className="hidden text-[0.75rem] text-sub min-[1100px]:inline">
            {SITE.descriptor}
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <nav aria-label="メイン">
            <ul className="flex items-center gap-1 text-[0.875rem] font-bold min-[900px]:gap-2">
              {NAV.map((n) => (
                <li key={n.href} className="hidden min-[900px]:block">
                  <Link href={n.href} className="inline-flex min-h-11 items-center px-3 hover:underline hover:decoration-coral hover:decoration-2 hover:underline-offset-8">
                    {n.label}
                  </Link>
                </li>
              ))}
              <li className="min-[900px]:ml-2">
                <Link href="/join/" className="inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-[0.8125rem] whitespace-nowrap text-white transition-colors hover:bg-[#3a3a37] min-[900px]:text-[0.875rem]">
                  投稿する
                </Link>
              </li>
            </ul>
          </nav>
          <MobileMenu links={[...NAV, { href: "/join/", label: "投稿する" }]} />
        </div>
      </div>
    </header>
  );
}
