import { useState, useEffect, useMemo } from 'react';
import { ReceptionsData } from '@/types/receptions';
import { receptionsData } from '@/lib/mock-data';

export function useReceptionsData(
  page: number,
  searchQuery: string
) {
  const [data, setData] = useState<ReceptionsData[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 5;

  const filteredAndSortedData = useMemo(() => {

    let result = [...receptionsData];

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
  }, [receptionsData, searchQuery]);

  useEffect(() => {
  }, []);

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