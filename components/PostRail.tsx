"use client";

/**
 * 横に流すカードの列。指では横にスワイプ、広い画面では左右の丸いボタンで1画面ぶん送る。
 * 端まで来たら、その側のボタンは消す。
 */
import { useEffect, useRef, useState, type ReactNode } from "react";

export function PostRail({ children, label }: { children: ReactNode; label: string }) {
  const ref = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const move = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: reduce ? "auto" : "smooth" });
  };

  const btn = "absolute top-[38%] z-10 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-ink text-white transition-[opacity,background-color] hover:bg-[#3a3a37] min-[768px]:flex";
  return (
    <div className="relative">
      <ul ref={ref} aria-label={label} className="rail -mx-5 px-5 pb-2 [scroll-padding-inline:1.25rem] min-[768px]:mx-0 min-[768px]:px-0 min-[768px]:[scroll-padding-inline:0]">
        {children}
      </ul>
      <button type="button" onClick={() => move(-1)} disabled={edge.start} className={`${btn} -left-5 ${edge.start ? "pointer-events-none opacity-0" : ""}`}>
        <span className="sr-only">前の投稿へ</span>
        <span aria-hidden="true" className="ml-1 size-2.5 -rotate-135 border-t-2 border-r-2 border-white" />
      </button>
      <button type="button" onClick={() => move(1)} disabled={edge.end} className={`${btn} -right-5 ${edge.end ? "pointer-events-none opacity-0" : ""}`}>
        <span className="sr-only">次の投稿へ</span>
        <span aria-hidden="true" className="mr-1 size-2.5 rotate-45 border-t-2 border-r-2 border-white" />
      </button>
    </div>
  );
}
