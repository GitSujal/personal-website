// Regenerates public/Sujal_Dhungana_Resume.pdf from the /cv/ page.
// Usage: npm run resume   (builds, serves with wrangler dev, prints /cv/ with headless Chrome or Edge)
import { execFileSync, spawn } from 'node:child_process';
import { existsSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const candidates = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean);
const chrome = candidates.find((p) => existsSync(p));
if (!chrome) throw new Error('No Chrome/Edge found. Set CHROME_PATH.');

execFileSync('npx', ['astro', 'build'], { stdio: 'inherit', shell: true });

// Serve the build in workerd (same as production) and print /cv/ from it.
const port = 8799;
const server = spawn('npx', ['wrangler', 'dev', '--port', String(port)], { shell: true, stdio: 'ignore' });
const url = `http://127.0.0.1:${port}/cv/`;
try {
  for (let i = 0; ; i++) {
    try {
      if ((await fetch(url)).ok) break;
    } catch {
      /* not up yet */
    }
    if (i > 120) throw new Error('wrangler dev did not start');
    await new Promise((r) => setTimeout(r, 500));
  }
  const out = resolve('public/Sujal_Dhungana_Resume.pdf');
  execFileSync(chrome, [
    '--headless=new',
    '--disable-gpu',
    '--no-pdf-header-footer',
    '--virtual-time-budget=4000',
    `--print-to-pdf=${out}`,
    url,
  ]);
  console.log(`Wrote ${out}`);

  const md = toMarkdown(await (await fetch(url)).text());
  const mdOut = resolve('public/Sujal_Dhungana_Resume.md');
  writeFileSync(mdOut, md);
  console.log(`Wrote ${mdOut}`);
} finally {
  if (process.platform === 'win32')
    execFileSync('taskkill', ['/pid', String(server.pid), '/T', '/F'], { stdio: 'ignore' });
  else server.kill();
}

/** Minimal HTML → Markdown for the /cv/ page's own, known markup (not a general converter). */
function toMarkdown(html) {
  const main = html.slice(html.indexOf('<main'), html.indexOf('</main>'));
  const text = (s) =>
    s
      .replace(/<strong>(.*?)<\/strong>/gs, '**$1**')
      .replace(/<[^>]+>/g, '')
      .replace(/&amp;/g, '&')
      .replace(/&#39;|&#x27;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/\s+/g, ' ')
      .trim();
  const all = (re, s) => [...s.matchAll(re)].map((m) => m[1]);
  const out = ['# Sujal Dhungana', ''];
  out.push(text(main.match(/class="role"[^>]*>(.*?)<\/p>/s)[1]), '');
  out.push(
    all(/<li>(.*?)<\/li>/gs, main.match(/class="contact"(.*?)<\/ul>/s)[1])
      .map(text)
      .join(' · '),
    '',
  );
  for (const section of all(/<section[^>]*>(.*?)<\/section>/gs, main)) {
    const title = text(section.match(/<h2[^>]*>(.*?)<\/h2>/s)[1]);
    out.push(`## ${title[0]}${title.slice(1).toLowerCase()}`, '');
    if (section.includes('class="skills"')) {
      for (const [, dt, dd] of section.matchAll(/<dt>(.*?)<\/dt>\s*<dd>(.*?)<\/dd>/gs))
        out.push(`- **${text(dt)}:** ${text(dd)}`);
      out.push('');
      continue;
    }
    const articles = all(/<article[^>]*>(.*?)<\/article>/gs, section);
    if (!articles.length) out.push(text(section.replace(/<h2.*?<\/h2>/s, '')), '');
    for (const a of articles) {
      out.push(`### ${text(a.match(/<h3[^>]*>(.*?)<\/h3>/s)[1])}`);
      for (const w of all(/class="when[^"]*"[^>]*>(.*?)<\/p>/gs, a)) out.push(`*${text(w)}*`);
      for (const p of all(/<p class="small">(.*?)<\/p>/gs, a)) out.push(text(p));
      out.push('');
      for (const li of all(/<li>(.*?)<\/li>/gs, a)) out.push(`- ${text(li)}`);
      out.push('');
    }
  }
  return `${out
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()}\n`;
}
