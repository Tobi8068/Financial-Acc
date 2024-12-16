import { useState, useEffect, useMemo } from 'react';
import { PurchaseOrderData, PurchaseOrderFilters } from '@/types/purchaseOrder';
import { SortOption } from '@/types/utils';
import { purchaseOrderData } from '@/lib/mock-data';

export function usePurchaseOrderData(
  page: number,
  filters: PurchaseOrderFilters,
  // sortOption: SortOption,
  searchQuery: string
) {
  const [data, setData] = useState<PurchaseOrderData[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 5;

  const filteredAndSortedData = useMemo(() => {

    let result = [...purchaseOrderData];

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.id.toLowerCase().includes(query) ||
        item.dateCreated.toLowerCase().includes(query) ||
        item.shipTo.toLowerCase().includes(query) ||
        item.billTo.toLowerCase().includes(query) ||
        item.department.toLowerCase().includes(query) ||
        item.createdBy.toLowerCase().includes(query) ||
        item.approvedBy.toLowerCase().includes(query)
      );
    }

    // Apply filters
    if (filters.status && filters.status !== 'all') {
      result = result.filter(item => item.status.toLowerCase() === filters.status);
    }

    return result;
  }, [purchaseOrderData, filters, searchQuery]);

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