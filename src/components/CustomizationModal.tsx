import React, { useState } from 'react';
import { X, Plus, Minus, Check, Flame, Sparkles } from 'lucide-react';
import { Dish, PortionOption, DishAddon } from '../types/restaurant';
import { useRestaurant } from '../context/RestaurantContext';

export const CustomizationModal: React.FC = () => {
  const {
    selectedDishForCustomization,
    setSelectedDishForCustomization,
    addToCart,
  } = useRestaurant();

  const dish = selectedDishForCustomization;

  if (!dish) return null;

  // Portion selection
  const portions = dish.portionSizes && dish.portionSizes.length > 0
    ? dish.portionSizes
    : [{ id: 'std', name: 'Standard Serving', label: '1 Portion', priceMultiplier: 1.0 }];

  const [selectedPortion, setSelectedPortion] = useState<PortionOption>(portions[0]);

  // Spice choice
  const [spiceChoice, setSpiceChoice] = useState<string>(
    dish.spiceLevel === 'Customizable' ? 'Traditional Medium' : dish.spiceLevel
  );

  // Garnishes selection (free authentic Nihari garnishes)
  const defaultGarnishes = [
    'Fresh Ginger Juliennes (ادرک)',
    'Green Chillies (ہری مرچ)',
    'Lemon Wedges (لیموں)',
    'Crispy Golden Onions (تلی ہوئی پیاز)',
    'Fresh Coriander (ہرا دھنیا)',
  ];
  const [selectedGarnishes, setSelectedGarnishes] = useState<string[]>(defaultGarnishes);

  // Addons selection
  const [selectedAddons, setSelectedAddons] = useState<DishAddon[]>([]);

  // Special instructions
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Quantity
  const [quantity, setQuantity] = useState(1);

  const toggleGarnish = (garnish: string) => {
    setSelectedGarnishes((prev) =>
      prev.includes(garnish)
        ? prev.filter((g) => g !== garnish)
        : [...prev, garnish]
    );
  };

  const toggleAddon = (addon: DishAddon) => {
    setSelectedAddons((prev) =>
      prev.some((a) => a.id === addon.id)
        ? prev.filter((a) => a.id !== addon.id)
        : [...prev, addon]
    );
  };

  // Price calculations
  const portionPrice = Math.round(dish.price * selectedPortion.priceMultiplier);
  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const unitTotal = portionPrice + addonsTotal;
  const itemTotal = unitTotal * quantity;

  const handleAddToCart = () => {
    addToCart({
      dishId: dish.id,
      dishName: dish.name,
      urduName: dish.urduName,
      basePrice: dish.price,
      image: dish.image,
      portion: selectedPortion,
      spiceChoice,
      selectedGarnishes,
      selectedAddons,
      specialInstructions,
      quantity,
      itemTotal,
    });
    setSelectedDishForCustomization(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[90vh] bg-[#141310] border border-stone-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-stone-100">
        {/* Modal Header */}
        <div className="flex items-start justify-between p-5 border-b border-stone-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-500 uppercase tracking-wider mb-1">
              <span>Customise Dish</span>
              <span aria-hidden="true">·</span>
              <span>M Siddiq Kitchen</span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-100">
              {dish.name}
            </h2>
            {dish.urduName && (
              <p className="font-serif text-sm text-amber-500/80 mt-0.5" dir="rtl">
                {dish.urduName}
              </p>
            )}
          </div>
          <button
            onClick={() => setSelectedDishForCustomization(null)}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-5 space-y-6 flex-1 text-sm">
          {/* Portion Size */}
          {portions.length > 1 && (
            <div className="space-y-3">
              <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block">
                Select Portion Size
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {portions.map((p) => {
                  const pPrice = Math.round(dish.price * p.priceMultiplier);
                  const isSelected = selectedPortion.id === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedPortion(p)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-amber-950/40 border-amber-500 text-stone-100 shadow-sm'
                          : 'bg-stone-900 border-stone-800 text-stone-300 hover:border-stone-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-sm">{p.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                      </div>
                      <p className="text-[11px] text-stone-400 line-clamp-1">{p.label}</p>
                      <p className="font-display text-sm font-bold text-amber-400 mt-2 tabular-nums">
                        Rs. {pPrice.toLocaleString()}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spice Intensity */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-300 uppercase tracking-wider">
                Spice Intensity
              </label>
              <span className="text-xs text-stone-400 font-medium">Prepared fresh to order</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {['Mild (کم مرچ)', 'Traditional Medium (درمیانہ)', 'Tez / Fiery (تیز مرچ)'].map((lvl) => {
                const isSelected = spiceChoice === lvl;
                return (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSpiceChoice(lvl)}
                    className={`py-2.5 px-3 rounded-lg border text-center text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-amber-600 border-amber-600 text-stone-950 font-bold'
                        : 'bg-stone-900 border-stone-800 text-stone-300 hover:border-stone-700'
                    }`}
                  >
                    {lvl}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Traditional Nihari Garnishes */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-300 uppercase tracking-wider">
                Fresh Garnishes (Complimentary)
              </label>
              <span className="text-xs text-amber-500">Traditional Desi Style</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {defaultGarnishes.map((garnish) => {
                const isChecked = selectedGarnishes.includes(garnish);
                return (
                  <button
                    key={garnish}
                    type="button"
                    onClick={() => toggleGarnish(garnish)}
                    className={`p-2.5 rounded-lg border text-left text-xs font-medium flex items-center justify-between transition-colors ${
                      isChecked
                        ? 'bg-stone-900 border-amber-600/70 text-stone-100'
                        : 'bg-stone-900/50 border-stone-800 text-stone-400 hover:text-stone-300'
                    }`}
                  >
                    <span>{garnish}</span>
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                        isChecked
                          ? 'bg-amber-500 border-amber-500 text-stone-950'
                          : 'border-stone-700 bg-stone-800'
                      }`}
                    >
                      {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Add-ons if available */}
          {dish.availableAddons && dish.availableAddons.length > 0 && (
            <div className="space-y-3">
              <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block">
                Signature Add-ons & Toppers
              </label>
              <div className="space-y-2">
                {dish.availableAddons.map((addon) => {
                  const isChecked = selectedAddons.some((a) => a.id === addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddon(addon)}
                      className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                        isChecked
                          ? 'bg-amber-950/30 border-amber-500 text-stone-100'
                          : 'bg-stone-900 border-stone-800 text-stone-300 hover:border-stone-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border ${
                            isChecked
                              ? 'bg-amber-500 border-amber-500 text-stone-950'
                              : 'border-stone-700 bg-stone-800'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-xs sm:text-sm font-semibold">{addon.name}</span>
                      </div>
                      <span className="font-display text-xs sm:text-sm font-bold text-amber-400 tabular-nums">
                        +Rs. {addon.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special Instructions */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block">
              Kitchen Instructions (Optional)
            </label>
            <input
              type="text"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g., Roghan oil separate, extra ginger, cut meat into smaller pieces..."
              className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-800 rounded-lg text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Modal Footer / Add to Cart Bar */}
        <div className="p-4 sm:p-5 bg-stone-950 border-t border-stone-800 flex items-center justify-between gap-4">
          {/* Quantity Stepper */}
          <div className="flex items-center border border-stone-800 rounded-lg bg-stone-900 p-1">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="p-1.5 rounded text-stone-300 hover:text-white hover:bg-stone-800 disabled:opacity-40 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-3 text-sm font-bold font-mono tabular-nums text-stone-100">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-1.5 rounded text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Order Button */}
          <button
            onClick={handleAddToCart}
            className="flex-1 py-3 px-5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold text-sm rounded-lg transition-all shadow-md shadow-amber-950/40 flex items-center justify-between"
          >
            <span>Add to Order</span>
            <span className="font-display text-base font-bold tabular-nums">
              Rs. {itemTotal.toLocaleString()}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
