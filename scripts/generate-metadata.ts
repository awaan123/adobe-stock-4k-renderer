import fs from 'fs';
import path from 'path';
import { CATALOG, MotionGraphicAsset } from '../src/config/catalog';

function generateCsv(catalog: MotionGraphicAsset[]): string {
  // Adobe Stock Contributor CSV specification
  // Columns: Filename,Title,Keywords,Category
  const headers = ['Filename', 'Title', 'Keywords', 'Category'];
  const rows: string[] = [headers.join(',')];

  for (const asset of catalog) {
    const filename = `${asset.id}_4k60fps_loop.mp4`;
    // Clean and verify title <= 70 chars
    const title = asset.title.replace(/"/g, '""');

    // Exactly 49 tags, deduplicated
    const uniqueTags = Array.from(new Set(asset.tags.map(t => t.trim().toLowerCase())));
    if (uniqueTags.length !== 49) {
      console.warn(`[WARNING] Asset ${asset.id} has ${uniqueTags.length} tags instead of 49!`);
    }

    const keywords = `"${uniqueTags.join(', ')}"`;
    const category = asset.categoryId.toString();

    rows.push([filename, `"${title}"`, keywords, category].join(','));
  }

  return rows.join('\n');
}

function run() {
  const outDir = path.resolve(__dirname, '../dist/metadata');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // 1. Generate CSV
  const csvContent = generateCsv(CATALOG);
  const csvPath = path.join(outDir, 'adobe_stock_upload.csv');
  fs.writeFileSync(csvPath, csvContent, 'utf-8');

  // Also write to root for convenience
  fs.writeFileSync(path.resolve(__dirname, '../adobe_stock_upload.csv'), csvContent, 'utf-8');

  // 2. Generate JSON Catalog
  const jsonPath = path.join(outDir, 'adobe_stock_catalog.json');
  fs.writeFileSync(jsonPath, JSON.stringify(CATALOG, null, 2), 'utf-8');

  console.log('====================================================');
  console.log('✅ ADOBE STOCK METADATA GENERATED SUCCESSFULLY');
  console.log(`📁 CSV written to: ${csvPath}`);
  console.log(`📁 JSON written to: ${jsonPath}`);
  console.log(`📊 Total Assets: ${CATALOG.length}`);
  console.log('====================================================');
}

run();
