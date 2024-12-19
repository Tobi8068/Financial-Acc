import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Filter } from 'lucide-react';
import { ProductionFilters } from '@/types/production';
import { SortOption } from '@/types/utils';

interface ProductionProps {
  onFiltersChange: (filters: ProductionFilters) => void;
  onSortChange: (sort: SortOption) => void;
  onSearchChange: (search: string) => void;
  onCreate: () => void;
}

export function ProductionHeader({
  onFiltersChange,
  onSearchChange,
  onCreate,
}: ProductionProps) {
  const [filters, setFilters] = useState<ProductionFilters>({
    status: 'all'
  });

  const handleStatusChange = (status: string) => {
    const newFilters = { ...filters, status: status as ProductionFilters['status'] };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  return (
    <div className="space-y-4 mb-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Production</h2>
        <Button className="gap-2" onClick={() => { onCreate() }}>
          New Production
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search"
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
            <SelectItem value="waiting_approval">Waiting Approval</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="ended">Ended</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}