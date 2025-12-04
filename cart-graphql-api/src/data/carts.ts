import { v4 as uuidv4 } from 'uuid';
import { Cart, CartItem } from '../types/index.js';
import { getProductById } from './products.js';

// In-memory cart storage (in production, use a database)
const carts: Map<string, Cart> = new Map();

// Default user ID for demo
const DEFAULT_USER_ID = 'user-001';

// Get or create cart for user
export const getOrCreateCart = (userId: string = DEFAULT_USER_ID): Cart => {
  let cart = carts.get(userId);
  
  if (!cart) {
    cart = {
      id: uuidv4(),
      userId,
      items: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    carts.set(userId, cart);
  }
  
  return cart;
};

// Get cart by user ID
export const getCart = (userId: string = DEFAULT_USER_ID): Cart | undefined => {
  return carts.get(userId);
};

// Add item to cart
export const addItemToCart = (
  userId: string = DEFAULT_USER_ID,
  productId: string,
  quantity: number
): Cart => {
  const cart = getOrCreateCart(userId);
  const product = getProductById(productId);
  
  if (!product) {
    throw new Error(`Sản phẩm với ID ${productId} không tồn tại`);
  }
  
  if (quantity <= 0) {
    throw new Error('Số lượng phải lớn hơn 0');
  }
  
  if (quantity > product.stock) {
    throw new Error(`Không đủ hàng. Chỉ còn ${product.stock} sản phẩm`);
  }
  
  // Check if item already exists in cart
  const existingItemIndex = cart.items.findIndex(
    (item) => item.productId === productId
  );
  
  if (existingItemIndex >= 0) {
    // Update quantity
    const newQuantity = cart.items[existingItemIndex].quantity + quantity;
    if (newQuantity > product.stock) {
      throw new Error(`Không thể thêm. Tổng số lượng vượt quá kho (${product.stock})`);
    }
    cart.items[existingItemIndex].quantity = newQuantity;
  } else {
    // Add new item
    const newItem: CartItem = {
      id: uuidv4(),
      productId,
      product,
      quantity,
      selected: true, // Selected by default
      addedAt: new Date().toISOString(),
    };
    cart.items.push(newItem);
  }
  
  cart.updatedAt = new Date().toISOString();
  carts.set(userId, cart);
  
  return cart;
};

// Update cart item quantity
export const updateCartItem = (
  userId: string = DEFAULT_USER_ID,
  cartItemId: string,
  quantity: number
): Cart => {
  const cart = getOrCreateCart(userId);
  
  const itemIndex = cart.items.findIndex((item) => item.id === cartItemId);
  
  if (itemIndex < 0) {
    throw new Error(`Không tìm thấy sản phẩm trong giỏ hàng`);
  }
  
  if (quantity <= 0) {
    // Remove item if quantity is 0 or less
    cart.items.splice(itemIndex, 1);
  } else {
    const product = cart.items[itemIndex].product;
    if (quantity > product.stock) {
      throw new Error(`Không đủ hàng. Chỉ còn ${product.stock} sản phẩm`);
    }
    cart.items[itemIndex].quantity = quantity;
  }
  
  cart.updatedAt = new Date().toISOString();
  carts.set(userId, cart);
  
  return cart;
};

// Remove item from cart
export const removeCartItem = (
  userId: string = DEFAULT_USER_ID,
  cartItemId: string
): Cart => {
  const cart = getOrCreateCart(userId);
  
  const itemIndex = cart.items.findIndex((item) => item.id === cartItemId);
  
  if (itemIndex < 0) {
    throw new Error(`Không tìm thấy sản phẩm trong giỏ hàng`);
  }
  
  cart.items.splice(itemIndex, 1);
  cart.updatedAt = new Date().toISOString();
  carts.set(userId, cart);
  
  return cart;
};

// Clear all items from cart
export const clearCart = (userId: string = DEFAULT_USER_ID): Cart => {
  const cart = getOrCreateCart(userId);
  cart.items = [];
  cart.updatedAt = new Date().toISOString();
  carts.set(userId, cart);
  
  return cart;
};

// Select/Deselect items for checkout
export const selectCartItems = (
  userId: string = DEFAULT_USER_ID,
  cartItemIds: string[],
  selected: boolean
): Cart => {
  const cart = getOrCreateCart(userId);
  
  cart.items = cart.items.map((item) => {
    if (cartItemIds.includes(item.id)) {
      return { ...item, selected };
    }
    return item;
  });
  
  cart.updatedAt = new Date().toISOString();
  carts.set(userId, cart);
  
  return cart;
};

// Select all items
export const selectAllItems = (
  userId: string = DEFAULT_USER_ID,
  selected: boolean
): Cart => {
  const cart = getOrCreateCart(userId);
  
  cart.items = cart.items.map((item) => ({ ...item, selected }));
  
  cart.updatedAt = new Date().toISOString();
  carts.set(userId, cart);
  
  return cart;
};

// Get checkout summary
export const getCheckoutSummary = (userId: string = DEFAULT_USER_ID) => {
  const cart = getOrCreateCart(userId);
  
  const selectedItems = cart.items.filter((item) => item.selected);
  const totalItems = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  
  // Calculate tax (10% VAT)
  const tax = subtotal * 0.1;
  
  // Free shipping for orders over 1,000,000 VND
  const shipping = subtotal >= 1000000 ? 0 : 30000;
  
  const total = subtotal + tax + shipping;
  
  return {
    selectedItems,
    totalItems,
    subtotal,
    tax,
    shipping,
    total,
  };
};

