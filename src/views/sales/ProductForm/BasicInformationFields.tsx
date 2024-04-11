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
import { orderStatusMap } from '@/configs/order.overview/orderStringMapper'
import AsyncSelect from 'react-select/async'
import { useSelector } from 'react-redux'

type Options = {
    label: string
    value: string
}[]

type FormFieldsName = {
    orderNumber: string

    orderStatus: string
    orderCreationDate: Date
    name: string
    productCode: string
    description: string
}

type BasicInformationFields = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: {
        tags: Options
        [key: string]: unknown
    }
    onFieldChange: (fieldName: string, value: any) => void
}

const BasicInformationFields = (props: BasicInformationFields) => {
    const { touched, errors, values, onFieldChange } = props

    const [date, setDate] = useState<Date | null>(new Date())
    const [orderStatus, setOrderStatus] = useState<string | null>(
        'Preliminary Order'
    )
    const [orderNumber, setOrderNumber] = useState<String | null>('')

    /*   const handleDatePickerChange = (date: Date | null) => {
        console.log('Selected date', date)
        setDate(date)
    }

    const handleOrderStatusChange = (selectedOption: any) => {
        const selectedOrderStatus = selectedOption.value
        console.log('Selected Order Status', selectedOrderStatus)
        setOrderStatus(selectedOrderStatus)
    }

    console.log('DrawerOrderStatusContent', orderStatusMap) */

    useEffect(() => {
        const generateOrderNumber = () => {
            fetch('https://amate.onrender.com/module/orderNumber')
                .then((response) => response.json())
                .then((data) => {
                    setOrderNumber(data)
                    onFieldChange('orderNumber', data.orderNumber)
                })
                .catch((error) => console.error(error))
        }

        generateOrderNumber()
    }, [])

    //  console.log('orderNumber', orderNumber)

    const handleFieldChange = (fieldName: string, value: any) => {
        onFieldChange(fieldName, value)
    }

    /* TEST */

    const merchantID = useSelector((state) => state.merchant.merchantID)
    console.log('merchantID BASIC INFORMATION', merchantID)

    return (
        <AdaptableCard divider className="mb-5">
            <h5 className="mb-4">General</h5>
            {/* <p className="mb-6">Section to config basic product information</p> */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-0">
                <div className="col-span-1">
                    <FormItem
                        label="Order Number"
                        invalid={
                            (errors.orderNumber &&
                                touched.orderNumber) as boolean
                        }
                        errorMessage={errors.orderNumber}
                    >
                        {/*   <Field
                            disabled
                            type="text"
                            autoComplete="off"
                            name="orderNumber"
                            placeholder="Order Number"
                            component={Input}
                            value={orderNumber.orderNumber}
                            onChange={(e) =>
                                handleFieldChange('orderNumber', e.target.value)
                            }
                        /> */}
                        <Field
                            disabled
                            type="text"
                            autoComplete="off"
                            name="orderNumber"
                            placeholder="Order Number"
                            component={Input}
                            value={orderNumber.orderNumber}
                        />
                    </FormItem>

                    <FormItem
                        label="Order Status"
                        invalid={
                            (errors.orderStatus &&
                                touched.orderStatus) as boolean
                        }
                        errorMessage={errors.orderStatus}
                    >
                        <Select
                            placeholder="Order Status"
                            /*   options={Object.values(orderStatusMap).map(
                                (statusInfo) => ({
                                    label: statusInfo.orderStatusKey,
                                    value: statusInfo.orderStatusKey,
                                })
                            )} */
                            //   onChange={handleOrderStatusChange}
                            /*      onChange={
                                (selectedOption) =>
                                    handleFieldChange(
                                        'orderStatus',
                                        selectedOption.value
                                    ) // Use handleFieldChange to update field value
                            } */
                            options={Object.keys(orderStatusMap).map((key) => ({
                                label: orderStatusMap[key].orderStatusKey,
                                value: key,
                            }))}
                            onChange={(selectedOption) => {
                                const { value, label } = selectedOption
                                handleFieldChange('orderStatus', {
                                    value,
                                    label,
                                })
                            }}
                            defaultValue={{
                                label: 'Preliminary Order',
                                value: 'preliminary_order',
                            }}
                        />
                    </FormItem>
                </div>
                <div className="col-span-1">
                    <FormItem
                        label="Creation Date"
                        invalid={
                            (errors.orderCreationDate &&
                                touched.orderCreationDate) as boolean
                        }
                        errorMessage={errors.orderCreationDate}
                    >
                        <DatePicker
                            inputPrefix={
                                <HiOutlineCalendar className="text-lg" />
                            }
                            inputSuffix={null}
                            inputFormat="MMMM, DD YYYY"
                            name="orderCreationDate"
                            placeholder="Creation Date"
                            value={date}
                            // onChange={handleDatePickerChange}
                            onChange={
                                (date) =>
                                    handleFieldChange('orderCreationDate', date) // Use handleFieldChange to update field value
                            }
                        />
                    </FormItem>

                    {/*             <FormItem
                label="Product Name"
                invalid={(errors.name && touched.name) as boolean}
                errorMessage={errors.name}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="name"
                    placeholder="Name"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Code"
                invalid={(errors.productCode && touched.productCode) as boolean}
                errorMessage={errors.productCode}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="productCode"
                    placeholder="Code"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Description"
                labelClass="!justify-start"
                invalid={(errors.description && touched.description) as boolean}
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
            </div>
        </AdaptableCard>
    )
}

export default BasicInformationFields
