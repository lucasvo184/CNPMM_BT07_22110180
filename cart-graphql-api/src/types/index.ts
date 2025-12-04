// Product Type
export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
  stock: number;
  category?: string;
}

// Cart Item Type
export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  selected: boolean; // For checkout selection
  addedAt: string;
}

// Cart Type
export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

// Input Types for Mutations
export interface AddToCartInput {
  productId: string;
  quantity: number;
}

export interface UpdateCartItemInput {
  cartItemId: string;
  quantity: number;
}

export interface SelectItemsInput {
  cartItemIds: string[];
  selected: boolean;
}

// Checkout Summary
export interface CheckoutSummary {
  selectedItems: CartItem[];
  totalItems: number;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

// Response Types
export interface CartResponse {
  success: boolean;
  message: string;
  cart?: Cart;
}

export interface CheckoutResponse {
  success: boolean;
  message: string;
  summary?: CheckoutSummary;
}

