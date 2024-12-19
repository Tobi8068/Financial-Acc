import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { formatDate } from '@/lib/date';
import { ProductionData, ProductionItem } from '@/types/production';
import { Badge } from '@/components/ui/badge';
import { ProductionStatus } from '@/types/production';

export function ProductionDetail(props: ProductionData) {
    const data: ProductionItem[] = [
        {
            name: 'Computer',
            description: 'lorem ipsum doler sitt amit merol muspi relow tima lorem ipsum doler sitt amit merol',
            manufacturerCode: '354125B',
            manufacturerName: 'Apple Inc',
            unitOfMeasure: 'Pieces',
            quantity: 5,
            approvedQuantity: 50,
            status: 'Approved',
        },
        {
            name: 'Computer',
            description: 'lorem ipsum doler sitt amit merol muspi relow tima lorem ipsum doler sitt amit merol',
            manufacturerCode: '354125B',
            manufacturerName: 'Apple Inc',
            unitOfMeasure: 'Pieces',
            quantity: 5,
            approvedQuantity: 50,
            status: 'Partially_Approved',
        },
        {
            name: 'Computer',
            description: 'lorem ipsum doler sitt amit merol muspi relow tima lorem ipsum doler sitt amit merol',
            manufacturerCode: '354125B',
            manufacturerName: 'Apple Inc',
            unitOfMeasure: 'Pieces',
            quantity: 5,
            approvedQuantity: 50,
            status: 'Approved',
        },
    ];

    const getStatusBadge = (status: ProductionStatus) => {
        const styles = {
          Created: 'bg-[#F5F5F5] text-[#414651]',
          Approved: 'bg-[#ECFDF3] text-[#027A48]',
          Waiting_Approval: 'bg-[#EFF8FF] text-[#175CD3]',
          Ended: 'bg-[#F4F3FF] text-[#5925DC]',
          Cancelled: 'bg-[#FEF2F2] text-[#991B1B]',
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
            <h2 className="text-xl font-semibold">Requisitions Details</h2>
            <div className="flex flex-col gap-6 rounded-lg p-6 shadow-sm">
            <h2>Requisition Info</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 bg-white rounded-lg p-6 shadow-sm">
                    <div className="space-y-4">
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[200px]">Number:&nbsp;</span><span>{props.id}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[200px]">Date Created:&nbsp;</span><span>{formatDate(props.date)}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[200px]">Project:&nbsp;</span><span>{props.project}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[200px]">Production Start Date:&nbsp;</span><span>{formatDate(props.productionStartDate)}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[200px]">Production End Date:&nbsp;</span><span>{formatDate(props.productionEndDate)}</span></div>
                    </div>

                    <div className="space-y-4">
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[200px]">Status:&nbsp;</span><span>{getStatusBadge(props.status)}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[200px]">Created By:&nbsp;</span><span>{props.createdBy}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[200px]">Approved:&nbsp;</span><span>{props.approved ? "Yes" : "No" }</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[200px]">Approved By:&nbsp;</span><span>{props.approvedBy}</span></div>
                    </div>
                </div>
                <div className='flex flex-col gap-6'>
                    <h2>Requisition Items</h2>
                    <div className='rounded-lg border bg-white'>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className='pl-6'>Name</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Manufacturer Code</TableHead>
                                    <TableHead>Manufacturer Name</TableHead>
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
                                            <TableCell>{item.manufacturerCode}</TableCell>
                                            <TableCell>{item.manufacturerName}</TableCell>
                                            <TableCell>{item.quantity}</TableCell>
                                            <TableCell>{item.approvedQuantity}</TableCell>
                                            <TableCell>{item.unitOfMeasure}</TableCell>
                                            <TableCell>{getStatusBadge(item.status)}</TableCell>
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