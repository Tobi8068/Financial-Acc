import { useState, useEffect, useMemo } from 'react';
import { SalesData, SalesFilters } from '@/types/sales';
import { SortOption } from '@/types/utils';
import { salesData } from '@/lib/mock-data';

export function useSalesData(
  page: number,
  filters: SalesFilters,
  sortOption: SortOption,
  searchQuery: string
) {
  const [data, setData] = useState<SalesData[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 5;

  const filteredAndSortedData = useMemo(() => {

    let result = [...salesData];

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.id.toLowerCase().includes(query) ||
        item.dateCreated.toLowerCase().includes(query) ||
        item.shipTo.toLowerCase().includes(query) ||
        item.billTo.toLowerCase().includes(query) ||
        item.approvedBy.name.toLowerCase().includes(query) ||
        item.createdBy.name.toLowerCase().includes(query) ||
        item.clientApproval.toLowerCase().includes(query) ||
        item.totalTaxAmount.toString().toLowerCase().includes(query) ||
        item.totalNetAmount.toString().toLowerCase().includes(query) ||
        item.totalAmount.toString().toLowerCase().includes(query)
      );
    }

    // Apply filters
    if (filters.status && filters.status !== 'all') {
      result = result.filter(item => item.status.toLowerCase() === filters.status);
    }
  
    // Apply sorting
    switch (sortOption) {
      case 'newest':
        result.sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime());
        break;
      case 'amount-high':
        result.sort((a, b) => b.totalAmount - a.totalAmount);
        break;
      case 'amount-low':
        result.sort((a, b) => a.totalAmount - b.totalAmount);
        break;
    }

    return result;
  }, [salesData, filters, sortOption, searchQuery]);

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