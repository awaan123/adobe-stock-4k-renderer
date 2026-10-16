import React, { useEffect, useRef } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { getPeriodicState, Vec3, projectPerspective, rotateX, rotateY } from '../utils/math';

export const ObsidianFacets: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { theta } = getPeriodicState(frame, durationInFrames);

    // Dark luxury obsidian gradient background
    const bg = ctx.createRadialGradient(
      width * 0.5,
      height * 0.5,
      200,
      width * 0.5,
      height * 0.5,
      width * 0.85
    );
    bg.addColorStop(0, '#101216');
    bg.addColorStop(0.6, '#08090b');
    bg.addColorStop(1, '#020304');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);

    // 3D Grid Parameters
    const cols = 22;
    const rows = 14;
    const spacingX = (width * 1.3) / cols;
    const spacingY = (height * 1.3) / rows;
    const startX = -((cols * spacingX) / 2);
    const startY = -((rows * spacingY) / 2);

    // Light source vector orbiting in 3D
    const light: Vec3 = {
      x: Math.cos(theta) * 0.8,
      y: Math.sin(theta * 2) * 0.5 - 0.3,
      z: 0.9,
    };
    const lightLen = Math.sqrt(light.x * light.x + light.y * light.y + light.z * light.z);
    const lx = light.x / lightLen;
    const ly = light.y / lightLen;
    const lz = light.z / lightLen;

    // Build vertices with harmonic displacement
    const grid: Vec3[][] = [];
    for (let r = 0; r <= rows; r++) {
      grid[r] = [];
      for (let c = 0; c <= cols; c++) {
        const x = startX + c * spacingX;
        const y = startY + r * spacingY;
        const distFromCenter = Math.sqrt(x * x + y * y);

        // Harmonic displacement
        const z =
          Math.sin(distFromCenter * 0.003 - theta) * 160 +
          Math.cos((c / cols) * Math.PI * 4 + theta) * 70 +
          Math.sin((r / rows) * Math.PI * 3 - theta) * 60;

        let v: Vec3 = { x, y, z };
        v = rotateX(v, -0.28 + Math.sin(theta) * 0.05);
        v = rotateY(v, Math.cos(theta) * 0.08);
        grid[r][c] = v;
      }
    }

    // Render triangles
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const v00 = grid[r][c];
        const v10 = grid[r][c + 1];
        const v01 = grid[r + 1][c];
        const v11 = grid[r + 1][c + 1];

        const triangles = [
          [v00, v10, v01],
          [v10, v11, v01],
        ];

        for (const tri of triangles) {
          const [p0, p1, p2] = tri;

          // Normal vector calculation (p1 - p0) x (p2 - p0)
          const ax = p1.x - p0.x;
          const ay = p1.y - p0.y;
          const az = p1.z - p0.z;
          const bx = p2.x - p0.x;
          const by = p2.y - p0.y;
          const bz = p2.z - p0.z;

          let nx = ay * bz - az * by;
          let ny = az * bx - ax * bz;
          let nz = ax * by - ay * bx;
          const nLen = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
          nx /= nLen;
          ny /= nLen;
          nz /= nLen;

          // Lambertian diffuse dot product
          const dot = Math.max(0, nx * lx + ny * ly + nz * lz);
          // Specular power
          const spec = Math.pow(dot, 18);

          // Project to 2D screen
          const s0 = projectPerspective(p0, width, height, 1100, 1400);
          const s1 = projectPerspective(p1, width, height, 1100, 1400);
          const s2 = projectPerspective(p2, width, height, 1100, 1400);

          ctx.beginPath();
          ctx.moveTo(s0.x, s0.y);
          ctx.lineTo(s1.x, s1.y);
          ctx.lineTo(s2.x, s2.y);
          ctx.closePath();

          // Obsidian body with gold illumination highlights
          const baseShade = 14 + dot * 26;
          const goldR = Math.min(255, Math.floor(baseShade + spec * 220 + dot * 45));
          const goldG = Math.min(255, Math.floor(baseShade + spec * 180 + dot * 32));
          const goldB = Math.min(255, Math.floor(baseShade + spec * 40 + dot * 10));

          ctx.fillStyle = `rgb(${goldR}, ${goldG}, ${goldB})`;
          ctx.fill();

          // Gold wireframe bevel edge
          ctx.strokeStyle = `rgba(212, 175, 55, ${0.15 + spec * 0.65})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }
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
