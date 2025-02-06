import { useState, useEffect, useMemo } from 'react';
import { ReceptionItem, ReceptionsData } from '@/types/receptions';

const itemBackendData = (itemData: any): ReceptionItem => {
  return {
    id: itemData.id,
    name: itemData.item_name,
    item_code: itemData.item_code,
    description: itemData.item_description,
    manufacturer: itemData.item_manufacurer,
    manufacturer_code: itemData.item_manufacturer_code,
    quantity: itemData.item_quantity || 0,
    bin: itemData.item_bin,
  }
};

const receptionBackendData = (backendData: any): ReceptionsData => {
  const itemsData = backendData.items.map((item: any) => itemBackendData(item))
  return {
    id: backendData.id,
    po_number: backendData.po_number,
    items: itemsData,
    storeKeeper: {
      name: `${backendData.storekeeper.first_name} ${backendData.storekeeper.last_name}`,
      avatar: backendData.storekeeper.avatar || ''
    },
    purchaseOrder: backendData.purchase_order,
  }
}

function useData(
  sourceData: any,
  page: number,
  refreshData: () => void,
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
        item.po_number.toString().toLowerCase().includes(query) ||
        item.items.toLowerCase().includes(query) ||
        item.storekeeper.toLowerCase().includes(query) ||
        item.purchaseOrder.toLowerCase().includes(query)
      );
    }

    return result;
  }, [sourceData, searchQuery]);

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
export function useReceptionItemsData(page: number, searchQuery?: string) {
  const [serverData, setServerData] = useState<ReceptionItem[]>([]);
  const fetchFunc = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/reception-items`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: ReceptionItem[] = await response.json();
      let receptionItem = data.map((item: ReceptionItem) => itemBackendData(item));
      setServerData(receptionItem);
    } catch (error) {
      console.error("Error fetching Reception item:", error);
    }
  }
  useEffect(() => {
    fetchFunc();
  }, [])

  const refreshData = () => {
    fetchFunc(); // Your existing fetch function
  };
  return useData(serverData, page, refreshData, searchQuery);
}

export function useReceptionsData(page: number, searchQuery?: string) {
  const [serverData, setServerData] = useState<ReceptionsData[]>([]);

  const fetchFunc = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/receptions`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: ReceptionsData[] = await response.json();
      let receptionDatas = data.map((item: any) => receptionBackendData(item));
      setServerData(receptionDatas);
    } catch (error) {
      console.error("Error fetching Reception Data", error);
    }
  };

  useEffect(() => {
    fetchFunc();
  }, [])

  const refreshData = () => {
    fetchFunc(); // Your existing fetch function
  };

  return useData(serverData, page, refreshData, searchQuery);
}

