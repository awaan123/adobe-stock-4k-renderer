import React, { useEffect, useRef, useMemo } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { getPeriodicState } from '../utils/math';

interface Star {
  x: number;
  y: number;
  size: number;
  spikes: boolean;
  brightness: number;
  color: string;
}

export const CosmicNebula: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const stars = useMemo(() => {
    const list: Star[] = [];
    let seed = 99887;
    const random = () => {
      seed = (seed * 16807 + 11) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    const colors = ['#ffffff', '#b3d9ff', '#ffd1dc', '#ffffcc', '#99e6ff'];
    for (let i = 0; i < 220; i++) {
      list.push({
        x: random() * width,
        y: random() * height,
        size: 1 + random() * 3.5,
        spikes: random() > 0.88,
        brightness: 0.4 + random() * 0.6,
        color: colors[Math.floor(random() * colors.length)],
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

    // Deep cosmic space void
    ctx.fillStyle = '#020108';
    ctx.fillRect(0, 0, width, height);

    // Draw multi-layer volumetric nebula gas clouds
    const gasCenters = [
      {
        x: width * 0.45 + Math.cos(theta) * 140,
        y: height * 0.5 + Math.sin(theta) * 90,
        r: width * 0.45,
        color1: 'rgba(160, 32, 240, 0.28)',
        color2: 'rgba(75, 0, 130, 0.08)',
      },
      {
        x: width * 0.6 + Math.cos(theta + 2) * 160,
        y: height * 0.4 + Math.sin(theta + 2) * 120,
        r: width * 0.4,
        color1: 'rgba(0, 200, 255, 0.22)',
        color2: 'rgba(0, 50, 150, 0.05)',
      },
      {
        x: width * 0.35 + Math.sin(theta * 2) * 110,
        y: height * 0.65 + Math.cos(theta * 2) * 80,
        r: width * 0.35,
        color1: 'rgba(255, 50, 140, 0.24)',
        color2: 'rgba(120, 10, 60, 0.06)',
      },
      {
        x: width * 0.55 + Math.cos(theta + 4) * 130,
        y: height * 0.58 + Math.sin(theta + 4) * 100,
        r: width * 0.3,
        color1: 'rgba(255, 180, 50, 0.18)',
        color2: 'rgba(180, 80, 0, 0.04)',
      },
    ];

    for (const g of gasCenters) {
      const grad = ctx.createRadialGradient(g.x, g.y, 20, g.x, g.y, g.r);
      grad.addColorStop(0, g.color1);
      grad.addColorStop(0.5, g.color2);
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    }

    // Render stars and diffraction spikes
    for (const s of stars) {
      const twinkle = s.brightness * (0.75 + Math.sin(theta * 3 + s.x * 0.02) * 0.25);

      ctx.save();
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = s.color;
      ctx.globalAlpha = twinkle;
      ctx.shadowColor = s.color;
      ctx.shadowBlur = 10;
      ctx.fill();

      // Anamorphic 4-point diffraction spike on prominent stars
      if (s.spikes) {
        ctx.strokeStyle = s.color;
        ctx.lineWidth = 1.2;
        ctx.globalAlpha = twinkle * 0.7;
        const spikeLen = s.size * 18;

        // Horizontal ray
        ctx.beginPath();
        ctx.moveTo(s.x - spikeLen, s.y);
        ctx.lineTo(s.x + spikeLen, s.y);
        ctx.stroke();

        // Vertical ray
        ctx.beginPath();
        ctx.moveTo(s.x, s.y - spikeLen);
        ctx.lineTo(s.x, s.y + spikeLen);
        ctx.stroke();
      }

      ctx.restore();
    }
  }, [frame, width, height, durationInFrames, stars]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
};
