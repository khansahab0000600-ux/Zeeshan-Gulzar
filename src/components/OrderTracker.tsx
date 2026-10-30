import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Clock,
  Flame,
  PackageCheck,
  Bike,
  CheckCircle,
  Phone,
  MapPin,
  ChevronRight,
  ShoppingBag,
  RefreshCw,
} from 'lucide-react';
import { useRestaurant } from '../context/RestaurantContext';
import { OrderStatus } from '../types/restaurant';

export const OrderTracker: React.FC = () => {
  const {
    orders,
    activeOrder,
    setActiveOrder,
    updateOrderStatus,
    setActiveView,
  } = useRestaurant();

  const currentOrder = activeOrder || orders[0];

  const steps: { key: OrderStatus; label: string; subtext: string; icon: any }[] = [
    {
      key: 'received',
      label: 'Order Confirmed',
      subtext: 'Ticket printed & queued in kitchen',
      icon: CheckCircle2,
    },
    {
      key: 'kitchen_preparing',
      label: 'Deg Simmering & Tandoor',
      subtext: 'Nihari ladle ladled with fresh tarka & roghan',
      icon: Flame,
    },
    {
      key: 'packing_hot',
      label: 'Foil Sealed & Packed',
      subtext: 'Hot roghani naans packed in thermal insulations',
      icon: PackageCheck,
    },
    {
      key: currentOrder?.orderType === 'pickup' ? 'ready_for_pickup' : 'out_for_delivery',
      label: currentOrder?.orderType === 'pickup' ? 'Ready for Pickup' : 'Rider Dispatched',
      subtext: currentOrder?.orderType === 'pickup' ? 'Counter ready with your name' : 'Hot deg carrier en route to your address',
      icon: Bike,
    },
    {
      key: 'completed',
      label: 'Delivered',
      subtext: 'Enjoy the authentic Mughlai heritage',
      icon: CheckCircle,
    },
  ];

  const statusOrder: OrderStatus[] = [
    'received',
    'kitchen_preparing',
    'packing_hot',
    currentOrder?.orderType === 'pickup' ? 'ready_for_pickup' : 'out_for_delivery',
    'completed',
  ];

  const currentStepIndex = currentOrder
    ? statusOrder.indexOf(currentOrder.status)
    : 0;

  const handleAdvanceStep = () => {
    if (!currentOrder) return;
    const nextIdx = Math.min(statusOrder.length - 1, currentStepIndex + 1);
    const nextStatus = statusOrder[nextIdx];
    updateOrderStatus(currentOrder.id, nextStatus);
  };

  if (!currentOrder) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-500 mx-auto mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="font-display text-2xl font-bold text-stone-100">
          No Orders Placed Yet
        </h2>
        <p className="text-stone-400 text-sm mt-2 max-w-sm mx-auto">
          Explore our signature slow-cooked Nalli Nihari, Karahi, and Tandoori Naan menu to place your first order.
        </p>
        <button
          onClick={() => setActiveView('menu')}
          className="mt-6 px-6 py-3 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-sm rounded-lg transition-colors"
        >
          View Menu & Order
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-8 animate-in fade-in duration-300">
      {/* Top Banner & Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-stone-900 to-stone-950 border border-stone-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800/80">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-500 uppercase tracking-wider mb-1">
              <span>Live Order Tracking</span>
              <span aria-hidden="true">·</span>
              <span>{currentOrder.orderType === 'delivery' ? 'Home Delivery' : 'Takeaway Pickup'}</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-stone-100">
              Order #{currentOrder.id}
            </h1>
          </div>

          <div className="flex items-center gap-2 sm:self-center">
            {/* Quick Demo Simulator button */}
            <button
              onClick={handleAdvanceStep}
              className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-medium rounded-lg border border-stone-700 transition-colors flex items-center gap-1.5"
              title="Simulate kitchen progress to next state"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Simulate Next Stage</span>
            </button>
          </div>
        </div>

        {/* Live Estimated Time & Status summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3 rounded-xl bg-stone-950/60 border border-stone-800/60">
            <span className="text-stone-400 block mb-0.5">Estimated Time</span>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-lg font-bold text-amber-400 tabular-nums">
                {currentOrder.status === 'completed'
                  ? 'Delivered'
                  : `~${currentOrder.estimatedMinutes} mins`}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-stone-950/60 border border-stone-800/60">
            <span className="text-stone-400 block mb-0.5">Payment Method</span>
            <span className="font-semibold text-stone-200 uppercase">
              {currentOrder.paymentMethod === 'cod'
                ? 'Cash on Delivery'
                : currentOrder.paymentMethod === 'card_on_delivery'
                ? 'Card on Delivery'
                : 'Digital Wallet'}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-stone-950/60 border border-stone-800/60">
            <span className="text-stone-400 block mb-0.5">Total Amount</span>
            <div className="flex items-baseline gap-1">
              <span className="text-stone-400 text-xs">PKR</span>
              <span className="font-display text-lg font-bold text-amber-400 tabular-nums">
                Rs. {currentOrder.total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Kitchen Progress Stepper */}
      <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-6">
        <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
          Kitchen & Delivery Progress
        </h3>

        <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-[17px] sm:before:left-[21px] before:top-3 before:bottom-3 before:w-0.5 before:bg-stone-800">
          {steps.map((step, idx) => {
            const isCompleted = idx <= currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            const Icon = step.icon;

            return (
              <div key={step.key} className="relative flex items-start gap-4">
                {/* Status Dot / Icon Indicator */}
                <div
                  className={`relative z-10 w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${
                    isCurrent
                      ? 'bg-amber-600 border-amber-400 text-stone-950 shadow-lg shadow-amber-950/60 scale-110'
                      : isCompleted
                      ? 'bg-stone-900 border-amber-600/70 text-amber-400'
                      : 'bg-stone-950 border-stone-800 text-stone-600'
                  }`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
                </div>

                <div className="pt-1">
                  <div className="flex items-center gap-2">
                    <h4
                      className={`font-display text-base font-bold ${
                        isCurrent
                          ? 'text-amber-400'
                          : isCompleted
                          ? 'text-stone-100'
                          : 'text-stone-500'
                      }`}
                    >
                      {step.label}
                    </h4>
                    {isCurrent && (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded border border-amber-500/40">
                        In Progress
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-400 mt-0.5">{step.subtext}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Customer & Delivery Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-4">
          <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
            Recipient & Delivery Location
          </h3>
          <div className="space-y-3 text-xs">
            <div>
              <span className="text-stone-500 block">Customer Name</span>
              <p className="font-semibold text-stone-200 text-sm">{currentOrder.customer.name}</p>
            </div>
            <div>
              <span className="text-stone-500 block">Phone Contact</span>
              <p className="font-semibold text-stone-200 text-sm">{currentOrder.customer.phone}</p>
            </div>
            {currentOrder.orderType === 'delivery' && (
              <div>
                <span className="text-stone-500 block">Delivery Address</span>
                <p className="font-medium text-stone-300 text-xs mt-0.5 leading-relaxed">
                  {currentOrder.customer.address}
                </p>
                {currentOrder.customer.landmark && (
                  <p className="text-[11px] text-amber-400/80 mt-1">
                    Landmark: {currentOrder.customer.landmark}
                  </p>
                )}
              </div>
            )}
            {currentOrder.customer.notes && (
              <div className="p-2.5 rounded-lg bg-stone-950 border border-stone-800/80">
                <span className="text-stone-500 block text-[10px] uppercase">Rider Instructions</span>
                <p className="text-xs text-stone-300 italic">"{currentOrder.customer.notes}"</p>
              </div>
            )}
          </div>
        </div>

        {/* Itemized Receipt */}
        <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-4">
          <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
            Itemized Order Summary
          </h3>
          <div className="space-y-3 text-xs divide-y divide-stone-800/60">
            {currentOrder.items.map((item, idx) => (
              <div key={idx} className="pt-2 first:pt-0 space-y-1">
                <div className="flex justify-between items-baseline">
                  <span className="font-semibold text-stone-200 text-sm">
                    {item.quantity}x {item.dishName}
                  </span>
                  <span className="font-mono text-amber-400 font-bold tabular-nums">
                    Rs. {item.itemTotal.toLocaleString()}
                  </span>
                </div>
                <div className="text-[11px] text-stone-400">
                  {item.portion.name} · {item.spiceChoice}
                </div>
                {item.selectedAddons && item.selectedAddons.length > 0 && (
                  <div className="text-[11px] text-amber-500/80">
                    Add-ons: {item.selectedAddons.map((a) => a.name).join(', ')}
                  </div>
                )}
                {item.specialInstructions && (
                  <div className="text-[11px] text-stone-500 italic">
                    Note: "{item.specialInstructions}"
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-stone-800 space-y-1.5 text-xs text-stone-400">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="tabular-nums">Rs. {currentOrder.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span className="tabular-nums">
                {currentOrder.deliveryFee === 0 ? 'FREE' : `Rs. ${currentOrder.deliveryFee}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Packaging & Foil Seal</span>
              <span className="tabular-nums">Rs. {currentOrder.packagingFee}</span>
            </div>
            <div className="flex justify-between items-baseline pt-2 border-t border-stone-800 text-sm font-bold text-stone-100">
              <span>Grand Total</span>
              <span className="font-display text-base text-amber-400 tabular-nums">
                Rs. {currentOrder.total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Restaurant Contact / Assistance Strip */}
      <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-600/20 text-amber-500 flex items-center justify-center shrink-0">
            <Phone className="w-4 h-4" />
          </div>
          <div>
            <p className="font-semibold text-stone-200">Need immediate assistance with your order?</p>
            <p className="text-stone-400">M Siddiq Kitchen Dispatch Hotline: 042-35789123 / 0300-8459120</p>
          </div>
        </div>

        <button
          onClick={() => setActiveView('menu')}
          className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
        >
          Order More Food
        </button>
      </div>
    </div>
  );
};
