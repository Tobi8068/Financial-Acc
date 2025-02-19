export type ProductionStatus = 'Created' | 'Waiting_Approval' | 'Approve' | 'Started' | 'Ended';
export type ProductionItemStatus = 'Approved' | 'Partially_Approved';

export interface ProductionFilters {
  status: ProductionStatus | 'all';
}
export interface ProductionItem {
  id: string,
  name: string,
  description: string,
  manufacturer: string,
  manufacturer_code: string,
  quantity: number,
  approvedQuantity: number,
  unitOfMeasure: number,
  status: ProductionItemStatus,
}
export interface ProductionData {
  id: string;
  date: string;
  name: string;
  project: string;
  items: any[];
  productionStartDate: string;
  productionEndDate: string;
  status: ProductionStatus;
  approved: boolean;
  approvedBy: {
    name: string;
    avatar: string;
  };
  createdBy: {
    name: string;
    avatar: string;
  };
}

