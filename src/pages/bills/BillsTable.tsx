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
import { useBillsData } from '@/hooks/useBillsData';
import { BillsFilters, BillsStatus } from '@/types/bills';
import { SortOption } from '@/types/utils';
import { formatDate } from '@/lib/date';
import { Pagination } from '@/components/pagination/Pagination';
import { Badge } from '@/components/ui/badge';

interface BillsTableProps {
  filters: BillsFilters;
  sortOption: SortOption;
  searchQuery: string;
  onClickView: (item: any) => void;
}

export function BillsTable({ filters, sortOption, searchQuery, onClickView }: BillsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, totalPages, totalItems, itemsPerPage } = useBillsData(
    currentPage,
    filters,
    sortOption,
    searchQuery
  );

  const getStatusBadge = (status: BillsStatus) => {
    const styles = {
      Need_Approval: 'bg-red-100 text-red-800',
      Approved: 'bg-green-100 text-green-800',
      Sent: 'bg-[#FE35ED] text-[#C7820A]',
      Paid: 'bg-[#FE97ED] text-[#C1220A]',
      Complete: 'bg-[#FE93RD] text-[#C5520A]',
      On_Hold: 'bg-[#FEF6ED] text-[#C4320A]',
    };

    return (
      <Badge className={styles[status]} variant="secondary">
        {status.replace("_", " ").replace("0", "/")}
      </Badge>
    );
  };

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
              <TableHead className='pl-6'>Bill No.</TableHead>
              <TableHead>Date Created</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Required Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Terms</TableHead>
              <TableHead>Ship To</TableHead>
              <TableHead>Bill To</TableHead>
              <TableHead>Total Tax Amount</TableHead>
              <TableHead>Total Net Amount</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead className="w-12">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length !== 0 && data.map((item) => (
              <TableRow
                key={item.id}
              >
                <TableCell className="font-medium pl-6">{item.id}</TableCell>
                <TableCell className='text-[#535862]'>{formatDate(item.dateCreated)}</TableCell>
                <TableCell className='text-[#535862]'>{item.supplier}</TableCell>
                <TableCell className='text-[#535862]'>{formatDate(item.requiredDate)}</TableCell>
                <TableCell className='text-[#535862]'>{getStatusBadge(item.status)}</TableCell>
                <TableCell className='text-[#535862]'>{item.terms}</TableCell>
                <TableCell className='text-[#535862]'>{item.shipTo}</TableCell>
                <TableCell className='text-[#535862]'>{item.billTo}</TableCell>
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
    </div>
  );
}