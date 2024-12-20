import { useState } from "react";
import { TextInput } from "@/components/ui/text-input";
import { SelectInput } from "@/components/ui/select-input";
import { SuppliersData } from "@/types/suppliers";
import { MoreVertical } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Pagination } from '../../components/pagination/Pagination';
import DeleteDialog from '@/components/table/DeleteDialog';
import { useSuppliersItemsData } from '@/hooks/useSuppliersData';

interface CreateSuppliersProps {
    onClick: () => void;
}

export function CreateSuppliers({ onClick }: CreateSuppliersProps) {

    const [formData, setFormData] = useState<SuppliersData>(
        {
            id: '',
            supplierName: '',
            supplierCode: '',
            address: '',
            appartment: '',
            street: '',
            city: '',
            state: '',
            postalAddress: '',
            country: '',
            billingAddress: '',
            shippingAddress: '',
            bankName: '',
            accountNumber: 0,
            transitNumber: 0,
            currency: '',
            purchaseContact: '',
            purchaseOrder: '',
            status: 'Approved',
        }
    );
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState<string | null>(null);

    const { data, totalPages, totalItems, itemsPerPage } = useSuppliersItemsData(
        currentPage,
    );

    const handleChange = (field: string, value: any) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleDelete = (id: string) => {
        setDeleteDialogOpen(true);
        setDeleteItemId(id);
    };

    const handleConfirmDelete = () => {
        if (deleteItemId) {
            console.log('Deleting item with id:', deleteItemId);
            setDeleteDialogOpen(false);
            setDeleteItemId(null);
        }
    };

    return (
        <div className="w-full flex flex-col justify-start overflow-y-auto p-6 h-[calc(100vh-160px)]">
            <h2 className="text-xl font-semibold mb-6">Add Supplier</h2>
            <div className="w-full flex items-center justify-center">
                <div className="w-[98%] flex flex-col gap-3 item">
                    <div className="gap-32 flex flex-row grid-cols-2">
                        <div className="gap-3 flex flex-col w-[60%]">
                            <div className="gap-3 flex flex-col border-b-2 border-gray-300 pb-5">
                                <h2 className="font-semibold text-[18px] text-[#636692]">Basic Info</h2>
                                <div className="grid w-full grid-cols-3 gap-16">
                                    <TextInput text='Supplier Name' onChange={(value) => handleChange('number', value)} />
                                    <TextInput text='Supplier Code' onChange={(value) => handleChange('createdBy', value)} />
                                </div>
                            </div>
                            <div className="gap-3 flex flex-col border-b-2 border-gray-300 pb-5">
                                <h2 className="font-semibold text-[18px] text-[#636692]">Address</h2>
                                <div className="grid w-full grid-cols-6 gap-4">
                                    <TextInput text='Appartment' onChange={(value) => handleChange('appartment', value)} />
                                    <TextInput text='Street' onChange={(value) => handleChange('street', value)} />
                                    <TextInput text='City' onChange={(value) => handleChange('city', value)} />
                                    <TextInput text='State' onChange={(value) => handleChange('state', value)} />
                                    <TextInput text='Postal Address' onChange={(value) => handleChange('postalAddress', value)} />
                                    <SelectInput
                                        label="Country"
                                        value={formData.status}
                                        onChange={(value) => handleChange('country', value)}
                                        options={[
                                            { value: 'us', label: 'US' },
                                            { value: 'uk', label: 'UK' },
                                        ]} />
                                </div>
                                <div className="grid w-full grid-cols-1">
                                    <TextInput text='Billing Address' onChange={(value) => handleChange('billingAddress', value)} />
                                </div>
                                <div className="grid w-full grid-cols-1">
                                    <TextInput text='Shipping Address' onChange={(value) => handleChange('shippingAddress', value)} />
                                </div>
                            </div>
                        </div>
                        <div className="gap-3 flex flex-col w-[40%]">
                            <div className="gap-3 flex flex-col border-b-2 border-gray-300 pb-5">
                                <h2 className="font-semibold text-[18px] text-[#636692]">Bank Details</h2>
                                <div className="grid w-full grid-cols-2 gap-4">
                                    <TextInput text='Bank Name' onChange={(value) => handleChange('bankName', value)} />
                                    <TextInput text='Account Number' onChange={(value) => handleChange('accountNumber', value)} />
                                </div>
                                <div className="grid w-full grid-cols-2 gap-4">
                                    <TextInput text='Transit Number' onChange={(value) => handleChange('transitNumber', value)} />
                                    <SelectInput
                                        label="Currency"
                                        value={formData.status}
                                        onChange={(value) => handleChange('currency', value)}
                                        options={[
                                            { value: '1', label: '1' },
                                            { value: '2', label: '2' },
                                        ]} />
                                </div>
                            </div>
                            <div className="gap-3 flex flex-col border-b-2 border-gray-300 pb-5">
                                <h2 className="font-semibold text-[18px] text-[#636692]">Purchase Order Management</h2>
                                <div className="grid w-full grid-cols-1 gap-4">
                                    <SelectInput
                                        label="Primary Contact for Purchase Order Management"
                                        value={formData.status}
                                        onChange={(value) => handleChange('primaryContact', value)}
                                        options={[
                                            { value: 'contact1', label: 'Contact 1' },
                                            { value: 'contact2', label: 'Contact 2' },
                                        ]} />
                                </div>
                                <div className="grid w-full grid-cols-1 gap-4">
                                    <SelectInput
                                        label="Purchase Order Management"
                                        value={formData.status}
                                        onChange={(value) => handleChange('purchaseOrder', value)}
                                        options={[
                                            { value: 'order1', label: 'Order 1' },
                                            { value: 'order2', label: 'Order 2' },
                                        ]} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="gap-3 flex flex-col pt-4">
                        <h2 className="font-semibold text-[18px] text-[#636692]">Supplier Contacts</h2>
                        <div className='rounded-lg border bg-white'>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className='pl-6'>First Name</TableHead>
                                        <TableHead>Last Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Phone Number</TableHead>
                                        <TableHead>Address</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        data.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell className='pl-6 text-[#181D27] font-semibold'>{item.firstName}</TableCell>
                                                <TableCell className='text-[#535862]'>{item.lastName}</TableCell>
                                                <TableCell className='text-[#535862]'>{item.email}</TableCell>
                                                <TableCell className='text-[#535862]'>+{item.phoneNumber}</TableCell>
                                                <TableCell className='text-[#535862]'>{item.address}</TableCell>
                                                <TableCell className='text-[#535862]'>{item.role}</TableCell>
                                                <TableCell>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <button className="p-2 hover:bg-gray-100 rounded-full">
                                                                <MoreVertical className="h-4 w-4" />
                                                            </button>
                                                        </PopoverTrigger>
                                                        <PopoverContent align="end" className='w-24 cursor-pointer' sideOffset={2}>
                                                            <ul className="space-y-2">
                                                                <li>Edit</li>
                                                                <li onClick={() => handleDelete(item.name)}>Delete</li>
                                                            </ul>
                                                        </PopoverContent>
                                                    </Popover>
                                                </TableCell>
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
                        <DeleteDialog
                            open={deleteDialogOpen}
                            onClose={() => setDeleteDialogOpen(false)}
                            onConfirm={handleConfirmDelete}
                        />
                        <hr className="border-t border-[#D7D8E4] w-full" />
                        <div className="w-full flex justify-end">
                            <div className="bg-[#3A3B55] px-[18px] py-[8px] rounded-md cursor-pointer" onClick={onClick}>
                                <span className="text-white font-semibold">Add Supplier</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}