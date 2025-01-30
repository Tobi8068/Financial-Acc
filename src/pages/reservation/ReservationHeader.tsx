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
import { ReservationFilters } from '@/types/reservation';
import { SortOption } from '@/types/utils';
import { Filter, Plus } from 'lucide-react';

interface ReservationProps {
  onFiltersChange: (filters: ReservationFilters) => void;
  onSortChange: (sort: SortOption) => void;
  onSearchChange: (search: string) => void;
  onCreate: () => void;
}

export function ReservationHeader({
  onFiltersChange,
  onSearchChange,
  onCreate,
}: ReservationProps) {
  const [filters, setFilters] = useState<ReservationFilters>({
    status: 'all'
  });

  const handleStatusChange = (status: string) => {
    const newFilters = { ...filters, status: status as ReservationFilters['status'] };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };
  return (
    <div className="space-y-4 mb-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Reservations</h2>
        <Button className="gap-2" onClick={() => { onCreate() }}>
          <Plus className="h-4 w-4" />
          Add Reservation
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search reservation..."
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
            <SelectItem value="approve">Approved</SelectItem>
            <SelectItem value="started">Completed</SelectItem>
            <SelectItem value="ended">Cancel</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}