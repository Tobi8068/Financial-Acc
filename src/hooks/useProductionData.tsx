
import { useState, useEffect, useMemo } from 'react';
import { productionData, productionItemData } from '@/lib/mock-data';
import { ProductionFilters } from '@/types/production';
function useData(
  sourceData: any,
  page: number,
  filters?: ProductionFilters,
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
    itemsPerPage
  };
}
export function useProductionData(page: number, filters: ProductionFilters, searchQuery?: string) {
  return useData(productionData, page, filters, searchQuery);
}
export function useProductionItemsData(page: number, filters?: ProductionFilters, searchQuery?: string) {
  return useData(productionItemData, page, filters, searchQuery);
}