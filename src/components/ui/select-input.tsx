import { ChevronDown } from 'lucide-react'
import { Label } from "./label";

type SelectInputProps = {
    label: string
    value: string
    onChange: (value: string) => void
    options: { value: string; label: string }[]
  }

export function SelectInput({ label, value, onChange, options }: SelectInputProps) {
    return (
        <div className="gap-3 flex flex-col w-full">
            <Label>{label}</Label>
            <div className="relative">
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                    {options.map((option: any) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <ChevronDown size={16} className="text-gray-400 pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2" />
            </div>
        </div>
    )
}