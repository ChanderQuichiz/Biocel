export interface User {
  userId: number;
  lastName: string;
  firstName: string;
  email: string;
  password: string;
  phone?: string;
  role: 'customer' | 'delivery' | 'admin';
  status: 'active' | 'inactive';
  lastLogin?: string;
  createdAt: string;
}
