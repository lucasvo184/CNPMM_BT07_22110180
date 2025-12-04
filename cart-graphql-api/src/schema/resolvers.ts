import {
  getAllProducts,
  getProductById,
  searchProducts,
} from '../data/products.js';
import {
  getOrCreateCart,
  addItemToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
  selectCartItems,
  selectAllItems,
  getCheckoutSummary,
} from '../data/carts.js';
import { Cart, CartItem } from '../types/index.js';

// Format price to Vietnamese currency
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
};

export const resolvers = {
  // Field resolvers for computed fields
  CartItem: {
    subtotal: (parent: CartItem) => parent.product.price * parent.quantity,
  },

  Cart: {
    totalItems: (parent: Cart) =>
      parent.items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: (parent: Cart) =>
      parent.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      ),
    selectedCount: (parent: Cart) =>
      parent.items.filter((item) => item.selected).length,
  },

  CheckoutSummary: {
    formattedSubtotal: (parent: { subtotal: number }) =>
      formatPrice(parent.subtotal),
    formattedTax: (parent: { tax: number }) => formatPrice(parent.tax),
    formattedShipping: (parent: { shipping: number }) =>
      parent.shipping === 0 ? 'Miễn phí' : formatPrice(parent.shipping),
    formattedTotal: (parent: { total: number }) => formatPrice(parent.total),
  },

  // Query resolvers
  Query: {
    // Get all products
    products: () => {
      return getAllProducts();
    },

    // Get product by ID
    product: (_: unknown, { id }: { id: string }) => {
      return getProductById(id);
    },

    // Search products
    searchProducts: (_: unknown, { query }: { query: string }) => {
      return searchProducts(query);
    },

    // Get cart
    cart: (_: unknown, { userId }: { userId?: string }) => {
      return getOrCreateCart(userId);
    },

    // Get cart item
    cartItem: (_: unknown, { cartItemId }: { cartItemId: string }) => {
      const cart = getOrCreateCart();
      return cart.items.find((item) => item.id === cartItemId);
    },

    // Get checkout summary
    checkoutSummary: (_: unknown, { userId }: { userId?: string }) => {
      return getCheckoutSummary(userId);
    },
  },

  // Mutation resolvers
  Mutation: {
    // Add to cart
    addToCart: (
      _: unknown,
      {
        input,
        userId,
      }: { input: { productId: string; quantity: number }; userId?: string }
    ) => {
      try {
        const cart = addItemToCart(userId, input.productId, input.quantity);
        return {
          success: true,
          message: 'Đã thêm sản phẩm vào giỏ hàng thành công',
          cart,
        };
      } catch (error) {
        return {
          success: false,
          message: error instanceof Error ? error.message : 'Có lỗi xảy ra',
          cart: null,
        };
      }
    },

    // Update cart item
    updateCartItem: (
      _: unknown,
      {
        input,
        userId,
      }: { input: { cartItemId: string; quantity: number }; userId?: string }
    ) => {
      try {
        const cart = updateCartItem(userId, input.cartItemId, input.quantity);
        return {
          success: true,
          message: 'Đã cập nhật số lượng thành công',
          cart,
        };
      } catch (error) {
        return {
          success: false,
          message: error instanceof Error ? error.message : 'Có lỗi xảy ra',
          cart: null,
        };
      }
    },

    // Remove from cart
    removeFromCart: (
      _: unknown,
      { cartItemId, userId }: { cartItemId: string; userId?: string }
    ) => {
      try {
        const cart = removeCartItem(userId, cartItemId);
        return {
          success: true,
          message: 'Đã xóa sản phẩm khỏi giỏ hàng',
          cart,
        };
      } catch (error) {
        return {
          success: false,
          message: error instanceof Error ? error.message : 'Có lỗi xảy ra',
          cart: null,
        };
      }
    },

    // Clear cart
    clearCart: (_: unknown, { userId }: { userId?: string }) => {
      try {
        const cart = clearCart(userId);
        return {
          success: true,
          message: 'Đã xóa toàn bộ giỏ hàng',
          cart,
        };
      } catch (error) {
        return {
          success: false,
          message: error instanceof Error ? error.message : 'Có lỗi xảy ra',
          cart: null,
        };
      }
    },

    // Select items for checkout
    selectItems: (
      _: unknown,
      {
        input,
        userId,
      }: {
        input: { cartItemIds: string[]; selected: boolean };
        userId?: string;
      }
    ) => {
      try {
        const cart = selectCartItems(
          userId,
          input.cartItemIds,
          input.selected
        );
        return {
          success: true,
          message: input.selected
            ? 'Đã chọn sản phẩm để thanh toán'
            : 'Đã bỏ chọn sản phẩm',
          cart,
        };
      } catch (error) {
        return {
          success: false,
          message: error instanceof Error ? error.message : 'Có lỗi xảy ra',
          cart: null,
        };
      }
    },

    // Select all items
    selectAllItems: (
      _: unknown,
      { selected, userId }: { selected: boolean; userId?: string }
    ) => {
      try {
        const cart = selectAllItems(userId, selected);
        return {
          success: true,
          message: selected
            ? 'Đã chọn tất cả sản phẩm'
            : 'Đã bỏ chọn tất cả sản phẩm',
          cart,
        };
      } catch (error) {
        return {
          success: false,
          message: error instanceof Error ? error.message : 'Có lỗi xảy ra',
          cart: null,
        };
      }
    },

    // Increment quantity
    incrementQuantity: (
      _: unknown,
      { cartItemId, userId }: { cartItemId: string; userId?: string }
    ) => {
      try {
        const cart = getOrCreateCart(userId);
        const item = cart.items.find((i) => i.id === cartItemId);
        if (!item) {
          throw new Error('Không tìm thấy sản phẩm trong giỏ hàng');
        }
        const updatedCart = updateCartItem(
          userId,
          cartItemId,
          item.quantity + 1
        );
        return {
          success: true,
          message: 'Đã tăng số lượng',
          cart: updatedCart,
        };
      } catch (error) {
        return {
          success: false,
          message: error instanceof Error ? error.message : 'Có lỗi xảy ra',
          cart: null,
        };
      }
    },

    // Decrement quantity
    decrementQuantity: (
      _: unknown,
      { cartItemId, userId }: { cartItemId: string; userId?: string }
    ) => {
      try {
        const cart = getOrCreateCart(userId);
        const item = cart.items.find((i) => i.id === cartItemId);
        if (!item) {
          throw new Error('Không tìm thấy sản phẩm trong giỏ hàng');
        }
        if (item.quantity <= 1) {
          throw new Error('Số lượng không thể nhỏ hơn 1');
        }
        const updatedCart = updateCartItem(
          userId,
          cartItemId,
          item.quantity - 1
        );
        return {
          success: true,
          message: 'Đã giảm số lượng',
          cart: updatedCart,
        };
      } catch (error) {
        return {
          success: false,
          message: error instanceof Error ? error.message : 'Có lỗi xảy ra',
          cart: null,
        };
      }
    },

    // Checkout
    checkout: (_: unknown, { userId }: { userId?: string }) => {
      try {
        const summary = getCheckoutSummary(userId);

        if (summary.selectedItems.length === 0) {
          return {
            success: false,
            message: 'Vui lòng chọn ít nhất một sản phẩm để thanh toán',
            summary: null,
          };
        }

        // In production, here you would:
        // 1. Create an order
        // 2. Process payment
        // 3. Remove selected items from cart
        // 4. Update inventory

        return {
          success: true,
          message: `Thanh toán thành công! Tổng tiền: ${formatPrice(summary.total)}`,
          summary,
        };
      } catch (error) {
        return {
          success: false,
          message: error instanceof Error ? error.message : 'Có lỗi xảy ra',
          summary: null,
        };
      }
    },
  },
};

