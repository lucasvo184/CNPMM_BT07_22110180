// Components
export { Button } from './components/Button';
export { Input } from './components/Input';
export { Modal } from './components/Modal';
export { Card } from './components/Card';
export { Cart, CartItemCard, AddToCartButton, CartIcon } from './components/Cart';

// Context & Hooks
export { CartProvider, useCart, CartContext } from './context';

// Types
export type {
  CartItem,
  ButtonProps,
  InputProps,
  ModalProps,
  CardProps,
  CartProps,
  CartItemCardProps,
  AddToCartButtonProps,
  CartContextType,
} from './types';

// Styles
import './styles/index.css';

