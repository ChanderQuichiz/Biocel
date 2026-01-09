export interface Order {
  orderId: number;
  userId: number;
  status: 'pending' | 'preparing' | 'out_for_delivery' | 'delivered' | 'postponed';
  deliveryMethod: 'pickup' | 'delivery';
  addressId?: number;
  total: number;
  discount: number;
  estimatedDelivery?: string;
  createdAt: string;
}
