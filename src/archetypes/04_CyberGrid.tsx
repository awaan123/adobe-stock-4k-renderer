import React, { useEffect, useRef } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { getPeriodicState, Vec3, projectPerspective, rotateX } from '../utils/math';

export const CyberGrid: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { theta } = getPeriodicState(frame, durationInFrames);

    // Deep synthwave neon night sky
    const sky = ctx.createLinearGradient(0, 0, 0, height * 0.6);
    sky.addColorStop(0, '#04020a');
    sky.addColorStop(0.5, '#130426');
    sky.addColorStop(0.9, '#3a095a');
    sky.addColorStop(1, '#ff007f');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height * 0.6);

    // Ground darkness
    ctx.fillStyle = '#06010f';
    ctx.fillRect(0, height * 0.6, width, height * 0.4);

    // Glowing Synthwave Sun / Horizon Orb
    const sunY = height * 0.52;
    const sunGrad = ctx.createRadialGradient(
      width * 0.5,
      sunY,
      20,
      width * 0.5,
      sunY,
      height * 0.35
    );
    sunGrad.addColorStop(0, 'rgba(255, 230, 100, 0.95)');
    sunGrad.addColorStop(0.3, 'rgba(255, 0, 128, 0.85)');
    sunGrad.addColorStop(0.7, 'rgba(120, 0, 255, 0.4)');
    sunGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(width * 0.5, sunY, height * 0.32, 0, Math.PI * 2);
    ctx.fill();

    // Laser Horizon line
    ctx.save();
    ctx.strokeStyle = '#ff33aa';
    ctx.lineWidth = 4;
    ctx.shadowColor = '#ff007f';
    ctx.shadowBlur = 30;
    ctx.beginPath();
    ctx.moveTo(0, height * 0.58);
    ctx.lineTo(width, height * 0.58);
    ctx.stroke();
    ctx.restore();

    // 3D Grid Parameters
    const gridCols = 36;
    const gridRows = 30;
    const spacingX = (width * 2.8) / gridCols;
    const spacingZ = 90;

    // Longitudinal speed offset looping seamlessly
    const speedOffset = (theta / (Math.PI * 2)) * spacingZ;

    // Render longitudinal lines (running into the horizon)
    for (let c = 0; c <= gridCols; c++) {
      const normC = c / gridCols;
      const x = (normC - 0.5) * (width * 2.8);

      ctx.beginPath();
      let first = true;

      for (let r = 0; r <= gridRows; r++) {
        const rawZ = r * spacingZ - speedOffset;
        const z = rawZ > 0 ? rawZ : rawZ + gridRows * spacingZ;

        // Undulating terrain elevation wave
        const waveY =
          Math.sin((x / width) * 4 + theta) * 75 +
          Math.cos((z / 800) * Math.PI * 2 - theta * 2) * 55;

        let v: Vec3 = { x, y: 320 + waveY, z: z - 200 };
        v = rotateX(v, -0.05);

        const p = projectPerspective(v, width, height, 850, 400);

        if (p.depth > 50 && p.y > height * 0.57) {
          if (first) {
            ctx.moveTo(p.x, p.y);
            first = false;
          } else {
            ctx.lineTo(p.x, p.y);
          }
        }
      }

      ctx.strokeStyle = `rgba(0, 240, 255, ${0.4 + Math.sin(normC * Math.PI) * 0.4})`;
      ctx.lineWidth = 2.5;
      ctx.stroke();
    }

    // Render latitudinal lines (crossing horizontally)
    for (let r = 1; r <= gridRows; r++) {
      const rawZ = r * spacingZ - speedOffset;
      const z = rawZ > 0 ? rawZ : rawZ + gridRows * spacingZ;
      const normZ = r / gridRows;

      ctx.beginPath();
      let first = true;

      for (let c = 0; c <= gridCols; c++) {
        const x = (c / gridCols - 0.5) * (width * 2.8);
        const waveY =
          Math.sin((x / width) * 4 + theta) * 75 +
          Math.cos((z / 800) * Math.PI * 2 - theta * 2) * 55;

        let v: Vec3 = { x, y: 320 + waveY, z: z - 200 };
        v = rotateX(v, -0.05);

        const p = projectPerspective(v, width, height, 850, 400);

        if (p.depth > 50 && p.y > height * 0.57) {
          if (first) {
            ctx.moveTo(p.x, p.y);
            first = false;
          } else {
            ctx.lineTo(p.x, p.y);
          }
        }
      }

      const alpha = Math.min(1, Math.pow(normZ, 1.2) * 0.85);
      ctx.strokeStyle = `rgba(255, 0, 180, ${alpha})`;
      ctx.lineWidth = 2.5 * normZ + 0.5;
      ctx.stroke();
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
