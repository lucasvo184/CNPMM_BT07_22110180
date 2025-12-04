import React from 'react';
import { ButtonProps } from '../../types';

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseClass = 'cart-btn';
  const variantClass = `cart-btn--${variant}`;
  const sizeClass = `cart-btn--${size}`;
  const fullWidthClass = fullWidth ? 'cart-btn--full-width' : '';

  const classes = [baseClass, variantClass, sizeClass, fullWidthClass, className]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="cart-btn__spinner" aria-hidden="true" />}
      {children}
    </button>
  );
};

export default Button;

