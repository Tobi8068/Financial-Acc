import { ClientData } from '@/types/client';
import { InvoiceData } from '@/types/invoice';
import { SalesData } from '@/types/sales';
import { CarrierData, ShippingData, ShippingItem } from '@/types/shipping';
import { PurchaseOrderData } from '@/types/purchaseOrder';
import { ReceptionsData, ReceptionItem } from '@/types/receptions';
import { ReservationData, ReservationItem } from '@/types/reservation';
import { ReOrderData } from '@/types/reOrder';
import { BillsData } from '@/types/bills';
import { SuppliersData, SuppliersItems } from '@/types/suppliers';

export const shippingData: ShippingData[] = [
  {
    id: '68',
    name: 'John Doe',
    notes: 'Express delivery requested',
    dateCreated: '2024-01-06',
    status: 'pending',
    sales: 299.99,
    carrier: 'DHL Express',
    other: 'Monthly subscription',
    tracking: '',
    packingList: false,
  },
  {
    id: '67',
    name: 'Jane Smith',
    notes: 'Fragile items included',
    dateCreated: '2024-01-05',
    status: 'shipped',
    sales: 149.50,
    carrier: 'FedEx',
    other: 'Monthly subscription',
    tracking: '',
    packingList: false,
  },
  {
    id: '66',
    name: 'John Doe',
    notes: 'Express delivery requested',
    dateCreated: '2024-01-06',
    status: 'pending',
    sales: 299.99,
    carrier: 'DHL Express',
    other: 'Monthly subscription',
    tracking: '',
    packingList: false,
  },
  {
    id: '65',
    name: 'Jane Smith',
    notes: 'Fragile items included',
    dateCreated: '2024-01-05',
    status: 'shipped',
    sales: 149.50,
    carrier: 'FedEx',
    other: 'Monthly subscription',
    tracking: '',
    packingList: false,
  },
  {
    id: '64',
    name: 'Robert Johnson',
    notes: 'Priority shipping',
    dateCreated: '2024-01-05',
    status: 'delivered',
    sales: 567.80,
    carrier: 'UPS',
    other: 'Monthly subscription',
    tracking: '',
    packingList: false,
  },
  {
    id: '71',
    name: 'Emily Davis',
    notes: 'International shipping',
    dateCreated: '2024-01-04',
    status: 'pending',
    sales: 892.25,
    carrier: 'DHL Express',
    other: 'Monthly subscription',
    tracking: '',
    packingList: false,
  },
  {
    id: '70',
    name: 'Emily Davis',
    notes: 'International shipping',
    dateCreated: '2024-01-04',
    status: 'pending',
    sales: 892.25,
    carrier: 'DHL Express',
    other: 'Monthly subscription',
    tracking: '',
    packingList: false,
  },
  {
    id: '69',
    name: 'Emily Davis',
    notes: 'International shipping',
    dateCreated: '2024-01-04',
    status: 'pending',
    sales: 892.25,
    carrier: 'DHL Express',
    other: 'Monthly subscription',
    tracking: '',
    packingList: false,
  },
  {
    id: '63',
    name: 'Emily Davis',
    notes: 'International shipping',
    dateCreated: '2024-01-04',
    status: 'pending',
    sales: 892.25,
    carrier: 'DHL Express',
    other: 'Monthly subscription',
    tracking: '',
    packingList: false,
  },
  {
    id: '62',
    name: 'Michael Wilson',
    notes: 'Standard delivery',
    dateCreated: '2024-01-04',
    status: 'shipped',
    sales: 234.99,
    carrier: 'USPS',
    other: 'Monthly subscription',
    tracking: '',
    packingList: false,
  },
  {
    id: '61',
    name: 'Sarah Brown',
    notes: 'Next day delivery',
    dateCreated: '2024-01-03',
    status: 'delivered',
    sales: 445.75,
    carrier: 'FedEx',
    other: 'Monthly subscription',
    tracking: '',
    packingList: false,
  },
  {
    id: '60',
    name: 'David Miller',
    notes: 'Handle with care',
    dateCreated: '2024-01-03',
    status: 'cancelled',
    sales: 129.99,
    carrier: 'UPS',
    other: 'Monthly subscription',
    tracking: '',
    packingList: false,
  },
  {
    id: '59',
    name: 'Lisa Anderson',
    notes: 'Signature required',
    dateCreated: '2024-01-02',
    status: 'delivered',
    sales: 678.50,
    carrier: 'DHL Express',
    other: 'Monthly subscription',
    tracking: '',
    packingList: false,
  },
  {
    id: '58',
    name: 'James Taylor',
    notes: 'Weekend delivery',
    dateCreated: '2024-01-02',
    status: 'shipped',
    sales: 345.00,
    carrier: 'USPS',
    other: 'Monthly subscription',
    tracking: '',
    packingList: false,
  },
  {
    id: '57',
    name: 'Patricia Martinez',
    notes: 'Express shipping',
    dateCreated: '2024-01-01',
    status: 'delivered',
    sales: 789.99,
    carrier: 'FedEx',
    other: 'Monthly subscription',
    tracking: '',
    packingList: false,
  }
];

