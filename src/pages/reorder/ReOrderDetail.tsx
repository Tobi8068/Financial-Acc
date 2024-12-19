import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { formatDate } from '@/lib/date';
import { ReOrderData, ReOrderItem } from '@/types/reOrder';
import { Badge } from '@/components/ui/badge';
import { ReOrderStatus } from '@/types/reOrder';

export function ReOrderDetail(props: ReOrderData) {
    const data: ReOrderItem[] = [
        {
            name: 'Computer',
            description: 'lorem ipsum doler sitt amit merol muspi relow tima lorem ipsum doler sitt amit merol',
            manufacturerCode: '354125B',
            manufacturerName: 'Apple Inc',
            supplierCode: '35412AB',
            supplierName: 'Apple Inc',
            unitOfMeasure: 'Pieces',
            quantity: 5,
            price: 50,
            total: 250,
            taxGroup: 'Tac Grp Name',
            status: 'Created',
        },
        {
            name: 'Mobile',
            description: 'lorem ipsum doler sitt amit merol muspi relow tima lorem ipsum doler sitt amit merol',
            manufacturerCode: '354125B',
            manufacturerName: 'Apple Inc',
            supplierCode: '35412AB',
            supplierName: 'Apple Inc',
            unitOfMeasure: 'Pieces',
            quantity: 5,
            price: 50,
            total: 250,
            taxGroup: 'Tac Grp Name',
            status: 'Approved',
        },
        {
            name: 'Keyboard',
            description: 'lorem ipsum doler sitt amit merol muspi relow tima lorem ipsum doler sitt amit merol',
            manufacturerCode: '354125B',
            manufacturerName: 'Apple Inc',
            supplierCode: '35412AB',
            supplierName: 'Apple Inc',
            unitOfMeasure: 'Pieces',
            quantity: 5,
            price: 50,
            total: 250,
            taxGroup: 'Tac Grp Name',
            status: 'Partially_Received',
        },
        {
            name: 'Mouse',
            description: 'lorem ipsum doler sitt amit merol muspi relow tima lorem ipsum doler sitt amit merol',
            manufacturerCode: '354125B',
            manufacturerName: 'Apple Inc',
            supplierCode: '35412AB',
            supplierName: 'Apple Inc',
            unitOfMeasure: 'Pieces',
            quantity: 5,
            price: 50,
            total: 250,
            taxGroup: 'Tac Grp Name',
            status: 'Completed',
        },
        {
            name: 'Headphones',
            description: 'lorem ipsum doler sitt amit merol muspi relow tima lorem ipsum doler sitt amit merol',
            manufacturerCode: '354125B',
            manufacturerName: 'Apple Inc',
            supplierCode: '35412AB',
            supplierName: 'Apple Inc',
            unitOfMeasure: 'Pieces',
            quantity: 5,
            price: 50,
            total: 250,
            taxGroup: 'Tac Grp Name',
            status: 'Approved',
        },
    ];

    const getStatusBadge = (status: ReOrderStatus) => {
        const styles = {
            Created: 'bg-[#F5F5F5] text-[#414651]',
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
            <h2 className="text-xl font-semibold">Reorder Details</h2>
            <div className="flex flex-col gap-6 rounded-lg p-6 shadow-sm">
                <h2>Reorder Info</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 bg-white rounded-lg p-6 shadow-sm">
                    <div className="space-y-4">
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[200px]">Number:&nbsp;</span><span>{props.id}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[200px]">Name:&nbsp;</span><span>{props.name}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[200px]">Date:&nbsp;</span><span>{formatDate(props.date)}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[200px]">No. of Items:&nbsp;</span><span>{props.numberOfItem}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[200px]">No. of Requisitions:&nbsp;</span><span>{props.numberOfRequisition}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[200px]">Description:&nbsp;</span><span>{props.description}</span></div>
                    </div>
                    <div className="space-y-4">
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[200px]">Order Unit:&nbsp;</span><span>{props.orderUnit}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[200px]">Preferred Supplier:&nbsp;</span><span>{props.preferredSupplier}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[200px]">Price:&nbsp;</span><span>{props.price}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[200px]">Item Code:&nbsp;</span><span>{props.itemCode}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[200px]">Manufacturer Name:&nbsp;</span><span>{props.manufacturerName}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[200px]">Manufacturer Code:&nbsp;</span><span>{props.manufacturerCode}</span></div>
                    </div>
                </div>
                <div className='flex flex-col gap-6'>
                    <h2>Reorder Items</h2>
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
                                    <TableHead>Unit of Measure</TableHead>
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
                                            <TableCell>{item.total}</TableCell>
                                            <TableCell>{item.taxGroup}</TableCell>
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