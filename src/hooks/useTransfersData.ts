import { useState, useEffect, useMemo } from 'react';
import { TransfersData, TransfersFilters } from '@/types/transfers';
import { SortOption } from '@/types/utils';
import { transfersData } from '@/lib/mock-data';

export function useTransfersData(
  page: number,
  filters: TransfersFilters,
  sortOption: SortOption,
  searchQuery: string
) {
  const [data, setData] = useState<TransfersData[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 5;

  const filteredAndSortedData = useMemo(() => {

    let result = [...transfersData];

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.date.toLowerCase().includes(query) ||
        item.items.toLowerCase().includes(query) ||
        item.reason.toLowerCase().includes(query) ||
        item.createdBy.name.toLowerCase().includes(query) ||
        item.status.toLowerCase().includes(query) ||
        item.reservationDate.toLowerCase().includes(query) ||
        item.reservedBy.name.toLowerCase().includes(query)
      );
    }

    // Apply filters
    if (filters.status && filters.status !== 'all') {
      result = result.filter(item => item.status === filters.status);
    }
  
    // Apply sorting
    // switch (sortOption) {
    //   case 'newest':
    //     result.sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());
    //     break;
    //   case 'oldest':
    //     result.sort((a, b) => new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime());
    //     break;
    //   case 'amount-high':
    //     result.sort((a, b) => b.totalAmount - a.totalAmount);
    //     break;
    //   case 'amount-low':
    //     result.sort((a, b) => a.totalAmount - b.totalAmount);
    //     break;
    // }

    return result;
  }, [transfersData, filters, sortOption, searchQuery]);

  useEffect(() => {
    // const fetchFunc = async () => {
    //   const response = await fetch(`${import.meta.env.VITE_BASE_URL}/inventory-items`, {
    //     method: 'GET'
    //   });
  
    //   console.log("Data", response.json());
    // }
    // fetchFunc();
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