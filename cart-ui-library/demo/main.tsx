import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  CartProvider,
  useCart,
  Cart,
  AddToCartButton,
  CartIcon,
  Button,
  Input,
  Modal,
  Card,
  CartItem,
} from '../src';
import '../src/styles/index.css';

// Sample products
const sampleProducts: Omit<CartItem, 'quantity'>[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    price: 34990000,
    description: 'Điện thoại Apple chính hãng',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=300&h=300&fit=crop',
  },
  {
    id: '2',
    name: 'MacBook Pro M3',
    price: 49990000,
    description: 'Laptop Apple M3 chip',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop',
  },
  {
    id: '3',
    name: 'AirPods Pro 2',
    price: 6990000,
    description: 'Tai nghe không dây Apple',
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=300&h=300&fit=crop',
  },
  {
    id: '4',
    name: 'Apple Watch Ultra 2',
    price: 21990000,
    description: 'Đồng hồ thông minh cao cấp',
    image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=300&h=300&fit=crop',
  },
];

// Demo styles
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
    fontFamily: 'Poppins, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    paddingBottom: '1rem',
    borderBottom: '2px solid #e2e8f0',
  },
  title: {
    margin: 0,
    fontSize: '1.75rem',
    color: '#0f172a',
  },
  subtitle: {
    margin: '0.25rem 0 0',
    color: '#64748b',
    fontSize: '0.875rem',
  },
  section: {
    marginBottom: '3rem',
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: '1rem',
    color: '#334155',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
  },
  productCard: {
    background: '#fff',
    borderRadius: '0.75rem',
    overflow: 'hidden',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  },
  productImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  productInfo: {
    padding: '1rem',
  },
  productName: {
    margin: '0 0 0.5rem',
    fontSize: '1rem',
    fontWeight: 600,
  },
  productDesc: {
    margin: '0 0 0.75rem',
    color: '#64748b',
    fontSize: '0.875rem',
  },
  productPrice: {
    fontSize: '1.125rem',
    fontWeight: 700,
    color: '#0d9488',
    marginBottom: '0.75rem',
  },
  flexRow: {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap' as const,
    alignItems: 'center',
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 400px',
    gap: '2rem',
  },
};

// Product Card Component
const ProductCard: React.FC<{ product: Omit<CartItem, 'quantity'> }> = ({ product }) => {
  const { addItem } = useCart();
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  return (
    <div style={styles.productCard}>
      <img src={product.image} alt={product.name} style={styles.productImage} />
      <div style={styles.productInfo}>
        <h3 style={styles.productName}>{product.name}</h3>
        <p style={styles.productDesc}>{product.description}</p>
        <p style={styles.productPrice}>{formatPrice(product.price)}đ</p>
        <AddToCartButton product={product} onAdd={addItem} />
      </div>
    </div>
  );
};

// Main App Component
const App: React.FC = () => {
  const [showCart, setShowCart] = useState(false);
  const [showComponentDemo, setShowComponentDemo] = useState(false);

  return (
    <CartProvider>
      <div style={styles.container}>
        {/* Header */}
        <header style={styles.header}>
          <div>
            <h1 style={styles.title}>🛒 UTE Cart UI Library</h1>
            <p style={styles.subtitle}>Demo thư viện Giỏ hàng - CNPMM BT07 - 22110180</p>
          </div>
          <div style={styles.flexRow}>
            <Button variant="outline" onClick={() => setShowComponentDemo(true)}>
              Xem Components
            </Button>
            <CartIconWithBadge onClick={() => setShowCart(true)} />
          </div>
        </header>

        {/* Main Content */}
        <div style={styles.mainGrid}>
          {/* Products Section */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Sản phẩm</h2>
            <div style={styles.grid}>
              {sampleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          {/* Cart Section */}
          <section>
            <CartSection />
          </section>
        </div>

        {/* Cart Modal */}
        <Modal
          isOpen={showCart}
          onClose={() => setShowCart(false)}
          title="Giỏ hàng của bạn"
          size="lg"
        >
          <CartSection />
        </Modal>

        {/* Component Demo Modal */}
        <Modal
          isOpen={showComponentDemo}
          onClose={() => setShowComponentDemo(false)}
          title="Demo các Component chuẩn hóa"
          size="lg"
        >
          <ComponentDemo />
        </Modal>
      </div>
    </CartProvider>
  );
};

// Cart Icon with Badge
const CartIconWithBadge: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const { totalItems } = useCart();
  return <CartIcon itemCount={totalItems} onClick={onClick} />;
};

// Cart Section
const CartSection: React.FC = () => {
  const { items, updateQuantity, removeItem, clearCart } = useCart();
  
  return (
    <Cart
      items={items}
      onUpdateQuantity={updateQuantity}
      onRemoveItem={removeItem}
      onClearCart={clearCart}
      currency="đ"
    />
  );
};

// Component Demo
const ComponentDemo: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  
  return (
    <div>
      <h3 style={styles.sectionTitle}>Buttons</h3>
      <div style={{ ...styles.flexRow, marginBottom: '1.5rem' }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="success">Success</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="primary" loading>Loading</Button>
      </div>

      <h3 style={styles.sectionTitle}>Button Sizes</h3>
      <div style={{ ...styles.flexRow, marginBottom: '1.5rem' }}>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>

      <h3 style={styles.sectionTitle}>Input</h3>
      <div style={{ maxWidth: '400px', marginBottom: '1.5rem' }}>
        <Input
          label="Email"
          placeholder="Nhập email của bạn"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          helperText="Chúng tôi không chia sẻ email của bạn"
          fullWidth
        />
      </div>
      <div style={{ maxWidth: '400px', marginBottom: '1.5rem' }}>
        <Input
          label="Số điện thoại"
          placeholder="Nhập số điện thoại"
          error="Số điện thoại không hợp lệ"
          fullWidth
        />
      </div>

      <h3 style={styles.sectionTitle}>Cards</h3>
      <div style={{ ...styles.flexRow, marginBottom: '1.5rem' }}>
        <Card variant="default" padding="md">
          <strong>Default Card</strong>
          <p style={{ margin: '0.5rem 0 0', color: '#64748b', fontSize: '0.875rem' }}>
            Card với border mặc định
          </p>
        </Card>
        <Card variant="elevated" padding="md">
          <strong>Elevated Card</strong>
          <p style={{ margin: '0.5rem 0 0', color: '#64748b', fontSize: '0.875rem' }}>
            Card với shadow
          </p>
        </Card>
        <Card variant="outlined" padding="md">
          <strong>Outlined Card</strong>
          <p style={{ margin: '0.5rem 0 0', color: '#64748b', fontSize: '0.875rem' }}>
            Card với border đậm
          </p>
        </Card>
      </div>
    </div>
  );
};

// Render App
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

