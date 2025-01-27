import { useEffect, useState } from "react";
import { Badge } from '@/components/ui/badge';
import { TextInput, TextAreaInput } from "@/components/ui/text-input";
import { SelectInput } from "@/components/ui/select-input";
import { Checkbox } from '@/components/ui/checkbox';
import { TransfertItemStatus } from "@/types/transferts";
import { MoreVertical, Undo2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import NumberInput from "@/components/organisms/numberInput";
import { Pagination } from '@/components/pagination/Pagination';
import DeleteDialog from '@/components/table/DeleteDialog';
import { useTransferItemsData } from '@/hooks/useTransfertData';
import useNotification from "@/hooks/useNotifications";

export function CreateTransfert({ onClickUndo }: { onClickUndo: (value: any) => void }) {
    const { showNotification } = useNotification();

    const [binList, setBinList] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    const [formItemData, setFormItemData] = useState<any>({
        item_name: '',
        item_description: '',
        item_manufacturer: '',
        item_manufacturer_code: '',
        item_quantity: 0,
        item_bin: '',
        status: 'approve',
    });

    const [formData, setFormData] = useState<any>({
        date: '',
        items: [],
        reason: '',
        createdBy: {
            name: '',
            avatar: '',
        },
        status: 'transfered',
        bin: '',
    });
    const { data, totalPages, totalItems, itemsPerPage, refreshData } = useTransferItemsData(
        currentPage,
    );
    useEffect(() => {
        const fetchDatas = async () => {
            try {
                const responseBin = await fetch(`${import.meta.env.VITE_BASE_URL}/bins`);
                const dataPro = await responseBin.json();
                setBinList(dataPro);

            } catch (error) {
                console.error('Error fetching Data:', error);
            }
        };
        fetchDatas();
    }, [])

    const handleFormData = (field: string, value: any) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleFormItemData = (field: string, value: any) => {
        setFormItemData({ ...formItemData, [field]: value });
    };

    const handleSaveItem = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/transfert-items`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formItemData),
            });
            if (response.status === 201) {
                showNotification('Item created successfully', 'success');
                setFormItemData({
                    item_name: '',
                    item_description: '',
                    item_manufacturer: '',
                    item_manufacturer_code: '',
                    item_quantity: 0,
                    item_bin: '',
                    status: 'approve',
                });
                refreshData();
            } else {
                showNotification('Failed Item creating ', 'error');
            }
        } catch (error) {
            console.error('Error creating item:', error);
        }
        console.log("after:::::::::::::", formItemData)
    }

    const handleDelete = (id: string) => {
        setDeleteDialogOpen(true);
        setDeleteItemId(id);
    };

    const handleConfirmDelete = async () => {
        if (deleteItemId) {
            console.log('Deleting item with id:', deleteItemId);
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/transfert-items/${deleteItemId}`, {
                    method: 'DELETE',
                });
                if (response.status === 204) {
                    showNotification('Item deleted successfully', 'success');
                    refreshData();
                } else {
                    showNotification('Failed Item deleting ', 'error');
                }
            } catch (error) {
                console.error('Error deleting item:', error);
            }
        };
        setDeleteDialogOpen(false);
        setDeleteItemId(null);
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

    const getItemStatusBadge = (status: TransfertItemStatus) => {
        const styles = {
            Approved: 'bg-green-100 text-green-800',
            Declined: 'bg-[#FEF6ED] text-[#C4320A]',
            Partially_Approved: 'bg-red-100 text-red-800',
        };

        return (
            <Badge className={styles[status]} variant="secondary">
                {status.replace("_", " ").replace("0", "/")}
            </Badge>
        );
    };

    return (
        <div className="w-full flex flex-col justify-start overflow-y-auto p-6 h-[calc(100vh-160px)]">
            <div className="flex item-center justify-between pb-2">
                <h2 className="text-xl font-semibold">Create Transferts</h2>
                <div className="flex cursor-pointer p-2 rounded-full hover:bg-white">
                    <Undo2 onClick={() => onClickUndo(1)} />
                </div>
            </div>
            <div className="flex w-full item-center gap-2 pb-2">
                <div className="flex item-center">
                    {/* <SelectInput
                            label="Status"
                            value={formData.status}
                            onChange={(value) => handleFormData('status', value)}
                            options={[
                                { value: 'transfered', label: 'Transfered' },
                                { value: 'approve', label: 'Approved' },
                            ]} /> */}
                    <TextAreaInput text='Reason' value={formData.reason} onChange={(value) => handleFormData('reason', value)} />
                </div>
                <div className="flex w-48 item-center">
                    <SelectInput
                        label="Bin"
                        value={formData.bin}
                        onChange={(value) => handleFormData('bin', value)}
                        options={binList?.map(item => ({
                            value: item.id,
                            label: item.bin_name
                        }))}
                    />
                </div>
            </div>
            <h2 className="font-semibold text-[18px] text-[#636692]">Items</h2>
            <div className='rounded-lg border bg-white mb-2'>
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
                            <TableHead>Quantity</TableHead>
                            <TableHead>Bin</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            data.length !== 0 && data.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell className="w-12 flex items-center justify-center">
                                        <Checkbox checked={selectedItems.includes(item.pid)} onCheckedChange={(checked) => handleSelectItem(item.pid, checked)} />
                                    </TableCell>
                                    <TableCell className='pl-6 text-[#181D27] font-semibold'>{item.name}</TableCell>
                                    <TableCell className='text-[#535862]'>{item.description}</TableCell>
                                    <TableCell className='text-[#535862]'>{item.manufacturer}</TableCell>
                                    <TableCell className='text-[#535862]'>{item.manufacturer_code}</TableCell>
                                    <TableCell className='text-[#535862]'>{item.quantity}</TableCell>
                                    <TableCell className='text-[#535862]'>{item.bin}</TableCell>
                                    <TableCell className='text-[#535862]'>{getItemStatusBadge(item.status)}</TableCell>
                                    <TableCell>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <button className="p-2 hover:bg-gray-100 rounded-full">
                                                    <MoreVertical className="h-4 w-4" />
                                                </button>
                                            </PopoverTrigger>
                                            <PopoverContent align="end" className='w-24 cursor-pointer' sideOffset={2}>
                                                <ul className="space-y-2">
                                                    <li onClick={() => alert("Hi")}>Edit</li>
                                                    <li onClick={() => handleDelete(item.id)}>Delete</li>
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
            <div className="w-full grid grid-cols-10 py-2 gap-3">
                <div className="col-span-2"><TextInput text='Name' value={formItemData.item_name} onChange={(value) => handleFormItemData('item_name', value)} /></div>
                <div className="col-span-2"><TextInput text='Description' value={formItemData.item_description} onChange={(value) => handleFormItemData('item_description', value)} /></div>
                <div className="col-span-2"><TextInput text='Manufacturer' value={formItemData.item_manufacturer} onChange={(value) => handleFormItemData('item_manufacturer', value)} /></div>
                <div className="col-span-2"><TextInput text='Manufacturer Code' value={formItemData.item_manufacturer_code} onChange={(value) => handleFormItemData('item_manufacturer_code', value)} /></div>

                <div className="col-span-1">
                    <NumberInput label="Quantity" value={formItemData.item_quantity} onChange={(value) => handleFormItemData('item_quantity', value)} />
                </div>
                <div className="col-span-1">
                    <SelectInput
                        label="Bin"
                        value={formItemData.bin}
                        onChange={(value) => handleFormItemData('item_bin', value)}
                        options={binList?.map(item => (
                            {
                                value: item.id,
                                label: item.bin_name,
                            }
                        ))}
                    />
                </div>
            </div>
            <hr className="border-t border-[#D7D8E4] w-full" />
            <div className="w-full flex justify-end mt-4 gap-4 font-semibold">
                <div className="bg-[#3A3B55] px-[18px] py-[8px] rounded-md cursor-pointer">
                    <span className="text-white" onClick={handleSaveItem}>Save</span>
                </div>
                <div className="bg-[#3A3FF2] px-[18px] py-[8px] rounded-md cursor-pointer" onClick={() => alert("Okay")}>
                    <span className="text-white">Create Transfert</span>
                </div>
            </div>
        </div>
    )
}