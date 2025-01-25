import { useEffect, useState } from "react";
import { TextInput } from "@/components/ui/text-input";
import { SelectInput } from "@/components/ui/select-input";
import { ProductionItemStatus } from "@/types/production";
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
import { useProductionItemsData } from '@/hooks/useProductionData';
import { DateInput } from "@/components/ui/date-input";
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { capitalizeLetter } from "@/lib/utils";
import { convertDate } from "@/lib/date";
import useNotification from "@/hooks/useNotifications";

export function CreateProduction({ onClickUndo }: { onClickUndo: (value: any) => void }) {

    const [currentPage, setCurrentPage] = useState(1);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [projectList, setProjectList] = useState<any[]>([]);
    const [unitList, setUnitList] = useState<any[]>([]);

    const [formItemData, setFormItemData] = useState<any>(
        {
            item_name: '',
            description: '',
            manufacturer: '',
            manufacturer_code: '',
            quantity: '',
            approved_quantity: '',
            measure_unit: '',
            status: '',
        }
    );
    const [formData, setFormData] = useState<any>(
        {
            p_name: '',
            p_start_date: '',
            p_end_date: '',
            p_status: 'waiting_approval',
            project: 1,
            items: [],
            production_doc: 1,
            approved: true,
            approved_by: 1,
            created_by: 1,
        }
    );

    const { showNotification } = useNotification();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const responseProject = await fetch(`${import.meta.env.VITE_BASE_URL}/projects`);
                const dataPro = await responseProject.json();
                setProjectList(dataPro);

                const responseUnit = await fetch(`${import.meta.env.VITE_BASE_URL}/order-units`);
                const dataUnit = await responseUnit.json();
                setUnitList(dataUnit);
            } catch (error) {
                console.error('Error fetching projects and units:', error);
            }
        };
        fetchProjects();
    }, [])

    const { data, totalPages, totalItems, itemsPerPage, refreshData } = useProductionItemsData(
        currentPage,
    );

    const handleSaveItem = async () => {
        console.log(formItemData)
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/production-items`, {
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
                    description: '',
                    manufacturer: '',
                    manufacturer_code: '',
                    quantity: 0,
                    approved_quantity: 0,
                    measure_unit: '',
                    status: '',
                });
                refreshData();
            }
        } catch (error) {
            console.error('Error creating item:', error);
        }
        console.log("after:::::::::::::", formItemData)
    }

    const handleCreate = async () => {
        console.log(formData)

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/productions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });

            if (response.status === 201) {
                showNotification('New Production created successfully', 'success');
                setFormData({
                    p_name: '',
                    p_start_date: '',
                    p_end_date: '',
                    p_status: 'waiting_approval',
                    project: '',
                    items: [],
                    production_doc: 1,
                    approved: true,
                    approved_by: 1,
                    created_by: 1,
                });
                setSelectedItems([]);
                refreshData();
            }
        } catch (error) {
            console.error('Error creating item:', error);
        }
    }

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

    useEffect(() => {
        handleFormChange('items', selectedItems);
    }, [selectedItems])

    const handleFormChange = (field: string, value: any) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleFormItemChange = (field: string, value: any) => {
        const updatedData = { ...formItemData, [field]: value };

        if (field === 'quantity' || field === 'approved_quantity') {
            const quantity = Number(updatedData.quantity);
            const approvedQuantity = Number(updatedData.approved_quantity);

            if (quantity && approvedQuantity) {
                updatedData.status = quantity < approvedQuantity ? 'partially_approved' : 'approved';
            }
        }
        setFormItemData(updatedData);
    };

    const handleDelete = (id: string) => {
        setDeleteDialogOpen(true);
        setDeleteItemId(id);
    };

    const handleConfirmDelete = async () => {
        if (deleteItemId) {
            console.log('Deleting item with id:', deleteItemId);
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/production-items/${deleteItemId}`, {
                method: 'DELETE',
            })
            console.log(response.status);
            if (response.status === 204) {
                showNotification('Item deleted successfully', 'success');
                refreshData();
            }
            setDeleteDialogOpen(false);
            setDeleteItemId(null);
        }
    };

    const getItemStatusBadge = (status: ProductionItemStatus) => {
        const styles = {
            Approved: 'bg-[#ECFDF3] text-[#027A48]',
            Partially_Approved: 'bg-[#FFFBEB] text-[#B45309]',
        };

        return (
            <Badge className={styles[status]} variant="secondary">
                {status.replace("_", " ").replace("0", "/")}
            </Badge>
        );
    };

    useEffect(() => {
        console.log(capitalizeLetter(formItemData.status))
    }, [formItemData.status])

    return (
        <div className="w-full flex flex-col justify-start overflow-y-auto p-6 h-[calc(100vh-180px)]">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold mb-6">New Production</h2>
                <div className="flex cursor-pointer p-2 rounded-full hover:bg-white">
                    <Undo2 onClick={() => onClickUndo(1)} />
                </div>
            </div>
            <div className="w-full flex items-center justify-center">
                <div className="w-[98%] flex flex-col gap-3 item">
                    <div className="grid w-full grid-cols-4 gap-12">
                        <TextInput text='Name' value={formData.p_name} onChange={(value) => handleFormChange('p_name', value)} />

                        <SelectInput
                            label="Project"
                            value={formItemData.project}
                            onChange={(value) => handleFormChange('project', value)}
                            options={projectList.map(item => (
                                {
                                    value: item.id,
                                    label: item.project_name,
                                }
                            ))}
                        />

                        <DateInput value={formData.p_start_date} text='Start Date' onChange={(value) => handleFormChange('p_start_date', convertDate(value))} />
                        <DateInput value={formData.p_end_date} text='End Date' onChange={(value) => handleFormChange('p_end_date', convertDate(value))} />
                    </div>

                    <h2 className="font-semibold text-[18px] text-[#636692]">Production Items</h2>
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
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Approved Quantity</TableHead>
                                    <TableHead>Measure Unit</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    data.map((item, index) => (
                                        <TableRow key={index} className={selectedItems.includes(item.id) ? 'bg-gray-50' : ''}>
                                            <TableCell className="w-12 flex items-center justify-center">
                                                <Checkbox checked={selectedItems.includes(item.id)} onCheckedChange={(checked) => handleSelectItem(item.id, checked)} />
                                            </TableCell>
                                            <TableCell className='pl-6 text-[#181D27] font-semibold'>{item.name}</TableCell>
                                            <TableCell className='text-[#535862]'>{item.description}</TableCell>
                                            <TableCell className='text-[#535862]'>{item.manufacturerName}</TableCell>
                                            <TableCell className='text-[#535862]'>{item.manufacturerCode}</TableCell>
                                            <TableCell className='text-[#535862]'>{item.quantity}</TableCell>
                                            <TableCell className='text-[#535862]'>{item.approvedQuantity}</TableCell>
                                            <TableCell className='text-[#535862]'>{item.unitOfMeasure}</TableCell>
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
                                                            <li onClick={() => alert("Hi, I am Edit")}>Edit</li>
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
                    <h2 className="font-semibold text-[18px] text-[#636692]">Production Item</h2>
                    <div className="w-full grid grid-cols-9 gap-3">
                        <div className="col-span-2"><TextInput text='Name' value={formItemData.item_name} onChange={(value) => handleFormItemChange('item_name', value)} /></div>
                        <div className="col-span-2"><TextInput text='Description' value={formItemData.description} onChange={(value) => handleFormItemChange('description', value)} /></div>
                        <div className="col-span-1"><TextInput text='Manufacturer Name' value={formItemData.manufacturer} onChange={(value) => handleFormItemChange('manufacturer', value)} /></div>
                        <div className="col-span-1"><TextInput text='Manufacturer Code' value={formItemData.manufacturer_code} onChange={(value) => handleFormItemChange('manufacturer_code', value)} /></div>
                        <div className="col-span-1">
                            <NumberInput label="Quantity" value={formItemData.quantity} onChange={(value) => handleFormItemChange('quantity', value)} />
                        </div>
                        <div className="col-span-1">
                            <NumberInput label="Approved Quantity" value={formItemData.approved_quantity} onChange={(value) => handleFormItemChange('approved_quantity', value)} />
                        </div>
                        <SelectInput
                            label="Measure Unit"
                            value={formItemData.measure_unit}
                            onChange={(value) => handleFormItemChange('measure_unit', value)}
                            options={Array.isArray(unitList) && unitList.length > 0
                                ? unitList.map(item => ({
                                    value: item.id,
                                    label: item.orderUnitName,
                                }))
                                : []
                            }
                        />
                    </div>
                    <hr className="border-t border-[#D7D8E4] w-full" />
                    <div className="w-full flex justify-end mt-4 gap-4 font-semibold">
                        <div className="bg-[#3A3B55] px-[18px] py-[8px] rounded-md cursor-pointer">
                            <span className="text-white" onClick={handleSaveItem}>Save</span>
                        </div>
                        <div className="bg-[#3A3FF2] px-[18px] py-[8px] rounded-md cursor-pointer" onClick={handleCreate}>
                            <span className="text-white">Create Production</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}