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
// import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useProductionData } from '@/hooks/useProductionData';
import { ProductionStatus, ProductionFilters } from '@/types/production';
import { SortOption } from '@/types/utils';
import { formatDate } from '@/lib/date';
import { Pagination } from '../../components/pagination/Pagination';

import DeleteDialog from '@/components/table/DeleteDialog';

interface ProductionTableProps {
  filters: ProductionFilters;
  sortOption: SortOption;
  searchQuery: string;
  onClickView: (item: any) => void;
}

export function ProductionTable({ filters, sortOption, searchQuery, onClickView }: ProductionTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems] = useState<string[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  const { data, totalPages, totalItems, itemsPerPage } = useProductionData(
    currentPage,
    filters,
    sortOption,
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

  const getStatusBadge = (status: ProductionStatus) => {
    const styles = {
      Created: 'bg-[#F5F5F5] text-[#414651]',
      Approved: 'bg-[#ECFDF3] text-[#027A48]',
      Waiting_Approval: 'bg-[#EFF8FF] text-[#175CD3]',
      Ended: 'bg-[#F4F3FF] text-[#5925DC]',
      Cancelled: 'bg-[#FEF3F2] text-[#9A3412]',
      Partially_Approved: 'bg-[#FFFBEB] text-[#B45309]',
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
              <TableHead className='pl-6'>No.</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Production Start Date</TableHead>
              <TableHead>Production End Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created By</TableHead>
              <TableHead>Approved</TableHead>
              <TableHead>Approved By</TableHead>
              {/* <TableHead>Total Amount</TableHead> */}
              <TableHead className="w-12">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            { data.length !== 0 ? data.map((item) => (
              <TableRow
                key={item.id}
                className={selectedItems.includes(item.id) ? 'bg-gray-50' : ''}
              >
                <TableCell className="font-medium pl-6">{item.id}</TableCell>
                <TableCell className='text-[#535862]'>{formatDate(item.date)}</TableCell>
                <TableCell className='text-[#535862]'>{item.name}</TableCell>
                <TableCell className='text-[#535862]'>{item.project}</TableCell>
                <TableCell className='text-[#535862]'>{formatDate(item.productionStartDate)}</TableCell>
                <TableCell className='text-[#535862]'>{formatDate(item.productionEndDate)}</TableCell>
                <TableCell className='text-[#535862]'>{getStatusBadge(item.status)}</TableCell>
                <TableCell className='text-[#535862]'>{item.createdBy}</TableCell>
                <TableCell className='text-[#535862]'>{item.approved ? "Yes" : "No" }</TableCell>
                <TableCell className='text-[#535862]'>{item.approvedBy}</TableCell>
                {/* <TableCell className='text-[#535862]'>${item.totalAmountBeforeTax.toFixed(2)}</TableCell>
                <TableCell className='text-[#535862]'>${item.totalTaxAmount.toFixed(2)}</TableCell> */}
                {/* <TableCell className='text-[#535862]'>${item.totalAmount.toFixed(2)}</TableCell> */}
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
            )) : ''}
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