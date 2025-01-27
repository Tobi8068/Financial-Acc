export type ReservationStatus = 'Created' | 'Approved' | 'Completed' | 'Cancelled';

export interface ReservationFilters {
  status: ReservationStatus | 'all';
}

export interface ReservationItem {
  id: string,
  name: string,
  description: string,
  item_code: string,
  manufacturer: string,
  manufacturer_code: string,
  quantity: number,
  measure_unit: string,
}

export interface ReservationData {
  id: string;
  created_date: string;
  items: any[];
  reservation_date: string;
  reason: string;
  project: string;
  storeKeeper: {
    name: string,
    avatar: string,
  };
  reservedBy: {
    name: string,
    avatar: string,
  };
  status: ReservationStatus;
}