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
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useSalesData } from '@/hooks/useSalesData';
import { SalesFilters } from '@/types/sales';
import { SortOption } from '@/types/utils';
import { formatDate } from '@/lib/date';
import { Pagination } from '../../components/pagination/Pagination';
import { getStatusBadge } from './SalesBadge';
import AvatarImg from '../../assets/img/Avatar.png';

interface SalesTableProps {
  filters: SalesFilters;
  sortOption: SortOption;
  searchQuery: string;
}

export function SalesTable({ filters, sortOption, searchQuery }: SalesTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const { data, totalPages, totalItems, itemsPerPage } = useSalesData(
    currentPage,
    filters,
    sortOption,
    searchQuery
  );

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
              <TableHead>Date Created</TableHead>
              <TableHead>Ship To</TableHead>
              <TableHead>Bill To</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Approved By</TableHead>
              <TableHead>Created By</TableHead>
              <TableHead>Client Approval</TableHead>
              <TableHead>Total Tax Amount</TableHead>
              <TableHead>Total Net Amount</TableHead>
              <TableHead>Total Amount</TableHead>
              {/* <TableHead>Turn of PDF</TableHead>
              <TableHead>Approval</TableHead>
              <TableHead>Sales Num</TableHead> */}
              <TableHead className="w-12">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((item) => (
              <TableRow
                key={item.id}
                className={selectedItems.includes(item.id) ? 'bg-gray-50' : ''}
              >
                {/* <TableCell>
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={(checked) => handleSelectItem(item.id, checked as boolean)}
                  />
                </TableCell> */}
                <TableCell className="font-medium pl-6">{item.id}</TableCell>
                <TableCell className='text-[#535862]'>{formatDate(item.dateCreated)}</TableCell>
                <TableCell className='text-[#535862]'>{item.shipTo}</TableCell>
                <TableCell className='text-[#535862]'>{item.billTo}</TableCell>
                <TableCell className='text-[#535862]'>{getStatusBadge(item.status)}</TableCell>
                <TableCell className='text-[#535862]'>
                  <div className='flex items-center gap-1'>
                    <div>
                      <img src={AvatarImg} className='rounded-[100%]'></img>
                    </div>
                    <div className='flex flex-col'>
                      <span>{item.approvedBy.name}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className='text-[#535862]'>
                  <div className='flex items-center gap-1'>
                    <div>
                      <img src={AvatarImg} className='rounded-[100%]'></img>
                    </div>
                    <div className='flex flex-col'>
                      <span>{item.createdBy.name}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className='text-[#535862]'>{getStatusBadge(item.clientApproval)}</TableCell>
                <TableCell className='text-[#535862]'>${item.totalTaxAmount.toFixed(2)}</TableCell>
                <TableCell className='text-[#535862]'>${item.totalNetAmount.toFixed(2)}</TableCell>
                <TableCell className='text-[#535862]'>${item.totalAmount.toFixed(2)}</TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="p-2 hover:bg-gray-100 rounded-full">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className='w-24' sideOffset={2}>
                      <ul className="space-y-2">
                        <li>View</li>
                        <li>Edit</li>
                        <li>Delete</li>
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
    </div>
  );
}