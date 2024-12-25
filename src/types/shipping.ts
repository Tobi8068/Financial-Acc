export type ShippingStatus = 'pending' | 'shipped' | 'delivered' | 'cancelled';
export type CarriesStatus = 'Expired' | 'Active';

export interface ShippingFilters {
  status: ShippingStatus | 'all';
  carrier: string | 'all';
}

export interface CarriesFilters {
  status: CarriesStatus | 'all';
}

export interface ShippingData {
  id: string;
  name: string;
  notes: string;
  dateCreated: string;
  status: ShippingStatus;
  sales: number;
  carrier: string;
  other: string;
  tracking: string;
  packingList: boolean;
}

export interface ShippingItem {
  id: string,
  name: string;
  description: string;
  manufacturerCode: string;
  manufacturerName: string;
  itemCode: string;
  quantity: number;
  approved_quantity: number;
}

export interface CarrierData {
  id: string;
  name: string;
  description: string;
  contractID: number;
  startDate: string;
  endDate: string;
  status: CarriesStatus;
  itemCode: string;
  quantity: number;
}