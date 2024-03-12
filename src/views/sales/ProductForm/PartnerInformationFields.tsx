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

type PartnerInformationFields = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: {
        orderPartner: string
        tags: Options
        [key: string]: unknown
    }
}

const filterPartners = (inputValue, partners) => {
    return partners.filter(
        (partner) =>
            partner.partnerDisplayName &&
            partner.partnerDisplayName
                .toLowerCase()
                .includes(inputValue.toLowerCase())
    )
}

const loadOptions = (inputValue, callback) => {
    setTimeout(async () => {
        try {
            const response = await fetch(`https://amate.onrender.com/partner`)
            const preData = await response.json()
            const data = preData.data
            console.log('Raw API Response:', data)

            const filteredPartners = filterPartners(inputValue, data)

            console.log('Filtered Partners:', filteredPartners)

            const transformedPartners = filteredPartners
                .filter((partner) => partner.partnerDisplayName)
                .map((partner) => ({
                    value: partner._id,
                    label: partner.partnerDisplayName,
                }))

            console.log('Transformed Partners:', transformedPartners)

            callback(transformedPartners)
        } catch (error) {
            console.error('Error fetching and filtering partners:', error)
            callback([])
        }
    }, 500)
}

const PartnerInformationFields = (props: PartnerInformationFields) => {
    const { touched, errors } = props

    const [orderPartner, setOrderPartner] = useState<String | null>('')
    const [partnerExternalOrderNumber, setPartnerExternalOrderNumber] =
        useState<String | null>('')

    const handlePartnerChange = (selectedOption) => {
        if (selectedOption) {
            const { value, label } = selectedOption
            // Assuming that orderPartner should be an object with _id and partnerDisplayName properties
            setOrderPartner({ _id: value, partnerDisplayName: label })
            console.log('selectedOption', selectedOption)
        }
    }

    console.log('orderPartner', orderPartner)

    const handlePartnerExternalOrderNumberChange = (e) => {
        const insertedValue = e.target.value
        setPartnerExternalOrderNumber(insertedValue)
    }

    console.log('Partner External Order Number', partnerExternalOrderNumber)

    return (
        <AdaptableCard divider className="mb-5">
            <h5 className="mb-4">Partner</h5>
            {/* <p className="mb-6">Section to config basic product information</p> */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-0">
                <div className="col-span-1">
                    <FormItem
                        label="Partner"
                        invalid={
                            (errors.orderPartner &&
                                touched.orderPartner) as boolean
                        }
                        errorMessage={errors.orderPartner}
                    >
                        <Select
                            cacheOptions
                            loadOptions={(inputValue, callback) =>
                                loadOptions(inputValue, callback)
                            }
                            defaultOptions
                            onChange={handlePartnerChange}
                            componentAs={AsyncSelect}
                        />
                    </FormItem>
                </div>

                <div className="col-span-1">
                    <FormItem
                        label="External Order Number"
                        invalid={
                            (errors.partnerExternalOrderNumber &&
                                touched.partnerExternalOrderNumber) as boolean
                        }
                        errorMessage={errors.partnerExternalOrderNumber}
                    >
                        <Input
                            placeholder="External Order Number"
                            onChange={handlePartnerExternalOrderNumberChange}
                        />
                    </FormItem>
                </div>
            </div>
        </AdaptableCard>
    )
}

export default PartnerInformationFields
