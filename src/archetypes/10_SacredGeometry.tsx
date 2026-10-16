import React, { useEffect, useRef } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { getPeriodicState } from '../utils/math';

export const SacredGeometry: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { theta } = getPeriodicState(frame, durationInFrames);

    // Deep dark zen backdrop
    const bg = ctx.createRadialGradient(
      width * 0.5,
      height * 0.5,
      100,
      width * 0.5,
      height * 0.5,
      width * 0.7
    );
    bg.addColorStop(0, '#0c0a06');
    bg.addColorStop(0.6, '#060503');
    bg.addColorStop(1, '#020201');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);

    const cx = width * 0.5;
    const cy = height * 0.5;

    // Concentric rotating rings with integer harmonic gear ratios
    const rings = [
      { radius: 180, ratio: 1, sides: 6, gold: 'rgba(255, 215, 0, 0.75)' },
      { radius: 280, ratio: -1, sides: 12, gold: 'rgba(235, 190, 70, 0.65)' },
      { radius: 400, ratio: 2, sides: 8, gold: 'rgba(255, 225, 100, 0.8)' },
      { radius: 540, ratio: -2, sides: 16, gold: 'rgba(212, 175, 55, 0.6)' },
      { radius: 680, ratio: 3, sides: 24, gold: 'rgba(255, 210, 80, 0.5)' },
      { radius: 840, ratio: -1, sides: 0, gold: 'rgba(255, 235, 150, 0.45)' }, // circular
    ];

    for (const r of rings) {
      const angle = theta * r.ratio;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);

      ctx.strokeStyle = r.gold;
      ctx.lineWidth = 2.2;
      ctx.shadowColor = 'rgba(212, 175, 55, 0.5)';
      ctx.shadowBlur = 12;

      if (r.sides === 0) {
        // Smooth circle
        ctx.beginPath();
        ctx.arc(0, 0, r.radius, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        // Regular polygon
        ctx.beginPath();
        for (let s = 0; s < r.sides; s++) {
          const polyAngle = (s / r.sides) * Math.PI * 2;
          const px = Math.cos(polyAngle) * r.radius;
          const py = Math.sin(polyAngle) * r.radius;
          if (s === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();

        // Connect vertices to center or diagonals
        if (r.sides <= 8) {
          ctx.beginPath();
          for (let s = 0; s < r.sides; s++) {
            const polyAngle = (s / r.sides) * Math.PI * 2;
            ctx.moveTo(0, 0);
            ctx.lineTo(Math.cos(polyAngle) * r.radius, Math.sin(polyAngle) * r.radius);
          }
          ctx.strokeStyle = 'rgba(212, 175, 55, 0.2)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      ctx.restore();
    }

    // Central pulsing seed of life core
    const corePulse = 18 + Math.sin(theta * 2) * 4;
    const coreGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, 50);
    coreGrad.addColorStop(0, '#ffffff');
    coreGrad.addColorStop(0.4, 'rgba(255, 215, 0, 0.8)');
    coreGrad.addColorStop(1, 'rgba(212, 175, 55, 0)');
    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, corePulse * 2, 0, Math.PI * 2);
    ctx.fill();

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
