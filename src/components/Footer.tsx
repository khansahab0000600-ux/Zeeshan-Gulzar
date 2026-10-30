import React from 'react';
import { ChefHat, Phone, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const Footer: React.FC = () => {
  const { setActiveView, setIsAdminOpen } = useRestaurant();

  return (
    <footer className="bg-[#0b0a08] border-t border-stone-800 text-stone-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Identity */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center text-stone-950 font-bold">
                <span className="font-display text-base text-amber-100">MS</span>
              </div>
              <span className="font-display text-base font-bold text-stone-100">
                M Siddiq Nihari House
              </span>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed">
              Serving the authentic heritage of slow-simmered beef Nalli Nihari, tandoori breads, and Mughlai delicacies since 1978.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-amber-500 font-semibold pt-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Halal Certified & Pure Desi Ghee</span>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold text-stone-200 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-500" />
              <span>Deg Opening Hours</span>
            </h4>
            <div className="space-y-2 text-stone-400">
              <div>
                <span className="text-stone-200 font-semibold block">Morning Nihari Breakfast:</span>
                <span>6:00 AM – 11:30 AM (Daily)</span>
              </div>
              <div>
                <span className="text-stone-200 font-semibold block">Dinner & Late Night:</span>
                <span>5:00 PM – 2:30 AM (Daily)</span>
              </div>
              <p className="text-[11px] text-amber-500/80">
                Online orders are packed and dispatched in thermal sealed deg containers.
              </p>
            </div>
          </div>

          {/* Location & Contact */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold text-stone-200 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-500" />
              <span>Location & Delivery</span>
            </h4>
            <div className="space-y-1.5 text-stone-400">
              <p className="text-stone-300 font-medium">Main Food Boulevard, Gulberg III</p>
              <p>Lahore, Pakistan</p>
              <div className="pt-2 flex items-center gap-2 text-stone-200">
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                <span className="font-mono tabular-nums">+92 42 35789123 / 0300-8459120</span>
              </div>
            </div>
          </div>

          {/* Navigation & Staff Management */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold text-stone-200">
              Quick Links
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button
                  onClick={() => {
                    setActiveView('menu');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Order Online Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('story');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Our Heritage & Secret Spices
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('track');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Live Order Tracker
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => setIsAdminOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold"
                >
                  <ChefHat className="w-3.5 h-3.5" />
                  <span>Menu & Kitchen Portal</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <p>© {new Date().getFullYear()} M Siddiq Nihari House & Restaurant. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Freshly Baked in Clay Tandoor</span>
            <span aria-hidden="true">·</span>
            <span>Halal Certified</span>
            <span aria-hidden="true">·</span>
            <span>Hot Thermal Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
