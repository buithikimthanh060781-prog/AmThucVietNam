import React, { useState } from 'react';
import { 
  MapPin, Sparkles, ArrowRight, Eye, Compass, 
  UtensilsCrossed, Layers, Image as ImageIcon, Map as MapIcon, Info 
} from 'lucide-react';
import { PROVINCES_DATA } from '../data/provincesData';
import { DISHES_DATA } from '../data/dishesData';
import { VIETNAM_PROVINCE_PATHS, VietnamProvincePath } from '../data/vietnamMapSvgData';
import { ProvinceFoodInfo, Region, Dish } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface FoodMapProps {
  onSelectDish: (dish: Dish) => void;
}

export const FoodMap: React.FC<FoodMapProps> = ({ onSelectDish }) => {
  const { language, t } = useLanguage();
  const [selectedRegion, setSelectedRegion] = useState<Region | 'all'>('all');
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);
  const [activeProvinceName, setActiveProvinceName] = useState<string>('Hà Nội');
  const [mapViewMode, setMapViewMode] = useState<'svg' | 'reference'>('svg');

  // Match active province information
  const currentProvinceInfo: ProvinceFoodInfo = 
    PROVINCES_DATA.find((p) => 
      p.name.toLowerCase() === activeProvinceName.toLowerCase() ||
      p.name.toLowerCase().includes(activeProvinceName.toLowerCase()) ||
      activeProvinceName.toLowerCase().includes(p.name.toLowerCase())
    ) || {
      id: activeProvinceName.toLowerCase(),
      name: activeProvinceName,
      nameEn: activeProvinceName,
      region: VIETNAM_PROVINCE_PATHS.find(p => p.name === activeProvinceName)?.region || 'north',
      capital: `Trung tâm ${activeProvinceName}`,
      tagline: `Nét đẹp ẩm thực truyền thống vùng đất ${activeProvinceName}`,
      taglineEn: `Traditional culinary heritage of ${activeProvinceName}`,
      description: `Khám phá các món ăn dân dã, đậm đà bản sắc địa phương của người dân ${activeProvinceName}.`,
      descriptionEn: `Discover local specialties and deep-rooted flavors of ${activeProvinceName}.`,
      specialtyDishIds: [],
      coordinates: { x: 50, y: 50 },
      highlights: ['Đặc sản truyền thống', 'Ẩm thực địa phương', 'Hương vị quê nhà']
    };

  // Get specialty dishes for active province
  let provinceDishes = DISHES_DATA.filter((d) =>
    currentProvinceInfo.specialtyDishIds.includes(d.id) ||
    d.province.toLowerCase().includes(activeProvinceName.toLowerCase()) ||
    activeProvinceName.toLowerCase().includes(d.province.toLowerCase())
  );

  // If no direct dish, fallback to region dishes so user always sees great food
  if (provinceDishes.length === 0) {
    provinceDishes = DISHES_DATA.filter((d) => d.region === currentProvinceInfo.region).slice(0, 2);
  }

  // Filter paths by region
  const filteredPaths = selectedRegion === 'all'
    ? VIETNAM_PROVINCE_PATHS
    : VIETNAM_PROVINCE_PATHS.filter((p) => p.region === selectedRegion);

  const getProvinceColor = (prov: VietnamProvincePath) => {
    const isSelected = activeProvinceName === prov.name;
    const isHovered = hoveredProvince === prov.name;

    if (isSelected) {
      if (prov.region === 'north') return '#B83227';
      if (prov.region === 'central') return '#D4A646';
      return '#315C45';
    }

    if (isHovered) {
      if (prov.region === 'north') return '#E05345';
      if (prov.region === 'central') return '#E5B95F';
      return '#437C5D';
    }

    // Default region tints
    if (prov.region === 'north') return '#FCECEB';
    if (prov.region === 'central') return '#FDF6E2';
    return '#EBF4EF';
  };

  const getProvinceStroke = (prov: VietnamProvincePath) => {
    if (activeProvinceName === prov.name) return '#39291F';
    if (hoveredProvince === prov.name) return '#B83227';
    return '#C8B29B';
  };

  return (
    <section id="map" className="py-20 bg-gradient-to-b from-[#FFF8ED] via-[#FDF5E6] to-[#FFF8ED] relative overflow-hidden">
      
      {/* Background drum decorative ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-[#D4A646]/15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#315C45]/15 text-[#315C45] text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-[#D4A646]" />
            <span>{language === 'vi' ? 'Bản Đồ Ẩm Thực Chuẩn Xác' : 'Official Culinary Map'}</span>
          </div>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-[#39291F] tracking-tight">
            {t('mapTitle')}
          </h2>
          <div className="w-24 h-1 bg-[#D4A646] mx-auto my-4 rounded-full" />
          <p className="text-base sm:text-lg text-[#39291F]/80 font-normal leading-relaxed">
            {t('mapSubtitle')}
          </p>

          {/* Map Controls: Region Filter & View Mode Toggle */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            
            {/* Region Filter Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => setSelectedRegion('all')}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer ${
                  selectedRegion === 'all'
                    ? 'bg-[#B83227] text-white shadow-md'
                    : 'bg-white text-[#39291F] hover:bg-[#D4A646]/20 border border-[#D4A646]/30'
                }`}
              >
                {language === 'vi' ? 'Tất Cả 3 Miền' : 'All 3 Regions'}
              </button>
              <button
                onClick={() => setSelectedRegion('north')}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer ${
                  selectedRegion === 'north'
                    ? 'bg-[#B83227] text-white shadow-md'
                    : 'bg-white text-[#39291F] hover:bg-[#D4A646]/20 border border-[#D4A646]/30'
                }`}
              >
                {language === 'vi' ? 'Miền Bắc' : 'Northern'}
              </button>
              <button
                onClick={() => setSelectedRegion('central')}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer ${
                  selectedRegion === 'central'
                    ? 'bg-[#D4A646] text-[#39291F] shadow-md'
                    : 'bg-white text-[#39291F] hover:bg-[#D4A646]/20 border border-[#D4A646]/30'
                }`}
              >
                {language === 'vi' ? 'Miền Trung' : 'Central'}
              </button>
              <button
                onClick={() => setSelectedRegion('south')}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer ${
                  selectedRegion === 'south'
                    ? 'bg-[#315C45] text-white shadow-md'
                    : 'bg-white text-[#39291F] hover:bg-[#D4A646]/20 border border-[#D4A646]/30'
                }`}
              >
                {language === 'vi' ? 'Miền Nam' : 'Southern'}
              </button>
            </div>

            {/* View Mode Switcher */}
            <div className="inline-flex p-1 rounded-2xl bg-white border border-[#D4A646]/40 shadow-xs">
              <button
                onClick={() => setMapViewMode('svg')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  mapViewMode === 'svg'
                    ? 'bg-[#39291F] text-white'
                    : 'text-[#39291F] hover:bg-[#D4A646]/15'
                }`}
              >
                <MapIcon className="w-3.5 h-3.5 text-[#D4A646]" />
                <span>63 Tỉnh Thành (Vector)</span>
              </button>
              <button
                onClick={() => setMapViewMode('reference')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  mapViewMode === 'reference'
                    ? 'bg-[#39291F] text-white'
                    : 'text-[#39291F] hover:bg-[#D4A646]/15'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5 text-[#D4A646]" />
                <span>Bản Đồ Địa Lý Thực Tế</span>
              </button>
            </div>

          </div>
        </div>

        {/* Map Container & Details Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: MAP CANVAS (Interactive 63-province SVG or Reference Graphic) */}
          <div className="lg:col-span-6 bg-white/95 backdrop-blur-md rounded-3xl p-4 sm:p-6 border-2 border-[#D4A646]/40 shadow-xl flex flex-col items-center relative overflow-hidden">
            
            {/* Top map toolbar */}
            <div className="w-full flex items-center justify-between pb-3 border-b border-[#D4A646]/20 mb-3 text-xs font-semibold text-[#315C45]">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#D4A646]" />
                {mapViewMode === 'svg'
                  ? (hoveredProvince ? `Đang xem: ${hoveredProvince}` : 'Bấm trực tiếp vào tỉnh thành trên bản đồ')
                  : 'Bản đồ Địa lý & Hành chính Việt Nam'}
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#B83227]/10 text-[#B83227]">
                Đang chọn: {activeProvinceName}
              </span>
            </div>

            {/* MAP VIEW: 1. INTERACTIVE VECTOR MAP */}
            {mapViewMode === 'svg' ? (
              <div className="relative w-full h-[620px] flex items-center justify-center overflow-hidden">
                <svg
                  viewBox="240 60 520 860"
                  className="w-full h-full filter drop-shadow-md select-none transition-all"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <filter id="map-glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#B83227" floodOpacity="0.35" />
                    </filter>
                  </defs>

                  {/* Ocean Background Tint */}
                  <rect x="200" y="50" width="600" height="900" fill="#F4F8FA" rx="20" />

                  {/* Ocean Labels */}
                  <g className="text-[#315C45] select-none pointer-events-none opacity-60">
                    <text x="540" y="240" fontSize="13" fontWeight="bold" fill="#315C45" letterSpacing="2">
                      VỊNH BẮC BỘ
                    </text>
                    <text x="560" y="520" fontSize="15" fontWeight="bold" fill="#315C45" letterSpacing="4">
                      BIỂN ĐÔNG
                    </text>
                    <text x="560" y="540" fontSize="10" fill="#39291F">
                      (South China Sea)
                    </text>
                    <text x="260" y="850" fontSize="12" fontWeight="bold" fill="#315C45">
                      VỊNH THÁI LAN
                    </text>
                  </g>

                  {/* Sacred Archipelagos (Official Vietnamese Territory) */}
                  {/* HOANG SA ARCHIPELAGO */}
                  <g 
                    className="cursor-pointer group/island transition-all"
                    onClick={() => setActiveProvinceName('Đà Nẵng')}
                  >
                    <rect x="620" y="320" width="130" height="90" rx="8" fill="#FFF8ED" stroke="#D4A646" strokeWidth="1" strokeDasharray="3 3" opacity="0.85" />
                    <circle cx="650" cy="350" r="4" fill="#B83227" />
                    <circle cx="665" cy="345" r="3" fill="#D4A646" />
                    <circle cx="680" cy="360" r="3.5" fill="#B83227" />
                    <circle cx="695" cy="370" r="3" fill="#D4A646" />
                    <circle cx="710" cy="355" r="4" fill="#B83227" />
                    <text x="630" y="390" fontSize="11" fontWeight="bold" fill="#B83227">Q.Đ HOÀNG SA</text>
                    <text x="630" y="402" fontSize="9" fontWeight="600" fill="#39291F">(TP. Đà Nẵng, VN)</text>
                  </g>

                  {/* TRUONG SA ARCHIPELAGO */}
                  <g 
                    className="cursor-pointer group/island transition-all"
                    onClick={() => setActiveProvinceName('Khánh Hòa')}
                  >
                    <rect x="580" y="650" width="140" height="100" rx="8" fill="#FFF8ED" stroke="#D4A646" strokeWidth="1" strokeDasharray="3 3" opacity="0.85" />
                    <circle cx="610" cy="680" r="4" fill="#B83227" />
                    <circle cx="630" cy="675" r="3.5" fill="#D4A646" />
                    <circle cx="650" cy="700" r="4" fill="#315C45" />
                    <circle cx="670" cy="690" r="3" fill="#B83227" />
                    <circle cx="690" cy="715" r="4" fill="#D4A646" />
                    <text x="590" y="730" fontSize="11" fontWeight="bold" fill="#B83227">Q.Đ TRƯỜNG SA</text>
                    <text x="590" y="742" fontSize="9" fontWeight="600" fill="#39291F">(Tỉnh Khánh Hòa, VN)</text>
                  </g>

                  {/* PHU QUOC ISLAND */}
                  <g 
                    className="cursor-pointer transition-all"
                    onClick={() => setActiveProvinceName('Kiên Giang')}
                  >
                    <ellipse cx="370" cy="855" rx="8" ry="16" transform="rotate(-15 370 855)" fill="#315C45" stroke="#FFFFFF" strokeWidth="1" />
                    <text x="320" y="885" fontSize="10" fontWeight="bold" fill="#315C45">Đảo Phú Quốc</text>
                  </g>

                  {/* CON DAO ISLAND */}
                  <g 
                    className="cursor-pointer transition-all"
                    onClick={() => setActiveProvinceName('Bà Rịa - Vũng Tàu')}
                  >
                    <circle cx="560" cy="890" r="5" fill="#315C45" stroke="#FFFFFF" strokeWidth="1" />
                    <text x="570" y="894" fontSize="9" fontWeight="bold" fill="#315C45">Côn Đảo</text>
                  </g>

                  {/* 63 ALL PROVINCES PATHS */}
                  <g id="vietnam-provinces-layer">
                    {filteredPaths.map((prov) => {
                      const isSelected = activeProvinceName === prov.name;
                      return (
                        <path
                          key={prov.id}
                          d={prov.d}
                          id={prov.id}
                          fill={getProvinceColor(prov)}
                          stroke={getProvinceStroke(prov)}
                          strokeWidth={isSelected ? '2' : '0.8'}
                          className="transition-colors duration-150 cursor-pointer"
                          onMouseEnter={() => setHoveredProvince(prov.name)}
                          onMouseLeave={() => setHoveredProvince(null)}
                          onClick={() => setActiveProvinceName(prov.name)}
                        >
                          <title>{prov.name} ({prov.region === 'north' ? 'Miền Bắc' : prov.region === 'central' ? 'Miền Trung' : 'Miền Nam'})</title>
                        </path>
                      );
                    })}
                  </g>

                  {/* Major Landmark Capitals on Map */}
                  <g className="pointer-events-none">
                    {/* Hanoi Pin */}
                    <circle cx="495" cy="200" r="5" fill="#B83227" stroke="#FFF" strokeWidth="1.5" />
                    <circle cx="495" cy="200" r="8" fill="none" stroke="#B83227" strokeWidth="1" opacity="0.6" />
                    <text x="506" y="204" fontSize="11" fontWeight="bold" fill="#B83227">★ Thủ đô Hà Nội</text>

                    {/* Hue Pin */}
                    <circle cx="545" cy="405" r="4" fill="#D4A646" stroke="#FFF" strokeWidth="1.5" />
                    <text x="555" y="408" fontSize="10" fontWeight="bold" fill="#39291F">Cố Đô Huế</text>

                    {/* Da Nang Pin */}
                    <circle cx="585" cy="430" r="4.5" fill="#D4A646" stroke="#FFF" strokeWidth="1.5" />
                    <text x="595" y="434" fontSize="10" fontWeight="bold" fill="#39291F">Đà Nẵng</text>

                    {/* Saigon / HCMC Pin */}
                    <circle cx="555" cy="800" r="5" fill="#315C45" stroke="#FFF" strokeWidth="1.5" />
                    <circle cx="555" cy="800" r="8" fill="none" stroke="#315C45" strokeWidth="1" opacity="0.6" />
                    <text x="566" y="804" fontSize="11" fontWeight="bold" fill="#315C45">★ TP. Hồ Chí Minh</text>

                    {/* Can Tho Pin */}
                    <circle cx="488" cy="855" r="4" fill="#315C45" stroke="#FFF" strokeWidth="1.5" />
                    <text x="498" y="859" fontSize="10" fontWeight="bold" fill="#39291F">Cần Thơ</text>
                  </g>
                </svg>

                {/* Floating tooltip on hover */}
                {hoveredProvince && (
                  <div className="absolute bottom-4 left-4 bg-[#39291F]/90 backdrop-blur-md text-white px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-lg pointer-events-none flex items-center gap-1.5 animate-fade-in border border-[#D4A646]/50">
                    <MapPin className="w-3.5 h-3.5 text-[#D4A646]" />
                    <span>{hoveredProvince}</span>
                    <span className="text-[10px] text-[#D4A646] font-normal">• Nhấp để xem món</span>
                  </div>
                )}
              </div>
            ) : (
              /* MAP VIEW: 2. REFERENCE GEOGRAPHIC MAP */
              <div className="relative w-full h-[620px] rounded-2xl overflow-hidden border border-[#D4A646]/30 bg-black/5 flex items-center justify-center">
                <img
                  src="/vietnam-reference-map.png"
                  alt="Bản đồ địa lý Việt Nam"
                  className="w-full h-full object-contain filter drop-shadow-md"
                />
                
                {/* Interactive markers overlaid on the real map image */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Hanoi */}
                  <button
                    onClick={() => setActiveProvinceName('Hà Nội')}
                    className="absolute top-[16%] left-[49%] -translate-x-1/2 -translate-y-1/2 pointer-events-auto p-1.5 rounded-full bg-[#B83227] text-white shadow-lg hover:scale-125 transition-transform"
                    title="Thủ đô Hà Nội"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                  </button>

                  {/* Hue */}
                  <button
                    onClick={() => setActiveProvinceName('Thừa Thiên Huế')}
                    className="absolute top-[41%] left-[55%] -translate-x-1/2 -translate-y-1/2 pointer-events-auto p-1.5 rounded-full bg-[#D4A646] text-[#39291F] shadow-lg hover:scale-125 transition-transform"
                    title="Thừa Thiên Huế"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                  </button>

                  {/* Da Nang */}
                  <button
                    onClick={() => setActiveProvinceName('Đà Nẵng')}
                    className="absolute top-[46%] left-[61%] -translate-x-1/2 -translate-y-1/2 pointer-events-auto p-1.5 rounded-full bg-[#D4A646] text-[#39291F] shadow-lg hover:scale-125 transition-transform"
                    title="Đà Nẵng"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                  </button>

                  {/* Ho Chi Minh City */}
                  <button
                    onClick={() => setActiveProvinceName('TP. Hồ Chí Minh')}
                    className="absolute top-[81%] left-[55%] -translate-x-1/2 -translate-y-1/2 pointer-events-auto p-1.5 rounded-full bg-[#315C45] text-white shadow-lg hover:scale-125 transition-transform"
                    title="TP. Hồ Chí Minh"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                  </button>

                  {/* Can Tho */}
                  <button
                    onClick={() => setActiveProvinceName('Cần Thơ')}
                    className="absolute top-[87%] left-[48%] -translate-x-1/2 -translate-y-1/2 pointer-events-auto p-1.5 rounded-full bg-[#315C45] text-white shadow-lg hover:scale-125 transition-transform"
                    title="Cần Thơ"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs text-[#39291F] font-semibold shadow-xs">
                  Nhấp vào các điểm đánh dấu trên bản đồ để khám phá
                </div>
              </div>
            )}

            {/* Quick province picker chips */}
            <div className="w-full pt-4 mt-2 border-t border-[#D4A646]/20 flex flex-wrap justify-center gap-1.5 max-h-24 overflow-y-auto">
              {['Hà Nội', 'Quảng Ninh', 'Hải Phòng', 'Lào Cai', 'Thừa Thiên Huế', 'Đà Nẵng', 'Quảng Nam', 'Khánh Hòa', 'TP. Hồ Chí Minh', 'Cần Thơ', 'An Giang', 'Bà Rịa - Vũng Tàu', 'Bến Tre'].map((name) => (
                <button
                  key={name}
                  onClick={() => setActiveProvinceName(name)}
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    activeProvinceName.toLowerCase().includes(name.toLowerCase()) || name.toLowerCase().includes(activeProvinceName.toLowerCase())
                      ? 'bg-[#B83227] text-white shadow-xs'
                      : 'bg-[#FFF8ED] text-[#39291F] hover:bg-[#D4A646]/20 border border-[#D4A646]/30'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>

          </div>

          {/* RIGHT: SELECTED PROVINCE FOOD CULTURE & DISHES */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#D4A646]/40 shadow-xl space-y-6">
            
            {/* Province Title & Regional Identity */}
            <div className="border-b border-[#D4A646]/30 pb-6 space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#D4A646]/20 text-[#B83227] tracking-wider uppercase">
                  {currentProvinceInfo.region === 'north'
                    ? 'Miền Bắc'
                    : currentProvinceInfo.region === 'central'
                    ? 'Miền Trung'
                    : 'Miền Nam'}
                </span>
                <span className="text-xs text-[#315C45] font-semibold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#B83227]" />
                  {currentProvinceInfo.capital}
                </span>
              </div>

              <h3 className="font-serif font-black text-3xl sm:text-4xl text-[#39291F]">
                {activeProvinceName}
              </h3>
              <p className="text-sm font-semibold text-[#B83227] italic">
                "{language === 'vi' ? currentProvinceInfo.tagline : currentProvinceInfo.taglineEn}"
              </p>
              <p className="text-sm text-[#39291F]/80 leading-relaxed pt-1">
                {language === 'vi' ? currentProvinceInfo.description : currentProvinceInfo.descriptionEn}
              </p>

              {/* Highlights tags */}
              <div className="pt-2 flex flex-wrap gap-1.5">
                {currentProvinceInfo.highlights.map((hl, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-[#FFF8ED] text-xs font-semibold text-[#315C45] border border-[#D4A646]/25"
                  >
                    ★ {hl}
                  </span>
                ))}
              </div>
            </div>

            {/* Specialty Dishes in this Province */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-serif font-bold text-lg text-[#39291F] flex items-center gap-2">
                  <UtensilsCrossed className="w-4 h-4 text-[#B83227]" />
                  <span>{t('specialtiesIn')} {activeProvinceName}</span>
                </h4>
                <span className="text-xs font-bold text-[#D4A646]">
                  {provinceDishes.length} món đặc sắc
                </span>
              </div>

              {provinceDishes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {provinceDishes.map((dish) => (
                    <div
                      key={dish.id}
                      className="group/d bg-[#FFF8ED] rounded-2xl overflow-hidden border border-[#D4A646]/30 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div className="relative aspect-16/9 overflow-hidden">
                        <img
                          src={dish.imageUrl}
                          alt={dish.name}
                          className="w-full h-full object-cover group-hover/d:scale-108 transition-transform duration-500"
                        />
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[10px] font-bold text-white">
                          {dish.calories}
                        </div>
                        <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-[#B83227] text-[10px] font-bold text-white">
                          {dish.cookingTime}
                        </div>
                      </div>

                      <div className="p-3.5 space-y-2">
                        <div>
                          <h5 className="font-serif font-bold text-base text-[#39291F] group-hover/d:text-[#B83227] transition-colors line-clamp-1">
                            {dish.name}
                          </h5>
                          <p className="text-[11px] text-[#315C45] font-medium">
                            {dish.nameEn}
                          </p>
                        </div>

                        <p className="text-xs text-[#39291F]/70 line-clamp-2 leading-relaxed">
                          {language === 'vi' ? dish.shortDesc : dish.shortDescEn}
                        </p>

                        <button
                          onClick={() => onSelectDish(dish)}
                          className="w-full mt-2 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white hover:bg-[#B83227] text-[#B83227] hover:text-white border border-[#D4A646]/40 text-xs font-bold transition-all shadow-2xs cursor-pointer group/btn"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#D4A646] group-hover/btn:text-white" />
                          <span>{t('btnViewDetail')}</span>
                          <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-[#FFF8ED] rounded-2xl border border-dashed border-[#D4A646]/40 text-xs text-[#39291F]/60">
                  Đang cập nhật thêm các món đặc sản của {activeProvinceName}...
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
