import { useState, useEffect, useMemo } from 'react';
import { ReOrderData, ReOrderFilters } from '@/types/reOrder';
import { SortOption } from '@/types/utils';
import { reOrderData } from '@/lib/mock-data';

export function useReOrderData(
  page: number,
  filters: ReOrderFilters,
  sortOption: SortOption,
  searchQuery: string
) {
  const [data, setData] = useState<ReOrderData[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 5;

  const filteredAndSortedData = useMemo(() => {

    let result = [...reOrderData];

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item =>
        item.id.toLowerCase().includes(query) ||
        item.name.toLowerCase().includes(query) ||
        item.date.toLowerCase().includes(query) ||
        item.numberOfItem.toString().toLowerCase().includes(query) ||
        item.numberOfRequisition.toString().toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.orderUnit.toLowerCase().includes(query) ||
        item.preferredSupplier.toLowerCase().includes(query) ||
        item.price.toString().toLowerCase().includes(query) ||
        item.itemCode.toLowerCase().includes(query) ||
        item.manufacturer.toString().toLowerCase().includes(query) ||
        item.manufacturer_code.toString().toLowerCase().includes(query)
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