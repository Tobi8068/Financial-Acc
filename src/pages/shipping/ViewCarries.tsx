'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { CircleX } from 'lucide-react'
import { CarriesStatus } from '@/types/shipping'
import { Badge } from '@/components/ui/badge'

interface CarrierDetailsProps {
    carrier: {
        name: string
        contractId: string
        startDate: string
        endDate: string
        status: CarriesStatus
    }
    open: boolean;
    onClose: () => void;
}

const getStatusBadge = (status: CarriesStatus) => {
    const styles = {
        Expired: 'bg-yellow-100 text-yellow-800',
        Active: 'bg-green-100 text-green-800',
    };

    return (
        <Badge className={styles[status]} variant="secondary">
            {status.replace("_", " ").replace("0", "/")}
        </Badge>
    );
};

export default function CarrierDetails({ carrier, open, onClose }: CarrierDetailsProps) {

    return (
        <Dialog.Root open={open} onOpenChange={onClose}>
            <Dialog.Trigger asChild>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                    View Details
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                <Dialog.Content
                    className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]"
                    aria-describedby={undefined}>
                    <div className="flex items-center justify-between">
                        <Dialog.Title className="text-xl font-semibold text-gray-900 mb-4">
                            Carrier Details
                        </Dialog.Title>
                    </div>
                    <div className="grid gap-4 text-sm">
                        <div className="grid grid-cols-2 items-center gap-4 border-b py-3">
                            <span className="font-medium text-gray-700">Name:</span>
                            <span className="text-right text-gray-900">{carrier.name}</span>
                        </div>
                        <div className="grid grid-cols-2 items-center gap-4 border-b py-3">
                            <span className="font-medium text-gray-700">Contract ID:</span>
                            <span className="text-right text-gray-900">#{carrier.contractId}</span>
                        </div>
                        <div className="grid grid-cols-2 items-center gap-4 border-b py-3">
                            <span className="font-medium text-gray-700">Contract Start Date:</span>
                            <span className="text-right text-gray-900">{carrier.startDate}</span>
                        </div>
                        <div className="grid grid-cols-2 items-center gap-4 border-b py-3">
                            <span className="font-medium text-gray-700">Contract End Date:</span>
                            <span className="text-right text-gray-900">{carrier.endDate}</span>
                        </div>
                        <div className="grid grid-cols-2 items-center gap-4 py-3">
                            <span className="font-medium text-gray-700">Status:</span>
                            <span className="text-right">{getStatusBadge(carrier.status)}</span>
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