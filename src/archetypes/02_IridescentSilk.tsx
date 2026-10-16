import React, { useEffect, useRef } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { getPeriodicState } from '../utils/math';

export const IridescentSilk: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { theta } = getPeriodicState(frame, durationInFrames);

    // Deep luxury dark background
    ctx.fillStyle = '#06040a';
    ctx.fillRect(0, 0, width, height);

    // Render 16 flowing parametric ribbon waves
    const ribbonCount = 16;
    for (let i = 0; i < ribbonCount; i++) {
      const ribbonPhase = (i / ribbonCount) * Math.PI * 2;
      const progress = i / ribbonCount;

      ctx.save();
      ctx.beginPath();

      const points = 80;
      const startX = -100;
      const endX = width + 100;
      const stepX = (endX - startX) / points;

      for (let p = 0; p <= points; p++) {
        const x = startX + p * stepX;
        const normX = p / points;

        // Multi-frequency harmonic wave formulation
        const yOffset =
          Math.sin(normX * Math.PI * 2.5 + theta + ribbonPhase) * 220 +
          Math.cos(normX * Math.PI * 4 - theta * 2 + ribbonPhase * 0.5) * 110 +
          Math.sin(theta + ribbonPhase) * 80;

        const baseY = height * 0.35 + progress * (height * 0.45);
        const y = baseY + yOffset;

        if (p === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      // Close ribbon path downwards
      ctx.lineTo(width + 100, height + 100);
      ctx.lineTo(-100, height + 100);
      ctx.closePath();

      // Iridescent chromatic dispersion gradient
      const grad = ctx.createLinearGradient(0, height * 0.2, width, height * 0.9);
      const hue1 = ((progress * 180 + (theta / (Math.PI * 2)) * 360) % 360);
      const hue2 = (hue1 + 80) % 360;
      const hue3 = (hue2 + 60) % 360;

      grad.addColorStop(0, `hsla(${hue1}, 85%, 60%, 0.45)`);
      grad.addColorStop(0.5, `hsla(${hue2}, 90%, 55%, 0.35)`);
      grad.addColorStop(1, `hsla(${hue3}, 80%, 45%, 0.15)`);

      ctx.fillStyle = grad;
      ctx.fill();

      // Sharp luminous rim stroke
      ctx.strokeStyle = `hsla(${hue2}, 100%, 75%, 0.75)`;
      ctx.lineWidth = 3.5;
      ctx.shadowColor = `hsla(${hue1}, 95%, 65%, 0.8)`;
      ctx.shadowBlur = 25;
      ctx.stroke();

      ctx.restore();
    }

    // Atmospheric optical glow overlay
    const glow = ctx.createRadialGradient(
      width * 0.5 + Math.cos(theta) * 200,
      height * 0.5 + Math.sin(theta) * 150,
      100,
      width * 0.5,
      height * 0.5,
      width * 0.7
    );
    glow.addColorStop(0, 'rgba(255, 100, 200, 0.12)');
    glow.addColorStop(0.5, 'rgba(0, 180, 255, 0.08)');
    glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);

  }, [frame, width, height, durationInFrames]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
};
