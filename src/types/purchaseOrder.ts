export type PurchaseOrderStatus = 'Created' | 'Approved' | 'Sent' | 'Partially_Received' | 'Completed' | 'Cancelled';

export interface PurchaseOrderFilters {
  status: PurchaseOrderStatus | 'all';
}

export interface PurchaseOrderData {
  id: string;
  dateCreated: string;
  shipTo: string;
  billTo: string;
  department: string;
  status: PurchaseOrderStatus;
  createdBy: string;
  approved: boolean;
  approvedBy: string;
}

export interface PurchaseOrderDetailData {
  name: string;
  description: string;
  manufacturerCode: string;
  manufacturerName: string;
  supplierCode: string;
  supplierName: string;
  unitOfMeasure: string;
  quantity: number;
  price: number;
  total: number;
  taxGroup: string;
  status: PurchaseOrderStatus;
}