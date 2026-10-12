import type { CollectionEntry } from 'astro:content';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "2024-10" → "Oct 2024", "2020" → "2020". */
export function formatYearMonth(value: string): string {
  const [year, month] = value.split('-');
  return month ? `${MONTHS[Number(month) - 1]} ${year}` : year;
}

export function formatSpan(start: string, end?: string): string {
  if (end === start) return formatYearMonth(start);
  return `${formatYearMonth(start)} — ${end ? formatYearMonth(end) : 'now'}`;
}

/** Sortable key: newest first works for both "YYYY" and "YYYY-MM". */
function sortKey(value: string): string {
  return value.length === 4 ? `${value}-00` : value;
}

export function byStartDesc(a: CollectionEntry<'roles'>, b: CollectionEntry<'roles'>): number {
  return sortKey(b.data.start).localeCompare(sortKey(a.data.start));
}

export function byDateDesc<T extends { data: { date: string } }>(a: T, b: T): number {
  return sortKey(b.data.date).localeCompare(sortKey(a.data.date));
}

export function byOrder<T extends { data: { order: number } }>(a: T, b: T): number {
  return a.data.order - b.data.order;
}

/** Placeholder copy is written in [square brackets] in content; it renders as a visible TODO. */
export function isPlaceholder(text: string | undefined): boolean {
  return !!text && /^\[.*\]$/.test(text.trim());
}
