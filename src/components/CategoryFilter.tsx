import React from 'react';
import { Search, X, SlidersHorizontal, Check } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { CategoryId } from '../types/restaurant';

export const CategoryFilter: React.FC = () => {
  const {
    categories,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    spiceFilter,
    setSpiceFilter,
    showOnlyAvailable,
    setShowOnlyAvailable,
    dishes,
  } = useRestaurant();

  const spiceLevels = [
    { id: 'all', label: 'All Spices' },
    { id: 'Mild', label: 'Mild' },
    { id: 'Medium', label: 'Medium' },
    { id: 'Tez (Fiery)', label: 'Tez (Fiery)' },
  ];

  return (
    <div className="space-y-6 pt-4 pb-2">
      {/* Search & Secondary Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Nalli Nihari, Roghani Naan, Biryani, BBQ..."
            className="w-full pl-10 pr-9 py-2.5 bg-stone-900 border border-stone-800 rounded-lg text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-stone-400 hover:text-stone-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Controls: Spice level & In-stock toggle */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Spice Select */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-900 border border-stone-800 rounded-lg">
            {spiceLevels.map((lvl) => (
              <button
                key={lvl.id}
                onClick={() => setSpiceFilter(lvl.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  spiceFilter === lvl.id
                    ? 'bg-amber-600 text-stone-950 font-semibold shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                {lvl.label}
              </button>
            ))}
          </div>

          {/* Availability Toggle */}
          <button
            onClick={() => setShowOnlyAvailable(!showOnlyAvailable)}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${
              showOnlyAvailable
                ? 'bg-stone-800 border-amber-600/70 text-amber-400'
                : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
            }`}
          >
            <div
              className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${
                showOnlyAvailable
                  ? 'bg-amber-500 border-amber-500 text-stone-950'
                  : 'border-stone-600 bg-stone-800'
              }`}
            >
              {showOnlyAvailable && <Check className="w-2.5 h-2.5 stroke-[3]" />}
            </div>
            <span>Available Now</span>
          </button>
        </div>
      </div>

      {/* Category Segmented Controls (Horizontal scrollable on mobile) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-stone-800/80">
        {categories.map((cat) => {
          const count =
            cat.id === 'all'
              ? dishes.length
              : dishes.filter((d) => d.category === cat.id).length;

          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-2.5 ${
                isActive
                  ? 'bg-amber-600 text-stone-950 font-bold shadow-md shadow-amber-950/30'
                  : 'bg-stone-900/80 text-stone-300 hover:text-white hover:bg-stone-800 border border-stone-800/90'
              }`}
            >
              <span>{cat.name}</span>
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full font-mono tabular-nums ${
                  isActive
                    ? 'bg-stone-950/20 text-stone-950 font-bold'
                    : 'bg-stone-800 text-stone-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
