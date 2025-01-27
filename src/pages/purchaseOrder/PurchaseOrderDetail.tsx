import { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Pagination } from '@/components/pagination/Pagination';
import { formatDate } from '@/lib/date';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getUserAvatarPath } from '@/lib/utils';
import { PurchaseOrderData, PurchaseOrderItemStatus, PurchaseOrderStatus } from '@/types/purchaseOrder';
import { usePurchaseOrderItemsData } from '@/hooks/usePurchaseOrderData';

export function PurchaseOrderDetail(props: PurchaseOrderData) {
    const [currentPage, setCurrentPage] = useState(1);
    const { data, totalPages, totalItems, itemsPerPage } = usePurchaseOrderItemsData(
        currentPage,
    );

    const getStatusBadge = (status: PurchaseOrderStatus) => {
        const styles = {
            Created: 'bg-[#F5F5F5] text-[#414651]',
            Approved: 'bg-[#ECFDF3] text-[#027A48]',
            Sent: 'bg-[#EFF8FF] text-[#175CD3]',
            Partially_Received: 'bg-[#F4F3FF] text-[#5925DC]',
            Completed: 'bg-[#ECFDF3] text-[#027A48]',
            Cancelled: 'bg-[#FEF3F2] text-[#B42318]',
        };

        return (
            <Badge className={styles[status]} variant="secondary">
                {status.replace("_", " ").replace("0", "/")}
            </Badge>
        );
    };

    const getItemStatusBadge = (status: PurchaseOrderItemStatus) => {
        const styles = {
            Created: 'bg-[#F5F5F5] text-[#414651]',
            Approved: 'bg-[#ECFDF3] text-[#027A48]',
            Partially_Received: 'bg-[#F4F3FF] text-[#5925DC]',
            Completed: 'bg-[#ECFDF3] text-[#027A48]',
        };

        return (
            <Badge className={styles[status]} variant="secondary">
                {status.replace("_", " ").replace("0", "/")}
            </Badge>
        );
    };

    return (
        <div>
            <h2 className="text-xl font-semibold">Purchase Order Details</h2>
            <div className="flex flex-col gap-6 rounded-lg p-6 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                    <div className="space-y-4">
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">No:&nbsp;</span><span>{props.pid}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Created Date:&nbsp;</span><span>{formatDate(props.created_date)}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Ship To:&nbsp;</span><span>{props.shipTo}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Bill To:&nbsp;</span><span>{props.billTo}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Department:&nbsp;</span><span>{props.department}</span></div>
                    </div>

                    <div className="space-y-4">
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Status:&nbsp;</span><span className="text-green-700 bg-[#ECFDF3] rounded-lg px-2 font-semibold">{getStatusBadge(props.status)}</span></div>
                        <div className="text-md text-[#2B2D40] flex">
                            <span className="font-bold w-[148px]">Created By:&nbsp;</span>
                            <div className='flex items-center gap-2'>
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={getUserAvatarPath(props.createdBy.avatar)} alt={props.createdBy.name} />
                                    <AvatarFallback>
                                        <span>{props.createdBy.name}</span>
                                    </AvatarFallback>
                                </Avatar>
                                <span className=" ">{props.createdBy.name}</span>
                            </div>
                        </div>
                        <div className="text-md text-[#2B2D40] flex">
                            <span className="font-bold w-[148px]">Approved By:&nbsp;</span>
                            {props.approvedBy ? (
                                <div className='flex items-center gap-2'>
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={getUserAvatarPath(props.approvedBy.avatar)} alt={props.approvedBy.name} />
                                        <AvatarFallback>
                                            <span>{props.approvedBy.name}</span>
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className=" ">{props.approvedBy.name}</span>
                                </div>) : (
                                <span className=" ">Not Approved</span>
                            )}
                        </div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Approved:&nbsp;</span><span>{props.approved ? "Yes" : "No"}</span></div>
                    </div>
                </div>
                <div className='flex flex-col gap-6'>
                    <h2>Purchase Order Items</h2>
                    <div className='rounded-lg border bg-white'>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className='pl-6'>Name</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Manufacturer Code</TableHead>
                                    <TableHead>Manufacturer Name</TableHead>
                                    <TableHead>Supplier Code</TableHead>
                                    <TableHead>Supplier Name</TableHead>
                                    <TableHead>Measure Unit</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Total</TableHead>
                                    <TableHead>Tax Group</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    data.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell className='pl-6'>{item.name}</TableCell>
                                            <TableCell>{item.description}</TableCell>
                                            <TableCell>{item.manufacturerCode}</TableCell>
                                            <TableCell>{item.manufacturerName}</TableCell>
                                            <TableCell>{item.supplierCode}</TableCell>
                                            <TableCell>{item.supplierName}</TableCell>
                                            <TableCell>{item.unitOfMeasure}</TableCell>
                                            <TableCell>{item.quantity}</TableCell>
                                            <TableCell>${item.price}</TableCell>
                                            <TableCell>${item.total}</TableCell>
                                            <TableCell>{item.taxGroup}</TableCell>
                                            <TableCell>{getItemStatusBadge(item.status)}</TableCell>
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
                </div>
            </div>
        </div>
    )
}