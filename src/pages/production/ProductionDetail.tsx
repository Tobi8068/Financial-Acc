import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { formatDate } from '@/lib/date';
import { Undo2 } from 'lucide-react';
import { Pagination } from '@/components/pagination/Pagination';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getUserAvatarPath } from '@/lib/utils'

import { ProductionData, ProductionStatus, ProductionItemStatus } from '@/types/production';
import { useProductionItemsData } from '@/hooks/useProductionData';

interface ProductionDetailProps {
    props: ProductionData;
    onClickUndo: (value: any) => void;
}

export function ProductionDetail({ props, onClickUndo }: ProductionDetailProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const { data, totalPages, totalItems, itemsPerPage } = useProductionItemsData(
        currentPage,
    );

    const getStatusBadge = (status: ProductionStatus) => {
        const styles = {
            Created: 'bg-[#FEF2F2] text-[#991B1B]',
            Approve: 'bg-[#ECFDF3] text-[#027A48]',
            Waiting_Approval: 'bg-[#EFF8FF] text-[#175CD3]',
            Started: 'bg-[#FEF2F2] text-[#991B1B]',
            Ended: 'bg-[#F4F3FF] text-[#5925DC]',
        };

        return (
            <Badge className={styles[status]} variant="secondary">
                {status.replace("_", " ").replace("0", "/")}
            </Badge>
        );
    };

    const getItemStatusBadge = (status: ProductionItemStatus) => {
        const styles = {
            Approved: 'bg-[#ECFDF3] text-[#027A48]',
            Partially_Approved: 'bg-[#FFFBEB] text-[#B45309]',
        };

        return (
            <Badge className={styles[status]} variant="secondary">
                {status.replace("_", " ").replace("0", "/")}
            </Badge>
        );
    };

    return (
        <div>
            <div className='flex justify-between items-center'>
                <h2 className="text-xl font-semibold">Production Details</h2>
                <div className="flex cursor-pointer p-2 rounded-full hover:bg-white">
                    <Undo2 onClick={() => onClickUndo(1)} />
                </div>
            </div>
            <div className="flex flex-col gap-6 rounded-lg p-6 shadow-sm">
                <h2 className='text-[#636692] font-semibold'>Production Info</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 bg-white p-5 rounded-lg border">
                    <div className="space-y-4">
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[200px]">Number:&nbsp;</span><span>{props.id}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[200px]">Created Date:&nbsp;</span><span>{formatDate(props.date)}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[200px]">Project:&nbsp;</span><span>{props.project}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[200px]">Start Date:&nbsp;</span><span>{formatDate(props.productionStartDate)}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[200px]">End Date:&nbsp;</span><span>{formatDate(props.productionEndDate)}</span></div>
                    </div>

                    <div className="space-y-4">
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[200px]">Status:&nbsp;</span><span>{getStatusBadge(props.status)}</span></div>
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
                            <div className='flex items-center gap-2'>
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={getUserAvatarPath(props.approvedBy.avatar)} alt={props.approvedBy.name} />
                                    <AvatarFallback>
                                        <span>{props.approvedBy.name}</span>
                                    </AvatarFallback>
                                </Avatar>
                                <span className=" ">{props.approvedBy.name}</span>
                            </div>
                        </div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[200px]">Approved:&nbsp;</span><span>{props.approved ? "Yes" : "No"}</span></div>
                    </div>
                </div>
                <div className='flex flex-col gap-6'>
                    <h2 className='text-[#636692] font-semibold'>Production Items</h2>
                    <div className='rounded-lg border bg-white'>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className='pl-6'>Name</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Manufacturer</TableHead>
                                    <TableHead>Manufacturer Code</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Approved Quantity</TableHead>
                                    <TableHead>Measure Unit</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    data.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell className='pl-6'>{item.name}</TableCell>
                                            <TableCell>{item.description}</TableCell>
                                            <TableCell>{item.manufacturerName}</TableCell>
                                            <TableCell>{item.manufacturerCode}</TableCell>
                                            <TableCell>{item.quantity}</TableCell>
                                            <TableCell>{item.approvedQuantity}</TableCell>
                                            <TableCell>{item.unitOfMeasure}</TableCell>
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
        </div >
    )
}