import React, { useEffect, useRef } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { getPeriodicState } from '../utils/math';

export const LiquidChrome: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { theta } = getPeriodicState(frame, durationInFrames);

    // Dark studio gradient background
    const bgGrad = ctx.createRadialGradient(
      width * 0.5,
      height * 0.45,
      100,
      width * 0.5,
      height * 0.5,
      width * 0.8
    );
    bgGrad.addColorStop(0, '#1a1f2c');
    bgGrad.addColorStop(0.5, '#0c0e14');
    bgGrad.addColorStop(1, '#050608');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 4 Dynamic wave centers
    const centers = [
      {
        x: width * 0.35 + Math.cos(theta) * 220,
        y: height * 0.4 + Math.sin(theta) * 160,
        weight: 1.2,
      },
      {
        x: width * 0.65 + Math.cos(theta + Math.PI * 0.67) * 260,
        y: height * 0.55 + Math.sin(theta + Math.PI * 0.67) * 190,
        weight: 1.0,
      },
      {
        x: width * 0.5 + Math.sin(theta * 2) * 180,
        y: height * 0.3 + Math.cos(theta * 2) * 140,
        weight: 0.8,
      },
      {
        x: width * 0.2 + Math.cos(theta + Math.PI) * 150,
        y: height * 0.7 + Math.sin(theta + Math.PI) * 150,
        weight: 0.9,
      },
    ];

    // Render concentric fluid wave crests
    const ringCount = 28;
    for (let i = 0; i < ringCount; i++) {
      const ringPhase = (i / ringCount + theta / (Math.PI * 2)) % 1;
      const baseRadius = ringPhase * (width * 0.75);

      ctx.save();
      ctx.beginPath();

      const segments = 120;
      for (let s = 0; s <= segments; s++) {
        const angle = (s / segments) * Math.PI * 2;
        let r = baseRadius;

        // Apply harmonic wave displacement from centers
        for (const c of centers) {
          const dx = Math.cos(angle) * r - (c.x - width / 2);
          const dy = Math.sin(angle) * r - (c.y - height / 2);
          const dist = Math.sqrt(dx * dx + dy * dy);
          r += Math.sin(dist * 0.015 - theta * 2) * (18 * c.weight);
        }

        const px = width / 2 + Math.cos(angle) * r;
        const py = height / 2 + Math.sin(angle) * r;

        if (s === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }

      ctx.closePath();

      // Chrome metallic specular gradient stroke
      const strokeGrad = ctx.createLinearGradient(
        width * 0.2,
        height * 0.2,
        width * 0.8,
        height * 0.8
      );
      const alpha = Math.sin(ringPhase * Math.PI) * 0.85;
      strokeGrad.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
      strokeGrad.addColorStop(0.3, `rgba(180, 205, 230, ${alpha * 0.8})`);
      strokeGrad.addColorStop(0.5, `rgba(50, 70, 95, ${alpha * 0.4})`);
      strokeGrad.addColorStop(0.7, `rgba(220, 235, 255, ${alpha * 0.9})`);
      strokeGrad.addColorStop(1, `rgba(10, 20, 30, ${alpha * 0.2})`);

      ctx.strokeStyle = strokeGrad;
      ctx.lineWidth = 14 + Math.sin(ringPhase * Math.PI * 2 + theta) * 8;
      ctx.shadowColor = 'rgba(160, 210, 255, 0.45)';
      ctx.shadowBlur = 35;
      ctx.stroke();
      ctx.restore();
    }

    // Specular highlight gleam across the fluid crest
    const gleamX = width * 0.5 + Math.cos(theta) * 350;
    const gleamY = height * 0.45 + Math.sin(theta) * 200;
    const gleam = ctx.createRadialGradient(gleamX, gleamY, 10, gleamX, gleamY, 400);
    gleam.addColorStop(0, 'rgba(255, 255, 255, 0.55)');
    gleam.addColorStop(0.4, 'rgba(180, 220, 255, 0.15)');
    gleam.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gleam;
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
