export type TransfersStatus = 'Transfered' | 'Approved';

export interface TransfersFilters {
  status: TransfersStatus | 'all';
}

export interface TransfersData {
  id: string;
  date: string;
  items: string;
  reason: string;
  createdBy: {
    name: string,
    avatar: string,
  };
  status: TransfersStatus;
  bin: string;
}

export interface TransfersItems {
  name: string;
  // itemCode: string;
  description: string;
  manufacturerName: string;
  manufacturerCode: string;
  quantity: number;
  bin: string;
  status: TransfersStatus;
};