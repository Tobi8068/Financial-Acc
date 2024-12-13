import { useState } from 'react';
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
import { usePurchaseOrderData } from '@/hooks/usePurchaseOrderData';
import { PurchaseOrderStatus, PurchaseOrderFilters } from '@/types/purchaseOrder';
import { SortOption } from '@/types/utils';
import { formatDate } from '@/lib/date';
import { Pagination } from '../../components/pagination/Pagination';
import AvatarImg from '../../assets/img/Avatar.png';

interface PurchaseOrderTableProps {
  // filters: PurchaseOrderFilters;
  // sortOption: SortOption;
  searchQuery: string;
  onClickView: (item: any) => void;
}

export function PurchaseOrderTable({ searchQuery, onClickView }: PurchaseOrderTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, totalPages, totalItems, itemsPerPage } = usePurchaseOrderData(
    currentPage,
    searchQuery
  );

  const getStatusBadge = (status: PurchaseOrderStatus) => {
    const styles = {
      Created: 'bg-[#F5F5F5] text-[#414651]',
      Approved: 'bg-[#ECFDF3] text-[#027A48]',
      Sent: 'bg-[#EFF8FF] text-[#175CD3]',
      Partially_Received: 'bg-[#F4F3FF] text-[#5925DC]',
      Completed: 'bg-[#ECFDF3] text-[#027A48]',
      Cancelled: 'bg-[#FEF3F2] text-[#B42318]',
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
              <TableHead>Date Created</TableHead>
              <TableHead>Ship To</TableHead>
              <TableHead>Bill To</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created By</TableHead>
              <TableHead>Approved</TableHead>
              <TableHead>Approved By</TableHead>
              <TableHead className="w-12">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((item) => (
              <TableRow
                key={item.id}
              >
                <TableCell className="font-medium pl-6">{item.id}</TableCell>
                <TableCell className='text-[#535862]'>{formatDate(item.dateCreated)}</TableCell>
                <TableCell className='text-[#535862]'>{item.shipTo}</TableCell>
                <TableCell className='text-[#535862]'>{item.billTo}</TableCell>
                <TableCell className='text-[#535862]'>{item.department}</TableCell>
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
                    <PopoverContent align="end" className='w-24 cursor-pointer' sideOffset={2} onClick={() => onClickView(item)}>
                      <span>View</span>
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
    </div>
  );
}