export const typeDefs = `#graphql
  """
  Sản phẩm trong cửa hàng
  """
  type Product {
    id: ID!
    name: String!
    price: Float!
    description: String
    image: String
    stock: Int!
    category: String
  }

  """
  Sản phẩm trong giỏ hàng
  """
  type CartItem {
    id: ID!
    productId: String!
    product: Product!
    quantity: Int!
    selected: Boolean!
    addedAt: String!
    subtotal: Float!
  }

  """
  Giỏ hàng của người dùng
  """
  type Cart {
    id: ID!
    userId: String!
    items: [CartItem!]!
    totalItems: Int!
    totalPrice: Float!
    selectedCount: Int!
    createdAt: String!
    updatedAt: String!
  }

  """
  Tổng kết thanh toán
  """
  type CheckoutSummary {
    selectedItems: [CartItem!]!
    totalItems: Int!
    subtotal: Float!
    tax: Float!
    shipping: Float!
    total: Float!
    formattedSubtotal: String!
    formattedTax: String!
    formattedShipping: String!
    formattedTotal: String!
  }

  """
  Response cho các thao tác giỏ hàng
  """
  type CartResponse {
    success: Boolean!
    message: String!
    cart: Cart
  }

  """
  Response cho thanh toán
  """
  type CheckoutResponse {
    success: Boolean!
    message: String!
    summary: CheckoutSummary
  }

  """
  Input để thêm sản phẩm vào giỏ hàng
  """
  input AddToCartInput {
    productId: String!
    quantity: Int!
  }

  """
  Input để cập nhật số lượng sản phẩm
  """
  input UpdateCartItemInput {
    cartItemId: String!
    quantity: Int!
  }

  """
  Input để chọn sản phẩm thanh toán
  """
  input SelectItemsInput {
    cartItemIds: [String!]!
    selected: Boolean!
  }

  """
  Các truy vấn (Query)
  """
  type Query {
    """
    Lấy danh sách tất cả sản phẩm
    """
    products: [Product!]!

    """
    Lấy chi tiết một sản phẩm theo ID
    """
    product(id: ID!): Product

    """
    Tìm kiếm sản phẩm theo từ khóa
    """
    searchProducts(query: String!): [Product!]!

    """
    Xem giỏ hàng của người dùng
    """
    cart(userId: String): Cart!

    """
    Xem chi tiết một sản phẩm trong giỏ hàng
    """
    cartItem(cartItemId: String!): CartItem

    """
    Lấy tổng kết thanh toán (chỉ các sản phẩm đã chọn)
    """
    checkoutSummary(userId: String): CheckoutSummary!
  }

  """
  Các thao tác thay đổi dữ liệu (Mutation)
  """
  type Mutation {
    """
    Thêm sản phẩm vào giỏ hàng
    """
    addToCart(input: AddToCartInput!, userId: String): CartResponse!

    """
    Cập nhật số lượng sản phẩm trong giỏ hàng
    """
    updateCartItem(input: UpdateCartItemInput!, userId: String): CartResponse!

    """
    Xóa một sản phẩm khỏi giỏ hàng
    """
    removeFromCart(cartItemId: String!, userId: String): CartResponse!

    """
    Xóa toàn bộ giỏ hàng
    """
    clearCart(userId: String): CartResponse!

    """
    Chọn một hoặc nhiều sản phẩm để thanh toán
    """
    selectItems(input: SelectItemsInput!, userId: String): CartResponse!

    """
    Chọn tất cả sản phẩm trong giỏ hàng
    """
    selectAllItems(selected: Boolean!, userId: String): CartResponse!

    """
    Tăng số lượng sản phẩm lên 1
    """
    incrementQuantity(cartItemId: String!, userId: String): CartResponse!

    """
    Giảm số lượng sản phẩm đi 1
    """
    decrementQuantity(cartItemId: String!, userId: String): CartResponse!

    """
    Thực hiện thanh toán các sản phẩm đã chọn
    """
    checkout(userId: String): CheckoutResponse!
  }
`;

