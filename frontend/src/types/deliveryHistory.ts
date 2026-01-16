export interface DeliveryHistory {
  historyId?: number;
  deliveryId?: number;
  status?: 'pending' | 'out_for_delivery' | 'delivered' | 'postponed';
  comment?: string;
  updatedAt?: string;
}
