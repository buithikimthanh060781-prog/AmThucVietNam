import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useLanguage } from './LanguageContext';

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (dishId: string, dishName?: string) => void;
  isFavorite: (dishId: string) => boolean;
  clearFavorites: () => void;
  toast: string | null;
  dismissToast: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language } = useLanguage();
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tinhhoa_favorites');
      return saved ? JSON.parse(saved) : ['pho-ha-noi', 'bun-bo-hue', 'com-tam-sai-gon'];
    } catch {
      return ['pho-ha-noi', 'bun-bo-hue', 'com-tam-sai-gon'];
    }
  });

  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('tinhhoa_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#B83227', '#D4A646', '#315C45', '#FFF8ED']
      });
    } catch {
      // fallback if canvas not available
    }
  };

  const toggleFavorite = (dishId: string, dishName?: string) => {
    setFavorites(prev => {
      const exists = prev.includes(dishId);
      if (exists) {
        const next = prev.filter(id => id !== dishId);
        const msg = language === 'vi' 
          ? `Đã bỏ lưu món ${dishName || 'này'}` 
          : `Removed ${dishName || 'dish'} from saved list`;
        setToast(msg);
        return next;
      } else {
        const next = [...prev, dishId];
        triggerConfetti();
        const msg = language === 'vi' 
          ? `Đã lưu món ${dishName || 'này'} vào danh sách yêu thích!` 
          : `Saved ${dishName || 'dish'} to your favorites!`;
        setToast(msg);
        return next;
      }
    });

    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  const isFavorite = (dishId: string) => favorites.includes(dishId);

  const clearFavorites = () => {
    setFavorites([]);
    setToast(language === 'vi' ? 'Đã xóa tất cả món yêu thích' : 'Cleared all saved dishes');
    setTimeout(() => setToast(null), 2500);
  };

  const dismissToast = () => setToast(null);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, clearFavorites, toast, dismissToast }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
