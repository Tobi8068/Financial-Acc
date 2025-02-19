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
import { useReceptionsData } from '@/hooks/useReceptionsData';
import { Pagination } from '@/components/pagination/Pagination';
import DeleteDialog from '@/components/table/DeleteDialog';

interface ReceptionsTableProps {
  searchQuery: string;
  onClickView: (item: any) => void;
}

export function ReceptionsTable({ searchQuery, onClickView }: ReceptionsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);

  const { data, totalPages, totalItems, itemsPerPage } = useReceptionsData(
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
              <TableHead className='pl-6'>No.</TableHead>
              <TableHead>Reception ID</TableHead>
              <TableHead>Storekeeper</TableHead>
              <TableHead>Purchase Order</TableHead>
              <TableHead className="w-12">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.length !== 0 && data.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium pl-6">{index + 1}</TableCell>
                <TableCell className='text-[#535862]'>{item.po_number}</TableCell>
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
                <TableCell className='text-[#535862]'>{item.purchaseOrder}</TableCell>
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
            ))
            }
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