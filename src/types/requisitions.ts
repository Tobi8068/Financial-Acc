export type RequisitionsStatus = 'Created' | 'Approved' | 'Sent' | 'Partially_Received' | 'Completed' | 'Cancelled';

export interface RequisitionsFilters {
  status: RequisitionsStatus | 'all';
}

export interface RequisitionsData {
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