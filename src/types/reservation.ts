export type ReservationStatus = 'Created' | 'Approved' | 'Completed' | 'Cancelled' ;

export interface ReservationData {
  id: string;
  dateCreated: string;
  items: string;
  reservationDate: string;
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

export interface ReservationItem {
  name: string,
  itemCode: string,
  description: string,
  manufacturer: string,
  manufacturer_code: string,
  quantity: number,
  bin: number,
}