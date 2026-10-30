import React from 'react';
import { Flame, Clock, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { IMAGES } from '../data/defaultMenu';
import { useRestaurant } from '../context/RestaurantContext';

export const Hero: React.FC = () => {
  const { setActiveCategory, setActiveView } = useRestaurant();

  const handleOrderNow = () => {
    setActiveView('menu');
    const menuSection = document.getElementById('menu-section');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#0e0d0b] border-b border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Story & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-500 uppercase tracking-widest">
              <span>Authentic Lahori Legacy</span>
              <span aria-hidden="true">·</span>
              <span>Slow Cooked Since 1978</span>
              <span aria-hidden="true">·</span>
              <span>100% Halal</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-100 leading-[1.1] text-balance">
              The Legend of Simmered <span className="text-amber-500 italic">Nalli Nihari</span>
            </h1>

            <p className="text-stone-300 text-base sm:text-lg leading-relaxed max-w-2xl font-sans">
              Hand-selected beef shanks braised for over eight hours in traditional copper degs.
              Infused with 24 heirloom spices, crowned with velvety bone marrow, and finished with
              a sizzling desi ghee tarka.
            </p>

            {/* Value Indicators (Unboxed metadata with subtle icons) */}
            <div className="grid grid-cols-3 gap-4 pt-2 border-t border-stone-800/60 max-w-xl">
              <div>
                <p className="font-display text-xl font-bold text-amber-400 tabular-nums">8+ Hours</p>
                <p className="text-xs text-stone-400 mt-0.5">Slow Deg Simmering</p>
              </div>
              <div>
                <p className="font-display text-xl font-bold text-amber-400 tabular-nums">100% Pure</p>
                <p className="text-xs text-stone-400 mt-0.5">Desi Ghee Roghan</p>
              </div>
              <div>
                <p className="font-display text-xl font-bold text-amber-400 tabular-nums">40 Min</p>
                <p className="text-xs text-stone-400 mt-0.5">Hot Delivery Doorstep</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={handleOrderNow}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold text-sm rounded-lg transition-all shadow-lg shadow-amber-950/40 whitespace-nowrap"
              >
                <span>Order Now for Delivery</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                onClick={() => {
                  setActiveCategory('nihari');
                  handleOrderNow();
                }}
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-stone-900/90 hover:bg-stone-800 text-stone-200 hover:text-white font-medium text-sm rounded-lg border border-stone-700/80 transition-colors whitespace-nowrap"
              >
                <span>Explore Nihari Cuts</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Photography */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-stone-800/90 shadow-2xl shadow-black/80 aspect-[4/3] group">
              <img
                src={IMAGES.heroBanner}
                alt="Steaming bowl of Special Beef Nalli Nihari with Roghani Naan at M Siddiq Nihari House"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-stone-950/80 backdrop-blur-md border border-stone-800/70">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold">
                      <span>Chef's Daily Special</span>
                      <span aria-hidden="true">·</span>
                      <span>Morning & Evening Batches</span>
                    </div>
                    <p className="font-display text-lg font-bold text-stone-100">
                      Nalli & Maghaz Nihari Platter
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-stone-400">Starting from</span>
                    <p className="font-display text-lg font-bold text-amber-400 tabular-nums">
                      Rs. 880
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
