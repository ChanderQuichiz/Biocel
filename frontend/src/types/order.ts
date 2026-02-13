import type { Address } from "./address";

export interface Order {
  orderId?: number;
  userId?: number;
  status?: 'pending' | 'preparing' | 'out_for_delivery' | 'delivered' | 'postponed';
  deliveryMethod?: 'pickup' | 'delivery';
  address: Address;
  total?: number;
  discount?: number;
  estimatedDelivery?: string;
  createdAt?: string;
}
