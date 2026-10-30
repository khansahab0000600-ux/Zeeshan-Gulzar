import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Dish,
  CartItem,
  Order,
  OrderStatus,
  CategoryId,
  CategoryInfo,
} from '../types/restaurant';
import { DEFAULT_DISHES, DEFAULT_CATEGORIES } from '../data/defaultMenu';

interface RestaurantContextType {
  dishes: Dish[];
  categories: CategoryInfo[];
  activeCategory: CategoryId;
  setActiveCategory: (cat: CategoryId) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  spiceFilter: string;
  setSpiceFilter: (filter: string) => void;
  showOnlyAvailable: boolean;
  setShowOnlyAvailable: (val: boolean) => void;

  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (item: Omit<CartItem, 'cartItemId'>) => void;
  updateCartItemQty: (cartItemId: string, delta: number) => void;
  removeCartItem: (cartItemId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;

  // Modals & Navigation
  selectedDishForCustomization: Dish | null;
  setSelectedDishForCustomization: (dish: Dish | null) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  activeView: 'menu' | 'story' | 'track' | 'admin';
  setActiveView: (view: 'menu' | 'story' | 'track' | 'admin') => void;

  // Orders
  orders: Order[];
  activeOrder: Order | null;
  setActiveOrder: (order: Order | null) => void;
  placeOrder: (orderData: Omit<Order, 'id' | 'placedAt' | 'status'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  cancelOrder: (orderId: string) => void;

  // Menu Management
  addDish: (dish: Omit<Dish, 'id'>) => void;
  updateDish: (dish: Dish) => void;
  deleteDish: (id: string) => void;
  toggleDishAvailability: (id: string) => void;
  resetMenuToDefault: () => void;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

const MENU_STORAGE_KEY = 'msiddiq_menu_v2';
const ORDERS_STORAGE_KEY = 'msiddiq_orders_v2';
const CART_STORAGE_KEY = 'msiddiq_cart_v2';

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Dishes state
  const [dishes, setDishes] = useState<Dish[]>(() => {
    try {
      const stored = localStorage.getItem(MENU_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return DEFAULT_DISHES;
  });

  // Filter state
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [spiceFilter, setSpiceFilter] = useState('all');
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedDishForCustomization, setSelectedDishForCustomization] = useState<Dish | null>(null);

  // View & Admin
  const [activeView, setActiveView] = useState<'menu' | 'story' | 'track' | 'admin'>('menu');
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    // Seed with a sample live order so user can immediately experience the tracking & kitchen portal
    const sampleOrder: Order = {
      id: 'MSN-7842',
      items: [
        {
          cartItemId: 'seed-1',
          dishId: 'dish-1',
          dishName: 'Special Beef Nalli Nihari',
          urduName: 'خصوصی بیف نلی نہاری',
          basePrice: 880,
          image: DEFAULT_DISHES[0].image,
          portion: DEFAULT_DISHES[0].portionSizes![0],
          spiceChoice: 'Traditional Medium',
          selectedGarnishes: ['Fresh Ginger Juliennes', 'Crispy Golden Onions', 'Lemon Slice'],
          selectedAddons: [{ id: 'extra_nalli', name: 'Extra Nalli (Rich Bone Marrow)', price: 320 }],
          specialInstructions: 'Piping hot please with extra lemon',
          quantity: 2,
          itemTotal: 2400,
        },
        {
          cartItemId: 'seed-2',
          dishId: 'dish-5',
          dishName: 'Special Roghani Naan',
          urduName: 'خصوصی روغنی نان',
          basePrice: 90,
          image: DEFAULT_DISHES[4].image,
          portion: { id: 'std', name: 'Standard', label: '', priceMultiplier: 1.0 },
          spiceChoice: 'Mild',
          selectedGarnishes: [],
          selectedAddons: [],
          specialInstructions: 'Warm in foil wrap',
          quantity: 3,
          itemTotal: 270,
        },
      ],
      orderType: 'delivery',
      customer: {
        name: 'Hamza Tariq',
        phone: '+92 321 8459120',
        email: 'hamza.tariq@gmail.com',
        address: 'House # 42, Block C, Gulberg III, Main Boulevard',
        landmark: 'Near Siddiq Trade Centre',
        notes: 'Ring bell twice, deliver to 2nd floor.',
      },
      paymentMethod: 'cod',
      subtotal: 2670,
      deliveryFee: 150,
      packagingFee: 60,
      discount: 0,
      total: 2880,
      status: 'kitchen_preparing',
      placedAt: new Date(Date.now() - 14 * 60000).toISOString(),
      estimatedMinutes: 25,
    };
    return [sampleOrder];
  });

  const [activeOrder, setActiveOrder] = useState<Order | null>(() => orders[0] || null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(dishes));
    } catch {
      // ignore
    }
  }, [dishes]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Cart methods
  const addToCart = (itemData: Omit<CartItem, 'cartItemId'>) => {
    const newItem: CartItem = {
      ...itemData,
      cartItemId: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    };
    setCart((prev) => [...prev, newItem]);
    setIsCartOpen(true);
  };

  const updateCartItemQty = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const nextQty = item.quantity + delta;
            if (nextQty <= 0) return null;
            const singleUnitPrice = item.itemTotal / item.quantity;
            return {
              ...item,
              quantity: nextQty,
              itemTotal: Math.round(singleUnitPrice * nextQty),
            };
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const removeCartItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.itemTotal, 0);

  // Menu Management
  const addDish = (dishData: Omit<Dish, 'id'>) => {
    const newDish: Dish = {
      ...dishData,
      id: `dish-${Date.now()}`,
    };
    setDishes((prev) => [newDish, ...prev]);
  };

  const updateDish = (updatedDish: Dish) => {
    setDishes((prev) => prev.map((d) => (d.id === updatedDish.id ? updatedDish : d)));
  };

  const deleteDish = (id: string) => {
    setDishes((prev) => prev.filter((d) => d.id !== id));
  };

  const toggleDishAvailability = (id: string) => {
    setDishes((prev) =>
      prev.map((d) => (d.id === id ? { ...d, isAvailable: !d.isAvailable } : d))
    );
  };

  const resetMenuToDefault = () => {
    setDishes(DEFAULT_DISHES);
    try {
      localStorage.removeItem(MENU_STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  // Orders
  const placeOrder = (orderData: Omit<Order, 'id' | 'placedAt' | 'status'>): Order => {
    const newOrder: Order = {
      ...orderData,
      id: `MSN-${Math.floor(1000 + Math.random() * 9000)}`,
      placedAt: new Date().toISOString(),
      status: 'received',
    };
    setOrders((prev) => [newOrder, ...prev]);
    setActiveOrder(newOrder);
    clearCart();
    setIsCheckoutOpen(false);
    setActiveView('track');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    if (activeOrder && activeOrder.id === orderId) {
      setActiveOrder((prev) => (prev ? { ...prev, status } : null));
    }
  };

  const cancelOrder = (orderId: string) => {
    updateOrderStatus(orderId, 'cancelled');
  };

  return (
    <RestaurantContext.Provider
      value={{
        dishes,
        categories: DEFAULT_CATEGORIES,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        spiceFilter,
        setSpiceFilter,
        showOnlyAvailable,
        setShowOnlyAvailable,

        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateCartItemQty,
        removeCartItem,
        clearCart,
        cartCount,
        cartSubtotal,

        selectedDishForCustomization,
        setSelectedDishForCustomization,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isAdminOpen,
        setIsAdminOpen,
        activeView,
        setActiveView,

        orders,
        activeOrder,
        setActiveOrder,
        placeOrder,
        updateOrderStatus,
        cancelOrder,

        addDish,
        updateDish,
        deleteDish,
        toggleDishAvailability,
        resetMenuToDefault,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
};
