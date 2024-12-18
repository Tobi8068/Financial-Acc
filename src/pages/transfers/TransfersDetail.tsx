import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { formatDate } from '@/lib/date';
import { TransfersData, TransfersItems } from '@/types/transfers';
import { Badge } from '@/components/ui/badge';
import { TransfersStatus } from '@/types/transfers';

export function TransfersDetail(props: TransfersData) {
    const data: TransfersItems[] = [
        {
            name: 'Computer',
            itemCode: '35412AB',
            description: 'Monthly Subscription',
            manufacturerName: 'Apple Inc.',
            manufacturerCode: '35412AB',
            quantity: 5,
            bin: 5,
            status: 'Approved',
        },
        {
            name: 'Mobile',
            itemCode: '35412AB',
            description: 'Monthly Subscription',
            manufacturerName: 'Apple Inc.',
            manufacturerCode: '35412AB',
            quantity: 5,
            bin: 5,
            status: 'Transfered',
        },
        {
            name: 'Keyboard',
            itemCode: '35412AB',
            description: 'Monthly Subscription',
            manufacturerName: 'Apple Inc.',
            manufacturerCode: '35412AB',
            quantity: 5,
            bin: 5,
            status: 'Approved',
        },
        {
            name: 'Mouse',
            itemCode: '35412AB',
            description: 'Monthly Subscription',
            manufacturerName: 'Apple Inc.',
            manufacturerCode: '35412AB',
            quantity: 5,
            bin: 5,
            status: 'Transfered',
        },
        {
            name: 'Headphone',
            itemCode: '35412AB',
            description: 'Monthly Subscription',
            manufacturerName: 'Apple Inc.',
            manufacturerCode: '35412AB',
            quantity: 5,
            bin: 5,
            status: 'Approved',
        },
    ];

    const getStatusBadge = (status: TransfersStatus) => {
        const styles = {
          Transfered: 'bg-[#F5F5F5] text-[#414651]',
          Approved: 'bg-[#ECFDF3] text-[#027A48]',
          Waiting_Approval: 'bg-[#EFF8FF] text-[#175CD3]',
          Ended: 'bg-[#F4F3FF] text-[#5925DC]',
          Cancelled: 'bg-[#FEF2F2] text-[#991B1B]',
          Partially_Approved: 'bg-[#FFFBEB] text-[#B45309]',
          Partially_Received: 'bg-[#FFFBEB] text-[#B45335]',
          Completed: 'bg-[#FFF35B] text-[#B45335]',
        };
    
        return (
          <Badge className={styles[status]} variant="secondary">
            {status.replace("_", " ").replace("0", "/")}
          </Badge>
        );
      };

    return (
        <div>
            <h2 className="text-xl font-semibold">Transfers Details</h2>
            <div className="flex flex-col gap-6 rounded-lg p-6 shadow-sm">
            <h2>Transfer Info</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 bg-white p-6 shadow-sm">
                    <div className="space-y-4">
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Transfer No.:&nbsp;</span><span>{props.id}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Date:&nbsp;</span><span>{formatDate(props.date)}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Reason:&nbsp;</span><span>{props.reason}</span></div>
                    </div>

                    <div className="space-y-4">
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Created By:&nbsp;</span><span>{props.createdBy.name}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Status:&nbsp;</span><span>{getStatusBadge(props.status)}</span></div>
                    </div>
                </div>
                <div className='flex flex-col gap-6'>
                    <h2>Items</h2>
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
                                    data.map((item, id) => (
                                        <TableRow key={id}>
                                            <TableCell className='pl-6'>{item.name}</TableCell>
                                            <TableCell>{item.itemCode}</TableCell>
                                            <TableCell>{item.description}</TableCell>
                                            <TableCell>{item.manufacturerName}</TableCell>
                                            <TableCell>{item.manufacturerCode}</TableCell>
                                            <TableCell>{item.quantity}</TableCell>
                                            <TableCell>{item.bin}</TableCell>
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