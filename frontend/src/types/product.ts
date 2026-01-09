export interface Product {
  productId: number;
  name: string;
  brand?: string;
  category?: string;
  description?: string;
  imageUrl?: string;
  price: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
}
