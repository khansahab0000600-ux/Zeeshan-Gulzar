import React, { useState } from 'react';
import {
  X,
  Plus,
  Edit2,
  Trash2,
  Check,
  Search,
  RotateCcw,
  ChefHat,
  ShoppingBag,
  Clock,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Flame,
  Utensils,
  Layers,
} from 'lucide-react';
import { useRestaurant } from '../../context/RestaurantContext';
import { Dish, CategoryId, OrderStatus } from '../../types/restaurant';
import { IMAGES } from '../../data/defaultMenu';

export const MenuManagementModal: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    dishes,
    categories,
    addDish,
    updateDish,
    deleteDish,
    toggleDishAvailability,
    resetMenuToDefault,
    orders,
    updateOrderStatus,
  } = useRestaurant();

  const [activeTab, setActiveTab] = useState<'dishes' | 'orders' | 'add_dish'>('dishes');
  const [editingDish, setEditingDish] = useState<Dish | null>(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<CategoryId>('all');

  // New Dish Form State
  const [formData, setFormData] = useState({
    name: '',
    urduName: '',
    description: '',
    category: 'nihari' as CategoryId,
    price: 750,
    spiceLevel: 'Medium' as 'Mild' | 'Medium' | 'Tez (Fiery)' | 'Customizable',
    image: IMAGES.specialNalliNihari,
    prepTimeMinutes: 15,
    isChefSpecial: false,
    isAvailable: true,
  });

  if (!isAdminOpen) return null;

  const filteredDishes = dishes.filter((dish) => {
    const matchesSearch =
      dish.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      dish.urduName.includes(searchFilter) ||
      dish.description.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || dish.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleCreateOrUpdateDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingDish) {
      updateDish({
        ...editingDish,
        name: formData.name,
        urduName: formData.urduName,
        description: formData.description,
        category: formData.category,
        price: Number(formData.price),
        spiceLevel: formData.spiceLevel,
        image: formData.image,
        prepTimeMinutes: Number(formData.prepTimeMinutes),
        isChefSpecial: formData.isChefSpecial,
        isAvailable: formData.isAvailable,
      });
      setEditingDish(null);
    } else {
      addDish({
        name: formData.name,
        urduName: formData.urduName,
        description: formData.description,
        category: formData.category,
        price: Number(formData.price),
        spiceLevel: formData.spiceLevel,
        image: formData.image,
        prepTimeMinutes: Number(formData.prepTimeMinutes),
        isChefSpecial: formData.isChefSpecial,
        isAvailable: formData.isAvailable,
        portionSizes: [
          { id: 'single', name: 'Single Serving', label: '1 Portion', priceMultiplier: 1.0 },
          { id: 'double', name: 'Double Feast', label: '2-3 Persons', priceMultiplier: 1.85 },
        ],
      });
    }

    // Reset
    setFormData({
      name: '',
      urduName: '',
      description: '',
      category: 'nihari',
      price: 750,
      spiceLevel: 'Medium',
      image: IMAGES.specialNalliNihari,
      prepTimeMinutes: 15,
      isChefSpecial: false,
      isAvailable: true,
    });
    setActiveTab('dishes');
  };

  const startEditDish = (dish: Dish) => {
    setEditingDish(dish);
    setFormData({
      name: dish.name,
      urduName: dish.urduName,
      description: dish.description,
      category: dish.category,
      price: dish.price,
      spiceLevel: dish.spiceLevel,
      image: dish.image,
      prepTimeMinutes: dish.prepTimeMinutes,
      isChefSpecial: !!dish.isChefSpecial,
      isAvailable: dish.isAvailable,
    });
    setActiveTab('add_dish');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl h-[90vh] bg-[#12110e] border border-stone-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-stone-100">
        {/* Header */}
        <div className="p-5 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600/20 text-amber-500 border border-amber-600/30 flex items-center justify-center">
              <ChefHat className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-xl font-bold text-stone-100">
                  Integrated Menu & Kitchen Management
                </h2>
                <span className="text-xs bg-amber-950/60 text-amber-400 border border-amber-800/80 px-2 py-0.5 rounded font-mono">
                  Staff Portal
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">
                Real-time control over dish availability, pricing, menu edits, and live incoming kitchen orders.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAdminOpen(false)}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between px-5 pt-3 border-b border-stone-800 bg-stone-950/60">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setActiveTab('dishes');
                setEditingDish(null);
              }}
              className={`pb-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === 'dishes'
                  ? 'border-amber-500 text-amber-400'
                  : 'border-transparent text-stone-400 hover:text-stone-200'
              }`}
            >
              <Utensils className="w-4 h-4" />
              <span>Menu Dishes ({dishes.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`pb-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === 'orders'
                  ? 'border-amber-500 text-amber-400'
                  : 'border-transparent text-stone-400 hover:text-stone-200'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Kitchen Orders ({orders.length})</span>
            </button>

            <button
              onClick={() => {
                setEditingDish(null);
                setFormData({
                  name: '',
                  urduName: '',
                  description: '',
                  category: 'nihari',
                  price: 750,
                  spiceLevel: 'Medium',
                  image: IMAGES.specialNalliNihari,
                  prepTimeMinutes: 15,
                  isChefSpecial: false,
                  isAvailable: true,
                });
                setActiveTab('add_dish');
              }}
              className={`pb-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === 'add_dish'
                  ? 'border-amber-500 text-amber-400'
                  : 'border-transparent text-stone-400 hover:text-stone-200'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>{editingDish ? 'Edit Dish' : 'Add New Dish'}</span>
            </button>
          </div>

          <button
            onClick={() => {
              if (window.confirm('Reset menu back to original M Siddiq signature recipes?')) {
                resetMenuToDefault();
              }
            }}
            className="text-xs text-stone-500 hover:text-amber-400 transition-colors flex items-center gap-1.5 pb-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Menu Defaults</span>
          </button>
        </div>

        {/* Tab 1: Dishes Table & Availability */}
        {activeTab === 'dishes' && (
          <div className="flex-1 flex flex-col overflow-hidden p-5 space-y-4">
            {/* Search and Category Filter Toolbar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Filter dishes by name or Urdu..."
                  className="w-full pl-9 pr-3 py-2 bg-stone-900 border border-stone-800 rounded-lg text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCategoryFilter(c.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                      categoryFilter === c.id
                        ? 'bg-amber-600 text-stone-950 font-bold'
                        : 'bg-stone-900 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Dish Rows Table */}
            <div className="flex-1 overflow-y-auto border border-stone-800 rounded-xl bg-stone-950/50">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-stone-800 bg-stone-900/80 text-stone-400 font-semibold uppercase tracking-wider">
                    <th className="p-3">Dish / Urdu Title</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Spice Level</th>
                    <th className="p-3 text-center">Availability</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/60">
                  {filteredDishes.map((dish) => (
                    <tr
                      key={dish.id}
                      className="hover:bg-stone-900/40 transition-colors group"
                    >
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={dish.image}
                            alt={dish.name}
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 rounded-lg object-cover bg-stone-900 shrink-0 border border-stone-800"
                          />
                          <div>
                            <div className="font-bold text-stone-200 group-hover:text-amber-400 transition-colors">
                              {dish.name}
                            </div>
                            {dish.urduName && (
                              <div className="font-serif text-[11px] text-amber-500/80" dir="rtl">
                                {dish.urduName}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-3 text-stone-400 capitalize">
                        {dish.category}
                      </td>
                      <td className="p-3 font-mono font-bold text-amber-400 tabular-nums">
                        Rs. {dish.price.toLocaleString()}
                      </td>
                      <td className="p-3 text-stone-300">
                        {dish.spiceLevel}
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => toggleDishAvailability(dish.id)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-all ${
                            dish.isAvailable
                              ? 'bg-emerald-950/60 border-emerald-600/70 text-emerald-300'
                              : 'bg-red-950/60 border-red-800/80 text-red-300'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              dish.isAvailable ? 'bg-emerald-400' : 'bg-red-400'
                            }`}
                          />
                          <span>{dish.isAvailable ? 'In Stock' : 'Sold Out'}</span>
                        </button>
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => startEditDish(dish)}
                            className="p-1.5 rounded text-stone-400 hover:text-amber-400 hover:bg-stone-800 transition-colors"
                            title="Edit dish details"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete ${dish.name} from menu?`)) {
                                deleteDish(dish.id);
                              }
                            }}
                            className="p-1.5 rounded text-stone-400 hover:text-red-400 hover:bg-stone-800 transition-colors"
                            title="Delete dish"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Kitchen Display System (KDS / Live Orders) */}
        {activeTab === 'orders' && (
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-800">
              <h3 className="text-sm font-bold text-stone-200">
                Live Kitchen Order Queue ({orders.length})
              </h3>
              <span className="text-xs text-stone-400">
                Update order tickets as food prepares and dispatches
              </span>
            </div>

            <div className="space-y-4">
              {orders.map((order) => {
                const statusColors: Record<OrderStatus, string> = {
                  received: 'bg-blue-950/80 border-blue-800 text-blue-300',
                  kitchen_preparing: 'bg-amber-950/80 border-amber-800 text-amber-300',
                  packing_hot: 'bg-purple-950/80 border-purple-800 text-purple-300',
                  out_for_delivery: 'bg-emerald-950/80 border-emerald-800 text-emerald-300',
                  ready_for_pickup: 'bg-emerald-950/80 border-emerald-800 text-emerald-300',
                  completed: 'bg-stone-900 border-stone-800 text-stone-400',
                  cancelled: 'bg-red-950/80 border-red-800 text-red-300',
                };

                return (
                  <div
                    key={order.id}
                    className="p-5 rounded-xl bg-stone-900/80 border border-stone-800 space-y-4 text-xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-800">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-display text-base font-bold text-stone-100">
                            #{order.id}
                          </span>
                          <span className="text-stone-400">·</span>
                          <span className="font-semibold text-amber-400 uppercase">
                            {order.orderType === 'delivery' ? 'Delivery' : 'Counter Pickup'}
                          </span>
                          <span className="text-stone-400">·</span>
                          <span className="text-stone-400">
                            {new Date(order.placedAt).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                        <p className="text-stone-300 font-medium mt-0.5">
                          {order.customer.name} ({order.customer.phone})
                        </p>
                      </div>

                      {/* Status Dropdown/Selector */}
                      <div className="flex items-center gap-2">
                        <span className="text-stone-500">Status:</span>
                        <select
                          value={order.status}
                          onChange={(e) =>
                            updateOrderStatus(order.id, e.target.value as OrderStatus)
                          }
                          className={`px-3 py-1.5 rounded-lg border text-xs font-semibold focus:outline-none ${statusColors[order.status]}`}
                        >
                          <option value="received">1. Order Received</option>
                          <option value="kitchen_preparing">2. Deg Simmering / Kitchen</option>
                          <option value="packing_hot">3. Foil Packed with Naans</option>
                          <option value="out_for_delivery">4. Rider Out for Delivery</option>
                          <option value="ready_for_pickup">4. Ready at Pickup Counter</option>
                          <option value="completed">5. Completed / Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-2">
                          Dishes & Customizations
                        </h4>
                        <div className="space-y-2">
                          {order.items.map((it, idx) => (
                            <div key={idx} className="p-2.5 rounded-lg bg-stone-950 border border-stone-800/80">
                              <div className="flex justify-between font-bold text-stone-200">
                                <span>{it.quantity}x {it.dishName}</span>
                                <span className="font-mono text-amber-400 tabular-nums">Rs. {it.itemTotal}</span>
                              </div>
                              <div className="text-[11px] text-stone-400 mt-0.5">
                                Portion: {it.portion.name} · Spice: {it.spiceChoice}
                              </div>
                              {it.selectedGarnishes && it.selectedGarnishes.length > 0 && (
                                <div className="text-[10px] text-stone-500">
                                  Garnishes: {it.selectedGarnishes.join(', ')}
                                </div>
                              )}
                              {it.selectedAddons && it.selectedAddons.length > 0 && (
                                <div className="text-[10px] text-amber-500/90 font-medium">
                                  Add-ons: {it.selectedAddons.map((a) => a.name).join(', ')}
                                </div>
                              )}
                              {it.specialInstructions && (
                                <div className="text-[10px] text-stone-400 italic mt-0.5">
                                  Note: "{it.specialInstructions}"
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                          Address & Payment
                        </h4>
                        <div className="p-3 rounded-lg bg-stone-950 border border-stone-800/80 space-y-2">
                          {order.orderType === 'delivery' && (
                            <div>
                              <span className="text-stone-500 text-[10px] uppercase block">Delivery Address:</span>
                              <p className="text-stone-200 font-medium">{order.customer.address}</p>
                              {order.customer.landmark && (
                                <p className="text-stone-400 text-[11px]">Landmark: {order.customer.landmark}</p>
                              )}
                            </div>
                          )}
                          <div className="flex justify-between pt-2 border-t border-stone-800 text-stone-300">
                            <span>Payment:</span>
                            <span className="font-semibold uppercase">{order.paymentMethod}</span>
                          </div>
                          <div className="flex justify-between text-stone-300">
                            <span>Order Total:</span>
                            <span className="font-mono font-bold text-amber-400 tabular-nums">
                              Rs. {order.total.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Add / Edit Dish Form */}
        {activeTab === 'add_dish' && (
          <form onSubmit={handleCreateOrUpdateDish} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div>
                <h3 className="font-display text-base font-bold text-stone-100">
                  {editingDish ? `Edit "${editingDish.name}"` : 'Add New Dish to Menu'}
                </h3>
                <p className="text-stone-400 text-xs">
                  Fill in the culinary details to immediately publish or update on the live ordering system.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-stone-300 font-bold block mb-1">Dish Name (English) *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Special Beef Nalli Nihari"
                  className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-lg text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-stone-300 font-bold block mb-1">Urdu Name (Calligraphy Style)</label>
                <input
                  type="text"
                  value={formData.urduName}
                  onChange={(e) => setFormData({ ...formData, urduName: e.target.value })}
                  placeholder="e.g. خصوصی نلی نہاری"
                  dir="rtl"
                  className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-lg text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500 font-serif"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-stone-300 font-bold block mb-1">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as CategoryId })}
                  className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-lg text-stone-100 focus:outline-none focus:border-amber-500"
                >
                  <option value="nihari">Nihari Specialties</option>
                  <option value="breads">Tandoor & Breads</option>
                  <option value="bbq">Charcoal BBQ</option>
                  <option value="karahi">Karahi & Handi</option>
                  <option value="rice">Rice & Biryani</option>
                  <option value="beverages">Lassi & Desserts</option>
                </select>
              </div>

              <div>
                <label className="text-stone-300 font-bold block mb-1">Base Price (PKR) *</label>
                <input
                  type="number"
                  required
                  min={10}
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-lg text-stone-100 focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div>
                <label className="text-stone-300 font-bold block mb-1">Spice Level</label>
                <select
                  value={formData.spiceLevel}
                  onChange={(e) => setFormData({ ...formData, spiceLevel: e.target.value as any })}
                  className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-lg text-stone-100 focus:outline-none focus:border-amber-500"
                >
                  <option value="Mild">Mild</option>
                  <option value="Medium">Medium</option>
                  <option value="Tez (Fiery)">Tez (Fiery)</option>
                  <option value="Customizable">Customizable</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-stone-300 font-bold block mb-1">Description & Spices</label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe slow-cooking method, cuts of meat, spices, and serving suggestion..."
                className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded-lg text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Quick Image Selector */}
            <div className="space-y-2">
              <label className="text-stone-300 font-bold block">Dish Photography</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Nalli Nihari', url: IMAGES.specialNalliNihari },
                  { label: 'Deg Simmered', url: IMAGES.heroBanner },
                  { label: 'Roghani Naan', url: IMAGES.roghaniNaan },
                  { label: 'Seekh BBQ', url: IMAGES.seekhKebabs },
                ].map((img) => (
                  <button
                    key={img.label}
                    type="button"
                    onClick={() => setFormData({ ...formData, image: img.url })}
                    className={`p-2 rounded-xl border text-left transition-all ${
                      formData.image === img.url
                        ? 'bg-amber-950/40 border-amber-500 ring-1 ring-amber-500'
                        : 'bg-stone-900 border-stone-800 hover:border-stone-700'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.label}
                      referrerPolicy="no-referrer"
                      className="w-full h-16 object-cover rounded-lg mb-1.5"
                    />
                    <span className="font-semibold text-[11px] text-stone-200 block truncate">
                      {img.label}
                    </span>
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="Or paste custom image URL..."
                className="w-full px-3 py-1.5 bg-stone-900 border border-stone-800 rounded-lg text-[11px] text-stone-300"
              />
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isChefSpecial}
                  onChange={(e) => setFormData({ ...formData, isChefSpecial: e.target.checked })}
                  className="rounded text-amber-500 focus:ring-0"
                />
                <span className="text-stone-200 font-medium">Mark as Chef's Special</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isAvailable}
                  onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                  className="rounded text-amber-500 focus:ring-0"
                />
                <span className="text-stone-200 font-medium">Available in Stock</span>
              </label>
            </div>

            <div className="pt-4 border-t border-stone-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setEditingDish(null);
                  setActiveTab('dishes');
                }}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold rounded-lg shadow-md transition-colors"
              >
                {editingDish ? 'Save Changes' : 'Publish Dish to Menu'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
