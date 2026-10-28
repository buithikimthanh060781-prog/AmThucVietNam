import React from 'react';
import { Search, Filter, RotateCcw, ArrowUpDown } from 'lucide-react';
import { Region, DishCategory } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { PROVINCES_DATA } from '../data/provincesData';

export interface FilterState {
  searchQuery: string;
  region: Region | 'all';
  category: DishCategory | 'all';
  province: string | 'all';
  sortBy: 'popular' | 'rating' | 'prep';
}

interface DishFilterProps {
  filters: FilterState;
  onChange: (newFilters: FilterState) => void;
  totalCount: number;
  filteredCount: number;
}

export const DishFilter: React.FC<DishFilterProps> = ({
  filters,
  onChange,
  totalCount,
  filteredCount
}) => {
  const { language, t } = useLanguage();

  const categories: { id: DishCategory | 'all'; label: string; labelEn: string }[] = [
    { id: 'all', label: 'Tất cả', labelEn: 'All Types' },
    { id: 'noodles', label: 'Món nước (Phở, Bún, Mì)', labelEn: 'Noodles & Soups' },
    { id: 'rolls_cakes', label: 'Bánh & Món cuốn', labelEn: 'Rolls & Cakes' },
    { id: 'rice', label: 'Món cơm & Xôi', labelEn: 'Rice & Sticky Rice' },
    { id: 'grilled_fried', label: 'Nướng & Chiên rán', labelEn: 'Grilled & Fried' },
    { id: 'hotpot_soups', label: 'Lẩu & Canh kho', labelEn: 'Hotpots & Stews' },
    { id: 'dessert', label: 'Tráng miệng & Chè', labelEn: 'Desserts' },
  ];

  const resetFilters = () => {
    onChange({
      searchQuery: '',
      region: 'all',
      category: 'all',
      province: 'all',
      sortBy: 'popular'
    });
  };

  const hasActiveFilters =
    filters.searchQuery !== '' ||
    filters.region !== 'all' ||
    filters.category !== 'all' ||
    filters.province !== 'all' ||
    filters.sortBy !== 'popular';

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D4A646]/30 shadow-lg space-y-6">
      
      {/* Top Search & Sort Row */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        
        {/* Search input */}
        <div className="md:col-span-8 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-[#B83227]" />
          </div>
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onChange({ ...filters, searchQuery: e.target.value })}
            placeholder={t('searchPlaceholder')}
            className="w-full pl-11 pr-4 py-3.5 bg-[#FFF8ED] rounded-2xl border border-[#D4A646]/40 text-sm text-[#39291F] placeholder-[#39291F]/50 focus:outline-none focus:ring-2 focus:ring-[#B83227] focus:border-transparent transition-all"
          />
          {filters.searchQuery && (
            <button
              onClick={() => onChange({ ...filters, searchQuery: '' })}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs font-bold text-[#B83227] hover:underline"
            >
              Xóa
            </button>
          )}
        </div>

        {/* Sort selector */}
        <div className="md:col-span-4 flex items-center gap-2">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <ArrowUpDown className="h-4 w-4 text-[#D4A646]" />
            </div>
            <select
              value={filters.sortBy}
              onChange={(e) => onChange({ ...filters, sortBy: e.target.value as any })}
              className="w-full pl-9 pr-8 py-3.5 bg-[#FFF8ED] rounded-2xl border border-[#D4A646]/40 text-xs sm:text-sm font-semibold text-[#39291F] focus:outline-none focus:ring-2 focus:ring-[#B83227] cursor-pointer"
            >
              <option value="popular">{t('sortPopular')}</option>
              <option value="rating">{t('sortRating')}</option>
              <option value="prep">{t('sortFast')}</option>
            </select>
          </div>
        </div>

      </div>

      {/* Region Selector Pills */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-[#39291F]/80 flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5 text-[#B83227]" />
          <span>{t('filterRegion')}</span>
        </label>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onChange({ ...filters, region: 'all' })}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              filters.region === 'all'
                ? 'bg-[#39291F] text-white shadow-sm'
                : 'bg-[#FFF8ED] text-[#39291F] hover:bg-[#D4A646]/20 border border-[#D4A646]/30'
            }`}
          >
            {language === 'vi' ? 'Tất Cả 3 Miền' : 'All Regions'}
          </button>
          <button
            onClick={() => onChange({ ...filters, region: 'north' })}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              filters.region === 'north'
                ? 'bg-[#B83227] text-white shadow-sm'
                : 'bg-[#FFF8ED] text-[#39291F] hover:bg-[#B83227]/15 border border-[#D4A646]/30'
            }`}
          >
            {language === 'vi' ? 'Miền Bắc' : 'Northern Vietnam'}
          </button>
          <button
            onClick={() => onChange({ ...filters, region: 'central' })}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              filters.region === 'central'
                ? 'bg-[#D4A646] text-[#39291F] shadow-sm'
                : 'bg-[#FFF8ED] text-[#39291F] hover:bg-[#D4A646]/20 border border-[#D4A646]/30'
            }`}
          >
            {language === 'vi' ? 'Miền Trung' : 'Central Vietnam'}
          </button>
          <button
            onClick={() => onChange({ ...filters, region: 'south' })}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              filters.region === 'south'
                ? 'bg-[#315C45] text-white shadow-sm'
                : 'bg-[#FFF8ED] text-[#39291F] hover:bg-[#315C45]/15 border border-[#D4A646]/30'
            }`}
          >
            {language === 'vi' ? 'Miền Nam' : 'Southern Vietnam'}
          </button>
        </div>
      </div>

      {/* Category Filter Pills & Province Dropdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center pt-2 border-t border-[#D4A646]/20">
        
        {/* Category Pills */}
        <div className="lg:col-span-8 space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-[#39291F]/80 block">
            {t('filterCategory')}
          </label>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onChange({ ...filters, category: cat.id })}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  filters.category === cat.id
                    ? 'bg-[#B83227] text-white shadow-2xs'
                    : 'bg-[#FFF8ED] text-[#39291F] hover:bg-[#D4A646]/20 border border-[#D4A646]/30'
                }`}
              >
                {language === 'vi' ? cat.label : cat.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Province Dropdown */}
        <div className="lg:col-span-4 space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-[#39291F]/80 block">
            {t('filterProvince')}
          </label>
          <select
            value={filters.province}
            onChange={(e) => onChange({ ...filters, province: e.target.value })}
            className="w-full px-3.5 py-2 bg-[#FFF8ED] rounded-xl border border-[#D4A646]/40 text-xs sm:text-sm font-semibold text-[#39291F] focus:outline-none focus:ring-2 focus:ring-[#B83227] cursor-pointer"
          >
            <option value="all">{language === 'vi' ? 'Tất cả các tỉnh thành' : 'All Provinces'}</option>
            {PROVINCES_DATA.map((p) => (
              <option key={p.id} value={p.name}>
                {p.name} ({p.region === 'north' ? 'Bắc' : p.region === 'central' ? 'Trung' : 'Nam'})
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Filter Status Bar & Reset Button */}
      <div className="pt-3 border-t border-[#D4A646]/20 flex items-center justify-between text-xs text-[#39291F]/80">
        <span>
          {language === 'vi' 
            ? `Hiển thị ${filteredCount} trên tổng số ${totalCount} món đặc sắc` 
            : `Showing ${filteredCount} of ${totalCount} specialties`}
        </span>

        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B83227] hover:text-[#8F221A] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t('resetFilters')}</span>
          </button>
        )}
      </div>

    </div>
  );
};
