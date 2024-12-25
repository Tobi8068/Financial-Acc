import { useState, useEffect, useMemo } from 'react';
import { SalesData, SalesFilters } from '@/types/sales';
import { SortOption } from '@/types/utils';
import { capitalizeLetter } from '@/lib/utils';

const transformBackendData = (backendData: any): SalesData => {
  return {
    pid: backendData.id,
    id: backendData.requisition_number.toString(),
    dateCreated: backendData.date,
    shipTo: backendData.ship_to,
    billTo: backendData.bill_to,
    department: backendData.department.name,
    status: capitalizeLetter(backendData.status) as SalesFilters,
    approvedBy: `${backendData.approved_by.first_name} ${backendData.approved_by.last_name}`,
    createdBy: `${backendData.created_by.first_name} ${backendData.created_by.last_name}`,
    totalAmountBeforeTax: backendData.total_net_amount || 0,
    totalTaxAmount: backendData.total_tax_amount || 0,
    totalAmount: backendData.total_amount || 0
  };
};

const transformItemBackendData = (backendData: any):  => {
  return {
    pid: backendData.id,
    name: backendData.item_name,
    description: backendData.description,
    manufacturerCode: backendData.manufacturer_code,
    manufacturerName: backendData.manufacturer,
    supplierName: backendData.supplier,
    unitOfMeasure: backendData.measure_unit,
    quantity: backendData.quantity,
    price: backendData.price,
    taxAmount: backendData.tax_amount,
    taxGroup: backendData.tax_group,
  };
};

function useData(
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