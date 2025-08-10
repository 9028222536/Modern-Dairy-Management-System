export interface Product {
  id: string;
  name: string;
  category: 'milk' | 'cheese' | 'butter' | 'yogurt' | 'curd';
  quantity: number;
  unit: 'liters' | 'kg' | 'pieces';
  batchNumber: string;
  manufacturingDate: Date;
  expiryDate: Date;
  price: number;
  temperature: number;
  supplier: string;
}

export interface Batch {
  id: string;
  productId: string;
  quantity: number;
  manufacturingDate: Date;
  expiryDate: Date;
  status: 'in-stock' | 'low-stock' | 'expired' | 'dispatched';
}

export interface Order {
  id: string;
  customerId: string;
  products: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  status: 'pending' | 'processing' | 'dispatched' | 'delivered';
  orderDate: Date;
  deliveryDate?: Date;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  type: 'retail' | 'wholesale' | 'distributor';
  address: string;
  phone: string;
  loyaltyPoints: number;
}