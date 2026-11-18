/**
 * Tiny formatting for the copy in src/data/copy.ts, so text can be edited without touching markup.
 *
 *   ==words==   yellow marker highlight      ++words++   cyan marker highlight
 *   ~~words~~   wavy underline (italic)      **words**   bold
 *   [text](url) link
 *
 * Everything else is HTML-escaped, so stray < or & in copy is safe.
 */

const MARKS = [
  { open: '==', close: '==', cls: 'hl' },
  { open: '++', close: '++', cls: 'hl cyan' },
  { open: '~~', close: '~~', cls: 'squig italic' },
] as const;

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Copy with markers → HTML string (for `set:html`). */
export function rich(text: string): string {
  let html = escape(text);
  for (const { open, close, cls } of MARKS) {
    const o = open.replace(/[+]/g, '\\+');
    const c = close.replace(/[+]/g, '\\+');
    html = html.replace(new RegExp(`${o}(.+?)${c}`, 'g'), `<span class="${cls}">$1</span>`);
  }
  return html
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, t: string, url: string) => {
      const external = /^https?:/.test(url) ? ' rel="noopener"' : '';
      return `<a href="${url}" class="ulink"${external}>${t}</a>`;
    });
}

/** Copy with markers → plain text (for aria-label, <title>, meta descriptions). */
export function plain(text: string): string {
  return text
    .replace(/==(.+?)==|\+\+(.+?)\+\+|~~(.+?)~~|\*\*(.+?)\*\*/g, (_m, a, b, c, d) => a ?? b ?? c ?? d)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
}

/**
 * Split a headline into words for the word-by-word entrance, keeping each word's marker class.
 * A marker may span several words ("++test of time++").
 */
export function words(text: string): { word: string; cls?: string }[] {
  const out: { word: string; cls?: string }[] = [];
  const re = /==(.+?)==|\+\+(.+?)\+\+|~~(.+?)~~|([^\s=+~]+(?:[=+~](?![=+~])[^\s=+~]*)*)/g;
  for (const m of text.matchAll(re)) {
    const [, yellow, cyan, squig, plainWord] = m;
    const marked = yellow ?? cyan ?? squig;
    if (marked) {
      const cls = yellow ? 'hl now' : cyan ? 'hl cyan now' : 'squig italic';
      for (const w of marked.split(/\s+/).filter(Boolean)) out.push({ word: w, cls });
    } else if (plainWord) {
      out.push({ word: plainWord });
    }
  }
  return out;
}
