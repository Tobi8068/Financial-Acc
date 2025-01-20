import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'

interface NumberInputProps {
  label?: string
  value?: number
  onChange?: (value: number) => void
  min?: number
  max?: number
}

export default function NumberInput({
  label,
  value: initialValue = 0,
  onChange,
  min = 0,
  max = Infinity
}: NumberInputProps) {
  const [value, setValue] = useState(initialValue)

  const handleChange = (newValue: number) => {
    const clampedValue = Math.min(Math.max(newValue, min), max)
    setValue(clampedValue)
    onChange?.(clampedValue)
  }

  return (
    <div className="w-full gap-3 flex flex-col h-full justify-between">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
      </label>
      <div className="bg-white rounded-lg shadow-sm px-4 py-2 flex justify-between items-center border border-gray-200">
        <Minus onClick={() => handleChange(value - 1)}
          className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
          aria-label="Decrease number" />
        <span className="text-gray-900 font-medium">
          {value}
        </span>
        <Plus onClick={() => handleChange(value + 1)}
          className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
          aria-label="Increase number" />
      </div>
    </div>
  )
}