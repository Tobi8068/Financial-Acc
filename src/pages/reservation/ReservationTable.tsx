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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getUserAvatarPath } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useReservationData } from '@/hooks/useReservationData';
import { Pagination } from '@/components/pagination/Pagination';
import { Badge } from '@/components/ui/badge';
import { SortOption } from '@/types/utils';
import { ReservationStatus, ReservationFilters } from '@/types/reservation';
import DeleteDialog from '@/components/table/DeleteDialog';
import { formatDate } from '@/lib/date';
import useNotification from '@/hooks/useNotifications';

interface ReservationTableProps {
  filters: ReservationFilters;
  sortOption: SortOption;
  searchQuery: string;
  onClickView: (item: any) => void;
}

export function ReservationTable({ filters, searchQuery, onClickView }: ReservationTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  const { showNotification } = useNotification();

  const { data, totalPages, totalItems, itemsPerPage, refreshData } = useReservationData(
    currentPage,
    filters,
    searchQuery
  );

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
    if (deleteItemId) {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/reservations/${deleteItemId}`, {
        method: 'DELETE',
      })

      if (response.status === 204) {
        showNotification('Reservation deleted successfully', 'success');
        refreshData();
      } else {
        showNotification('Failed to delete reservation', 'error');
      }

      setDeleteDialogOpen(false);
      setDeleteItemId(null);
    }
  };

  const getStatusBadge = (status: ReservationStatus) => {
    const styles = {
      Created: 'bg-red-100 text-red-800',
      Approved: 'bg-green-100 text-green-800',
      Completed: 'bg-[#FEF6ED] text-[#C4320A]',
      Cancelled: 'bg-gray-100 text-green-800',
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
              <TableHead>Created Date</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Store keeper</TableHead>
              <TableHead>Reservation Date</TableHead>
              <TableHead>Reserved By</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((item) => (
              <TableRow
                key={item.id}
              >
                <TableCell className="font-medium pl-6">{item.id}</TableCell>
                <TableCell className='text-[#535862]'>{formatDate(item.created_date)}</TableCell>
                <TableCell className='text-[#535862]'>{item.reason}</TableCell>
                <TableCell className='text-[#535862]'>{item.project}</TableCell>
                <TableCell className='text-[#535862]'>
                  <div className='flex items-center gap-2'>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={getUserAvatarPath(item.storeKeeper.avatar)} alt={item.storeKeeper.name} />
                      <AvatarFallback>
                        <span>{item.storeKeeper.name}</span>
                      </AvatarFallback>
                    </Avatar>
                    <span>{item.storeKeeper.name}</span>
                  </div>
                </TableCell>
                <TableCell className='text-[#535862]'>{formatDate(item.reservation_date)}</TableCell>
                <TableCell className='text-[#535862] flex items-center gap-1'>
                  <div className='flex items-center gap-2'>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={getUserAvatarPath(item.reservedBy.avatar)} alt={item.reservedBy.name} />
                      <AvatarFallback>
                        <span>{item.reservedBy.name}</span>
                      </AvatarFallback>
                    </Avatar>
                    <span>{item.reservedBy.name}</span>
                  </div>
                </TableCell>
                <TableCell className='text-[#535862]'>{getStatusBadge(item.status)}</TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="p-2 bg-white hover:bg-gray-100 shadow-lg rounded-full">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className='w-24 cursor-pointer' sideOffset={2}>
                      <ul className="space-y-2">
                        <li onClick={() => onClickView(item)}>View</li>
                        <li>Edit</li>
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