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
import { useTransfertData } from '@/hooks/useTransfertData';
import { TransfertStatus, TransfertFilters } from '@/types/transferts';
import { SortOption } from '@/types/utils';
import { formatDate } from '@/lib/date';
import { Pagination } from '@/components/pagination/Pagination';
import DeleteDialog from '@/components/table/DeleteDialog';
import useNotification from '@/hooks/useNotifications';

import AvatarImg from '@/assets/img/avatar.png';

interface TransfertTableProps {
  filters: TransfertFilters;
  sortOption: SortOption;
  searchQuery: string;
  onClickView: (item: any) => void;
}

export function TransfertTable({ filters, searchQuery, onClickView }: TransfertTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);

  const { data, totalPages, totalItems, itemsPerPage, refreshData } = useTransfertData(
    currentPage,
    filters,
    searchQuery
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

  const handleConfirmDelete = () => {
    if (deleteItemId) {
      console.log('Deleting item with id:', deleteItemId);
      setDeleteDialogOpen(false);
      setDeleteItemId(null);
    }
  };

  const getStatusBadge = (status: TransfertStatus) => {
    const styles = {
      Approve: 'bg-{[#ECFDF3]} text-green-800',
      Transfered: 'bg-[#FEF6ED] text-[#C4320A]',
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
              <TableHead>Transfert Number</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Created By</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Bin</TableHead>
              <TableHead>Reservation Date</TableHead>
              <TableHead>Reserved By</TableHead>
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
                <TableCell className="font-medium ">{item.trans_num}</TableCell>
                <TableCell className="font-medium">{item.reason}</TableCell>
                <TableCell className='text-[#535862] flex items-center gap-1'>
                  <div>
                    <img src={AvatarImg} className='rounded-[100%]'></img>
                  </div>
                  <div className='flex flex-col'>
                    <span>{item.createdBy.name}</span>
                  </div>
                </TableCell>
                <TableCell className='text-[#535862]'>{getStatusBadge(item.status)}</TableCell>
                <TableCell className="font-medium">{item.bin}</TableCell>
                <TableCell className='text-[#535862]'>{formatDate(item.reservationDate)}</TableCell>

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