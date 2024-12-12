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
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useInvoiceData } from '@/hooks/useInvoiceData';
import { InvoiceStatus, InvoiceFilters } from '@/types/invoice';
import { SortOption } from '@/types/utils';
import { formatDate } from '@/lib/date';
import { Pagination } from '../../components/pagination/Pagination';
import AvatarImg from '../../assets/img/Avatar.png';

interface InvoiceTableProps {
  filters: InvoiceFilters;
  sortOption: SortOption;
  searchQuery: string;
}

export function InvoiceTable({ filters, sortOption, searchQuery }: InvoiceTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const { data, totalPages, totalItems, itemsPerPage } = useInvoiceData(
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

  const getStatusBadge = (status: InvoiceStatus) => {
    const styles = {
      Need_Approval: 'bg-red-100 text-red-800',
      Approved: 'bg-green-100 text-green-800',
      Waiting_Payment: 'bg-[#FEF6ED] text-[#C4320A]',
      Paid: 'bg-green-100 text-green-800',
      Close0Complete: 'bg-blue-100 text-[#363F72]',
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
              <TableHead className='pl-6'>Invoice No.</TableHead>
              <TableHead>Date Created</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Required Data</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ship To</TableHead>
              <TableHead>Bill To</TableHead>
              <TableHead>Total Tax Amount</TableHead>
              <TableHead>Total Net Amount</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Contact</TableHead>
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
                <TableCell className='text-[#535862] flex items-center gap-1'>
                  <div>
                    <img src={AvatarImg} className='rounded-[100%]'></img>
                  </div>
                  <div className='flex flex-col'>
                    <span>{item.client.name}</span>
                    <span>{item.client.email}</span>
                  </div>
                </TableCell>
                <TableCell className='text-[#535862]'>{formatDate(item.requiredData)}</TableCell>
                <TableCell className='text-[#535862]'>{getStatusBadge(item.status)}</TableCell>
                <TableCell className='text-[#535862]'>{item.shipTo}</TableCell>
                <TableCell className='text-[#535862]'>{item.billTo}</TableCell>
                <TableCell className='text-[#535862]'>${item.totalTaxAmount.toFixed(2)}</TableCell>
                <TableCell className='text-[#535862]'>${item.totalNetAmount.toFixed(2)}</TableCell>
                <TableCell className='text-[#535862]'>${item.totalAmount.toFixed(2)}</TableCell>
                <TableCell className='text-[#535862]'>{item.contact}</TableCell>
                {/* <TableCell>{item.turnTOpdf}</TableCell>
                <TableCell>{item.clientApproval}</TableCell>
                <TableCell>{item.salesNum}</TableCell> */}
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