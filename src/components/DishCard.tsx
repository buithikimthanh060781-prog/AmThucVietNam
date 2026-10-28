import React, { useState } from 'react';
import { Heart, Clock, Flame, MapPin, Eye, Star } from 'lucide-react';
import { Dish } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useFavorites } from '../context/FavoritesContext';

interface DishCardProps {
  dish: Dish;
  onSelect: (dish: Dish) => void;
}

export const DishCard: React.FC<DishCardProps> = ({ dish, onSelect }) => {
  const { language, t } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [imgSrc, setImgSrc] = useState(dish.imageUrl);
  const [hasError, setHasError] = useState(false);

  const isFav = isFavorite(dish.id);

  const handleImageError = () => {
    if (!hasError && dish.fallbackImageUrl) {
      setImgSrc(dish.fallbackImageUrl);
      setHasError(true);
    }
  };

  const regionBadgeColor = {
    north: 'bg-[#B83227] text-white',
    central: 'bg-[#D4A646] text-[#39291F]',
    south: 'bg-[#315C45] text-white'
  }[dish.region];

  const regionLabel = {
    north: language === 'vi' ? 'Miền Bắc' : 'Northern',
    central: language === 'vi' ? 'Miền Trung' : 'Central',
    south: language === 'vi' ? 'Miền Nam' : 'Southern'
  }[dish.region];

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#D4A646]/25 flex flex-col hover:-translate-y-1">
      
      {/* Image container with hover zoom */}
      <div className="relative aspect-4/3 overflow-hidden bg-[#F3E5CF]/40">
        <img
          src={imgSrc}
          alt={dish.name}
          onError={handleImageError}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Gradient Shadow overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

        {/* Region Badge (Top Left) */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold shadow-md tracking-wide ${regionBadgeColor}`}>
            {regionLabel}
          </span>
          {dish.isUNESCOOrHeritage && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#D4A646] text-[#39291F] shadow-xs">
              Di sản
            </span>
          )}
        </div>

        {/* Favorite Heart Button (Top Right) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(dish.id, dish.name);
          }}
          aria-label="Lưu món ăn"
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white text-[#39291F] shadow-md hover:scale-110 active:scale-90 transition-all cursor-pointer"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFav ? 'fill-[#B83227] text-[#B83227]' : 'text-gray-600 hover:text-[#B83227]'
            }`}
          />
        </button>

        {/* Rating & Province (Bottom overlay on photo) */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs">
          <span className="flex items-center gap-1 font-medium drop-shadow-md">
            <MapPin className="w-3.5 h-3.5 text-[#D4A646]" />
            {dish.province}
          </span>
          <span className="flex items-center gap-1 font-bold bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded text-[#D4A646]">
            <Star className="w-3.5 h-3.5 fill-[#D4A646]" />
            {dish.rating} ({dish.reviewCount})
          </span>
        </div>
      </div>

      {/* Card Information */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Dish Title */}
          <h3 className="font-serif font-bold text-lg sm:text-xl text-[#39291F] group-hover:text-[#B83227] transition-colors leading-snug">
            {dish.name}
          </h3>
          <p className="text-xs text-[#315C45] font-medium tracking-wide mt-0.5">
            {dish.nameEn}
          </p>

          {/* Short description */}
          <p className="text-xs sm:text-sm text-[#39291F]/75 line-clamp-2 mt-2 leading-relaxed">
            {language === 'vi' ? dish.shortDesc : dish.shortDescEn}
          </p>
        </div>

        {/* Quick meta tags */}
        <div className="pt-2 border-t border-[#D4A646]/20 flex items-center justify-between text-xs text-[#39291F]/70">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#B83227]" />
            {dish.cookingTime}
          </span>
          <span className="flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-[#D4A646]" />
            {dish.calories}
          </span>
        </div>

        {/* View Details Button */}
        <button
          onClick={() => onSelect(dish)}
          className="w-full mt-2 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#FFF8ED] hover:bg-[#B83227] text-[#B83227] hover:text-white border border-[#D4A646]/40 text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all cursor-pointer group/btn"
        >
          <Eye className="w-4 h-4 text-[#D4A646] group-hover/btn:text-white" />
          <span>{t('btnViewDetail')}</span>
        </button>

      </div>
    </div>
  );
};
