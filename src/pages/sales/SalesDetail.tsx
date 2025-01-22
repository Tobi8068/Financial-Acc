import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { SalesData, SalesDetailData } from '@/types/sales';
import { getStatusBadge } from './SalesBadge';
import { formatDate } from '@/lib/date';

export function SalesDetail(props: SalesData) {
    const data: SalesDetailData[] = [
        {
            name: 'Computer',
            description: 'Monthly Subscription',
            manufacturer: 'Apple Inc',
            manufacturerCode: '35412AB',
            itemCode: '35412AB',
            quantity: 5,
            unit: 'Unit',
            price: 10,
            totalPerLine: 10,
            taxGroup: 'Account',
            taxAmount: 10,
            status: 'Created',
            account: 'Account'
        },
        {
            name: 'Mobile',
            description: 'Monthly Subscription',
            manufacturer: 'Apple Inc',
            manufacturerCode: '35412AB',
            itemCode: '35412AB',
            quantity: 5,
            unit: 'Unit',
            price: 10,
            totalPerLine: 10,
            taxGroup: 'Account',
            taxAmount: 10,
            status: 'Approved',
            account: 'Account'
        },
        {
            name: 'Keyboard',
            description: 'Monthly Subscription',
            manufacturer: 'Apple Inc',
            manufacturerCode: '35412AB',
            itemCode: '35412AB',
            quantity: 5,
            unit: 'Unit',
            price: 10,
            totalPerLine: 10,
            taxGroup: 'Account',
            taxAmount: 10,
            status: 'Partially_Received',
            account: 'Account'
        },
        {
            name: 'Keyboard',
            description: 'Monthly Subscription',
            manufacturer: 'Apple Inc',
            manufacturerCode: '35412AB',
            itemCode: '35412AB',
            quantity: 5,
            unit: 'Unit',
            price: 10,
            totalPerLine: 10,
            taxGroup: 'Account',
            taxAmount: 10,
            status: 'Partially_Received',
            account: 'Account'
        },
        {
            name: 'Keyboard',
            description: 'Monthly Subscription',
            manufacturer: 'Apple Inc',
            manufacturerCode: '35412AB',
            itemCode: '35412AB',
            quantity: 5,
            unit: 'Unit',
            price: 10,
            totalPerLine: 10,
            taxGroup: 'Account',
            taxAmount: 10,
            status: 'Completed',
            account: 'Account'
        },
    ];
    return (
        <div>
            <h2 className="text-xl font-semibold">Sales Details</h2>
            <div className="flex flex-col gap-6 rounded-lg p-6 shadow-sm">
                <div className="space-y-4">
                    <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Number:&nbsp;</span><span>{props.id}</span></div>
                    <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Name:&nbsp;</span><span>Computer</span></div>
                    <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Notes:&nbsp;</span><span>Client Name</span></div>
                    <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Date Created:&nbsp;</span><span>{formatDate(props.dateCreated)}</span></div>
                    <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Carrier:&nbsp;</span><span>Carrier Name</span></div>
                </div>
                <div className='flex flex-col gap-6'>
                    <h2>Shipping Items</h2>
                    <div className='rounded-lg border bg-white'>
                        <Table className='px-6'>
                            <TableHeader>
                                <TableRow className='bg-[#FAFAFA]'>
                                    <TableHead className='pl-6'>Name</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Manufacturer</TableHead>
                                    <TableHead>Manufacturer Code</TableHead>
                                    <TableHead>Item Code</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Unit</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Tax Group</TableHead>
                                    <TableHead>Total Per Line</TableHead>
                                    <TableHead>Tax Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Account</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    data.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell className='pl-6'>{item.name}</TableCell>
                                            <TableCell>{item.description}</TableCell>
                                            <TableCell>{item.manufacturer}</TableCell>
                                            <TableCell>{item.manufacturerCode}</TableCell>
                                            <TableCell>{item.itemCode}</TableCell>
                                            <TableCell>{item.quantity}</TableCell>
                                            <TableCell>{item.unit}</TableCell>
                                            <TableCell>{item.price}</TableCell>
                                            <TableCell>{item.taxGroup}</TableCell>
                                            <TableCell>{item.totalPerLine}</TableCell>
                                            <TableCell>{item.taxAmount}</TableCell>
                                            <TableCell>{getStatusBadge(item.status)}</TableCell>
                                            <TableCell>{item.account}</TableCell>
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