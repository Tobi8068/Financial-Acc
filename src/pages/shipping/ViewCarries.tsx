'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { CircleX } from 'lucide-react'

interface CarrierDetailsProps {
    carrier?: {
        name: string
        contractId: string
        contractStartDate: string
        contractEndDate: string
        contractStatus: string
    }
    open: boolean;
    onClose: () => void;
}

export default function CarrierDetails({ open, onClose }: CarrierDetailsProps) {
    return (
        <Dialog.Root open={open} onOpenChange={onClose}>
            <Dialog.Trigger asChild>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                    View Details
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                <Dialog.Content className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
                        <div className="flex items-center justify-between">
                            <Dialog.Title className="text-xl font-semibold text-gray-900 mb-4">
                                Carrier Details
                            </Dialog.Title>
                            {/* <Dialog.Close asChild>
                                <button className="rounded-full p-1.5 hover:bg-gray-100">
                                    <X className="h-4 w-4 text-gray-500" />
                                    <span className="sr-only">Close</span>
                                </button>
                            </Dialog.Close> */}
                        </div>

                        <div className="grid gap-4 text-sm">
                            <div className="grid grid-cols-2 items-center gap-4 border-b py-3">
                                <span className="font-medium text-gray-700">Name:</span>
                                <span className="text-right text-gray-900">Computer</span>
                            </div>

                            <div className="grid grid-cols-2 items-center gap-4 border-b py-3">
                                <span className="font-medium text-gray-700">Contract ID:</span>
                                <span className="text-right text-gray-900">124</span>
                            </div>

                            <div className="grid grid-cols-2 items-center gap-4 border-b py-3">
                                <span className="font-medium text-gray-700">Description:</span>
                                <span className="text-right text-gray-900">
                                    lorem ipsum doler sitt amit merol muspi relow tima lorem ipsum doler sitt amit merol
                                </span>
                            </div>

                            <div className="grid grid-cols-2 items-center gap-4 border-b py-3">
                                <span className="font-medium text-gray-700">Contract Start Date:</span>
                                <span className="text-right text-gray-900">Apple Inc</span>
                            </div>

                            <div className="grid grid-cols-2 items-center gap-4 border-b py-3">
                                <span className="font-medium text-gray-700">Contract End Date:</span>
                                <span className="text-right text-gray-900">16 Jan, 2025</span>
                            </div>

                            <div className="grid grid-cols-2 items-center gap-4 py-3">
                                <span className="font-medium text-gray-700">Contract Status:</span>
                                <span className="text-right">
                                    <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                                        Active
                                    </span>
                                </span>
                            </div>
                        </div>

                    <Dialog.Close asChild>
                        <div
                            className="absolute right-2.5 top-2.5 cursor-pointer"
                            aria-label="Close"
                        >
                            <CircleX />
                        </div>
                    </Dialog.Close>

                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

// Example usage:
// function Example() {
//     const carrier = {
//         name: "Computer",
//         contractId: "lorem ipsum doler sitt amit merol muspi relow tima lorem ipsum doler sitt amit merol",
//         contractStartDate: "Apple Inc",
//         contractEndDate: "16 Jan, 2025",
//         contractStatus: "Active"
//     }

//     return <CarrierDetails carrier={carrier} />
// }

