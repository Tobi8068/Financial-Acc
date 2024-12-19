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
import { useReOrderData } from '@/hooks/useReOrderData';
import { ReOrderFilters } from '@/types/reOrder';
import { SortOption } from '@/types/utils';
import { formatDate } from '@/lib/date';
import { Pagination } from '../../components/pagination/Pagination';


interface ReOrderTableProps {
  filters: ReOrderFilters;
  sortOption: SortOption;
  searchQuery: string;
  onClickView: (item: any) => void;
}

export function ReOrderTable({ filters, sortOption, searchQuery, onClickView }: ReOrderTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
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

  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow className='bg-[#FAFAFA]'>
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
            {data.length !== 0 && data.map((item) => (
              <TableRow
                key={item.id}
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
    </div>
  );
}