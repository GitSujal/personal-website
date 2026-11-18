/**
 * The simulation and its machinery. ./scene.ts owns the renderer, camera and input; this module builds
 * the world, moves every bit, and reports what happened through PipelineHooks.
 *
 * Three sources (clouds) hold the data, each with a different delivery pattern:
 *   A · on-demand  drops 100 rows only while a bucket sits on its pad (the pad is the request button)
 *   B · batch      drops 100 rows every ~12 s into a landing tray that holds one drop; a second drop
 *                  into a full tray overflows
 *   C · stream     rains rows without stopping
 * Each source is loaded by one method, chosen per source:
 *   bucket    a manual run, $1 per run
 *   pulley    a scheduled round trip every 12 s or 6 s, $1 per trip, whether or not it carries anything
 *   conveyor  always running, $0.10 a second
 * Rows nothing catches fall into the data sea: lost. Caught rows go into the funnel, where each is tagged
 * good or bad; a QA robot pulls the bad ones, and clean rows pipe into the dashboard silos.
 */
import * as THREE from 'three';
import type { Kit } from './kit';
import { BATCH_EVERY, type Method, SOURCES } from './sources';

export type { Method } from './sources';

export interface PipelineHooks {
  onCost(source: number, dollars: number): void;
  onDeliver(source: number): void;
  onReject(source: number): void;
  onLost(source: number): void;
}

export interface StationStatus {
  method: Method;
  /** A bucket is sitting on the pad. */
  docked: boolean;
  /** Rows in the bucket on this station. */
  load: number;
  /** Rows waiting in B's landing tray. */
  tray: number;
  /** Seconds to B's next drop, or to the pulley's next departure. */
  next: number | null;
  raining: boolean;
}

export interface Pipeline {
  step(dt: number): void;
  beforeRender(): void;
  /** Things a click can hit: buckets (`userData.run`) and silos (`userData.silo`). */
  pickables: THREE.Object3D[];
  setMethod(source: number, method: Method): void;
  setPulleyEvery(source: number, seconds: number): void;
  runBucket(source: number): void;
  status(source: number): StationStatus;
  /** Silo fill levels 0–1, and which have unlocked their stat. */
  setSilos(fills: number[], unlocked: boolean[]): void;
  siloAnchor(index: number): THREE.Vector3;
  reset(): void;
}

// ---- layout (scene units) -------------------------------------------------------------------------------
const F = { x: 2, z: 0, top: 5.6, spout: 3.2, R: 1.7, r: 0.2 };
const DECK = { x0: -0.6, x1: 21.6, z0: -3.4, z1: 3, y: 0.3 };
const GATE_Y = 1.9;
const LEDGE = new THREE.Vector3(F.x + 0.42, GATE_Y, 0);
const SHOULDER = new THREE.Vector2(F.x + 2.15, 2.55);
const ARM = 1.02;
const ROBOT_REST = new THREE.Vector2(F.x + 1.35, 2.95);
const BIN = { x: F.x + 1.5, z: 0, size: 0.9, y: DECK.y + 0.02 };
const PIPE_EXIT = DECK.y + 0.36;
const MANIFOLD = new THREE.Vector3(7.2, DECK.y + 0.75, -0.2);
const PAD_Y = 0.7;
const CLOUD_Y = 9.2;
const RAIN_R = 0.5;
const BUCKET_SCALE = 1.3;
const CAP = 100;
const DROP = 100;
const STREAM_RATE = 7;
const CONVEYOR_PER_SECOND = 0.1;
const BAD_RATE = 0.25;
const GRAVITY = 9.8;

export const SILOS = Array.from({ length: 8 }, (_, i) => ({
  x: 8.4 + i * 1.62,
  z: i % 2 ? 1.0 : -1.3,
  h: i % 2 ? 2.6 : 3.8,
  r: 0.62,
}));

const SEA = { x0: -16, x1: 24, z0: -14, z1: 8 };

type BitState =
  | 'idle'
  | 'sea'
  | 'rain'
  | 'spill'
  | 'held'
  | 'tray'
  | 'belt'
  | 'fall'
  | 'funnel'
  | 'spout'
  | 'lane'
  | 'pipe'
  | 'arc'
  | 'quarantine'
  | 'grabbed'
  | 'bin';

interface Bit {
  index: number;
  kind: 0 | 1;
  state: BitState;
  src: number;
  p: THREE.Vector3;
  v: THREE.Vector3;
  rot: THREE.Euler;
  spin: THREE.Vector3;
  scale: number;
  good: boolean;
  tagged: boolean;
  depth: number;
  angle: number;
  slot: THREE.Vector3;
  s: number;
  from: THREE.Vector3;
  silo: number;
}

/** One trip of a bucket: up from the pad, across to the funnel, pour, and back. */
type Leg = { to: THREE.Vector3; dur: number; tilt?: number; pour?: boolean };

interface Container {
  kind: 'bucket' | 'pulley';
  source: number;
  group: THREE.Group;
  bits: Bit[];
  home: THREE.Vector3;
  legs: Leg[];
  leg: number;
  t: number;
  from: THREE.Vector3;
  tilt: number;
  fromTilt: number;
  axis: THREE.Vector3;
  pourDir: THREE.Vector3;
  pourClock: number;
}

const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
const rand = (min: number, max: number) => min + Math.random() * (max - min);
export const wave = (x: number, z: number, t: number) =>
  0.12 * Math.sin(x * 0.9 + t * 1.4) + 0.08 * Math.sin(z * 1.3 + t * 1.1 + x * 0.3);
const onDeck = (x: number, z: number) => x > DECK.x0 && x < DECK.x1 && z > DECK.z0 && z < DECK.z1;
const funnelRadius = (y: number) =>
  THREE.MathUtils.lerp(F.r, F.R, THREE.MathUtils.clamp((y - F.spout) / (F.top - F.spout), 0, 1));
const funnelDist = (p: THREE.Vector3) => Math.hypot(p.x - F.x, p.z - F.z);

