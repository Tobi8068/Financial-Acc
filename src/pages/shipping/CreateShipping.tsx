import { useState } from "react";
import { Upload } from 'lucide-react';
import { TextInput } from "@/components/ui/text-input";
import { SelectInput } from "@/components/ui/select-input";
import { ShippingItem } from "@/types/shipping";
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
import { Notes } from "@/components/organisms/notes";
import NumberInput from "@/components/organisms/numberInput";
import { Pagination } from '@/components/pagination/Pagination';
import DeleteDialog from '@/components/table/DeleteDialog';
import { useShippingItemsData } from '@/hooks/useShippingData';
import { messageData } from "@/lib/message-data";

interface CreateShippingProps {
    onClick: () => void;
}

export function CreateShipping({ onClick }: CreateShippingProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
    const [formDataItem, setFormDataItem] = useState<ShippingItem>(
        {
            id: '',
            name: '',
            description: '',
            manufacturer: '',
            manufacturer_code: '',
            itemCode: '',
            quantity: 0,
            approved_quantity: 0,
        }
    );
    const [formData, setFormData] = useState<any>(
        {
            name: '',
            other: '',
            carrier: '',
            notes: '',
            packingList: '',
            tracking: false,
        }
    );

    const { data, totalPages, totalItems, itemsPerPage } = useShippingItemsData(
        currentPage,
    );

    const handleChange = (field: string, value: any) => {
        setFormData({ ...formData, [field]: value });
        setFormDataItem({ ...formDataItem, [field]: value });
    };

    const handleSaveItem = () => {

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
            <h2 className="text-xl font-semibold mb-6">Add Shipping</h2>
            <div className="w-full flex items-center justify-center">
                <div className="w-[98%] flex flex-col gap-3 item">
                    <div className="grid w-full grid-cols-4 gap-12">
                        <TextInput value={formData.name} text='Name' onChange={(value) => handleChange('name', value)} />
                        <SelectInput
                            label="Other"
                            value={formData.other}
                            onChange={(value) => handleChange('other', value)}
                            options={[
                                { value: 'transfer1', label: 'Transfer' },
                                { value: 'transfer2', label: 'Transfer' },
                                { value: 'transfer3', label: 'Transfer' },
                                { value: 'transfer4', label: 'Transfer' },
                            ]} />
                        <SelectInput
                            label="Carrier"
                            value={formData.carrier}
                            onChange={(value) => handleChange('carrier', value)}
                            options={[
                                { value: 'carrier1', label: 'Carrier 1' },
                                { value: 'carrier2', label: 'Carrier 2' },
                                { value: 'carrier3', label: 'Carrier 3' },
                                { value: 'carrier4', label: 'Carrier 3' },
                            ]} />
                    </div>
                    <div className="grid w-full grid-cols-4 gap-12">
                        <TextInput value={formData.notes} text='Notes' onChange={(value) => handleChange('notes', value)} />
                        <div className="flex flex-col gap-3 items-start">
                            <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 invisible">1</span>
                            <div className="flex items-center">
                                <input type="checkbox" />
                                <span className="ml-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Turn to Packing List</span>
                            </div>
                        </div>
                        <TextInput value={formData.tracking} text='Tracking' onChange={(value) => handleChange('tracking', value)} />
                    </div>
                    <h2 className="font-semibold text-[18px] text-[#636692]">Items</h2>
                    <div className='rounded-lg border bg-white'>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className='pl-6'>Name</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Manufacturer Code</TableHead>
                                    <TableHead>Manufacturer Name</TableHead>
                                    <TableHead>Item Code</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    data.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell className='pl-6 text-[#181D27] font-semibold'>{item.name}</TableCell>
                                            <TableCell className='text-[#535862]'>{item.description}</TableCell>
                                            <TableCell className='text-[#535862]'>{item.manufacturer_code}</TableCell>
                                            <TableCell className='text-[#535862]'>{item.manufacturer}</TableCell>
                                            <TableCell className='text-[#535862]'>{item.itemCode}</TableCell>
                                            <TableCell className='text-[#535862]'>{item.quantity}</TableCell>
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
                    <h2 className="font-semibold text-[18px] text-[#636692]">New Item</h2>
                    <div className="w-full grid grid-cols-10 gap-3">
                        <div className="col-span-2"><TextInput value={formData.name} text='Name' onChange={(value) => handleChange('name', value)} /></div>
                        <div className="col-span-4"><TextInput value={formData.description} text='Description' onChange={(value) => handleChange('description', value)} /></div>
                        <div className="col-span-1"><TextInput value={formData.manufacturer} text='Manufacturer Name' onChange={(value) => handleChange('manufacturer', value)} /></div>
                        <div className="col-span-1"><TextInput value={formData.manufacturer_code} text='Manufacturer Code' onChange={(value) => handleChange('manufacturer_code', value)} /></div>
                        <div className="col-span-1"><TextInput value={formData.itemCode} text='Item Code' onChange={(value) => handleChange('itemCode', value)} /></div>
                        <div className="col-span-1">
                            <NumberInput label="Approved Quantity" value={formDataItem.quantity} onChange={(value) => handleChange('approved_quantity', value)} />
                        </div>
                    </div>
                    <hr className="border-t border-[#D7D8E4] w-full" />
                    <div className="w-full flex gap-4 justify-end">
                        <span className="cursor-pointer bg-[#3A3B55] px-3 py-1 rounded-md text-white w-fit" onClick={handleSaveItem}>Save</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        {/* Notes Section */}
                        <Notes messages={messageData} />

                        {/* Documents Section */}
                        <div className="bg-transparent">
                            <h2 className="text-lg font-semibold text-gray-900 mb-6">Documents</h2>
                            <div className="space-y-3">
                                {[1, 2, 3].map((index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-white"
                                    >
                                        <input
                                            type="text"
                                            placeholder="Upload Document"
                                            className="flex-1 bg-transparent focus:outline-none"
                                            readOnly
                                        />
                                        <Upload className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 flex justify-end">
                                <button className="px-4 py-2 bg-[#3A3B55] text-white rounded-lg hover:bg-[#2c3b4f] transition-colors">
                                    Add Document
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex justify-end">
                        <div className="bg-[#3A3B55] px-[18px] py-[8px] rounded-md cursor-pointer" onClick={onClick}>
                            <span className="text-white font-semibold">Create</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}