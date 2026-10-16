import { CATALOG } from '../src/config/catalog';

const FORBIDDEN_WORDS = [
  'person', 'human', 'face', 'woman', 'man', 'girl', 'boy', 'animal', 'dog', 'cat',
  'bitcoin', 'crypto', 'forex', 'dollar', 'euro', 'currency', 'stock market', 'trading',
  'music', 'sound', 'audio', 'beat', 'dj', 'song', 'equalizer',
  'logo', 'brand', 'trademark'
];

function validate() {
  console.log('🔍 Starting Adobe Stock Commercial Compliance Audit...\n');
  let errors = 0;
  let warnings = 0;

  for (const asset of CATALOG) {
    console.log(`Checking Asset: [${asset.id}] - "${asset.name}"`);

    // Rule 1: Title <= 70 chars
    if (asset.title.length > 70) {
      console.error(`  ❌ ERROR: Title exceeds 70 chars (${asset.title.length}): "${asset.title}"`);
      errors++;
    } else {
      console.log(`  ✓ Title length OK (${asset.title.length}/70 chars)`);
    }

    // Rule 2 & 3: Exactly 49 unique tags
    const normalizedTags = asset.tags.map(t => t.trim().toLowerCase());
    const uniqueSet = new Set(normalizedTags);

    if (uniqueSet.size !== 49) {
      console.error(`  ❌ ERROR: Expected exactly 49 unique tags, found ${uniqueSet.size}`);
      errors++;
    } else {
      console.log(`  ✓ Exactly 49 unique SEO tags verified`);
    }

    if (uniqueSet.size !== asset.tags.length) {
      console.error(`  ❌ ERROR: Duplicate tags detected! Total: ${asset.tags.length}, Unique: ${uniqueSet.size}`);
      errors++;
    }

    // Rule 4: Forbidden words check using word boundaries
    const contentString = `${asset.title} ${asset.tags.join(' ')} ${asset.description}`.toLowerCase();
    for (const forbidden of FORBIDDEN_WORDS) {
      const regex = new RegExp(`\\b${forbidden}\\b`, 'i');
      if (regex.test(contentString)) {
        console.error(`  ❌ ERROR: Policy violation! Forbidden term detected: "${forbidden}"`);
        errors++;
      }
    }

    // Rule 5: 4K 60fps 600 frames
    if (asset.width !== 3840 || asset.height !== 2160 || asset.fps !== 60 || asset.durationInFrames !== 600) {
      console.error(`  ❌ ERROR: Non-standard video dimensions/timing! Must be 3840x2160 @ 60fps (600 frames)`);
      errors++;
    } else {
      console.log(`  ✓ 4K UHD 60fps Broadcast Standards Confirmed`);
    }

    console.log('');
  }

  console.log('====================================================');
  if (errors === 0) {
    console.log('🎉 100% POLICY & SEO COMPLIANCE VERIFIED');
    console.log(`   Audited ${CATALOG.length} Commercial Stock Assets. Zero Violations.`);
  } else {
    console.error(`❌ AUDIT FAILED with ${errors} error(s). Please fix before deployment.`);
    process.exit(1);
  }
  console.log('====================================================');
}

validate();
