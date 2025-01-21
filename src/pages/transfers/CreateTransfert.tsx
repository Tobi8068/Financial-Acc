import { useEffect, useState } from "react";
import { Badge } from '@/components/ui/badge';
import { TextInput, TextAreaInput } from "@/components/ui/text-input";
import { SelectInput } from "@/components/ui/select-input";
import { TransfertStatus, TransfertItemStatus } from "@/types/transferts";
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
import NumberInput from "@/components/organisms/numberInput";
import { Pagination } from '../../components/pagination/Pagination';
import DeleteDialog from '@/components/table/DeleteDialog';
import { useTransferItemsData } from '@/hooks/useTransfertData';
import useNotification from "@/hooks/useNotifications";

export function CreateTransfert() {
    const { showNotification } = useNotification();
    
    const [binList, setBinList] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState<string | null>(null);

    const [formItemData, setFormItemData] = useState<any>({
        name: '',
        description: '',
        manufacturerName: '',
        manufacturerCode: '',
        quantity: 0,
        bin: '',
        status: 'Approved',
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

    const handleChange = (field: string, value: any) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleItemChange = (field: string, value: any) => {
        setFormItemData({ ...formItemData, [field]: value });
    };
    
    const handleSaveItem = async () => {
        console.log(formItemData)
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
                    name: '',
                    description: '',
                    manufacturerName: '',
                    manufacturerCode: '',
                    quantity: 0,
                    bin: '',
                    status: 'Approved',
                });
                refreshData();
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

    const handleConfirmDelete = () => {
        if (deleteItemId) {
            console.log('Deleting item with id:', deleteItemId);
            setDeleteDialogOpen(false);
            setDeleteItemId(null);
        }
    };

    const getStatusBadge = (status: TransfertStatus) => {
        const styles = {
            Approve: 'bg-green-100 text-green-800',
            Transfered: 'bg-red-100 text-red-800',
        };

        return (
            <Badge className={styles[status]} variant="secondary">
                {status.replace("_", " ").replace("0", "/")}
            </Badge>
        );
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
            <h2 className="text-xl font-semibold mb-6">Add Transfers</h2>
            <div className="w-full flex items-center justify-center">
                <div className="w-[98%] flex flex-col gap-3 item">
                    <div className="grid w-full grid-cols-4 gap-12">
                        <TextInput text='Number' value={formData.number} onChange={(value) => handleChange('number', value)} />
                        <TextInput text='Created By' value={formData.createdBy} onChange={(value) => handleChange('createdBy', value)} />
                        <SelectInput
                            label="Status"
                            value={formData.status}
                            onChange={(value) => handleChange('status', value)}
                            options={[
                                { value: 'transfered', label: 'Transfered' },
                                { value: 'approve', label: 'Approved' },
                            ]} />

                        <SelectInput
                            label="Bin"
                            value={formData.bin}
                            onChange={(value) => handleChange('bin', value)}
                            options={binList.map(item => (
                                {
                                    value: item.id,
                                    label: item.bin_name,
                                }
                            ))}
                        />
                    </div>
                    <div className="grid w-full grid-cols-3 gap-12">
                        <TextAreaInput text='Reason' value={formData.reason} onChange={(value) => handleChange('reason', value)} />
                    </div>
                    <h2 className="font-semibold text-[18px] text-[#636692]">Items</h2>
                    <div className='rounded-lg border bg-white'>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className='pl-6'>Name</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Manufacturer Name</TableHead>
                                    <TableHead>Manufacturer Code</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Bin</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    data.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell className='pl-6 text-[#181D27] font-semibold'>{item.name}</TableCell>
                                            <TableCell className='text-[#535862]'>{item.description}</TableCell>
                                            <TableCell className='text-[#535862]'>{item.manufacturerName}</TableCell>
                                            <TableCell className='text-[#535862]'>{item.manufacturerCode}</TableCell>
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
                        <div className="col-span-2"><TextInput text='Name' value={formItemData.name} onChange={(value) => handleItemChange('name', value)} /></div>
                        <div className="col-span-2"><TextInput text='Description' value={formItemData.description} onChange={(value) => handleItemChange('description', value)} /></div>
                        <div className="col-span-2"><TextInput text='Manufacturer Name' value={formItemData.manufacturerName} onChange={(value) => handleItemChange('manufacturerName', value)} /></div>
                        <div className="col-span-2"><TextInput text='Manufacturer Code' value={formItemData.manufacturerCode} onChange={(value) => handleItemChange('manufacturerCode', value)} /></div>

                        <div className="col-span-1">
                            <NumberInput label="Quantity" value={formItemData.quantity} onChange={(value) => handleItemChange('quantity', value)} />
                        </div>
                        <div className="col-span-1">
                            <SelectInput
                                label="Bin8"
                                value={formItemData.bin}
                                onChange={(value) => handleItemChange('bin', value)}
                                options={binList.map(item => (
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
            </div>
        </div>
    )
}