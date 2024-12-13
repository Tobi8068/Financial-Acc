import { Input } from '@/components/ui/input';

interface ClientProps {
    onSearchChange: (search: string) => void;
}

export function ClientHeader(
    {
        onSearchChange,
    }: ClientProps
) {
    return (
        <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-gray-900">Clients</h2>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex-1">
                    <Input
                        type="search"
                        placeholder="Search clients..."
                        className="h-9"
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}