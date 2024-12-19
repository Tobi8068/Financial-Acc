import { useState, useEffect, useMemo } from 'react';
import { transfersData, transfersItemsData } from '@/lib/mock-data';
import { TransfersFilters } from '@/types/transfers';

function useData(
  sourceData: any,
  page: number,
  filters?: TransfersFilters,
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
        item.items.toLowerCase().includes(query) ||
        item.reason.toString().toLowerCase().includes(query) ||
        item.createdBy.name.toLowerCase().includes(query) ||
        item.status.toLowerCase().includes(query) ||
        item.reservationDate.toLowerCase().includes(query) ||
        item.reservedBy.name.toLowerCase().includes(query)
      );
    }

    if (filters) {
      if (filters.status && filters.status !== 'all') {
        result = result.filter(item => item.status.toLowerCase() === filters.status.toLowerCase());
      }
    }


    return result;
  }, [sourceData, searchQuery]);

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

export function useTransfersData(page: number, filters: TransfersFilters, searchQuery?: string) {
  return useData(transfersData, page, filters, searchQuery);
}

export function useTransferItemsData(page: number, filters?: TransfersFilters, searchQuery?: string) {
  return useData(transfersItemsData, page, filters, searchQuery);
}