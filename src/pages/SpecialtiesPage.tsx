import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DISHES_DATA } from '../data/dishesData';
import { DishCard } from '../components/DishCard';
import { DishFilter, FilterState } from '../components/DishFilter';
import { DishDetailModal } from '../components/DishDetailModal';
import { Dish, Region, DishCategory } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, UtensilsCrossed } from 'lucide-react';

export const SpecialtiesPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [searchParams] = useSearchParams();
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);

  // Initial filter state from URL params
  const initialRegion = (searchParams.get('region') as Region) || 'all';
  const initialCategory = (searchParams.get('category') as DishCategory) || 'all';

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    region: initialRegion,
    category: initialCategory,
    province: 'all',
    sortBy: 'popular'
  });

  // Filter and sort dishes
  const filteredDishes = useMemo(() => {
    let list = DISHES_DATA.filter((dish) => {
      // Search Query
      if (filters.searchQuery.trim() !== '') {
        const q = filters.searchQuery.toLowerCase();
        const matchName = dish.name.toLowerCase().includes(q) || dish.nameEn.toLowerCase().includes(q);
        const matchProv = dish.province.toLowerCase().includes(q);
        const matchDesc = dish.shortDesc.toLowerCase().includes(q) || dish.shortDescEn.toLowerCase().includes(q);
        const matchTag = dish.tasteTags.some((tag) => tag.toLowerCase().includes(q));
        if (!matchName && !matchProv && !matchDesc && !matchTag) return false;
      }

      // Region
      if (filters.region !== 'all' && dish.region !== filters.region) {
        return false;
      }

      // Category
      if (filters.category !== 'all' && dish.category !== filters.category) {
        return false;
      }

      // Province
      if (filters.province !== 'all' && dish.province !== filters.province) {
        return false;
      }

      return true;
    });

    // Sort
    if (filters.sortBy === 'popular') {
      list.sort((a, b) => b.reviewCount - a.reviewCount);
    } else if (filters.sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (filters.sortBy === 'prep') {
      list.sort((a, b) => parseInt(a.prepTime) - parseInt(b.prepTime));
    }

    return list;
  }, [filters]);

  return (
    <div className="pt-28 pb-20 bg-[#FFF8ED] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#B83227]/15 text-[#B83227] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'vi' ? 'Kho Tàng Mỹ Vị' : 'Culinary Treasure'}</span>
          </div>

          <h1 className="font-serif font-black text-4xl sm:text-5xl text-[#39291F]">
            {language === 'vi' ? 'Khám Phá Đặc Sản Ẩm Thực Việt' : 'Explore Vietnamese Specialties'}
          </h1>

          <p className="text-sm sm:text-base text-[#39291F]/75 leading-relaxed font-light">
            {language === 'vi'
              ? 'Tuyển tập hơn 24 món ăn truyền thống nức tiếng 3 miền, kèm công thức, nguồn gốc và địa chỉ thưởng thức chuẩn vị.'
              : 'A curated collection of authentic specialties across 3 regions, complete with origins, recipes, and iconic restaurants.'}
          </p>
        </div>

        {/* Filter Controls */}
        <DishFilter
          filters={filters}
          onChange={(newFilters) => setFilters(newFilters)}
          totalCount={DISHES_DATA.length}
          filteredCount={filteredDishes.length}
        />

        {/* Dishes Grid */}
        {filteredDishes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDishes.map((dish) => (
              <DishCard
                key={dish.id}
                dish={dish}
                onSelect={(selected) => setSelectedDish(selected)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#D4A646]/30 shadow-md space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#D4A646]/20 mx-auto flex items-center justify-center text-[#B83227]">
              <UtensilsCrossed className="w-8 h-8" />
            </div>
            <h3 className="font-serif font-bold text-xl text-[#39291F]">
              {t('noResults')}
            </h3>
            <p className="text-sm text-[#39291F]/70 max-w-md mx-auto">
              Không tìm thấy món ăn nào phù hợp với bộ lọc hiện tại. Vui lòng bấm "Đặt lại bộ lọc" để xem toàn bộ thực đơn.
            </p>
            <button
              onClick={() =>
                setFilters({
                  searchQuery: '',
                  region: 'all',
                  category: 'all',
                  province: 'all',
                  sortBy: 'popular'
                })
              }
              className="px-6 py-2.5 rounded-xl bg-[#B83227] text-white font-bold text-xs shadow-md hover:bg-[#8F221A] transition-all cursor-pointer"
            >
              {t('resetFilters')}
            </button>
          </div>
        )}

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
