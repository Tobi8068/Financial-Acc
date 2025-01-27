import { useState, useEffect, useMemo } from 'react';
import { TransfertData, TransfertItem, TransfertFilters, TransfertStatus, TransfertItemStatus } from '@/types/transferts';
import { capitalizeLetter } from '@/lib/utils';

const transformItemBackendData = (backendData: any): TransfertItem => {
  return {
    id: backendData.id,
    name: backendData.item_name,
    description: backendData.item_description,
    manufacturer: backendData.item_manufacturer,
    manufacturer_code: backendData.item_manufacturer_code,
    quantity: backendData.item_quantity,
    bin: backendData.item_bin,
    status: capitalizeLetter(backendData.status) as TransfertItemStatus,
  };
};

const transformBackendData = (backendData: any): TransfertData => {
  const itemData = backendData.trans_items.map((item: any) => transformItemBackendData(item));
  return {
    id: backendData.id,
    trans_num: backendData.trans_num,
    date: backendData.date,
    items: itemData,
    reason: backendData.trans_reason,
    createdBy: {
      name: `${backendData.created_by.first_name} ${backendData.created_by.last_name}`,
      avatar: backendData.created_by.avatar || ''
    },
    status: capitalizeLetter(backendData.status) as TransfertStatus,
    bin: backendData.trans_bin.bin_name
  };
};

function useData(
  sourceData: any,
  page: number,
  refreshData: () => void,
  filters?: TransfertFilters,
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
        item.date.toLowerCase().includes(query) ||
        item.items.toLowerCase().includes(query) ||
        item.reason.toLowerCase().includes(query) ||
        item.createdBy.name.toLowerCase().includes(query) ||
        item.status.toLowerCase().includes(query) ||
        item.bin.toString().toLowerCase().includes(query) ||
        item.reservationDate.toLowerCase().includes(query) ||
        item.reservedBy.name.toLowerCase().includes(query)
      );
    }

    if (filters) {
      if (filters.status && filters.status !== 'all') {
        result = result.filter(item => item.status.toLowerCase() === filters.status.toLowerCase());
      }
    }


    return result;
  }, [sourceData, filters, searchQuery]);

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
    itemsPerPage,
    refreshData
  };
}

export function useTransfertData(page: number, filters: TransfertFilters, searchQuery?: string) {
  const [serverData, setServerData] = useState<TransfertData[]>([]);
  const fetchFunc = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/transferts`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: TransfertData[] = await response.json();

      let transformedData = data.map((item: any) => transformBackendData(item));
      setServerData(transformedData);
    } catch (error) {
      console.error("Error fetching Transfert:", error);
    }
  };
  useEffect(() => {
    fetchFunc();
  }, [])

  const refreshData = () => {
    fetchFunc(); // Your existing fetch function
  };

  return useData(serverData, page, refreshData, filters, searchQuery);
}

export function useTransferItemsData(page: number, filters?: TransfertFilters, searchQuery?: string) {
  const [serverData, setServerData] = useState<TransfertItem[]>([]);
  const fetchFunc = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/transfert-items`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: TransfertItem[] = await response.json();
      let transformedData = data.map((item: any) => transformItemBackendData(item));
      setServerData(transformedData);
    } catch (error) {
      console.error("Error fetching Transfert:", error);
    }
  };
  useEffect(() => {
    fetchFunc();
  }, [])

  const refreshData = () => {
    fetchFunc(); // Your existing fetch function
  };

  return useData(serverData, page, refreshData, filters, searchQuery);
}