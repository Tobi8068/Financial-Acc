import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@/components/ui/table';
import { formatDate } from '@/lib/date';
import { ShippingData } from '@/types/shipping';

interface ShippingDetailProps {
    props: ShippingData;
    onClickCarrier: () => void;
  }
export default function ShippingDetail({ props, onClickCarrier }: ShippingDetailProps) {
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
    // const [viewCarrierID, setviewCarrierID] = useState<string | null>(null);
    // const [carrierDialogOpen, setCarrierDialogOpen] = useState(false);

    // const viewCarrier = () => {
    //     setCarrierDialogOpen(true);
    //     setviewCarrierID();
    //   };

    return (
        <div>
            <h2 className="text-xl font-semibold">Shipping Details</h2>
            <div className="flex flex-col gap-6 rounded-lg p-6 shadow-sm">
                <div className="space-y-2">
                    <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[128px]">Number:&nbsp;</span><span>{props.id}</span></div>
                    <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[128px]">Name:&nbsp;</span><span>{props.name}</span></div>
                    <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[128px]">Notes:&nbsp;</span><span>{props.notes}</span></div>
                    <div className="text-md text-[#2B2D40] flex"><span className="font-bold w-[128px]">Date Created:&nbsp;</span><span>{formatDate(props.dateCreated)}</span></div>
                    <div className="text-md text-[#2B2D40] flex  cursor-pointer" onClick={ onClickCarrier }><span className="font-bold w-[128px]" >Carrier:&nbsp;</span><span>{props.carrier}</span>
                         
                    </div>
                </div>

                <div className='flex flex-col gap-6 mt-4'>
                    <h2 className="text-lg font-semibold">Shipping Items</h2>
                    <div className='rounded-lg border bg-white'>
                        <Table>
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
                            <TableBody>
                                {
                                    data.map((item, index) => (
                                        <TableRow key={index}>
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