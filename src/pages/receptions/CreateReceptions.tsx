import { useState } from "react";
import { TextInput } from "@/components/ui/text-input";
import { SelectInput } from "@/components/ui/select-input";
import { CurrencyInput } from "@/components/ui/currency-input";
import { ReceptionItem } from "@/types/receptions";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

interface CreateReceptionsProps {
    onClick: () => void;
}

export function CreateReceptions({ onClick }: CreateReceptionsProps) {
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
    const [formData, setFormData] = useState<ReceptionItem>(
        {
            name: '',
            itemCode: '',
            description: '',
            manufacturerName: '',
            manufacturerCode: '',
            quantity: 0,
            bin: 0,
        }
    );

    const handleChange = (field: string, value: any) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSaveItem = () => {

    }

    const handleSaveAndAddItem = () => {

    }

    return (
        <div className="w-full flex flex-col justify-center overflow-y-auto">
            <h2 className="text-xl font-semibold mb-6">Create Requisition</h2>
            <div className="w-full flex items-center justify-center">
                <div className="w-[98%] flex flex-col gap-3 item">
                    <div className="grid w-full grid-cols-4 gap-12">
                        <TextInput text='Purchase Order Number' onChange={(value) => handleChange('name', value)} />
                        <TextInput text='Storekeeper' onChange={(value) => handleChange('name', value)} />
                    </div>
                    <h2 className="font-semibold text-[18px] text-[#636692]">Items</h2>
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
                    <h2 className="font-semibold text-[18px] text-[#636692]">New Items</h2>
                    <div className="flex flex-col gap-2 w-full">
                        <div className="grid grid-cols-5 gap-8">
                            <div className="col-span-1 grid grid-row-2 gap-4">
                                <TextInput text='Name' onChange={(value) => handleChange('name', value)} />
                                <TextInput text='Description' onChange={(value) => handleChange('description', value)} />
                            </div>
                            <div className="col-span-2 grid grid-row-2 gap-4">
                                <div className="grid grid-cols-3 gap-4">
                                    <TextInput text='Quantity' onChange={(value) => handleChange('quantity', value)} />
                                    <CurrencyInput
                                        label="Price"
                                        value={formData.price.toString()}
                                        onChange={(value) => handleChange('price', value)}
                                        currency="USD"
                                        onCurrencyChange={(currency) => handleChange('totalTaxCurrency', currency)} />
                                    <TextInput text='Total' onChange={(value) => handleChange('client', value)} />
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <SelectInput
                                        label="Status"
                                        value={formData.taxGroup}
                                        onChange={(value) => handleChange('status', value)}
                                        options={[
                                            { value: 'need-approval', label: 'Need Approval' },
                                            { value: 'approved', label: 'Approved' },
                                            { value: 'paid', label: 'Paid' },
                                            { value: 'waiting-payment', label: 'Waiting Payment' },
                                            { value: 'close-complete', label: 'Close/Complete' },
                                        ]} />
                                    <CurrencyInput
                                        label="Tax Amount"
                                        value={formData.taxAmount.toString()}
                                        onChange={(value) => handleChange('totalTaxAmount', value)}
                                        currency="USD"
                                        onCurrencyChange={(currency) => handleChange('totalTaxCurrency', currency)} />
                                    <SelectInput
                                        label="Unit of Measure"
                                        value={formData.unitOfMeasure}
                                        onChange={(value) => handleChange('status', value)}
                                        options={[
                                            { value: 'need-approval', label: 'Need Approval' },
                                            { value: 'approved', label: 'Approved' },
                                            { value: 'paid', label: 'Paid' },
                                            { value: 'waiting-payment', label: 'Waiting Payment' },
                                            { value: 'close-complete', label: 'Close/Complete' },
                                        ]} />
                                </div>
                            </div>
                            <div className="col-span-2 grid grid-row-2 gap-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <TextInput text="Supplier" onChange={(value) => handleChange('shipTo', value)} />
                                    <TextInput text="Supplier Code" onChange={(value) => handleChange('shipTo', value)} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <TextInput text="Manufacturer Name" onChange={(value) => handleChange('shipTo', value)} />
                                    <TextInput text="Manufacturer Code" onChange={(value) => handleChange('shipTo', value)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex gap-4 justify-end">
                        <span className="cursor-pointer bg-white px-3 py-1 rounded-md text-[#414651] w-fit" onClick={handleSaveAndAddItem}>Save & Add Another</span>
                        <span className="cursor-pointer bg-[#3A3B55] px-3 py-1 rounded-md text-white w-fit" onClick={handleSaveItem}>Save</span>
                    </div>
                    <div className="w-full flex justify-end">
                        <div className="bg-[#3A3B55] px-[18px] py-[8px] rounded-md cursor-pointer" onClick={onClick}>
                            <span className="text-white font-semibold">Create Requisition</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}