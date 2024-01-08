import React, { useState, useEffect } from 'react'
import Input from '@/components/ui/Input'

type EditableCellProps = {
    getValue: () => string | number | boolean | undefined
    row?: { index: number }
    column?: { id: string }
    table?: {
        options: {
            meta?: {
                updateData: (newValue: any) => void
            }
        }
    }
}

const EditableCell = ({ getValue, row, column, table }: EditableCellProps) => {
    const initialValue = getValue()
    const [value, setValue] = useState<string | number | boolean | undefined>(
        initialValue
    )

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setValue(newValue)
    }

    const handleBlur = () => {
        if (table?.options?.meta?.updateData) {
            if (row && column) {
                // Pass the new value to the updateData function
                table.options.meta.updateData(value)
            } else {
                table.options.meta.updateData(value)
            }
        }
    }

    return (
        <Input
            className="border-transparent bg-transparent hover:border-gray-300 focus:bg-gray-700"
            size="sm"
            value={value as string}
            onChange={handleChange}
            onBlur={handleBlur} // Trigger updateData on blur
        />
    )
}

export default EditableCell
