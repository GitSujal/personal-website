/**
 * The 3D data sea (Three.js), loaded lazily by ./controller.ts. It owns the renderer, camera, controls and
 * pointer input, and hosts the simulation (./pipeline.ts). The whole floor is water full of 1s and 0s.
 *
 * Click a bucket to send it; drag to look around, right-drag or two fingers to turn, scroll or pinch to
 * zoom. The silo chips are the page's own HTML, pinned here to their place in 3D.
 */
import * as THREE from 'three';
import { MapControls } from 'three/addons/controls/MapControls.js';
import { canvasTexture, COLORS, createKit } from './kit';
import { createPipeline, type Method, type PipelineHooks, type StationStatus, wave } from './pipeline';

export type { Method, StationStatus } from './pipeline';

/** "overview" is the opening shot, high over the sea; the camera then settles on the whole rig. */
export type View = 'overview' | 'pipeline' | 'dashboard';

export interface SceneHooks extends PipelineHooks {
  onFrame(dt: number): void;
  /** A dashboard silo was clicked. */
  onSilo(index: number): void;
  /** The visitor started moving the camera themselves. */
  onExplore(): void;
}

export interface SceneApi {
  setRunning(on: boolean): void;
  /** Resolves once shaders are compiled and textures uploaded, so the first flight doesn't stutter. */
  ready: Promise<void>;
  flyTo(view: View, instant?: boolean): void;
  /** Screen space covered by the dashboard panel, in CSS pixels, so the view frames in what is left. */
  setInset(right: number, bottom: number): void;
  setMethod(source: number, method: Method): void;
  setPulleyEvery(source: number, seconds: number): void;
  runBucket(source: number): void;
  status(source: number): StationStatus;
  setSilos(fills: number[], unlocked: boolean[]): void;
  reset(): void;
}

/** Where the camera goes for a view: it looks at `target` from along `dir`, far enough to fit rw × rh. */
const VIEWS: Record<View, { target: THREE.Vector3; dir: THREE.Vector3; rw: number; rh: number }> = {
  overview: { target: new THREE.Vector3(4, 0, -2), dir: new THREE.Vector3(0, 1.4, 1), rw: 30, rh: 16 },
  pipeline: {
    target: new THREE.Vector3(5, 5.2, -1),
    dir: new THREE.Vector3(0, 0.55, 1),
    rw: 20,
    rh: 9,
  },
  dashboard: { target: new THREE.Vector3(14, 2.4, 0), dir: new THREE.Vector3(0, 0.62, 1), rw: 8.6, rh: 3.6 },
};
/** The camera's target stays over the busy part of the sea. */
const BOUNDS = { x0: -14, x1: 22, z0: -12, z1: 8 };

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

