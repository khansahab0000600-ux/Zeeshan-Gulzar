import React from 'react';
import { ShoppingBag, UtensilsCrossed, Clock, Sparkles, ChefHat } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const Header: React.FC = () => {
  const {
    cartCount,
    setIsCartOpen,
    activeView,
    setActiveView,
    setIsAdminOpen,
  } = useRestaurant();

  return (
    <header className="sticky top-0 z-40 bg-[#12110e]/95 backdrop-blur-md border-b border-stone-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Brand Wordmark (Single line, text element) */}
          <button
            onClick={() => setActiveView('menu')}
            className="flex items-center gap-3 text-left group whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center text-stone-950 font-bold shadow-md shadow-amber-950/40">
              <span className="font-display text-xl text-amber-100">MS</span>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-xl font-bold tracking-tight text-stone-100 group-hover:text-amber-400 transition-colors">
                  M Siddiq Nihari House
                </span>
                <span className="hidden sm:inline font-serif text-xs text-amber-500/80" dir="rtl">
                  ایم صدیق نہاری ہاؤس
                </span>
              </div>
              <p className="text-xs text-stone-400 tracking-wide font-sans">
                Authentic Mughlai & Lahori Heritage
              </p>
            </div>
          </button>

          {/* Zone 2: Navigation Links (Clean single-line text links) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-300">
            <button
              onClick={() => setActiveView('menu')}
              className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 py-2 border-b-2 ${
                activeView === 'menu'
                  ? 'text-amber-400 border-amber-500'
                  : 'text-stone-300 border-transparent'
              }`}
            >
              Order Online
            </button>
            <button
              onClick={() => setActiveView('story')}
              className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 py-2 border-b-2 ${
                activeView === 'story'
                  ? 'text-amber-400 border-amber-500'
                  : 'text-stone-300 border-transparent'
              }`}
            >
              Our Heritage
            </button>
            <button
              onClick={() => setActiveView('track')}
              className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 py-2 border-b-2 ${
                activeView === 'track'
                  ? 'text-amber-400 border-amber-500'
                  : 'text-stone-300 border-transparent'
              }`}
            >
              Track Order
            </button>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="flex items-center gap-1.5 text-stone-400 hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 text-xs uppercase tracking-wider py-1.5 px-3 rounded-md bg-stone-900 border border-stone-800"
            >
              <ChefHat className="w-3.5 h-3.5 text-amber-500" />
              <span>Menu Management</span>
            </button>
          </nav>

          {/* Zone 3: Primary Action (Cart Drawer Trigger) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Open Cart"
              className="relative flex items-center gap-2.5 px-4 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-semibold text-sm rounded-lg transition-all shadow-md shadow-amber-950/30 whitespace-nowrap shrink-0"
            >
              <ShoppingBag className="w-4 h-4 text-stone-950 stroke-[2.2]" />
              <span className="hidden sm:inline text-stone-950 font-bold">Your Order</span>
              <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold bg-stone-950 text-amber-400 rounded-full tabular-nums">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
