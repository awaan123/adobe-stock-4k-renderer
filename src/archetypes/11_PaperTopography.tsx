import React, { useEffect, useRef } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { getPeriodicState } from '../utils/math';

export const PaperTopography: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { theta } = getPeriodicState(frame, durationInFrames);

    // Warm architectural off-white background
    ctx.fillStyle = '#f5f3ef';
    ctx.fillRect(0, 0, width, height);

    const strataCount = 14;
    for (let i = 0; i < strataCount; i++) {
      const normI = i / strataCount;
      const strataPhase = normI * Math.PI * 2;

      ctx.save();

      // Architectural cast drop shadow
      ctx.shadowColor = 'rgba(25, 30, 45, 0.16)';
      ctx.shadowBlur = 30;
      ctx.shadowOffsetX = 12;
      ctx.shadowOffsetY = 18;

      ctx.beginPath();
      const points = 70;
      const stepX = (width + 200) / points;
      const baseY = height * 0.15 + normI * (height * 0.7);

      for (let p = 0; p <= points; p++) {
        const x = -100 + p * stepX;
        const normP = p / points;

        // Harmonic topographic contour elevation
        const elevation =
          Math.sin(normP * Math.PI * 2.5 + theta + strataPhase) * 110 +
          Math.cos(normP * Math.PI * 4 - theta * 2 + normI * 2) * 50;

        const y = baseY + elevation;
        if (p === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.lineTo(width + 100, height + 100);
      ctx.lineTo(-100, height + 100);
      ctx.closePath();

      // Gradual subtle tone shift per stratum
      const lightness = 98 - normI * 12; // 98% down to 86%
      ctx.fillStyle = `hsl(40, 15%, ${lightness}%)`;
      ctx.fill();

      // Subtle edge line
      ctx.strokeStyle = `rgba(180, 170, 155, 0.4)`;
      ctx.lineWidth = 1.2;
      ctx.stroke();

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
