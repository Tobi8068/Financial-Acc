import { useState, useEffect, useMemo } from 'react';
import { PurchaseOrderData, PurchaseOrderFilters, PurchaseOrderItem, PurchaseOrderStatus, PurchaseOrderItemStatus } from '@/types/purchaseOrder';
import { capitalizeLetter } from '@/lib/utils';

const transformItemBackendData = (backendData: any): PurchaseOrderItem => {
  if (backendData) {
    return {
      pid: backendData.id,
      name: backendData.item_name,
      description: backendData.description,
      manufacturerName: backendData.manufacturer,
      manufacturerCode: backendData.manufacturer_code,
      supplierCode: backendData.supplier,
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
  } else {
    return {
      pid: '0',
      name: '',
      description: '',
      manufacturerName: '',
      manufacturerCode: '',
      supplierCode: '',
      unitOfMeasure: '',
      quantity: 0,
      price: 0,
      netAmount: 0,
      taxAmount: 0,
      taxGroup: 0,
      status: 'Pending' as PurchaseOrderItemStatus,
      account: '',
      reception_quantity: 0
    };
  }
};

const transformBackendData = (backendData: any): PurchaseOrderData => {
  const itemsData = backendData.items.map((item: any) => transformItemBackendData(item));
  return {
    pid: backendData.id,
    id: backendData.requisition_number.toString(),
    dateCreated: backendData.date,
    shipTo: backendData.ship_to,
    billTo: backendData.bill_to,
    department: backendData.department.name,
    items: itemsData,
    status: capitalizeLetter(backendData.status) as PurchaseOrderStatus,
    approvedBy: `${backendData.approved_by.first_name} ${backendData.approved_by.last_name}`,
    createdBy: `${backendData.created_by.first_name} ${backendData.created_by.last_name}`,
    totalNetAmount: backendData.total_net_amount || 0,
    totalTaxAmount: backendData.total_tax_amount || 0,
    totalAmount: backendData.total_amount || 0,
    approved: backendData.approved || false,
    sent: backendData.sent || false
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
      const text = await response.text(); // First get the raw response text
      const data = text ? JSON.parse(text) : null; // Then parse if there's content
      let transformedData = data.map((item: any) => transformBackendData(item));
      setServerData(transformedData);
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

      const text = await response.text(); // First get the raw response text
      const data = text ? JSON.parse(text) : null; // Then parse if there's content

      let transformedData = data.map((item: any) => transformItemBackendData(item));
      setServerData(transformedData);
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


// export function usePurchaseOrderItemsData(page: number, filters?: PurchaseOrderFilters, searchQuery?: string) {
//   const [serverData, setServerData] = useState<PurchaseOrderItem[]>([]);
//   const fetchFunc = async () => {
//     try {
//       const response = await fetch(`${import.meta.env.VITE_BASE_URL}/PO-items`, {
//         method: 'GET',
//       });

//       const text = await response.text(); // First get the raw response text
//       const data = text ? JSON.parse(text) : null; // Then parse if there's content
//       let transformedData = data.map((item: any) => transformItemBackendData(item));
//       console.log("==========>", data)

//       setServerData(transformedData);
//     } catch (error) {
//       console.error("Error fetching PO item:", error);
//     }
//   };
//   useEffect(() => {
//     fetchFunc();
//   }, [])
//   const refreshData = () => {
//     fetchFunc(); // Your existing fetch function
//   };
//   return useData(serverData, page, refreshData, filters, searchQuery);
// }