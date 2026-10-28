import React, { useState, useEffect } from 'react';
import { 
  X, Heart, Share2, Clock, Users, Flame, ChefHat, 
  MapPin, CheckCircle, Sparkles, BookOpen, Utensils, 
  Award, ArrowRight, Compass 
} from 'lucide-react';
import { Dish } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useFavorites } from '../context/FavoritesContext';
import { DISHES_DATA } from '../data/dishesData';

interface DishDetailModalProps {
  dish: Dish | null;
  onClose: () => void;
  onSelectRelatedDish: (dish: Dish) => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  dish,
  onClose,
  onSelectRelatedDish
}) => {
  const { language, t } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [activeTab, setActiveTab] = useState<'overview' | 'recipe' | 'culture'>('overview');
  const [copied, setCopied] = useState(false);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (dish) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [dish]);

  // Reset tab on dish switch
  useEffect(() => {
    setActiveTab('overview');
  }, [dish?.id]);

  if (!dish) return null;

  const isFav = isFavorite(dish.id);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const relatedDishes = DISHES_DATA.filter((item) =>
    dish.relatedDishIds.includes(item.id)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fade-in">
      
      {/* Modal Dialog Content */}
      <div 
        className="relative bg-[#FFF8ED] w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border-2 border-[#D4A646]/50 max-h-[92vh] flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header Bar / Close Button */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          {/* Share */}
          <button
            onClick={handleShare}
            className="p-2.5 rounded-full bg-white/90 backdrop-blur-md text-[#39291F] hover:bg-white shadow-md hover:scale-105 transition-all cursor-pointer"
            title="Chia sẻ món ăn"
          >
            <Share2 className="w-4 h-4 text-[#39291F]" />
          </button>

          {/* Favorite */}
          <button
            onClick={() => toggleFavorite(dish.id, dish.name)}
            className="p-2.5 rounded-full bg-white/90 backdrop-blur-md text-[#39291F] hover:bg-white shadow-md hover:scale-105 transition-all cursor-pointer"
            title="Lưu yêu thích"
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-[#B83227] text-[#B83227]' : 'text-[#39291F]'}`} />
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-[#B83227] text-white hover:bg-[#8F221A] shadow-md hover:scale-105 transition-all cursor-pointer"
            title={t('closeModal')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Copy alert pill */}
        {copied && (
          <div className="absolute top-16 right-4 z-30 px-3 py-1.5 rounded-lg bg-[#315C45] text-white text-xs font-bold shadow-lg animate-bounce">
            Đã sao chép liên kết!
          </div>
        )}

        {/* Scrollable Container */}
        <div className="overflow-y-auto flex-1">
          
          {/* Hero Banner Image */}
          <div className="relative h-72 sm:h-84 md:h-96 w-full overflow-hidden bg-black/40">
            <img
              src={dish.imageUrl}
              alt={dish.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FFF8ED] via-black/40 to-black/30" />

            {/* Badges on Banner */}
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#B83227] shadow-sm">
                  {dish.region === 'north' ? 'Miền Bắc' : dish.region === 'central' ? 'Miền Trung' : 'Miền Nam'}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#D4A646] text-[#39291F] shadow-sm flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {dish.province}
                </span>
                {dish.isUNESCOOrHeritage && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#315C45] text-white shadow-sm flex items-center gap-1">
                    <Award className="w-3 h-3 text-[#D4A646]" />
                    Di Sản Văn Hóa
                  </span>
                )}
              </div>

              <h1 className="font-serif font-black text-2xl sm:text-3xl md:text-4xl text-white drop-shadow-md">
                {dish.name}
              </h1>
              <p className="text-sm sm:text-base text-[#D4A646] font-medium tracking-wide drop-shadow">
                {dish.nameEn} • <span className="italic opacity-90">{dish.localName}</span>
              </p>
            </div>
          </div>

          {/* Quick Specifications Bar */}
          <div className="bg-white/80 border-y border-[#D4A646]/30 px-6 py-4 grid grid-cols-2 sm:grid-cols-5 gap-3 text-center text-xs">
            <div className="p-2 rounded-xl bg-[#FFF8ED] border border-[#D4A646]/20">
              <span className="text-[#39291F]/60 block mb-0.5">{t('prepInfo')}</span>
              <span className="font-bold text-[#39291F] flex items-center justify-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#B83227]" />
                {dish.prepTime}
              </span>
            </div>
            <div className="p-2 rounded-xl bg-[#FFF8ED] border border-[#D4A646]/20">
              <span className="text-[#39291F]/60 block mb-0.5">{t('cookInfo')}</span>
              <span className="font-bold text-[#39291F] flex items-center justify-center gap-1">
                <Flame className="w-3.5 h-3.5 text-[#D4A646]" />
                {dish.cookingTime}
              </span>
            </div>
            <div className="p-2 rounded-xl bg-[#FFF8ED] border border-[#D4A646]/20">
              <span className="text-[#39291F]/60 block mb-0.5">{t('servingsInfo')}</span>
              <span className="font-bold text-[#39291F] flex items-center justify-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#315C45]" />
                {dish.servings}
              </span>
            </div>
            <div className="p-2 rounded-xl bg-[#FFF8ED] border border-[#D4A646]/20">
              <span className="text-[#39291F]/60 block mb-0.5">{t('difficultyInfo')}</span>
              <span className="font-bold text-[#B83227] flex items-center justify-center gap-1">
                <ChefHat className="w-3.5 h-3.5" />
                {language === 'vi' ? dish.difficulty : dish.difficultyEn}
              </span>
            </div>
            <div className="col-span-2 sm:col-span-1 p-2 rounded-xl bg-[#FFF8ED] border border-[#D4A646]/20">
              <span className="text-[#39291F]/60 block mb-0.5">{t('caloriesInfo')}</span>
              <span className="font-bold text-[#39291F]">{dish.calories}</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="px-6 pt-6 flex border-b border-[#D4A646]/30 space-x-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 px-4 font-bold text-sm border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'overview'
                  ? 'border-[#B83227] text-[#B83227]'
                  : 'border-transparent text-[#39291F]/70 hover:text-[#B83227]'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{language === 'vi' ? 'Tổng quan & Hương vị' : 'Overview & Flavors'}</span>
            </button>
            <button
              onClick={() => setActiveTab('recipe')}
              className={`pb-3 px-4 font-bold text-sm border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'recipe'
                  ? 'border-[#B83227] text-[#B83227]'
                  : 'border-transparent text-[#39291F]/70 hover:text-[#B83227]'
              }`}
            >
              <Utensils className="w-4 h-4" />
              <span>{language === 'vi' ? 'Nguyên liệu & Chế biến' : 'Recipe & Cooking'}</span>
            </button>
            <button
              onClick={() => setActiveTab('culture')}
              className={`pb-3 px-4 font-bold text-sm border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'culture'
                  ? 'border-[#B83227] text-[#B83227]'
                  : 'border-transparent text-[#39291F]/70 hover:text-[#B83227]'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>{language === 'vi' ? 'Lịch sử & Địa chỉ quán' : 'History & Places'}</span>
            </button>
          </div>

          {/* Modal Tab Body Content */}
          <div className="p-6 sm:p-8 space-y-8">
            
            {/* TAB 1: OVERVIEW & FLAVORS */}
            {activeTab === 'overview' && (
              <div className="space-y-8 animate-fade-in">
                
                {/* Description */}
                <div>
                  <h3 className="font-serif font-bold text-xl text-[#39291F] mb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#D4A646]" />
                    <span>{language === 'vi' ? 'Giới thiệu tinh hoa món ăn' : 'Culinary Overview'}</span>
                  </h3>
                  <p className="text-base text-[#39291F]/90 leading-relaxed font-light">
                    {language === 'vi' ? dish.description : dish.descriptionEn}
                  </p>
                </div>

                {/* Taste Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {(language === 'vi' ? dish.tasteTags : dish.tasteTagsEn).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-full bg-[#D4A646]/15 border border-[#D4A646]/40 text-[#39291F] text-xs font-semibold"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Flavor Profile Bars */}
                <div className="bg-white p-6 rounded-2xl border border-[#D4A646]/30 shadow-xs">
                  <h4 className="font-serif font-bold text-base text-[#39291F] mb-4">
                    {t('flavorCharacteristics')}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-[#39291F] mb-1">
                        <span>{language === 'vi' ? 'Vị Ngọt (Sweet)' : 'Sweet'}</span>
                        <span className="text-[#D4A646] font-bold">{dish.flavorProfile.sweet}/5</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className="h-full bg-[#D4A646] rounded-full"
                          style={{ width: `${(dish.flavorProfile.sweet / 5) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold text-[#39291F] mb-1">
                        <span>{language === 'vi' ? 'Vị Chua (Sour)' : 'Sour'}</span>
                        <span className="text-[#D4A646] font-bold">{dish.flavorProfile.sour}/5</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className="h-full bg-[#315C45] rounded-full"
                          style={{ width: `${(dish.flavorProfile.sour / 5) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold text-[#39291F] mb-1">
                        <span>{language === 'vi' ? 'Vị Mặn (Salty)' : 'Salty'}</span>
                        <span className="text-[#D4A646] font-bold">{dish.flavorProfile.salty}/5</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className="h-full bg-[#39291F] rounded-full"
                          style={{ width: `${(dish.flavorProfile.salty / 5) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold text-[#39291F] mb-1">
                        <span>{language === 'vi' ? 'Vị Cay (Spicy)' : 'Spicy'}</span>
                        <span className="text-[#B83227] font-bold">{dish.flavorProfile.spicy}/5</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className="h-full bg-[#B83227] rounded-full"
                          style={{ width: `${(dish.flavorProfile.spicy / 5) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold text-[#39291F] mb-1">
                        <span>{language === 'vi' ? 'Đậm Đà / Umami' : 'Umami Savory'}</span>
                        <span className="text-[#D4A646] font-bold">{dish.flavorProfile.umami}/5</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className="h-full bg-[#D4A646] rounded-full"
                          style={{ width: `${(dish.flavorProfile.umami / 5) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold text-[#39291F] mb-1">
                        <span>{language === 'vi' ? 'Hương Thảo Mộc' : 'Herbal Nuances'}</span>
                        <span className="text-[#315C45] font-bold">{dish.flavorProfile.herbal}/5</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className="h-full bg-[#315C45] rounded-full"
                          style={{ width: `${(dish.flavorProfile.herbal / 5) * 100}%` }}
                        />
                      </div>
                    </div>

                  </div>
                </div>

                {/* Cultural Significance preview */}
                <div className="bg-[#FFF8ED] p-5 rounded-2xl border-l-4 border-[#B83227] shadow-xs">
                  <h4 className="font-serif font-bold text-base text-[#B83227] mb-1">
                    {t('culturalMeaning')}
                  </h4>
                  <p className="text-sm text-[#39291F]/90 leading-relaxed">
                    {language === 'vi' ? dish.culturalSignificance : dish.culturalSignificanceEn}
                  </p>
                </div>
              </div>
            )}

            {/* TAB 2: RECIPE & COOKING */}
            {activeTab === 'recipe' && (
              <div className="space-y-8 animate-fade-in">
                
                {/* Ingredients List */}
                <div>
                  <h3 className="font-serif font-bold text-xl text-[#39291F] mb-4 flex items-center gap-2">
                    <Utensils className="w-5 h-5 text-[#B83227]" />
                    <span>{t('mainIngredients')}</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {dish.ingredients.map((ing, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#D4A646]/25 shadow-xs"
                      >
                        <span className="text-sm font-medium text-[#39291F] flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[#315C45] shrink-0" />
                          {language === 'vi' ? ing.name : ing.nameEn}
                        </span>
                        <span className="text-xs font-bold text-[#B83227] px-2.5 py-1 rounded-md bg-[#B83227]/10">
                          {ing.amount}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step-by-Step Cooking Steps */}
                <div className="pt-4 border-t border-[#D4A646]/20">
                  <h3 className="font-serif font-bold text-xl text-[#39291F] mb-6 flex items-center gap-2">
                    <ChefHat className="w-5 h-5 text-[#D4A646]" />
                    <span>{t('cookingSteps')}</span>
                  </h3>

                  <div className="space-y-6">
                    {dish.steps.map((st) => (
                      <div key={st.step} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-[#B83227] text-white font-serif font-bold flex items-center justify-center text-sm shadow-md shrink-0">
                            {st.step}
                          </div>
                          {st.step < dish.steps.length && (
                            <div className="w-0.5 flex-1 bg-[#D4A646]/40 my-2" />
                          )}
                        </div>

                        <div className="flex-1 bg-white p-4 rounded-2xl border border-[#D4A646]/25 shadow-xs space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-base text-[#39291F]">
                              {language === 'vi' ? st.title : st.titleEn}
                            </h4>
                            {st.time && (
                              <span className="text-xs font-semibold text-[#315C45] bg-[#315C45]/10 px-2 py-0.5 rounded">
                                {st.time}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-[#39291F]/80 leading-relaxed font-light">
                            {language === 'vi' ? st.description : st.descriptionEn}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 3: CULTURE, HISTORY & FAMOUS PLACES */}
            {activeTab === 'culture' && (
              <div className="space-y-8 animate-fade-in">
                
                {/* History */}
                <div>
                  <h3 className="font-serif font-bold text-xl text-[#39291F] mb-3 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#B83227]" />
                    <span>{t('originHistory')}</span>
                  </h3>
                  <div className="bg-white p-6 rounded-2xl border border-[#D4A646]/30 shadow-xs space-y-3">
                    <p className="text-sm sm:text-base text-[#39291F]/90 leading-relaxed font-light">
                      {language === 'vi' ? dish.history : dish.historyEn}
                    </p>
                  </div>
                </div>

                {/* Cultural Significance */}
                <div>
                  <h3 className="font-serif font-bold text-xl text-[#39291F] mb-3 flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#D4A646]" />
                    <span>{t('culturalMeaning')}</span>
                  </h3>
                  <div className="bg-[#FFF8ED] p-6 rounded-2xl border border-[#D4A646]/40 shadow-xs">
                    <p className="text-sm sm:text-base text-[#39291F]/90 leading-relaxed font-light">
                      {language === 'vi' ? dish.culturalSignificance : dish.culturalSignificanceEn}
                    </p>
                  </div>
                </div>

                {/* Famous Places */}
                <div>
                  <h3 className="font-serif font-bold text-xl text-[#39291F] mb-4 flex items-center gap-2">
                    <Compass className="w-5 h-5 text-[#315C45]" />
                    <span>{t('famousAddresses')}</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {dish.famousPlaces.map((pl, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-4 rounded-2xl border border-[#D4A646]/30 shadow-xs space-y-1"
                      >
                        <h4 className="font-bold text-base text-[#B83227]">{pl.name}</h4>
                        <p className="text-xs text-[#39291F]/80 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#D4A646] shrink-0" />
                          <span>{pl.address}, {pl.city}</span>
                        </p>
                        {pl.note && (
                          <p className="text-xs text-[#315C45] italic pt-1">
                            • {pl.note}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* RELATED DISHES SECTION */}
            {relatedDishes.length > 0 && (
              <div className="pt-8 border-t border-[#D4A646]/30">
                <h3 className="font-serif font-bold text-lg text-[#39291F] mb-4">
                  {t('relatedDishes')}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedDishes.map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => onSelectRelatedDish(rel)}
                      className="group/rel bg-white p-3 rounded-2xl border border-[#D4A646]/25 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center gap-3"
                    >
                      <img
                        src={rel.imageUrl}
                        alt={rel.name}
                        className="w-16 h-16 rounded-xl object-cover shrink-0 group-hover/rel:scale-105 transition-transform"
                      />
                      <div className="overflow-hidden">
                        <h4 className="font-serif font-bold text-sm text-[#39291F] group-hover/rel:text-[#B83227] transition-colors truncate">
                          {rel.name}
                        </h4>
                        <span className="text-[11px] text-[#315C45] font-medium block">
                          {rel.province}
                        </span>
                        <span className="text-[10px] text-[#B83227] font-semibold flex items-center gap-0.5 mt-0.5">
                          <span>Xem ngay</span>
                          <ArrowRight className="w-2.5 h-2.5" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
