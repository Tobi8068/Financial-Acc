import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { formatDate } from '@/lib/date';
import { Undo2, UserX } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getUserAvatarPath } from '@/lib/utils';
import { RequisitionsData, RequisitionsStatus } from '@/types/requisitions';

interface RequisitionsDetailProps {
    props: RequisitionsData;
    onClickUndo: (value: any) => void;
}

export function RequisitionsDetail({ props, onClickUndo }: RequisitionsDetailProps) {

    const getStatusBadge = (status: RequisitionsStatus) => {
        const styles = {
            Completed: 'bg-[#ECFDF3] text-[#027A48]',
            Created: 'bg-[#EFF8FF] text-[#175CD3]',
            Approved: 'bg-[#ECFDF3] text-[#027A48]',
            Rejected: 'bg-[#F4F3FF] text-[#FF9900]',
            In_Progress: 'bg-[#F4F3FF] text-[#5925DC]',
            Cancel: 'bg-[#FEF3F2] text-[#B42318]',
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
                <h2 className="text-xl font-semibold">Requisitions Details</h2>
                <div className="flex cursor-pointer p-2 rounded-full hover:bg-white">
                    <Undo2 onClick={() => onClickUndo(1)} />
                </div>
            </div>
            <div className="flex flex-col gap-6 rounded-lg p-6 shadow-sm">
                <h2 className='text-[#636692] font-semibold'>Requisition Info</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 bg-white p-5 rounded-lg border">
                    <div className="space-y-3">
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">ID:&nbsp;</span><span>{props.id}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Date Created:&nbsp;</span><span>{formatDate(props.dateCreated)}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Ship To:&nbsp;</span><span>{props.shipTo}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Bill To:&nbsp;</span><span>{props.billTo}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Department:&nbsp;</span><span>{props.department}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Status:&nbsp;</span><span>{getStatusBadge(props.status)}</span></div>
                    </div>

                    <div className="space-y-3">
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
                                {props.approvedBy.name.length !== 2 ? (
                                    <>
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={getUserAvatarPath(props.approvedBy.avatar)} alt={props.approvedBy.name} />
                                            <AvatarFallback>
                                                <span>{props.approvedBy.name}</span>
                                            </AvatarFallback>
                                        </Avatar>
                                        <span>{props.approvedBy.name}</span>
                                    </>
                                ) : (
                                    <>
                                        <UserX className="h-8 w-8 text-red-400 rounded-full" />
                                        <span>None</span>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="text-md text-[#2B2D40] flex "><span className="font-bold w-[148px]">Total Net Amount:&nbsp;</span><span>${props.totalNetAmount}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Total Tax Amount:&nbsp;</span><span>${props.totalTaxAmount}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Total Amount:&nbsp;</span><span>${props.totalAmount}</span></div>
                    </div>
                </div>
                <div className='flex flex-col gap-6'>
                    <h2 className='text-[#636692] font-semibold'>Requisition Items</h2>
                    <div className='rounded-lg border bg-white'>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className='pl-6'>Name</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Manufacturer</TableHead>
                                    <TableHead>Manufacturer Code</TableHead>
                                    <TableHead>Supplier</TableHead>
                                    <TableHead>Measure Unit</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Net Amount</TableHead>
                                    <TableHead>Tax Amount</TableHead>
                                    <TableHead>Tax Group</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {props.items.length >= 0 && props.items.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell className='pl-6'>{item.name}</TableCell>
                                        <TableCell>{item.description}</TableCell>
                                        <TableCell>{item.manufacturer}</TableCell>
                                        <TableCell>{item.manufacturerCode}</TableCell>
                                        <TableCell>{item.supplierName}</TableCell>
                                        <TableCell>{item.unitOfMeasure}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>{item.price}</TableCell>
                                        <TableCell>{item.netAmount}</TableCell>
                                        <TableCell>{item.taxAmount}</TableCell>
                                        <TableCell>{item.taxGroup}</TableCell>
                                    </TableRow>
                                ))
                                }
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}