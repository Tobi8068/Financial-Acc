export interface ReceptionItem {
  id: string,
  name: string,
  item_code: string,
  description: string,
  manufacturer: string,
  manufacturer_code: string,
  quantity: number,
  bin: number,
}

export interface ReceptionsData {
  id: string;
  purchaseOrderNo: number;
  items: any[];
  storeKeeper: {
    name: string,
    avatar: string
  }
  
  purchaseOrder: string;
}