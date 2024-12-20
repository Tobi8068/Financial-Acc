export type SuppliersStatus = 'Transfered' | 'Approved' | 'Cancelled';

export interface SuppliersFilters {
  status: SuppliersStatus | 'all';
}

export interface SuppliersData {
  id: string;
  supplierName: string;
  address: string;
  billingAddress: string;
  shippingAddress: string;
  postalAddress: string;
  supplierCode: string;
  bankName: string;
  accountNumber: number;
  transitNumber: number;
  currency: string;
  purchaseOrder: string;
  status: SuppliersStatus;
  appartment?: string;
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  purchaseContact?: string;

}

export interface SuppliersItems {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  address: string;
  role: string;
};