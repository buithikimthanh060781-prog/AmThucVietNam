import React, { useState } from 'react';
import { FoodMap } from '../components/FoodMap';
import { DishDetailModal } from '../components/DishDetailModal';
import { Dish } from '../types';

export const MapPage: React.FC = () => {
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);

  return (
    <div className="pt-20 min-h-screen bg-[#FFF8ED]">
      <FoodMap onSelectDish={(dish) => setSelectedDish(dish)} />

      {/* DISH DETAIL MODAL */}
      <DishDetailModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        onSelectRelatedDish={(related) => setSelectedDish(related)}
      />
    </div>
  );
};