export const shippingItemsData: ShippingItem[] = [
  {
    name: 'John Doe',
    description: 'Express delivery requested',
    manufacturerCode: '22352WF',
    manufacturerName: 'Lucky',
    itemCode: '22352WF',
    quantity: 51,
    approved_quantity: 3,
  },
  {
    name: 'Chris George',
    description: 'Express delivery requested',
    manufacturerCode: '22352WF',
    manufacturerName: 'Lucky',
    itemCode: '22352WF',
    quantity: 51,
    approved_quantity: 3,
  },
  {
    name: 'Mihn Tom',
    description: 'Express delivery requested',
    manufacturerCode: '22352WF',
    manufacturerName: 'Lucky',
    itemCode: '22352WF',
    quantity: 51,
    approved_quantity: 3,
  },
];

export const invoiceData: InvoiceData[] = [
  {
    id: '#3066',
    dateCreated: '2024-01-06',
    client: {
      name: 'John',
      avatar: '',
      email: 'test@gmail.com'
    },
    requiredData: '2024-01-06',
    shipTo: 'Monthly ShipTo',
    billTo: 'Monthly BillTo',
    totalTaxAmount: 300,
    totalNetAmount: 122,
    totalAmount: 121,
    status: 'Paid',
    contact: 'Contact',
  },
  {
    id: '#3065',
    dateCreated: '2024-01-06',
    client: {
      name: 'william',
      avatar: '',
      email: 'test@gmail.com'
    },
    requiredData: '2024-01-06',
    shipTo: 'Monthly Subscription',
    billTo: 'Monthly Subscription',
    totalTaxAmount: 423,
    totalNetAmount: 12,
    totalAmount: 12,
    status: 'Approved',
    contact: 'Monthly',
  },
  {
    id: '#3064',
    dateCreated: '2024-01-06',
    client: {
      name: 'william',
      avatar: '',
      email: 'test@gmail.com'
    },
    requiredData: '2024-01-06',
    shipTo: 'Monthly Subscription',
    billTo: 'Monthly Subscription',
    totalTaxAmount: 423,
    totalNetAmount: 12,
    totalAmount: 12,
    status: 'Need_Approval',
    contact: 'Monthly',
  },
  {
    id: '#3063',
    dateCreated: '2024-01-06',
    client: {
      name: 'william',
      avatar: '',
      email: 'test@gmail.com'
    },
    requiredData: '2024-01-06',
    shipTo: 'Monthly Subscription',
    billTo: 'Monthly Subscription',
    totalTaxAmount: 423,
    totalNetAmount: 12,
    totalAmount: 12,
    status: 'Waiting_Payment',
    contact: 'Monthly',
  },
  {
    id: '#3062',
    dateCreated: '2024-01-06',
    client: {
      name: 'william',
      avatar: '',
      email: 'test@gmail.com'
    },
    requiredData: '2024-01-06',
    shipTo: 'Monthly Subscription',
    billTo: 'Monthly Subscription',
    totalTaxAmount: 423,
    totalNetAmount: 12,
    totalAmount: 12,
    status: 'Close0Complete',
    contact: 'Monthly',
  },
  {
    id: '#3061',
    dateCreated: '2024-01-06',
    client: {
      name: 'william',
      avatar: '',
      email: 'test@gmail.com'
    },
    requiredData: '2024-01-06',
    shipTo: 'Monthly Subscription',
    billTo: 'Monthly Subscription',
    totalTaxAmount: 423,
    totalNetAmount: 12,
    totalAmount: 12,
    status: 'Approved',
    contact: 'Monthly',
  },
]

