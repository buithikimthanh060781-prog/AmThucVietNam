import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Sparkles, Award, MapPin, UtensilsCrossed } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Hero: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Image with cultural overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=2000&q=85"
          alt="Bàn tiệc ẩm thực Việt Nam truyền thống"
          className="w-full h-full object-cover object-center filter brightness-[0.82] scale-105 animate-subtle-zoom"
          loading="eager"
        />
        {/* Multilayer gradient for optimal typography readability and cultural warm tone */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#39291F]/90 via-[#39291F]/70 to-[#39291F]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FFF8ED] via-transparent to-black/40" />
        
        {/* Subtle Drum / Lotus Overlay SVG pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4A646_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 text-center lg:text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-8 space-y-6">
            {/* Cultural Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#B83227]/90 text-[#FFF8ED] text-xs sm:text-sm font-semibold tracking-wide border border-[#D4A646]/60 shadow-lg backdrop-blur-sm animate-fade-in">
              <Sparkles className="w-4 h-4 text-[#D4A646] animate-spin-slow" />
              <span>{t('heroBadge')}</span>
              <span className="hidden sm:inline text-[#D4A646]">•</span>
              <span className="hidden sm:inline font-normal text-white/90">Bắc – Trung – Nam</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.12] drop-shadow-md">
              {language === 'vi' ? (
                <>
                  Khám Phá <span className="text-[#D4A646] italic font-normal">Tinh Hoa</span> <br />
                  Ẩm Thực <span className="underline decoration-[#B83227] decoration-4 underline-offset-8">Việt Nam</span>
                </>
              ) : (
                <>
                  Discover the <span className="text-[#D4A646] italic font-normal">Essence</span> <br />
                  of <span className="underline decoration-[#B83227] decoration-4 underline-offset-8">Vietnamese Cuisine</span>
                </>
              )}
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-[#FFF8ED]/95 max-w-2xl leading-relaxed font-light drop-shadow">
              {t('heroDesc')}
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/specialties"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#B83227] text-white text-base font-bold shadow-xl hover:bg-[#8F221A] hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all border border-[#D4A646]/40 group"
              >
                <span>{t('btnExploreNow')}</span>
                <ArrowRight className="w-5 h-5 text-[#D4A646] group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/regions"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white/20 backdrop-blur-md text-white text-base font-semibold border border-white/40 hover:bg-white/30 hover:border-[#D4A646] active:scale-95 transition-all shadow-lg"
              >
                <Compass className="w-5 h-5 text-[#D4A646]" />
                <span>{t('btnView3Regions')}</span>
              </Link>
            </div>

            {/* Stats row */}
            <div className="pt-6 border-t border-white/20 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left">
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/15">
                <div className="text-2xl sm:text-3xl font-bold font-serif text-[#D4A646]">63</div>
                <div className="text-xs text-[#FFF8ED]/80 font-medium">{t('statProvinces')}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/15">
                <div className="text-2xl sm:text-3xl font-bold font-serif text-[#D4A646]">100+</div>
                <div className="text-xs text-[#FFF8ED]/80 font-medium">{t('statDishes')}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/15">
                <div className="text-2xl sm:text-3xl font-bold font-serif text-[#D4A646]">3 Vùng</div>
                <div className="text-xs text-[#FFF8ED]/80 font-medium">Bắc • Trung • Nam</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/15">
                <div className="text-2xl sm:text-3xl font-bold font-serif text-[#D4A646]">Top 50</div>
                <div className="text-xs text-[#FFF8ED]/80 font-medium">{language === 'vi' ? 'Thế giới CNN & UNESCO' : 'World Acclaimed'}</div>
              </div>
            </div>
          </div>

          {/* Right Floating Highlight Card */}
          <div className="lg:col-span-4 hidden lg:flex flex-col items-center">
            <div className="w-full max-w-sm bg-[#FFF8ED]/95 backdrop-blur-md p-6 rounded-3xl shadow-2xl border-2 border-[#D4A646]/50 transform hover:-translate-y-1 transition-all">
              <div className="relative rounded-2xl overflow-hidden mb-4 aspect-4/3 shadow-inner">
                <img
                  src="https://images.unsplash.com/photo-1594998893017-36147cbcae05?auto=format&fit=crop&w=800&q=80"
                  alt="Bún chả Hà Nội nướng than hoa"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 px-3 py-1 bg-[#B83227] text-white text-xs font-bold rounded-full shadow-md">
                  Món Gợi Ý Hôm Nay
                </span>
                <span className="absolute bottom-3 right-3 px-2.5 py-1 bg-[#39291F]/90 backdrop-blur-sm text-[#D4A646] text-xs font-bold rounded-md flex items-center gap-1">
                  ★ 4.9 (1.4k)
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-[#315C45] font-semibold">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#B83227]" />
                    Hà Nội • Miền Bắc
                  </span>
                  <span className="text-[#39291F]/60">Nướng than hoa</span>
                </div>
                <h2 className="font-serif font-bold text-xl text-[#39291F]">Bún Chả Đất Kinh Kỳ</h2>
                <p className="text-xs text-[#39291F]/80 line-clamp-2">
                  Thịt ba chỉ thơm nức khói than hồng, chấm nước mắm chua ngọt ấm nồng và đu đủ ngâm giòn tan.
                </p>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#B83227] flex items-center gap-1">
                    <UtensilsCrossed className="w-3.5 h-3.5" />
                    Quốc hồn ẩm thực
                  </span>
                  <Link
                    to="/specialties"
                    className="text-xs font-bold text-[#B83227] hover:text-[#8F221A] flex items-center gap-1 group"
                  >
                    <span>Khám phá ngay</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Recognition note */}
            <div className="mt-4 flex items-center gap-2 text-xs text-[#FFF8ED]/85 bg-black/30 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10">
              <Award className="w-4 h-4 text-[#D4A646]" />
              <span>Được vinh danh bởi Michelin & CNN Travel</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
