/** 小さな飾り。読み上げない。色は currentColor */
type P = { className?: string };

export const Paw = ({ className = "" }: P) => (
  <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false" fill="currentColor">
    <ellipse cx="9" cy="17" rx="4" ry="5.2" transform="rotate(-18 9 17)" />
    <ellipse cx="17" cy="9.5" rx="4" ry="5.4" transform="rotate(-6 17 9.5)" />
    <ellipse cx="26.500" cy="10.500" rx="4" ry="5.400" transform="rotate(10 26.500 10.500)" />
    <ellipse cx="33" cy="19" rx="3.800" ry="5" transform="rotate(24 33 19)" />
    <path d="M20.500 19c5.200 0 9.500 5 9.500 9.600 0 3.600-3.200 5-5.600 4.400-1.600-.4-2.600-1-4-1s-2.500.6-4 1c-2.600.7-5.800-.8-5.800-4.400 0-4.600 4.600-9.600 9.900-9.600z" />
  </svg>
);

export const Sparkle = ({ className = "" }: P) => (
  <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false" fill="currentColor">
    <path d="M20 2c1.400 9.500 5 14.600 16 18-11 3.400-14.600 8.500-16 18-1.400-9.500-5-14.600-16-18 11-3.400 14.600-8.500 16-18z" />
  </svg>
);

/** カメラ（写真の枚数のしるし） */
export const Camera = ({ className = "" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 8.500h3l1.500-2.500h7L17 8.500h3v10H4z" />
    <circle cx="12" cy="13" r="3" />
  </svg>
);

/** 点々と続く足あと。フッターや区切りに置く */
export function PawTrail({ className = "", count = 7 }: P & { count?: number }) {
  return (
    <div aria-hidden="true" className={`flex items-center justify-center gap-5 min-[768px]:gap-8 ${className}`}>
      {Array.from({ length: count }, (_, i) => (
        <Paw key={i} className={`size-6 rotate-90 min-[768px]:size-7 ${i % 2 ? "translate-y-2.5 text-yellow" : "-translate-y-2.5 text-coral"}`} />
      ))}
    </div>
  );
}
