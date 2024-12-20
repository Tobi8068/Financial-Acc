import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SuppliersFilters } from '@/types/suppliers';
import { SortOption } from '@/types/utils';

interface SuppliersProps {
  onFiltersChange: (filters: SuppliersFilters) => void;
  onSortChange: (sort: SortOption) => void;
  onSearchChange: (search: string) => void;
  onCreate: () => void;
}

export function SuppliersHeader({ 
  onSearchChange,
  onCreate,
}: SuppliersProps) {
 
  return (
    <div className="space-y-4 mb-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Suppliers</h2>
        <Button className="gap-2" onClick={() => { onCreate() }}>
          Add Supplier
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
      </div>
    </div>
  );
}