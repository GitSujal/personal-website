/**
 * The homepage: a lesson in loading data, played in 3D (./scene.ts, ./pipeline.ts).
 *
 * Three sources rain rows in different patterns: on demand, in batches, as a stream. For each one you pick
 * a loading method (bucket, pulley, conveyor, or nothing), and each method has its own cost: $1 per bucket
 * run, $1 per pulley round trip, $0.10 a second for a conveyor. Rows nothing catches are lost to the sea;
 * caught rows are quality-checked, and the clean ones fill the dashboard silos, which unlock résumé stats.
 *
 * This module owns the state and everything readable: the station cards, the incurred-cost graph, the
 * ledger, the dashboard panel and announcements. Without WebGL, with reduced motion, or without JS, the
 * page is the lesson, the sources and a filled dashboard.
 */
import type { SceneApi } from './scene';
import { METHODS, type Method, SOURCES } from './sources';

const STORAGE_KEY = 'data-sea:v2';

function storageGet(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}
function storageSet(value: string | null) {
  try {
    if (value === null) localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* storage blocked: progress just won't survive a reload */
  }
}

const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
const money = (v: number) => `$${v.toFixed(2)}`;
const methodName = (m: Method) => METHODS.find((x) => x.id === m)?.name ?? m;

export function initDataSea(root: HTMLElement) {
  const canvas = root.querySelector<HTMLCanvasElement>('[data-sea-canvas]');
  const labelLayer = root.querySelector<HTMLElement>('[data-sea-labels]');
  if (!canvas || !labelLayer) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const live = root.querySelector<HTMLElement>('[data-sea-live]');
  const note = root.querySelector<HTMLElement>('[data-sea-note]');
  const panel = root.querySelector<HTMLElement>('[data-sea-panel]');
  const openers = [...root.querySelectorAll<HTMLAnchorElement>('[data-open-dashboard]')];
  const charts = [...root.querySelectorAll<SVGSVGElement>('[data-cost-chart]')];
  const chips = [...root.querySelectorAll<HTMLElement>('[data-silo-chip]')];
  const tiles = [...root.querySelectorAll<HTMLElement>('[data-sea-tile]')].map((el) => ({
    el,
    unlockAt: Number(el.dataset.unlock),
    text: el.dataset.text ?? '',
    value: el.querySelector<HTMLElement>('[data-sea-value]'),
    bar: el.querySelector<HTMLElement>('[data-sea-bar]'),
    unlocked: false,
  }));
  const goal = Math.max(...tiles.map((tile) => tile.unlockAt));

  // ---- per-source state, and its card ----------------------------------------------------------------------
  const sources = SOURCES.map((source, i) => {
    const card = root.querySelector<HTMLElement>(`[data-station="${i}"]`)!;
    const row = root.querySelector<HTMLElement>(`[data-ledger="${i}"]`);
    return {
      ...source,
      i,
      card,
      row,
      method: source.start as Method,
      every: 6,
      spent: 0,
      clean: 0,
      rejected: 0,
      lost: 0,
      series: [{ t: 0, v: 0 }],
    };
  });

  let scene: SceneApi | null = null;
  let now = 0;
  let complete = false;
  let paused = false;

  const delivered = () => sources.reduce((sum, s) => sum + s.clean, 0);

  // ---- cost: sampled into a line per source --------------------------------------------------------------
  const CHART = { left: 34, right: 330, top: 10, bottom: 160 };
  let sampleClock = 0;
  function sample() {
    for (const s of sources) s.series.push({ t: now, v: s.spent });
  }

  function renderCost() {
    const total = sources.reduce((sum, s) => sum + s.spent, 0);
    const xMax = Math.max(60, now);
    const yMax = Math.max(5, Math.ceil(total / 5) * 5);
    const x = (t: number) => CHART.left + (t / xMax) * (CHART.right - CHART.left);
    const y = (v: number) => CHART.bottom - (v / yMax) * (CHART.bottom - CHART.top);
    const path = (points: { t: number; v: number }[]) =>
      points.map((p, k) => `${k ? 'L' : 'M'}${x(p.t).toFixed(1)},${y(p.v).toFixed(1)}`).join(' ') +
      ` L${x(now).toFixed(1)},${y(points.at(-1)?.v ?? 0).toFixed(1)}`;
    const totals = sources[0]!.series.map((p, k) => ({
      t: p.t,
      v: sources.reduce((sum, s) => sum + (s.series[k]?.v ?? 0), 0),
    }));
    totals.push({ t: now, v: total });
    for (const chart of charts) {
      for (const s of sources)
        chart
          .querySelector(`[data-series="${s.i}"]`)
          ?.setAttribute('d', path([...s.series, { t: now, v: s.spent }]));
      chart.querySelector('[data-series="total"]')?.setAttribute('d', path(totals));
      // Direct labels at the line ends, nudged apart so equal totals don't overprint.
      const ends = sources.map((s) => ({ s, y: y(s.spent) })).sort((a, b) => a.y - b.y);
      for (let k = 1; k < ends.length; k++) ends[k]!.y = Math.max(ends[k]!.y, ends[k - 1]!.y + 12);
      for (const end of ends) {
        const label = chart.querySelector(`[data-cost-label="${end.s.i}"]`);
        label?.setAttribute('x', String(x(now) + 5));
        label?.setAttribute('y', String(end.y + 4));
        const count = label?.querySelector('[data-cost-count]');
        if (count) count.textContent = money(end.s.spent);
      }
      const yLabel = chart.querySelector('[data-cost-ymax]');
      if (yLabel) yLabel.textContent = `$${yMax}`;
      const xLabel = chart.querySelector('[data-cost-xmax]');
      if (xLabel) xLabel.textContent = `${Math.round(xMax)} s`;
    }
    root.querySelectorAll('[data-cost-total]').forEach((el) => (el.textContent = money(total)));
  }

  /** Card and ledger figures, and the line under each card saying what is happening right now. */
  function renderSources() {
    for (const s of sources) {
      for (const scope of [s.card, s.row]) {
        if (!scope) continue;
        scope.querySelector('[data-spent]')!.textContent = money(s.spent);
        scope.querySelector('[data-clean]')!.textContent = String(s.clean);
        scope.querySelector('[data-lost]')!.textContent = String(s.lost);
      }
      if (s.row) {
        s.row.querySelector('[data-ledger-method]')!.textContent =
          s.method === 'pulley' ? `Pulley, every ${s.every} s` : methodName(s.method);
        s.row.querySelector('[data-unit]')!.textContent = s.clean ? money((s.spent / s.clean) * 100) : '—';
      }
      const status = s.card.querySelector('[data-status]');
      if (status && scene) status.textContent = describe(s);
    }
    root
      .querySelectorAll('[data-sea-delivered]')
      .forEach((el) => (el.textContent = String(Math.min(delivered(), goal))));
    root
      .querySelectorAll('[data-sea-rejected]')
      .forEach((el) => (el.textContent = String(sources.reduce((sum, s) => sum + s.rejected, 0))));
    root
      .querySelectorAll('[data-sea-lost]')
      .forEach((el) => (el.textContent = String(sources.reduce((sum, s) => sum + s.lost, 0))));
  }

  function describe(s: (typeof sources)[number]) {
    const st = scene!.status(s.i);
    const secs = (v: number | null) => `${Math.ceil(v ?? 0)} s`;
    const carrier = s.method === 'bucket' ? 'Bucket' : 'Pulley';
    if (s.i === 0) {
      if (s.method === 'none') return 'Nothing on the pad, so nothing is requested.';
      if (s.method === 'conveyor') return 'A belt never presses the pad: no request, no data, still paying.';
      if (!st.docked) return `${carrier} on its way to the funnel.`;
      if (st.load >= 100)
        return s.method === 'bucket' ? 'Bucket full. Send it.' : `Full. Leaves in ${secs(st.next)}.`;
      return st.raining ? 'Request sent. Rows are coming down.' : `${carrier} on the pad, requesting.`;
    }
    if (s.i === 1) {
      const drop = `Next drop in ${secs(st.next)}`;
      if (s.method === 'conveyor') return `${drop}. The belt drains the tray as it lands.`;
      if (s.method === 'none') return `${drop}. Tray ${st.tray}/100, then it overflows.`;
      if (!st.docked) return `${drop}. ${carrier} away · tray ${st.tray}/100.`;
      return `${drop}. ${carrier} holds ${st.load}/100 · tray ${st.tray}/100.`;
    }
    if (s.method === 'conveyor') return 'Raining 7 rows a second. The belt catches every one.';
    if (s.method === 'none') return 'Raining 7 rows a second, all of it into the sea.';
    if (!st.docked) return `${carrier} away. The rain keeps falling, into the sea.`;
    if (st.load >= 100) return `${carrier} full: everything else spills.`;
    return `${carrier} catching ${st.load}/100.`;
  }

  // ---- the dashboard: silos fill, tiles unlock -----------------------------------------------------------
  function syncSilos() {
    const rows = complete ? goal : delivered();
    let previous = 0;
    const fills = tiles.map((tile) => {
      const fill = tile.unlocked ? 1 : (rows - previous) / (tile.unlockAt - previous);
      previous = tile.unlockAt;
      return Math.max(0, Math.min(1, fill));
    });
    scene?.setSilos(
      fills,
      tiles.map((tile) => tile.unlocked),
    );
    tiles.forEach((tile, k) => {
      chips[k]?.classList.toggle('is-locked', !tile.unlocked);
      if (!tile.unlocked && tile.bar) tile.bar.style.transform = `scaleX(${fills[k]})`;
    });
  }

  function checkUnlocks() {
    const rows = delivered();
    for (const tile of tiles) if (!tile.unlocked && rows >= tile.unlockAt) unlock(tile, true);
    if (!complete && tiles.every((tile) => tile.unlocked)) finish(true);
    syncSilos();
  }

  function unlock(tile: (typeof tiles)[number], animate: boolean) {
    tile.unlocked = true;
    tile.el.classList.remove('is-locked');
    if (!animate) return;
    tile.el.classList.add('is-new');
    announce(`Unlocked: ${tile.el.dataset.title}. ${tiles.indexOf(tile) + 1} of ${tiles.length} silos full.`);
    countUp(tile);
  }

  /** Counts the first number in a stat up from zero, keeping its prefix and suffix ("$600K+", "−60%"). */
  function countUp(tile: (typeof tiles)[number]) {
    const el = tile.value;
    const match = tile.text.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
    if (!el || !match) return;
    const [, prefix, number, suffix] = match;
    const target = Number(number);
    const start = performance.now();
    const tick = (ts: number) => {
      const t = Math.min(1, (ts - start) / 900);
      el.textContent = t < 1 ? `${prefix}${Math.round(target * ease(t))}${suffix}` : tile.text;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  function finish(persist: boolean) {
    complete = true;
    root.classList.add('is-complete');
    if (persist) storageSet('done');
    announce('Dashboard complete. Every silo is full.');
  }

  function unlockAll(persist = true) {
    for (const tile of tiles) if (!tile.unlocked) unlock(tile, false);
    if (!complete) finish(persist);
    syncSilos();
  }

  function reset() {
    complete = false;
    now = 0;
    storageSet(null);
    root.classList.remove('is-complete');
    for (const s of sources) {
      s.spent = s.clean = s.rejected = s.lost = 0;
      s.series = [{ t: 0, v: 0 }];
    }
    for (const tile of tiles) {
      tile.unlocked = false;
      tile.el.classList.add('is-locked');
      tile.el.classList.remove('is-new');
      if (tile.value) tile.value.textContent = tile.text;
    }
    scene?.reset();
    syncSilos();
    renderSources();
    renderCost();
    announce('Started over. Costs and the dashboard are back to zero.');
  }

  function announce(message: string) {
    if (live) live.textContent = message;
  }

  // ---- station controls ----------------------------------------------------------------------------------
  function syncCard(s: (typeof sources)[number]) {
    s.card.dataset.method = s.method;
    s.card.querySelectorAll<HTMLButtonElement>('[data-method]').forEach((b) => {
      b.setAttribute('aria-pressed', String(b.dataset.method === s.method));
    });
    s.card.querySelectorAll<HTMLButtonElement>('[data-every]').forEach((b) => {
      b.setAttribute('aria-pressed', String(Number(b.dataset.every) === s.every));
    });
  }

  for (const s of sources) {
    syncCard(s);
    s.card.querySelectorAll<HTMLButtonElement>('[data-method]').forEach((button) =>
      button.addEventListener('click', () => {
        root.classList.add('is-exploring');
        s.method = button.dataset.method as Method;
        scene?.setMethod(s.i, s.method);
        syncCard(s);
        renderSources();
        announce(`${s.letter}, ${s.name}: loaded by ${methodName(s.method).toLowerCase()}.`);
      }),
    );
    s.card.querySelectorAll<HTMLButtonElement>('[data-every]').forEach((button) =>
      button.addEventListener('click', () => {
        s.every = Number(button.dataset.every);
        scene?.setPulleyEvery(s.i, s.every);
        syncCard(s);
      }),
    );
    s.card.querySelector('[data-run]')?.addEventListener('click', () => scene?.runBucket(s.i));
  }

  // ---- the dashboard panel: a side drawer (bottom sheet on phones) over the scene ---------------------------
  const wide = window.matchMedia('(min-width: 900px)');
  let panelOpen = false;

  function syncInset() {
    if (!scene) return;
    if (!panelOpen || !panel) scene.setInset(0, 0);
    else if (wide.matches) scene.setInset(panel.offsetWidth, 0);
    else scene.setInset(0, panel.offsetHeight);
  }

  function openPanel(focus: boolean) {
    if (!panel) return;
    panelOpen = true;
    root.classList.add('has-panel');
    panel.hidden = false;
    for (const opener of openers) opener.setAttribute('aria-expanded', 'true');
    scene?.flyTo('dashboard');
    syncInset();
    if (focus) panel.querySelector<HTMLElement>('h2')?.focus({ preventScroll: true });
  }

  function closePanel(restoreFocus = true) {
    if (!panelOpen || !panel) return;
    panelOpen = false;
    root.classList.remove('has-panel');
    for (const opener of openers) opener.setAttribute('aria-expanded', 'false');
    scene?.flyTo('pipeline');
    syncInset();
    if (restoreFocus) openers[0]?.focus();
  }

  for (const opener of openers) {
    opener.addEventListener('click', (event) => {
      if (!scene) return; // No scene: the link jumps down to the dashboard on the page.
      event.preventDefault();
      if (panelOpen) closePanel();
      else openPanel(true);
    });
  }
  root.querySelector('[data-sea-close]')?.addEventListener('click', () => closePanel());
  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && panelOpen) closePanel();
  });
  wide.addEventListener('change', syncInset);
  if (panel) new ResizeObserver(syncInset).observe(panel);

  root.querySelector('[data-sea-recenter]')?.addEventListener('click', () => {
    root.classList.remove('is-exploring');
    if (panelOpen) closePanel(false);
    else scene?.flyTo('pipeline');
  });
  const pauseButton = root.querySelector<HTMLButtonElement>('[data-sea-pause]');
  pauseButton?.addEventListener('click', () => {
    paused = !paused;
    pauseButton.setAttribute('aria-pressed', String(paused));
    pauseButton.setAttribute('aria-label', paused ? 'Resume' : 'Pause');
    pauseButton.title = paused ? 'Resume' : 'Pause';
    pauseButton.innerHTML = paused
      ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5l12 7-12 7z"></path></svg>'
      : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M16 5v14"></path></svg>';
    updateRunning();
  });
  root.querySelector('[data-sea-reset]')?.addEventListener('click', reset);
  root.querySelector('[data-sea-skip]')?.addEventListener('click', () => unlockAll());

  /** No moving scene (reduced motion, or no WebGL): the lesson as a page, with the dashboard full. */
  function goStatic(reason: string) {
    root.classList.add('is-static');
    root.querySelectorAll<HTMLButtonElement>('.station button').forEach((button) => (button.disabled = true));
    if (note) note.textContent = reason;
    unlockAll(false);
  }

  let updateRunning = () => {};

  // ---- start ---------------------------------------------------------------------------------------------
  for (const tile of tiles) tile.el.classList.add('is-locked');
  root.classList.add('is-live');
  if (storageGet() === 'done') unlockAll();
  renderSources();
  renderCost();

  if (reduced.matches) {
    goStatic('Animation is off (reduced motion), so the dashboard is already full.');
    return;
  }

  let uiClock = 0;
  Promise.all([import('./scene'), document.fonts.ready])
    .then(([{ createScene }]) => {
      scene = createScene(
        canvas,
        labelLayer,
        { silos: chips },
        {
          onCost(source, dollars) {
            sources[source]!.spent += dollars;
          },
          onDeliver(source) {
            sources[source]!.clean++;
            checkUnlocks();
          },
          onReject(source) {
            sources[source]!.rejected++;
          },
          onLost(source) {
            sources[source]!.lost++;
          },
          onFrame(dt) {
            now += dt;
            sampleClock += dt;
            if (sampleClock >= 0.5) {
              sampleClock = 0;
              sample();
            }
            uiClock += dt;
            if (uiClock >= 0.2) {
              uiClock = 0;
              renderSources();
              renderCost();
            }
          },
          onSilo() {
            openPanel(false);
          },
          onExplore() {
            root.classList.add('is-exploring');
          },
        },
      );
      if (!scene) {
        goStatic("This browser can't draw the 3D scene, so the dashboard is already full.");
        return null;
      }
      for (const s of sources) {
        scene.setMethod(s.i, s.method);
        scene.setPulleyEvery(s.i, s.every);
      }
      syncSilos();
      const api = scene;
      return api.ready.then(() => api);
    })
    .then((api) => {
      if (!api) return;
      root.classList.add('has-scene');
      document.documentElement.classList.add('sea-mode');
      if (panel) panel.hidden = true;
      // Start high over the sea, then settle on the whole rig once the canvas has its size.
      api.flyTo('overview', true);
      setTimeout(() => {
        if (!root.classList.contains('is-exploring')) api.flyTo('pipeline');
      }, 150);
      // The intro paragraph sits over the clouds; once read, let it go.
      setTimeout(() => root.classList.add('is-settled'), 9000);
      updateRunning = () => api.setRunning(!paused && document.visibilityState === 'visible');
      document.addEventListener('visibilitychange', () => updateRunning());
      updateRunning();
    })
    .catch(() => goStatic("The 3D scene didn't load, so the dashboard is already full."));
}
