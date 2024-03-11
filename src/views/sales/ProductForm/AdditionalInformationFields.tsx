import AdaptableCard from '@/components/shared/AdaptableCard'
import RichTextEditor from '@/components/shared/RichTextEditor'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'
import DatePicker from '@/components/ui/DatePicker'
import { useEffect, useState } from 'react'
import { HiOutlineCalendar } from 'react-icons/hi'
import React from 'react'
import Select from '@/components/ui/Select'
import {
    orderStatusMap,
    paymentStatusMap,
} from '@/configs/order.overview/orderStringMapper'
import AsyncSelect from 'react-select/async'

type Options = {
    label: string
    value: string
}[]

type FormFieldsName = {
    orderNumber: string
    orderPartner: string
    orderStatus: string
    orderCreationDate: Date
    name: string
    productCode: string
    description: string
}

type AdditionalInformationFields = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: {
        orderPartner: string
        tags: Options
        [key: string]: unknown
    }
}

const AdditionalInformationFields = (props: AdditionalInformationFields) => {
    const { touched, errors } = props

    const [note, setNote] = useState<String | null>('')

    const handleNoteChange = (note: string | null) => {
        setNote(note)
    }

    console.log('Note', note)

    return (
        <AdaptableCard divider className="mb-5">
            <h5 className="mb-4">Additional</h5>
            {/* <p className="mb-6">Section to config basic product information</p> */}

            <div className="grid grid-cols-1  gap-4">
                <FormItem
                    label="Note"
                    invalid={(errors.note && touched.note) as boolean}
                    errorMessage={errors.note}
                >
                    <Input
                        placeholder="Note"
                        onChange={handleNoteChange}
                        textArea
                    />
                </FormItem>
                {/*    <FormItem
                    label="Description"
                    labelClass="!justify-start"
                    invalid={
                        (errors.description && touched.description) as boolean
                    }
                    errorMessage={errors.description}
                >
                    <Field name="description">
                        {({ field, form }: FieldProps) => (
                            <RichTextEditor
                                value={field.value}
                                  onChange={(val) =>
                                    form.setFieldValue(field.name, val)
                                } 
                            />
                        )}
                    </Field>
                </FormItem> */}
            </div>
        </AdaptableCard>
    )
}

export default AdditionalInformationFields
