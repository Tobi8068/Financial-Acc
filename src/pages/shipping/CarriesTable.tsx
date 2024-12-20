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
import { useCarriesData } from '@/hooks/useCarriesData';
import { CarriesStatus, CarriesFilters, CarrierData } from '@/types/shipping';
import { SortOption } from '@/types/utils';
import { formatDate } from '@/lib/date';
import { Pagination } from '@/components/pagination/Pagination';
import DeleteDialog from '@/components/table/DeleteDialog';
import CarrierDetails from './ViewCarries';
import EditCarries from './EditCarries';

interface CarriesTableProps {
  filters: CarriesFilters;
  sortOption: SortOption;
  searchQuery: string;
  onClick: () => void;
}

export function CarriesTable({ filters, sortOption, searchQuery }: CarriesTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editableDialogOpen, setEditableDialogOpen] = useState(false);
  const [viewItem, setViewItem] = useState<CarrierData>({
    id: '',
    name: '',
    description: '',
    contractID: 0,
    startDate: '',
    endDate: '',
    status: "Active",
    itemCode: '',
    quantity: 0,
  }); 
  const transformCarrierData = (data: CarrierData) => {
    return {
      name: data.name,
      contractId: data.contractID.toString(), // Convert number to string 
      startDate: data.startDate,
      endDate: data.endDate,
      status: data.status
    }
  }
  const transformCarrierDataEdit = (data: CarrierData) => {
    return {
      name: data.name,
      contractId: data.contractID.toString(), // Convert number to string 
      startDate: data.startDate,
      endDate: data.endDate,
      status: data.status,
      quantity: data.quantity.toString(),  // Convert number to string
    }
  }
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);

  const { data, totalPages, totalItems, itemsPerPage } = useCarriesData(
    currentPage,
    filters,
    sortOption,
    searchQuery
  );

  const getStatusBadge = (status: CarriesStatus) => {
    const styles = {
      Expired: 'bg-yellow-100 text-yellow-800',
      Active: 'bg-green-100 text-green-800',
    };

    return (
      <Badge className={styles[status]} variant="secondary">
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const handleView = (item: CarrierData) => {
    setViewItem(item);
    setViewDialogOpen(true);
  };

  const handleEditable = (item: CarrierData) => {
    setViewItem(item);
    setEditableDialogOpen(true);
  };

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

  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Contract ID</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Item Code</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow
                key={item.id}
              >
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>#{item.contractID}</TableCell>
                <TableCell>{formatDate(item.startDate)}</TableCell>
                <TableCell>{formatDate(item.endDate)}</TableCell>
                <TableCell>{getStatusBadge(item.status)}</TableCell>
                <TableCell>{item.itemCode}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="p-2 hover:bg-gray-100 rounded-full">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className='w-24' sideOffset={2}>
                      <ul className="space-y-2">
                        <li className='cursor-pointer' onClick={() => handleView(item)}>View</li>
                        <li className='cursor-pointer' onClick={() => handleEditable(item)}>Edit</li>
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
      <CarrierDetails
        carrier={transformCarrierData(viewItem)}
        open={viewDialogOpen}
        onClose={() => setViewDialogOpen(false)}
      />
      <EditCarries
        initialData={transformCarrierDataEdit(viewItem)}
        onSave={() => {}}
        open={editableDialogOpen}
        onClose={() => setEditableDialogOpen(false)}
      />
      <DeleteDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}