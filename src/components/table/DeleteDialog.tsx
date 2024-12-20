'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { Trash2, CircleX } from 'lucide-react'

interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteDialog({ open, onClose, onConfirm }: DeleteDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[400px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
          <Dialog.Title className="text-xl font-semibold text-gray-900">
            Delete
          </Dialog.Title>
          <div className="flex flex-col items-center gap-6">
            <div className="rounded-full bg-red-50 p-3">
              <Trash2 className="h-6 w-6 text-red-600" />
            </div>
            <Dialog.Description className="text-center flex flex-col">
              <span className="text-xl font-semibold text-gray-900">
                Are you Sure?
              </span>
              <span className="mt-2 text-sm text-gray-500">
                You want to delete this?
              </span>
            </Dialog.Description>
            <div className="flex w-full gap-4">
              <Dialog.Close asChild>
                <button
                  onClick={onClose}
                  className="flex-1 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200">
                  Cancel
                </button>
              </Dialog.Close>
              <button
                onClick={onConfirm}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Delete
              </button>
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

