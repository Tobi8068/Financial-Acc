import { useState, useEffect, useMemo } from 'react';
import { ShippingData, ShippingFilters, ShippingItem, ShippingStatus } from '@/types/shipping';
import { capitalizeLetter } from '@/lib/utils';

const transformBackendData = (backendData: any): ShippingData => {
  return {
    id: backendData.id,
    name: backendData.item_name,
    notes: backendData.description,
    dateCreated: backendData.quantity,
    status: capitalizeLetter(backendData.status) as ShippingStatus,
    sales: backendData.manufacturer,
    carrier: backendData.manufacturer_code,
    other: backendData.measure_unit.orderUnitName,
    tracking: backendData.approved_quantity,
    packingList: backendData.approved_quantity
  };
};

const transformItemBackendData = (backendData: any): ShippingItem => {
  return {
    id: backendData.id,
    name: backendData.item_name,
    description: backendData.description,
    manufacturerCode: backendData.manufacturer_code,
    manufacturerName: backendData.manufacturer,
    itemCode: backendData.measure_unit.orderUnitName,
    quantity: backendData.quantity,
    approved_quantity: backendData.approved_quantity
  };
};

function useData(
  sourceData: any,
  page: number,
  refreshData: () => void,
  filters?: ShippingFilters,
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
        item.name.toLowerCase().includes(query) ||
        item.notes.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query) ||
        item.dateCreated.toLowerCase().includes(query) ||
        item.other.toLowerCase().includes(query) ||
        item.sales.toString().toLowerCase().includes(query) ||
        item.carrier.toLowerCase().includes(query)
      );
    }

    if (filters) {
      if (filters.status && filters.status !== 'all') {
        result = result.filter(item => item.status.toLowerCase() === filters.status.toLowerCase());
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

export function useShippingData(page: number, filters: ShippingFilters, searchQuery?: string) {
  const [serverData, setServerData] = useState<ShippingData[]>([]);
    const fetchFunc = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/shipping`, {
          method: 'GET',
        });
  
        const text = await response.text(); // First get the raw response text
        const data = text ? JSON.parse(text) : null; // Then parse if there's content
        let transformedData = data.map((item: any) => transformBackendData(item));
        setServerData(transformedData);
      } catch (error) {
        console.error("Error fetching Shipping Data:", error);
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

export function useShippingItemsData(page: number, filters?: ShippingFilters, searchQuery?: string) {
  const [serverData, setServerData] = useState<ShippingItem[]>([]);
    const fetchFunc = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/shipping-items`, {
          method: 'GET',
        });
  
        const text = await response.text(); // First get the raw response text
        const data = text ? JSON.parse(text) : null; // Then parse if there's content
        let transformedData = data.map((item: any) => transformItemBackendData(item));
        setServerData(transformedData);
      } catch (error) {
        console.error("Error fetching Shipping item:", error);
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




