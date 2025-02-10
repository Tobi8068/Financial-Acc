import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

interface ReceptionsProps {
  onSearchChange: (search: string) => void;
  onCreate: () => void;
}

export function ReceptionsHeader({ 
  onSearchChange,
  onCreate,
}: ReceptionsProps) {
 
  return (
    <div className="space-y-4 mb-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Receptions</h2>
        <Button className="gap-2" onClick={() => { onCreate() }}>
          <Plus className="h-4 w-4" />
          Create Reception
        </Button>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search Receptions..."
            className="h-9"
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}