export interface MotionGraphicAsset {
  id: string;
  name: string;
  title: string;          // Strictly <= 70 characters
  durationInFrames: number; // 600 frames = 10s @ 60fps
  fps: number;
  width: number;
  height: number;
  categoryId: number;     // 3: Backgrounds / Textures, 18: Technology
  categoryName: string;
  tags: string[];         // Exactly 49 non-duplicated, high-converting SEO tags
  description: string;
}

export const CATALOG: MotionGraphicAsset[] = [
  {
    id: "liquid-chrome",
    name: "Liquid Chrome & Mercury Ripples",
    title: "Liquid Chrome Abstract Metallic Fluid Surface Waves 4K Loop",
    durationInFrames: 600,
    fps: 60,
    width: 3840,
    height: 2160,
    categoryId: 3,
    categoryName: "Backgrounds",
    tags: [
      "liquid", "chrome", "metal", "metallic", "fluid", "abstract", "surface", "wave",
      "waves", "ripple", "ripples", "molten", "silver", "mercury", "seamless", "loop",
      "4k", "background", "motion", "animation", "flow", "flowing", "shiny", "glossy",
      "modern", "minimal", "elegant", "luxury", "smooth", "reflection", "reflective",
      "futuristic", "cgi", "3d", "texture", "render", "viscous", "fluidity", "pure",
      "monochrome", "cool", "curved", "dynamic", "subtle", "premium", "screensaver",
      "backdrop", "corporate", "intro"
    ],
    description: "Viscous liquid mercury wave simulation with dynamic surface tension reflections and specular highlights."
  },
  {
    id: "iridescent-silk",
    name: "Fluid Iridescent Silk Waves",
    title: "Iridescent Silk Gradient Wave Abstract Flowing Curves 4K Loop",
    durationInFrames: 600,
    fps: 60,
    width: 3840,
    height: 2160,
    categoryId: 3,
    categoryName: "Backgrounds",
    tags: [
      "gradient", "iridescent", "silk", "wave", "waves", "ribbon", "ribbons", "abstract",
      "color", "colorful", "spectrum", "holographic", "fluid", "flow", "flowing", "smooth",
      "soft", "magenta", "orange", "blue", "violet", "neon", "vibrant", "bright",
      "modern", "curve", "curves", "minimal", "dynamic", "loop", "seamless", "4k",
      "background", "backdrop", "motion", "animation", "digital", "creative", "elegant",
      "trendy", "contemporary", "mesh", "prism", "prismatic", "luxury", "design",
      "aesthetic", "artistic", "screensaver"
    ],
    description: "Volumetric Bézier parametric ribbon layers with continuous Snell-law chromatic dispersion."
  },
  {
    id: "obsidian-gold",
    name: "3D Obsidian & Gold Low-Poly Facets",
    title: "3D Obsidian and Gold Geometric Low Poly Facets 4K Loop",
    durationInFrames: 600,
    fps: 60,
    width: 3840,
    height: 2160,
    categoryId: 3,
    categoryName: "Backgrounds",
    tags: [
      "geometric", "geometry", "facets", "faceted", "low poly", "polygon", "polygonal", "obsidian",
      "gold", "black", "luxury", "abstract", "3d", "render", "cgi", "crystallite",
      "crystal", "monolith", "futuristic", "architecture", "minimal", "dark", "matte", "metallic",
      "specular", "bevel", "structure", "pattern", "surface", "triangles", "mesh", "modern",
      "corporate", "premium", "elegant", "seamless", "loop", "4k", "background", "backdrop",
      "motion", "animation", "tech", "technology", "sharp", "clean", "depth", "business",
      "presentation"
    ],
    description: "Monolithic tessellated crystalline structure with directional Lambertian lighting and specular bevels."
  },
  {
    id: "cyber-grid",
    name: "Retro Cyber Perspective Grids",
    title: "Cyberpunk Perspective Neon Grid Horizon Undulating 4K Loop",
    durationInFrames: 600,
    fps: 60,
    width: 3840,
    height: 2160,
    categoryId: 18,
    categoryName: "Technology",
    tags: [
      "grid", "cyberpunk", "neon", "retro", "synthwave", "horizon", "perspective", "wireframe",
      "terrain", "landscape", "undulating", "cyan", "magenta", "purple", "glowing", "lines",
      "laser", "light", "futuristic", "scifi", "digital", "virtual", "matrix", "electronic",
      "arcade", "80s", "abstract", "3d", "tunnel", "speed", "velocity", "motion",
      "animation", "seamless", "loop", "4k", "background", "backdrop", "tech", "technology",
      "gaming", "stream", "screensaver", "infinite", "road", "synth", "glow", "dynamic",
      "vibrant"
    ],
    description: "Infinite perspective cybernetic grid with undulating dual harmonic sine displacement and radiant laser horizon."
  },
  {
    id: "champagne-bokeh",
    name: "Volumetric Champagne Golden Bokeh",
    title: "Golden Champagne Bokeh Volumetric Floating Particles 4K Loop",
    durationInFrames: 600,
    fps: 60,
    width: 3840,
    height: 2160,
    categoryId: 3,
    categoryName: "Backgrounds",
    tags: [
      "gold", "golden", "particles", "bokeh", "champagne", "dust", "sparkle", "glitter",
      "shining", "stars", "luxury", "awards", "celebration", "event", "gala", "elegant",
      "rich", "wealth", "floating", "depth of field", "blur", "defocused", "glow", "glowing",
      "magic", "magical", "ambient", "festive", "holiday", "christmas", "new year", "wedding",
      "motion", "animation", "seamless", "loop", "4k", "background", "backdrop", "cinematic",
      "glamour", "bright", "light", "anamorphic", "warm", "yellow", "shiny", "intro",
      "screensaver"
    ],
    description: "Depth-scaled volumetric golden particles with realistic optical circles of confusion and chromatic fringe."
  },
  {
    id: "dark-concentric",
    name: "Viscous Dark Concentric Ripples",
    title: "Dark Concentric Fluid Ripples Minimal Black Wave 4K Loop",
    durationInFrames: 600,
    fps: 60,
    width: 3840,
    height: 2160,
    categoryId: 3,
    categoryName: "Backgrounds",
    tags: [
      "ripples", "concentric", "circles", "fluid", "liquid", "water", "dark", "black",
      "minimal", "minimalist", "clean", "zen", "calm", "soothing", "resonance", "wave",
      "waves", "surface", "drop", "impact", "frequency", "oscillation", "pure", "elegant",
      "luxury", "glossy", "reflection", "subtle", "abstract", "3d", "render", "monochrome",
      "modern", "corporate", "business", "presentation", "seamless", "loop", "4k", "background",
      "backdrop", "motion", "animation", "hypnotic", "meditation", "depth", "contour", "smooth",
      "steady"
    ],
    description: "Hyper-minimalist concentric liquid wave interference rings with specular glossy highlights."
  },
  {
    id: "cosmic-nebula",
    name: "Deep Space Cosmic Nebulae",
    title: "Deep Space Cosmic Nebula Volumetric Gas Clouds Stars 4K Loop",
    durationInFrames: 600,
    fps: 60,
    width: 3840,
    height: 2160,
    categoryId: 3,
    categoryName: "Backgrounds",
    tags: [
      "space", "galaxy", "nebula", "cosmic", "universe", "astronomy", "deep space", "interstellar",
      "stars", "stardust", "gas", "clouds", "volumetric", "dust", "celestial", "astrophysics",
      "science", "exploration", "scifi", "dark", "purple", "violet", "magenta", "cyan",
      "glowing", "light", "spikes", "infinite", "mystery", "outer space", "cosmos", "abstract",
      "3d", "motion", "animation", "seamless", "loop", "4k", "background", "backdrop",
      "cinematic", "epic", "journey", "flight", "ethereal", "atmosphere", "screensaver", "dreamy",
      "constellation"
    ],
    description: "Procedural volumetric interstellar dust clouds with dual stellar lighting and 4-point optical diffraction spikes."
  },
  {
    id: "bioluminescent",
    name: "Bioluminescent Deep Sea Plumes",
    title: "Bioluminescent Aurora Tendrils Ethereal Glowing Plumes 4K Loop",
    durationInFrames: 600,
    fps: 60,
    width: 3840,
    height: 2160,
    categoryId: 3,
    categoryName: "Backgrounds",
    tags: [
      "bioluminescent", "aurora", "plumes", "tendrils", "smoke", "mist", "fog", "vapor",
      "ethereal", "glowing", "radiant", "luminescence", "flow", "flowing", "abstract", "fluid",
      "wisps", "curling", "mystical", "celestial", "marine", "deep sea", "underwater", "cyan",
      "emerald", "green", "blue", "dark", "energy", "magic", "particle", "subtle",
      "organic", "motion", "animation", "seamless", "loop", "4k", "background", "backdrop",
      "cinematic", "atmosphere", "moody", "screensaver", "dream", "dreamy", "soft", "ambient",
      "smooth"
    ],
    description: "Organic bioluminescent tendrils drifting in harmonic fluid curl noise with sub-surface radiance."
  },
  {
    id: "quantum-waveguide",
    name: "Coherent Quantum Waveguides",
    title: "Quantum Data Waveguide Glowing Abstract Fiber Network 4K Loop",
    durationInFrames: 600,
    fps: 60,
    width: 3840,
    height: 2160,
    categoryId: 18,
    categoryName: "Technology",
    tags: [
      "quantum", "data", "network", "fiber", "optical", "technology", "tech", "waveguide",
      "stream", "transmission", "signals", "digital", "communication", "internet", "cyber", "information",
      "energy", "lines", "glowing", "blue", "cyan", "purple", "abstract", "motion",
      "animation", "seamless", "loop", "4k", "background", "backdrop", "futuristic", "speed",
      "connectivity", "telecom", "broadband", "infrastructure", "flow", "lattice", "curved", "mesh",
      "dynamic", "corporate", "business", "presentation", "it", "computing", "hi tech", "innovation",
      "cloud"
    ],
    description: "Parametric optical energy waveguides carrying coherent light pulses in multi-frequency harmonic channels."
  },
  {
    id: "sacred-geometry",
    name: "Kinetic Sacred Geometry Mandalas",
    title: "Kinetic Sacred Geometry Counter Rotating Rings Portal 4K Loop",
    durationInFrames: 600,
    fps: 60,
    width: 3840,
    height: 2160,
    categoryId: 3,
    categoryName: "Backgrounds",
    tags: [
      "sacred geometry", "mandala", "kinetic", "torus", "rings", "portal", "geometric", "concentric",
      "counter rotating", "rotational", "meditation", "zen", "spiritual", "metatron", "hypnotic", "harmony",
      "balance", "symmetry", "symmetrical", "golden ratio", "gold", "brass", "metallic", "line art",
      "minimal", "clean", "abstract", "3d", "motion", "animation", "seamless", "loop",
      "4k", "background", "backdrop", "intricate", "complex", "mathematics", "astronomy", "ancient",
      "futuristic", "dimension", "intro", "screensaver", "calm", "focus", "mindfulness", "sacred", "circle"
    ],
    description: "Counter-rotating golden geometric portal with concentric ratio gears and harmonic Metatron lattices."
  },
  {
    id: "paper-topography",
    name: "Minimalist Architectural Topography",
    title: "Minimalist Architectural Paper Strata Topography 4K Loop",
    durationInFrames: 600,
    fps: 60,
    width: 3840,
    height: 2160,
    categoryId: 3,
    categoryName: "Backgrounds",
    tags: [
      "topography", "strata", "paper", "layers", "papercut", "architectural", "architecture", "minimal",
      "minimalist", "contour", "elevation", "lines", "white", "clean", "pure", "warm",
      "beige", "neutral", "shadow", "cast shadow", "depth", "sculptural", "organic", "landscape",
      "relief", "stepped", "terrace", "modern", "interior", "design", "abstract", "3d",
      "render", "cgi", "smooth", "gentle", "soothing", "corporate", "business", "presentation",
      "editorial", "seamless", "loop", "4k", "background", "backdrop", "motion", "animation",
      "calm"
    ],
    description: "15 stepped architectural paper strata layers with soft directional cast shadows in harmonic undulating elevation."
  }
];
