import { useState, useEffect, useMemo } from 'react';
import { receptionsData, receptionItemsData } from '@/lib/mock-data';

function useData(
  sourceData: any,
  page: number,
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
        item.purchaseOrderNo.toString().toLowerCase().includes(query) ||
        item.items.toLowerCase().includes(query) ||
        item.storeKeeper.toLowerCase().includes(query) ||
        item.purchaseOrder.toLowerCase().includes(query)
      );
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

export function useReceptionsData(page: number, searchQuery?: string) {
  return useData(receptionsData, page, searchQuery);
}

export function useReceptionItemsData(page: number, searchQuery?: string) {
  return useData(receptionItemsData, page, searchQuery);
}