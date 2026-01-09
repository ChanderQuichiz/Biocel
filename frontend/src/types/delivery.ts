export interface Delivery {
  deliveryId: number;
  orderId: number;
  deliveryPersonId?: number;
  status: 'pending' | 'out_for_delivery' | 'delivered' | 'postponed';
  deliveryFee: number;
  scheduledDate?: string;
  actualDelivery?: string;
  delayReason?: string;
  updatedAt: string;
}
