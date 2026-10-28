export type Region = 'north' | 'central' | 'south';

export type DishCategory = 
  | 'noodles'      // Món nước (Phở, Bún, Mì, Hủ tiếu)
  | 'rolls_cakes'  // Bánh & Món cuốn (Gỏi cuốn, Bánh cuốn, Bánh xèo, Bánh bèo)
  | 'rice'         // Món cơm & Xôi (Cơm tấm, Cơm hến, Xôi xéo)
  | 'grilled_fried'// Món nướng & Chiên rán (Bún chả, Chả cá, Nem rán)
  | 'hotpot_soups' // Lẩu & Canh (Lẩu mắm, Cá kho tộ)
  | 'dessert';     // Tráng miệng & Chè

export interface Ingredient {
  name: string;
  nameEn: string;
  amount: string;
  category: 'main' | 'herbs' | 'seasoning' | 'garnish';
}

export interface CookingStep {
  step: number;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  time?: string;
}

export interface FamousLocation {
  name: string;
  address: string;
  city: string;
  note?: string;
}

export interface Dish {
  id: string;
  name: string;
  nameEn: string;
  localName: string;
  region: Region;
  province: string;
  category: DishCategory;
  shortDesc: string;
  shortDescEn: string;
  description: string;
  descriptionEn: string;
  history: string;
  historyEn: string;
  culturalSignificance: string;
  culturalSignificanceEn: string;
  flavorProfile: {
    sweet: number;      // 0-5
    sour: number;       // 0-5
    salty: number;      // 0-5
    spicy: number;      // 0-5
    umami: number;      // 0-5 (đậm đà)
    herbal: number;     // 0-5 (thanh hương thảo mộc)
  };
  tasteTags: string[];
  tasteTagsEn: string[];
  imageUrl: string;
  fallbackImageUrl?: string;
  prepTime: string;
  cookingTime: string;
  servings: string;
  calories: string;
  difficulty: 'Dễ' | 'Trung bình' | 'Cầu kỳ';
  difficultyEn: 'Easy' | 'Medium' | 'Elaborate';
  isFeatured?: boolean;
  isUNESCOOrHeritage?: boolean;
  rating: number;
  reviewCount: number;
  ingredients: Ingredient[];
  steps: CookingStep[];
  famousPlaces: FamousLocation[];
  relatedDishIds: string[];
}

export interface ProvinceFoodInfo {
  id: string;
  name: string;
  nameEn: string;
  region: Region;
  capital: string;
  tagline: string;
  taglineEn: string;
  description: string;
  descriptionEn: string;
  specialtyDishIds: string[];
  coordinates: { x: number; y: number }; // Percentage on SVG map
  highlights: string[];
}

export interface CulturalStory {
  id: string;
  title: string;
  titleEn: string;
  summary: string;
  summaryEn: string;
  readTime: string;
  publishedDate: string;
  author: string;
  category: string;
  imageUrl: string;
  tags: string[];
  content: {
    heading: string;
    headingEn: string;
    body: string[];
    bodyEn: string[];
  }[];
}
