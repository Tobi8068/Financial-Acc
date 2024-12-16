import { useState, useEffect, useMemo } from 'react';
import { ClientData } from '@/types/client';
import { clientData } from '@/lib/mock-data';

export function useClientData(
  page: number,
  searchQuery: string
) {
  const [data, setData] = useState<ClientData[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 5;

  const filteredAndSortedData = useMemo(() => {

    let result = [...clientData];

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.client.name.toLowerCase().includes(query) ||
        item.dateCreated.toLowerCase().includes(query) ||
        item.address.toLowerCase().includes(query) ||
        item.billingAddress.toLowerCase().includes(query) ||
        item.shippingAddress.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query)
      );
    }

    // Apply filters
    // if (filters.status && filters.status !== 'all') {
    //   result = result.filter(item => item.status === filters.status);
    // }

    return result;
  }, [clientData, searchQuery]);

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