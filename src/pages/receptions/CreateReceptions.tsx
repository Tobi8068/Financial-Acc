import { useState } from "react";
import { Upload } from 'lucide-react';
import { TextInput } from "@/components/ui/text-input";
import { SelectInput } from "@/components/ui/select-input";
import { ReceptionItem } from "@/types/receptions";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Note } from "@/types/utils";
import { Notes } from "@/components/organisms/notes";
import NumberInput from "@/components/organisms/numberInput";

interface CreateReceptionsProps {
    onClick: () => void;
}
interface Document {
    id: number
    name: string
}

export function CreateReceptions({ onClick }: CreateReceptionsProps) {
    const [messages] = useState<Note[]>([
        {
            id: 1,
            sender: "Phoenix Baker",
            avatar: "/placeholder.svg?height=40&width=40",
            message: "Hey Olivia, can you please review the latest design when you can?",
            timestamp: "Friday 2:20pm"
        },
        {
            id: 2,
            sender: "You",
            avatar: "/placeholder.svg?height=40&width=40",
            message: "Sure thing, I'll have a look today.",
            timestamp: "Friday 2:20pm",
            isYou: true
        },
        {
            id: 3,
            sender: "Phoenix Baker",
            avatar: "/placeholder.svg?height=40&width=40",
            message: "Hey Olivia, can you please review the latest design when you can?",
            timestamp: "Friday 2:20pm"
        },
        {
            id: 4,
            sender: "You",
            avatar: "/placeholder.svg?height=40&width=40",
            message: "Sure thing, I'll have a look today.",
            timestamp: "Friday 2:20pm",
            isYou: true
        },
    ])

    const data: ReceptionItem[] = [
        {
            name: 'Computer',
            itemCode: '352644B',
            description: 'Monthly subscription',
            manufacturerName: 'Apple Inc',
            manufacturerCode: '35412AB',
            quantity: 5,
            bin: 5,
        },
        {
            name: 'Mobile',
            itemCode: '352644B',
            description: 'Monthly subscription',
            manufacturerName: 'Apple Inc',
            manufacturerCode: '35412AB',
            quantity: 5,
            bin: 5,
        },
        {
            name: 'Keyboard',
            itemCode: '352644B',
            description: 'Monthly subscription',
            manufacturerName: 'Apple Inc',
            manufacturerCode: '35412AB',
            quantity: 5,
            bin: 5,
        },
    ];
    const [formData, setFormData] = useState<ReceptionItem>(
        {
            name: '',
            itemCode: '',
            description: '',
            manufacturerName: '',
            manufacturerCode: '',
            quantity: 0,
            bin: 0,
        }
    );

    const handleChange = (field: string, value: any) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSaveItem = () => {

    }

    const handleSaveAndAddItem = () => {

    }

    return (
        <div className="relative w-full flex flex-col justify-start overflow-y-auto p-6 h-[calc(100vh-160px)]">
            <h2 className="text-xl font-semibold mb-6">Add Reception</h2>
            <div className="w-full flex items-center justify-center">
                <div className="w-[98%] flex flex-col gap-3 item">
                    <div className="grid w-full grid-cols-4 gap-12">
                        <TextInput text='Purchase Order Number' onChange={(value) => handleChange('name', value)} />
                        <TextInput text='Storekeeper' onChange={(value) => handleChange('name', value)} />
                    </div>
                    <h2 className="font-semibold text-[18px] text-[#636692]">Items</h2>
                    <div className='rounded-lg border bg-white'>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className='pl-6'>Name</TableHead>
                                    <TableHead>Item Code</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Manufacturer Name</TableHead>
                                    <TableHead>Manufacturer Code</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Bin</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    data.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell className='pl-6 text-[#181D27] font-semibold'>{item.name}</TableCell>
                                            <TableCell className='text-[#535862]'>{item.itemCode}</TableCell>
                                            <TableCell className='text-[#535862]'>{item.description}</TableCell>
                                            <TableCell className='text-[#535862]'>{item.manufacturerName}</TableCell>
                                            <TableCell className='text-[#535862]'>{item.manufacturerCode}</TableCell>
                                            <TableCell className='text-[#535862]'>{item.quantity}</TableCell>
                                            <TableCell className='text-[#535862]'>{item.bin}</TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </div>
                    <h2 className="font-semibold text-[18px] text-[#636692]">New Item</h2>
                    <div className="w-full grid grid-cols-10 gap-3">
                        <div className="col-span-2"><TextInput text='Name' onChange={(value) => handleChange('name', value)} /></div>
                        <div className="col-span-1"><TextInput text='Item Code' onChange={(value) => handleChange('name', value)} /></div>
                        <div className="col-span-3"><TextInput text='Description' onChange={(value) => handleChange('name', value)} /></div>
                        <div className="col-span-1"><TextInput text='Manufacturer Name' onChange={(value) => handleChange('name', value)} /></div>
                        <div className="col-span-1"><TextInput text='Manufacturer Code' onChange={(value) => handleChange('name', value)} /></div>
                        <div className="col-span-1">
                            {/* <TextInput text='Quantity' onChange={(value) => handleChange('name', value)} /> */}
                            <NumberInput label="Quantity" value={formData.quantity} onChange={(value) => handleChange('quantity', value)} />
                        </div>
                        <div className="col-span-1">
                            <SelectInput
                                label="Bin"
                                value={formData.bin.toString()}
                                onChange={(value) => handleChange('bin', value)}
                                options={[
                                    { value: '1', label: '1' },
                                    { value: '2', label: '2' },
                                    { value: '3', label: '3' },
                                    { value: '4', label: '4' },
                                    { value: '5', label: '5' },
                                ]} />
                        </div>
                    </div>
                    <hr className="border-t border-[#D7D8E4] w-full" />
                    <div className="w-full flex gap-4 justify-end">
                        <span className="cursor-pointer bg-[#3A3B55] px-3 py-1 rounded-md text-white w-fit" onClick={handleSaveItem}>Save</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        {/* Notes Section */}
                        <Notes messages={messages} />

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
                            <span className="text-white font-semibold">Create Requisition</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}