import fs from 'fs';

const content = fs.readFileSync('src/assets/vietnam-map.svg', 'utf8');
const regex = /<path\s+d="([^"]+)"\s+id="([^"]+)"\s+name="([^"]+)"/g;
let m;
const provinces = [];

const northIds = [
  'VN01', 'VN02', 'VN03', 'VN04', 'VN05', 'VN06', 'VN07', 'VN09', 'VN13', 'VN14', 
  'VN18', 'VN20', 'VN53', 'VN54', 'VN56', 'VN61', 'VN63', 'VN66', 'VN67', 'VN68', 
  'VN69', 'VN70', 'VN71', 'VNHN', 'VNHP'
];

const centralIds = [
  'VN21', 'VN22', 'VN23', 'VN24', 'VN25', 'VN26', 'VN27', 'VN28', 'VN29', 'VN30', 
  'VN31', 'VN32', 'VN33', 'VN34', 'VN35', 'VN36', 'VN40', 'VN72', 'VNDN'
];

// Region lookup
function getRegion(id, name) {
  if (northIds.includes(id)) return 'north';
  if (centralIds.includes(id)) return 'central';
  return 'south';
}

// Clean name
function cleanName(raw) {
  if (raw === 'Hồ Chí Minh city') return 'TP. Hồ Chí Minh';
  if (raw === 'Ha Noi') return 'Hà Nội';
  if (raw === 'Ha Tinh') return 'Hà Tĩnh';
  if (raw === 'Hau Giang') return 'Hậu Giang';
  if (raw === 'Can Tho') return 'Cần Thơ';
  if (raw === 'Hai Phong') return 'Hải Phòng';
  if (raw === 'Lai Chau') return 'Lai Châu';
  if (raw === 'Son La') return 'Sơn La';
  if (raw === 'Ðong Tháp') return 'Đồng Tháp';
  if (raw === 'Quàng Nam') return 'Quảng Nam';
  if (raw === 'Thừa Thiên - Huế') return 'Thừa Thiên Huế';
  if (raw === 'Đông Nam Bộ') return 'Đồng Nai';
  if (raw === 'Đông Bắc') return 'Bắc Kạn';
  if (raw === 'Đồng Bằng Sông Hồng') return 'Hưng Yên';
  return raw;
}

while ((m = regex.exec(content)) !== null) {
  const rawD = m[1];
  const id = m[2];
  const rawName = m[3];
  const name = cleanName(rawName);
  const region = getRegion(id, name);

  provinces.push({
    id,
    name,
    region,
    d: rawD
  });
}

console.log('Processed', provinces.length, 'provinces.');

const output = `export interface VietnamProvincePath {
  id: string;
  name: string;
  region: 'north' | 'central' | 'south';
  d: string;
}

export const VIETNAM_PROVINCE_PATHS: VietnamProvincePath[] = ${JSON.stringify(provinces, null, 2)};
`;

fs.writeFileSync('src/data/vietnamMapSvgData.ts', output, 'utf8');
console.log('Written successfully to src/data/vietnamMapSvgData.ts');
