import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { CATALOG } from '../src/config/catalog';

const args = process.argv.slice(2);
const outDir = path.resolve(__dirname, '../out');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function renderComposition(id: string, codec: string = 'h264', crf: number = 12) {
  const asset = CATALOG.find(a => a.id === id);
  if (!asset) {
    console.error(`❌ Unknown composition ID: "${id}"`);
    console.log(`Available IDs: ${CATALOG.map(a => a.id).join(', ')}`);
    process.exit(1);
  }

  const ext = codec === 'prores' ? 'mov' : 'mp4';
  const outputFile = path.join(outDir, `${id}_4k60fps_loop.${ext}`);

  console.log(`\n====================================================`);
  console.log(`🎬 Rendering: ${asset.name} (${id})`);
  console.log(`📐 Resolution: 3840x2160 @ 60fps (600 frames, 10s loop)`);
  console.log(`📦 Codec: ${codec} (CRF ${crf})`);
  console.log(`💾 Output: ${outputFile}`);
  console.log(`====================================================\n`);

  const cmd = `npx remotion render src/index.ts ${id} "${outputFile}" --codec=${codec} --crf=${crf} --gl=angle`;

  try {
    execSync(cmd, { stdio: 'inherit' });
    console.log(`✅ Completed rendering: ${outputFile}\n`);
  } catch (err) {
    console.error(`❌ Failed to render ${id}:`, err);
    process.exit(1);
  }
}

function main() {
  const isAll = args.includes('--all');
  const idIndex = args.indexOf('--id');
  const targetId = idIndex !== -1 ? args[idIndex + 1] : null;

  if (isAll) {
    console.log(`🚀 Starting batch render for all ${CATALOG.length} compositions...`);
    for (const asset of CATALOG) {
      renderComposition(asset.id);
    }
  } else if (targetId) {
    renderComposition(targetId);
  } else {
    console.log(`Usage:`);
    console.log(`  npm run render:all`);
    console.log(`  npm run render:single -- --id <composition-id>`);
    console.log(`\nAvailable IDs:`);
    for (const asset of CATALOG) {
      console.log(`  - ${asset.id} : ${asset.name}`);
    }
  }
}

main();
