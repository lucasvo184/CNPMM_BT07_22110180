import React from 'react';
import { CartItemCardProps } from '../../types';

export const CartItemCard: React.FC<CartItemCardProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
  currency = 'đ',
}) => {
  const handleIncrement = () => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  return (
    <div className="cart-item-card">
      {item.image ? (
        <img
          src={item.image}
          alt={item.name}
          className="cart-item-card__image"
        />
      ) : (
        <div className="cart-item-card__image-placeholder">
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
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      )}

      <div className="cart-item-card__content">
        <div className="cart-item-card__header">
          <div>
            <h4 className="cart-item-card__name">{item.name}</h4>
            {item.description && (
              <p className="cart-item-card__description">{item.description}</p>
            )}
          </div>
          <button
            className="cart-item-card__remove"
            onClick={() => onRemove(item.id)}
            aria-label={`Xóa ${item.name} khỏi giỏ hàng`}
          >
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>

        <div className="cart-item-card__footer">
          <span className="cart-item-card__price">
            {formatPrice(item.price * item.quantity)}{currency}
          </span>
          
          <div className="cart-item-card__quantity">
            <button
              className="cart-item-card__quantity-btn"
              onClick={handleDecrement}
              disabled={item.quantity <= 1}
              aria-label="Giảm số lượng"
            >
              −
            </button>
            <span className="cart-item-card__quantity-value">{item.quantity}</span>
            <button
              className="cart-item-card__quantity-btn"
              onClick={handleIncrement}
              aria-label="Tăng số lượng"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;

