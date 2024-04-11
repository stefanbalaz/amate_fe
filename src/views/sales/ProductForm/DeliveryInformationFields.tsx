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
    deliveryMethodMap,
    deliveryMethodDetailMap,
    deliveryRegionMap,
    transportMediumMap,
    containerMediumMap,
    unitsPerTransportMediumMap,
} from '@/configs/order.overview/orderStringMapper'
import AsyncSelect from 'react-select/async'
import InputGroup from '@/components/ui/InputGroup'

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

type ProductVolumeFields = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: {
        productVolume: Number
        tags: Options
        [key: string]: unknown
    }
}

type DeliveryInformationFields = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: {
        transportMedium: string
        tags: Options
        [key: string]: unknown
    }
    onFieldChange: (fieldName: string, value: any) => void
}

const { Addon } = InputGroup

const DeliveryInformationFields = (props: DeliveryInformationFields) => {
    const { touched, errors, onFieldChange } = props

    const [deliveryMethod, setDeliveryMethod] = useState<string | null>(
        'Select'
    )

    const [deliveryMethodDetail, setDeliveryMethodDetail] = useState<
        string | null
    >('Select')

    const [deliveryDate, setDeliveryDate] = useState<Date | null>('')

    const [deliveryRegion, setDeliveryRegion] = useState<string | null>(
        'Select'
    )

    const handleDeliveryMethodChange = (selectedOption: any) => {
        const selectedDeliveryMethod = selectedOption.value
        setDeliveryMethod(selectedDeliveryMethod)
    }

    //  console.log('deliveryMethod', deliveryMethod)

    const handleDeliveryMethodDetailChange = (selectedOption: any) => {
        const selectedDeliveryMethodDetail = selectedOption.value
        setDeliveryMethodDetail(selectedDeliveryMethodDetail)
    }

    //  console.log('deliveryMethodDetail', deliveryMethodDetail)

    const handleDeliveryDatePickerChange = (deliveryDate: Date | null) => {
        console.log('Selected delivery date', deliveryDate)
        setDeliveryDate(deliveryDate)
    }

    //  console.log('deliveryDate', deliveryDate)

    const handleDeliveryRegionChange = (selectedOption: any) => {
        const selectedDeliveryRegion = selectedOption.value
        setDeliveryRegion(selectedDeliveryRegion)
    }

    //  console.log('deliveryRegion', deliveryRegion)

    const handleFieldChange = (fieldName: string, value: any) => {
        onFieldChange(fieldName, value)
    }

    return (
        <AdaptableCard divider className="mb-5">
            <h5 className="mb-4">Delivery</h5>
            {/* <p className="mb-6">Section to config basic product information</p> */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-0">
                <div className="col-span-1">
                    <FormItem
                        label="Delivery Method"
                        invalid={
                            (errors.deliveryMethod &&
                                touched.deliveryMethod) as boolean
                        }
                        errorMessage={errors.deliveryMethod}
                    >
                        <Select
                            placeholder="Delivery Method"
                            /*   options={Object.values(deliveryMethodMap).map(
                                (statusInfo) => ({
                                    label: statusInfo.deliveryMethodKey,
                                    value: statusInfo.deliveryMethodKey,
                                })
                            )}
                            //  onChange={handleDeliveryMethodChange}
                            onChange={(selectedOption) =>
                                handleFieldChange('deliveryMethod', {
                                    value: selectedOption.value,
                                    label: selectedOption.deliveryMethodKey,
                                })
                            } */
                            options={Object.keys(deliveryMethodMap).map(
                                (key) => ({
                                    label: deliveryMethodMap[key]
                                        .deliveryMethodKey,
                                    value: key,
                                })
                            )}
                            onChange={(selectedOption) => {
                                const { value, label } = selectedOption
                                handleFieldChange('deliveryMethod', {
                                    value,
                                    label,
                                })
                            }}
                            defaultValue={{
                                label: 'Select',
                                value: 'Select',
                            }}
                        />
                    </FormItem>
                    <FormItem
                        label="Delivery Method Detail"
                        invalid={
                            (errors.deliveryMethodDetail &&
                                touched.deliveryMethodDetail) as boolean
                        }
                        errorMessage={errors.deliveryMethodDetail}
                    >
                        <Select
                            placeholder="Delivery Method Detail"
                            /*   options={Object.values(deliveryMethodDetailMap).map(
                                (statusInfo) => ({
                                    label: statusInfo.deliveryMethodDetailKey,
                                    value: statusInfo.deliveryMethodDetailKey,
                                })
                            )}
                            onChange={handleDeliveryMethodDetailChange}
 */

                            options={Object.keys(deliveryMethodDetailMap).map(
                                (key) => ({
                                    label: deliveryMethodDetailMap[key]
                                        .deliveryMethodDetailKey,
                                    value: key,
                                })
                            )}
                            onChange={(selectedOption) => {
                                const { value, label } = selectedOption
                                handleFieldChange('deliveryMethodDetail', {
                                    value,
                                    label,
                                })
                            }}
                            defaultValue={{
                                label: 'Select',
                                value: 'Select',
                            }}
                        />
                    </FormItem>
                </div>
                <div className="col-span-1">
                    <FormItem
                        label="Delivery Date"
                        invalid={
                            (errors.deliveryDate &&
                                touched.deliveryDate) as boolean
                        }
                        errorMessage={errors.deliveryDate}
                    >
                        <DatePicker
                            inputPrefix={
                                <HiOutlineCalendar className="text-lg" />
                            }
                            inputSuffix={null}
                            inputFormat="MMMM, DD YYYY"
                            name="deliveryDate"
                            placeholder="Delivery Date"
                            value={deliveryDate}
                            // onChange={handleDeliveryDatePickerChange}
                            onChange={(deliveryDate) =>
                                handleFieldChange('deliveryDate', deliveryDate)
                            }
                        />
                    </FormItem>
                    <FormItem
                        label="Delivery Region"
                        invalid={
                            (errors.deliveryRegion &&
                                touched.deliveryRegion) as boolean
                        }
                        errorMessage={errors.deliveryRegion}
                    >
                        <Select
                            placeholder="Delivery Region"
                            /* options={Object.values(deliveryRegionMap).map(
                                (statusInfo) => ({
                                    label: statusInfo.deliveryRegionKey,
                                    value: statusInfo.deliveryRegionKey,
                                })
                            )}
                            onChange={handleDeliveryRegionChange} */
                            options={Object.keys(deliveryRegionMap).map(
                                (key) => ({
                                    label: deliveryRegionMap[key]
                                        .deliveryRegionKey,
                                    value: key,
                                })
                            )}
                            onChange={(selectedOption) => {
                                const { value, label } = selectedOption
                                handleFieldChange('deliveryRegion', {
                                    value,
                                    label,
                                })
                            }}
                            defaultValue={{
                                label: 'Select',
                                value: 'Select',
                            }}
                        />
                    </FormItem>
                </div>
            </div>
        </AdaptableCard>
    )
}

export default DeliveryInformationFields
