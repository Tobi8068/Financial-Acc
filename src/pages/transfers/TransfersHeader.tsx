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
import { Plus, Filter } from 'lucide-react';
import { TransfersFilters, TransfersStatus } from '@/types/transfers';
import { SortOption } from '@/types/utils';

interface TransfersProps {
  onFiltersChange: (filters: TransfersFilters) => void;
  onSortChange: (sort: SortOption) => void;
  onSearchChange: (search: string) => void;
  onCreate: () => void;
}

export function TransfersHeader({ 
  onFiltersChange, 
  onSortChange, 
  onSearchChange,
  onCreate,
}: TransfersProps) {
  const [filters, setFilters] = useState<TransfersFilters>({
    status: 'all'
  });

  const handleStatusChange = (status: string) => {
    const newFilters = { ...filters, status: status as TransfersFilters['status'] };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };
 
  return (
    <div className="space-y-4 mb-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Transfers</h2>
        <Button className="gap-2" onClick={() => { onCreate() }}>
          {/* <Plus className="h-4 w-4" /> */}
          Add Transfer
        </Button>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search"
            className="h-9"
            // prefix={<Search className="h-4 w-4 text-gray-500" />}/
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
            <SelectItem value="Need_Approval">Need Approval</SelectItem>
            <SelectItem value="Approved">Approved</SelectItem>
            <SelectItem value="Waiting_Payment">Waiting Payment</SelectItem>
            <SelectItem value="Paid">Paid</SelectItem>
            <SelectItem value="Close0Complete">Close/Complete</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}