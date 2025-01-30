export type ReservationStatus = 'Created' | 'Approved' | 'Completed' | 'Cancelled';

export interface ReservationFilters {
  status: ReservationStatus | 'all';
}

export interface ReservationItem {
  id: string,
  item_name: string,
  item_description: string,
  item_code: string,
  item_manufacturer: string,
  item_manufacturer_code: string,
  item_quantity: number,
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