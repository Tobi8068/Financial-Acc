import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { formatDate } from '@/lib/date';
import { RequisitionsData, RequisitionItem } from '@/types/requisitions';

export function RequisitionsDetail(props: RequisitionsData) {
    const data: RequisitionItem[] = [
        {
            name: 'Computer',
            description: 'lorem ipsum doler sitt amit merol muspi relow tima lorem ipsum doler sitt amit merol',
            manufacturerCode: '354125B',
            manufacturerName: 'Apple Inc',
            supplierName: 'Apple Inc',
            unitOfMeasure: 'Pieces',
            quantity: 5,
            price: 50,
            taxAmount: 10,
            taxGroup: 'Account',
        },
        {
            name: 'Computer',
            description: 'lorem ipsum doler sitt amit merol muspi relow tima lorem ipsum doler sitt amit merol',
            manufacturerCode: '354125B',
            manufacturerName: 'Apple Inc',
            supplierName: 'Apple Inc',
            unitOfMeasure: 'Pieces',
            quantity: 5,
            price: 50,
            taxAmount: 10,
            taxGroup: 'Account',
        },
        {
            name: 'Computer',
            description: 'lorem ipsum doler sitt amit merol muspi relow tima lorem ipsum doler sitt amit merol',
            manufacturerCode: '354125B',
            manufacturerName: 'Apple Inc',
            supplierName: 'Apple Inc',
            unitOfMeasure: 'Pieces',
            quantity: 5,
            price: 50,
            taxAmount: 10,
            taxGroup: 'Account',
        },
    ];
    return (
        <div>
            <h2 className="text-xl font-semibold">Requisitions Details</h2>
            <div className="flex flex-col gap-6 rounded-lg p-6 shadow-sm">
                <h2 className='text-[#636692] font-semibold'>Requisition Info</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 bg-white p-5 rounded-lg border">
                    <div className="space-y-3">
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Number:&nbsp;</span><span>{props.id}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Date Created:&nbsp;</span><span>{formatDate(props.dateCreated)}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Ship To:&nbsp;</span><span>{props.shipTo}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Bill To:&nbsp;</span><span>{props.billTo}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Department:&nbsp;</span><span>{props.department}</span></div>
                    </div>

                    <div className="space-y-3">
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Status:&nbsp;</span><span className="text-green-700 bg-[#ECFDF3] rounded-lg px-2 font-semibold">{props.status}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Approved By:&nbsp;</span><span>{props.approvedBy}</span></div>
                        <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[148px]">Created By:&nbsp;</span><span>{props.createdBy}</span></div>
                        <div className="text-md text-[#2B2D40] flex "><span className="font-bold w-[200px]">Total Amount Before Tax:&nbsp;</span><span>${props.totalAmountBeforeTax}</span></div>
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
                                    <TableHead>Manufacturer Code</TableHead>
                                    <TableHead>Manufacturer Name</TableHead>
                                    <TableHead>Supplier Name</TableHead>
                                    <TableHead>Unit of Measure</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Tax Amount</TableHead>
                                    <TableHead>Tax Group</TableHead>
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
                                            <TableCell>{item.supplierName}</TableCell>
                                            <TableCell>{item.unitOfMeasure}</TableCell>
                                            <TableCell>{item.quantity}</TableCell>
                                            <TableCell>{item.price}</TableCell>
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