export const salesData: SalesData[] = [
  {
    id: '#3066',
    dateCreated: '2024-01-06',
    shipTo: 'Monthly Subscription',
    billTo: 'Monthly Subscription',
    status: 'Created',
    approvedBy: {
      name: 'Olivia Rhye',
      avatar: '../assets/img/Avatar.png',
    },
    createdBy: {
      name: 'Olivia Rhye',
      avatar: '../assets/img/Avatar.png',
    },
    clientApproval: 'Pending',
    totalTaxAmount: 200,
    totalNetAmount: 12,
    totalAmount: 12,
  },
  {
    id: '#3065',
    dateCreated: '2024-01-06',
    shipTo: 'Monthly Subscription',
    billTo: 'Monthly Subscription',
    status: 'Approved',
    approvedBy: {
      name: 'Phoenix Baker',
      avatar: '../assets/img/Avatar.png',
    },
    createdBy: {
      name: 'Olivia Rhye',
      avatar: '../assets/img/Avatar.png',
    },
    clientApproval: 'Approved',
    totalTaxAmount: 200,
    totalNetAmount: 12,
    totalAmount: 12,
  },
  {
    id: '#3064',
    dateCreated: '2024-01-06',
    shipTo: 'Monthly Subscription',
    billTo: 'Monthly Subscription',
    status: 'Sent',
    approvedBy: {
      name: 'Lana Steiner',
      avatar: '../assets/img/Avatar.png',
    },
    createdBy: {
      name: 'Olivia Rhye',
      avatar: '../assets/img/Avatar.png',
    },
    clientApproval: 'Rejected',
    totalTaxAmount: 200,
    totalNetAmount: 12,
    totalAmount: 12,
  },
  {
    id: '#3063',
    dateCreated: '2024-01-06',
    shipTo: 'Monthly Subscription',
    billTo: 'Monthly Subscription',
    status: 'Partially_Received',
    approvedBy: {
      name: 'Demi Wilkinson',
      avatar: '../assets/img/Avatar.png',
    },
    createdBy: {
      name: 'Olivia Rhye',
      avatar: '../assets/img/Avatar.png',
    },
    clientApproval: 'Approved',
    totalTaxAmount: 200,
    totalNetAmount: 12,
    totalAmount: 12,
  },
  {
    id: '#3062',
    dateCreated: '2024-01-06',
    shipTo: 'Monthly Subscription',
    billTo: 'Monthly Subscription',
    status: 'Completed',
    approvedBy: {
      name: 'Candice Wu',
      avatar: '../assets/img/Avatar.png',
    },
    createdBy: {
      name: 'Olivia Rhye',
      avatar: '../assets/img/Avatar.png',
    },
    clientApproval: 'Pending',
    totalTaxAmount: 200,
    totalNetAmount: 12,
    totalAmount: 12,
  },
  {
    id: '#3061',
    dateCreated: '2024-01-06',
    shipTo: 'Monthly Subscription',
    billTo: 'Monthly Subscription',
    status: 'Cancelled',
    approvedBy: {
      name: 'Natali Craig',
      avatar: '../assets/img/Avatar.png',
    },
    createdBy: {
      name: 'Olivia Rhye',
      avatar: '../assets/img/Avatar.png',
    },
    clientApproval: 'Rejected',
    totalTaxAmount: 200,
    totalNetAmount: 12,
    totalAmount: 12,
  },
]

