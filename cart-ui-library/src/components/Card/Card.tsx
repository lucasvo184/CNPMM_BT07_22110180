import React from 'react';
import { CardProps } from '../../types';

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  padding = 'md',
}) => {
  const classes = [
    'cart-card',
    `cart-card--${variant}`,
    `cart-card--padding-${padding}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={classes}>{children}</div>;
};

export default Card;

