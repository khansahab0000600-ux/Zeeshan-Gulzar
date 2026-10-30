import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Bike, Store, Tag } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartItemQty,
    removeCartItem,
    clearCart,
    cartSubtotal,
    setIsCheckoutOpen,
  } = useRestaurant();

  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);
  const [promoError, setPromoError] = useState('');

  if (!isCartOpen) return null;

  const handleApplyPromo = () => {
    setPromoError('');
    const code = promoCodeInput.trim().toUpperCase();
    if (!code) return;

    if (code === 'SIDDIQ10') {
      const discountVal = Math.round(cartSubtotal * 0.1);
      setAppliedPromo({ code, discount: discountVal });
    } else if (code === 'NIHARI50') {
      setAppliedPromo({ code, discount: 50 });
    } else {
      setPromoError('Invalid coupon code. Try SIDDIQ10 for 10% off.');
    }
  };

  const deliveryFee = orderType === 'delivery' ? (cartSubtotal > 2000 ? 0 : 150) : 0;
  const packagingFee = cart.length > 0 ? 60 : 0;
  const discount = appliedPromo ? appliedPromo.discount : 0;
  const grandTotal = Math.max(0, cartSubtotal + deliveryFee + packagingFee - discount);

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={() => setIsCartOpen(false)} />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-[#131210] border-l border-stone-800 shadow-2xl flex flex-col text-stone-100">
          {/* Drawer Header */}
          <div className="p-5 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-600/20 text-amber-500 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-display text-lg font-bold text-stone-100">
                  Your Order
                </h2>
                <span className="text-xs text-stone-400">
                  {cart.length} {cart.length === 1 ? 'item' : 'items'} in bag
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-stone-400 hover:text-red-400 transition-colors px-2 py-1"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Delivery / Pickup Segmented Toggle */}
          <div className="px-5 pt-4 pb-2">
            <div className="grid grid-cols-2 p-1 bg-stone-900 border border-stone-800 rounded-lg">
              <button
                onClick={() => setOrderType('delivery')}
                className={`py-2 text-xs font-semibold rounded-md flex items-center justify-center gap-2 transition-all ${
                  orderType === 'delivery'
                    ? 'bg-amber-600 text-stone-950 font-bold shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Bike className="w-3.5 h-3.5" />
                <span>Home Delivery</span>
              </button>
              <button
                onClick={() => setOrderType('pickup')}
                className={`py-2 text-xs font-semibold rounded-md flex items-center justify-center gap-2 transition-all ${
                  orderType === 'pickup'
                    ? 'bg-amber-600 text-stone-950 font-bold shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Store className="w-3.5 h-3.5" />
                <span>Takeaway Pickup</span>
              </button>
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-stone-900 flex items-center justify-center text-stone-600">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-stone-200">
                    Your order is empty
                  </h3>
                  <p className="text-xs text-stone-400 mt-1 max-w-xs">
                    Add slow-cooked Nalli Nihari, hot tandoori roghani naan, or sizzling kebabs to get started.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-stone-200 rounded-lg transition-colors"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="p-4 bg-stone-900/80 border border-stone-800/80 rounded-xl space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-baseline gap-2">
                        <h4 className="font-display text-sm font-bold text-stone-100">
                          {item.dishName}
                        </h4>
                        <span className="text-xs text-amber-500/80 font-serif" dir="rtl">
                          {item.urduName}
                        </span>
                      </div>
                      <div className="text-xs text-stone-400">
                        <span>{item.portion.name}</span>
                        {item.spiceChoice && (
                          <>
                            <span className="mx-1.5" aria-hidden="true">·</span>
                            <span>{item.spiceChoice}</span>
                          </>
                        )}
                      </div>

                      {/* Add-ons list if any */}
                      {item.selectedAddons && item.selectedAddons.length > 0 && (
                        <div className="text-[11px] text-amber-400/90 pt-0.5">
                          {item.selectedAddons.map((a) => a.name).join(', ')}
                        </div>
                      )}

                      {/* Special instructions */}
                      {item.specialInstructions && (
                        <p className="text-[11px] text-stone-400 italic">
                          "{item.specialInstructions}"
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => removeCartItem(item.cartItemId)}
                      className="p-1 text-stone-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-stone-800/60">
                    <div className="flex items-center border border-stone-800 rounded bg-stone-950 p-0.5">
                      <button
                        onClick={() => updateCartItemQty(item.cartItemId, -1)}
                        className="p-1 text-stone-400 hover:text-stone-100 hover:bg-stone-800 rounded"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2.5 text-xs font-mono font-bold tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartItemQty(item.cartItemId, 1)}
                        className="p-1 text-stone-400 hover:text-stone-100 hover:bg-stone-800 rounded"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="font-display text-sm font-bold text-amber-400 tabular-nums">
                      Rs. {item.itemTotal.toLocaleString()}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Price Summary */}
          {cart.length > 0 && (
            <div className="p-5 bg-stone-950 border-t border-stone-800 space-y-4">
              {/* Promo code box */}
              <div className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-500" />
                    <input
                      type="text"
                      value={promoCodeInput}
                      onChange={(e) => setPromoCodeInput(e.target.value)}
                      placeholder="Promo Code (e.g. SIDDIQ10)"
                      className="w-full pl-9 pr-3 py-1.5 bg-stone-900 border border-stone-800 rounded-md text-xs text-stone-200 uppercase placeholder-stone-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <button
                    onClick={handleApplyPromo}
                    className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-stone-200 rounded-md transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {appliedPromo && (
                  <p className="text-[11px] text-emerald-400">
                    Promo code '{appliedPromo.code}' applied (-Rs. {appliedPromo.discount})
                  </p>
                )}
                {promoError && (
                  <p className="text-[11px] text-red-400">{promoError}</p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-400 pt-2 border-t border-stone-800/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-stone-200 tabular-nums">Rs. {cartSubtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>{orderType === 'delivery' ? 'Delivery Fee' : 'Takeaway Packaging'}</span>
                  <span className="text-stone-200 tabular-nums">
                    {orderType === 'delivery'
                      ? deliveryFee === 0
                        ? 'FREE (Orders > Rs. 2000)'
                        : `Rs. ${deliveryFee}`
                      : 'FREE'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Food Packaging & Deg Seal</span>
                  <span className="text-stone-200 tabular-nums">Rs. {packagingFee}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Discount</span>
                    <span className="tabular-nums">-Rs. {discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between items-baseline pt-2 border-t border-stone-800 text-sm font-bold text-stone-100">
                  <span>Total Amount</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs text-amber-500">PKR</span>
                    <span className="font-display text-lg text-amber-400 tabular-nums">
                      Rs. {grandTotal.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold text-sm rounded-lg transition-all shadow-md shadow-amber-950/40 flex items-center justify-between"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
