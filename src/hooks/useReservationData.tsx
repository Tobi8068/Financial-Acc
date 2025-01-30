import { useState, useEffect, useMemo } from 'react';
import { ReservationData, ReservationItem, ReservationStatus, ReservationFilters } from '@/types/reservation';
import { capitalizeLetter } from '@/lib/utils';

const ItemBackendData = (backendData: any): ReservationItem => {
  return {
    id: backendData.id,
    name: backendData.item_name,
    description: backendData.item_description,
    manufacturer: backendData.item_manufacturer,
    manufacturer_code: backendData.item_manufacturer_code,
    measure_unit: backendData.item_measure_unit,
    quantity: backendData.item_quantity,
    item_code: backendData.item_code,
  }
}

const BackendData = (backendData: any): ReservationData => {
  const itemsData = backendData.items.map((item: any) => ItemBackendData(item));
  return {
    id: backendData.id,
    reason: backendData.reason,
    status: capitalizeLetter(backendData.status) as ReservationStatus,
    storeKeeper: {
      name: `${backendData.storekeeper.first_name} ${backendData.storekeeper.last_name}`,
      avatar: backendData.storekeeper.avatar || ''
    },
    reservedBy: {
      name: `${backendData.reserved_by.first_name} ${backendData.reserved_by.last_name}`,
      avatar: backendData.reserved_by.avatar || ''
    },
    project: backendData.project,
    created_date: backendData.created_date,
    items: itemsData,
    reservation_date: backendData.reservation_date
  }
}

function useData(
  sourceData: any,
  page: number,
  refreshData: () => void,
  filters?: ReservationFilters,
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
        item.dateCreated.toLowerCase().includes(query) ||
        item.items.toLowerCase().includes(query) ||
        item.reservationDate.toLowerCase().includes(query) ||
        item.reason.toLowerCase().includes(query) ||
        item.project.toLowerCase().includes(query) ||
        item.storeKeeper.name.toLowerCase().includes(query) ||
        item.reservedBy.name.toLowerCase().includes(query) ||
        item.status.toLowerCase().includes(query)
      );
    }

    if (filters) {
      if (filters.status && filters.status !== 'all') {
        result = result.filter(item => item.status.toLowerCase() === filters.status);
      }
    }

    return result;
  }, [sourceData, searchQuery, filters]);

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
export function useReservationItemsData(page: number, filters?: ReservationFilters, searchQuery?: string) {
  const [serverData, setServerData] = useState<ReservationItem[]>([]);
  const fetchFunc = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/reservation-items`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: ReservationItem[] = await response.json();
      const itemData = data.map((item: any) => ItemBackendData(item));
      setServerData(itemData);
    } catch (error) {
      console.error("Error fetching Reservation Item:", error);
    }
  };

  useEffect(() => {
    fetchFunc();
  }, [])

  const refreshData = () => {
    fetchFunc();
  };
  return useData(serverData, page, refreshData, filters, searchQuery);
}

export function useReservationData(page: number, filters?: ReservationFilters, searchQuery?: string) {
  const [serverData, setServerData] = useState<ReservationData[]>([]);
  const fetchFunc = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/reservations`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: ReservationData[] = await response.json();
      const reservationData = data.map((item: any) => BackendData(item));
      setServerData(reservationData);
    } catch (error) {
      console.error("Error fetching Reservations", error);
    }
  };

  useEffect(() => {
    fetchFunc();
  }, [])

  const refreshData = () => {
    fetchFunc();
  };
  return useData(serverData, page, refreshData, filters, searchQuery);
}