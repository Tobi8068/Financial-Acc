export type RequisitionsStatus = 'Created' | 'Approved' | 'Sent' | 'Partially_Received' | 'Completed' | 'Cancelled';

export interface RequisitionsFilters {
  status: RequisitionsStatus | 'all';
}

export interface RequisitionsData {
  pid: string;
  id: string;
  dateCreated: string;
  shipTo: string;
  billTo: string;
  department: string;
  status: RequisitionsStatus;
  approvedBy: string;
  createdBy: string;
  totalAmountBeforeTax: number;
  totalTaxAmount: number;
  totalAmount: number;
}

export interface RequisitionItem {
  name: string,
  description: string,
  manufacturerCode: string,
  manufacturerName: string,
  supplierName: string,
  unitOfMeasure: string,
  quantity: number,
  price: number,
  taxAmount: number,
  taxGroup: string,
}

export interface RequisitionsItemsData {
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