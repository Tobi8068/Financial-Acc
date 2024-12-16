import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Filter } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PurchaseOrderFilters } from '@/types/purchaseOrder';

interface InvoiceProps {
  onFiltersChange: (filters: PurchaseOrderFilters) => void;
  onSearchChange: (search: string) => void;
}

export function PurchaseOrderHeader({
  onFiltersChange,
  onSearchChange,
}: InvoiceProps) {
  const [filters, setFilters] = useState<PurchaseOrderFilters>({
    status: 'all'
  });

  const handleStatusChange = (status: string) => {
    const newFilters = { ...filters, status: status as PurchaseOrderFilters['status'] };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };


  return (
    <div className="space-y-4 mb-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Purchase Order</h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search ..."
            className="h-9"
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <Select
          defaultValue="all"
          onValueChange={handleStatusChange}
        >
          <SelectTrigger className="w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="created">Created</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="sent">Sent</SelectItem>
            <SelectItem value="partially_received">Partially Received</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}