import { useState, useEffect } from 'react';
import { MoreVertical, UserX } from 'lucide-react';
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
import { getUserAvatarPath } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useRequisitionsData } from '@/hooks/useRequisitionsData';
import { RequisitionsStatus, RequisitionsFilters } from '@/types/requisitions';
import { formatDate } from '@/lib/date';
import { Pagination } from '@/components/pagination/Pagination';
import DeleteDialog from '@/components/table/DeleteDialog';

interface RequisitionsTableProps {
  filters: RequisitionsFilters;
  searchQuery: string;
  onClickView: (item: any) => void;
}

export function RequisitionsTable({ filters, searchQuery, onClickView }: RequisitionsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);

  const { data, totalPages, totalItems, itemsPerPage, refreshData } = useRequisitionsData(
    currentPage,
    filters,
    searchQuery
  );

  useEffect(() => {
    if (totalPages < currentPage) {
      setCurrentPage(1);
    }
  }, [totalPages])

  const getStatusBadge = (status: RequisitionsStatus) => {
    const styles = {
      Completed: 'bg-[#ECFDF3] text-[#027A48]',
      Created: 'bg-[#EFF8FF] text-[#175CD3]',
      Approved: 'bg-[#ECFDF3] text-[#027A48]',
      Rejected: 'bg-[#F4F3FF] text-[#FF9900]',
      In_Progress: 'bg-[#F4F3FF] text-[#5925DC]',
      Cancel: 'bg-[#FEF3F2] text-[#B42318]',
    };

    return (
      <Badge className={styles[status]} variant="secondary">
        {status.replace("_", " ").replace("0", "/")}
      </Badge>
    );
  };

  const handleDelete = (id: string) => {
    setDeleteDialogOpen(true);
    setDeleteItemId(id);
  };

  const handleConfirmDelete = async () => {
    console.log('Delete Ready', deleteItemId);
    if (deleteItemId) {
      console.log('Deleting item with id:', deleteItemId);
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/requisitions/${deleteItemId}`, {
        method: 'DELETE',
      })
      console.log(response.status);
      if (response.status === 204) {
        refreshData();
      }
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
              <TableHead>Date Created</TableHead>
              <TableHead>Ship To</TableHead>
              <TableHead>Bill To</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Total NetAmount</TableHead>
              <TableHead>Total TaxAmount</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created By</TableHead>
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
                <TableCell className='text-[#535862]'>{formatDate(item.dateCreated)}</TableCell>
                <TableCell className='text-[#535862]'>{item.shipTo}</TableCell>
                <TableCell className='text-[#535862]'>{item.billTo}</TableCell>
                <TableCell className='text-[#535862]'>{item.department}</TableCell>
                <TableCell className='text-[#535862]'>$ {item.totalNetAmount}</TableCell>
                <TableCell className='text-[#3e4450]'>$ {item.totalTaxAmount}</TableCell>
                <TableCell className='text-[#535862]'>$ {item.totalAmount}</TableCell>
                <TableCell className='text-[#535862]'>{getStatusBadge(item.status)}</TableCell>
                <TableCell className='text-[#535862] border flex items-center gap-2'>
                  <div className='flex items-center gap-2'>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={getUserAvatarPath(item.createdBy.avatar)} alt={item.createdBy.name} />
                      <AvatarFallback>
                        <span>{item.createdBy.name}</span>
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <span>{item.createdBy.name}</span>
                </TableCell>

                <TableCell className='text-[#535862] flex items-center gap-2'>
                  <div className='flex items-center gap-2'>
                    {item.approvedBy.name === '' ? (
                      <>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={getUserAvatarPath(item.approvedBy.avatar)} alt={item.approvedBy.name} />
                          <AvatarFallback>
                            <span>{item.approvedBy.name}</span>
                          </AvatarFallback>
                        </Avatar>
                        <span>{item.approvedBy.name}</span>
                      </>
                    ) : (
                      <>
                        <UserX className="h-8 w-8" />
                        <span>Not approved</span>
                      </>
                    )}
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
                        <li onClick={() => alert("haha")}>Edit</li>
                        <li onClick={() => handleDelete(item.pid)}>Delete</li>
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
    </div >
  );
}