export interface PaymentHistory {
  historyId?: number;
  paymentId?: number;
  status?: 'pending' | 'completed' | 'failed';
  transactionId?: string;
  note?: string;
  updatedAt?: string;
}
