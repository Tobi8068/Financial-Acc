import { useState, useEffect, useMemo } from 'react';
import { CarrierData, CarriesFilters } from '@/types/shipping';
import { SortOption } from '@/types/utils';
import { carriesData } from '@/lib/mock-data';

export function useCarriesData(
  page: number,
  filters: CarriesFilters,
  sortOption: SortOption,
  searchQuery: string
) {
  const [data, setData] = useState<CarrierData[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 5;

  const filteredAndSortedData = useMemo(() => {
    let result = [...carriesData];

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.contractID.toString().toLowerCase().includes(query) ||
        item.startDate.toLowerCase().includes(query) ||
        item.endDate.toLowerCase().includes(query) ||
        item.status.toLowerCase().includes(query) ||
        item.itemCode.toLowerCase().includes(query) ||
        item.quantity.toString().toLowerCase().includes(query)
      );
    }

    // Apply filters
    if (filters.status && filters.status !== 'all') {
      result = result.filter(item => item.status === filters.status);
    }

    // Apply sorting
    switch (sortOption) {
      case 'newest':
        result.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime());
        break;
      case 'amount-high':
        // result.sort((a, b) => b.name - a.name);
        break;
      case 'amount-low':
        // result.sort((a, b) => a.name - b.name);
        break;
    }

    return result;
  }, [carriesData, filters, sortOption, searchQuery]);

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