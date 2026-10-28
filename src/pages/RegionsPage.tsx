import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { REGIONS_DATA } from '../components/RegionalSection';
import { DISHES_DATA } from '../data/dishesData';
import { DishCard } from '../components/DishCard';
import { DishDetailModal } from '../components/DishDetailModal';
import { Region, Dish } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, MapPin, CheckCircle2, Utensils, Heart } from 'lucide-react';

export const RegionsPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);

  const regionParam = searchParams.get('region') as Region | null;
  const [activeRegion, setActiveRegion] = useState<Region>(
    regionParam && ['north', 'central', 'south'].includes(regionParam)
      ? regionParam
      : 'north'
  );

  useEffect(() => {
    if (regionParam && ['north', 'central', 'south'].includes(regionParam)) {
      setActiveRegion(regionParam);
    }
  }, [regionParam]);

  const currentRegionInfo = REGIONS_DATA.find((r) => r.id === activeRegion) || REGIONS_DATA[0];

  const regionDishes = DISHES_DATA.filter((d) => d.region === activeRegion);

  const handleSelectRegionTab = (reg: Region) => {
    setActiveRegion(reg);
    setSearchParams({ region: reg });
  };

  return (
    <div className="pt-28 pb-20 bg-[#FFF8ED] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Banner Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#B83227]/15 text-[#B83227] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'vi' ? 'Hành Trình Vị Giác' : 'Regional Gastronomy'}</span>
          </div>

          <h1 className="font-serif font-black text-4xl sm:text-5xl text-[#39291F]">
            {language === 'vi' ? 'Ẩm Thực 3 Miền Bắc – Trung – Nam' : 'Cuisines of 3 Vietnamese Regions'}
          </h1>

          <p className="text-base sm:text-lg text-[#39291F]/80 leading-relaxed font-light">
            {language === 'vi'
              ? 'Khám phá sự giao thoa kỳ diệu giữa đất trời, phong thổ và bàn tay tài hoa của người Việt qua từng vùng miền.'
              : 'Explore the miraculous harmony of terroir, history, and culinary ingenuity across three distinct regions.'}
          </p>

          {/* Region Tabs */}
          <div className="inline-flex p-1.5 rounded-2xl bg-white border border-[#D4A646]/30 shadow-md gap-1 mt-4">
            <button
              onClick={() => handleSelectRegionTab('north')}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                activeRegion === 'north'
                  ? 'bg-[#B83227] text-white shadow-sm'
                  : 'text-[#39291F] hover:bg-[#D4A646]/15'
              }`}
            >
              {language === 'vi' ? 'Miền Bắc' : 'Northern Vietnam'}
            </button>
            <button
              onClick={() => handleSelectRegionTab('central')}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                activeRegion === 'central'
                  ? 'bg-[#D4A646] text-[#39291F] shadow-sm'
                  : 'text-[#39291F] hover:bg-[#D4A646]/15'
              }`}
            >
              {language === 'vi' ? 'Miền Trung' : 'Central Vietnam'}
            </button>
            <button
              onClick={() => handleSelectRegionTab('south')}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                activeRegion === 'south'
                  ? 'bg-[#315C45] text-white shadow-sm'
                  : 'text-[#39291F] hover:bg-[#D4A646]/15'
              }`}
            >
              {language === 'vi' ? 'Miền Nam' : 'Southern Vietnam'}
            </button>
          </div>
        </div>

        {/* Selected Region Showcase Banner */}
        <div className="bg-white rounded-3xl overflow-hidden border-2 border-[#D4A646]/40 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Image */}
            <div className="lg:col-span-5 relative h-72 lg:h-auto min-h-[300px]">
              <img
                src={currentRegionInfo.image}
                alt={currentRegionInfo.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:hidden" />
              <div className="absolute bottom-4 left-4 lg:hidden text-white">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#B83227]">
                  {currentRegionInfo.title}
                </span>
              </div>
            </div>

            {/* Info Content */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white shadow-xs" style={{ backgroundColor: currentRegionInfo.accentColor }}>
                  {language === 'vi' ? currentRegionInfo.title : currentRegionInfo.titleEn}
                </div>

                <h2 className="font-serif font-black text-2xl sm:text-3xl md:text-4xl text-[#39291F]">
                  {language === 'vi' ? currentRegionInfo.tagline : currentRegionInfo.taglineEn}
                </h2>

                <p className="text-sm sm:text-base text-[#39291F]/85 leading-relaxed font-light">
                  {language === 'vi' ? currentRegionInfo.description : currentRegionInfo.descriptionEn}
                </p>

                {/* Characteristics */}
                <div className="pt-2 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#39291F]">
                    {language === 'vi' ? 'Đặc trưng cốt lõi' : 'Core Characteristics'}:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {(language === 'vi' ? currentRegionInfo.tasteFeatures : currentRegionInfo.tasteFeaturesEn).map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-[#315C45] font-semibold">
                        <CheckCircle2 className="w-4 h-4 text-[#D4A646] shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats note */}
              <div className="pt-4 border-t border-[#D4A646]/20 flex items-center justify-between text-xs text-[#39291F]/70">
                <span>Số món tiêu biểu: <strong className="text-[#B83227]">{regionDishes.length} món</strong></span>
                <span className="flex items-center gap-1 text-[#315C45]">
                  <Utensils className="w-3.5 h-3.5" />
                  Đậm đà hương vị quê hương
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Region Dishes Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-2xl text-[#39291F] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#B83227]" />
              <span>
                {language === 'vi' ? `Danh Sách Đặc Sản ${currentRegionInfo.title}` : `Signature Dishes of ${currentRegionInfo.titleEn}`}
              </span>
            </h3>
            <span className="text-xs font-bold text-[#D4A646]">
              {regionDishes.length} món
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {regionDishes.map((dish) => (
              <DishCard
                key={dish.id}
                dish={dish}
                onSelect={(selected) => setSelectedDish(selected)}
              />
            ))}
          </div>
        </div>

      </div>

      {/* DISH DETAIL MODAL */}
      <DishDetailModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        onSelectRelatedDish={(related) => setSelectedDish(related)}
      />
    </div>
  );
};
