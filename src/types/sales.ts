export type SalesStatus = 'Created' | 'Approved' | 'Sent' | 'Partially_Received' | 'Completed' | 'Cancelled' | 'Pending' | 'Rejected';

export interface SalesFilters {
  status: SalesStatus | 'all';
}

export interface SalesData {
  pid: string;
  id: string;
  dateCreated: string;
  shipTo: string;
  billTo: string;
  status: SalesStatus;
  approvedBy: {
    name: string,
    avatar: string,
  };
  createdBy: {
    name: string,
    avatar: string,
  };
  clientApproval: SalesStatus;
  totalTaxAmount: number;
  totalNetAmount: number;
  totalAmount: number;
}

export interface SalesItemData {
  name: string,
  description: string,
  manufacturer: string,
  manufacturerCode: string,
  itemCode: string,
  quantity: number,
  price: number,
  unit: string,
  totalPerLine: number,
  taxGroup: string,
  taxAmount: number,
  status: SalesStatus,
  account: string
}
export interface SalesDetailData {
  id?: string;
  name: string;
  description: string;
  manufacturer: string;
  manufacturerCode: string;
  itemCode: string;
  quantity: number;
  unit: string;
  price: number;
  totalPerLine: number;
  taxGroup: string;
  taxAmount: number;
  status: SalesStatus;
  account: string;
}