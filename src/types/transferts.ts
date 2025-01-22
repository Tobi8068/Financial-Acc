export type TransfertStatus = 'Approve' | 'Transfered';
export type TransfertItemStatus = 'Declined' | 'Approved' | 'Partially_Approved';

export interface TransfertFilters {
  status: TransfertStatus | 'all';
}

export interface TransfertData {
  id: string,
  date: string;
  items: any;
  reason: string;
  createdBy: {
    name: string,
    avatar: string,
  };
  status: TransfertStatus;
  bin: string;
}

export interface TransfertItem {
  id: string;
  name: string;
  description: string;
  manufacturerName: string;
  manufacturerCode: string;
  quantity: number;
  bin: string;
  status: TransfertItemStatus;
};