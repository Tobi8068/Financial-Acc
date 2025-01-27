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
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { usePurchaseOrderData } from '@/hooks/usePurchaseOrderData';
import { PurchaseOrderStatus, PurchaseOrderFilters } from '@/types/purchaseOrder';
import { formatDate } from '@/lib/date';
import { getUserAvatarPath } from '@/lib/utils';
import { Pagination } from '@/components/pagination/Pagination';
import DeleteDialog from '@/components/table/DeleteDialog';
import useNotification from '@/hooks/useNotifications';

interface PurchaseOrderTableProps {
  filters: PurchaseOrderFilters;
  searchQuery: string;
  onClickView: (item: any) => void;
}

export function PurchaseOrderTable({ filters, searchQuery, onClickView }: PurchaseOrderTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  const { data, totalPages, totalItems, itemsPerPage, refreshData } = usePurchaseOrderData(
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
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/purchase-orders/${deleteItemId}`, {
        method: 'DELETE',
      })
      if (response.status === 204) {
        showNotification('PO deleted successfully', 'success');
        refreshData();
      } else {
        showNotification('Failed to delete PO', 'error',);
      }
      setDeleteDialogOpen(false);
      setDeleteItemId(null);
    }
  };

  const getStatusBadge = (status: PurchaseOrderStatus) => {
    const styles = {
      Created: 'bg-[#F5F5F5] text-[#414651]',
      Approved: 'bg-[#ECFDF3] text-[#027A48]',
      Sent: 'bg-[#EFF8FF] text-[#175CD3]',
      Partially_Received: 'bg-[#F4F3FF] text-[#5925DC]',
      Completed: 'bg-[#ECFDF3] text-[#027A48]',
      Cancelled: 'bg-[#FE00F2] text-[#B42318]',
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
              <TableHead>Ship To</TableHead>
              <TableHead>Bill To</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total NetAmount</TableHead>
              <TableHead>Total TaxAmount</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Created By</TableHead>
              <TableHead>Approved By</TableHead>
              <TableHead>Approved</TableHead>
              <TableHead>Sent</TableHead>
              <TableHead className="w-12">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.length !== 0 && data.map((item, index) => (
              <TableRow
                key={item.id}
              >
                <TableCell className="font-medium pl-6">{index + (currentPage - 1) * itemsPerPage + 1}</TableCell>
                <TableCell className='text-[#535862]'>{formatDate(item.created_date)}</TableCell>
                <TableCell className='text-[#535862]'>{item.shipTo}</TableCell>
                <TableCell className='text-[#535862]'>{item.billTo}</TableCell>
                <TableCell className='text-[#535862]'>{item.department}</TableCell>
                <TableCell className='text-[#535862]'>{getStatusBadge(item.status)}</TableCell>
                <TableCell className='text-[#535862]'>$ {item.totalNetAmount}</TableCell>
                <TableCell className='text-[#3e4450]'>$ {item.totalTaxAmount}</TableCell>
                <TableCell className='text-[#535862]'>$ {item.totalAmount}</TableCell>
                <TableCell className='text-[#535862]'>
                  <div className='flex items-center gap-2'>
                    <Avatar className="h-8 w-8">
                      <img src={getUserAvatarPath(item.createdBy.avatar)} alt="d" />
                      {/* <AvatarImage src={getUserAvatarPath(item.createdBy.avatar)} alt={item.createdBy.name} /> */}
                      <AvatarFallback>
                        <span>{item.createdBy.name}</span>
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <span>{item.createdBy.name}</span>
                </TableCell>
                <TableCell className='text-[#535862]'>
                  <div className='flex items-center gap-2'>
                    {item.approvedBy.name.length !== 2 ? (
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
                        <UserX className="h-8 w-8 text-red-400 rounded-full" />
                        <span>None</span>
                      </>
                    )}
                  </div>
                </TableCell>
                <TableCell className='text-[#535862]'>{item.approved ? "Yes" : "No"}</TableCell>
                <TableCell className='text-[#535862]'>{item.sent ? "Yes" : "No"}</TableCell>
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