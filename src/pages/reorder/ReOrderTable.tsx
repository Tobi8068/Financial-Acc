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
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useReOrderData } from '@/hooks/useReOrderData';
import { ReOrderStatus, ReOrderFilters } from '@/types/reOrder';
import { SortOption } from '@/types/utils';
import { formatDate } from '@/lib/date';
import { Pagination } from '../../components/pagination/Pagination';
import AvatarImg from '../../assets/img/Avatar.png';

import DeleteDialog from '@/components/table/DeleteDialog';

interface ReOrderTableProps {
  filters: ReOrderFilters;
  sortOption: SortOption;
  searchQuery: string;
  onClickView: (item: any) => void;
}

export function ReOrderTable({ filters, sortOption, searchQuery, onClickView }: ReOrderTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  const { data, totalPages, totalItems, itemsPerPage } = useReOrderData(
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

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(data.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter(item => item !== id));
    }
  };

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

  const getStatusBadge = (status: ReOrderStatus) => {
    const styles = {
      Created: 'bg-[#F5F5F5] text-[#414651]',
      Approved: 'bg-[#ECFDF3] text-[#027A48]',
      Waiting_Approval: 'bg-[#EFF8FF] text-[#175CD3]',
      Ended: 'bg-[#F4F3FF] text-[#5925DC]',
      Cancelled: 'bg-[#FEF3F2] text-[#9A3412]',
      Partially_Approved: 'bg-[#FFFBEB] text-[#B45309]',
      Partially_Received: 'bg-[#FFFBEB] text-[#B45335]',
      Completed: 'bg-[#FFF35B] text-[#B45335]',
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
              <TableHead>Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>No. of Items</TableHead>
              <TableHead>No. of Requisitions</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Order Unit</TableHead>
              <TableHead>Preferred Supplier</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Item Code</TableHead>
              <TableHead>Manufacturer Name</TableHead>
              <TableHead>Manufacturer Code</TableHead>
              <TableHead className="w-12">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((item) => (
              <TableRow
                key={item.id}
                className={selectedItems.includes(item.id) ? 'bg-gray-50' : ''}
              >
                <TableCell className="font-medium pl-6">{item.id}</TableCell>
                <TableCell className='text-[#535862]'>{item.name}</TableCell>
                <TableCell className='text-[#535862]'>{formatDate(item.date)}</TableCell>
                <TableCell className='text-[#535862]'>{item.numberOfItem}</TableCell>
                <TableCell className='text-[#535862]'>{item.numberOfRequisition}</TableCell>
                <TableCell className='text-[#535862]'>{item.description}</TableCell>
                <TableCell className='text-[#535862]'>{item.orderUnit}</TableCell>
                <TableCell className='text-[#535862]'>{item.preferredSupplier}</TableCell>
                <TableCell className='text-[#535862]'>{item.price}</TableCell>
                <TableCell className='text-[#535862]'>{item.itemCode}</TableCell>
                <TableCell className='text-[#535862]'>{item.manufacturerName}</TableCell>
                <TableCell className='text-[#535862]'>{item.manufacturerCode}</TableCell>
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