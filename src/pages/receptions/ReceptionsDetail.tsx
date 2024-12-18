import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { ReceptionsData, ReceptionItem } from '@/types/receptions';

export function ReceptionsDetail(props: ReceptionsData) {
    const data: ReceptionItem[] = [
        {
            name: 'Computer',
            itemCode: '352644B',
            description: 'Monthly subscription',
            manufacturerName: 'Apple Inc',
            manufacturerCode: '35412AB',
            quantity: 5,
            bin: 5,
        },
        {
            name: 'Mobile',
            itemCode: '352644B',
            description: 'Monthly subscription',
            manufacturerName: 'Apple Inc',
            manufacturerCode: '35412AB',
            quantity: 5,
            bin: 5,
        },
        {
            name: 'Keyboard',
            itemCode: '352644B',
            description: 'Monthly subscription',
            manufacturerName: 'Apple Inc',
            manufacturerCode: '35412AB',
            quantity: 5,
            bin: 5,
        },
    ];
    return (
        <div>
            <h2 className="text-xl font-semibold">Receptions Details</h2>
            <div className="flex flex-col gap-6 rounded-lg p-6 shadow-sm">
                <h2 className='text-[#636692] font-semibold'>Reception Info</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 bg-white p-5 rounded-lg border">
                    <div className="space-y-3">
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Purchase Order No:&nbsp;</span><span>{props.purchaseOrderNo}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">StoreKeeper:&nbsp;</span><span>{props.storeKeeper}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Purchase Order:&nbsp;</span><span>{props.purchaseOrder}</span></div>
                    </div>
                </div>
                <div className='flex flex-col gap-6'>
                    <h2 className='text-[#636692] font-semibold'>Requisition Items</h2>
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
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    data.map((item) => (
                                        <TableRow>
                                            <TableCell className='pl-6'>{item.name}</TableCell>
                                            <TableCell>{item.itemCode}</TableCell>
                                            <TableCell>{item.description}</TableCell>
                                            <TableCell>{item.manufacturerName}</TableCell>
                                            <TableCell>{item.manufacturerCode}</TableCell>
                                            <TableCell>{item.quantity}</TableCell>
                                            <TableCell>{item.bin}</TableCell>
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