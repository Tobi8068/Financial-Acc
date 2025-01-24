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
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useProductionData } from '@/hooks/useProductionData';
import { ProductionStatus, ProductionFilters } from '@/types/production';
import { SortOption } from '@/types/utils';
import { formatDate } from '@/lib/date';
import { Pagination } from '@/components/pagination/Pagination';
import DeleteDialog from '@/components/table/DeleteDialog';
import useNotification from '@/hooks/useNotifications';

interface ProductionTableProps {
  filters: ProductionFilters;
  sortOption: SortOption;
  searchQuery: string;
  onClickView: (item: any) => void;
}

export function ProductionTable({ filters, searchQuery, onClickView }: ProductionTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  const { data, totalPages, totalItems, itemsPerPage, refreshData } = useProductionData(
    currentPage,
    filters,
    searchQuery,
  );
  const { showNotification } = useNotification();

  useEffect(() => {
    if (totalPages < currentPage) {
      setCurrentPage(1);
    }
  }, [totalPages])

  const handleDelete = (id: string) => {
    setDeleteDialogOpen(true);
    setDeleteItemId(id);
  };

  const handleConfirmDelete = async () => {
    console.log('Delete Ready', deleteItemId);
    if (deleteItemId) {
      console.log('Deleting item with id:', deleteItemId);
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/productions/${deleteItemId}`, {
        method: 'DELETE',
      })
      console.log(response.status);
      if (response.status === 204) {
        showNotification('Item deleted successfully', 'success');
        refreshData();
      }
      setDeleteDialogOpen(false);
      setDeleteItemId(null);
    }
  };

  const getStatusBadge = (status: ProductionStatus) => {
    const styles = {
      Created: 'bg-[#FEF2F2] text-[#991B1B]',
      Approve: 'bg-[#ECFDF3] text-[#027A48]',
      Waiting_Approval: 'bg-[#EFF8FF] text-[#175CD3]',
      Started: 'bg-[#EFEE21] text-[#661BF1]',
      Ended: 'bg-[#F4F3FF] text-[#5925DC]',
    };

    return (
      <Badge className={styles[status]} variant="secondary">
        {status.replace("_", " ").replace("0", "/")}
      </Badge>
    );
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow className='bg-[#FAFAFA]'>
              <TableHead className='pl-6'>No.</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created By</TableHead>
              <TableHead>Approved</TableHead>
              <TableHead>Approved By</TableHead>
              <TableHead className="w-12">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length !== 0 && data.map((item, index) => (
              <TableRow
                key={item.id}
              >
                <TableCell className="font-medium pl-6">{index + (currentPage - 1) * itemsPerPage + 1}</TableCell>
                <TableCell className='text-[#535862]'>{formatDate(item.date)}</TableCell>
                <TableCell className='text-[#535862]'>{item.name}</TableCell>
                <TableCell className='text-[#535862]'>{item.project}</TableCell>
                <TableCell className='text-[#535862]'>{formatDate(item.productionStartDate)}</TableCell>
                <TableCell className='text-[#535862]'>{formatDate(item.productionEndDate)}</TableCell>
                <TableCell className='text-[#535862]'>{getStatusBadge(item.status)}</TableCell>
                <TableCell className='text-[#535862]'>{item.createdBy}</TableCell>
                <TableCell className='text-[#535862]'>{item.approved ? "Yes" : "No"}</TableCell>
                <TableCell className='text-[#535862]'>{item.approvedBy}</TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="p-2 hover:bg-gray-100 rounded-full">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className='w-24 cursor-pointer' sideOffset={2}>
                      <ul className="space-y-2">
                        <li onClick={() => onClickView(item)}>View</li>
                        <li onClick={() => alert("hi")}>Edit</li>
                        <li onClick={() => handleDelete(item.id)}>Delete</li>
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
    </div>
  );
}