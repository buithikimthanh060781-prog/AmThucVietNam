import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, Mail, Phone, MapPin, Send, 
  Heart, CheckCircle2 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { language, t } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-[#39291F] text-[#FFF8ED] relative overflow-hidden pt-16 pb-12 border-t-4 border-[#D4A646]">
      
      {/* Subtle Drum / Star overlay in background */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-5 pointer-events-none -translate-y-1/2 translate-x-1/2">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-[#D4A646]">
          <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="2" />
          <polygon points="50,15 58,35 80,35 62,49 69,70 50,56 31,70 38,49 20,35 42,35" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Newsletter Section */}
        <div className="bg-[#483528] rounded-3xl p-6 sm:p-10 mb-16 border border-[#D4A646]/30 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D4A646] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Cẩm Nang Ẩm Thực Việt
              </span>
              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white">
                {t('newsletterTitle')}
              </h3>
              <p className="text-sm text-[#FFF8ED]/80 leading-relaxed font-light">
                {t('newsletterDesc')}
              </p>
            </div>

            <div className="lg:col-span-5">
              {isSubscribed ? (
                <div className="p-4 rounded-2xl bg-[#315C45] text-white flex items-center gap-3 animate-fade-in shadow-md">
                  <CheckCircle2 className="w-6 h-6 text-[#D4A646] shrink-0" />
                  <span className="text-sm font-semibold">{t('subscribeSuccess')}</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Mail className="w-4 h-4 text-[#D4A646]" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('newsletterPlaceholder')}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#39291F] text-white placeholder-white/40 text-sm border border-[#D4A646]/40 focus:outline-none focus:ring-2 focus:ring-[#D4A646]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-[#B83227] hover:bg-[#8F221A] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{t('newsletterBtn')}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

        {/* 4 Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-full bg-[#B83227] flex items-center justify-center text-[#D4A646] shadow-md border border-[#D4A646]/50">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#D4A646" strokeWidth="3" />
                  <polygon points="50,15 58,35 80,35 62,49 69,70 50,56 31,70 38,49 20,35 42,35" fill="#D4A646" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-xl text-white tracking-tight">
                  {t('siteTitle')}
                </span>
                <span className="text-[10px] text-[#D4A646] tracking-widest uppercase">
                  Bản Sắc Văn Hóa Việt
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-[#FFF8ED]/75 leading-relaxed font-light">
              {t('footerDesc')}
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="#facebook"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#B83227] text-white flex items-center justify-center transition-all border border-white/15 shadow-xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="#youtube"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#B83227] text-white flex items-center justify-center transition-all border border-white/15 shadow-xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href="#instagram"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#B83227] text-white flex items-center justify-center transition-all border border-white/15 shadow-xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif font-bold text-base text-[#D4A646] uppercase tracking-wider">
              {t('quickLinks')}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-light text-[#FFF8ED]/85">
              <li>
                <Link to="/" className="hover:text-[#D4A646] transition-colors">
                  {t('navHome')}
                </Link>
              </li>
              <li>
                <Link to="/regions" className="hover:text-[#D4A646] transition-colors">
                  {t('navRegions')}
                </Link>
              </li>
              <li>
                <Link to="/specialties" className="hover:text-[#D4A646] transition-colors">
                  {t('navSpecialties')}
                </Link>
              </li>
              <li>
                <Link to="/map" className="hover:text-[#D4A646] transition-colors">
                  {t('navMap')}
                </Link>
              </li>
              <li>
                <Link to="/stories" className="hover:text-[#D4A646] transition-colors">
                  {t('navStories')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif font-bold text-base text-[#D4A646] uppercase tracking-wider">
              {t('culinaryCategories')}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-light text-[#FFF8ED]/85">
              <li>
                <Link to="/specialties?category=noodles" className="hover:text-[#D4A646] transition-colors">
                  Món Nước, Phở & Bún Cổ Truyền
                </Link>
              </li>
              <li>
                <Link to="/specialties?category=rolls_cakes" className="hover:text-[#D4A646] transition-colors">
                  Bánh Xèo, Bánh Cuốn & Gỏi Cuốn
                </Link>
              </li>
              <li>
                <Link to="/specialties?category=rice" className="hover:text-[#D4A646] transition-colors">
                  Cơm Tấm, Cơm Hến & Xôi Nếp
                </Link>
              </li>
              <li>
                <Link to="/specialties?category=grilled_fried" className="hover:text-[#D4A646] transition-colors">
                  Chả Cá Lã Vọng & Bún Chả Que Tre
                </Link>
              </li>
              <li>
                <Link to="/specialties?category=hotpot_soups" className="hover:text-[#D4A646] transition-colors">
                  Lẩu Mắm & Cá Kho Tộ Nam Bộ
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif font-bold text-base text-[#D4A646] uppercase tracking-wider">
              {t('contactInfo')}
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm font-light text-[#FFF8ED]/85">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4A646] shrink-0 mt-0.5" />
                <span>36 Phố Cổ, Hoàn Kiếm, Hà Nội & Quận 1, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4A646] shrink-0" />
                <span>Hotline: 1900 8866 (Hỗ trợ du lịch)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4A646] shrink-0" />
                <span>contact@tinhhoamthucviet.vn</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Heritage Badge */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FFF8ED]/60 gap-4 text-center sm:text-left">
          <p>© 2026 Tinh Hoa Ẩm Thực Việt. {t('copyright')}</p>
          <div className="flex items-center gap-2 text-[#D4A646]">
            <span>Được xây dựng với tình yêu ẩm thực quê hương</span>
            <Heart className="w-4 h-4 fill-[#B83227] text-[#B83227]" />
          </div>
        </div>

      </div>
    </footer>
  );
};
