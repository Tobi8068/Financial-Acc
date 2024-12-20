'use client'

import { CarriesStatus } from '@/types/shipping'
import * as Dialog from '@radix-ui/react-dialog'
import * as Select from '@radix-ui/react-select'
import { ChevronDown, X } from 'lucide-react'
import { useEffect, useState } from 'react'

interface CarrierFormData {
  name: string
  contractId: string
  startDate: string
  endDate: string
  status: CarriesStatus
  quantity: string
}

interface EditCarrierProps {
  initialData: CarrierFormData
  onSave: (data: CarrierFormData) => void
  open: boolean;
  onClose: () => void;
}

export default function EditCarrier({ initialData, onSave, open, onClose }: EditCarrierProps) {
  const [formData, setFormData] = useState<CarrierFormData>(initialData)
  const statusData: CarriesStatus[] = ['Expired', 'Active'];

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleStatusChange = (value: CarriesStatus) => {
    setFormData(prev => ({
      ...prev,
      status: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Trigger asChild>
        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
          Edit Carrier
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]"
          aria-describedby={undefined}
        >
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <Dialog.Title className="text-xl font-semibold text-gray-900">
                Edit Carrier
              </Dialog.Title>
              <Dialog.Close asChild>
                <button className="rounded-full p-1.5 hover:bg-gray-100">
                  <X className="h-4 w-4 text-gray-500" />
                  <span className="sr-only">Close</span>
                </button>
              </Dialog.Close>
            </div>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="contractId" className="text-sm font-medium text-gray-700">
                  Contract ID:
                </label>
                <input
                  type="text"
                  id="contractId"
                  name="contractId"
                  value={formData.contractId}
                  onChange={handleInputChange}
                  className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="contractStartDate" className="text-sm font-medium text-gray-700">
                  Contract Start Date:
                </label>
                <input
                  type="text"
                  id="contractStartDate"
                  name="contractStartDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="contractEndDate" className="text-sm font-medium text-gray-700">
                  Contract End Date:
                </label>
                <input
                  type="text"
                  id="contractEndDate"
                  name="contractEndDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Contract Status:
                </label>
                <Select.Root
                  value={formData.status}
                  onValueChange={handleStatusChange}
                >
                  <Select.Trigger
                    className="flex items-center justify-between rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    aria-label="Contract Status"
                  >
                    <Select.Value />
                    <Select.Icon>
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </Select.Icon>
                  </Select.Trigger>
                  <Select.Portal>
                    <Select.Content className="overflow-hidden rounded-md border border-gray-200 bg-white shadow-md">
                      <Select.Viewport className="p-1">
                        {
                          statusData.map((item, index) => (
                            <Select.Item
                              key={index}
                              value={item}
                              className="relative flex cursor-pointer select-none items-center rounded-sm px-8 py-2 text-sm text-gray-900 data-[highlighted]:bg-gray-100 data-[highlighted]:outline-none"
                            >
                              <Select.ItemText>{item}</Select.ItemText>
                            </Select.Item>
                          ))
                        }
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              </div>
              <div className="grid gap-2">
                <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                  Quantity:
                </label>
                <input
                  type="text"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="mt-4 flex justify-end gap-3">
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                </Dialog.Close>
                <button
                  type="submit"
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}