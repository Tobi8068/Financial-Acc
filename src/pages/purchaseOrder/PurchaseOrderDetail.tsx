import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { PurchaseOrderData, PurchaseOrderDetailData, PurchaseOrderStatus } from '@/types/purchaseOrder';
import { Badge } from '@/components/ui/badge';

export function PurchaseOrderDetail(props: PurchaseOrderData) {
    const data: PurchaseOrderDetailData[] = [
        {
            name: 'Computer',
            description: 'Monthly Subscription',
            manufacturerCode: '35412AB',
            manufacturerName: 'Apple Inc',
            supplierCode: '35412AB',
            supplierName: '35412AB',
            quantity: 5,
            unitOfMeasure: 'Unit',
            price: 10,
            total: 10,
            taxGroup: 'Account',
            status: 'Created',
        },
        {
            name: 'Computer',
            description: 'Monthly Subscription',
            manufacturerCode: '35412AB',
            manufacturerName: 'Apple Inc',
            supplierCode: '35412AB',
            supplierName: '35412AB',
            quantity: 5,
            unitOfMeasure: 'Unit',
            price: 10,
            total: 10,
            taxGroup: 'Account',
            status: 'Created',
        },
        {
            name: 'Computer',
            description: 'Monthly Subscription',
            manufacturerCode: '35412AB',
            manufacturerName: 'Apple Inc',
            supplierCode: '35412AB',
            supplierName: '35412AB',
            quantity: 5,
            unitOfMeasure: 'Unit',
            price: 10,
            total: 10,
            taxGroup: 'Account',
            status: 'Created',
        },
        {
            name: 'Computer',
            description: 'Monthly Subscription',
            manufacturerCode: '35412AB',
            manufacturerName: 'Apple Inc',
            supplierCode: '35412AB',
            supplierName: '35412AB',
            quantity: 5,
            unitOfMeasure: 'Unit',
            price: 10,
            total: 10,
            taxGroup: 'Account',
            status: 'Created',
        },
        {
            name: 'Computer',
            description: 'Monthly Subscription',
            manufacturerCode: '35412AB',
            manufacturerName: 'Apple Inc',
            supplierCode: '35412AB',
            supplierName: '35412AB',
            quantity: 5,
            unitOfMeasure: 'Unit',
            price: 10,
            total: 10,
            taxGroup: 'Account',
            status: 'Approved',
        },
    ];
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
    return (
        <div>
            <h2 className="text-xl font-semibold">Purchase Order Details</h2>
            <div className="flex flex-col gap-6 rounded-lg p-6 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                    <div className="space-y-4">
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Number:&nbsp;</span><span>{props.id}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Date Created:&nbsp;</span><span>{props.dateCreated}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Ship To:&nbsp;</span><span>{props.shipTo}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Bill To:&nbsp;</span><span>{props.billTo}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Department:&nbsp;</span><span>{props.department}</span></div>
                    </div>

                    <div className="space-y-4">
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Status:&nbsp;</span><span className="text-green-700 bg-[#ECFDF3] rounded-lg px-2 font-semibold">{props.status}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Created By:&nbsp;</span><span>{props.createdBy}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Approved:&nbsp;</span><span>{props.approved ? "Yes" : "No"}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Approved By:&nbsp;</span><span>{props.approvedBy}</span></div>
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
                                    data.map((item) => (
                                        <TableRow>
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