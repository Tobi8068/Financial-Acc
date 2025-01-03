import { useState } from "react";
import { Download } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { TransfersData } from '@/types/transfers';
import { useTransferItemsData } from '@/hooks/useTransfersData';
import { Pagination } from '../../components/pagination/Pagination';
import { TransfersStatus } from "@/types/transfers";
import { messageData } from "@/lib/message-data";
import { Notes } from "@/components/organisms/notes";
import { Badge } from '@/components/ui/badge';

export function TransfersDetail(props: TransfersData) {
    const [currentPage, setCurrentPage] = useState(1);
    const { data, totalPages, totalItems, itemsPerPage } = useTransferItemsData(
        currentPage,
    );

    const getStatusBadge = (status: TransfersStatus) => {
        const styles = {
            Transfered: 'bg-red-100 text-red-800',
            Approved: 'bg-green-100 text-green-800',
            Cancelled: 'bg-[#FEF6ED] text-[#C4320A]',
        };

        return (
            <Badge className={styles[status]} variant="secondary">
                {status.replace("_", " ").replace("0", "/")}
            </Badge>
        );
    };


    return (
        <div className="w-full flex flex-col justify-start overflow-y-auto p-6 h-[calc(100vh-200px)]">
            <h2 className="text-xl font-semibold">Transfers Details</h2>
            <div className="flex flex-col gap-6 rounded-lg p-6 shadow-sm">
                <h2 className='text-[#636692] font-semibold'>Transfer Info</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 bg-white p-5 rounded-lg border">
                    <div className="space-y-3">
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Transfer No:&nbsp;</span><span>{props.id}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Date:&nbsp;</span><span>{props.date}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Reason:&nbsp;</span><span>{props.reason}</span></div>
                    </div>
                    <div className="space-y-3">
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Created By:&nbsp;</span><span>{props.createdBy.name}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Status:&nbsp;</span><span>{getStatusBadge(props.status)}</span></div>
                    </div>
                </div>
                <div className='flex flex-col gap-6'>
                    <h2 className='text-[#636692] font-semibold'>Items</h2>
                    <div className='rounded-lg border bg-white'>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className='pl-6'>Name</TableHead>
                                    <TableHead>Item Code</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Manufacturer Name</TableHead>
                                    <TableHead>Manufacturer Code</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Bin</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    data.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell className='pl-6 text-[#181D27] font-semibold'>{item.name}</TableCell>
                                            <TableCell className='text-[#535862]'>{item.itemCode}</TableCell>
                                            <TableCell className='text-[#535862]'>{item.description}</TableCell>
                                            <TableCell className='text-[#535862]'>{item.manufacturerName}</TableCell>
                                            <TableCell className='text-[#535862]'>{item.manufacturerCode}</TableCell>
                                            <TableCell className='text-[#535862]'>{item.quantity}</TableCell>
                                            <TableCell className='text-[#535862]'>{item.bin}</TableCell>
                                            <TableCell className='text-[#535862]'>{getStatusBadge(item.status)}</TableCell>
                                        </TableRow>
                                    ))
                                }
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        {/* Notes Section */}
                        <Notes messages={messageData} />

                        {/* Documents Section */}
                        <div className="bg-transparent">
                            <h2 className="text-lg font-semibold text-gray-900 mb-6">Documents</h2>
                            <div className="bg-[#FAFAFA] rounded-lg border border-gray-200">
                                <div className="flex justify-between text-sm text-[#535862] px-4 py-2 border-b border-gray-200">
                                    <span>Document Name</span>
                                    <span>Action</span>
                                </div>
                                {[1, 2, 3].map((index, i, arr) => (
                                    <div
                                        key={index}
                                        className={`flex items-center justify-between gap-3 px-4 py-6 border-b border-gray-200 bg-white ${i === arr.length - 1 ? 'rounded-b-lg' : ''}`}
                                    >
                                        <span className="text-sm">Document Name.pdf</span>
                                        <Download className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}