import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { RegionalSection } from '../components/RegionalSection';
import { DishCard } from '../components/DishCard';
import { FoodMap } from '../components/FoodMap';
import { CulturalStories } from '../components/CulturalStories';
import { DishDetailModal } from '../components/DishDetailModal';
import { DISHES_DATA } from '../data/dishesData';
import { Dish, Region } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, Sparkles, Award, Quote, Utensils } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { language, t } = useLanguage();
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [featuredRegion, setFeaturedRegion] = useState<Region | 'all'>('all');

  // Filter featured specialties
  const featuredDishes = DISHES_DATA.filter((d) => {
    if (featuredRegion === 'all') return d.isFeatured || d.rating >= 4.8;
    return d.region === featuredRegion;
  }).slice(0, 8);

  const handleOpenDishById = (dishId: string) => {
    const found = DISHES_DATA.find((d) => d.id === dishId);
    if (found) setSelectedDish(found);
  };

  return (
    <div className="space-y-0">
      
      {/* 1. Hero Section */}
      <Hero />

      {/* Philosophy of 5 Elements & Yin-Yang Highlight Banner */}
      <section className="bg-white py-12 border-y border-[#D4A646]/25 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="w-14 h-14 rounded-2xl bg-[#B83227]/10 border border-[#B83227]/30 flex items-center justify-center text-[#B83227] shrink-0">
                <Utensils className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#39291F]">
                  {language === 'vi' ? 'Triết Lý Ngũ Hành' : 'The 5 Elements Philosophy'}
                </h3>
                <p className="text-xs text-[#39291F]/70">
                  {language === 'vi' ? 'Cân bằng ngũ vị: Chua, Cay, Mặn, Ngọt, Đắng' : 'Harmonizing sour, spicy, salty, sweet and bitter'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="w-14 h-14 rounded-2xl bg-[#D4A646]/10 border border-[#D4A646]/30 flex items-center justify-center text-[#D4A646] shrink-0">
                <Award className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#39291F]">
                  {language === 'vi' ? 'Di Sản Thế Giới' : 'World Acclaimed'}
                </h3>
                <p className="text-xs text-[#39291F]/70">
                  {language === 'vi' ? 'Được vinh danh bởi UNESCO, Michelin & CNN' : 'Celebrated by UNESCO, Michelin Guide & CNN'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="w-14 h-14 rounded-2xl bg-[#315C45]/10 border border-[#315C45]/30 flex items-center justify-center text-[#315C45] shrink-0">
                <Sparkles className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#39291F]">
                  {language === 'vi' ? 'Hương Vị Bản Địa' : 'Indigenous Heritage'}
                </h3>
                <p className="text-xs text-[#39291F]/70">
                  {language === 'vi' ? 'Đặc sản tinh hoa từ 63 tỉnh thành' : 'Authentic recipes from 63 provinces'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 3 Regional Section */}
      <RegionalSection onSelectDish={handleOpenDishById} />

      {/* 3. Featured Specialties Grid */}
      <section id="specialties" className="py-20 bg-gradient-to-b from-[#FFF8ED] via-white to-[#FFF8ED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header & Filter pills */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B83227]/15 text-[#B83227] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{language === 'vi' ? 'Món Ăn Nức Tiếng' : 'Iconic Dishes'}</span>
              </div>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#39291F]">
                {t('featuredTitle')}
              </h2>
              <p className="text-sm sm:text-base text-[#39291F]/75 max-w-xl">
                {t('featuredSubtitle')}
              </p>
            </div>

            {/* Region switch buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setFeaturedRegion('all')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  featuredRegion === 'all'
                    ? 'bg-[#B83227] text-white shadow-xs'
                    : 'bg-white text-[#39291F] hover:bg-[#D4A646]/20 border border-[#D4A646]/30'
                }`}
              >
                {t('allDishes')}
              </button>
              <button
                onClick={() => setFeaturedRegion('north')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  featuredRegion === 'north'
                    ? 'bg-[#B83227] text-white shadow-xs'
                    : 'bg-white text-[#39291F] hover:bg-[#D4A646]/20 border border-[#D4A646]/30'
                }`}
              >
                {language === 'vi' ? 'Miền Bắc' : 'North'}
              </button>
              <button
                onClick={() => setFeaturedRegion('central')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  featuredRegion === 'central'
                    ? 'bg-[#D4A646] text-[#39291F] shadow-xs'
                    : 'bg-white text-[#39291F] hover:bg-[#D4A646]/20 border border-[#D4A646]/30'
                }`}
              >
                {language === 'vi' ? 'Miền Trung' : 'Central'}
              </button>
              <button
                onClick={() => setFeaturedRegion('south')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  featuredRegion === 'south'
                    ? 'bg-[#315C45] text-white shadow-xs'
                    : 'bg-white text-[#39291F] hover:bg-[#D4A646]/20 border border-[#D4A646]/30'
                }`}
              >
                {language === 'vi' ? 'Miền Nam' : 'South'}
              </button>
            </div>
          </div>

          {/* Grid of Dishes (3-4 columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDishes.map((dish) => (
              <DishCard
                key={dish.id}
                dish={dish}
                onSelect={(selected) => setSelectedDish(selected)}
              />
            ))}
          </div>

          {/* Bottom view all CTA */}
          <div className="text-center mt-12">
            <Link
              to="/specialties"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#B83227] hover:bg-[#8F221A] text-white font-bold text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all group"
            >
              <span>{language === 'vi' ? 'Xem Toàn Bộ 24+ Đặc Sản 3 Miền' : 'View All 24+ Regional Specialties'}</span>
              <ArrowRight className="w-4 h-4 text-[#D4A646] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </section>

      {/* 4. Interactive Vietnam Food Map */}
      <FoodMap onSelectDish={(dish) => setSelectedDish(dish)} />

      {/* 5. International Acclaim Quotes */}
      <section className="py-16 bg-[#39291F] text-[#FFF8ED] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D4A646] flex items-center gap-1.5">
                <Quote className="w-4 h-4" />
                Vinh Danh Quốc Tế
              </span>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-white">
                "Một Trong Những Nền Ẩm Thực Tinh Tế & Quyến Rũ Nhất Thế Giới"
              </h2>
              <p className="text-sm text-[#FFF8ED]/80 font-light leading-relaxed">
                Ẩm thực Việt Nam chinh phục các chuyên gia ẩm thực toàn cầu nhờ sự hòa quyện kỳ diệu của thảo mộc tự nhiên, nước mắm truyền thống và triết lý dinh dưỡng lành mạnh.
              </p>
            </div>

            <div className="bg-[#483528] p-6 sm:p-8 rounded-3xl border border-[#D4A646]/30 shadow-xl space-y-4">
              <Quote className="w-8 h-8 text-[#D4A646] opacity-60" />
              <p className="text-base sm:text-lg italic font-serif text-white/95 leading-relaxed">
                "Chuyến đi đầu tiên đến Việt Nam đã làm thay đổi hoàn toàn cuộc đời tôi. Ẩm thực nơi đây là bản hòa tấu bất tận của sự tươi mới, phong phú và chân thực đến kinh ngạc."
              </p>
              <div className="pt-2 flex items-center justify-between border-t border-white/10 text-xs">
                <span className="font-bold text-[#D4A646]">Anthony Bourdain</span>
                <span className="text-white/60">Đầu bếp & Ký giả ẩm thực huyền thoại</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Cultural Stories Section */}
      <CulturalStories />

      {/* DISH DETAIL MODAL */}
      <DishDetailModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        onSelectRelatedDish={(related) => setSelectedDish(related)}
      />

    </div>
  );
};
