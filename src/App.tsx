/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { RestaurantProvider, useRestaurant } from './context/RestaurantContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryFilter } from './components/CategoryFilter';
import { MenuGrid } from './components/MenuGrid';
import { CustomizationModal } from './components/CustomizationModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTracker } from './components/OrderTracker';
import { HeritageSection } from './components/HeritageSection';
import { MenuManagementModal } from './components/admin/MenuManagementModal';
import { Footer } from './components/Footer';

const RestaurantApp: React.FC = () => {
  const { activeView } = useRestaurant();

  return (
    <div className="min-h-screen flex flex-col bg-[#0d0c0a] text-stone-100 selection:bg-amber-600 selection:text-white">
      {/* Top Bar Navigation */}
      <Header />

      {/* Main View Area */}
      <main className="flex-1">
        {activeView === 'menu' && (
          <>
            <Hero />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
              <CategoryFilter />
              <MenuGrid />
            </div>
            <HeritageSection />
          </>
        )}

        {activeView === 'story' && (
          <div className="py-8">
            <HeritageSection />
          </div>
        )}

        {activeView === 'track' && (
          <div className="py-8">
            <OrderTracker />
          </div>
        )}
      </main>

      {/* Global Modals & Drawers */}
      <CustomizationModal />
      <CartDrawer />
      <CheckoutModal />
      <MenuManagementModal />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <RestaurantProvider>
      <RestaurantApp />
    </RestaurantProvider>
  );
}
