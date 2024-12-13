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
import { SalesFilters } from '@/types/sales';
import { SortOption } from '@/types/utils';

interface InvoiceProps {
  onFiltersChange: (filters: SalesFilters) => void;
  onSortChange: (sort: SortOption) => void;
  onSearchChange: (search: string) => void;
}

export function SalesHeader({ 
  onFiltersChange, 
  onSortChange, 
  onSearchChange,
}: InvoiceProps) {
  const [filters, setFilters] = useState<SalesFilters>({
    status: 'all'
  });

  const handleStatusChange = (status: string) => {
    const newFilters = { ...filters, status: status as SalesFilters['status'] };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };
 
  return (
    <div className="space-y-4 mb-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Sales</h2>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search sales..."
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
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        
        <Select 
          defaultValue="newest"
          onValueChange={(value) => onSortChange(value as SortOption)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="amount-high">Amount: High to Low</SelectItem>
            <SelectItem value="amount-low">Amount: Low to High</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}