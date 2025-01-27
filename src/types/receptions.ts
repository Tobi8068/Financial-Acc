export interface ReceptionsData {
  id: string;
  purchaseOrderNo: number;
  items: string;
  storeKeeper: string;
  purchaseOrder: string;
}

export interface ReceptionItem {
  name: string,
  itemCode: string,
  description: string,
  manufacturer: string,
  manufacturer_code: string,
  quantity: number,
  bin: number,
}