export interface Address {
  addressId: number;
  userId: number;
  address: string;
  city?: string;
  district?: string;
  postalCode?: string;
  phone?: string;
  addressType: 'primary' | 'secondary';
  createdAt: string;
  updatedAt: string;
}
