import React from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { DishCard } from './DishCard';
import { Sparkles, Utensils } from 'lucide-react';

export const MenuGrid: React.FC = () => {
  const {
    dishes,
    activeCategory,
    categories,
    searchQuery,
    spiceFilter,
    showOnlyAvailable,
    setActiveCategory,
  } = useRestaurant();

  const currentCategoryInfo = categories.find((c) => c.id === activeCategory);

  const filteredDishes = dishes.filter((dish) => {
    // Category match
    if (activeCategory !== 'all' && dish.category !== activeCategory) {
      return false;
    }

    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        dish.name.toLowerCase().includes(q) ||
        dish.urduName.includes(q) ||
        dish.description.toLowerCase().includes(q);
      if (!match) return false;
    }

    // Spice filter
    if (spiceFilter !== 'all') {
      if (dish.spiceLevel !== spiceFilter && dish.spiceLevel !== 'Customizable') {
        return false;
      }
    }

    // Availability filter
    if (showOnlyAvailable && !dish.isAvailable) {
      return false;
    }

    return true;
  });

  return (
    <div id="menu-section" className="space-y-8 scroll-mt-24">
      {/* Category Heading & Description */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-stone-800/80">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-500 uppercase tracking-wider mb-1">
            <span>Specialty Menu</span>
            {currentCategoryInfo && (
              <>
                <span aria-hidden="true">·</span>
                <span className="font-serif" dir="rtl">{currentCategoryInfo.urduName}</span>
              </>
            )}
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-100">
            {currentCategoryInfo ? currentCategoryInfo.name : 'Full Menu'}
          </h2>
          {currentCategoryInfo?.description && (
            <p className="text-stone-400 text-xs sm:text-sm mt-1 max-w-xl">
              {currentCategoryInfo.description}
            </p>
          )}
        </div>

        <div className="text-xs text-stone-400 font-mono">
          Showing <span className="font-bold text-amber-400 tabular-nums">{filteredDishes.length}</span> delicacies
        </div>
      </div>

      {/* Grid of Dishes (3 columns on desktop, 2 on tablet, 1 on mobile) */}
      {filteredDishes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredDishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center space-y-4 rounded-2xl bg-stone-900/40 border border-stone-800">
          <div className="w-12 h-12 rounded-full bg-stone-800 flex items-center justify-center text-stone-500 mx-auto">
            <Utensils className="w-6 h-6" />
          </div>
          <h3 className="font-display text-lg font-bold text-stone-200">
            No dishes found matching your filters
          </h3>
          <p className="text-xs text-stone-400 max-w-sm mx-auto">
            Try resetting your spice level filter or search term to browse all M Siddiq delicacies.
          </p>
          <button
            onClick={() => setActiveCategory('all')}
            className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-stone-200 rounded-lg transition-colors"
          >
            Show All Dishes
          </button>
        </div>
      )}
    </div>
  );
};
