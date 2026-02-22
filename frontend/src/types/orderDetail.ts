export interface OrderDetail {
  orderDetailId?: number;
  orderId?: number;
  productId?: number;
  quantity?: number;
  price?: number;
  subtotal?: number;

  product?: {
    productId?: number;
    name?: string;
    imageUrl?: string;
  };
}