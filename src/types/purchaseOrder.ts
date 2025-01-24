export type PurchaseOrderStatus = 'Created' | 'Approved' | 'Sent' | 'Partially_Received' | 'Completed' | 'Cancelled';
export type PurchaseOrderItemStatus = 'Created' | 'Approved' | 'Partially_Received' | 'Completed';

export interface PurchaseOrderFilters {
  status: PurchaseOrderStatus | 'all';
}

export interface PurchaseOrderData {
  pid: string;
  id: string;
  created_date: string;
  shipTo: string;
  billTo: string;
  department: string;
  status: PurchaseOrderStatus;
  createdBy: string;
  approved: boolean;
  approvedBy: string;
  totalNetAmount: number;
  totalTaxAmount: number;
  totalAmount: number;
  sent: boolean;
  items: any[];
}

export interface PurchaseOrderItem {
  pid: string;
  name: string;
  description: string;
  manufacturer: string;
  manufacturerCode: string;
  supplierCode: string;
  unitOfMeasure: string;
  quantity: number;
  price: number;
  netAmount: number;
  taxAmount: number,
  taxGroup: number,
  account: string;
  reception_quantity: number;
  status: PurchaseOrderItemStatus;
}