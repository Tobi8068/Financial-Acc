import { useState, useEffect, useMemo } from 'react';
import { RequisitionsData, RequisitionsFilters } from '@/types/requisitions';
import { SortOption } from '@/types/utils';
import { requisitionsData } from '@/lib/mock-data';

export function useRequisitionsData(
  page: number,
  filters: RequisitionsFilters,
  sortOption: SortOption,
  searchQuery: string
) {
  const [data, setData] = useState<RequisitionsData[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 5;

  const filteredAndSortedData = useMemo(() => {

    let result = [...requisitionsData];

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item =>
        item.id.toLowerCase().includes(query) ||
        item.dateCreated.toLowerCase().includes(query) ||
        item.shipTo.toLowerCase().includes(query) ||
        item.billTo.toLowerCase().includes(query) ||
        item.department.toLowerCase().includes(query) ||
        item.approvedBy.toLowerCase().includes(query) ||
        item.createdBy.toLowerCase().includes(query) ||
        item.totalAmountBeforeTax.toString().toLowerCase().includes(query) ||
        item.totalTaxAmount.toString().toLowerCase().includes(query) ||
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
  }, [requisitionsData, filters, sortOption, searchQuery]);

  useEffect(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setData(filteredAndSortedData.slice(startIndex, endIndex));
    setTotalItems(filteredAndSortedData.length);
  }, [page, filteredAndSortedData]);


  useEffect(() => {
    const fetchFunc = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/requisitions`, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const text = await response.text(); // First get the raw response text
        const data = text ? JSON.parse(text) : null; // Then parse if there's content
        console.log("Data", data);
      } catch (error) {
        console.error("Error fetching requisitions:", error);
      }
    };
    fetchFunc();
  }, [])

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return {
    data,
    totalPages,
    totalItems,
    itemsPerPage
  };
}