export function createScene(
  canvas: HTMLCanvasElement,
  labelLayer: HTMLElement,
  pinned: { silos: HTMLElement[] },
  hooks: SceneHooks,
): SceneApi | null {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  } catch {
    return null;
  }
  renderer.setPixelRatio(Math.min(1.75, window.devicePixelRatio || 1));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(COLORS.night);
  scene.fog = new THREE.Fog(COLORS.night, 45, 105);
  scene.add(new THREE.HemisphereLight('#d4f3f8', '#072f51', 1.5));
  const sun = new THREE.DirectionalLight(0xffffff, 2.2);
  sun.position.set(14, 30, 22);
  scene.add(sun);
  const glow = new THREE.PointLight(COLORS.teal, 14, 14);
  glow.position.set(14, 5, 3);
  scene.add(glow);
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 300);

  // ---- labels: decorative text and the page's own controls, pinned to 3D anchors -------------------------
  const anchored: { el: HTMLElement; at: () => THREE.Vector3; far: number }[] = [];
  const kit = createKit(scene, renderer, window.innerWidth < 700, (text, at, options = {}) => {
    const el = document.createElement('span');
    el.className = `sea-label ${options.cls ?? ''}`;
    el.textContent = text;
    labelLayer.append(el);
    anchored.push({ el, at, far: options.far ?? Infinity });
    return el;
  });
  const pipeline = createPipeline(kit, hooks);
  pinned.silos.forEach((el, i) => anchored.push({ el, at: () => pipeline.siloAnchor(i), far: 60 }));

  // ---- the far sea: glyphs bobbing out to the fog, so the whole floor reads as data ----------------------
  const far: { points: THREE.Points; base: Float32Array }[] = [];
  for (const glyph of ['0', '1']) {
    const texture = canvasTexture(kit, 64, 64, (g) => {
      g.fillStyle = '#ffffff';
      g.font = kit.font(54, 900);
      g.textAlign = 'center';
      g.textBaseline = 'middle';
      g.fillText(glyph, 32, 36);
    });
    const count = kit.small ? 900 : 2200;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      let x: number;
      let z: number;
      do {
        x = THREE.MathUtils.randFloat(-75, 85);
        z = THREE.MathUtils.randFloat(-60, 60);
      } while (x > -16 && x < 24 && z > -14 && z < 8);
      positions.set([x, 0, z], i * 3);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    const points = new THREE.Points(
      geometry,
      new THREE.PointsMaterial({
        map: texture,
        color: '#bfeaf1',
        size: 0.42,
        transparent: true,
        opacity: 0.8,
        depthWrite: false,
      }),
    );
    points.renderOrder = 3;
    scene.add(points);
    far.push({ points, base: positions });
  }
  function updateFarSea(t: number) {
    for (const { points, base } of far) {
      const attr = points.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < attr.count; i++) attr.setY(i, wave(base[i * 3]!, base[i * 3 + 2]!, t) + 0.05);
      attr.needsUpdate = true;
    }
  }

  // ---- input: a click sends a bucket or opens a silo; anything else moves the camera ----------------------
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let width = 0;
  let height = 0;
  const inset = { right: 0, bottom: 0, toRight: 0, toBottom: 0 };

  function setRay(event: PointerEvent) {
    const rect = canvas.getBoundingClientRect();
    pointer.set(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1,
    );
    raycaster.setFromCamera(pointer, camera);
  }
  function pick(): THREE.Object3D | null {
    const hit = raycaster.intersectObjects(pipeline.pickables, true).find((h) => h.object.visible);
    let object: THREE.Object3D | null = hit?.object ?? null;
    while (object && object.userData.run === undefined && object.userData.silo === undefined)
      object = object.parent;
    return object && object.visible ? object : null;
  }

  const controls = new MapControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.09;
  controls.screenSpacePanning = false;
  controls.minDistance = 6;
  controls.maxDistance = 70;
  controls.minPolarAngle = 0.15;
  controls.maxPolarAngle = 1.3;
  controls.zoomToCursor = true;
  let explored = false;
  controls.addEventListener('start', () => {
    fly = null;
    explored = true;
    hooks.onExplore();
  });

  let down: { x: number; y: number; t: number } | null = null;
  let hoverEvent: PointerEvent | null = null;
  canvas.addEventListener('pointerdown', (event) => {
    down = { x: event.clientX, y: event.clientY, t: performance.now() };
  });
  canvas.addEventListener('pointermove', (event) => {
    if (event.pointerType === 'mouse' && event.buttons === 0) hoverEvent = event;
  });
  canvas.addEventListener('pointerup', (event) => {
    // A press that didn't travel is a click on whatever is under it.
    const press = down;
    down = null;
    if (!press || event.button !== 0) return;
    const moved = Math.hypot(event.clientX - press.x, event.clientY - press.y);
    if (moved > 6 || performance.now() - press.t > 600) return;
    setRay(event);
    const hit = pick();
    if (hit?.userData.run !== undefined) pipeline.runBucket(hit.userData.run as number);
    else if (hit?.userData.silo !== undefined) hooks.onSilo(hit.userData.silo as number);
  });

  function updateHover() {
    if (!hoverEvent) return;
    setRay(hoverEvent);
    hoverEvent = null;
    canvas.style.cursor = pick() ? 'pointer' : '';
  }

  // ---- flying between views ------------------------------------------------------------------------------
  let fly: {
    fromPos: THREE.Vector3;
    fromTarget: THREE.Vector3;
    toPos: THREE.Vector3;
    toTarget: THREE.Vector3;
    t: number;
    dur: number;
  } | null = null;
  let current: View = 'pipeline';

  function pose(name: View) {
    const view = VIEWS[name];
    const target = view.target.clone();
    const aspect = Math.max(200, width - inset.toRight) / Math.max(200, height - inset.toBottom);
    const half = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    let fitWidth = view.rw / (half * aspect);
    // A phone held upright can't fit the whole rig: frame the sources and the funnel.
    if (name === 'pipeline' && aspect < 1) {
      target.set(-4, 4.6, -2.5);
      fitWidth = Math.min(fitWidth, 44);
    }
    const distance = Math.max(fitWidth, view.rh / half, controls.minDistance + 1);
    return { target, position: target.clone().addScaledVector(view.dir.clone().normalize(), distance) };
  }

  function flyTo(name: View, instant = false) {
    current = name;
    const { target, position } = pose(name);
    if (instant || !width) {
      fly = null;
      controls.target.copy(target);
      camera.position.copy(position);
      controls.update();
      return;
    }
    fly = {
      fromPos: camera.position.clone(),
      fromTarget: controls.target.clone(),
      toPos: position,
      toTarget: target,
      t: 0,
      dur: THREE.MathUtils.clamp(0.7 + camera.position.distanceTo(position) / 30, 0.9, 2.2),
    };
  }

  function updateFly(dt: number) {
    if (!fly) return;
    fly.t += dt;
    const t = ease(Math.min(1, fly.t / fly.dur));
    controls.target.lerpVectors(fly.fromTarget, fly.toTarget, t);
    camera.position.lerpVectors(fly.fromPos, fly.toPos, t);
    if (t >= 1) fly = null;
  }

  function updateInset(dt: number) {
    const k = Math.min(1, dt * 7);
    inset.right += (inset.toRight - inset.right) * k;
    inset.bottom += (inset.toBottom - inset.bottom) * k;
    if (Math.abs(inset.right) < 0.5 && Math.abs(inset.bottom) < 0.5 && !inset.toRight && !inset.toBottom) {
      if (camera.view?.enabled) camera.clearViewOffset();
      return;
    }
    // Shift the picture so its centre sits in the part of the screen the panel leaves free.
    camera.setViewOffset(width, height, inset.right / 2, inset.bottom / 2, width, height);
  }

  function clampTarget() {
    const before = controls.target.clone();
    controls.target.x = THREE.MathUtils.clamp(controls.target.x, BOUNDS.x0, BOUNDS.x1);
    controls.target.z = THREE.MathUtils.clamp(controls.target.z, BOUNDS.z0, BOUNDS.z1);
    controls.target.y = THREE.MathUtils.clamp(controls.target.y, 0, 7);
    camera.position.add(controls.target.clone().sub(before));
  }

  // ---- drawing -------------------------------------------------------------------------------------------
  const anchor = new THREE.Vector3();
  function writeAnchored() {
    for (const { el, at, far: limit } of anchored) {
      anchor.copy(at());
      const tooFar = camera.position.distanceTo(anchor) > limit;
      const p = anchor.project(camera);
      const hidden = tooFar || p.z > 1 || Math.abs(p.x) > 1.15 || Math.abs(p.y) > 1.15;
      el.classList.toggle('is-off', hidden);
      if (hidden) continue;
      el.style.setProperty('--x', `${(((p.x + 1) / 2) * width).toFixed(1)}px`);
      el.style.setProperty('--y', `${(((1 - p.y) / 2) * height).toFixed(1)}px`);
    }
  }

  let warm = false;
  function resize() {
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    if (!explored) flyTo(current, true);
    if (warm) renderFrame();
  }

  function renderFrame() {
    pipeline.beforeRender();
    writeAnchored();
    renderer.render(scene, camera);
  }

  // ---- loop ----------------------------------------------------------------------------------------------
  let now = 0;
  let last = 0;
  let frame = 0;
  let running = false;

  function tick(ts: number) {
    // Real time, in physics-sized steps, so schedules and per-second costs hold on slow devices.
    // rAF timestamps can predate the moment the loop started, so never step backwards.
    const elapsed = THREE.MathUtils.clamp((ts - last) / 1000 || 0, 0, 0.25);
    last = ts;
    const steps = Math.max(1, Math.ceil(elapsed / 0.04));
    for (let i = 0; i < steps; i++) {
      const dt = elapsed / steps;
      now += dt;
      pipeline.step(dt);
    }
    updateFarSea(now);
    updateFly(elapsed);
    controls.update(elapsed);
    clampTarget();
    updateInset(elapsed);
    updateHover();
    renderFrame();
    hooks.onFrame(elapsed);
    frame = requestAnimationFrame(tick);
  }

  if (import.meta.env.DEV) Object.assign(window, { __sea: { camera, controls, scene, renderer } });

  new ResizeObserver(resize).observe(canvas);
  resize();

  // Compile every shader and upload every texture before the first frame, not mid-flight.
  const ready = renderer
    .compileAsync(scene, camera)
    .then(() => {
      scene.traverse((object) => {
        const material = (object as THREE.Mesh).material;
        for (const m of Array.isArray(material) ? material : material ? [material] : []) {
          const map = (m as THREE.MeshBasicMaterial).map;
          if (map) renderer.initTexture(map);
        }
      });
    })
    .catch(() => {})
    .then(() => {
      warm = true;
      renderFrame();
    });

  return {
    ready,
    setRunning(on) {
      if (on === running) return;
      running = on;
      if (on) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      } else cancelAnimationFrame(frame);
    },
    flyTo(view, instant) {
      explored = false;
      flyTo(view, instant);
    },
    setInset(right, bottom) {
      inset.toRight = right;
      inset.toBottom = bottom;
      if (!explored) flyTo(current);
    },
    setMethod: pipeline.setMethod,
    setPulleyEvery: pipeline.setPulleyEvery,
    runBucket: pipeline.runBucket,
    status: pipeline.status,
    setSilos: pipeline.setSilos,
    reset() {
      pipeline.reset();
      if (!running && warm) renderFrame();
    },
  };
}
