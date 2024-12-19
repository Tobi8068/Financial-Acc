import { useState } from "react";
import { TextInput } from "@/components/ui/text-input";
import { SelectInput } from "@/components/ui/select-input";
import { ProductionItem, ProductionStatus } from "@/types/production";
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

interface CreateProductionProps {
    onClick: () => void;
}

export function CreateProduction({ onClick }: CreateProductionProps) {

    const [currentPage, setCurrentPage] = useState(1);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
    const [formDataItem, setFormDataItem] = useState<ProductionItem>(
        {
            name: '',
            description: '',
            manufacturerCode: '',
            manufacturerName: '',
            quantity: 0,
            approvedQuantity: 0,
            unitOfMeasure: '',
            status: 'Approved',
        }
    );
    const [formData, setFormData] = useState<any>(
        {
            name: '',
            project: '',
            productionStartDate: '',
            productionEndDate: '',
            status: '',
        }
    );

    const { data, totalPages, totalItems, itemsPerPage } = useProductionItemsData(
        currentPage,
    );

    const handleChange = (field: string, value: any) => {
        setFormData({ ...formData, [field]: value });
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
            Created: 'bg-[#F5F5F5] text-[#414651]',
            Approved: 'bg-[#ECFDF3] text-[#027A48]',
            Waiting_Approval: 'bg-[#EFF8FF] text-[#175CD3]',
            Ended: 'bg-[#F4F3FF] text-[#5925DC]',
            Cancelled: 'bg-[#FEF3F2] text-[#9A3412]',
            Partially_Approved: 'bg-[#FFFBEB] text-[#B45309]',
        };

        return (
            <Badge className={styles[status]} variant="secondary">
                {status.replace("_", " ").replace("0", "/")}
            </Badge>
        );
    };

    return (
        <div className="w-full flex flex-col justify-start overflow-y-auto p-6 h-[calc(100vh-160px)]">
            <h2 className="text-xl font-semibold mb-6">New Production</h2>
            <div className="w-full flex items-center justify-center">
                <div className="w-[98%] flex flex-col gap-3 item">
                    <div className="grid w-full grid-cols-5 gap-12">
                        <TextInput text='Name' onChange={(value) => handleChange('name', value)} />
                        <TextInput text='Project' onChange={(value) => handleChange('project', value)} />
                        <DateInput text='Production Start Date' onChange={(value) => handleChange('productionStartDate', value)} />
                        <DateInput text='Production End Date' onChange={(value) => handleChange('productionEndDate', value)} />
                    </div>
                    <div className="grid w-full grid-cols-5 gap-12">
                        <SelectInput
                            label="Status"
                            value={formData.status}
                            onChange={(value) => handleChange('status', value)}
                            options={[
                                { value: 'Created', label: 'Created' },
                                { value: 'Waiting_Approval', label: 'Waiting Approval' },
                                { value: 'Approved', label: 'Approved' },
                                { value: 'Cancelled', label: 'Cancelled' },
                                { value: 'Ended', label: 'Ended' },
                                { value: 'Partially_Approved', label: 'Partially Approved' },
                            ]} />
                    </div>
                    <h2 className="font-semibold text-[18px] text-[#636692]">Production Items</h2>
                    <div className='rounded-lg border bg-white'>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className='pl-6'>Name</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Manufacturer Code</TableHead>
                                    <TableHead>Manufacturer Name</TableHead>
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
                                        <TableRow key={index}>
                                            <TableCell className='pl-6 text-[#181D27] font-semibold'>{item.name}</TableCell>
                                            <TableCell className='text-[#535862]'>{item.description}</TableCell>
                                            <TableCell className='text-[#535862]'>{item.manufacturerCode}</TableCell>
                                            <TableCell className='text-[#535862]'>{item.manufacturerName}</TableCell>
                                            <TableCell className='text-[#535862]'>{item.quantity}</TableCell>
                                            <TableCell className='text-[#535862]'>{item.approvedQuantity}</TableCell>
                                            <TableCell className='text-[#535862]'>{item.unitOfMeasure}</TableCell>
                                            <TableCell className='text-[#535862]'>{getStatusBadge(item.status)}</TableCell>
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
                        <div className="col-span-2"><TextInput text='Name' onChange={(value) => handleChange('name', value)} /></div>
                        <div className="col-span-3"><TextInput text='Description' onChange={(value) => handleChange('description', value)} /></div>
                        <div className="col-span-1"><TextInput text='Manufacturer Name' onChange={(value) => handleChange('manufacturerName', value)} /></div>
                        <div className="col-span-1"><TextInput text='Manufacturer Code' onChange={(value) => handleChange('manufacturerCode', value)} /></div>
                        <div className="col-span-1">
                            <NumberInput label="Quantity" value={formDataItem.quantity} onChange={(value) => handleChange('quantity', value)} />
                        </div>
                        <SelectInput
                            label="Unit of Measure"
                            value={formData.unitOfMeasure}
                            onChange={(value) => handleChange('unitOfMeasure', value)}
                            options={[
                                { value: 'Created', label: 'Created' },
                                { value: 'Waiting_Approval', label: 'Waiting Approval' },
                                { value: 'Approved', label: 'Approved' },
                                { value: 'Cancelled', label: 'Cancelled' },
                                { value: 'Ended', label: 'Ended' },
                                { value: 'Partially_Approved', label: 'Partially Approved' },
                            ]} />
                        <div className="col-span-1">
                            <NumberInput label="Approved Quantity" value={formDataItem.quantity} onChange={(value) => handleChange('quantity', value)} />
                        </div>
                    </div>
                    <hr className="border-t border-[#D7D8E4] w-full" />
                    <div className="w-full flex justify-end">
                        <div className="bg-[#3A3B55] px-[18px] py-[8px] rounded-md cursor-pointer" onClick={onClick}>
                            <span className="text-white font-semibold">Create Production</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}