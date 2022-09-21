export type TInputField = {
    name?: String,
    tabIndex?: number
    className?: string
    onChange?: (e: any) => void
    disabled?: boolean,
    stateValue: string,
    setStateValue: React.Dispatch<React.SetStateAction<string>>
    required?: boolean
}

export const InputTextField: React.FC<TInputField> = ({
    name = "Name",
    tabIndex = 0,
    className = "m-2 border-2 p-2 rounded-lg focus:ring-4 focus:outline-none focus:ring-gray-500",
    onChange,
    disabled = false,
    stateValue,
    setStateValue,
    required = true
}) => {
    return <label>
        {name}:
        <input type="text" className={className} tabIndex={tabIndex} value={stateValue} disabled={disabled} required={required} onChange={onChange ? onChange : e => setStateValue((prev) => {
            prev = e.target.value
            return prev;
        })} />
    </label>
}