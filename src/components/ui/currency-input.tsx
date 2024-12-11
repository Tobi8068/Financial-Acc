import { Label } from "./label";
type CurrencyInputProps = {
    label: string
    value: string
    onChange: (value: string) => void
    currency: string
    onCurrencyChange: (currency: string) => void
}

export function CurrencyInput({ label, value, onChange, currency, onCurrencyChange }: CurrencyInputProps) {
    return (
        <div className="gap-3 flex flex-col w-full">
            <Label>{label}</Label>
            <div className="flex w-full relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                    type="number"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full pl-7 pr-24 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <div className="flex items-center absolute right-2 top-1/2 transform -translate-y-1/2">
                    <select
                        value={currency}
                        onChange={(e) => onCurrencyChange(e.target.value)}
                        className="h-full py-0 pl-2 pr-7 border-l border-gray-200 bg-transparent text-gray-500 sm:text-sm focus:outline-none"
                    >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                    </select>
                </div>
            </div>
        </div>
    )
}