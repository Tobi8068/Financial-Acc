import { Input } from '@/components/ui/input';
import { ReOrderFilters } from '@/types/reOrder';
import { SortOption } from '@/types/utils';

interface ReOrderProps {
  onFiltersChange: (filters: ReOrderFilters) => void;
  onSortChange: (sort: SortOption) => void;
  onSearchChange: (search: string) => void;
  onCreate: () => void;
}

export function ReorderHeader({ 
  onSearchChange,
}: ReOrderProps) {
 
  return (
    <div className="space-y-4 mb-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Reorder</h2>
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