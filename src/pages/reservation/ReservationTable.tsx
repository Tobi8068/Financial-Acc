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
import { useReservationData } from '@/hooks/useReservationData';
import { Pagination } from '../../components/pagination/Pagination';
import DeleteDialog from '@/components/table/DeleteDialog';
import AvatarImg from '../../assets/img/Avatar.png';

interface ReservationTableProps {
  searchQuery: string;
  onClickView: (item: any) => void;
}

export function ReservationTable({ searchQuery, onClickView }: ReservationTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);

  const { data, totalPages, totalItems, itemsPerPage } = useReservationData(
    currentPage,
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

  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow className='bg-[#FAFAFA]'>
              <TableHead className='pl-6'>Issue No.</TableHead>
              <TableHead>Date Created</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Reservation Date</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Storekeeper</TableHead>
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
                <TableCell className='text-[#535862]'>{item.dateCreated}</TableCell>
                <TableCell className='text-[#535862]'>{item.items}</TableCell>
                <TableCell className='text-[#535862]'>{item.reservationDate}</TableCell>
                <TableCell className='text-[#535862]'>{item.reason}</TableCell>
                <TableCell className='text-[#535862]'>{item.project}</TableCell>
                <TableCell className='text-[#535862] flex items-center gap-1'>
                  <div>
                    <img src={AvatarImg} className='rounded-[100%]'></img>
                  </div>
                  <div className='flex flex-col'>
                    <span>{item.createdBy.name}</span>
                  </div>
                </TableCell>
                <TableCell className='text-[#535862]'>{item.reason}</TableCell>
                <TableCell className='text-[#535862]'>{item.status}</TableCell>
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