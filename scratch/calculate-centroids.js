import fs from 'fs';

const content = fs.readFileSync('src/data/vietnamMapSvgData.ts', 'utf8');
const dataMatch = content.match(/VIETNAM_PROVINCE_PATHS: VietnamProvincePath\[\] = (\[[\s\S]+?\]);/);
if (!dataMatch) {
  console.error('Could not match array');
  process.exit(1);
}

const list = JSON.parse(dataMatch[1]);

// Simple bbox calculation for each path
list.forEach(p => {
  const matches = p.d.match(/-?\d+(\.\d+)?/g);
  if (matches) {
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    // We know the first point is M x y
    const m = p.d.match(/^M\s*([\d\.-]+)\s+([\d\.-]+)/);
    if (m) {
      let curX = parseFloat(m[1]);
      let curY = parseFloat(m[2]);
      minX = Math.min(minX, curX);
      maxX = Math.max(maxX, curX);
      minY = Math.min(minY, curY);
      maxY = Math.max(maxY, curY);
    }
  }
});
console.log('Sample parsed:', list[0].name);
