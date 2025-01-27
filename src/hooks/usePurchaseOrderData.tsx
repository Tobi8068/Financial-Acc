import { useState, useEffect, useMemo } from 'react';
import { PurchaseOrderData, PurchaseOrderFilters, PurchaseOrderItem, PurchaseOrderStatus, PurchaseOrderItemStatus } from '@/types/purchaseOrder';
import { capitalizeLetter } from '@/lib/utils';

const transformItemBackendData = (backendData: any): PurchaseOrderItem => {
  return {
    pid: backendData.id,
    name: backendData.item_name,
    description: backendData.description,
    manufacturer: backendData.manufacturer,
    manufacturerCode: backendData.manufacturer_code,
    supplierCode: backendData.supplier_code,
    unitOfMeasure: backendData.measure_unit,
    quantity: backendData.quantity,
    price: backendData.price,
    netAmount: backendData.net_amount,
    taxAmount: backendData.tax_amount,
    taxGroup: backendData.tax_group,
    status: capitalizeLetter(backendData.status) as PurchaseOrderItemStatus,
    account: backendData.account || '',
    reception_quantity: backendData.reception_quantity || 0
  };
};

const transformBackendData = (backendData: any): PurchaseOrderData => {
  const itemsData = backendData.items.map((item: any) => transformItemBackendData(item));
  return {
    pid: backendData.id,
    id: backendData.po_number.toString(),
    created_date: backendData.created_date,
    shipTo: backendData.ship_to,
    billTo: backendData.bill_to,
    department: backendData.department.name,
    items: itemsData,
    status: capitalizeLetter(backendData.status) as PurchaseOrderStatus,
    totalNetAmount: backendData.total_net_amount || 0,
    totalTaxAmount: backendData.total_tax_amount || 0,
    totalAmount: backendData.total_amount || 0,
    approved: backendData.approved || false,
    sent: backendData.sent || false,
    createdBy: {
      name: `${backendData.created_by.first_name} ${backendData.created_by.last_name}`,
      avatar: backendData.created_by.avatar || ''
    },
    approvedBy: {
      name: `${backendData.approved_by.first_name} ${backendData.approved_by.last_name}`,
      avatar: backendData.approved_by.avatar || ''
    },
  };
};

function useData(
  sourceData: any,
  page: number,
  refreshData: () => void,
  filters?: PurchaseOrderFilters,
  searchQuery?: string
) {
  const [data, setData] = useState<any[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 5;

  const filteredAndSortedData = useMemo(() => {

    let result = [...sourceData];

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item =>
        item.id.toLowerCase().includes(query) ||
        item.dateCreated.toLowerCase().includes(query) ||
        item.shipTo.toLowerCase().includes(query) ||
        item.billTo.toLowerCase().includes(query) ||
        item.department.toLowerCase().includes(query) ||
        item.status.toLowerCase().includes(query) ||
        item.approvedBy.toLowerCase().includes(query) ||
        item.createdBy.toLowerCase().includes(query) ||
        item.totalNetAmount.toString().toLowerCase().includes(query) ||
        item.totalTaxAmount.toString().toLowerCase().includes(query) ||
        item.totalAmount.toString().toLowerCase().includes(query)
      );
    }

    // Apply filters
    if (filters) {
      if (filters.status && filters.status !== 'all') {
        result = result.filter(item => item.status.toLowerCase() === filters.status);
      }
    }

    return result;
  }, [sourceData, filters, searchQuery]);

  useEffect(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setData(filteredAndSortedData.slice(startIndex, endIndex));
    setTotalItems(filteredAndSortedData.length);
  }, [page, filteredAndSortedData]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return {
    data,
    totalPages,
    totalItems,
    itemsPerPage,
    refreshData
  };
}

export function usePurchaseOrderData(page: number, filters?: PurchaseOrderFilters, searchQuery?: string) {
  const [serverData, setServerData] = useState<PurchaseOrderData[]>([]);
  const fetchFunc = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/purchase-orders`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: PurchaseOrderData[] = await response.json();
      let PO_Data = data.map((item: any) => transformBackendData(item));
      setServerData(PO_Data);
    } catch (error) {
      console.error("Error fetching Purchase_Orders", error);
    }
  };

  useEffect(() => {
    fetchFunc();
  }, [])

  const refreshData = () => {
    fetchFunc(); // Your existing fetch function
  };

  return useData(serverData, page, refreshData, filters, searchQuery);
}

export function usePurchaseOrderItemsData(page: number, filters?: PurchaseOrderFilters, searchQuery?: string) {
  const [serverData, setServerData] = useState<PurchaseOrderItem[]>([]);
  const fetchFunc = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/purchaseOrders-items`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: PurchaseOrderItem[] = await response.json();
      let PO_Items = data.map((item: PurchaseOrderItem) => transformItemBackendData(item));
      setServerData(PO_Items);
    } catch (error) {
      console.error("Error fetching PO item:", error);
    }
  };
  useEffect(() => {
    fetchFunc();
  }, [])

  const refreshData = () => {
    fetchFunc(); // Your existing fetch function
  };

  return useData(serverData, page, refreshData, filters, searchQuery);
}
