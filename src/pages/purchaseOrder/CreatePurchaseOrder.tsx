import { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { TextInput } from "@/components/ui/text-input";
import { SelectInput } from "@/components/ui/select-input";
import { Checkbox } from '@/components/ui/checkbox';

import NumberInput from "@/components/organisms/numberInput";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MoreVertical, Undo2 } from 'lucide-react';
import { PurchaseOrderItemStatus } from '@/types/purchaseOrder';

import { usePurchaseOrderItemsData, } from "@/hooks/usePurchaseOrderData";
import { Pagination } from '@/components/pagination/Pagination';
import DeleteDialog from '@/components/table/DeleteDialog';
import useNotification from "@/hooks/useNotifications";
import { useAuth } from "@/context/authProvider";

export function CreatePurchaseOrder({ onClickUndo }: { onClickUndo: (value: any) => void }) {
    const { user } = useAuth();
    const [formData, setFormData] = useState<any>(
        {
            ship_to: '',
            bill_to: '',
            department: '',

            approved_by: 1,
            created_by: user.id,
            status: 'created',

            approved: false,
            sent: false,

            items: [],
            po_doc: 1
        }
    );
    const [formItemData, setFormItemData] = useState<any>(
        {
            item_name: '',
            description: '',
            measure_unit: '',
            manufacturer: '',
            manufacturer_code: '',
            supplier_code: '',
            quantity: 0,
            price: 0,
            tax_group: '',
            status: 'approved',
            reception_quantity: 1
        }
    );
    const { showNotification } = useNotification();

    const [unitList, setUnitList] = useState<any[]>([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
    const [taxList, setTaxList] = useState<any[]>([]);
    const [departmentList, setDepartmentList] = useState<any[]>([]);

    const [deleteItemId, setDeleteItemId] = useState<string | null>(null);

    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchPO = async () => {
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
        fetchPO();
    }, [])

    const { data, totalPages, totalItems, itemsPerPage, refreshData } = usePurchaseOrderItemsData(
        currentPage,
    );

    const handleFormData = (field: string, value: any) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleFormItemData = (field: string, value: any) => {
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
        handleFormData('items', selectedItems);
    }, [selectedItems])

    const handleSaveItem = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/purchaseOrders-items`, {
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
                    supplier: '',
                    tax_group: '',
                    reception_quantity: '',
                    price: ''
                });
                refreshData();
            }
        } catch (error) {
            showNotification('Failed saving item', 'error');
        }
    }

    const handleCreate = async () => {
        console.log(formData)

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/purchase-orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });

            if (response.status === 201) {
                showNotification('New PO created successfully', 'success');
                setFormData({
                    requisition_number: '',
                    ship_to: '',
                    bill_to: '',
                    department: '',
                    status: 'created',
                    items: [],
                    requisition_doc: 1,
                    approved: true,
                    approved_by: '',
                    created_by: '',
                });
                setSelectedItems([]);
                refreshData();
            }
        } catch (error) {
            console.error('Error creating item:', error);
        }
    }

    const handleDelete = (id: string) => {
        setDeleteDialogOpen(true);
        setDeleteItemId(id);
    };

    const handleConfirmDelete = async () => {
        if (deleteItemId) {
            console.log('Deleting item with id:', deleteItemId);
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/purchaseOrders-items/${deleteItemId}`, {
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

    const getStatusItemBadge = (status: PurchaseOrderItemStatus) => {
        const styles = {
            Completed: 'bg-[#ECFDF3] text-[#027A48]',
            Created: 'bg-[#EFF8FF] text-[#175CD3]',
            Approved: 'bg-[#ECFDF3] text-[#027A48]',
            Partially_Received: 'bg-[#F4F3FF] text-[#FF9900]'
        };

        return (
            <Badge className={styles[status]} variant="secondary">
                {status.replace("_", " ").replace("0", "/")}
            </Badge>
        );
    };

    return (
        <div className="w-full flex flex-col justify-start overflow-y-auto p-6 h-[calc(100vh-160px)]">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold mb-6">Create Purchase Order</h2>
                <div className="flex cursor-pointer p-2 rounded-full hover:bg-white">
                    <Undo2 onClick={() => onClickUndo(1)} />
                </div>
            </div>
            <div className="w-full flex items-center justify-center">
                <div className="w-[98%] flex flex-col gap-3 item">
                    <div className="grid w-full grid-cols-4 gap-x-12 gap-y-4">
                        <TextInput text='Ship To' value={formData.ship_to} onChange={(value) => handleFormData('ship_to', value)} />
                        <TextInput text='Bill To' value={formData.bill_to} onChange={(value) => handleFormData('bill_to', value)} />
                        <SelectInput
                            label="Department"
                            value={formData.department}
                            onChange={(value) => handleFormData('department', value)}
                            options={departmentList.map(item => (
                                {
                                    value: item.id,
                                    label: item.name,
                                }
                            ))}
                        />
                    </div>
                    <h2 className="font-semibold text-[18px] text-[#636692]">Purchase Items</h2>
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
                                    <TableHead>Measure Unit</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Net Amount</TableHead>
                                    <TableHead>Tax Amount</TableHead>
                                    <TableHead>Tax</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data && data.map((item, index) => (
                                    <TableRow key={index} className={selectedItems.includes(item.id) ? 'bg-gray-50' : ''}>
                                        <TableCell className="w-12 flex items-center justify-center">
                                            <Checkbox checked={selectedItems.includes(item.pid)} onCheckedChange={(checked) => handleSelectItem(item.pid, checked)} />
                                        </TableCell>
                                        <TableCell className='pl-6'>{item.name}</TableCell>
                                        <TableCell>{item.description}</TableCell>
                                        <TableCell>{item.manufacturer}</TableCell>
                                        <TableCell>{item.manufacturer_code}</TableCell>
                                        <TableCell>{item.supplierCode}</TableCell>
                                        <TableCell>{item.unitOfMeasure}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>{item.price}</TableCell>
                                        <TableCell>{item.netAmount}</TableCell>
                                        <TableCell>{item.taxAmount}</TableCell>
                                        <TableCell>{item.taxGroup}</TableCell>
                                        <TableCell>{getStatusItemBadge(item.status)}</TableCell>
                                        <TableCell>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <button className="p-2 bg-white hover:bg-gray-100 shadow-lg rounded-full">
                                                        <MoreVertical className="h-4 w-4" />
                                                    </button>
                                                </PopoverTrigger>
                                                <PopoverContent align="end" className='w-24 cursor-pointer' sideOffset={2}>
                                                    <ul className="space-y-2">
                                                        <li onClick={() => alert("Hi, PO")}>Edit</li>
                                                        <li onClick={() => handleDelete(item.id)}>Delete</li>
                                                    </ul>
                                                </PopoverContent>
                                            </Popover>
                                        </TableCell>
                                    </TableRow>
                                ))}
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

                    <h2 className="font-semibold text-[18px] text-[#636692]">Purchase Order Items</h2>

                    <div className="w-full grid grid-cols-12 gap-3 p-3 rounded-lg border bg-gray-200">
                        <div className="col-span-2">
                            <TextInput
                                text='Name'
                                value={formItemData.item_name}
                                onChange={(value) => handleFormItemData('item_name', value)}
                            />
                        </div>

                        <div className="col-span-2">
                            <TextInput
                                text='Description'
                                value={formItemData.description}
                                onChange={(value) => handleFormItemData('description', value)}
                            />
                        </div>

                        <div className="col-span-2">
                            <TextInput
                                text="Manufacturer"
                                value={formItemData.manufacturer}
                                onChange={(value) => handleFormItemData('manufacturer', value)}
                            />
                        </div>
                        <div className="col-span-2">
                            <TextInput
                                text="Manufacturer Code"
                                value={formItemData.manufacturer_code}
                                onChange={(value) => handleFormItemData('manufacturer_code', value)}
                            />
                        </div>
                        <div className="col-span-1">
                            <NumberInput label="Quantity" value={formItemData.quantity} onChange={(value) => handleFormItemData('quantity', Number(value))} />
                        </div>

                        <div className="col-span-1">
                            <NumberInput label="Price" value={formItemData.price} onChange={(value) => handleFormItemData('price', Number(value))} />
                        </div>

                        <div className="col-span-1">
                            <SelectInput
                                label="Measure Unit"
                                value={formItemData.measure_unit}
                                onChange={(value) => handleFormItemData('measure_unit', value)}
                                options={Array.isArray(unitList) && unitList.length > 0
                                    ? unitList.map(item => ({
                                        value: item.id,
                                        label: item.orderUnitName,
                                    }))
                                    : []
                                }
                            />
                        </div>

                        <div className="col-span-1">
                            <SelectInput
                                label="Tax Group"
                                value={formItemData.tax_group}
                                onChange={(value) => handleFormItemData('tax_group', value)}
                                options={taxList.map(item => (
                                    {
                                        value: item.id,
                                        label: item.tax_name,
                                    }
                                ))}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <hr className="border-t border-[#D7D8E4] w-full" />
            <div className="w-full flex justify-end mt-4 gap-4 font-semibold">
                <div className="bg-[#3A3B55] px-[18px] py-[8px] rounded-md cursor-pointer">
                    <span className="text-white" onClick={handleSaveItem}>Save</span>
                </div>
                <div className="bg-[#3A3FF2] px-[18px] py-[8px] rounded-md cursor-pointer" onClick={handleCreate}>
                    <span className="text-white">Create PO</span>
                </div>
            </div>
        </div >
    )
}