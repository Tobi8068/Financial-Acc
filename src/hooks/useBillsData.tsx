import { useState, useEffect, useMemo } from 'react';
import { BillsData, BillsFilters } from '@/types/bills';
import { SortOption } from '@/types/utils';
import { billsData } from '@/lib/mock-data';

export function useBillsData(
  page: number,
  filters: BillsFilters,
  sortOption: SortOption,
  searchQuery: string
) {
  const [data, setData] = useState<BillsData[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 5;

  const filteredAndSortedData = useMemo(() => {

    let result = [...billsData];

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item =>
        item.id.toLowerCase().includes(query) ||
        item.dateCreated.toLowerCase().includes(query) ||
        item.supplier.toLowerCase().includes(query) ||
        item.requiredDate.toLowerCase().includes(query) ||
        item.status.toLowerCase().includes(query) ||
        item.terms.toLowerCase().includes(query) ||
        item.shipTo.toLowerCase().includes(query) ||
        item.billTo.toLowerCase().includes(query) ||
        item.totalTaxAmount.toString().toLowerCase().includes(query) ||
        item.totalNetAmount.toString().toLowerCase().includes(query) ||
        item.totalAmount.toString().toLowerCase().includes(query)
      );
    }

    return result;
  }, [filters, sortOption, searchQuery]);

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