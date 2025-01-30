
import { useState, useEffect, useMemo } from 'react';
import { ProductionData, ProductionFilters, ProductionItem, ProductionStatus, ProductionItemStatus } from '@/types/production';
import { capitalizeLetter } from '@/lib/utils';


const productionItemBackendData = (backendData: any): ProductionItem => {
  return {
    id: backendData.id,
    name: backendData.item_name,
    description: backendData.description,
    quantity: backendData.quantity,
    manufacturer: backendData.manufacturer,
    manufacturer_code: backendData.manufacturer_code,
    unitOfMeasure: backendData.measure_unit.orderUnitName,
    status: capitalizeLetter(backendData.status) as ProductionItemStatus,
    approvedQuantity: backendData.approved_quantity
  };
};

function useData(
  sourceData: any,
  page: number,
  refreshData: () => void,
  filters?: ProductionFilters,
  searchQuery?: string,
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
        item.date.toLowerCase().includes(query) ||
        item.name.toLowerCase().includes(query) ||
        item.project.toLowerCase().includes(query) ||
        item.productionStartDate.toLowerCase().includes(query) ||
        item.productionEndDate.toLowerCase().includes(query) ||
        item.status.toLowerCase().includes(query) ||
        item.createdBy.name.toLowerCase().includes(query) ||
        item.approvedBy.name.toLowerCase().includes(query)
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

export function useProductionData(page: number, filters: ProductionFilters, searchQuery?: string) {
  const [serverData, setServerData] = useState<ProductionData[]>([]);
  const fetchFunc = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/productions`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data:ProductionData[] = await response.json();

      let Production_Data = data.map((item: any) => productionBackendData(item));
      setServerData(Production_Data);
    } catch (error) {
      console.error("Error fetching productions:", error);
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

export function useProductionItemsData(page: number, filters?: ProductionFilters, searchQuery?: string) {
  const [serverData, setServerData] = useState<ProductionItem[]>([]);
  const fetchFunc = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/production-items`, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data:ProductionItem[] = await response.json();
      let Production_Item = data.map((item: any) => productionItemBackendData(item));
      setServerData(Production_Item);
    } catch (error) {
      console.error("Error fetching Production:", error);
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