export type SalesStatus = 'Created' | 'Approved' | 'Sent' | 'Partially_Received' | 'Completed';

export interface SalesData {
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