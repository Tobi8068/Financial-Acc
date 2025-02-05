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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useTransfertData } from '@/hooks/useTransfertData';
import { TransfertStatus, TransfertFilters } from '@/types/transferts';
import { SortOption } from '@/types/utils';
import { formatDate } from '@/lib/date';
import { getUserAvatarPath } from '@/lib/utils';
import { Pagination } from '@/components/pagination/Pagination';
import DeleteDialog from '@/components/table/DeleteDialog';
import useNotification from '@/hooks/useNotifications';

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

  const handleConfirmDelete = async () => {
    console.log('Delete Ready', deleteItemId)
    if (deleteItemId) {
      console.log('Deleting item with id:', deleteItemId);
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/transferts/${deleteItemId}`, {
        method: 'DELETE',
      });
      if (response.status === 204) {
        showNotification('Transfert deleted successfully', 'success');
        refreshData();
      } else {
        showNotification('Failed to delete Transfert', 'error',);
      }
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
              <TableHead>Transfert ID</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Bin</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created By</TableHead>
              <TableHead className="w-12">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length !== 0 && data.map((item, index) => (
              <TableRow
                key={item.id}
              >
                <TableCell className="text-[#535862] pl-6">{index + (currentPage - 1) * itemsPerPage + 1}</TableCell>
                <TableCell className="text-[#535862]">{item.trans_num}</TableCell>
                <TableCell className="text-[#535862]">{formatDate(item.date)}</TableCell>
                <TableCell className="text-[#535862]">{item.reason}</TableCell>
                <TableCell className="text-[#535862]">{item.bin}</TableCell>
                <TableCell className="text-[#535862]">{getStatusBadge(item.status)} </TableCell>
                <TableCell className="text-[#535862]">
                  <div className='flex items-center gap-2'>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={getUserAvatarPath(item.createdBy.avatar)} alt={item.createdBy.name} />
                      <AvatarFallback>
                        <span>{item.createdBy.name}</span>
                      </AvatarFallback>
                    </Avatar>
                    <span>{item.createdBy.name}</span>
                  </div>
                </TableCell>

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