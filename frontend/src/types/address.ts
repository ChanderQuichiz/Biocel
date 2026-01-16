import type { User } from "./user";

export interface Address {
  addressId?: number;
  user?: User;
  address?: string;
  city?: string;
  district?: string;
  postalCode?: string;
  phone?: string;
  addressType?: 'primary' | 'secondary';
  createdAt?: string;
  updatedAt?: string;
}