export function createPipeline(kit: Kit, hooks: PipelineHooks): Pipeline {
  const { scene, mesh, beam } = kit;
  const { structure, glass } = kit.mats;
  const TEAL = new THREE.Color('#3ec1d3');
  const tmp = new THREE.Vector3();
  const up = new THREE.Vector3(0, 1, 0);
  let now = 0;

  // ---- the sea: the whole floor, out to the fog ----------------------------------------------------------
  const water = new THREE.MeshStandardMaterial({
    color: TEAL,
    transparent: true,
    opacity: 0.6,
    flatShading: true,
    roughness: 0.3,
    depthWrite: false,
  });
  const seaGeo = new THREE.PlaneGeometry(170, 130, kit.small ? 85 : 136, kit.small ? 65 : 104);
  seaGeo.rotateX(-Math.PI / 2);
  seaGeo.translate(4, 0, 0);
  const seaPos = seaGeo.attributes.position as THREE.BufferAttribute;
  mesh(seaGeo, water).renderOrder = 2;
  mesh(
    new THREE.PlaneGeometry(400, 400),
    new THREE.MeshStandardMaterial({ color: '#05213a', roughness: 1 }),
    4,
    -1.8,
    0,
  ).rotation.x = -Math.PI / 2;

  // ---- the deck: funnel, robot, bin and silos stand on it, above the waves ---------------------------------
  const deckMat = new THREE.MeshStandardMaterial({ color: '#16405f', roughness: 0.8 });
  mesh(
    new THREE.BoxGeometry(DECK.x1 - DECK.x0, 0.22, DECK.z1 - DECK.z0),
    deckMat,
    (DECK.x0 + DECK.x1) / 2,
    DECK.y - 0.11,
    (DECK.z0 + DECK.z1) / 2,
  );
  mesh(
    new THREE.BoxGeometry(DECK.x1 - DECK.x0 + 0.1, 0.04, 0.06),
    new THREE.MeshStandardMaterial({ color: TEAL, emissive: TEAL, emissiveIntensity: 0.8 }),
    (DECK.x0 + DECK.x1) / 2,
    DECK.y,
    DECK.z1,
  );
  for (let x = DECK.x0 + 0.5; x < DECK.x1; x += 5.5)
    for (const z of [DECK.z0 + 0.4, DECK.z1 - 0.4])
      mesh(new THREE.CylinderGeometry(0.14, 0.14, 2, 10), structure, x, DECK.y - 1.1, z);

  // ---- funnel, QA lane, robot, reject bin ----------------------------------------------------------------
  mesh(
    new THREE.LatheGeometry(
      [new THREE.Vector2(F.r, F.spout - 0.5), new THREE.Vector2(F.r, F.spout), new THREE.Vector2(F.R, F.top)],
      40,
    ),
    glass,
    F.x,
    0,
    F.z,
  ).renderOrder = 3;
  mesh(new THREE.TorusGeometry(F.R, 0.05, 8, 48), structure, F.x, F.top, F.z).rotation.x = Math.PI / 2;
  for (const dx of [-1, 1])
    beam(
      new THREE.Vector3(F.x + dx * 1.95, DECK.y, -0.5),
      new THREE.Vector3(F.x + dx * 1.45, F.top - 0.6, -0.5),
      0.1,
      0.1,
      structure,
    );
  mesh(
    new THREE.CylinderGeometry(0.2, 0.2, F.spout - 0.5, 20, 1, true),
    glass,
    F.x,
    (F.spout - 0.5) / 2 + 0.25,
    F.z,
  ).renderOrder = 3;
  mesh(new THREE.BoxGeometry(0.75, 0.06, 0.4), structure, LEDGE.x + 0.18, GATE_Y - 0.12, 0);
  mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.5, 20), structure, F.x, DECK.y + 0.05, F.z);

  const binGroup = new THREE.Group();
  const half = BIN.size / 2;
  for (const [w, h, d, x, y, z] of [
    [BIN.size, 0.05, BIN.size, 0, 0, 0],
    [0.05, BIN.size, BIN.size, -half, half, 0],
    [0.05, BIN.size, BIN.size, half, half, 0],
    [BIN.size, BIN.size, 0.05, 0, half, -half],
    [BIN.size, BIN.size * 0.6, 0.05, 0, BIN.size * 0.3, half],
  ] as const)
    mesh(new THREE.BoxGeometry(w, h, d), structure, x, y, z, binGroup);
  binGroup.position.set(BIN.x, BIN.y, BIN.z);
  scene.add(binGroup);

  const eye = new THREE.MeshStandardMaterial({ color: TEAL, emissive: TEAL, emissiveIntensity: 0.4 });
  mesh(
    new THREE.CylinderGeometry(0.16, 0.24, SHOULDER.y - DECK.y, 16),
    structure,
    SHOULDER.x,
    (SHOULDER.y + DECK.y) / 2,
    0,
  );
  const head = mesh(new THREE.BoxGeometry(0.62, 0.42, 0.46), structure, SHOULDER.x, SHOULDER.y + 0.3, 0);
  mesh(new THREE.SphereGeometry(0.075, 12, 10), eye, -0.24, 0.04, 0.2, head);
  const upperArm = mesh(new THREE.BoxGeometry(ARM, 0.12, 0.12), kit.mats.teal);
  const foreArm = mesh(new THREE.BoxGeometry(ARM, 0.1, 0.1), kit.mats.teal);
  const elbowJoint = mesh(new THREE.SphereGeometry(0.1, 12, 10), structure);
  const gripper = mesh(new THREE.BoxGeometry(0.08, 0.3, 0.2), structure);

  // The pipe from the bottom of the QA lane to the silos' manifold.
  const pipe = new THREE.CatmullRomCurve3([
    new THREE.Vector3(F.x, PIPE_EXIT, 0),
    new THREE.Vector3(F.x + 0.15, DECK.y + 0.3, -0.9),
    new THREE.Vector3(F.x + 1.8, DECK.y + 0.3, -1.6),
    new THREE.Vector3(5.6, DECK.y + 0.3, -1.6),
    new THREE.Vector3(6.6, DECK.y + 0.5, -0.9),
    MANIFOLD.clone(),
  ]);
  const pipeLength = pipe.getLength();
  mesh(new THREE.TubeGeometry(pipe, 80, 0.14, 12, false), glass).renderOrder = 3;
  mesh(new THREE.SphereGeometry(0.32, 16, 12), structure, MANIFOLD.x, MANIFOLD.y, MANIFOLD.z);

  // ---- the dashboard silos: clean rows fill them, and a full one shows its stat ----------------------------
  const silos = SILOS.map((s, i) => {
    const group = new THREE.Group();
    group.position.set(s.x, DECK.y, s.z);
    group.userData = { silo: i };
    scene.add(group);
    const shell = new THREE.MeshStandardMaterial({
      color: '#ffffff',
      transparent: true,
      opacity: 0.16,
      roughness: 0.1,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    mesh(new THREE.CylinderGeometry(s.r, s.r, s.h, 28, 1, true), shell, 0, s.h / 2, 0, group).renderOrder = 3;
    mesh(new THREE.CylinderGeometry(s.r + 0.08, s.r + 0.12, 0.2, 28), structure, 0, 0.1, 0, group);
    mesh(new THREE.TorusGeometry(s.r, 0.04, 8, 32), structure, 0, s.h, 0, group).rotation.x = Math.PI / 2;
    const fillMat = new THREE.MeshStandardMaterial({
      color: TEAL,
      emissive: TEAL,
      emissiveIntensity: 0.25,
      transparent: true,
      opacity: 0.75,
    });
    const fill = mesh(new THREE.CylinderGeometry(s.r - 0.06, s.r - 0.06, 1, 28), fillMat, 0, 0.2, 0, group);
    fill.scale.y = 0.001;
    const cap = mesh(
      new THREE.CylinderGeometry(s.r * 0.6, s.r * 0.6, 0.08, 24),
      new THREE.MeshStandardMaterial({ color: '#0a1622', emissive: TEAL, emissiveIntensity: 0 }),
      0,
      s.h + 0.05,
      0,
      group,
    );
    return { ...s, group, fill, fillMat, cap, level: 0, goal: 0, unlocked: false, pulse: 0 };
  });

  // ---- sources: a pedestal and pad under each cloud ------------------------------------------------------
  const sourceColor = SOURCES.map((s) => new THREE.Color(s.color));
  const stations = SOURCES.map((src, i) => {
    const pad = new THREE.Vector3(src.x, PAD_Y, src.z);
    const toFunnel = new THREE.Vector3(F.x - src.x, 0, F.z - src.z).normalize();
    const side = new THREE.Vector3().crossVectors(toFunnel, up).normalize();
    const color = sourceColor[i]!;
    const glowMat = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.6 });

    mesh(new THREE.CylinderGeometry(1.25, 1.4, 2.5, 24), deckMat, pad.x, PAD_Y - 1.25, pad.z);
    mesh(new THREE.TorusGeometry(1.25, 0.05, 8, 40), glowMat, pad.x, PAD_Y, pad.z).rotation.x = Math.PI / 2;
    // A: the pad is a request button. B: a landing tray. C: a plain grate.
    let button: THREE.Mesh | null = null;
    if (i === 0)
      button = mesh(new THREE.CylinderGeometry(0.8, 0.8, 0.14, 28), glowMat, pad.x, PAD_Y + 0.07, pad.z);
    if (i === 1) {
      const tray = new THREE.Group();
      tray.position.copy(pad);
      scene.add(tray);
      for (const [w, d, x, z] of [
        [2.1, 0.08, 0, -1.05],
        [2.1, 0.08, 0, 1.05],
        [0.08, 2.1, -1.05, 0],
        [0.08, 2.1, 1.05, 0],
      ] as const)
        mesh(new THREE.BoxGeometry(w, 0.32, d), structure, x, 0.16, z, tray);
    }

    // The cloud: puffs of light, tinted with the source's colour.
    const cloud = new THREE.Group();
    cloud.position.set(pad.x, CLOUD_Y, pad.z);
    scene.add(cloud);
    const cloudMat = new THREE.MeshStandardMaterial({
      color: '#e8f2f6',
      emissive: color,
      emissiveIntensity: 0.12,
      roughness: 0.9,
      flatShading: true,
    });
    for (const [x, y, z, r] of [
      [0, 0, 0, 1.15],
      [1.0, -0.15, 0.2, 0.85],
      [-1.0, -0.1, -0.1, 0.9],
      [0.4, 0.45, -0.3, 0.8],
      [-0.5, 0.35, 0.45, 0.7],
      [0.2, -0.25, 0.75, 0.75],
    ] as const)
      mesh(new THREE.IcosahedronGeometry(r, 1), cloudMat, x, y, z, cloud);

    // Manual bucket: sits on the pad until you send it.
    const bucket = makeBucket(BUCKET_SCALE);
    bucket.userData = { run: i };
    const home = pad.clone().add(new THREE.Vector3(0, 0.52 + (i === 0 ? 0.1 : i === 1 ? 0.05 : 0), 0));
    bucket.position.copy(home);

    // Pulley: two masts and a cable from above the pad to above the funnel; the bucket rides beneath.
    const rig = new THREE.Group();
    scene.add(rig);
    const cableY = 8.1;
    const overPad = new THREE.Vector3(pad.x, cableY, pad.z);
    const overFunnel = new THREE.Vector3(F.x - toFunnel.x * 0.45, cableY, F.z - toFunnel.z * 0.45);
    const mastA = pad.clone().addScaledVector(side, 1.15).setY(0);
    const mastB = new THREE.Vector3(F.x, 0, F.z).addScaledVector(toFunnel, -2.3).addScaledVector(side, 0.6);
    for (const [base, top] of [
      [mastA, overPad],
      [mastB, overFunnel],
    ] as const) {
      const foot = base.clone().setY(onDeck(base.x, base.z) ? DECK.y : -1);
      beam(foot, base.clone().setY(cableY + 0.3), 0.14, 0.14, structure, rig);
      beam(base.clone().setY(cableY + 0.3), top.clone().setY(cableY + 0.3), 0.1, 0.1, structure, rig);
    }
    beam(
      overPad.clone().setY(cableY + 0.3),
      overFunnel.clone().setY(cableY + 0.3),
      0.03,
      0.03,
      structure,
      rig,
    );
    const trolley = mesh(new THREE.BoxGeometry(0.4, 0.22, 0.3), kit.mats.dark, 0, 0, 0, rig);
    const rope = mesh(new THREE.CylinderGeometry(0.018, 0.018, 1, 6), structure, 0, 0, 0, rig);
    const pulleyBucket = makeBucket(BUCKET_SCALE);
    pulleyBucket.position.copy(home);

    // Conveyor: from under the cloud up to the funnel's rim.
    const belt = new THREE.Group();
    scene.add(belt);
    const beltStart = pad
      .clone()
      .addScaledVector(toFunnel, -0.9)
      .setY(PAD_Y + 0.35);
    const beltEnd = new THREE.Vector3(F.x, F.top + 0.45, F.z).addScaledVector(toFunnel, -(F.R - 0.6));
    const beltTexture = makeBeltTexture();
    beltTexture.repeat.set(Math.round(beltStart.distanceTo(beltEnd) * 1.4), 1);
    slab(
      beltStart,
      beltEnd,
      0.95,
      0.12,
      new THREE.MeshStandardMaterial({ map: beltTexture, color: '#8fa1ad', roughness: 0.7 }),
      belt,
    );
    for (const p of [beltStart, beltEnd]) {
      const roller = mesh(new THREE.CylinderGeometry(0.17, 0.17, 1.05, 16), structure, 0, 0, 0, belt);
      roller.position.copy(p);
      roller.quaternion.setFromUnitVectors(up, side);
    }
    for (const t of [0.3, 0.62, 0.9]) {
      const p = beltStart.clone().lerp(beltEnd, t);
      const foot = onDeck(p.x, p.z) ? DECK.y : -1;
      beam(new THREE.Vector3(p.x, foot, p.z), p.clone().setY(p.y - 0.1), 0.1, 0.1, structure, belt);
    }

    return {
      i,
      pad,
      toFunnel,
      side,
      cloud,
      cloudMat,
      button,
      method: 'none' as Method,
      every: 6,
      pulleyClock: 0,
      bucket: container('bucket', i, bucket, home, toFunnel),
      pulley: container('pulley', i, pulleyBucket, home, toFunnel),
      rig,
      trolley,
      rope,
      cableY,
      belt,
      beltStart,
      beltEnd,
      beltLength: beltStart.distanceTo(beltEnd),
      beltTexture,
      tray: [] as Bit[],
      /** Rows left to drop in the current shower, and how fast. */
      pending: 0,
      rate: 0,
      dropClock: 0,
      nextDrop: BATCH_EVERY * 0.6,
      streamClock: 0,
      served: false,
    };
  });

  function container(
    kind: Container['kind'],
    source: number,
    group: THREE.Group,
    home: THREE.Vector3,
    toFunnel: THREE.Vector3,
  ): Container {
    return {
      kind,
      source,
      group,
      bits: [],
      home: home.clone(),
      legs: [],
      leg: 0,
      t: 0,
      from: home.clone(),
      tilt: 0,
      fromTilt: 0,
      // Tilting about up × direction leans the mouth towards the funnel.
      axis: new THREE.Vector3().crossVectors(up, toFunnel).normalize(),
      pourDir: toFunnel.clone(),
      pourClock: 0,
    };
  }

  function makeBucket(scale: number) {
    const group = new THREE.Group();
    const cup = new THREE.Mesh(
      new THREE.LatheGeometry(
        [
          new THREE.Vector2(0, -0.4),
          new THREE.Vector2(0.34, -0.4),
          new THREE.Vector2(0.5, 0.4),
          new THREE.Vector2(0.47, 0.4),
        ],
        28,
      ),
      new THREE.MeshStandardMaterial({ color: TEAL, roughness: 0.45, side: THREE.DoubleSide }),
    );
    group.add(cup);
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.49, 0.035, 8, 28), structure);
    rim.rotation.x = Math.PI / 2;
    rim.position.y = 0.4;
    group.add(rim);
    const handle = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.02, 6, 24, Math.PI), structure);
    handle.position.y = 0.4;
    group.add(handle);
    group.scale.setScalar(scale);
    scene.add(group);
    return group;
  }

  /** A flat box from a to b that stays level side to side, for belts. */
  function slab(
    a: THREE.Vector3,
    b: THREE.Vector3,
    width: number,
    thickness: number,
    material: THREE.Material,
    parent: THREE.Object3D,
  ) {
    const dir = b.clone().sub(a);
    const length = dir.length();
    dir.normalize();
    const sideways = new THREE.Vector3().crossVectors(dir, up).normalize();
    const normal = new THREE.Vector3().crossVectors(sideways, dir);
    const m = mesh(new THREE.BoxGeometry(length, thickness, width), material, 0, 0, 0, parent);
    m.position.copy(a).add(b).multiplyScalar(0.5);
    m.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(dir, normal, sideways));
    return m;
  }

  // ---- bits ----------------------------------------------------------------------------------------------
  const perKind = kit.small ? 550 : 900;
  const bitMaterial = new THREE.MeshStandardMaterial({ roughness: 0.45 });
  const zeroGeo = new THREE.TorusGeometry(0.085, 0.03, 6, 14);
  zeroGeo.scale(1, 1.4, 1);
  const instanced = [
    new THREE.InstancedMesh(zeroGeo, bitMaterial, perKind),
    new THREE.InstancedMesh(new THREE.BoxGeometry(0.075, 0.27, 0.075), bitMaterial, perKind),
  ] as const;
  for (const im of instanced) {
    im.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    im.frustumCulled = false;
    scene.add(im);
  }
  const bits: Bit[] = [];
  for (const kind of [0, 1] as const)
    for (let i = 0; i < perKind; i++)
      bits.push({
        index: i,
        kind,
        state: 'idle',
        src: 0,
        p: new THREE.Vector3(0, -50, 0),
        v: new THREE.Vector3(),
        rot: new THREE.Euler(rand(0, 6), rand(0, 6), rand(0, 6)),
        spin: new THREE.Vector3(rand(-0.6, 0.6), rand(-0.8, 0.8), rand(-0.6, 0.6)),
        scale: 0,
        good: true,
        tagged: false,
        depth: 0,
        angle: 0,
        slot: new THREE.Vector3(),
        s: 0,
        from: new THREE.Vector3(),
        silo: 0,
      });
  /** Lost rows drift in the sea, oldest recycled first when the pool runs dry. */
  const seaQueue: Bit[] = [];

  function take(): Bit | null {
    const free = bits.find((b) => b.state === 'idle');
    if (free) return free;
    const old = seaQueue.shift();
    return old ?? null;
  }

  function toSea(b: Bit, x: number, z: number) {
    b.state = 'sea';
    b.tagged = false;
    b.p.set(x, b.p.y, z);
    b.depth = Math.random() < 0.6 ? rand(-0.05, 0.08) : rand(-0.8, -0.15);
    b.v.set(rand(-0.15, 0.15), 0, rand(-0.1, 0.1));
    seaQueue.push(b);
  }

  function seedSea() {
    for (let n = 0; n < 380; n++) {
      const b = take();
      if (!b) break;
      let x: number;
      let z: number;
      do {
        x = rand(SEA.x0, SEA.x1);
        z = rand(SEA.z0, SEA.z1);
      } while (onDeck(x, z));
      b.p.y = 0;
      b.scale = 1;
      toSea(b, x, z);
    }
  }
  seedSea();

  /** A row nothing could hold: it bounces off outward and is lost to the sea. */
  function lose(b: Bit, from?: THREE.Vector3) {
    hooks.onLost(b.src);
    b.state = 'spill';
    b.tagged = false;
    if (!from) return;
    const out = tmp.set(b.p.x - from.x, 0, b.p.z - from.z);
    if (out.lengthSq() < 1e-4) out.set(rand(-1, 1), 0, rand(-1, 1));
    out.normalize();
    b.v.set(out.x * rand(1.5, 2.6), rand(1.2, 2.4), out.z * rand(1.5, 2.6));
  }

  function spawnRain(station: (typeof stations)[number]) {
    const b = take();
    if (!b) return;
    const q = seaQueue.indexOf(b);
    if (q >= 0) seaQueue.splice(q, 1);
    const a = rand(0, Math.PI * 2);
    const r = Math.sqrt(Math.random()) * RAIN_R;
    b.state = 'rain';
    b.src = station.i;
    b.tagged = false;
    b.scale = 1;
    b.p.set(station.pad.x + Math.cos(a) * r, CLOUD_Y - 0.6, station.pad.z + Math.sin(a) * r);
    b.v.set(0, -6, 0);
  }

  // ---- containers ----------------------------------------------------------------------------------------
  /** Slot i in a bucket: a centre, an inner ring of 5 and an outer ring of 8, in layers. */
  function slotFor(i: number, out: THREE.Vector3) {
    const layer = Math.floor(i / 14);
    const k = i % 14;
    const r = k === 0 ? 0 : k < 6 ? 0.17 : 0.33;
    const a = k < 6 ? (k / 5) * Math.PI * 2 : ((k - 6) / 8) * Math.PI * 2 + 0.3;
    return out.set(Math.cos(a) * r, -0.3 + layer * 0.1, Math.sin(a) * r);
  }

  const docked = (c: Container) => c.legs.length === 0 && c.group.position.distanceTo(c.home) < 0.05;
  const active = (s: (typeof stations)[number]) =>
    s.method === 'bucket' ? s.bucket : s.method === 'pulley' ? s.pulley : null;

  function hold(c: Container, b: Bit) {
    b.state = 'held';
    slotFor(c.bits.length, b.slot);
    c.bits.push(b);
  }

  function startTrip(c: Container) {
    const s = stations[c.source]!;
    const high = c.kind === 'pulley' ? s.cableY - 1.2 : 7.6;
    const over = new THREE.Vector3(F.x, 0, F.z).addScaledVector(s.toFunnel, -0.45);
    const tip = over.clone().setY(F.top + 1.25);
    c.legs = [
      { to: c.home.clone().setY(high), dur: 0.6 },
      { to: over.clone().setY(high), dur: 0.85 },
      { to: tip, dur: 0.3 },
      { to: tip.clone(), dur: 0.35, tilt: 2.1 },
      { to: tip.clone(), dur: 1.6, tilt: 2.1, pour: true },
      { to: over.clone().setY(high), dur: 0.3, tilt: 0 },
      { to: c.home.clone().setY(high), dur: 0.85 },
      { to: c.home.clone(), dur: 0.6 },
    ];
    c.leg = 0;
    c.t = 0;
    c.from.copy(c.group.position);
    c.fromTilt = c.tilt;
    hooks.onCost(c.source, 1);
  }

  function updateContainer(c: Container, dt: number, visible: boolean) {
    c.group.visible = visible || c.legs.length > 0 || c.bits.length > 0;
    if (c.legs.length) {
      const leg = c.legs[c.leg]!;
      c.t += dt;
      const t = Math.min(1, c.t / leg.dur);
      c.group.position.copy(c.from).lerp(leg.to, ease(t));
      if (leg.tilt !== undefined) c.tilt = THREE.MathUtils.lerp(c.fromTilt, leg.tilt, ease(t));
      if (leg.pour) {
        c.pourClock += dt * 130;
        while (c.pourClock >= 1 && c.bits.length) {
          c.pourClock -= 1;
          release(c, c.bits.pop()!);
        }
      }
      const done = t >= 1 || (leg.pour === true && c.bits.length === 0 && c.t > 0.2);
      if (done) {
        c.leg++;
        c.t = 0;
        c.from.copy(c.group.position);
        c.fromTilt = c.tilt;
        if (c.leg >= c.legs.length) {
          c.legs = [];
          c.group.position.copy(c.home);
          c.tilt = 0;
        }
      }
    }
    c.group.quaternion.setFromAxisAngle(c.axis, c.tilt);
    for (const b of c.bits) {
      tmp.copy(b.slot);
      c.group.localToWorld(tmp);
      b.p.lerp(tmp, Math.min(1, dt * 18));
      b.rot.y += dt * 0.4;
    }
  }

  function release(c: Container, b: Bit) {
    c.group.localToWorld(b.p.set(rand(-0.15, 0.15), 0.42, rand(-0.15, 0.15)));
    b.v
      .copy(c.pourDir)
      .multiplyScalar(0.35)
      .add(tmp.set(rand(-0.3, 0.3), rand(-0.3, 0.1), rand(-0.3, 0.3)));
    b.state = 'fall';
  }

  // ---- sources -------------------------------------------------------------------------------------------
  function updateStation(s: (typeof stations)[number], dt: number) {
    const c = active(s);
    // Hide the machinery a source isn't using; buckets still on a trip finish it.
    s.rig.visible = s.method === 'pulley';
    // A belt that's been switched off still delivers what it already carries.
    s.belt.visible = s.method === 'conveyor' || bits.some((b) => b.state === 'belt' && b.src === s.i);
    updateContainer(s.bucket, dt, s.method === 'bucket');
    updateContainer(s.pulley, dt, s.method === 'pulley');
    if (s.method === 'pulley') {
      const p = s.pulley.group.position;
      s.trolley.position.set(p.x, s.cableY + 0.2, p.z);
      const top = s.cableY + 0.1;
      const bottom = p.y + 0.6;
      s.rope.scale.y = Math.max(0.01, top - bottom);
      s.rope.position.set(p.x, (top + bottom) / 2, p.z);
    }

    // The schedule, not the data, decides when a pulley goes.
    if (s.method === 'pulley') {
      s.pulleyClock -= dt;
      if (s.pulleyClock <= 0 && docked(s.pulley)) {
        s.pulleyClock += s.every;
        startTrip(s.pulley);
      }
    }
    if (s.method === 'conveyor') {
      hooks.onCost(s.i, CONVEYOR_PER_SECOND * dt);
      s.beltTexture.offset.x -= dt * 1.1;
    }

    // What falls from the cloud, and when.
    if (s.i === 0) {
      // On demand: a bucket on the pad is the request.
      const waiting = c && docked(c) && c.bits.length === 0;
      if (waiting && !s.served && s.pending === 0) {
        s.pending = DROP;
        s.rate = DROP / 0.6;
        s.served = true;
      }
      if (!c || !docked(c)) s.served = false;
      if (s.button) s.button.position.y = PAD_Y + (c && docked(c) ? 0.02 : 0.07);
    } else if (s.i === 1) {
      s.nextDrop -= dt;
      if (s.nextDrop <= 0) {
        s.nextDrop += BATCH_EVERY + rand(-1.5, 1.5);
        s.pending += DROP;
        s.rate = DROP / 1.0;
      }
    } else {
      s.streamClock += dt * STREAM_RATE;
      while (s.streamClock >= 1) {
        s.streamClock -= 1;
        spawnRain(s);
      }
    }
    if (s.pending > 0) {
      s.dropClock += dt * s.rate;
      while (s.dropClock >= 1 && s.pending > 0) {
        s.dropClock -= 1;
        s.pending--;
        spawnRain(s);
      }
    } else s.dropClock = 0;
    s.cloudMat.emissiveIntensity = s.pending > 0 || s.i === 2 ? 0.45 : 0.12;
    s.cloud.position.y = CLOUD_Y + Math.sin(now * 0.8 + s.i) * 0.12;
    // The batch cloud swells as its next drop nears.
    if (s.i === 1) {
      s.cloud.scale.setScalar(1 + Math.max(0, 1 - s.nextDrop / 3) * 0.18);
      const secs = Math.max(0, Math.ceil(s.nextDrop));
      if (secs !== shownCountdown && cloudLabels[1]) {
        shownCountdown = secs;
        cloudLabels[1].textContent =
          s.pending > 0 ? 'B · Batch · dropping' : `B · Batch · next drop ${secs} s`;
      }
    }

    // B's tray: a docked bucket empties it; a conveyor drains it.
    if (s.i === 1 && s.tray.length) {
      if (c && docked(c) && c.bits.length < CAP) {
        for (let n = 0; n < 6 && s.tray.length && c.bits.length < CAP; n++) hold(c, s.tray.pop()!);
      } else if (s.method === 'conveyor') {
        if (Math.random() < dt * 30) {
          const b = s.tray.pop()!;
          b.state = 'belt';
          b.s = 0;
        }
      }
    }
  }

  // ---- the funnel and QA robot ---------------------------------------------------------------------------
  const spoutQueue: Bit[] = [];
  const quarantine: Bit[] = [];
  const binBits: Bit[] = [];
  let spoutClock = 0;
  let scanGlow = 0;
  const robot = {
    state: 'idle' as 'idle' | 'reach' | 'carry',
    t: 0,
    from: ROBOT_REST.clone(),
    grip: ROBOT_REST.clone(),
    bit: null as Bit | null,
  };

  function enterFunnel(b: Bit) {
    b.state = 'funnel';
    b.tagged = true;
    b.good = Math.random() >= BAD_RATE;
    b.angle = Math.atan2(b.p.z - F.z, b.p.x - F.x);
    b.depth = THREE.MathUtils.clamp(funnelDist(b.p) / F.R, 0.2, 0.85);
    b.p.y = F.top - 0.05;
  }

  /** The silo clean rows are filling right now: the first locked one, or any once all are lit. */
  let targetSilo = 0;

  function updateBit(b: Bit, dt: number) {
    switch (b.state) {
      case 'idle':
        return;
      case 'sea': {
        b.p.x += b.v.x * dt;
        b.p.z += b.v.z * dt;
        if (b.p.x < SEA.x0 || b.p.x > SEA.x1) b.v.x *= -1;
        if (b.p.z < SEA.z0 || b.p.z > SEA.z1) b.v.z *= -1;
        if (onDeck(b.p.x + b.v.x, b.p.z + b.v.z)) b.v.multiplyScalar(-1);
        b.p.y += (wave(b.p.x, b.p.z, now) + b.depth - b.p.y) * Math.min(1, dt * 3);
        b.scale = Math.min(1, b.scale + dt);
        b.rot.x += b.spin.x * dt * 0.4;
        b.rot.y += b.spin.y * dt * 0.4;
        return;
      }
      case 'rain': {
        const s = stations[b.src]!;
        const prevY = b.p.y;
        b.v.y -= GRAVITY * dt;
        b.p.addScaledVector(b.v, dt);
        b.rot.x += b.spin.x * dt * 4;
        const c = active(s);
        // Into a bucket waiting on the pad.
        const rim = (c?.home.y ?? 0) + 0.5;
        if (c && prevY >= rim && b.p.y < rim && docked(c)) {
          if (c.bits.length < CAP) hold(c, b);
          else lose(b, s.pad);
          return;
        }
        // Onto the belt, or into B's tray.
        const deckY = PAD_Y + 0.35;
        if (prevY >= deckY && b.p.y < deckY) {
          if (s.method === 'conveyor') {
            b.state = 'belt';
            b.s = 0;
          } else if (s.i === 1 && s.tray.length < CAP) {
            b.state = 'tray';
            const n = s.tray.length;
            b.slot.set(
              s.pad.x - 0.85 + (n % 10) * 0.19,
              PAD_Y + 0.12 + Math.floor(n / 50) * 0.1,
              s.pad.z - 0.85 + (Math.floor(n / 10) % 5) * 0.4 + (n % 2) * 0.1,
            );
            s.tray.push(b);
          } else {
            // Nothing to catch it: it bounces off the pad and is lost to the sea.
            lose(b, s.pad);
          }
        }
        return;
      }
      case 'tray':
        b.p.lerp(b.slot, Math.min(1, dt * 12));
        return;
      case 'spill':
      case 'fall': {
        const prevY = b.p.y;
        b.v.y -= GRAVITY * dt;
        b.p.addScaledVector(b.v, dt);
        b.rot.x += b.spin.x * dt * 5;
        b.rot.z += b.spin.z * dt * 5;
        if (b.state === 'fall' && prevY >= F.top && b.p.y < F.top && funnelDist(b.p) < F.R - 0.08) {
          enterFunnel(b);
          return;
        }
        const floor = onDeck(b.p.x, b.p.z) ? DECK.y + 0.05 : wave(b.p.x, b.p.z, now);
        if (b.p.y < floor) {
          if (b.state === 'fall') hooks.onLost(b.src);
          if (onDeck(b.p.x, b.p.z)) {
            b.state = 'idle';
            b.scale = 0;
          } else toSea(b, b.p.x, b.p.z);
        }
        return;
      }
      case 'belt': {
        const s = stations[b.src]!;
        b.s += dt * 2.4;
        if (b.s < 0.5) b.p.lerp(tmp.copy(s.beltStart).setY(s.beltStart.y + 0.17), Math.min(1, dt * 8));
        else {
          b.p.copy(s.beltStart).lerp(s.beltEnd, Math.min(1, b.s / s.beltLength));
          b.p.y += 0.17;
        }
        if (b.s >= s.beltLength) {
          b.state = 'fall';
          b.v.copy(s.toFunnel).multiplyScalar(0.6).setY(0.2);
        }
        return;
      }
      case 'funnel': {
        b.p.y -= dt * 1.6;
        b.angle += dt * 2.4;
        const r = b.depth * funnelRadius(b.p.y) * 0.85;
        b.p.x = F.x + Math.cos(b.angle) * r;
        b.p.z = F.z + Math.sin(b.angle) * r;
        b.rot.y += dt * 3;
        if (b.p.y <= F.spout + Math.min(spoutQueue.length, 20) * 0.04) {
          b.state = 'spout';
          spoutQueue.push(b);
        }
        return;
      }
      case 'lane': {
        b.p.y -= dt * 3;
        b.p.x += (F.x - b.p.x) * Math.min(1, dt * 8);
        b.p.z += (F.z - b.p.z) * Math.min(1, dt * 8);
        if (Math.abs(b.p.y - GATE_Y) < 0.45) scanGlow = 1;
        if (!b.good && b.p.y <= GATE_Y) {
          b.state = 'quarantine';
          quarantine.push(b);
        } else if (b.good && b.p.y <= PIPE_EXIT) {
          b.state = 'pipe';
          b.s = 0;
        }
        return;
      }
      case 'pipe': {
        b.s += (dt * 4.5) / pipeLength;
        if (b.s >= 1) {
          b.state = 'arc';
          b.s = 0;
          b.from.copy(MANIFOLD);
          b.silo = targetSilo;
        } else pipe.getPointAt(b.s, b.p);
        b.rot.y += dt * 4;
        return;
      }
      case 'arc': {
        // Over the top of the silo and in.
        const silo = silos[b.silo]!;
        b.s += dt * 1.8;
        const t = Math.min(1, b.s);
        const to = tmp.set(silo.x, DECK.y + silo.h + 0.25, silo.z);
        const peak = Math.max(b.from.y, to.y) + 1.2;
        b.p.lerpVectors(b.from, to, t);
        b.p.y += (peak - Math.max(b.from.y, to.y)) * Math.sin(t * Math.PI);
        if (t >= 1) {
          b.state = 'idle';
          b.scale = 0;
          silo.pulse = 1;
          hooks.onDeliver(b.src);
        }
        return;
      }
      case 'quarantine': {
        const i = quarantine.indexOf(b);
        tmp.set(LEDGE.x + Math.min(i, 3) * 0.13, GATE_Y + Math.max(0, i - 3) * 0.08, 0);
        b.p.lerp(tmp, Math.min(1, dt * 10));
        return;
      }
      case 'grabbed':
        b.p.set(robot.grip.x - 0.06, robot.grip.y - 0.05, 0);
        return;
      case 'bin': {
        const floor = BIN.y + 0.08 + Math.floor(binBits.indexOf(b) / 9) * 0.07;
        if (b.p.y > floor) {
          b.v.y -= GRAVITY * dt;
          b.p.y = Math.max(floor, b.p.y + b.v.y * dt);
        }
        return;
      }
      default:
        return;
    }
  }

  function updateLine(dt: number) {
    spoutClock += dt;
    spoutQueue.forEach((b, i) => {
      const k = Math.min(i, 20);
      b.p.set(F.x + Math.sin(i * 2.4) * 0.06, F.spout + k * 0.04, F.z + Math.cos(i * 2.4) * 0.06);
    });
    while (spoutClock >= 0.045) {
      spoutClock -= 0.045;
      const b = spoutQueue.shift();
      if (b) {
        b.state = 'lane';
        b.p.y = F.spout - 0.1;
      }
    }

    robot.t += dt;
    const binTop = new THREE.Vector2(BIN.x, BIN.y + BIN.size + 0.35);
    if (robot.state === 'idle') {
      robot.grip.lerp(ROBOT_REST, Math.min(1, dt * 5));
      const next = quarantine.shift();
      if (next) {
        robot.bit = next;
        robot.state = 'reach';
        robot.t = 0;
        robot.from.copy(robot.grip);
      }
    } else if (robot.state === 'reach' && robot.bit) {
      const t = Math.min(1, robot.t / 0.13);
      robot.grip
        .copy(robot.from)
        .lerp(new THREE.Vector2(robot.bit.p.x + 0.06, robot.bit.p.y + 0.05), ease(t));
      if (t >= 1) {
        robot.bit.state = 'grabbed';
        robot.state = 'carry';
        robot.t = 0;
        robot.from.copy(robot.grip);
      }
    } else if (robot.state === 'carry' && robot.bit) {
      const t = Math.min(1, robot.t / 0.16);
      robot.grip.copy(robot.from).lerp(binTop, ease(t));
      if (t >= 1) {
        const b = robot.bit;
        b.state = 'bin';
        b.p.set(BIN.x + rand(-0.3, 0.3), b.p.y, rand(-0.3, 0.3));
        b.v.set(0, 0, 0);
        binBits.push(b);
        if (binBits.length > 45) {
          const old = binBits.shift()!;
          old.state = 'idle';
          old.scale = 0;
        }
        robot.bit = null;
        robot.state = 'idle';
        rejected++;
        binLabel.textContent = `Rejected ${rejected}`;
        hooks.onReject(b.src);
      }
    }
    poseArm();
    scanGlow = Math.max(0, scanGlow - dt * 3);
    eye.emissiveIntensity = 0.3 + scanGlow * 1.6;

    for (const silo of silos) {
      silo.level += (silo.goal - silo.level) * Math.min(1, dt * 4);
      silo.fill.scale.y = Math.max(0.001, silo.level * (silo.h - 0.3));
      silo.fill.position.y = 0.2 + silo.fill.scale.y / 2;
      silo.pulse = Math.max(0, silo.pulse - dt * 3);
      silo.fillMat.emissiveIntensity = (silo.unlocked ? 0.7 : 0.2) + silo.pulse * 0.5;
      (silo.cap.material as THREE.MeshStandardMaterial).emissiveIntensity = silo.unlocked
        ? 1.2 + Math.sin(now * 2 + silo.x) * 0.3
        : 0;
    }
  }

  function poseArm() {
    const d = Math.min(robot.grip.distanceTo(SHOULDER), ARM * 2 - 0.01);
    const base = Math.atan2(robot.grip.y - SHOULDER.y, robot.grip.x - SHOULDER.x);
    const bend = Math.acos(d / (2 * ARM));
    const elbow = new THREE.Vector2(
      SHOULDER.x + ARM * Math.cos(base - bend),
      SHOULDER.y + ARM * Math.sin(base - bend),
    );
    const hand = new THREE.Vector2(SHOULDER.x + d * Math.cos(base), SHOULDER.y + d * Math.sin(base));
    const place = (m: THREE.Mesh, a: THREE.Vector2, b: THREE.Vector2) => {
      m.position.set((a.x + b.x) / 2, (a.y + b.y) / 2, 0.05);
      m.rotation.z = Math.atan2(b.y - a.y, b.x - a.x);
    };
    place(upperArm, SHOULDER, elbow);
    place(foreArm, elbow, hand);
    elbowJoint.position.set(elbow.x, elbow.y, 0.05);
    gripper.position.set(hand.x, hand.y, 0.05);
    gripper.rotation.z = Math.atan2(hand.y - elbow.y, hand.x - elbow.x);
  }
  poseArm();

  // ---- drawing -------------------------------------------------------------------------------------------
  const dummy = new THREE.Object3D();
  const color = new THREE.Color();
  const SEA_BIT = new THREE.Color('#bfeaf1');
  const GOOD = new THREE.Color('#22a55b');
  const BAD = new THREE.Color('#ff5a5f');
  const WHITE = new THREE.Color('#ffffff');
  function writeBits() {
    for (const b of bits) {
      dummy.position.copy(b.p);
      dummy.rotation.copy(b.rot);
      dummy.scale.setScalar(b.state === 'idle' ? 0 : b.scale);
      dummy.updateMatrix();
      const im = instanced[b.kind];
      im.setMatrixAt(b.index, dummy.matrix);
      if (b.tagged) color.copy(b.good ? GOOD : BAD);
      else if (b.state === 'sea' || b.state === 'spill') color.copy(SEA_BIT);
      else if (b.state === 'rain' || b.state === 'tray') color.copy(sourceColor[b.src]!).lerp(WHITE, 0.45);
      else color.copy(WHITE);
      im.setColorAt(b.index, color);
    }
    for (const im of instanced) {
      im.instanceMatrix.needsUpdate = true;
      if (im.instanceColor) im.instanceColor.needsUpdate = true;
    }
  }
  function writeSea() {
    for (let i = 0; i < seaPos.count; i++) seaPos.setY(i, wave(seaPos.getX(i), seaPos.getZ(i), now));
    seaPos.needsUpdate = true;
    seaGeo.computeVertexNormals();
  }

  const near = 70;
  const cloudLabels = stations.map((s) => {
    const source = SOURCES[s.i]!;
    const el = kit.label(
      `${source.letter} · ${source.name}`,
      () => tmp.set(s.pad.x, CLOUD_Y + 1.75, s.pad.z),
      {
        cls: 'is-source',
        far: near,
      },
    );
    el.style.color = source.color;
    return el;
  });
  let shownCountdown = -1;
  kit.label('Funnel · tags good / bad', () => tmp.set(F.x + 0.4, F.top + 1.0, 0), { far: near });
  kit.label('QA robot', () => tmp.set(SHOULDER.x + 0.9, SHOULDER.y + 1.0, 0), { far: near });
  const binLabel = kit.label('Rejected 0', () => tmp.set(BIN.x, DECK.y + 0.1, 1.4), { far: near });
  kit.label('The data sea · lost rows end up here', () => tmp.set(-8, 0.3, 5.6), { far: near });
  let rejected = 0;

  function reset() {
    for (const b of bits) {
      b.state = 'idle';
      b.scale = 0;
      b.tagged = false;
    }
    seaQueue.length = 0;
    spoutQueue.length = 0;
    quarantine.length = 0;
    binBits.length = 0;
    robot.state = 'idle';
    robot.bit = null;
    rejected = 0;
    binLabel.textContent = 'Rejected 0';
    for (const s of stations) {
      for (const c of [s.bucket, s.pulley]) {
        c.bits = [];
        c.legs = [];
        c.tilt = 0;
        c.group.position.copy(c.home);
      }
      s.tray = [];
      s.pending = 0;
      s.dropClock = 0;
      s.nextDrop = BATCH_EVERY * 0.6;
      s.pulleyClock = 0;
      s.served = false;
    }
    seedSea();
  }

  return {
    step(dt) {
      now += dt;
      for (const s of stations) updateStation(s, dt);
      for (const b of bits) updateBit(b, dt);
      updateLine(dt);
    },
    beforeRender() {
      writeSea();
      writeBits();
    },
    pickables: [...stations.map((s) => s.bucket.group), ...silos.map((s) => s.group)],
    setMethod(source, method) {
      const s = stations[source]!;
      if (s.method === method) return;
      s.method = method;
      s.pulleyClock = 0;
      // Rows in a bucket that's been put away are lost.
      for (const c of [s.bucket, s.pulley]) {
        if (c === active(s) || c.legs.length) continue;
        for (const b of c.bits) lose(b, s.pad);
        c.bits = [];
      }
    },
    setPulleyEvery(source, seconds) {
      const s = stations[source]!;
      s.every = seconds;
      s.pulleyClock = Math.min(s.pulleyClock, seconds);
    },
    runBucket(source) {
      const s = stations[source]!;
      if (s.method === 'bucket' && docked(s.bucket)) startTrip(s.bucket);
    },
    status(source) {
      const s = stations[source]!;
      const c = active(s);
      return {
        method: s.method,
        docked: !!c && docked(c),
        load: c?.bits.length ?? 0,
        tray: s.tray.length,
        next: s.i === 1 ? Math.max(0, s.nextDrop) : s.method === 'pulley' ? Math.max(0, s.pulleyClock) : null,
        raining: s.pending > 0 || s.i === 2,
      };
    },
    setSilos(fills, unlocked) {
      silos.forEach((silo, i) => {
        silo.goal = THREE.MathUtils.clamp(fills[i] ?? 0, 0, 1);
        silo.unlocked = unlocked[i] ?? false;
      });
      const next = silos.findIndex((silo) => !silo.unlocked);
      targetSilo = next >= 0 ? next : Math.floor(Math.random() * silos.length);
    },
    siloAnchor: (index) => {
      const silo = silos[index]!;
      return new THREE.Vector3(silo.x, DECK.y + silo.h + 0.45, silo.z);
    },
    reset,
  };
}

function makeBeltTexture() {
  const c = document.createElement('canvas');
  c.width = 64;
  c.height = 16;
  const g = c.getContext('2d')!;
  g.fillStyle = '#ffffff';
  g.fillRect(0, 0, 64, 16);
  g.fillStyle = '#8a959d';
  g.fillRect(0, 0, 10, 16);
  const texture = new THREE.CanvasTexture(c);
  texture.wrapS = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