export const carriesData: CarrierData[] = [
  {
    id: '#3066',
    name: 'computer',
    description: 'dddddddddddddddddddddddddd',
    contractID: 423526232,
    startDate: '2022-01-06',
    endDate: '2024-01-06',
    status: 'Expired',
    itemCode: '123456789',
    quantity: 10,
  },
  {
    id: '#3065',
    name: 'mobile',
    description: 'mobile is very important of our live',
    contractID: 122342234,
    startDate: '2022-01-06',
    endDate: '2024-01-06',
    status: 'Active',
    itemCode: '123456789',
    quantity: 10,
  }
]

export const clientData: ClientData[] = [
  {
    id: '#3066',
    client: {
      name: 'Olga Rhye',
      avatar: '../assets/img/Avatar.png',
    },
    dateCreated: '2024-01-06',
    address: '24 Heartley Street, Old Market, Otawa',
    billingAddress: '24 Heartley Street, Old Market, Otawa',
    shippingAddress: '24 Heartley Street, Old Market, Otawa',
  },
  {
    id: '#3065',
    client: {
      name: 'Olivia Rhye',
      avatar: '../assets/img/Avatar.png',
    },
    dateCreated: '2024-01-06',
    address: '24 Heartley Street, Old Market, Otawa',
    billingAddress: '24 Heartley Street, Old Market, Otawa',
    shippingAddress: '24 Heartley Street, Old Market, Otawa',
  },
  {
    id: '#3064',
    client: {
      name: 'Olivia Rhye',
      avatar: '../assets/img/Avatar.png',
    },
    dateCreated: '2024-01-06',
    address: '24 Heartley Street, Old Market, Otawa',
    billingAddress: '24 Heartley Street, Old Market, Otawa',
    shippingAddress: '24 Heartley Street, Old Market, Otawa',
  },
  {
    id: '#3063',
    client: {
      name: 'Olivia Rhye',
      avatar: '../assets/img/Avatar.png',
    },
    dateCreated: '2024-01-06',
    address: '24 Heartley Street, Old Market, Otawa',
    billingAddress: '24 Heartley Street, Old Market, Otawa',
    shippingAddress: '24 Heartley Street, Old Market, Otawa',
  },
  {
    id: '#3062',
    client: {
      name: 'Olivia Rhye',
      avatar: '../assets/img/Avatar.png',
    },
    dateCreated: '2024-01-06',
    address: '24 Heartley Street, Old Market, Otawa',
    billingAddress: '24 Heartley Street, Old Market, Otawa',
    shippingAddress: '24 Heartley Street, Old Market, Otawa',
  },
  {
    id: '#3061',
    client: {
      name: 'Olivia Rhye',
      avatar: '../assets/img/Avatar.png',
    },
    dateCreated: '2024-01-06',
    address: '24 Heartley Street, Old Market, Otawa',
    billingAddress: '24 Heartley Street, Old Market, Otawa',
    shippingAddress: '24 Heartley Street, Old Market, Otawa',
  },
]

export const purchaseOrderData: PurchaseOrderData[] = [
  {
    id: '#3066',
    dateCreated: '2024-01-06',
    shipTo: 'ShipTo Name',
    billTo: 'BillTo Name',
    department: 'Dept.Name',
    status: 'Created',
    createdBy: 'User',
    approved: false,
    approvedBy: 'Approver Name',
  },
  {
    id: '#3065',
    dateCreated: '2024-01-06',
    shipTo: 'Name',
    billTo: 'Name',
    department: 'Dept.Name',
    status: 'Approved',
    createdBy: 'Monthly',
    approved: false,
    approvedBy: 'Approver Name',
  },
  {
    id: '#3064',
    dateCreated: '2024-01-06',
    shipTo: 'Name',
    billTo: 'Name',
    department: 'Dept.Name',
    status: 'Sent',
    createdBy: 'Monthly',
    approved: false,
    approvedBy: 'Approver Name',
  },
  {
    id: '#3063',
    dateCreated: '2024-01-06',
    shipTo: 'Name',
    billTo: 'Name',
    department: 'Dept.Name',
    status: 'Partially_Received',
    createdBy: 'Monthly',
    approved: false,
    approvedBy: 'Approver Name',
  },
  {
    id: '#3062',
    dateCreated: '2024-01-06',
    shipTo: 'Name',
    billTo: 'Name',
    department: 'Dept.Name',
    status: 'Completed',
    createdBy: 'Monthly',
    approved: false,
    approvedBy: 'Approver Name',
  },
  {
    id: '#3061',
    dateCreated: '2024-01-06',
    shipTo: 'Name',
    billTo: 'Name',
    department: 'Dept.Name',
    status: 'Cancelled',
    createdBy: 'Monthly',
    approved: false,
    approvedBy: 'Approver Name',
  },
]

