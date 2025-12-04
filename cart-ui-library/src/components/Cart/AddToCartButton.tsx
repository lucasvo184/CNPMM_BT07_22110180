import React, { useState } from 'react';
import { AddToCartButtonProps } from '../../types';
import { Button } from '../Button';

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  onAdd,
  quantity = 1,
}) => {
  const [isAdding, setIsAdding] = useState(false);

  const handleClick = () => {
    setIsAdding(true);
    
    onAdd({
      ...product,
      quantity,
    });

    // Reset animation after a short delay
    setTimeout(() => {
      setIsAdding(false);
    }, 600);
  };

  return (
    <Button
      variant="primary"
      onClick={handleClick}
      loading={isAdding}
      className="add-to-cart-btn"
    >
      {!isAdding && (
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
      )}
      {isAdding ? 'Đã thêm!' : 'Thêm vào giỏ'}
    </Button>
  );
};

export default AddToCartButton;

