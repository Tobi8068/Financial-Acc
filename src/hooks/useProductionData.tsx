import { useState, useEffect, useMemo } from 'react';
import { ProductionData, ProductionFilters } from '@/types/production';
import { SortOption } from '@/types/utils';
import { productionData } from '@/lib/mock-data';

export function useProductionData(
  page: number,
  filters: ProductionFilters,
  sortOption: SortOption,
  searchQuery: string
) {
  const [data, setData] = useState<ProductionData[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 5;

  const filteredAndSortedData = useMemo(() => {

    let result = [...productionData];

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

    // Apply filters
    if (filters.status && filters.status !== 'all') {
      result = result.filter(item => item.status.toLowerCase() === filters.status);
    }

    return result;
  }, [filters, sortOption, searchQuery]);

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