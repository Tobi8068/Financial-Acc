import { Input } from '@/components/ui/input';
import { BillsFilters } from '@/types/bills';
import { SortOption } from '@/types/utils';

interface BillsProps {
  onFiltersChange: (filters: BillsFilters) => void;
  onSortChange: (sort: SortOption) => void;
  onSearchChange: (search: string) => void;
  onCreate: () => void;
}

export function BillsHeader({
  onSearchChange,
}: BillsProps) {

  return (
    <div className="space-y-4 mb-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Bills</h2>
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
      </div>
    </div>
  );
}