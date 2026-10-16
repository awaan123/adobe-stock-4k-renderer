import React, { useEffect, useRef } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { getPeriodicState } from '../utils/math';

export const Bioluminescent: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { theta } = getPeriodicState(frame, durationInFrames);

    // Deep abyssal ocean gradient
    const ocean = ctx.createLinearGradient(0, 0, 0, height);
    ocean.addColorStop(0, '#02090f');
    ocean.addColorStop(0.5, '#010508');
    ocean.addColorStop(1, '#000204');
    ctx.fillStyle = ocean;
    ctx.fillRect(0, 0, width, height);

    // 14 Rising bioluminescent tendrils
    const tendrilCount = 14;
    for (let i = 0; i < tendrilCount; i++) {
      const normI = i / tendrilCount;
      const baseX = width * 0.15 + normI * (width * 0.7);

      ctx.save();
      ctx.beginPath();

      const segments = 60;
      let prevX = baseX;
      let prevY = height + 50;
      ctx.moveTo(prevX, prevY);

      for (let s = 1; s <= segments; s++) {
        const normS = s / segments;
        const y = height + 50 - normS * (height + 150);

        // Fluid curl sway
        const sway =
          Math.sin(normS * 4 + theta + normI * Math.PI * 2) * (140 * normS) +
          Math.cos(normS * 8 - theta * 2 + normI * 3) * (60 * normS);

        const x = baseX + sway;
        ctx.lineTo(x, y);
      }

      // Luminescent cyan to emerald gradient stroke
      const hue = 165 + Math.sin(normI * Math.PI + theta) * 35; // 130 (emerald) to 200 (cyan)
      ctx.strokeStyle = `hsla(${hue}, 100%, 65%, ${0.35 + Math.sin(normI * Math.PI) * 0.45})`;
      ctx.lineWidth = 18 * (1 - normI * 0.3);
      ctx.lineCap = 'round';
      ctx.shadowColor = `hsla(${hue}, 100%, 60%, 0.8)`;
      ctx.shadowBlur = 40;
      ctx.stroke();

      // Sharp inner bright core
      ctx.strokeStyle = `hsla(${hue}, 100%, 92%, 0.8)`;
      ctx.lineWidth = 3.5;
      ctx.shadowBlur = 15;
      ctx.stroke();

      ctx.restore();
    }

    // Floating glowing photophore motes
    const moteCount = 55;
    for (let m = 0; m < moteCount; m++) {
      const normM = m / moteCount;
      const phase = (normM * Math.PI * 2 + theta) % (Math.PI * 2);
      const mx = width * 0.2 + normM * (width * 0.6) + Math.cos(phase * 2) * 80;
      const my = height * 0.9 - ((normM * height + (theta / (Math.PI * 2)) * height) % height);
      const mSize = 3 + Math.sin(phase) * 2;

      ctx.save();
      ctx.beginPath();
      ctx.arc(mx, my, mSize, 0, Math.PI * 2);
      ctx.fillStyle = '#66ffcc';
      ctx.shadowColor = '#00ffaa';
      ctx.shadowBlur = 20;
      ctx.fill();
      ctx.restore();
    }
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
