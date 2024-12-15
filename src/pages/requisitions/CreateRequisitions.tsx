import { useState } from "react";
import { TextInput } from "@/components/ui/text-input";
import { SelectInput } from "@/components/ui/select-input";
import { CurrencyInput } from "@/components/ui/currency-input";
import { RequisitionsItemsData } from "@/types/requisitions";

interface CreateRequisitionsProps {
    onClick: () => void;
}

export function CreateRequisitions({ onClick }: CreateRequisitionsProps) {
    const [formData, setFormData] = useState<RequisitionsItemsData>({
        name: '',
        description: '',
        quantity: 0,
        price: 0,
        total: 0,
        taxGroup: '',
        taxAmount: 0,
        unitOfMeasure: '',
        supplier: '',
        supplierCode: '',
        manufacturerName: '',
        manufacturerCode: '',
    })

    const handleChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }
    return (
        <div className="w-full flex flex-col justify-center overflow-y-auto">
            <h2 className="text-xl font-semibold mb-6">Create Requisition</h2>
            <div className="w-full flex items-center justify-center">
                <div className="w-[98%] flex flex-col gap-3">
                    <div className="grid w-full grid-cols-4 gap-12">
                        <SelectInput
                            label="Ship To"
                            value=''
                            onChange={(value) => handleChange('status', value)}
                            options={[
                                { value: 'Ship_1', label: 'Ship To 1' },
                                { value: 'Ship_2', label: 'Ship To 2' },
                            ]} />
                        <SelectInput
                            label="Bill To"
                            value=''
                            onChange={(value) => handleChange('status', value)}
                            options={[
                                { value: 'Bill_1', label: 'Bill To 1' },
                                { value: 'Bill_2', label: 'Bill To 2' },
                            ]} />
                        <SelectInput
                            label="Department"
                            value=''
                            onChange={(value) => handleChange('status', value)}
                            options={[
                                { value: 'Department_1', label: 'Department 1' },
                                { value: 'Department_2', label: 'Department 2' },
                            ]} />
                        <SelectInput
                            label="Status"
                            value=''
                            onChange={(value) => handleChange('status', value)}
                            options={[
                                { value: 'need-approval', label: 'Need Approval' },
                                { value: 'approved', label: 'Approved' },
                                { value: 'paid', label: 'Paid' },
                                { value: 'waiting-payment', label: 'Waiting Payment' },
                                { value: 'close-complete', label: 'Close/Complete' },
                            ]} />
                    </div>
                    <h2 className="font-semibold text-[18px] text-[#636692]">Requistion Items</h2>
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
            </div>
            <div className="w-full flex justify-end">
                <div className="bg-[#3A3B55] px-[18px] py-[8px] rounded-md cursor-pointer" onClick={onClick}>
                    <span className="text-white font-semibold">Create Requisition</span>
                </div>
            </div>
        </div>
    )
}