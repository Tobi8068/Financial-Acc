export type InvoiceStatus = 'Need_Approval' | 'Approved' | 'Waiting_Payment' | 'Paid' | 'Close0Complete';

export interface InvoiceFilters {
  status: InvoiceStatus | 'all';
}

export interface InvoiceData {
  id: string;
  dateCreated: string;
  client: {
    name: string,
    avatar: string,
    email: string,
  };
  requiredData: string;
  shipTo: string;
  billTo: string;
  totalTaxAmount: number;
  totalNetAmount: number;
  totalAmount: number;
  status: InvoiceStatus;
  contact: string;
}