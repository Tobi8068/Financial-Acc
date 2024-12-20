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
import { useSalesData } from '@/hooks/useSalesData';
import { SalesFilters } from '@/types/sales';
import { SortOption } from '@/types/utils';
import { formatDate } from '@/lib/date';
import { Pagination } from '../../components/pagination/Pagination';
import { getStatusBadge } from './SalesBadge';
import AvatarImg from '../../assets/img/avatar.png';

interface SalesTableProps {
  filters: SalesFilters;
  sortOption: SortOption;
  searchQuery: string;
  onClickView: (item: any) => void;
}

export function SalesTable({ filters, sortOption, searchQuery, onClickView }: SalesTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, totalPages, totalItems, itemsPerPage } = useSalesData(
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
            {data.length !== 0 && data.map((item) => (
              <TableRow
                key={item.id}
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
                <TableCell className='text-[#535862]'>${item.totalTaxAmount}</TableCell>
                <TableCell className='text-[#535862]'>${item.totalNetAmount}</TableCell>
                <TableCell className='text-[#535862]'>${item.totalAmount}</TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="p-2 hover:bg-gray-100 rounded-full">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className='w-fit cursor-pointer' sideOffset={1}>
                      <span onClick={() => onClickView(item)}>View Sales Item</span>
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