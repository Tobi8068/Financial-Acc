export type RequisitionsStatus = 'Created' | 'Completed' | 'Approved' | 'Cancel' | 'Rejected' | 'In_Progress';
export type RequisitionItemStatus = 'Approved' | 'Partially_Approved'

export interface RequisitionsFilters {
  status: RequisitionsStatus | 'all';
}

export interface RequisitionItem {
  pid: string;
  name: string,
  description: string,
  manufacturer: string,
  manufacturerCode: string,
  supplierName: string,
  unitOfMeasure: string,
  quantity: number,
  price: number,
  netAmount: number;
  taxAmount: number,
  taxGroup: number,
  status: RequisitionItemStatus
}

export interface RequisitionsData {
  pid: string;
  id: string;
  dateCreated: string;
  shipTo: string;
  billTo: string;
  department: string;
  items: any[];
  status: RequisitionsStatus;
  approvedBy: string;
  createdBy: string;
  totalNetAmount: number;
  totalTaxAmount: number;
  totalAmount: number;
} 