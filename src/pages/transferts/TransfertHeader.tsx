import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Filter } from 'lucide-react';
import { TransfertFilters } from '@/types/transferts';
import { SortOption } from '@/types/utils';

interface TransfertProps {
  onFiltersChange: (filters: TransfertFilters) => void;
  onSortChange: (sort: SortOption) => void;
  onSearchChange: (search: string) => void;
  onCreate: () => void;
}

export function TransfertHeader({
  onFiltersChange,
  onSearchChange,
  onCreate,
}: TransfertProps) {
  const [filters, setFilters] = useState<TransfertFilters>({
    status: 'all'
  });

  const handleStatusChange = (status: string) => {
    const newFilters = { ...filters, status: status as TransfertFilters['status'] };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  return (
    <div className="space-y-4 mb-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Transfert</h2>
        <Button className="gap-2" onClick={() => { onCreate() }}>
          <Plus className="h-4 w-4" />
          Create Transfer
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
            <SelectItem value="Approved">Approved</SelectItem>
            <SelectItem value="Transfered">Transfered</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}