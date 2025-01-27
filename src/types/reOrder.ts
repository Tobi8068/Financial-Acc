export type ReOrderStatus = 'Created' | 'Cancelled' | 'Approved' | 'Partially_Received' | 'Completed';

export interface ReOrderFilters {
  status: ReOrderStatus | 'all';
}

export interface ReOrderData {
  id: string;
  name: string;
  date: string;
  numberOfItem: number;
  numberOfRequisition: number;
  description: string;
  orderUnit: string;
  preferredSupplier: string;
  price: number;
  itemCode: string;
  manufacturer: string;
  manufacturer_code: string;
}

export interface ReOrderItem {
  name: string,
  description: string,
  manufacturer: string,
  manufacturer_code: string,
  supplierCode: string,
  supplierName: string,
  unitOfMeasure: string,
  quantity: number,
  price: number,
  total: number,
  taxGroup: string,
  status: ReOrderStatus,
} 