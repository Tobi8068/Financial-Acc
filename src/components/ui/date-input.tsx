

import { Label } from "./label";

interface DateInputProps {
    text: string;
    value: string;
    onChange: (value: Date) => void;
}

type DatePickerProps = {
    label: string
    value: string
    onChange: (date: Date) => void
}

const DatePicker = ({ label, value, onChange }: DatePickerProps) => (
    <div className="gap-3 flex flex-col w-full">
        <Label>{label}</Label>
        <div className="relative">
            <input
                type="date"
                value={value}
                onChange={(e) => onChange(new Date(e.target.value))}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
        </div>
    </div>
)

export function DateInput(props: DateInputProps) {
    return (
        <div className="space-y-1 gap-3 flex flex-col ">
            <DatePicker
                value={props.value}
                label={props.text}
                onChange={(date) => props.onChange(date)}
            />
        </div>
    )
}          