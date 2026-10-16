/**
 * Commercial-grade color palettes, gradients, and optical dispersion models
 */

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export function hslToRgb(h: number, s: number, l: number): RGB {
  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

export function rgbToString(rgb: RGB, alpha: number = 1): string {
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}

/**
 * Snell's law chromatic dispersion simulator: splits a ray into Red, Green, Blue wavelengths
 */
export function getSpectralColor(phase: number, offset: number = 0): string {
  // Wavelength shifts from Red (700nm) -> Green (530nm) -> Violet (400nm)
  const h = (phase + offset) % 1;
  const rgb = hslToRgb(h, 0.9, 0.55);
  return rgbToString(rgb);
}

/**
 * Commercial Luxury Palettes
 */
export const PALETTES = {
  liquidChrome: {
    base: '#0f1115',
    highlight: '#ffffff',
    mid: '#8a99ad',
    dark: '#1b222d',
    cyanTint: 'rgba(0, 210, 255, 0.15)',
  },
  iridescentSilk: {
    violet: '#7b2cbf',
    magenta: '#f72585',
    cyan: '#4cc9f0',
    deepNavy: '#03071e',
    amber: '#ffb703',
  },
  obsidianGold: {
    obsidianDeep: '#08080a',
    obsidianFacet: '#18191f',
    goldHighlight: '#ffd700',
    goldAccent: '#c59b27',
    goldSpecular: '#fff8db',
  },
  cyberGrid: {
    deepSpace: '#05020c',
    neonCyan: '#00f0ff',
    neonPink: '#ff007f',
    gridLines: '#0df',
    horizonGlow: '#7000ff',
  },
  champagneGold: {
    background: '#040405',
    bokehCore: '#ffffff',
    goldSpark: '#f5c542',
    warmAmber: '#d48817',
    deepRose: '#6e3c1b',
  },
  paperTopography: {
    bg: '#f8f7f4',
    strataLight: '#ffffff',
    strataMid: '#eae6df',
    strataDark: '#dcd6cb',
    shadow: 'rgba(20, 25, 35, 0.18)',
  },
};
