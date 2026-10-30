import React, { useState } from 'react';
import { Plus, Flame, Clock, Sparkles } from 'lucide-react';
import { Dish } from '../types/restaurant';
import { useRestaurant } from '../context/RestaurantContext';

interface DishCardProps {
  dish: Dish;
}

export const DishCard: React.FC<DishCardProps> = ({ dish }) => {
  const { setSelectedDishForCustomization } = useRestaurant();
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`group relative flex flex-col bg-[#141310] border border-stone-800/80 rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:border-stone-700 hover:shadow-xl hover:shadow-black/50 ${
        !dish.isAvailable ? 'opacity-75' : ''
      }`}
    >
      {/* Product Image Slot (Takes ~65% height on card top) */}
      <div className="relative aspect-[4/3] w-full bg-stone-900 overflow-hidden">
        {!imgError && dish.image ? (
          <img
            src={dish.image}
            alt={dish.name}
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-stone-900 to-stone-950 p-4 text-center">
            <span className="font-display text-lg text-amber-500 font-bold mb-1">
              M Siddiq Recipe
            </span>
            <span className="text-xs text-stone-400">{dish.name}</span>
          </div>
        )}

        {/* Subtle Gradient Scrim at bottom of image for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141310] via-transparent to-transparent pointer-events-none" />

        {/* Availability / Special Indicator */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {dish.isChefSpecial ? (
            <span className="text-[11px] font-semibold text-amber-300 bg-stone-950/80 backdrop-blur-md px-2.5 py-1 rounded border border-amber-600/40">
              Chef's Special
            </span>
          ) : <span />}

          {!dish.isAvailable && (
            <span className="text-[11px] font-semibold text-red-300 bg-red-950/80 backdrop-blur-md px-2.5 py-1 rounded border border-red-800/60">
              Sold Out Today
            </span>
          )}
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div className="space-y-2">
          {/* Unboxed Metadata Line with typographic separators */}
          <div className="flex items-center gap-2 text-xs text-stone-400 font-medium">
            <span>{dish.prepTimeMinutes} min prep</span>
            <span aria-hidden="true">·</span>
            <span>{dish.spiceLevel}</span>
            <span aria-hidden="true">·</span>
            <span className="text-amber-500/90">100% Halal</span>
          </div>

          {/* Dish Title & Urdu Name */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-display text-lg font-bold text-stone-100 group-hover:text-amber-400 transition-colors leading-snug">
                {dish.name}
              </h3>
              {dish.urduName && (
                <p className="font-serif text-xs text-amber-500/70 mt-0.5 tracking-wide" dir="rtl">
                  {dish.urduName}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-stone-400 line-clamp-2 leading-relaxed">
            {dish.description}
          </p>
        </div>

        {/* Pricing & Add to Cart Action */}
        <div className="pt-3 border-t border-stone-800/70 flex items-center justify-between gap-3">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-stone-500 block">
              Price
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-xs font-semibold text-stone-400">Rs.</span>
              <span className="font-display text-xl font-bold text-amber-400 tabular-nums">
                {dish.price.toLocaleString()}
              </span>
            </div>
          </div>

          <button
            onClick={() => setSelectedDishForCustomization(dish)}
            disabled={!dish.isAvailable}
            className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
              dish.isAvailable
                ? 'bg-amber-600 hover:bg-amber-500 text-stone-950 shadow-md shadow-amber-950/40 active:scale-95'
                : 'bg-stone-800 text-stone-500 cursor-not-allowed'
            }`}
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>{dish.isAvailable ? 'Customise' : 'Sold Out'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
