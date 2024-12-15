import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { formatDate } from '@/lib/date';
import { InvoiceData } from '@/types/invoice';

export function InvoiceDetail(props: InvoiceData) {
    const data = [
        {
            name: 'Computer',
            description: 'Monthly Subscription',
            unit: 'Unit',
            price: '$10',
            totalPerLine: '$10',
            taxGroup: 'Account',
            taxAmount: '$10',
            account: 'Account'
        },
        {
            name: 'Mobile',
            description: 'Monthly Subscription',
            unit: 'Unit',
            price: '$10',
            totalPerLine: '$10',
            taxGroup: 'Account',
            taxAmount: '$10',
            account: 'Account'
        },
        {
            name: 'Keyboard',
            description: 'Monthly Subscription',
            unit: 'Unit',
            price: '$10',
            totalPerLine: '$10',
            taxGroup: 'Account',
            taxAmount: '$10',
            account: 'Account'
        },
    ];
    return (
        <div>
            <h2 className="text-xl font-semibold">Invoice Details</h2>
            <div className="flex flex-col gap-6 rounded-lg p-6 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                    <div className="space-y-4">
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Invoice Number:&nbsp;</span><span>{props.id}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Date Created:&nbsp;</span><span>{formatDate(props.dateCreated)}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Client:&nbsp;</span><span>{props.client.name}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Ship To:&nbsp;</span><span>{props.shipTo}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Bill To:&nbsp;</span><span>{props.billTo}</span></div>
                    </div>

                    <div className="space-y-4">
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Status:&nbsp;</span><span className="text-green-700 bg-[#ECFDF3] rounded-lg px-2 font-semibold">{props.status}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Total Tax Amount:&nbsp;</span><span>${props.totalTaxAmount}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Total Net Amount:&nbsp;</span><span>${props.totalNetAmount}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Total Amount:&nbsp;</span><span>${props.totalAmount}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Contact:&nbsp;</span><span>+{props.contact}</span></div>
                    </div>
                </div>
                <div className='flex flex-col gap-6'>
                    <h2>Invoice Items</h2>
                    <div className='rounded-lg border bg-white'>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className='pl-6'>Name</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Unit</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Total Per Line</TableHead>
                                    <TableHead>Tax Group</TableHead>
                                    <TableHead>Tax Amount</TableHead>
                                    <TableHead>Account</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    data.map((item, id) => (
                                        <TableRow key={id}>
                                            <TableCell className='pl-6'>{item.name}</TableCell>
                                            <TableCell>{item.description}</TableCell>
                                            <TableCell>{item.unit}</TableCell>
                                            <TableCell>{item.price}</TableCell>
                                            <TableCell>{item.totalPerLine}</TableCell>
                                            <TableCell>{item.taxGroup}</TableCell>
                                            <TableCell>{item.taxAmount}</TableCell>
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