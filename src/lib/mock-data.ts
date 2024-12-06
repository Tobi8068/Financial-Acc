import { ShippingData } from '@/types/shipping';

export const mockData: ShippingData[] = [
  {
    id: '#3066',
    name: 'John Doe',
    notes: 'Express delivery requested',
    dateCreated: '2024-01-06',
    status: 'pending',
    sales: 299.99,
    carrier: 'DHL Express',
  },
  {
    id: '#3065',
    name: 'Jane Smith',
    notes: 'Fragile items included',
    dateCreated: '2024-01-05',
    status: 'shipped',
    sales: 149.50,
    carrier: 'FedEx',
  },
  {
    id: '#3064',
    name: 'Robert Johnson',
    notes: 'Priority shipping',
    dateCreated: '2024-01-05',
    status: 'delivered',
    sales: 567.80,
    carrier: 'UPS',
  },
  {
    id: '#3063',
    name: 'Emily Davis',
    notes: 'International shipping',
    dateCreated: '2024-01-04',
    status: 'pending',
    sales: 892.25,
    carrier: 'DHL Express',
  },
  {
    id: '#3062',
    name: 'Michael Wilson',
    notes: 'Standard delivery',
    dateCreated: '2024-01-04',
    status: 'shipped',
    sales: 234.99,
    carrier: 'USPS',
  },
  {
    id: '#3061',
    name: 'Sarah Brown',
    notes: 'Next day delivery',
    dateCreated: '2024-01-03',
    status: 'delivered',
    sales: 445.75,
    carrier: 'FedEx',
  },
  {
    id: '#3060',
    name: 'David Miller',
    notes: 'Handle with care',
    dateCreated: '2024-01-03',
    status: 'cancelled',
    sales: 129.99,
    carrier: 'UPS',
  },
  {
    id: '#3059',
    name: 'Lisa Anderson',
    notes: 'Signature required',
    dateCreated: '2024-01-02',
    status: 'delivered',
    sales: 678.50,
    carrier: 'DHL Express',
  },
  {
    id: '#3058',
    name: 'James Taylor',
    notes: 'Weekend delivery',
    dateCreated: '2024-01-02',
    status: 'shipped',
    sales: 345.00,
    carrier: 'USPS',
  },
  {
    id: '#3057',
    name: 'Patricia Martinez',
    notes: 'Express shipping',
    dateCreated: '2024-01-01',
    status: 'delivered',
    sales: 789.99,
    carrier: 'FedEx',
  }
];