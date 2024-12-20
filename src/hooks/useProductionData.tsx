
import { useState, useEffect, useMemo } from 'react';
import { ProductionData, ProductionFilters, ProductionItem, ProductionStatus } from '@/types/production';
import { capitalizeLetter } from '@/lib/utils';

const productionBackendData = (backendData: any): ProductionData => {
  return {
    id: backendData.id.toString(),
    date: backendData.date,
    name: backendData.p_name,
    project: backendData.project.project_name,
    productionStartDate: backendData.p_start_date,
    productionEndDate: backendData.p_end_date,
    status: capitalizeLetter(backendData.p_status) as ProductionStatus,
    createdBy: "Creator",
    approved: backendData.approved,
    approvedBy: backendData.approved_by
  };
};

const productionItemBackendData = (backendData: any): ProductionItem => {
  return {
    id: backendData.id,
    name: backendData.item_name,
    description: backendData.description,
    quantity: backendData.quantity,
    manufacturerName: backendData.manufacturer,
    manufacturerCode: backendData.manufacturer_code,
    unitOfMeasure: backendData.measure_unit.orderUnitName,
    status: capitalizeLetter(backendData.status) as ProductionStatus,
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
        item.createdBy.toLowerCase().includes(query) ||
        item.approved.toString().toLowerCase().includes(query) ||
        item.approvedBy.toLowerCase().includes(query)
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

      const text = await response.text(); // First get the raw response text
      const data = text ? JSON.parse(text) : null; // Then parse if there's content
      let transformedData = data.map((item: any) => productionBackendData(item));
      setServerData(transformedData);
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

      const text = await response.text(); // First get the raw response text
      const data = text ? JSON.parse(text) : null; // Then parse if there's content
      let transformedData = data.map((item: any) => productionItemBackendData(item));
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
  return useData(serverData, page, refreshData, filters, searchQuery);
}