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
import { Pagination } from '../../components/pagination/Pagination';
import { ProductionData } from '@/types/production';
import { Badge } from '@/components/ui/badge';
import { ProductionStatus, ProductionItemStatus } from '@/types/production';
import { useProductionItemsData } from '@/hooks/useProductionData';

export function ProductionDetail(props: ProductionData) {
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
            <h2 className="text-xl font-semibold">Production Details</h2>
            <div className="flex flex-col gap-4 rounded-lg p-4 shadow-sm">
                <h2>Production Info</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 bg-white rounded-lg p-6 shadow-sm">
                    <div className="space-y-4">
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[200px]">Number:&nbsp;</span><span>{props.id}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[200px]">Created Date:&nbsp;</span><span>{formatDate(props.date)}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[200px]">Project:&nbsp;</span><span>{props.project}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[200px]">Start Date:&nbsp;</span><span>{formatDate(props.productionStartDate)}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[200px]">End Date:&nbsp;</span><span>{formatDate(props.productionEndDate)}</span></div>
                    </div>
                    <div className="space-y-4">
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[200px]">Status:&nbsp;</span><span>{getStatusBadge(props.status)}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[200px]">Created By:&nbsp;</span><span>{props.createdBy}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[200px]">Approved:&nbsp;</span><span>{props.approved ? "Yes" : "No"}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[200px]">Approved By:&nbsp;</span><span>{props.approvedBy}</span></div>
                    </div>
                </div>
                <div className='flex flex-col gap-6'>
                    <h2>Production Items</h2>
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
                                    <TableHead>Unit of Measure</TableHead>
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
        </div>
    )
}