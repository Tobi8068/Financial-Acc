import { useState, useEffect, useMemo } from 'react';
import { transfersData, transfersItemsData } from '@/lib/mock-data';

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
        item.items.toLowerCase().includes(query) ||
        item.reason.toString().toLowerCase().includes(query) ||
        item.createdBy.name.toLowerCase().includes(query) ||
        item.status.toLowerCase().includes(query) ||
        item.reservationDate.toLowerCase().includes(query) ||
        item.reservedBy.name.toLowerCase().includes(query)
      );
    }

    return result;
  }, [sourceData, searchQuery]);

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

export function useTransfersData(page: number, searchQuery?: string) {
  return useData(transfersData, page, searchQuery);
}

export function useTransferItemsData(page: number, searchQuery?: string) {
  return useData(transfersItemsData, page, searchQuery);
}