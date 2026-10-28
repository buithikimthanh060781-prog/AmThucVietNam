import React, { useEffect } from 'react';
import { X, Heart, Trash2, Eye, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useLanguage } from '../context/LanguageContext';
import { DISHES_DATA } from '../data/dishesData';
import { Dish } from '../types';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDish: (dish: Dish) => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  onSelectDish
}) => {
  const { favorites, toggleFavorite, clearFavorites } = useFavorites();
  const { language, t } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const favoriteDishes = DISHES_DATA.filter((d) => favorites.includes(d.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFF8ED] shadow-2xl border-l-2 border-[#D4A646]/50 flex flex-col justify-between">
          
          {/* Drawer Header */}
          <div className="p-6 bg-white border-b border-[#D4A646]/30 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-full bg-[#B83227]/10 text-[#B83227]">
                <Heart className="w-5 h-5 fill-[#B83227]" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#39291F]">
                  {t('myFavorites')}
                </h3>
                <span className="text-xs text-[#315C45] font-semibold">
                  {favorites.length} {language === 'vi' ? 'món đã lưu' : 'saved dishes'}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#39291F] hover:bg-[#D4A646]/20 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body List */}
          <div className="p-6 overflow-y-auto flex-1 space-y-4">
            {favoriteDishes.length > 0 ? (
              favoriteDishes.map((dish) => (
                <div
                  key={dish.id}
                  className="group bg-white rounded-2xl p-3 border border-[#D4A646]/30 shadow-xs hover:shadow-md transition-all flex items-center gap-3 relative"
                >
                  <img
                    src={dish.imageUrl}
                    alt={dish.name}
                    className="w-20 h-20 rounded-xl object-cover shrink-0 cursor-pointer"
                    onClick={() => {
                      onSelectDish(dish);
                      onClose();
                    }}
                  />

                  <div className="flex-1 overflow-hidden">
                    <span className="text-[10px] font-bold text-[#B83227] uppercase tracking-wider block">
                      {dish.region === 'north' ? 'Miền Bắc' : dish.region === 'central' ? 'Miền Trung' : 'Miền Nam'}
                    </span>
                    <h4
                      onClick={() => {
                        onSelectDish(dish);
                        onClose();
                      }}
                      className="font-serif font-bold text-base text-[#39291F] hover:text-[#B83227] transition-colors truncate cursor-pointer"
                    >
                      {dish.name}
                    </h4>
                    <span className="text-xs text-[#315C45] font-medium flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#D4A646]" />
                      {dish.province}
                    </span>

                    <button
                      onClick={() => {
                        onSelectDish(dish);
                        onClose();
                      }}
                      className="mt-1.5 inline-flex items-center gap-1 text-xs font-bold text-[#B83227] hover:underline"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{t('btnViewDetail')}</span>
                    </button>
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={() => toggleFavorite(dish.id, dish.name)}
                    className="p-2 text-gray-400 hover:text-[#B83227] transition-colors cursor-pointer self-start"
                    title="Xóa khỏi danh sách"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-16 px-4 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#D4A646]/15 mx-auto flex items-center justify-center text-[#D4A646]">
                  <Heart className="w-8 h-8" />
                </div>
                <h4 className="font-serif font-bold text-lg text-[#39291F]">
                  {language === 'vi' ? 'Chưa Có Món Yêu Thích' : 'No Saved Favorites'}
                </h4>
                <p className="text-xs sm:text-sm text-[#39291F]/70 leading-relaxed font-light">
                  {t('noFavoritesYet')}
                </p>
              </div>
            )}
          </div>

          {/* Drawer Footer Actions */}
          {favoriteDishes.length > 0 && (
            <div className="p-6 bg-white border-t border-[#D4A646]/30 flex items-center justify-between">
              <button
                onClick={clearFavorites}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-800 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>{t('removeAllFavorites')}</span>
              </button>

              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-[#B83227] text-white text-xs font-bold shadow-md hover:bg-[#8F221A] transition-all cursor-pointer"
              >
                Đóng lại
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
