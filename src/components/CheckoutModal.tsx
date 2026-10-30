import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, CreditCard, Banknote, Smartphone, MapPin, Phone, User, FileText } from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    placeOrder,
  } = useRestaurant();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [notes, setNotes] = useState('');
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card_on_delivery' | 'digital_wallet'>('cod');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const deliveryFee = orderType === 'delivery' ? (cartSubtotal > 2000 ? 0 : 150) : 0;
  const packagingFee = cart.length > 0 ? 60 : 0;
  const total = cartSubtotal + deliveryFee + packagingFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 8) {
      setErrorMsg('Please enter a valid contact phone number.');
      return;
    }
    if (orderType === 'delivery' && (!address.trim() || address.trim().length < 5)) {
      setErrorMsg('Please enter your complete delivery street address.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      placeOrder({
        items: cart,
        orderType,
        customer: {
          name,
          phone,
          email,
          address,
          landmark,
          notes,
        },
        paymentMethod,
        subtotal: cartSubtotal,
        deliveryFee,
        packagingFee,
        discount: 0,
        total,
        estimatedMinutes: orderType === 'delivery' ? 35 : 20,
      });
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[92vh] bg-[#141310] border border-stone-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-stone-100">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-stone-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-500 uppercase tracking-wider mb-1">
              <span>Checkout</span>
              <span aria-hidden="true">·</span>
              <span>Fast Confirmation</span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-100">
              Confirm Your Order
            </h2>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-5 sm:p-6 space-y-6 flex-1 text-sm">
          {errorMsg && (
            <div className="p-3 rounded-lg bg-red-950/60 border border-red-800/80 text-red-200 text-xs">
              {errorMsg}
            </div>
          )}

          {/* Fulfillment Type */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block">
              Order Fulfillment
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setOrderType('delivery')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  orderType === 'delivery'
                    ? 'bg-amber-950/40 border-amber-500 text-stone-100'
                    : 'bg-stone-900 border-stone-800 text-stone-400 hover:border-stone-700'
                }`}
              >
                <div className="font-semibold text-sm">Doorstep Delivery</div>
                <div className="text-xs text-stone-400 mt-0.5">35–45 minutes estimated</div>
              </button>
              <button
                type="button"
                onClick={() => setOrderType('pickup')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  orderType === 'pickup'
                    ? 'bg-amber-950/40 border-amber-500 text-stone-100'
                    : 'bg-stone-900 border-stone-800 text-stone-400 hover:border-stone-700'
                }`}
              >
                <div className="font-semibold text-sm">Takeaway Counter Pickup</div>
                <div className="text-xs text-stone-400 mt-0.5">15–20 minutes ready</div>
              </button>
            </div>
          </div>

          {/* Customer Details */}
          <div className="space-y-4">
            <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block">
              Customer Contact Information
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-stone-400 block mb-1">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Tariq Mehmood"
                    className="w-full pl-9 pr-3 py-2.5 bg-stone-900 border border-stone-800 rounded-lg text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-stone-400 block mb-1">Phone Number (Calling / WhatsApp) *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 0300 1234567 or +92 300 1234567"
                    className="w-full pl-9 pr-3 py-2.5 bg-stone-900 border border-stone-800 rounded-lg text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            {orderType === 'delivery' && (
              <>
                <div>
                  <label className="text-xs text-stone-400 block mb-1">Delivery Address *</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-stone-500" />
                    <textarea
                      required
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="House/Apartment #, Street, Block, Area (e.g., Gulberg III, Lahore)"
                      className="w-full pl-9 pr-3 py-2.5 bg-stone-900 border border-stone-800 rounded-lg text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-stone-400 block mb-1">Nearby Landmark (Optional)</label>
                    <input
                      type="text"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      placeholder="e.g. Opposite Masjid, Near Market"
                      className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-lg text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-stone-400 block mb-1">Rider Notes (Optional)</label>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Call upon arrival, 2nd floor"
                      className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-lg text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Payment Method */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block">
              Payment Method
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all ${
                  paymentMethod === 'cod'
                    ? 'bg-amber-950/40 border-amber-500 text-stone-100'
                    : 'bg-stone-900 border-stone-800 text-stone-400 hover:border-stone-700'
                }`}
              >
                <Banknote className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-xs text-stone-200">Cash on Delivery</div>
                  <div className="text-[11px] text-stone-400">Pay cash upon arrival</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card_on_delivery')}
                className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all ${
                  paymentMethod === 'card_on_delivery'
                    ? 'bg-amber-950/40 border-amber-500 text-stone-100'
                    : 'bg-stone-900 border-stone-800 text-stone-400 hover:border-stone-700'
                }`}
              >
                <CreditCard className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-xs text-stone-200">Card on Delivery</div>
                  <div className="text-[11px] text-stone-400">Rider brings POS machine</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('digital_wallet')}
                className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all ${
                  paymentMethod === 'digital_wallet'
                    ? 'bg-amber-950/40 border-amber-500 text-stone-100'
                    : 'bg-stone-900 border-stone-800 text-stone-400 hover:border-stone-700'
                }`}
              >
                <Smartphone className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-xs text-stone-200">JazzCash / EasyPaisa</div>
                  <div className="text-[11px] text-stone-400">Direct mobile transfer</div>
                </div>
              </button>
            </div>
          </div>

          {/* Order Summary Box */}
          <div className="p-4 rounded-xl bg-stone-900/90 border border-stone-800 space-y-2 text-xs">
            <div className="flex justify-between text-stone-400">
              <span>{cart.length} item(s) in bag</span>
              <span className="text-stone-200 tabular-nums">Rs. {cartSubtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-stone-400">
              <span>Fulfillment Fee</span>
              <span className="text-stone-200 tabular-nums">
                {deliveryFee === 0 ? 'FREE' : `Rs. ${deliveryFee}`}
              </span>
            </div>
            <div className="flex justify-between text-stone-400">
              <span>Packaging & Foil Seal</span>
              <span className="text-stone-200 tabular-nums">Rs. {packagingFee}</span>
            </div>
            <div className="flex justify-between items-baseline pt-2 border-t border-stone-800 text-sm font-bold text-stone-100">
              <span>Payable Amount</span>
              <span className="font-display text-lg text-amber-400 tabular-nums">
                Rs. {total.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold text-sm rounded-lg transition-all shadow-lg shadow-amber-950/40 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>{isSubmitting ? 'Placing Order...' : 'Confirm & Place Order'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