export const receptionsData: ReceptionsData[] = [
  {
    id: '#3066',
    purchaseOrderNo: 12345,
    items: 'Item',
    storeKeeper: 'Store Keeper',
    purchaseOrder: 'Name',
  },
  {
    id: '#3067',
    purchaseOrderNo: 12345,
    items: 'Item',
    storeKeeper: 'Name',
    purchaseOrder: 'Name',
  },
  {
    id: '#3068',
    purchaseOrderNo: 12345,
    items: 'Item',
    storeKeeper: 'Name',
    purchaseOrder: 'Name',
  },
  {
    id: '#3069',
    purchaseOrderNo: 12345,
    items: 'Item',
    storeKeeper: 'Name',
    purchaseOrder: 'Name',
  },
  {
    id: '#3070',
    purchaseOrderNo: 12345,
    items: 'Item',
    storeKeeper: 'Name',
    purchaseOrder: 'Name',
  },
  {
    id: '#3071',
    purchaseOrderNo: 12345,
    items: 'Item',
    storeKeeper: 'Name',
    purchaseOrder: 'Name',
  },
]

export const receptionItemsData: ReceptionItem[] = [
  {
    name: 'Computer',
    itemCode: '352644B',
    description: 'Monthly subscription',
    manufacturerName: 'Apple Inc',
    manufacturerCode: '35412AB',
    quantity: 5,
    bin: 5,
  },
  {
    name: 'Mobile',
    itemCode: '352644B',
    description: 'Monthly subscription',
    manufacturerName: 'Apple Inc',
    manufacturerCode: '35412AB',
    quantity: 5,
    bin: 5,
  },
  {
    name: 'Keyboard',
    itemCode: '352644B',
    description: 'Monthly subscription',
    manufacturerName: 'Apple Inc',
    manufacturerCode: '35412AB',
    quantity: 5,
    bin: 5,
  },
];

export const reOrderData:ReOrderData[] = [
  {
    id: '321',
    name: 'Name',
    date: '2024-01-04',
    numberOfItem: 2,
    numberOfRequisition: 2,
    description: 'lorem ipsum doler sitt amit merol muspi relow tima lorem ipsum doler sitt amit merol',
    orderUnit: 'Order Unit',
    preferredSupplier: 'Supplier',
    price: 250,
    itemCode: 'XB12345',
    manufacturerName: 'Manufacturer',
    manufacturerCode: 'XB12345',
  },
  {
    id: '322',
    name: 'Name',
    date: '2024-01-04',
    numberOfItem: 2,
    numberOfRequisition: 2,
    description: 'lorem ipsum doler sitt amit merol muspi relow tima lorem ipsum doler sitt amit merol',
    orderUnit: 'Order Unit',
    preferredSupplier: 'Supplier',
    price: 250,
    itemCode: 'XB12345',
    manufacturerName: 'Manufacturer',
    manufacturerCode: 'XB12345',
  },
  {
    id: '323',
    name: 'qw',
    date: '2024-01-04',
    numberOfItem: 2,
    numberOfRequisition: 2,
    description: 'er',
    orderUnit: 'ty',
    preferredSupplier: 'ui',
    price: 250,
    itemCode: 'op',
    manufacturerName: 'as',
    manufacturerCode: 'df',
  },
  {
    id: '324',
    name: 'we',
    date: '2024-01-04',
    numberOfItem: 2,
    numberOfRequisition: 2,
    description: 'rt',
    orderUnit: 'yu',
    preferredSupplier: 'io',
    price: 250,
    itemCode: 'sd',
    manufacturerName: 'fg',
    manufacturerCode: 'hj',
  },

]

