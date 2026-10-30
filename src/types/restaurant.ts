export type CategoryId = 'all' | 'nihari' | 'breads' | 'bbq' | 'karahi' | 'rice' | 'sides' | 'beverages';

export interface PortionOption {
  id: string;
  name: string;
  label: string;
  priceMultiplier: number;
}

export interface DishAddon {
  id: string;
  name: string;
  price: number;
}

export interface Dish {
  id: string;
  name: string;
  urduName: string;
  description: string;
  category: CategoryId;
  price: number; // in PKR
  image: string;
  spiceLevel: 'Mild' | 'Medium' | 'Tez (Fiery)' | 'Customizable';
  isAvailable: boolean;
  isChefSpecial?: boolean;
  portionSizes?: PortionOption[];
  availableAddons?: DishAddon[];
  prepTimeMinutes: number;
  calories?: number;
}

export interface CartItem {
  cartItemId: string;
  dishId: string;
  dishName: string;
  urduName: string;
  basePrice: number;
  image: string;
  portion: PortionOption;
  spiceChoice: string;
  selectedGarnishes: string[];
  selectedAddons: DishAddon[];
  specialInstructions: string;
  quantity: number;
  itemTotal: number;
}

export type OrderStatus =
  | 'received'
  | 'kitchen_preparing'
  | 'packing_hot'
  | 'out_for_delivery'
  | 'ready_for_pickup'
  | 'completed'
  | 'cancelled';

export interface OrderCustomer {
  name: string;
  phone: string;
  email?: string;
  address?: string;
  landmark?: string;
  notes?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  orderType: 'delivery' | 'pickup';
  customer: OrderCustomer;
  paymentMethod: 'cod' | 'card_on_delivery' | 'digital_wallet';
  subtotal: number;
  deliveryFee: number;
  packagingFee: number;
  discount: number;
  promoCode?: string;
  total: number;
  status: OrderStatus;
  placedAt: string;
  estimatedMinutes: number;
}

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  urduName: string;
  description: string;
}
