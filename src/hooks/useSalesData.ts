import { useState, useEffect, useMemo } from 'react';
import { SalesData, SalesFilters, SalesItemData, SalesStatus, SalesItemStatus } from '@/types/sales';
import { SortOption } from '@/types/utils';
import { capitalizeLetter } from '@/lib/utils';

const transformBackendData = (backendData: any): SalesData => {
  return {
    pid: backendData.id,
    id: backendData.sales_number.toString(),
    dateCreated: backendData.created_date,
    shipTo: backendData.ship_to,
    billTo: backendData.bill_to,
    department: backendData.department.name,
    status: capitalizeLetter(backendData.status) as SalesStatus,
    approvedBy: {
      name: `${backendData.approved_by.first_name} ${backendData.approved_by.last_name}`,
      avatar: backendData.approved_by.avatar,
    },
    createdBy: {
      name: `${backendData.created_by.first_name} ${backendData.created_by.last_name}`,
      avatar: backendData.created_by.avatar,
    },
    totalNetAmount: backendData.total_net_amount || 0,
    totalTaxAmount: backendData.total_tax_amount || 0,
    totalAmount: backendData.total_amount || 0,

    sent: backendData.sent
  };
};

const transformItemBackendData = (backendData: any): SalesItemData => {
  return {
    pid: backendData.id,
    name: backendData.item_name,
    description: backendData.description,
    manufacturer: backendData.manufacturer,
    manufacturerCode: backendData.manufacturer_code,
    status: capitalizeLetter(backendData.status) as SalesItemStatus,
    
    // itemCode: backendData.measure_unit.orderUnitName,
    unitOfMeasure: backendData.measure_unit.orderUnitName,
    quantity: backendData.quantity,
    price: backendData.price,
    
    taxGroup: backendData.tax_group,
    netAmount: backendData.net_Amount,
    taxAmount: backendData.tax_amount,
    
    account: backendData.account,
  };
};

function useData(
  sourceData: any,
  page: number,
  refreshData: () => void,
  filters: SalesFilters,
  sortOption: SortOption,
  searchQuery: string,
) {
  const [data, setData] = useState<SalesData[]>([]);
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
        item.approvedBy.name.toLowerCase().includes(query) ||
        item.createdBy.name.toLowerCase().includes(query) ||
        item.clientApproval.toLowerCase().includes(query) ||
        item.totalTaxAmount.toString().toLowerCase().includes(query) ||
        item.totalNetAmount.toString().toLowerCase().includes(query) ||
        item.totalAmount.toString().toLowerCase().includes(query)
      );
    }

    // Apply filters
    if (filters.status && filters.status !== 'all') {
      result = result.filter(item => item.status.toLowerCase() === filters.status);
    }
  
    // Apply sorting
    switch (sortOption) {
      case 'newest':
        result.sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime());
        break;
      case 'amount-high':
        result.sort((a, b) => b.totalAmount - a.totalAmount);
        break;
      case 'amount-low':
        result.sort((a, b) => a.totalAmount - b.totalAmount);
        break;
    }

    return result;
  }, [sourceData, filters, sortOption, searchQuery]);
  
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

export function useSalesData(page: number, filters: SalesFilters, sortOption: SortOption, searchQuery?: string) {
  const [serverData, setServerData] = useState<SalesData[]>([]);
  const fetchFunc = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/sales`, {
          method: 'GET',
        });
  
        const text = await response.text(); // First get the raw response text
        const data = text ? JSON.parse(text) : null; // Then parse if there's content
        let transformedData = data.map((item: any) => transformBackendData(item));
        setServerData(transformedData);
      } catch (error) {
        console.error("Error fetching requisitions:", error);
      }
    };
    useEffect(() => {
      fetchFunc();
    }, [])
    const refreshData = () => {
      fetchFunc(); // Your existing fetch function
    };
 
    return useData(serverData, page, refreshData, filters, sortOption, searchQuery || '');
  }
  
export function useSalesItemData(page: number, filters: SalesFilters, sortOption: SortOption, searchQuery?: string) {
  const [serverData, setServerData] = useState<SalesItemData[]>([]);
    const fetchFunc = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/sales-items`, {
          method: 'GET',
        });
        
        const text = await response.text(); // First get the raw response text
        const data = text ? JSON.parse(text) : null; // Then parse if there's content
        let transformedData = data.map((item: any) => transformItemBackendData(item));
        setServerData(transformedData);
      } catch (error) {
        console.error("Error fetching requisitions:", error);
      }
    };
    useEffect(() => {
      fetchFunc();
    }, [])
    const refreshData = () => {
      fetchFunc(); // Your existing fetch function
    };
    return useData(serverData, page, refreshData, filters, sortOption, searchQuery || '');
}

