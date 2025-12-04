import React from 'react';

interface CartIconProps {
  itemCount?: number;
  onClick?: () => void;
  className?: string;
}

export const CartIcon: React.FC<CartIconProps> = ({
  itemCount = 0,
  onClick,
  className = '',
}) => {
  return (
    <button
      className={`cart-icon-wrapper ${className}`}
      onClick={onClick}
      aria-label={`Giỏ hàng với ${itemCount} sản phẩm`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        width="24"
        height="24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      {itemCount > 0 && (
        <span className="cart-icon-badge">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </button>
  );
};

export default CartIcon;

