export type ProductionStatus = 'Created' | 'Waiting_Approval' | 'Approve' | 'Started' | 'Ended';
export type ProductionItemStatus = 'Approved' | 'Partially_Approved';

export interface ProductionFilters {
  status: ProductionStatus | 'all';
}

export interface ProductionData {
  items: any;
  id: string;
  date: string;
  name: string;
  project: string;
  productionStartDate: string;
  productionEndDate: string;
  status: ProductionStatus;
  approved : boolean;
  approvedBy: string;
  createdBy: string;
}

export interface ProductionItem {
  id: string,
  name: string,
  description: string,
  manufacturerName: string,
  manufacturerCode: string,
  quantity: number,
  approvedQuantity: number,
  unitOfMeasure: number,
  status: ProductionItemStatus,
}

export interface ProductionItemsData {
  name: string;
  description: string;
  quantity: number;
  price: number;
  total: number;
  taxGroup: string;
  taxAmount: number;
  unitOfMeasure: string;
  supplier: string;
  supplierCode: string;
  manufacturerName: string;
  manufacturerCode: string;

  status: ProductionItemStatus,
}