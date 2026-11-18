/**
 * Shared building blocks for the data sea: the night palette, materials, mesh helpers and canvas textures.
 */
import * as THREE from 'three';

export const COLORS = {
  night: '#041b2f',
  ground: '#0e2c45',
  cliff: '#08192a',
  path: '#16405f',
  teal: '#3ec1d3',
  amber: '#f5a524',
  white: '#ffffff',
  soft: '#b9c8d2',
  muted: '#7f97a8',
  panel: '#0d2a40',
  ink: '#061626',
};

export interface LabelOptions {
  cls?: string;
  /** Hide the label when the camera is further than this from its anchor. */
  far?: number;
}

export interface Kit {
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  /** Phone-sized canvas: fewer bits, smaller details. */
  small: boolean;
  mats: {
    structure: THREE.MeshStandardMaterial;
    glass: THREE.MeshStandardMaterial;
    dark: THREE.MeshStandardMaterial;
    teal: THREE.MeshStandardMaterial;
    amber: THREE.MeshStandardMaterial;
    white: THREE.MeshStandardMaterial;
  };
  mesh(
    geometry: THREE.BufferGeometry,
    material: THREE.Material | THREE.Material[],
    x?: number,
    y?: number,
    z?: number,
    parent?: THREE.Object3D,
  ): THREE.Mesh;
  /** A box stretched between two points, for posts, braces, arms and belts. */
  beam(
    a: THREE.Vector3,
    b: THREE.Vector3,
    thickness: number,
    depth: number,
    material: THREE.Material,
    parent?: THREE.Object3D,
  ): THREE.Mesh;
  label(text: string, at: () => THREE.Vector3, options?: LabelOptions): HTMLElement;
  /** CSS font shorthand in the site's display face. */
  font(size: number, weight?: number): string;
}

export function createKit(
  scene: THREE.Scene,
  renderer: THREE.WebGLRenderer,
  small: boolean,
  label: Kit['label'],
): Kit {
  const family =
    getComputedStyle(document.documentElement).getPropertyValue('--font-raleway').trim() || 'sans-serif';
  const mats = {
    structure: new THREE.MeshStandardMaterial({ color: '#cdd7de', roughness: 0.45, metalness: 0.3 }),
    glass: new THREE.MeshStandardMaterial({
      color: '#ffffff',
      transparent: true,
      opacity: 0.18,
      roughness: 0.15,
      side: THREE.DoubleSide,
      depthWrite: false,
    }),
    dark: new THREE.MeshStandardMaterial({ color: '#0a1622', roughness: 0.5, metalness: 0.4 }),
    teal: new THREE.MeshStandardMaterial({ color: COLORS.teal, roughness: 0.4 }),
    amber: new THREE.MeshStandardMaterial({ color: COLORS.amber, roughness: 0.45 }),
    white: new THREE.MeshStandardMaterial({ color: '#e9f1f5', roughness: 0.6 }),
  };
  const xAxis = new THREE.Vector3(1, 0, 0);

  const kit: Kit = {
    scene,
    renderer,
    small,
    mats,
    mesh(geometry, material, x = 0, y = 0, z = 0, parent = scene) {
      const m = new THREE.Mesh(geometry, material);
      m.position.set(x, y, z);
      parent.add(m);
      return m;
    },
    beam(a, b, thickness, depth, material, parent = scene) {
      const length = a.distanceTo(b);
      const m = kit.mesh(new THREE.BoxGeometry(length, thickness, depth), material, 0, 0, 0, parent);
      m.position.copy(a).add(b).multiplyScalar(0.5);
      m.quaternion.setFromUnitVectors(xAxis, b.clone().sub(a).normalize());
      return m;
    },
    label,
    font: (size, weight = 700) => `${weight} ${size}px ${family}`,
  };
  return kit;
}

/** A canvas drawn once and used as a texture. Scene units stay in proportion with `width` × `height`. */
export function canvasTexture(
  kit: Kit,
  width: number,
  height: number,
  draw: (g: CanvasRenderingContext2D, w: number, h: number) => void,
) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const g = canvas.getContext('2d')!;
  draw(g, width, height);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = kit.renderer.capabilities.getMaxAnisotropy();
  return texture;
}
