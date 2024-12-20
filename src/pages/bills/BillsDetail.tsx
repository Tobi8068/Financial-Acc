import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { formatDate } from '@/lib/date';
import { BillsData, BillItem } from '@/types/bills';
import { Badge } from '@/components/ui/badge';
import { BillsStatus } from '@/types/bills';

export function BillsDetail(props: BillsData) {
    const data: BillItem[] = [
        {
            name: 'Computer',
            description: 'lorem ipsum doler sitt amit merol muspi relow tima lorem ipsum doler sitt amit merol',
            unit: 'Unit',
            quantity: 5,
            price: 50,
            total: 250,
            account: 'Account',
            taxGroup: 'Account',
            taxAmount: 10,
        },
        {
            name: 'Mobile',
            description: 'lorem ipsum doler sitt amit merol muspi relow tima lorem ipsum doler sitt amit merol',
            unit: 'Unit',
            quantity: 5,
            price: 50,
            total: 250,
            account: 'Account',
            taxGroup: 'Account',
            taxAmount: 10,
        },
        {
            name: 'Keyboard',
            description: 'lorem ipsum doler sitt amit merol muspi relow tima lorem ipsum doler sitt amit merol',
            unit: 'Unit',
            quantity: 5,
            price: 50,
            total: 250,
            account: 'Account',
            taxGroup: 'Account',
            taxAmount: 10,
        },
    ];

    const getStatusBadge = (status: BillsStatus) => {
        const styles = {
            Need_Approval: 'bg-red-100 text-red-800',
            Approved: 'bg-green-100 text-green-800',
            Sent: 'bg-[#FE35ED] text-[#C7820A]',
            Paid: 'bg-[#FE97ED] text-[#C1220A]',
            Complete: 'bg-[#FE93RD] text-[#C5520A]',
            On_Hold: 'bg-[#FEF6ED] text-[#C4320A]',
        };

        return (
            <Badge className={styles[status]} variant="secondary">
                {status.replace("_", " ").replace("0", "/")}
            </Badge>
        );
    };

    return (
        <div>
            <h2 className="text-xl font-semibold">Bills Details</h2>
            <div className="flex flex-col gap-6 rounded-lg p-6 shadow-sm">
                <h2>Bill Info</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 bg-white rounded-lg p-6 shadow-sm">
                    <div className="space-y-4">
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[200px]">Bill Number:&nbsp;</span><span>{props.id}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[200px]">Date Created:&nbsp;</span><span>{formatDate(props.dateCreated)}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[200px]">Required Date:&nbsp;</span><span>{formatDate(props.requiredDate)}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[200px]">Supplier:&nbsp;</span><span>{props.supplier}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[200px]">Ship To:&nbsp;</span><span>{props.shipTo}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[200px]">Bill To:&nbsp;</span><span>{props.billTo}</span></div>
                    </div>
                    <div className="space-y-4">
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[200px]">Status:&nbsp;</span><span>{getStatusBadge(props.status)}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[200px]">Total Tax Amount:&nbsp;</span><span>${props.totalTaxAmount}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[200px]">Total Net Amount:&nbsp;</span><span>${props.totalNetAmount}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[200px]">Total Amount:&nbsp;</span><span>${props.totalAmount}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[200px]">Contact:&nbsp;</span><span>+{props.contact}</span></div>
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
                                    <TableHead>Unit</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Total</TableHead>
                                    <TableHead>Account</TableHead>
                                    <TableHead>Tax Group</TableHead>
                                    <TableHead>Tax Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    data.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell className='pl-6'>{item.name}</TableCell>
                                            <TableCell>{item.description}</TableCell>
                                            <TableCell>{item.unit}</TableCell>
                                            <TableCell>{item.quantity}</TableCell>
                                            <TableCell>${item.price}</TableCell>
                                            <TableCell>${item.total}</TableCell>
                                            <TableCell>{item.account}</TableCell>
                                            <TableCell>{item.taxGroup}</TableCell>
                                            <TableCell>${item.taxAmount}</TableCell>
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