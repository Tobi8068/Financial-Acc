import { useEffect, useState } from "react";
import { Upload, Undo2 } from 'lucide-react';
import { TextInput } from "@/components/ui/text-input";
import { SelectInput } from "@/components/ui/select-input";
import { Checkbox } from '@/components/ui/checkbox';
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
import { useReceptionItemsData } from '@/hooks/useReceptionsData';
import { messageData } from "@/lib/message-data";
import useNotification from "@/hooks/useNotifications";

interface CreateReceptionsProps {
    onClickUndo: (value: any) => void;
}

export function CreateReceptions({ onClickUndo }: CreateReceptionsProps) {
    const { showNotification } = useNotification();
    const [formData, setFormData] = useState<any>(
        {
            name: '',
            item_code: '',
            description: '',
            manufacturer: '',
            manufacturer_code: '',
            quantity: 0,
            bin: 0,
        }
    );
    const [formItemData, setFormItemData] = useState<any>(
        {
            item_name: '',
            item_code: '',
            item_description: '',
            item_manufacturer: '',
            item_manufacturer_code: '',
            item_quantity: 0,
            item_bin: 0,
        }
    );
    const [currentPage, setCurrentPage] = useState<number>(1);

    const { data, totalPages, totalItems, itemsPerPage, refreshData } = useReceptionItemsData(
        currentPage,
    );

    const [binList, setBinList] = useState<any[]>([]);

    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
    const [deleteItemId, setDeleteItemId] = useState<string | null>(null);

    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    useEffect(() => {
        const fetchBin = async () => {
            try {
                const binList = await fetch(`${import.meta.env.VITE_BASE_URL}/bins`);
                const binData = await binList.json();
                setBinList(binData);
            } catch (error) {
                console.error('Error fetching Bin List:', error);
            }
        }
        fetchBin();
    }, [])

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

    const handleFormData = (field: string, value: any) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleFormItemData = (field: string, value: any) => {
        setFormItemData({ ...formItemData, [field]: value });
    };

    const handleSaveItem = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/receptions-items`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formItemData),
            });
            if (response.status === 201) {
                showNotification('Item created successfully', 'success');
                setFormItemData({
                    item_name: '',
                    item_code: '',
                    item_description: '',
                    item_manufacturer: '',
                    item_manufacturer_code: '',
                    item_quantity: 0,
                    item_bin: 0,
                });
                refreshData();
            }
        } catch (error) {
            showNotification('Failed saving item', 'error');
        }
    }

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
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold mb-6">Create Reception</h2>
                <div className="flex cursor-pointer p-2 rounded-full hover:bg-white">
                    <Undo2 onClick={() => onClickUndo(1)} />
                </div>
            </div>
            <div className="w-full flex items-center justify-center">
                <div className="w-[98%] flex flex-col gap-3 item">
                    <div className="grid w-full grid-cols-4 gap-12">
                        <TextInput value={formData.name} text='Reception No.' onChange={(value) => handleFormData('name', value)} />
                        <TextInput value={formData.name} text='Storekeeper' onChange={(value) => handleFormData('name', value)} />
                    </div>
                    <h2 className="font-semibold text-[18px] text-[#636692]">Items</h2>
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
                                    <TableHead className='pl-6'>Name{formItemData.quantity}</TableHead>
                                    <TableHead>Item Code</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Manufacturer</TableHead>
                                    <TableHead>Manufacturer Code</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Bin</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    data.map((item, index) => (
                                        <TableRow key={index} className={selectedItems.includes(item.id) ? 'bg-gray-50' : ''}>
                                            <TableCell className="w-12 flex items-center justify-center">
                                                <Checkbox checked={selectedItems.includes(item.pid)} onCheckedChange={(checked) => handleSelectItem(item.pid, checked)} />
                                            </TableCell>
                                            <TableCell className='pl-6 text-[#181D27] font-semibold'>{item.name}</TableCell>
                                            <TableCell className='text-[#535862]'>{item.item_code}</TableCell>
                                            <TableCell className='text-[#535862]'>{item.description}</TableCell>
                                            <TableCell className='text-[#535862]'>{item.manufacturer}</TableCell>
                                            <TableCell className='text-[#535862]'>{item.manufacturer_code}</TableCell>
                                            <TableCell className='text-[#535862]'>{item.quantity}</TableCell>
                                            <TableCell className='text-[#535862]'>{item.bin.bin_name}</TableCell>
                                            <TableCell>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <button className="p-2 bg-white hover:bg-gray-100 shadow-lg rounded-full">
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
                        <div className="col-span-2"><TextInput value={formItemData.item_name} text='Name' onChange={(value) => handleFormItemData('item_name', value)} /></div>
                        <div className="col-span-2"><TextInput value={formItemData.item_description} text='Description' onChange={(value) => handleFormItemData('item_description', value)} /></div>
                        <div className="col-span-2"><TextInput value={formItemData.item_code} text='Item Code' onChange={(value) => handleFormItemData('item_code', value)} /></div>
                        <div className="col-span-1"><TextInput value={formItemData.item_manufacturer} text='Manufacturer' onChange={(value) => handleFormItemData('item_manufacturer', value)} /></div>
                        <div className="col-span-1"><TextInput value={formItemData.item_manufacturer_code} text='Manufacturer Code' onChange={(value) => handleFormItemData('item_manufacturer_code', value)} /></div>
                        <div className="col-span-1">
                            <NumberInput label="Quantity" value={formItemData.item_quantity} onChange={(value) => handleFormItemData('item_quantity', Number(value))} />
                        </div>
                        <div className="col-span-1">
                            <SelectInput
                                label="Bin"
                                value={formItemData.item_bin}
                                onChange={(value) => handleFormItemData('item_bin', value)}
                                options={binList?.map(item => ({
                                    value: item.id,
                                    label: item.bin_name
                                }))}
                            />
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

                    <hr className="border-t border-[#D7D8E4] w-full" />

                    <div className="w-full flex justify-end">
                        <div className="bg-[#3A3B55] px-[18px] py-[8px] rounded-md cursor-pointer" >
                            <span className="text-white font-semibold">Create Requisition</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}