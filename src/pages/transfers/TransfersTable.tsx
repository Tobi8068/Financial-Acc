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
import { useTransfersData } from '@/hooks/useTransfersData';
import { TransfersStatus, TransfersFilters } from '@/types/transfers';
import { SortOption } from '@/types/utils';
import { formatDate } from '@/lib/date';
import { Pagination } from '../../components/pagination/Pagination';
import AvatarImg from '../../assets/img/Avatar.png';

import DeleteDialog from '@/components/table/DeleteDialog';

interface TransfersTableProps {
  filters: TransfersFilters;
  sortOption: SortOption;
  searchQuery: string;
  onClickView: (item: any) => void;
}

export function TransfersTable({ filters, searchQuery, onClickView }: TransfersTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);

  const { data, totalPages, totalItems, itemsPerPage } = useTransfersData(
    currentPage,
    filters,
    // sortOption,
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

  const handleConfirmDelete = () => {
    if (deleteItemId) {
      console.log('Deleting item with id:', deleteItemId);
      setDeleteDialogOpen(false);
      setDeleteItemId(null);
    }
  };

  const getStatusBadge = (status: TransfersStatus) => {
    const styles = {
      Transfered: 'bg-red-100 text-red-800',
      Approved: 'bg-green-100 text-green-800',
      Waiting_Payment: 'bg-[#FEF6ED] text-[#C4320A]',
      Paid: 'bg-green-100 text-green-800',
      Close0Complete: 'bg-blue-100 text-[#363F72]',
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
              {/* <TableHead className="w-12">
                <Checkbox
                  checked={selectedItems.length === data.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead> */}
              <TableHead className='pl-6'>Transfer No.</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Created By</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Bin</TableHead>
              <TableHead>Reservation Date</TableHead>
              <TableHead>Reserved By</TableHead>
              {/* <TableHead>Turn of PDF</TableHead>
              <TableHead>Approval</TableHead>
              <TableHead>Sales Num</TableHead> */}
              <TableHead className="w-12">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.length !== 0 && data.map((item) => (
              <TableRow
                key={item.id}
              >
                <TableCell className="font-medium pl-6">{item.id}</TableCell>
                <TableCell className='text-[#535862]'>{formatDate(item.date)}</TableCell>
                <TableCell className="font-medium ">{item.items}</TableCell>
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
                <TableCell className='text-[#535862] flex items-center gap-1'>
                  <div>
                    <img src={AvatarImg} className='rounded-[100%]'></img>
                  </div>
                  <div className='flex flex-col'>
                    <span>{item.reservedBy.name}</span>
                  </div>
                </TableCell>
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