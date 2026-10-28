import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, Menu, X, Globe, Sparkles, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useFavorites } from '../context/FavoritesContext';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenFavorites: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch, onOpenFavorites }) => {
  const { language, toggleLanguage, t } = useLanguage();
  const { favorites } = useFavorites();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { path: '/', label: t('navHome') },
    { path: '/regions', label: t('navRegions') },
    { path: '/specialties', label: t('navSpecialties') },
    { path: '/map', label: t('navMap') },
    { path: '/stories', label: t('navStories') },
    { path: '/contact', label: t('navContact') },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FFF8ED]/95 backdrop-blur-md shadow-md py-3 border-b border-[#D4A646]/30'
            : 'bg-[#FFF8ED]/80 backdrop-blur-sm py-4 border-b border-[#D4A646]/20'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#B83227] flex items-center justify-center text-[#D4A646] shadow-md border border-[#D4A646]/50 group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#D4A646" strokeWidth="3" />
                  <circle cx="50" cy="50" r="35" fill="none" stroke="#D4A646" strokeWidth="1.5" strokeDasharray="3 3" />
                  {/* Dong son star symbol */}
                  <polygon points="50,15 58,35 80,35 62,49 69,70 50,56 31,70 38,49 20,35 42,35" fill="#D4A646" />
                  <circle cx="50" cy="50" r="8" fill="#FFF8ED" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-lg sm:text-xl md:text-2xl text-[#B83227] tracking-tight group-hover:text-[#8F221A] transition-colors leading-tight">
                  {t('siteTitle')}
                </span>
                <span className="text-[11px] sm:text-xs text-[#315C45] font-medium tracking-widest uppercase flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#D4A646]" />
                  {t('siteSubtitle')}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-[#B83227] text-white shadow-sm'
                        : 'text-[#39291F] hover:text-[#B83227] hover:bg-[#D4A646]/10'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Actions: Search, Favorites, Language Switcher, Mobile Toggle */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Search button */}
              <button
                onClick={onOpenSearch}
                aria-label="Tìm kiếm món ăn"
                className="p-2 sm:px-3 sm:py-1.5 rounded-full text-[#39291F] hover:text-[#B83227] hover:bg-[#D4A646]/15 transition-all flex items-center space-x-1.5 border border-[#D4A646]/30 bg-white/60 shadow-xs"
              >
                <Search className="w-4 h-4 text-[#B83227]" />
                <span className="hidden md:inline text-xs font-medium text-[#39291F]/80">
                  {language === 'vi' ? 'Tìm món...' : 'Search...'}
                </span>
              </button>

              {/* Favorites Drawer button */}
              <button
                onClick={onOpenFavorites}
                aria-label="Món yêu thích"
                className="relative p-2 rounded-full text-[#39291F] hover:text-[#B83227] hover:bg-[#D4A646]/15 transition-all border border-[#D4A646]/30 bg-white/60 shadow-xs"
                title={t('navFavorites')}
              >
                <Heart className={`w-4 h-4 ${favorites.length > 0 ? 'fill-[#B83227] text-[#B83227]' : 'text-[#39291F]'}`} />
                {favorites.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#B83227] text-white text-[11px] font-bold flex items-center justify-center shadow-xs animate-pulse">
                    {favorites.length}
                  </span>
                )}
              </button>

              {/* Language Switcher */}
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-full bg-[#315C45] text-white text-xs font-semibold hover:bg-[#20402F] transition-all shadow-xs"
                title={language === 'vi' ? 'Chuyển sang Tiếng Anh' : 'Switch to Vietnamese'}
              >
                <Globe className="w-3.5 h-3.5 text-[#D4A646]" />
                <span className="font-bold">{language === 'vi' ? 'VN' : 'EN'}</span>
                <span className="text-[10px] opacity-75 font-normal">| {language === 'vi' ? 'EN' : 'VI'}</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Menu"
                className="lg:hidden p-2 rounded-lg text-[#39291F] hover:text-[#B83227] hover:bg-[#D4A646]/20 transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#FFF8ED] border-b border-[#D4A646]/30 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-4 py-2.5 rounded-xl text-base font-medium flex items-center justify-between ${
                      isActive
                        ? 'bg-[#B83227] text-white font-semibold'
                        : 'text-[#39291F] hover:bg-[#D4A646]/15 hover:text-[#B83227]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <Sparkles className="w-4 h-4 text-[#D4A646]" />}
                  </Link>
                );
              })}

              <div className="pt-3 border-t border-[#D4A646]/20 flex items-center justify-between px-2 text-sm text-[#39291F]/80">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#B83227]" />
                  Ẩm thực 63 tỉnh thành
                </span>
                <button
                  onClick={toggleLanguage}
                  className="text-xs font-bold text-[#B83227] underline"
                >
                  {language === 'vi' ? 'English Version' : 'Tiếng Việt'}
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
