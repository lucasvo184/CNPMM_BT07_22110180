import { Product } from '../types/index.js';

// Mock product data
export const products: Product[] = [
  {
    id: 'prod-001',
    name: 'iPhone 15 Pro Max',
    price: 34990000,
    description: 'Điện thoại Apple iPhone 15 Pro Max chính hãng',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569',
    stock: 50,
    category: 'Điện thoại',
  },
  {
    id: 'prod-002',
    name: 'MacBook Pro M3',
    price: 49990000,
    description: 'Laptop Apple MacBook Pro với chip M3',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
    stock: 30,
    category: 'Laptop',
  },
  {
    id: 'prod-003',
    name: 'AirPods Pro 2',
    price: 6990000,
    description: 'Tai nghe không dây Apple AirPods Pro thế hệ 2',
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434',
    stock: 100,
    category: 'Phụ kiện',
  },
  {
    id: 'prod-004',
    name: 'Apple Watch Ultra 2',
    price: 21990000,
    description: 'Đồng hồ thông minh Apple Watch Ultra 2',
    image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d',
    stock: 25,
    category: 'Đồng hồ',
  },
  {
    id: 'prod-005',
    name: 'iPad Pro M2',
    price: 28990000,
    description: 'Máy tính bảng iPad Pro 12.9 inch chip M2',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0',
    stock: 40,
    category: 'Tablet',
  },
  {
    id: 'prod-006',
    name: 'Samsung Galaxy S24 Ultra',
    price: 31990000,
    description: 'Điện thoại Samsung Galaxy S24 Ultra',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf',
    stock: 45,
    category: 'Điện thoại',
  },
  {
    id: 'prod-007',
    name: 'Sony WH-1000XM5',
    price: 8990000,
    description: 'Tai nghe chống ồn Sony WH-1000XM5',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b',
    stock: 60,
    category: 'Phụ kiện',
  },
  {
    id: 'prod-008',
    name: 'Dell XPS 15',
    price: 42990000,
    description: 'Laptop Dell XPS 15 inch cao cấp',
    image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89',
    stock: 20,
    category: 'Laptop',
  },
];

// Get product by ID
export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};

// Get all products
export const getAllProducts = (): Product[] => {
  return products;
};

// Search products
export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description?.toLowerCase().includes(lowerQuery) ||
      p.category?.toLowerCase().includes(lowerQuery)
  );
};

