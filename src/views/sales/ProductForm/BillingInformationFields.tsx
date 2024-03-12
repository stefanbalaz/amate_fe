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
    paymentRecordMap,
    paymentMethodMap,
    paymentStatusMap,
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

type BillingInformationFields = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: {
        transportMedium: string
        tags: Options
        [key: string]: unknown
    }
}

const { Addon } = InputGroup

const BillingInformationFields = (props: BillingInformationFields) => {
    const { touched, errors } = props

    const [paymentMethod, setPaymentMethod] = useState<string | null>('Select')
    const [paymentRecord, setPaymentRecord] = useState<string | null>('Select')
    const [paymentInvoiceNumber, setPaymentInvoiceNumber] = useState<
        string | null
    >('')
    const [paymentRecordIssuanceDate, setPaymentRecordIssuanceDate] =
        useState<Date | null>('')
    const [deliveryNoteNumber, setDeliveryNoteNumber] = useState<string | null>(
        ''
    )
    const [deliveryNoteIssuanceDate, setDeliveryNoteIssuanceDate] =
        useState<Date | null>('')
    const [paymentReceivedDate, setPaymentReceivedDate] = useState<Date | null>(
        ''
    )
    const [paymentStatus, setPaymentStatus] = useState<string | null>('Select')
    const [paymentReminderSentDate, setPaymentReminderSentDate] =
        useState<Date | null>('')

    const handlePaymentMethodChange = (selectedOption: any) => {
        const selectedPaymentMethod = selectedOption.value
        setPaymentMethod(selectedPaymentMethod)
    }

    console.log('deliveryMethod', paymentMethod)

    const handlePaymentRecordChange = (selectedOption: any) => {
        const selectedPaymentRecord = selectedOption.value
        setPaymentRecord(selectedPaymentRecord)
    }

    console.log('paymentRecord', paymentRecord)

    /*    const handlePaymentInvoiceNumberChange = (paymentInvoiceNumber: any) => {
        setPaymentInvoiceNumber(paymentInvoiceNumber)
    }
 */
    const handlePaymentInvoiceNumberChange = (e) => {
        const insertedValue = e.target.value
        setPaymentInvoiceNumber(insertedValue)
    }

    console.log('paymentInvoiceNumber', paymentInvoiceNumber)

    const handlePaymentRecordIssuanceDateChange = (
        paymentRecordIssuanceDate: Date | null
    ) => {
        setPaymentRecordIssuanceDate(paymentRecordIssuanceDate)
    }

    console.log('paymentRecordIssuanceDate', paymentRecordIssuanceDate)

    const handleDeliveryNoteNumberChange = (e) => {
        const insertedValue = e.target.value
        setDeliveryNoteNumber(insertedValue)
    }

    console.log('deliveryNoteNumber', deliveryNoteNumber)

    const handleDeliveryNoteIssuanceDateChange = (
        deliveryNoteIssuanceDate: Date | null
    ) => {
        setDeliveryNoteIssuanceDate(deliveryNoteIssuanceDate)
    }

    console.log('deliveryNoteIssuanceDate', deliveryNoteIssuanceDate)

    const handlePaymentReceivedDateChange = (
        paymentReceivedDate: Date | null
    ) => {
        setPaymentReceivedDate(paymentReceivedDate)
    }

    console.log('paymentReceivedDate', paymentReceivedDate)

    const handlePaymentStatusChange = (selectedOption: any) => {
        const selectedPaymentStatus = selectedOption.value
        setPaymentStatus(selectedPaymentStatus)
    }

    console.log('paymentStatus', paymentStatus)

    const handlePaymentReminderSentDateChange = (
        paymentReminderSentDate: Date | null
    ) => {
        setPaymentReminderSentDate(paymentReminderSentDate)
    }

    console.log('paymentReminderSentDate', paymentReminderSentDate)

    return (
        <AdaptableCard divider className="mb-5">
            <h5 className="mb-4">Billing</h5>
            {/* <p className="mb-6">Section to config basic product information</p> */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-0">
                <div className="col-span-1">
                    <FormItem
                        label="Payment Method"
                        invalid={
                            (errors.paymentMethod &&
                                touched.paymentMethod) as boolean
                        }
                        errorMessage={errors.paymentMethod}
                    >
                        <Select
                            placeholder="Payment Method"
                            options={Object.values(paymentMethodMap).map(
                                (statusInfo) => ({
                                    label: statusInfo.paymentMethodKey,
                                    value: statusInfo.paymentMethodKey,
                                })
                            )}
                            onChange={handlePaymentMethodChange}
                            defaultValue={{
                                label: 'Select',
                                value: 'Select',
                            }}
                        />
                    </FormItem>
                    <FormItem
                        label="Payment Record"
                        invalid={
                            (errors.paymentRecord &&
                                touched.paymentRecord) as boolean
                        }
                        errorMessage={errors.paymentRecord}
                    >
                        <Select
                            placeholder="Payment Record"
                            options={Object.values(paymentRecordMap).map(
                                (statusInfo) => ({
                                    label: statusInfo.paymentRecordKey,
                                    value: statusInfo.paymentRecordKey,
                                })
                            )}
                            onChange={handlePaymentRecordChange}
                            defaultValue={{
                                label: 'Select',
                                value: 'Select',
                            }}
                        />
                    </FormItem>

                    <FormItem
                        label="Payment Record Issuance Date"
                        invalid={
                            (errors.paymentRecordIssuanceDate &&
                                touched.paymentRecordIssuanceDate) as boolean
                        }
                        errorMessage={errors.paymentRecordIssuanceDate}
                    >
                        <DatePicker
                            inputPrefix={
                                <HiOutlineCalendar className="text-lg" />
                            }
                            inputSuffix={null}
                            inputFormat="MMMM, DD YYYY"
                            name="paymentRecordIssuanceDate"
                            placeholder="Payment Record Issuance Date"
                            value={paymentRecordIssuanceDate}
                            onChange={handlePaymentRecordIssuanceDateChange}
                        />
                    </FormItem>

                    <FormItem
                        label="Invoice Number"
                        invalid={
                            (errors.paymentInvoiceNumber &&
                                touched.paymentInvoiceNumber) as boolean
                        }
                        errorMessage={errors.paymentInvoiceNumber}
                    >
                        <Input
                            placeholder="Invoice Number"
                            onChange={handlePaymentInvoiceNumberChange}
                        />
                    </FormItem>

                    <FormItem
                        label="Payment Status"
                        invalid={
                            (errors.paymentStatus &&
                                touched.paymentStatus) as boolean
                        }
                        errorMessage={errors.paymentStatus}
                    >
                        <Select
                            placeholder="Payment Status"
                            options={Object.values(paymentStatusMap).map(
                                (statusInfo) => ({
                                    label: statusInfo.paymentStatusKey,
                                    value: statusInfo.paymentStatusKey,
                                })
                            )}
                            onChange={handlePaymentStatusChange}
                            defaultValue={{
                                label: 'Unpaid',
                                value: 'Unpaid',
                            }}
                        />
                    </FormItem>
                </div>
                <div className="col-span-1">
                    <FormItem
                        label="Payment Received Date"
                        invalid={
                            (errors.paymentReceivedDate &&
                                touched.paymentReceivedDate) as boolean
                        }
                        errorMessage={errors.paymentReceivedDate}
                    >
                        <DatePicker
                            inputPrefix={
                                <HiOutlineCalendar className="text-lg" />
                            }
                            inputSuffix={null}
                            inputFormat="MMMM, DD YYYY"
                            name="paymentReceivedDate"
                            placeholder="Payment Received Date"
                            value={paymentReceivedDate}
                            onChange={handlePaymentReceivedDateChange}
                        />
                    </FormItem>

                    <FormItem
                        label="Delivery Note Number"
                        invalid={
                            (errors.deliveryNoteNumber &&
                                touched.deliveryNoteNumber) as boolean
                        }
                        errorMessage={errors.deliveryNoteNumber}
                    >
                        <Input
                            placeholder="Delivery Note Number"
                            onChange={handleDeliveryNoteNumberChange}
                        />
                    </FormItem>

                    <FormItem
                        label="Delivery Note Issuance Date"
                        invalid={
                            (errors.deliveryNoteIssuanceDate &&
                                touched.deliveryNoteIssuanceDate) as boolean
                        }
                        errorMessage={errors.deliveryNoteIssuanceDate}
                    >
                        <DatePicker
                            inputPrefix={
                                <HiOutlineCalendar className="text-lg" />
                            }
                            inputSuffix={null}
                            inputFormat="MMMM, DD YYYY"
                            name="deliveryNoteIssuanceDate"
                            placeholder="Delivery Note Issuance Date"
                            value={deliveryNoteIssuanceDate}
                            onChange={handleDeliveryNoteIssuanceDateChange}
                        />
                    </FormItem>

                    <FormItem
                        label="Payment Reminder Sent Date"
                        invalid={
                            (errors.paymentReminderSentDate &&
                                touched.paymentReminderSentDate) as boolean
                        }
                        errorMessage={errors.paymentReminderSentDate}
                    >
                        <DatePicker
                            inputPrefix={
                                <HiOutlineCalendar className="text-lg" />
                            }
                            inputSuffix={null}
                            inputFormat="MMMM, DD YYYY"
                            name="paymentReminderSentDate"
                            placeholder="Payment Reminder Sent Date"
                            value={paymentReminderSentDate}
                            onChange={handlePaymentReminderSentDateChange}
                        />
                    </FormItem>
                </div>
            </div>
        </AdaptableCard>
    )
}

export default BillingInformationFields
