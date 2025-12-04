# Cart GraphQL API

GraphQL API cho chức năng Giỏ hàng - CNPMM BT07 - 22110180

## Cài đặt

```bash
npm install
```

## Chạy server

```bash
# Development mode (với hot reload)
npm run dev

# Production mode
npm run build
npm start
```

Server sẽ chạy tại: http://localhost:4000

## GraphQL Playground

Truy cập http://localhost:4000 để mở Apollo Sandbox và test API.

## Các chức năng API

### 1. Xem giỏ hàng

```graphql
query GetCart {
  cart {
    id
    items {
      id
      product {
        name
        price
      }
      quantity
      selected
      subtotal
    }
    totalItems
    totalPrice
  }
}
```

### 2. Thêm sản phẩm vào giỏ hàng

```graphql
mutation AddToCart {
  addToCart(input: { productId: "prod-001", quantity: 2 }) {
    success
    message
    cart {
      items {
        id
        product {
          name
        }
        quantity
      }
    }
  }
}
```

### 3. Sửa số lượng sản phẩm

```graphql
mutation UpdateQuantity {
  updateCartItem(input: { cartItemId: "item-id", quantity: 3 }) {
    success
    message
    cart {
      items {
        quantity
      }
    }
  }
}
```

### 4. Xóa sản phẩm khỏi giỏ hàng

```graphql
mutation RemoveItem {
  removeFromCart(cartItemId: "item-id") {
    success
    message
  }
}
```

### 5. Xóa toàn bộ giỏ hàng

```graphql
mutation ClearCart {
  clearCart {
    success
    message
  }
}
```

### 6. Chọn sản phẩm để thanh toán

```graphql
# Chọn một hoặc nhiều sản phẩm
mutation SelectItems {
  selectItems(input: { cartItemIds: ["item-1", "item-2"], selected: true }) {
    success
    message
    cart {
      items {
        selected
      }
    }
  }
}

# Chọn tất cả
mutation SelectAll {
  selectAllItems(selected: true) {
    success
    message
  }
}
```

### 7. Xem tổng kết thanh toán

```graphql
query CheckoutSummary {
  checkoutSummary {
    selectedItems {
      product {
        name
      }
      quantity
      subtotal
    }
    totalItems
    subtotal
    tax
    shipping
    total
    formattedTotal
  }
}
```

### 8. Thanh toán

```graphql
mutation Checkout {
  checkout {
    success
    message
    summary {
      totalItems
      formattedTotal
    }
  }
}
```

## Sản phẩm mẫu

API có sẵn 8 sản phẩm mẫu:

| ID | Tên sản phẩm | Giá |
|---|---|---|
| prod-001 | iPhone 15 Pro Max | 34,990,000đ |
| prod-002 | MacBook Pro M3 | 49,990,000đ |
| prod-003 | AirPods Pro 2 | 6,990,000đ |
| prod-004 | Apple Watch Ultra 2 | 21,990,000đ |
| prod-005 | iPad Pro M2 | 28,990,000đ |
| prod-006 | Samsung Galaxy S24 Ultra | 31,990,000đ |
| prod-007 | Sony WH-1000XM5 | 8,990,000đ |
| prod-008 | Dell XPS 15 | 42,990,000đ |

## Cấu trúc thư mục

```
cart-graphql-api/
├── src/
│   ├── data/
│   │   ├── products.ts    # Mock product data
│   │   └── carts.ts       # Cart operations
│   ├── schema/
│   │   ├── typeDefs.ts    # GraphQL schema
│   │   └── resolvers.ts   # GraphQL resolvers
│   ├── types/
│   │   └── index.ts       # TypeScript types
│   └── index.ts           # Server entry point
├── package.json
├── tsconfig.json
└── README.md
```

## License

MIT © UTE Student 22110180