export const reservationData:ReservationData[] = [
  {
    id: '#3063',
    dateCreated: '2024-01-06',
    items: 'Item',
    reservationDate: '2024-01-06',
    reason: 'lorem ipsum doler sitt amit merol muspi relow tima lorem ipsum doler sitt amit merol',
    project: 'Project',
    storeKeeper: {
      name: 'John',
      avatar: '',
    },
    reservedBy: {
      name: 'John',
      avatar: '',
    },
    status: 'Approved',
  },
  {
    id: '#3064',
    dateCreated: '2024-01-06',
    items: 'aa',
    reservationDate: '2024-01-06',
    reason: 'bb',
    project: 'cc',
    storeKeeper: {
      name: 'dd',
      avatar: '',
    },
    reservedBy: {
      name: 'ee',
      avatar: '',
    },
    status: 'Approved',
  },
  {
    id: '#3065',
    dateCreated: '2024-01-06',
    items: 'ff',
    reservationDate: '2024-01-06',
    reason: 'gg',
    project: 'hh',
    storeKeeper: {
      name: 'ii',
      avatar: '',
    },
    reservedBy: {
      name: 'jj',
      avatar: '',
    },
    status: 'Cancelled',
  },
]

export const reservationItemsData: ReservationItem[] = [
  {
    name: '#3066',
    itemCode: "35412AB",
    description: "Monthly subscription",
    manufacturerName: "Apple Inc.",
    manufacturerCode: "35412AB",
    quantity: 5,
    bin: 5,
  },
  {
    name: '#3067',
    itemCode: "35412AB",
    description: "Monthly subscription",
    manufacturerName: "Apple Inc.",
    manufacturerCode: "35412AB",
    quantity: 5,
    bin: 5,
  },
  {
    name: '#3068',
    itemCode: "35412AB",
    description: "Monthly subscription",
    manufacturerName: "Apple Inc.",
    manufacturerCode: "35412AB",
    quantity: 5,
    bin: 5,
  },
]

export const billsData: BillsData[] = [
  {
    id: '#3066',
    dateCreated: '2024-01-06',
    supplier: 'Jackson',
    requiredDate: '2024-01-06',
    status: 'Approved',
    terms: 'View Terms',
    shipTo: 'Name',
    billTo: 'Name',
    totalTaxAmount: 250,
    totalNetAmount: 250,
    totalAmount: 150,
    contact: 123456789,
  },
  {
    id: '#3067',
    dateCreated: '2024-01-06',
    supplier: 'Lena',
    requiredDate: '2024-01-06',
    status: 'Need_Approval',
    terms: 'View Terms',
    shipTo: 'Name',
    billTo: 'Name',
    totalTaxAmount: 250,
    totalNetAmount: 250,
    totalAmount: 150,
    contact: 123456789,
  },
]

export const suppliersData: SuppliersData[] = [
  {
    id: '#3066',
    supplierName: 'Jackson',
    address: 'Lerme doi 111',
    billingAddress: 'Lerme doi 111',
    shippingAddress: 'Lerme doi 111',
    postalAddress: 'Lerme doi 111',
    supplierCode: '35412AB',
    bankName: 'Bank',
    accountNumber: 123456789,
    transitNumber: 123456789,
    currency: 'USD',
    purchaseOrder: '123456789',
    status: "Approved",
  },
]

export const suppliersItems: SuppliersItems[] = [
  {
    firstName: 'Lucky',
    lastName: 'Marine',
    email: 'luckymarine@ree.ki',
    phoneNumber: 151216,
    address: 'Lerme doi 111',
    role: 'Role',
  },
]