import { useState, useEffect, useMemo } from 'react';
import { suppliersData, suppliersItems } from '@/lib/mock-data';
import { SuppliersFilters } from '@/types/suppliers';
import { capitalizeLetter } from '@/lib/utils';

function useData(
  sourceData: any,
  page: number,
  filters?: SuppliersFilters,
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
        item.supplierName.toLowerCase().includes(query) ||
        item.address.toLowerCase().includes(query) ||
        item.billingAddress.toLowerCase().includes(query) ||
        item.shippingAddress.toLowerCase().includes(query)
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

export function useSuppliersData(page: number, filters: SuppliersFilters, searchQuery?: string) {
  return useData(suppliersData, page, filters, searchQuery);
}

export function useSuppliersItemsData(page: number, filters?: SuppliersFilters, searchQuery?: string) {
  return useData(suppliersItems, page, filters, searchQuery);
}