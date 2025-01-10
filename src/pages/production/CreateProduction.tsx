import { useEffect, useState } from "react";
import { TextInput } from "@/components/ui/text-input";
import { SelectInput } from "@/components/ui/select-input";
import { ProductionStatus, ProductionItemStatus } from "@/types/production";
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
import { useProductionItemsData } from '@/hooks/useProductionData';
import { DateInput } from "@/components/ui/date-input";
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { capitalizeLetter } from "@/lib/utils";

export function CreateProduction() {

    const [currentPage, setCurrentPage] = useState(1);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [projectList, setProjectList] = useState<any[]>([]);
    const [unitList, setUnitList] = useState<any[]>([]);

    const [formDataItem, setFormDataItem] = useState<any>(
        {
            item_name: '',
            description: '',
            manufacturer: '',
            manufacturer_code: '',
            quantity: '',
            approved_quantity: '',
            measure_unit: 1,
            status: '',
        }
    );
    const [formData, setFormData] = useState<any>(
        {
            p_name: '',
            p_start_date: '',
            p_end_date: '',
            p_status: '',
            project: 1,
            items: [],
            production_doc: 1,
            approved: true,
            approved_by: 'you',
            created_by: 'me'
        }
    );

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

    useEffect(() => {
        console.log('projectList', projectList.filter(item => item.id === formData.measure_unit).at(0));
        console.log('unitList', unitList);
    }, [projectList, unitList])

    const { data, totalPages, totalItems, itemsPerPage, refreshData } = useProductionItemsData(
        currentPage,
    );

    const handleSaveItem = async () => {
        console.log(formDataItem)
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/production-items`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDataItem),
            });

            if (response.status === 201) {
                console.log('Item created successfully');
                refreshData();
            }
        } catch (error) {
            console.error('Error creating item:', error);
        }
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
                console.log('New Production created successfully');
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
        setFormDataItem({ ...formDataItem, [field]: value });
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

    const getStatusBadge = (status: ProductionStatus) => {
        const styles = {
            Created: 'bg-[#FEF2F2] text-[#991B1B]',
            Approve: 'bg-[#ECFDF3] text-[#027A48]',
            Waiting_Approval: 'bg-[#EFF8FF] text-[#175CD3]',
            Started: 'bg-[#FEF2F2] text-[#991B1B]',
            Ended: 'bg-[#F4F3FF] text-[#5925DC]',
        };

        return (
            <Badge className={styles[status]} variant="secondary">
                {status.replace("_", " ").replace("0", "/")}
            </Badge>
        );
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
        console.log(capitalizeLetter(formDataItem.status))
    }, [formDataItem.status])

    return (
        <div className="w-full flex flex-col justify-start overflow-y-auto p-6 h-[calc(100vh-180px)]">
            <h2 className="text-xl font-semibold mb-6">New Production</h2>
            <div className="w-full flex items-center justify-center">
                <div className="w-[98%] flex flex-col gap-3 item">
                    <div className="grid w-full grid-cols-5 gap-12">
                        <TextInput text='Name' onChange={(value) => handleFormChange('p_name', value)} />
                        <SelectInput
                            label="Project"
                            value={projectList.length > 0 ? projectList.filter(item => item.id === formData.measure_unit).at(0) : 1}
                            onChange={(value) => handleFormChange('project', projectList.filter(item => item.project_name === value).at(0).id)}
                            options={projectList.map(item => item.project_name).map(item => ({
                                value: item,
                                label: item
                            }))} />
 
                        <DateInput text='Start Date' onChange={(value) => handleFormChange('p_start_date', value)} />
                        <DateInput text='End Date' onChange={(value) => handleFormChange('p_end_date', value)} />
                        <SelectInput
                            label="Status"
                            value={capitalizeLetter(formData.p_status)}
                            onChange={(value) => handleFormChange('p_status', value.toLowerCase())}
                            options={[
                                { value: ' ', label: ' ' },
                                { value: 'Created', label: 'Created' },
                                { value: 'Waiting_Approval', label: 'Waiting Approval' },
                                { value: 'Approved', label: 'Approved' },
                                { value: 'Ended', label: 'Ended' },
                                { value: 'Partially_Approved', label: 'Partially Approved' },
                            ]} />
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
                                    <TableHead>Unit of Measure</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    data.map((item, index) => (
                                        <TableRow key={index} className={selectedItems.includes(item.id) ? 'bg-gray-50' : ''}>
                                            <TableCell className="w-12 flex items-center justify-center">
                                                <Checkbox checked={selectedItems.includes(item.id)} onCheckedChange={(checked) => handleSelectItem(item.id, checked)}></Checkbox>
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
                        <div className="col-span-2"><TextInput text='Name' onChange={(value) => handleFormItemChange('item_name', value)} /></div>
                        <div className="col-span-2"><TextInput text='Description' onChange={(value) => handleFormItemChange('description', value)} /></div>
                        <div className="col-span-1"><TextInput text='Manufacturer Name' onChange={(value) => handleFormItemChange('manufacturer', value)} /></div>
                        <div className="col-span-1"><TextInput text='Manufacturer Code' onChange={(value) => handleFormItemChange('manufacturer_code', value)} /></div>
                        <div className="col-span-1">
                            <NumberInput label="Quantity" value={formDataItem.quantity} onChange={(value) => handleFormItemChange('quantity', value)} />
                        </div>
                        <div className="col-span-1">
                            <NumberInput label="Approved Quantity" value={formDataItem.approved_quantity} onChange={(value) => handleFormItemChange('approved_quantity', value)} />
                        </div>
                        <SelectInput
                            label="Unit of Measure"
                            value={unitList.length > 0 ? unitList.filter(item => item.id === formData.measure_unit).at(0) : 1}
                            onChange={(value) => handleFormItemChange('measure_unit', unitList.filter(item => item.orderUnitName === value).at(0).id)}
                            options={unitList.map(item => item.orderUnitName).map(item => ({
                                value: item,
                                label: item,
                            }))} />
                        <SelectInput
                            label="Status"
                            value={capitalizeLetter(formDataItem.status)}
                            onChange={(value) => handleFormItemChange('status', value.toLowerCase())}
                            options={[
                                { value: '', label: '' },
                                { value: 'Approved', label: 'Approved' },
                                { value: 'Partially_Approved', label: 'Partially Approved' },
                            ]} />
                    </div>
                    <hr className="border-t border-[#D7D8E4] w-full" />
                    <div className="w-full flex gap-4 justify-end">
                        <span className="cursor-pointer bg-[#3A3B55] px-3 py-1 rounded-md text-white w-fit" onClick={handleSaveItem}>Save</span>
                    </div>
                    <div className="w-full flex justify-end">
                        <div className="bg-[#3A3FF2] px-[18px] py-[8px] rounded-md cursor-pointer" onClick={handleCreate}>
                            <span className="text-white font-semibold">Create Production</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}