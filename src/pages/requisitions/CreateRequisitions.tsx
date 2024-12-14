import { useState } from "react";
import { TextInput } from "@/components/ui/text-input";
import { DateInput } from "@/components/ui/date-input";
import { SelectInput } from "@/components/ui/select-input";
import { CurrencyInput } from "@/components/ui/currency-input";

interface CreateRequisitionsProps {
    onClick: () => void;
}

export function CreateRequisitions({ onClick }: CreateRequisitionsProps) {
    const [formData, setFormData] = useState({
        RequisitionsNumber: '',
        dateCreated: null as Date | null,
        client: '',
        requiredDate: null as Date | null,
        status: 'need-approval',
        shipTo: '',
        billTo: '',
        totalTaxAmount: '',
        totalTaxCurrency: 'USD',
        totalNetAmount: '',
        totalNetCurrency: 'USD',
        totalAmount: '',
        totalAmountCurrency: 'USD',
        contact: ''
    })

    const handleChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }
    return (
        <div className="w-full flex flex-col justify-center overflow-y-auto">
            <h2 className="text-xl font-semibold mb-6">Create Requisitions</h2>
            <div className="w-full flex items-center justify-center">
                <div className="w-[40%] flex flex-col gap-3">
                    <div className="grid w-full grid-cols-2 gap-12">
                        <TextInput text='Requisitions Number#' onChange={(value) => handleChange('RequisitionsNumber', value)} />
                        <DateInput text='Date Created' onChange={(value) => handleChange('dateCreated', value)} />
                    </div>
                    <TextInput text='Client' onChange={(value) => handleChange('client', value)} />
                    <div className="grid w-full grid-cols-2 gap-12">
                        <DateInput text="Required Date" onChange={(value) => handleChange('requiredDate', value)} />
                        <SelectInput
                            label="Status"
                            value={formData.status}
                            onChange={(value) => handleChange('status', value)}
                            options={[
                                { value: 'need-approval', label: 'Need Approval' },
                                { value: 'approved', label: 'Approved' },
                                { value: 'paid', label: 'Paid' },
                                { value: 'waiting-payment', label: 'Waiting Payment' },
                                { value: 'close-complete', label: 'Close/Complete' },
                            ]} />
                    </div>
                    <div className="grid w-full grid-cols-2 gap-12">
                        <TextInput text="Ship To" onChange={(value) => handleChange('shipTo', value)} />
                        <TextInput text="Bill To" onChange={(value) => handleChange('billTo', value)} />
                    </div>
                    <div className="grid w-full grid-cols-2 gap-12">
                        <CurrencyInput
                            label="Total Tax Amount"
                            value={formData.totalTaxAmount}
                            onChange={(value) => handleChange('totalTaxAmount', value)}
                            currency={formData.totalTaxCurrency}
                            onCurrencyChange={(currency) => handleChange('totalTaxCurrency', currency)} />
                        <CurrencyInput
                            label="Total Net Amount"
                            value={formData.totalNetAmount}
                            onChange={(value) => handleChange('totalNetAmount', value)}
                            currency={formData.totalNetCurrency}
                            onCurrencyChange={(currency) => handleChange('totalNetCurrency', currency)} />
                    </div>
                    <div className="grid w-full grid-cols-2 gap-12">
                        <CurrencyInput
                            label="Total Amount"
                            value={formData.totalAmount}
                            onChange={(value) => handleChange('totalAmount', value)}
                            currency={formData.totalAmountCurrency}
                            onCurrencyChange={(currency) => handleChange('totalAmountCurrency', currency)} />
                        <SelectInput
                            label="Contact"
                            value={formData.contact}
                            onChange={(value) => handleChange('contact', value)}
                            options={[
                                { value: 'contact1', label: 'Contact 1' },
                                { value: 'contact2', label: 'Contact 2' },
                                { value: 'contact3', label: 'Contact 3' }
                            ]} />
                    </div>
                    <div className="w-fill flex gap-3">
                        <input type="checkbox"></input> <span className="text-gray-900">Create PDF</span>
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-end">
                <div className="bg-[#3A3B55] px-[18px] py-[8px] rounded-md cursor-pointer" onClick={onClick}>
                    <span className="text-white font-semibold">Send for Approval</span>
                </div>
            </div>
        </div>
    )
}