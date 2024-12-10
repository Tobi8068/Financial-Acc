export type InvoiceStatus = 'Need_Approval' | 'Approved' | 'Waiting_Payment' | 'Paid' | 'Close0Complete';

export type SortOption = 'newest' | 'oldest' | 'amount-high' | 'amount-low';

export interface InvoiceFilters {
  status: InvoiceStatus | 'all';
}

export interface InvoiceData {
  id: string;
  dateCreated: string;
  client: string;
  requiredData: string;
  shipTo: string;
  billTo: string;
  totalTaxAmount: number;
  totalNetAmount: number;
  totalAmount: number;
  status: InvoiceStatus;
  contact: string;
  turnTOpdf: boolean;
  clientApproval: boolean;
  salesNum: number;
}