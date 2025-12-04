# UTE Cart UI Library

Thư viện React component cho chức năng Giỏ hàng với các component UI được chuẩn hóa.

## Cài đặt

```bash
npm install ute-cart-ui-library
```

## Sử dụng

### Import CSS

```tsx
import 'ute-cart-ui-library/styles.css';
```

### Components cơ bản

#### Button

```tsx
import { Button } from 'ute-cart-ui-library';

<Button variant="primary" size="md" onClick={handleClick}>
  Click me
</Button>

// Các variant: 'primary' | 'secondary' | 'danger' | 'success' | 'outline'
// Các size: 'sm' | 'md' | 'lg'
```

#### Input

```tsx
import { Input } from 'ute-cart-ui-library';

<Input
  label="Tên sản phẩm"
  placeholder="Nhập tên sản phẩm"
  error="Vui lòng nhập tên"
  fullWidth
/>
```

#### Modal

```tsx
import { Modal, Button } from 'ute-cart-ui-library';

const [isOpen, setIsOpen] = useState(false);

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Chi tiết sản phẩm"
  size="md"
>
  <p>Nội dung modal</p>
</Modal>
```

#### Card

```tsx
import { Card } from 'ute-cart-ui-library';

<Card variant="elevated" padding="lg">
  <h3>Sản phẩm</h3>
  <p>Mô tả sản phẩm</p>
</Card>
```

### Components Giỏ hàng

#### Sử dụng với CartProvider (khuyến nghị)

```tsx
import { 
  CartProvider, 
  useCart, 
  Cart, 
  AddToCartButton 
} from 'ute-cart-ui-library';
import 'ute-cart-ui-library/styles.css';

function App() {
  return (
    <CartProvider>
      <ProductList />
      <CartSection />
    </CartProvider>
  );
}

function ProductList() {
  const { addItem } = useCart();
  
  const products = [
    { id: '1', name: 'Sản phẩm 1', price: 100000 },
    { id: '2', name: 'Sản phẩm 2', price: 200000 },
  ];

  return (
    <div>
      {products.map(product => (
        <AddToCartButton
          key={product.id}
          product={product}
          onAdd={addItem}
        />
      ))}
    </div>
  );
}

function CartSection() {
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
}
```

#### CartIcon với badge

```tsx
import { CartIcon, useCart } from 'ute-cart-ui-library';

function Header() {
  const { totalItems } = useCart();
  
  return (
    <header>
      <CartIcon 
        itemCount={totalItems} 
        onClick={() => setShowCart(true)} 
      />
    </header>
  );
}
```

## Types

```typescript
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  description?: string;
}
```

## Props

### Button Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'primary' \| 'secondary' \| 'danger' \| 'success' \| 'outline' | 'primary' | Kiểu button |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Kích thước |
| loading | boolean | false | Hiển thị loading |
| fullWidth | boolean | false | Full width |

### Cart Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | CartItem[] | required | Danh sách sản phẩm |
| onUpdateQuantity | (id: string, qty: number) => void | required | Cập nhật số lượng |
| onRemoveItem | (id: string) => void | required | Xóa sản phẩm |
| onClearCart | () => void | required | Xóa tất cả |
| currency | string | 'đ' | Đơn vị tiền tệ |
| emptyMessage | string | 'Giỏ hàng trống' | Thông báo khi trống |

## License

MIT © UTE Student 22110180

