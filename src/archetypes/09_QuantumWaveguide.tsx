import React, { useEffect, useRef } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { getPeriodicState } from '../utils/math';

export const QuantumWaveguide: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { theta } = getPeriodicState(frame, durationInFrames);

    // Deep tech navy background
    const bg = ctx.createLinearGradient(0, 0, width, height);
    bg.addColorStop(0, '#030510');
    bg.addColorStop(0.5, '#070b1a');
    bg.addColorStop(1, '#020308');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);

    const strandCount = 20;
    for (let i = 0; i < strandCount; i++) {
      const normI = i / strandCount;
      const strandPhase = normI * Math.PI * 2;

      ctx.save();
      ctx.beginPath();

      const points = 70;
      const stepX = (width + 200) / points;

      for (let p = 0; p <= points; p++) {
        const x = -100 + p * stepX;
        const normP = p / points;

        // Waveguide harmonic trajectory
        const y =
          height * 0.5 +
          Math.sin(normP * Math.PI * 3 + theta + strandPhase) * (260 * Math.sin(normP * Math.PI)) +
          Math.cos(normP * Math.PI * 2 - theta * 2 + normI * 2) * 90;

        if (p === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      // Base strand guide
      ctx.strokeStyle = `rgba(0, 160, 255, ${0.15 + Math.sin(normI * Math.PI) * 0.2})`;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Periodic high-intensity quantum energy pulse traversing the strand
      const pulseProgress = ((normI * 0.5 + theta / (Math.PI * 2)) % 1);
      const pulseIndex = Math.floor(pulseProgress * points);
      const pulseNormP = pulseIndex / points;
      const pulseX = -100 + pulseIndex * stepX;
      const pulseY =
        height * 0.5 +
        Math.sin(pulseNormP * Math.PI * 3 + theta + strandPhase) *
          (260 * Math.sin(pulseNormP * Math.PI)) +
        Math.cos(pulseNormP * Math.PI * 2 - theta * 2 + normI * 2) * 90;

      // Draw glowing pulse packet
      const pulseGrad = ctx.createRadialGradient(pulseX, pulseY, 2, pulseX, pulseY, 40);
      pulseGrad.addColorStop(0, '#ffffff');
      pulseGrad.addColorStop(0.3, 'rgba(0, 240, 255, 0.9)');
      pulseGrad.addColorStop(0.7, 'rgba(120, 50, 255, 0.4)');
      pulseGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = pulseGrad;
      ctx.beginPath();
      ctx.arc(pulseX, pulseY, 40, 0, Math.PI * 2);
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
