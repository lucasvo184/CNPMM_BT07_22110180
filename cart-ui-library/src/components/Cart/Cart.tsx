import React from 'react';
import { CartProps } from '../../types';
import { CartItemCard } from './CartItemCard';
import { Button } from '../Button';

export const Cart: React.FC<CartProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  currency = 'đ',
  emptyMessage = 'Giỏ hàng của bạn đang trống',
}) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  return (
    <div className="cart-container">
      <header className="cart-header">
        <h2 className="cart-title">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Giỏ hàng
        </h2>
        {items.length > 0 && (
          <span className="cart-badge">{totalItems} sản phẩm</span>
        )}
      </header>

      {items.length === 0 ? (
        <div className="cart-empty">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <p className="cart-empty__message">{emptyMessage}</p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {items.map((item) => (
              <CartItemCard
                key={item.id}
                item={item}
                onUpdateQuantity={onUpdateQuantity}
                onRemove={onRemoveItem}
                currency={currency}
              />
            ))}
          </div>

          <footer className="cart-footer">
            <div className="cart-summary">
              <div className="cart-summary__row">
                <span>Tạm tính ({totalItems} sản phẩm)</span>
                <span>{formatPrice(subtotal)}{currency}</span>
              </div>
              <div className="cart-summary__row">
                <span>Phí vận chuyển</span>
                <span>Miễn phí</span>
              </div>
              <div className="cart-summary__row cart-summary__row--total">
                <span>Tổng cộng</span>
                <span className="cart-summary__value">{formatPrice(subtotal)}{currency}</span>
              </div>
            </div>

            <div className="cart-actions">
              <Button
                variant="outline"
                onClick={onClearCart}
              >
                Xóa tất cả
              </Button>
              <Button
                variant="primary"
                fullWidth
              >
                Thanh toán
              </Button>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default Cart;

