export type ProductionStatus = 'Created' | 'Waiting_Approval' | 'Approved' | 'Ended' | 'Cancelled' | 'Partially_Approved';

export interface ProductionFilters {
  status: ProductionStatus | 'all';
}

export interface ProductionData {
  id: string;
  date: string;
  name: string;
  project: string;
  productionStartDate: string;
  productionEndDate: string;
  status: ProductionStatus;
  createdBy: string;
  approved : boolean;
  approvedBy: string;
}

export interface ProductionItem {
  name: string,
  description: string,
  manufacturerCode: string,
  manufacturerName: string,
  quantity: number,
  approvedQuantity: number,
  unitOfMeasure: string,
  status: ProductionStatus,
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
}