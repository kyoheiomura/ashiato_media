import Link from "next/link";
import { PawTrail } from "@/components/Doodles";
import { Logo } from "@/components/Logo";
import { SITE } from "@/data/site";

const GROUPS = [
  {
    label: "みる",
    links: [
      { href: "/post/", label: "みんなのあしあと" },
      { href: "/pet/", label: "うちの子たち" },
      { href: "/theme/", label: "テーマからさがす" },
    ],
  },
  {
    label: "このサイトについて",
    links: [
      { href: "/join/", label: "投稿する" },
      { href: "/privacy/", label: "プライバシーポリシー" },
      { href: SITE.contactUrl, label: "お問い合わせ" },
      { href: SITE.sister.url, label: `姉妹サイト ${SITE.sister.name}（${SITE.sister.descriptor}）` },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-4">
      <div className="bg-paper">
        <div className="container-page overflow-hidden pt-10 pb-8">
          <PawTrail className="reveal" />
        </div>
        <div className="container-page grid gap-10 border-t border-line pt-10 pb-10 min-[768px]:grid-cols-12 min-[768px]:pt-12">
          <div className="min-[768px]:col-span-6">
            <Logo size="lg" />
            <p className="mt-5 max-w-[24rem] text-[0.875rem] leading-[1.9] text-sub">
              {SITE.name}は、ペットと暮らす人が、うちの子の写真とひとことをシェアするメディアです。
            </p>
          </div>
          {GROUPS.map((g) => (
            <nav key={g.label} aria-label={`フッター（${g.label}）`} className="min-[768px]:col-span-3">
              <p className="text-[0.8125rem] font-bold text-sub">{g.label}</p>
              <ul className="mt-3 space-y-2 text-[0.875rem]">
                {g.links.map((l) => (
                  <li key={l.label}>
                    {l.href.startsWith("/") ? (
                      <Link href={l.href} className="hover:underline">
                        {l.label}
                      </Link>
                    ) : (
                      <a href={l.href} target="_blank" rel="noopener" className="hover:underline">
                        {l.label}
                        <span className="sr-only">（新しいタブで開きます）</span>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <p className="container-page border-t border-line py-5 text-[0.75rem] text-sub">
          © {SITE.name} {SITE.kind}
        </p>
      </div>
    </footer>
  );
}
