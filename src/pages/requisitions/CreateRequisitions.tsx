import { useState, useEffect } from "react";
import { TextInput } from "@/components/ui/text-input";
import { SelectInput } from "@/components/ui/select-input";
import { Checkbox } from '@/components/ui/checkbox';
import { capitalizeLetter } from "@/lib/utils";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useRequisitionItemsData } from "@/hooks/useRequisitionsData";
import { Pagination } from '../../components/pagination/Pagination';

export function CreateRequisitions() {
    const [formData, setFormData] = useState<any>(
        {
            requisition_number: 0,
            ship_to: '',
            bill_to: '',
            department: '',
            approved_by: 1,
            created_by: 1,
            status: 'created',
            items: []
        }
    );
    const [formItemData, setFormItemData] = useState<any>(
        {
            item_name: '',
            description: '',
            measure_unit: '',
            manufacturer: '',
            manufacturer_code: '',
            supplier: '',
            quantity: 0,
            price: 0,
            tax_group: '',
            reception_quantity: 1
        }
    );
    const [unitList, setUnitList] = useState<any[]>([]);
    const [taxList, setTaxList] = useState<any[]>([]);
    const [departmentList, setDepartmentList] = useState<any[]>([]);

    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const responseUnit = await fetch(`${import.meta.env.VITE_BASE_URL}/order-units`);
                const dataUnit = await responseUnit.json();
                setUnitList(dataUnit);

                const responseTax = await fetch(`${import.meta.env.VITE_BASE_URL}/tax-info`);
                const taxValue = await responseTax.json();
                setTaxList(taxValue);
               
                const responseDepartment = await fetch(`${import.meta.env.VITE_BASE_URL}/department`);
                const departmentValue = await responseDepartment.json();
                setDepartmentList(departmentValue);

            } catch (error) {
                console.error('Error fetching projects and Tax:', error);
            }
        };
        fetchProjects();
    }, [])
   
     
    const { data, totalPages, totalItems, itemsPerPage, refreshData } = useRequisitionItemsData(currentPage);

    const handleFormDataChange = (field: string, value: any) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleFormItemDataChange = (field: string, value: any) => {
        setFormItemData({ ...formItemData, [field]: value });
    };

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedItems(data.map(item => item.id));
        } else {
            setSelectedItems([]);
        }
    };

    const handleSelectItem = (id: string, checked: boolean) => {
        if (checked) {
            setSelectedItems([...selectedItems, Number(id)]);
        } else {
            setSelectedItems(selectedItems.filter(item => item !== Number(id)));
        }
    };

    const handleSaveItem = () => {
        alert("Okay")
    }
 
    return (
        <div className="w-full flex flex-col justify-start overflow-y-auto p-6 h-[calc(100vh-160px)]">
            <h2 className="text-xl font-semibold mb-6">Create Requisition</h2>
            <div className="w-full flex items-center justify-center">
                <div className="w-[98%] flex flex-col gap-3 item">
                    <div className="grid w-full grid-cols-4 gap-x-12 gap-y-4">
                        <TextInput text='Ship To' onChange={(value) => handleFormDataChange('ship_to', value)} />
                        <TextInput text='Bill To' onChange={(value) => handleFormDataChange('bill_to', value)} />
                        <SelectInput
                            label="Department"
                            value={departmentList.length > 0 ? departmentList.filter(item => item.id === formData.department).at(0) : 1}
                            onChange={(value) => handleFormItemDataChange('department', departmentList.filter(item => item.name === value).at(0).id)}
                            options={departmentList.map(item => item.name).map(item => ({
                                value: item,
                                label: item,
                        }))} />
        
                        <SelectInput
                            label="Status"
                            value=''
                            onChange={(value) => handleFormDataChange('status', value)}
                            options={[
                                { value: 'need-approval', label: 'Need Approval' },
                                { value: 'approved', label: 'Approved' },
                                { value: 'paid', label: 'Paid' },
                                { value: 'waiting-payment', label: 'Waiting Payment' },
                                { value: 'close-complete', label: 'Close/Complete' },
                            ]} />
                    </div>
                    <h2 className="font-semibold text-[18px] text-[#636692]">Requistion Items</h2>
                    <div className='rounded-lg border bg-white'>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-12 flex items-center justify-center">
                                        <Checkbox
                                            checked={selectedItems.length === data.length}
                                            onCheckedChange={handleSelectAll}
                                        />
                                    </TableHead>
                                    <TableHead className='pl-6'>Name</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Manufacturer</TableHead>
                                    <TableHead>Manufacturer Code</TableHead>
                                    <TableHead>Supplier</TableHead>
                                    <TableHead>Unit of Measure</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Net Amount</TableHead>
                                    <TableHead>Tax Amount</TableHead>
                                    <TableHead>Tax Group</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    data.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="w-12 flex items-center justify-center">
                                                <Checkbox checked={selectedItems.includes(item.id)} onCheckedChange={(checked) => handleSelectItem(item.id, checked)}></Checkbox>
                                            </TableCell>
                                            <TableCell className='pl-6'>{item.name}</TableCell>
                                            <TableCell>{item.description}</TableCell>
                                            <TableCell>{item.manufacturer}</TableCell>
                                            <TableCell>{item.manufacturerCode}</TableCell>
                                            <TableCell>{item.supplierName}</TableCell>
                                            <TableCell>{item.unitOfMeasure}</TableCell>
                                            <TableCell>{item.quantity}</TableCell>
                                            <TableCell>{item.price}</TableCell>
                                            <TableCell>{item.netAmount}</TableCell>
                                            <TableCell>{item.taxAmount}</TableCell>
                                            <TableCell>{item.taxGroup}</TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        itemsPerPage={itemsPerPage}
                        totalItems={totalItems}
                    />
                    <h2 className="font-semibold text-[18px] text-[#636692]">Requistion Items</h2>
                    <div className="flex flex-col gap-2 w-full">
                        <div className="grid grid-cols-5 gap-4">
                            <div className="col-span-1 grid grid-row-2 gap-4">
                                <TextInput text='Name' onChange={(value) => handleFormItemDataChange('item_name', value)} />
                                <TextInput text='Description' onChange={(value) => handleFormItemDataChange('description', value)} />
                            </div>
                            <div className="col-span-2 grid grid-row-2 gap-4">
                                <div className="grid grid-cols-3 gap-4">
                                    <TextInput text='Quantity' onChange={(value) => handleFormItemDataChange('quantity', value)} />
                                    {/* <SelectInput
                                        label="Status"
                                        value={capitalizeLetter(formData.p_status)}
                                        onChange={(value) => handleFormItemDataChange('p_status', value.toLowerCase())}
                                        options={[
                                            { value: ' ', label: ' ' },
                                            { value: 'Created', label: 'Created' },
                                            { value: 'Waiting_Approval', label: 'Waiting Approval' },
                                            { value: 'Approved', label: 'Approved' },
                                            { value: 'Ended', label: 'Ended' },
                                            { value: 'Partially_Approved', label: 'Partially Approved' },
                                    ]} />
  */}
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <TextInput text='Price' onChange={(value) => handleFormItemDataChange('price', Number(value))} />
                                    {/* <CurrencyInput
                                        label="Tax Amount"
                                        value={formData.taxAmount}
                                        onChange={(value) => handleFormItemDataChange('taxAmount', value)}
                                        currency="USD"
                                        onCurrencyChange={(currency) => handleFormItemDataChange('totalTaxCurrency', currency)} /> */}
                                    <SelectInput
                                        label="Unit of Measure"
                                        value={unitList.length > 0 ? unitList.filter(item => item.id === formData.measure_unit).at(0) : 1}
                                        onChange={(value) => handleFormItemDataChange('measure_unit', unitList.filter(item => item.orderUnitName === value).at(0).id)}
                                        options={unitList.map(item => item.orderUnitName).map(item => ({
                                            value: item,
                                            label: item,
                                        }))} />
                                </div>
                            </div>
                            <div className="col-span-2 grid grid-row-2 gap-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <SelectInput
                                        label="Tax Group"
                                        value={taxList.length > 0 ? taxList.filter(item => item.id === formData.tax_group).at(0) : 1}
                                        onChange={(value) => handleFormItemDataChange('tax_group', taxList.filter(item => item.tax_name === value).at(0).id)}
                                        options={taxList.map(item => item.tax_name).map(item => ({
                                            value: item,
                                            label: item,
                                        }))} />
                                    <TextInput text="Manufacturer" onChange={(value) => handleFormItemDataChange('manufacturer', value)} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <TextInput text="Supplier" onChange={(value) => handleFormItemDataChange('supplierName', value)} />
                                    <TextInput text="Manufacturer Code" onChange={(value) => handleFormItemDataChange('manufacturerCode', value)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex gap-4 justify-end">
                        <span className="cursor-pointer bg-[#3A3B55] px-3 py-1 rounded-md text-white w-fit" onClick={handleSaveItem}>Save</span>
                    </div>
                    <div className="w-full flex justify-end">
                        <div className="bg-[#3A3B55] px-[18px] py-[8px] rounded-md cursor-pointer">
                            <span className="text-white font-semibold">Create Requisition</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}