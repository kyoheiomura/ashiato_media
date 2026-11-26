/** 日付は日本時間でそろえる（YAML の日付は UTC の 0 時として読まれる） */
const parts = (d: Date) => ({ y: d.getUTCFullYear(), m: d.getUTCMonth() + 1, d: d.getUTCDate() });

/** 2026年11月24日 */
export function formatDate(date: Date) {
  const { y, m, d } = parts(date);
  return `${y}年${m}月${d}日`;
}

/** 11.24（写真の上の日付のしるし） */
export function formatStamp(date: Date) {
  const { m, d } = parts(date);
  return `${m}.${d}`;
}

/** 2026年11月（年表の区切り） */
export function formatMonth(date: Date) {
  const { y, m } = parts(date);
  return `${y}年${m}月`;
}

/** <time datetime> 用 */
export function isoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

/** 生まれた年月（YYYY-MM）から、その日の年齢を出す。1歳未満は月齢 */
export function ageAt(born: string | undefined, at: Date) {
  if (!born) return undefined;
  const [by, bm] = born.split("-").map(Number);
  const months = (at.getUTCFullYear() - by) * 12 + (at.getUTCMonth() + 1 - bm);
  if (months < 0) return undefined;
  return months < 12 ? `${months}か月` : `${Math.floor(months / 12)}歳`;
}
