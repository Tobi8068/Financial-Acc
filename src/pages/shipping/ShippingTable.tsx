import { useState, useEffect } from 'react';
import { MoreVertical } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { useShippingData } from '@/hooks/useShippingData';
import { ShippingStatus, ShippingFilters} from '@/types/shipping';
import { SortOption } from '@/types/utils';

import { formatDate } from '@/lib/date';
import { Pagination } from '@/components/pagination/Pagination';

import DeleteDialog from '@/components/table/DeleteDialog';

interface ShippingTableProps {
  filters: ShippingFilters;
  sortOption: SortOption;
  searchQuery: string;
  onClickView: (item: any) => void;
}

export function ShippingTable({ filters, sortOption, searchQuery, onClickView }: ShippingTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  // const [viewDialogOpen, setViewDialogOpen] = useState(false);
  // const [editableDialogOpen, setEditableDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);

  const { data, totalPages, totalItems, itemsPerPage } = useShippingData(
    currentPage,
    filters,
    sortOption,
    searchQuery
  );

  useEffect(() => {
    if(totalPages < currentPage) {
      setCurrentPage(1);
    }
  }, [totalPages])

  const getStatusBadge = (status: ShippingStatus) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      shipped: 'bg-green-100 text-green-800',
      delivered: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800',
    };

    return (
      <Badge className={styles[status]} variant="secondary">
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };
  // const handleView = (id: string) => {

  //   setViewDialogOpen(true);
  // };

  // const handleEditable = (id: string) => {
  //   setEditableDialogOpen(true);
  // };

  const handleDelete = (id: string) => {
    setDeleteDialogOpen(true);
    setDeleteItemId(id);
  };

  const handleConfirmDelete = () => {
    if (deleteItemId) {
      console.log('Deleting item with id:', deleteItemId);
      setDeleteDialogOpen(false);
      setDeleteItemId(null);
    }
  };
  useEffect(() => {
    // const fetchFunc = async () => {
    //   const response = await fetch(`${import.meta.env.VITE_BASE_URL}/inventory-items`, {
    //     method: 'GET'
    //   });
    //   console.log("Data", response.json());
    // }
    // fetchFunc();
  }, []);

  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              {/* <TableHead className="w-12">
                <Checkbox 
                  checked={selectedItems.length === data.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead> */}
              <TableHead>No.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead>Date Created</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Sales</TableHead>
              <TableHead>Carrier</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.length !== 0 && data.map((item) => (
              <TableRow
                key={item.id}
              >
                {/* <TableCell>
                  <Checkbox 
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={(checked) => handleSelectItem(item.id, checked as boolean)}
                  /> 
                </TableCell> */}
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.notes}</TableCell>
                <TableCell>{formatDate(item.dateCreated)}</TableCell>
                <TableCell>{getStatusBadge(item.status)}</TableCell>
                <TableCell>${item.sales.toFixed(2)}</TableCell>
                <TableCell>{item.carrier}</TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="p-2 hover:bg-gray-100 rounded-full">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className='w-24' sideOffset={2}>
                      <ul className="space-y-2">
                        <li className='cursor-pointer' onClick={ () => onClickView(item) }>View</li>
                        {/* <li className='cursor-pointer' onClick={() => handleEditable(item.id)}>Edit</li> */}
                        <li className='cursor-pointer' onClick={() => handleDelete(item.id)}>Delete</li>
                      </ul>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
      />

      <DeleteDialog 
        open={deleteDialogOpen} 
        onClose={() => setDeleteDialogOpen(false)} 
        onConfirm={handleConfirmDelete} 
      />
      {/* Assuming there's a ShippingDetail component for viewing details
      {viewDialogOpen && viewItemId && <ShippingDetail itemId={Number(viewItemId)} />} */}
    </div>
  );
}