export type TransfertStatus = 'Approve' | 'Transfered';
export type TransfertItemStatus = 'Declined' | 'Approved' | 'Partially_Approved';

export interface TransfertFilters {
  status: TransfertStatus | 'all';
}

export interface TransfertItem {
  id: string;
  name: string;
  description: string;
  manufacturer: string;
  manufacturer_code: string;
  quantity: number;
  bin: string;
  status: TransfertItemStatus;
};

export interface TransfertData {
  id: string,
  date: string;
  trans_num: string;
  items: any[];
  reason: string;
  createdBy: {
    name: string,
    avatar: string,
  };
  status: TransfertStatus;
  bin: string;
}
