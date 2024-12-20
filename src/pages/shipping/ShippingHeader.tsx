import { useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Filter } from 'lucide-react';
import { ShippingFilters } from '@/types/shipping';
import { SortOption } from '@/types/utils';
import { Button } from '@/components/ui/button';

interface ShippingHeaderProps {
  onFiltersChange: (filters: ShippingFilters) => void;
  onSortChange: (sort: SortOption) => void;
  onSearchChange: (search: string) => void;
  onCreate: () => void;
}

export function ShippingHeader({
  onFiltersChange,
  onSearchChange,
  onCreate,
}: ShippingHeaderProps) {
  const [filters, setFilters] = useState<ShippingFilters>({
    status: 'all',
    carrier: 'all'
  });

  const handleStatusChange = (status: string) => {
    const newFilters = { ...filters, status: status as ShippingFilters['status'] };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  return (
    <div className="space-y-4 mb-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Shipping</h2>
        <Button className="gap-2" onClick={() => { onCreate() }}>
          Create Shipping
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search shipments..."
            className="h-9 w-96 bg-white"
            onChange={(e) => onSearchChange(e.target.value as string)}
          />
        </div>
        <Select
          defaultValue="all"
          onValueChange={handleStatusChange}
        >
          <SelectTrigger className="w-[180px] bg-white">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}