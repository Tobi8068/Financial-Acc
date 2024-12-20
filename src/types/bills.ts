export type BillsStatus = 'Need_Approval' | 'Approved' | 'Sent' | 'Paid' | 'Complete' | 'On_Hold';

export interface BillsFilters {
  status: BillsStatus | 'all';
}

export interface BillsData {
  id: string;
  dateCreated: string;
  supplier: string;
  requiredDate: string;
  status: BillsStatus;
  terms: string;
  shipTo: string;
  billTo: string;
  totalTaxAmount: number;
  totalNetAmount: number;
  totalAmount: number;
  contact: number;
}

export interface BillItem {
  name: string,
  description: string,
  unit: string,
  quantity: number,
  price: number,
  total: number,
  account: string,
  taxGroup: string,
  taxAmount: number,
}