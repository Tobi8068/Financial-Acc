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
  manufacturerName: string;
  manufacturerCode: string;
}

export interface ReOrderItem {
  name: string,
  description: string,
  manufacturerCode: string,
  manufacturerName: string,
  supplierCode: string,
  supplierName: string,
  unitOfMeasure: string,
  quantity: number,
  price: number,
  total: number,
  taxGroup: string,
  status: ReOrderStatus,
}

export interface ReOrderItemsData {
  name: string;
  description: string;
  quantity: number;
  price: number;
  total: number;
  taxGroup: string;
  taxAmount: number;
  unitOfMeasure: string;
  supplier: string;
  supplierCode: string;
  manufacturerName: string;
  manufacturerCode: string;
}