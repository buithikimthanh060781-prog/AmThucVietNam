import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'vi' | 'en';

interface Translations {
  [key: string]: {
    vi: string;
    en: string;
  };
}

export const TRANSLATIONS: Translations = {
  // Navigation
  siteTitle: { vi: 'Tinh Hoa Ẩm Thực Việt', en: 'Essence of Vietnamese Cuisine' },
  siteSubtitle: { vi: 'Hương Vị 3 Miền', en: 'Flavors of 3 Regions' },
  navHome: { vi: 'Trang chủ', en: 'Home' },
  navRegions: { vi: 'Ẩm thực 3 miền', en: '3 Regions' },
  navSpecialties: { vi: 'Đặc sản nổi bật', en: 'Specialties' },
  navExplore: { vi: 'Khám phá món ăn', en: 'Explore Dishes' },
  navMap: { vi: 'Bản đồ ẩm thực', en: 'Culinary Map' },
  navStories: { vi: 'Câu chuyện ẩm thực', en: 'Food Stories' },
  navFavorites: { vi: 'Món yêu thích', en: 'Saved Dishes' },
  navContact: { vi: 'Liên hệ', en: 'Contact' },
  
  // Hero
  heroBadge: { vi: 'Di Sản Ẩm Thực Quốc Gia & Thế Giới', en: 'National & Global Culinary Heritage' },
  heroTitle: { vi: 'Khám Phá Tinh Hoa Ẩm Thực Việt Nam', en: 'Discover the Essence of Vietnamese Cuisine' },
  heroDesc: {
    vi: 'Hành trình khám phá hương vị truyền thống, nét đẹp văn hóa và những món ăn đặc sắc từ Bắc vào Nam.',
    en: 'A sensory journey through time-honored flavors, cultural traditions, and signature specialties from North to South.'
  },
  btnExploreNow: { vi: 'Khám phá ngay', en: 'Explore Now' },
  btnView3Regions: { vi: 'Xem đặc sản 3 miền', en: 'Discover 3 Regions' },
  statProvinces: { vi: '63 Tỉnh Thành', en: '63 Provinces' },
  statDishes: { vi: '100+ Đặc Sản', en: '100+ Specialties' },
  statHeritage: { vi: 'Di Sản Văn Hóa', en: 'Cultural Heritage' },
  statFlavors: { vi: 'Ngũ Vị Hài Hòa', en: '5 Harmonious Tastes' },

  // Regions section
  regionsTitle: { vi: 'Khám Phá Ẩm Thực 3 Miền', en: 'Explore 3 Regional Cuisines' },
  regionsSubtitle: {
    vi: 'Mỗi miền đất là một kho tàng hương vị độc bản, phản chiếu địa lý, khí hậu và cốt cách con người Việt',
    en: 'Each region represents a unique flavor universe reflecting landscape, climate, and the Vietnamese spirit'
  },
  regionNorth: { vi: 'Miền Bắc', en: 'Northern Vietnam' },
  regionNorthTagline: { vi: 'Thanh tao, tinh tế & chuẩn mực ngàn năm', en: 'Delicate, refined & timeless harmony' },
  regionCentral: { vi: 'Miền Trung', en: 'Central Vietnam' },
  regionCentralTagline: { vi: 'Đậm đà, cay nồng & phong vị cung đình', en: 'Bold, spicy & imperial grandeur' },
  regionSouth: { vi: 'Miền Nam', en: 'Southern Vietnam' },
  regionSouthTagline: { vi: 'Hào sảng, ngọt lành & trù phú sông nước', en: 'Generous, sweet & vibrant waterways' },
  btnExploreRegion: { vi: 'Khám phá miền này', en: 'Explore Region' },

  // Featured Specialties
  featuredTitle: { vi: 'Đặc Sản Nổi Bật', en: 'Signature Specialties' },
  featuredSubtitle: {
    vi: 'Những món ăn nức tiếng đã làm say lòng hàng triệu thực khách trong nước và quốc tế',
    en: 'Acclaimed masterpieces that have captivated millions of diners worldwide'
  },
  btnViewDetail: { vi: 'Xem chi tiết món', en: 'View Details' },
  allDishes: { vi: 'Tất cả món', en: 'All Dishes' },

  // Filters
  filterAll: { vi: 'Tất cả', en: 'All' },
  filterRegion: { vi: 'Chọn vùng miền', en: 'Select Region' },
  filterCategory: { vi: 'Loại món ăn', en: 'Dish Category' },
  filterProvince: { vi: 'Tỉnh thành', en: 'Province / City' },
  searchPlaceholder: { vi: 'Tìm món ăn (phở, bún chả, cơm tấm, bánh xèo...)...', en: 'Search dishes (pho, bun cha, broken rice...)...' },
  sortBy: { vi: 'Sắp xếp theo', en: 'Sort by' },
  sortPopular: { vi: 'Phổ biến nhất', en: 'Most Popular' },
  sortRating: { vi: 'Đánh giá cao nhất', en: 'Highest Rated' },
  sortFast: { vi: 'Nấu nhanh nhất', en: 'Fastest Prep' },
  noResults: { vi: 'Không tìm thấy món ăn phù hợp với bộ lọc.', en: 'No dishes found matching your criteria.' },
  resetFilters: { vi: 'Đặt lại bộ lọc', en: 'Reset Filters' },

  // Dish details
  originHistory: { vi: 'Nguồn gốc & Lịch sử', en: 'Origin & History' },
  culturalMeaning: { vi: 'Ý nghĩa văn hóa', en: 'Cultural Significance' },
  flavorCharacteristics: { vi: 'Hương vị đặc trưng', en: 'Flavor Characteristics' },
  mainIngredients: { vi: 'Nguyên liệu chính', en: 'Key Ingredients' },
  cookingSteps: { vi: 'Quy trình chế biến', en: 'Preparation & Steps' },
  famousAddresses: { vi: 'Địa chỉ thưởng thức nức tiếng', en: 'Famous Historic Places to Eat' },
  relatedDishes: { vi: 'Món ăn cùng phong vị', en: 'Similar Signature Dishes' },
  prepInfo: { vi: 'Thời gian chuẩn bị', en: 'Prep Time' },
  cookInfo: { vi: 'Thời gian nấu', en: 'Cook Time' },
  servingsInfo: { vi: 'Khẩu phần', en: 'Servings' },
  difficultyInfo: { vi: 'Độ khó', en: 'Difficulty' },
  caloriesInfo: { vi: 'Năng lượng', en: 'Calories' },

  // Map
  mapTitle: { vi: 'Bản Đồ Ẩm Thực Tương Tác', en: 'Interactive Culinary Map' },
  mapSubtitle: {
    vi: 'Nhấp chọn các địa phương trên dải đất hình chữ S để khám phá đặc sản trứ danh',
    en: 'Click on key provinces across the S-shaped coastline to discover local delicacies'
  },
  selectProvinceHint: { vi: 'Chọn một tỉnh / thành phố trên bản đồ để xem đặc sản', en: 'Select a province/city on the map to view signature foods' },
  specialtiesIn: { vi: 'Đặc sản trứ danh tại', en: 'Signature specialties in' },

  // Stories
  storiesTitle: { vi: 'Góc Văn Hóa Ẩm Thực', en: 'Vietnamese Culinary Heritage' },
  storiesSubtitle: {
    vi: 'Những câu chuyện lịch sử, phong tục cổ truyền và triết lý ẩn sâu trong từng món ăn',
    en: 'Historical tales, customs, and deep philosophy woven into every dish'
  },
  readArticle: { vi: 'Đọc câu chuyện', en: 'Read Story' },
  closeModal: { vi: 'Đóng lại', en: 'Close' },

  // Favorites
  myFavorites: { vi: 'Món Ăn Yêu Thích Của Bạn', en: 'Your Saved Favorites' },
  noFavoritesYet: { vi: 'Bạn chưa lưu món ăn nào. Hãy thả tim các món bạn yêu thích để xem lại sau!', en: 'You haven’t saved any dishes yet. Tap the heart icon on any dish to save it here!' },
  removeAllFavorites: { vi: 'Xóa toàn bộ', en: 'Clear All' },

  // Footer
  footerDesc: {
    vi: 'Chuyên trang quảng bá tinh hoa đặc sản ẩm thực 63 tỉnh thành Việt Nam. Kết nối hương vị truyền thống ngàn năm tới bạn bè quốc tế.',
    en: 'Dedicated to promoting the culinary essence of 63 Vietnamese provinces, connecting centuries of authentic flavors to the world.'
  },
  quickLinks: { vi: 'Liên kết nhanh', en: 'Quick Links' },
  culinaryCategories: { vi: 'Danh mục ẩm thực', en: 'Categories' },
  contactInfo: { vi: 'Thông tin liên hệ', en: 'Contact Info' },
  copyright: { vi: 'Bảo lưu mọi quyền. Tôn vinh Di sản Ẩm thực Dân tộc Việt Nam.', en: 'All rights reserved. Celebrating Vietnamese National Culinary Heritage.' },
  newsletterTitle: { vi: 'Đăng Ký Nhận Cẩm Nang Ẩm Thực', en: 'Subscribe to Culinary Guidebook' },
  newsletterDesc: { vi: 'Nhận ngay cẩm nang đặc sản 3 miền và công thức nấu ăn bí truyền mỗi tuần.', en: 'Get regional food guides and secret recipes delivered weekly.' },
  newsletterPlaceholder: { vi: 'Nhập email của bạn...', en: 'Enter your email address...' },
  newsletterBtn: { vi: 'Đăng ký', en: 'Subscribe' },
  subscribeSuccess: { vi: 'Cảm ơn bạn! Cẩm nang ẩm thực đã được gửi tới email.', en: 'Thank you! The culinary guide has been sent to your email.' }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('tinhhoa_lang');
    return (saved === 'en' || saved === 'vi') ? saved : 'vi';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('tinhhoa_lang', lang);
    document.documentElement.lang = lang;
  };

  const toggleLanguage = () => {
    const next = language === 'vi' ? 'en' : 'vi';
    setLanguage(next);
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    if (TRANSLATIONS[key]) {
      return TRANSLATIONS[key][language];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
