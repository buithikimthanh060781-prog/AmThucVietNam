import fs from 'fs';

const content = fs.readFileSync('src/assets/vietnam-map.svg', 'utf8');
const regex = /<path\s+d="([^"]+)"\s+id="([^"]+)"\s+name="([^"]+)"/g;
let m;
const list = [];
while ((m = regex.exec(content)) !== null) {
  list.push({ d: m[1], id: m[2], name: m[3] });
}

// Extract all numbers from all path d attributes
let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
list.forEach(item => {
  const nums = item.d.match(/-?\d+(\.\d+)?/g);
  if (nums) {
    // Usually M x y followed by relative or absolute coordinates
    // Let's check initial points
    const firstM = item.d.match(/M\s*([\d\.]+)\s+([\d\.]+)/);
    if (firstM) {
      const x = parseFloat(firstM[1]);
      const y = parseFloat(firstM[2]);
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
});

console.log('Approximate bounds of M points: X:', minX, 'to', maxX, ', Y:', minY, 'to', maxY);
console.log('All 63 province names:');
console.log(list.map(p => ({ id: p.id, name: p.name })));
