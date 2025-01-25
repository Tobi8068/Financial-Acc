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
import { SuppliersData } from '@/types/suppliers';
import { useSuppliersItemsData } from '@/hooks/useSuppliersData';
import { Pagination } from '@/components/pagination/Pagination';
import { SuppliersStatus } from "@/types/suppliers";
import { messageData } from "@/lib/message-data";
import { Notes } from "@/components/organisms/notes";
import { Badge } from '@/components/ui/badge';

export function SuppliersDetail(props: SuppliersData) {
    const [currentPage, setCurrentPage] = useState(1);
    const { data, totalPages, totalItems, itemsPerPage } = useSuppliersItemsData(
        currentPage,
    );

    const getStatusBadge = (status: SuppliersStatus) => {
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
            <h2 className="text-xl font-semibold">Suppliers Details</h2>
            <div className="flex flex-col gap-6 rounded-lg p-6 shadow-sm">
                <h2 className='text-[#636692] font-semibold'>Supplier Info</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 bg-white p-5 rounded-lg border">
                    <div className="space-y-3">
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[300px]">Supplier Name:&nbsp;</span><span>{props.supplierName}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[300px] pt-3">Address:&nbsp;</span><span className="pt-3">{props.address}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[300px]">Postal Address:&nbsp;</span><span>{props.postalAddress}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[300px] pt-3">Bank Name:&nbsp;</span><span className="pt-3">{props.bankName}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[300px]">Account Number:&nbsp;</span><span>{props.accountNumber}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[300px]">Transit Number:&nbsp;</span><span>{props.transitNumber}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[300px]">Currency:&nbsp;</span><span>{props.currency}</span></div>
                    </div>
                    <div className="space-y-3">
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[300px]">Supplier Code:&nbsp;</span><span>{props.supplierCode}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[300px] pt-3">Billing Address:&nbsp;</span><span className="pt-3">{props.billingAddress}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[300px]">Shipping Address:&nbsp;</span><span>{props.shippingAddress}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[300px] pt-3">Purchase Order Management:&nbsp;</span><span className="pt-3">{props.purchaseOrder}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[300px]">Status:&nbsp;</span><span>{getStatusBadge(props.status)}</span></div>
                    </div>
                </div>
                <div className='flex flex-col gap-6'>
                    <h2 className='text-[#636692] font-semibold'>Items</h2>
                    <div className='rounded-lg border bg-white'>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className='pl-6'>First Name</TableHead>
                                    <TableHead>Last Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Phone Number</TableHead>
                                    <TableHead>Address</TableHead>
                                    <TableHead>Role</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    data.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell className='pl-6 text-[#181D27] font-semibold'>{item.firstName}</TableCell>
                                            <TableCell className='text-[#535862]'>{item.lastName}</TableCell>
                                            <TableCell className='text-[#535862]'>{item.email}</TableCell>
                                            <TableCell className='text-[#535862]'>{item.phoneNumber}</TableCell>
                                            <TableCell className='text-[#535862]'>{item.address}</TableCell>
                                            <TableCell className='text-[#535862]'>{item.role}</TableCell>
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