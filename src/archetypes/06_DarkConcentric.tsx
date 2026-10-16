import React, { useEffect, useRef } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { getPeriodicState } from '../utils/math';

export const DarkConcentric: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { theta } = getPeriodicState(frame, durationInFrames);

    // Deep matte black liquid background
    ctx.fillStyle = '#05070a';
    ctx.fillRect(0, 0, width, height);

    // Dynamic ripple epicenter
    const centerX = width * 0.5 + Math.cos(theta) * 120;
    const centerY = height * 0.5 + Math.sin(theta) * 80;

    const maxRadius = Math.sqrt(width * width + height * height) * 0.65;
    const rippleCount = 32;

    for (let i = 0; i < rippleCount; i++) {
      // Periodic phase propagation
      const phase = (i / rippleCount + theta / (Math.PI * 2)) % 1;
      const radius = phase * maxRadius;

      // Amplitude decays towards the boundary
      const amplitude = Math.sin(phase * Math.PI) * (1 - phase * 0.6);

      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);

      // Specular directional gradient reflecting an overhead softbox light
      const grad = ctx.createLinearGradient(
        centerX - radius * 0.7,
        centerY - radius * 0.7,
        centerX + radius * 0.7,
        centerY + radius * 0.7
      );

      const alphaHighlight = amplitude * 0.55;
      const alphaShadow = amplitude * 0.15;

      grad.addColorStop(0, `rgba(255, 255, 255, ${alphaHighlight})`);
      grad.addColorStop(0.3, `rgba(180, 205, 235, ${alphaHighlight * 0.7})`);
      grad.addColorStop(0.6, `rgba(15, 25, 40, ${alphaShadow})`);
      grad.addColorStop(1, `rgba(2, 5, 10, ${alphaShadow * 0.5})`);

      ctx.strokeStyle = grad;
      ctx.lineWidth = 4 + amplitude * 12;
      ctx.stroke();

      ctx.restore();
    }

    // Soft liquid center specular sheen
    const centerGleam = ctx.createRadialGradient(
      centerX,
      centerY,
      5,
      centerX,
      centerY,
      250
    );
    centerGleam.addColorStop(0, 'rgba(210, 235, 255, 0.35)');
    centerGleam.addColorStop(0.4, 'rgba(80, 120, 180, 0.12)');
    centerGleam.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = centerGleam;
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
