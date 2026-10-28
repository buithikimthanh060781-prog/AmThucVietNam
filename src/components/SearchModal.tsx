import React, { useState, useEffect, useRef } from 'react';
import { Search, X, MapPin, ArrowRight, Eye, Sparkles } from 'lucide-react';
import { DISHES_DATA } from '../data/dishesData';
import { Dish } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDish: (dish: Dish) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectDish
}) => {
  const { language, t } = useLanguage();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      setQuery('');
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const results = query.trim() === ''
    ? DISHES_DATA.slice(0, 6)
    : DISHES_DATA.filter((d) => {
        const q = query.toLowerCase();
        return (
          d.name.toLowerCase().includes(q) ||
          d.nameEn.toLowerCase().includes(q) ||
          d.province.toLowerCase().includes(q) ||
          d.shortDesc.toLowerCase().includes(q) ||
          d.tasteTags.some((t) => t.toLowerCase().includes(q))
        );
      });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-start justify-center p-3 sm:p-6 pt-16 sm:pt-24 animate-fade-in">
      <div
        className="relative bg-[#FFF8ED] w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border-2 border-[#D4A646]/50 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 bg-white border-b border-[#D4A646]/30 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#B83227] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full text-base sm:text-lg text-[#39291F] placeholder-[#39291F]/40 bg-transparent focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-gray-400 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#39291F] hover:bg-[#D4A646]/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results List */}
        <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-[#315C45] px-1 uppercase tracking-wider">
            <span>{query.trim() === '' ? 'Món ăn gợi ý' : `Kết quả tìm kiếm (${results.length})`}</span>
            <span className="text-[#39291F]/50 font-normal">Nhấn để xem chi tiết</span>
          </div>

          {results.length > 0 ? (
            results.map((dish) => (
              <div
                key={dish.id}
                onClick={() => {
                  onSelectDish(dish);
                  onClose();
                }}
                className="group bg-white p-3 rounded-2xl border border-[#D4A646]/25 hover:border-[#B83227] shadow-xs hover:shadow-md transition-all flex items-center gap-3 cursor-pointer"
              >
                <img
                  src={dish.imageUrl}
                  alt={dish.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform"
                />

                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-bold text-[#B83227] uppercase">
                      {dish.region === 'north' ? 'Miền Bắc' : dish.region === 'central' ? 'Miền Trung' : 'Miền Nam'}
                    </span>
                    <span className="text-xs text-[#315C45] flex items-center gap-0.5 font-medium">
                      <MapPin className="w-3 h-3 text-[#D4A646]" />
                      {dish.province}
                    </span>
                  </div>

                  <h4 className="font-serif font-bold text-base text-[#39291F] group-hover:text-[#B83227] transition-colors truncate">
                    {dish.name}
                  </h4>
                  <p className="text-xs text-[#39291F]/70 line-clamp-1">
                    {language === 'vi' ? dish.shortDesc : dish.shortDescEn}
                  </p>
                </div>

                <div className="p-2 text-[#D4A646] group-hover:text-[#B83227] group-hover:translate-x-1 transition-all shrink-0">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 space-y-2">
              <p className="text-base font-semibold text-[#39291F]">
                {t('noResults')}
              </p>
              <p className="text-xs text-[#39291F]/60">
                Hãy thử tìm kiếm với các từ khóa như: phở, bún, mì, cơm tấm, hải sản, huế, sài gòn...
              </p>
            </div>
          )}
        </div>

        {/* Footer shortcuts hint */}
        <div className="px-6 py-3 bg-white/70 border-t border-[#D4A646]/20 flex items-center justify-between text-xs text-[#39291F]/60">
          <span>Mẹo: Nhấn ESC để đóng cửa sổ tìm kiếm</span>
          <span className="font-semibold text-[#B83227]">Tinh Hoa Ẩm Thực Việt</span>
        </div>

      </div>
    </div>
  );
};
