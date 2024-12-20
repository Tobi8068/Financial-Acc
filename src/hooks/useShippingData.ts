import { useState, useEffect, useMemo } from 'react';
import { ShippingFilters } from '@/types/shipping';
import { shippingData, shippingItemsData } from '@/lib/mock-data';

function useData(
  sourceData: any,
  page: number,
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
    itemsPerPage
  };
}

export function useShippingData(page: number, filters: ShippingFilters, searchQuery?: string) {
  return useData(shippingData, page, filters, searchQuery);
}

export function useShippingItemsData(page: number, filters?: ShippingFilters, searchQuery?: string) {
  return useData(shippingItemsData, page, filters, searchQuery);
}




