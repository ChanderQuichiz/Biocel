export interface Payment {
  paymentId?: number;
  orderId?: number;
  paymentMethod?: 'cash' | 'card' | 'transfer';
  amount?: number;
  currency?: string;
  transactionId?: string;
  paymentDate?: string;
  status?: 'pending' | 'completed' | 'failed';
}
