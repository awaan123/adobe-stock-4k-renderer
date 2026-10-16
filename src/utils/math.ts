/**
 * Precision Harmonic Mathematics Engine for Guaranteed 100% Seamless Periodic Loops
 * Every parameter is tied to 2 * PI * (frame / totalFrames).
 */

export interface PeriodicState {
  t: number;          // Normalized 0 to 1
  theta: number;      // 0 to 2*PI radians
  sin1: number;       // Fundamental sin(theta)
  cos1: number;       // Fundamental cos(theta)
  sin2: number;       // 2nd Harmonic sin(2*theta)
  cos2: number;       // 2nd Harmonic cos(2*theta)
  sin3: number;       // 3rd Harmonic sin(3*theta)
  cos3: number;       // 3rd Harmonic cos(3*theta)
}

export function getPeriodicState(frame: number, totalFrames: number = 600): PeriodicState {
  const t = (frame % totalFrames) / totalFrames;
  const theta = t * Math.PI * 2;
  return {
    t,
    theta,
    sin1: Math.sin(theta),
    cos1: Math.cos(theta),
    sin2: Math.sin(theta * 2),
    cos2: Math.cos(theta * 2),
    sin3: Math.sin(theta * 3),
    cos3: Math.cos(theta * 3),
  };
}

/**
 * Procedural Perlin-like 2D value noise with cubic Hermite interpolation
 */
export class ProceduralNoise {
  private perm: number[] = [];

  constructor(seed: number = 42) {
    const p: number[] = [];
    for (let i = 0; i < 256; i++) p[i] = i;
    let s = seed;
    for (let i = 255; i > 0; i--) {
      s = (s * 16807 + 11) % 2147483647;
      const j = s % (i + 1);
      const tmp = p[i];
      p[i] = p[j];
      p[j] = tmp;
    }
    this.perm = p.concat(p);
  }

  private fade(t: number): number {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  private lerp(t: number, a: number, b: number): number {
    return a + t * (b - a);
  }

  private grad(hash: number, x: number, y: number): number {
    const h = hash & 7;
    const u = h < 4 ? x : y;
    const v = h < 4 ? y : x;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  }

  public noise2D(x: number, y: number): number {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);
    const u = this.fade(xf);
    const v = this.fade(yf);

    const aa = this.perm[this.perm[X] + Y];
    const ab = this.perm[this.perm[X] + Y + 1];
    const ba = this.perm[this.perm[X + 1] + Y];
    const bb = this.perm[this.perm[X + 1] + Y + 1];

    const x1 = this.lerp(u, this.grad(aa, xf, yf), this.grad(ba, xf - 1, yf));
    const x2 = this.lerp(u, this.grad(ab, xf, yf - 1), this.grad(bb, xf - 1, yf - 1));
    return (this.lerp(v, x1, x2) + 1) * 0.5; // Normalized to 0..1
  }

  /**
   * Seamless periodic 2D noise sampled on a 4D torus path
   */
  public periodicNoise(x: number, y: number, theta: number, radius: number = 0.8): number {
    const timeX = Math.cos(theta) * radius;
    const timeY = Math.sin(theta) * radius;
    return this.noise2D(x + timeX, y + timeY);
  }
}

/**
 * 3D Vector & Matrix operations for CPU-rendered 3D projections
 */
export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export function rotateX(v: Vec3, angle: number): Vec3 {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: v.x,
    y: v.y * cos - v.z * sin,
    z: v.y * sin + v.z * cos,
  };
}

export function rotateY(v: Vec3, angle: number): Vec3 {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: v.x * cos + v.z * sin,
    y: v.y,
    z: -v.x * sin + v.z * cos,
  };
}

export function rotateZ(v: Vec3, angle: number): Vec3 {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: v.x * cos - v.y * sin,
    y: v.x * sin + v.y * cos,
    z: v.z,
  };
}

export function projectPerspective(
  v: Vec3,
  width: number,
  height: number,
  fov: number = 900,
  cameraDistance: number = 1200
): { x: number; y: number; depth: number; scale: number } {
  const z = v.z + cameraDistance;
  if (z <= 10) {
    return { x: width / 2, y: height / 2, depth: z, scale: 0 };
  }
  const scale = fov / z;
  return {
    x: width / 2 + v.x * scale,
    y: height / 2 + v.y * scale,
    depth: z,
    scale,
  };
}
