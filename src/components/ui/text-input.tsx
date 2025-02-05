import { Label } from "./label";
interface TextInputProps {
    text: string;
    value: string;
    onChange: (value: string) => void;
}

export function TextInput(props: TextInputProps) {
    return (
        <div className="gap-3 flex flex-col justify-between w-full h-full">
            <Label>{props.text}</Label>
            <input
                type="text"
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
                placeholder={props.text}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
        </div>
    )
}

export function TextAreaInput(props: TextInputProps) {
    return (
        <div className="gap-2 flex flex-col justify-between w-full h-full">
            <Label>{props.text}</Label>
            <textarea
                value={props.value}
                rows={3} cols={50}
                onChange={(e) => props.onChange(e.target.value)}
                placeholder={props.text}
                className="w-full p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
        </div>
    )
}