import { SITE } from "@/data/site";

/**
 * ロゴ：歩いていく3つの足あと＋ひらがなの「あしあと」＋小さなローマ字。
 * 姉妹サイト tocotoco の足あと（2つ）と同じ形で、こちらは1つ多く「重なっていく」。
 * 読み上げは外側のリンクの aria-label が担当するので、ここは飾りとして扱う。
 */
export function Logo({ size = "md" }: { size?: "md" | "lg" }) {
  return (
    <span aria-hidden="true" className="inline-flex items-center gap-2">
      <TrailMark className={size === "lg" ? "h-10 w-[3.75rem]" : "h-7 w-[2.625rem] min-[400px]:h-8 min-[400px]:w-12"} />
      <span className="flex flex-col leading-none">
        <span className={`font-extrabold tracking-[0.04em] ${size === "lg" ? "text-[1.875rem]" : "text-[1.25rem] min-[400px]:text-[1.4375rem]"}`}>{SITE.name}</span>
        <span className="mt-1 text-[0.5625rem] font-bold tracking-[0.5em] text-sub">{SITE.nameEn}</span>
      </span>
    </span>
  );
}

export const PAW = (
  <>
    <ellipse cx="-6.2" cy="-2.5" rx="1.9" ry="2.5" transform="rotate(-18 -6.2 -2.5)" />
    <ellipse cx="-2.3" cy="-6" rx="1.9" ry="2.6" transform="rotate(-6 -2.3 -6)" />
    <ellipse cx="2.3" cy="-6" rx="1.9" ry="2.6" transform="rotate(6 2.3 -6)" />
    <ellipse cx="6.2" cy="-2.5" rx="1.9" ry="2.5" transform="rotate(18 6.2 -2.5)" />
    <path d="M0-2.6c2.8 0 5.1 2.7 5.1 5.2 0 1.900-1.700 2.700-3 2.400C1.200 4.800.700 4.500 0 4.500s-1.200.300-2.100.500c-1.400.300-3.100-.500-3.100-2.400 0-2.500 2.400-5.200 5.200-5.200z" />
  </>
);

/** 足あとが3つ、右上へ歩いていく。コーラル → 黄色 → コーラル */
export function TrailMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 40" className={`shrink-0 ${className}`} aria-hidden="true" focusable="false">
      <g transform="translate(11 29) rotate(24)" fill="#ff9f85">
        <g className="step-a">{PAW}</g>
      </g>
      <g transform="translate(30 15) rotate(24) scale(0.9)" fill="#ffd83d">
        <g className="step-b">{PAW}</g>
      </g>
      <g transform="translate(48 27) rotate(24) scale(0.8)" fill="#ff9f85">
        <g className="step-c">{PAW}</g>
      </g>
    </svg>
  );
}
