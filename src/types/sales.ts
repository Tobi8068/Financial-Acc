export type SalesStatus = 'Created' | 'Approved' | 'Sent' | 'Partially_Received' | 'Completed' | 'Cancelled';
export type SalesItemStatus = 'Created' |'Approved'|'Partially_Received'|'Completed' ;

export interface SalesFilters {
  status: SalesStatus | 'all';
}

export interface SalesData {
  pid: string;
  id: string;
  dateCreated: string;
  shipTo: string;
  billTo: string;
  department: string;
  status: SalesStatus;
  approvedBy: {
    name: string,
    avatar: string,
  };
  createdBy: {
    name: string,
    avatar: string,
  };
  
  totalTaxAmount: number;
  totalNetAmount: number;
  totalAmount: number;
  sent: boolean;
}

export interface SalesItemData {
  pid: string;
  name: string,
  description: string,
  manufacturer: string,
  manufacturer_code: string,

  quantity: number,
  price: number,
  unitOfMeasure: string,
  taxGroup: string,

  netAmount: number,
  taxAmount: number,
  status: SalesStatus,
  account: string
}

export interface SalesDetailData {
  id?: string;
  name: string;
  description: string;
  manufacturer: string;
  manufacturer_code: string;
  itemCode: string;
  quantity: number;
  unit: string;
  price: number;
  totalPerLine: number;
  taxGroup: string;
  taxAmount: number;
  status: SalesItemStatus;
  account: string;
}