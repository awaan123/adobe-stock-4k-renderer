import React, { useEffect, useRef, useMemo } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { getPeriodicState } from '../utils/math';

interface BokehParticle {
  baseX: number;
  baseY: number;
  baseZ: number; // 0 to 1 depth
  radius: number;
  phaseOffset: number;
  orbitRadius: number;
  goldTone: number; // Hue shift 35 to 50
}

export const ChampagneBokeh: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Deterministic seed particle generation
  const particles = useMemo(() => {
    const list: BokehParticle[] = [];
    const count = 180;
    let seed = 12345;
    const random = () => {
      seed = (seed * 16807 + 11) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    for (let i = 0; i < count; i++) {
      list.push({
        baseX: (random() - 0.5) * width * 1.2,
        baseY: (random() - 0.5) * height * 1.2,
        baseZ: random(),
        radius: 12 + random() * 45,
        phaseOffset: random() * Math.PI * 2,
        orbitRadius: 20 + random() * 70,
        goldTone: 38 + random() * 12, // 38: warm gold, 50: bright champagne
      });
    }
    return list;
  }, [width, height]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { theta } = getPeriodicState(frame, durationInFrames);

    // Deep warm cinematic vignette
    const bg = ctx.createRadialGradient(
      width * 0.5,
      height * 0.5,
      100,
      width * 0.5,
      height * 0.5,
      width * 0.85
    );
    bg.addColorStop(0, '#100c05');
    bg.addColorStop(0.6, '#060402');
    bg.addColorStop(1, '#010101');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);

    // Focal plane setup (focal plane around z = 0.5)
    const focalZ = 0.48 + Math.sin(theta) * 0.08;

    // Sort particles by depth for correct compositing
    const sorted = [...particles].sort((a, b) => a.baseZ - b.baseZ);

    for (const p of sorted) {
      // Harmonic periodic 3D orbital motion
      const currentAngle = theta + p.phaseOffset;
      const x =
        width * 0.5 +
        p.baseX +
        Math.cos(currentAngle) * p.orbitRadius +
        Math.sin(theta * 2 + p.phaseOffset) * 25;
      const y =
        height * 0.5 +
        p.baseY +
        Math.sin(currentAngle) * p.orbitRadius * 0.7 -
        Math.cos(theta + p.phaseOffset) * 35;

      // Circle of confusion based on distance to focal plane
      const defocus = Math.abs(p.baseZ - focalZ);
      const blurRadius = p.radius * (1 + defocus * 2.8);
      const alpha = Math.max(0.12, Math.min(0.85, (1 - defocus * 1.2) * 0.85));

      // Draw bokeh disc
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, blurRadius, 0, Math.PI * 2);

      const bokehGrad = ctx.createRadialGradient(x, y, 0, x, y, blurRadius);
      bokehGrad.addColorStop(0, `hsla(${p.goldTone}, 100%, 92%, ${alpha * 0.95})`);
      bokehGrad.addColorStop(0.6, `hsla(${p.goldTone}, 90%, 65%, ${alpha * 0.7})`);
      bokehGrad.addColorStop(0.85, `hsla(${p.goldTone - 8}, 85%, 45%, ${alpha * 0.4})`);
      bokehGrad.addColorStop(1, `hsla(${p.goldTone - 12}, 70%, 30%, 0)`);

      ctx.fillStyle = bokehGrad;
      ctx.fill();

      // Sharp specular ring rim on foreground particles
      if (defocus < 0.25) {
        ctx.strokeStyle = `hsla(${p.goldTone + 5}, 100%, 88%, ${alpha * 0.6})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      ctx.restore();
    }

    // Horizontal anamorphic lens flare beam
    const flareY = height * 0.5 + Math.sin(theta) * 80;
    const flare = ctx.createLinearGradient(0, flareY, width, flareY);
    flare.addColorStop(0, 'rgba(255, 215, 0, 0)');
    flare.addColorStop(0.3, 'rgba(255, 225, 120, 0.08)');
    flare.addColorStop(0.5, 'rgba(255, 250, 200, 0.25)');
    flare.addColorStop(0.7, 'rgba(255, 225, 120, 0.08)');
    flare.addColorStop(1, 'rgba(255, 215, 0, 0)');

    ctx.fillStyle = flare;
    ctx.fillRect(0, flareY - 15, width, 30);

  }, [frame, width, height, durationInFrames, particles]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
};
