import { useState } from 'react';
import { MoreVertical } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useClientData } from '@/hooks/useClientData';
import { formatDate } from '@/lib/date';
import { Pagination } from '../../components/pagination/Pagination';

interface ClientTableProps {
    searchQuery: string;
}

export function ClientTable({ searchQuery }: ClientTableProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const { data, totalPages, totalItems, itemsPerPage } = useClientData(
        currentPage,
        searchQuery
    );

    return (
        <div className="space-y-4">
            <div className="rounded-lg border bg-white">
                <Table>
                    <TableHeader>
                        <TableRow className='bg-[#FAFAFA]'>
                            <TableHead className='pl-6'>ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Date Created</TableHead>
                            <TableHead>Address</TableHead>
                            <TableHead>Billing Address</TableHead>
                            <TableHead>Shipping Address</TableHead>
                            <TableHead className="w-12">Action</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {data.map((item) => (
                            <TableRow
                                key={item.id}
                                className={selectedItems.includes(item.id) ? 'bg-gray-50' : ''}
                            >
                                <TableCell className="font-medium pl-6">{item.id}</TableCell>
                                <TableCell className='text-[#535862]'>
                                    <div className='flex items-center gap-1'>
                                        <div>
                                            <img src={item.client.avatar} className='rounded-[100%]'></img>
                                        </div>
                                        <div className='flex flex-col'>
                                            <span>{item.client.name}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className='text-[#535862]'>{formatDate(item.dateCreated)}</TableCell>
                                <TableCell className='text-[#535862]'>{item.address}</TableCell>
                                <TableCell className='text-[#535862]'>{item.billingAddress}</TableCell>
                                <TableCell className='text-[#535862]'>{item.shippingAddress}</TableCell>
                                <TableCell>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button className="p-2 hover:bg-gray-100 rounded-full">
                                                <MoreVertical className="h-4 w-4" />
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent align="end" className='w-fit cursor-pointer' sideOffset={1}>
                                            <span>View Contact Details</span>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                itemsPerPage={itemsPerPage}
                totalItems={totalItems}
            />
        </div>
    )
}