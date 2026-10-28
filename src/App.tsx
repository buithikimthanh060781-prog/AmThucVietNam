import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { FavoritesProvider, useFavorites } from './context/FavoritesContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { DishDetailModal } from './components/DishDetailModal';
import { HomePage } from './pages/HomePage';
import { RegionsPage } from './pages/RegionsPage';
import { SpecialtiesPage } from './pages/SpecialtiesPage';
import { MapPage } from './pages/MapPage';
import { StoriesPage } from './pages/StoriesPage';
import { ContactPage } from './pages/ContactPage';
import { Dish } from './types';
import { CheckCircle2, X } from 'lucide-react';

// Scroll to top helper on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Toast notification component connected to Favorites
const GlobalToast = () => {
  const { toast, dismissToast } = useFavorites();
  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce">
      <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#39291F] text-[#FFF8ED] shadow-2xl border border-[#D4A646]/60">
        <CheckCircle2 className="w-5 h-5 text-[#D4A646] shrink-0" />
        <span className="text-xs sm:text-sm font-semibold">{toast}</span>
        <button
          onClick={dismissToast}
          className="ml-2 p-1 text-white/60 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// Main App Layout Content
const AppContent: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [activeModalDish, setActiveModalDish] = useState<Dish | null>(null);

  // Global keyboard shortcut to open search with '/'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#FFF8ED] text-[#39291F]">
      <ScrollToTop />
      
      {/* Header */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
      />

      {/* Main Page Routing */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/regions" element={<RegionsPage />} />
          <Route path="/specialties" element={<SpecialtiesPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/stories" element={<StoriesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectDish={(dish) => setActiveModalDish(dish)}
      />

      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        onSelectDish={(dish) => setActiveModalDish(dish)}
      />

      <DishDetailModal
        dish={activeModalDish}
        onClose={() => setActiveModalDish(null)}
        onSelectRelatedDish={(related) => setActiveModalDish(related)}
      />

      {/* Global Toast */}
      <GlobalToast />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <FavoritesProvider>
        <HashRouter>
          <AppContent />
        </HashRouter>
      </FavoritesProvider>
    </LanguageProvider>
  );
}
