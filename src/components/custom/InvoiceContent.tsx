import { useEffect, useState } from 'react'
import Button from '@/components/ui/Button'
import Loading from '@/components/shared/Loading'
import Logo from '@/components/template/Logo'
import ContentTable from './ContentTable'
import { useLocation } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import { HiLocationMarker, HiPhone } from 'react-icons/hi'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { useAppSelector } from '@/store'
import type { Product, Summary } from './ContentTable'
import { useParams } from 'react-router-dom'
import { fetchOrderWithPartnerMerchant } from '@/services/OrderService'
import { deliveryAddressPartnerOrderNumberPartnerMerchantID } from '@/configs/invoice/invoicePartnerConfig'
import Input from '@/components/ui/Input'

type Invoice = {
    id: string
    recipient: string
    email: string
    address: string[]
    phoneNumber: string
    dateTime: number
    product: Product[]
    paymentSummary: Summary
}

type GetAccountInvoiceDataRequest = { id: string }

type GetAccountInvoiceDataResponse = Invoice

interface DebouncedInputProps
    extends Omit<
        InputHTMLAttributes<HTMLInputElement>,
        'onChange' | 'size' | 'prefix'
    > {
    value: string | number
    onChange: (value: string | number) => void
    debounce?: number
}

function DebouncedInput({
    value: initialValue,
    onChange,
    debounce = 1000,
    ...props
}: DebouncedInputProps) {
    const [value, setValue] = useState(initialValue)

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value)
        }, debounce)

        return () => clearTimeout(timeout)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    return (
        <div className="flex items-center">
            <h3>
                <span style={{ whiteSpace: 'nowrap' }}>Invoice #</span>
            </h3>
            <h3>
                <Input
                    {...props}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="p-2 font-lg shadow border border-block"
                />
            </h3>
        </div>
    )
}

const InvoiceContent = () => {
    const { invoiceNumber } = useParams()
    const { textTheme } = useThemeClass()

    const location = useLocation()

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<Partial<Invoice>>({})

    const mode = useAppSelector((state) => state.theme.mode)
    const [totalPriceFromChild, setTotalPriceFromChild] = useState(0)

    const [editableInvoiceNumber, setEditableInvoiceNumber] = useState(
        data?.orderPayment?.invoiceNumber || ''
    )

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)

                // Use fetchOrderWithPartnerMerchant to get the order with partner and merchant details
                const order = await fetchOrderWithPartnerMerchant(invoiceNumber)

                console.log('invoiceOrder', order)

                if (order) {
                    setData(order)
                } else {
                    // Handle case when order is not found
                }
            } catch (error) {
                // Handle error fetching order data
                console.error('Error fetching orders:', error.message)
            } finally {
                setLoading(false)
            }
        }

        if (invoiceNumber) {
            fetchData()
        }
    }, [invoiceNumber])

    const handleInvoiceNumberChange = async (newValue) => {
        console.log('Updating invoice number with:', newValue)

        try {
            const payload = {
                orderPayment: {
                    invoiceNumber: newValue !== '' ? newValue : '',
                    // Add any other required parameters for updating the orderPayment
                },
                // Add other top-level properties if needed
            }

            const response = await fetch(
                /* `https://amate.onrender.com/order/${data._id}`, */
                `https://amate.onrender.com/order/${data._id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        // Add any necessary headers
                    },
                    body: JSON.stringify(payload),
                }
            )

            if (response.ok) {
                setData((prevData) => ({
                    ...prevData,
                    orderPayment: {
                        ...prevData.orderPayment,
                        invoiceNumber: newValue !== '' ? newValue : '',
                    },
                }))
                console.log('Invoice number updated successfully.')
            } else {
                console.error('Failed to update invoice number.')
            }

            console.log('Response:', response)
            console.log('Response JSON:', await response.json())
        } catch (error) {
            console.error('Error updating invoice number:', error.message)
        }
    }

    const handleTotalPriceChange = (totalPrice) => {
        // Handle the totalPrice received from the child component
        setTotalPriceFromChild(totalPrice)
    }

    useEffect(() => {
        if (!isEmpty(data)) {
            setEditableInvoiceNumber(data?.orderPayment?.invoiceNumber || '')
        }
    }, [data])

    return (
        <Loading loading={loading}>
            <div id="pdf-content">
                {!isEmpty(data) && (
                    <>
                        <div
                            className="grid grid-cols-3 gap-x-4"
                            style={{ rowGap: '40px', marginBottom: '40px' }}
                        >
                            {/* Row 1 Column 1 - Logo */}
                            <div className="col-span-1 row-span-1">
                                <Logo className="mb-3" mode={mode} />
                            </div>

                            {/* Row 1 Column 2 - Empty */}
                            <div className="col-span-1 row-span-1"></div>

                            {/* Row 1 Column 3 - Invoice Number, Order Creation Date */}
                            <div className="col-span-1 row-span-1">
                                <div className="my-4">
                                    {/* Invoice Number and Order Creation Date rendering */}
                                    <div className="mb-2">
                                        <DebouncedInput
                                            value={editableInvoiceNumber}
                                            className="p-2 font-lg shadow border border-block"
                                            placeholder="NoYYYY"
                                            onChange={(value) =>
                                                handleInvoiceNumberChange(value)
                                            } // Change this to your desired function
                                        />
                                        <span>
                                            Date:{' '}
                                            {
                                                data?.orderPayment
                                                    .recordIssuanceDate
                                            }
                                        </span>
                                        <br />
                                        <span>
                                            Invoice umber: {data?.orderNumber}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Row 2 Column 1 - Merchant Data */}
                            <div
                                className="col-span-1 row-span-1 "
                                style={{ marginTop: '-40px' }}
                            >
                                <address className="not-italic">
                                    <h5>
                                        {
                                            data.orderMerchant
                                                .selectedMerchantData
                                                .companyName
                                        }
                                    </h5>
                                    <div>
                                        <span>
                                            <div className="mt-2 flex">
                                                <HiLocationMarker
                                                    className={`text-xl ${textTheme}`}
                                                />
                                                <div className="ltr:ml-3 rtl:mr-3">
                                                    <span>
                                                        {
                                                            data.orderMerchant
                                                                .selectedMerchantData
                                                                .streetNameNumber
                                                        }
                                                    </span>
                                                    <br />
                                                    <span>
                                                        {
                                                            data.orderMerchant
                                                                .selectedMerchantData
                                                                .zipCode
                                                        }{' '}
                                                        {
                                                            data.orderMerchant
                                                                .selectedMerchantData
                                                                .city
                                                        }
                                                    </span>
                                                    <br />
                                                    <span>
                                                        {
                                                            data.orderMerchant
                                                                .selectedMerchantData
                                                                .country
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="mt-2 flex">
                                                <HiPhone
                                                    className={`text-xl ${textTheme}`}
                                                />
                                                <div className="ltr:ml-3 rtl:mr-3">
                                                    {
                                                        data.orderMerchant
                                                            .selectedMerchantData
                                                            .phoneNumber
                                                    }
                                                </div>
                                            </div>
                                        </span>

                                        <div className="mt-2 flex">
                                            BusinessID:{' '}
                                            {
                                                data.orderMerchant
                                                    .selectedMerchantData
                                                    .businessID
                                            }
                                            <br />
                                            {!data.orderMerchant
                                                .selectedMerchantData
                                                .VATRegNo ||
                                            data.orderMerchant
                                                .selectedMerchantData
                                                .VATRegNo === ' ' ||
                                            data.orderMerchant
                                                .selectedMerchantData
                                                .VATRegNo === undefined
                                                ? `taxID: ${data.orderMerchant.selectedMerchantData.taxID}`
                                                : `VATRegNo: ${data.orderMerchant.selectedMerchantData.VATRegNo}`}
                                        </div>
                                    </div>
                                </address>
                            </div>

                            {/* Row 2 Column 2 - Order Partner Delivery Address, partner order number and partner merchant number */}
                            {deliveryAddressPartnerOrderNumberPartnerMerchantID.includes(
                                data?.orderPartner.ID
                            ) ? (
                                <div
                                    className="col-span-1 row-span-1"
                                    style={{ marginTop: '-40px' }}
                                >
                                    {/* Order Partner Delivery Address rendering */}
                                    <span>DELIVERY ADDRESS:</span>
                                    {!data?.orderDelivery
                                        ?.selectedDeliveryAddress
                                        ?.companyName ? (
                                        <div className="mt-2 flex">
                                            {
                                                data?.orderDelivery
                                                    ?.selectedDeliveryAddress
                                                    ?.forename
                                            }{' '}
                                            {
                                                data?.orderDelivery
                                                    ?.selectedDeliveryAddress
                                                    ?.surname
                                            }
                                        </div>
                                    ) : (
                                        <div className="mt-2 flex">
                                            {
                                                data?.orderDelivery
                                                    ?.selectedDeliveryAddress
                                                    ?.companyName
                                            }
                                        </div>
                                    )}
                                    <div className="mt-2 flex">
                                        <HiLocationMarker
                                            className={`text-xl ${textTheme}`}
                                        />
                                        <div className="ltr:ml-3 rtl:mr-3">
                                            <span>
                                                {
                                                    data?.orderDelivery
                                                        ?.selectedDeliveryAddress
                                                        ?.streetNameNumber
                                                }
                                            </span>
                                            <br />
                                            <span>
                                                {
                                                    data?.orderDelivery
                                                        ?.selectedDeliveryAddress
                                                        ?.zipCode
                                                }{' '}
                                                {
                                                    data
                                                        ?.selectedDeliveryAddress
                                                        ?.selectedDeliveryAddress
                                                        ?.city
                                                }
                                            </span>
                                            <br />
                                            <span>
                                                {
                                                    data?.orderDelivery
                                                        ?.selectedDeliveryAddress
                                                        ?.country
                                                }
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-2 flex">
                                        Partner Order Number:{' '}
                                        {data?.orderPartner.externalOrderNumber}
                                        <br />
                                        Partner Merchant ID:{' '}
                                        {data?.orderPartner.internalMerchantID}
                                    </div>
                                </div>
                            ) : (
                                <div className="col-span-1 row-span-1"></div>
                            )}

                            {/* Row 2 Column 3 - OrderPartner Data */}
                            <div
                                className="col-span-1 row-span-1"
                                style={{ marginTop: '-40px' }}
                            >
                                <address className="not-italic">
                                    {!data?.orderPayment?.selectedBillingAddress
                                        ?.companyName ? (
                                        <h5>
                                            {
                                                data?.orderPayment
                                                    ?.selectedBillingAddress
                                                    ?.forename
                                            }{' '}
                                            {
                                                data?.orderPayment
                                                    ?.selectedBillingAddress
                                                    ?.surname
                                            }
                                        </h5>
                                    ) : (
                                        <h5>
                                            {
                                                data?.orderPayment
                                                    ?.selectedBillingAddress
                                                    ?.companyName
                                            }
                                        </h5>
                                    )}
                                    <div>
                                        <span>
                                            <div className="mt-2 flex">
                                                <HiLocationMarker
                                                    className={`text-xl ${textTheme}`}
                                                />
                                                <div className="ltr:ml-3 rtl:mr-3">
                                                    <span>
                                                        {
                                                            data?.orderPayment
                                                                .selectedBillingAddress
                                                                ?.streetNameNumber
                                                        }
                                                    </span>
                                                    <br />
                                                    <span>
                                                        {
                                                            data?.orderPayment
                                                                .selectedBillingAddress
                                                                ?.zipCode
                                                        }{' '}
                                                        {
                                                            data?.orderPayment
                                                                .selectedBillingAddress
                                                                ?.city
                                                        }
                                                    </span>
                                                    <br />
                                                    <span>
                                                        {
                                                            data?.orderPayment
                                                                .selectedBillingAddress
                                                                ?.country
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="mt-2 flex">
                                                <HiPhone
                                                    className={`text-xl ${textTheme}`}
                                                />
                                                <div className="ltr:ml-3 rtl:mr-3">
                                                    {
                                                        data?.orderPayment
                                                            .selectedBillingAddress
                                                            ?.phoneNumber
                                                    }
                                                </div>
                                            </div>
                                            <div className="mt-2 flex">
                                                BusinessID:{' '}
                                                {
                                                    data?.orderPayment
                                                        .selectedBillingAddress
                                                        ?.businessID
                                                }
                                                <br />
                                                {!data?.orderPayment
                                                    .selectedBillingAddress
                                                    .VATRegNo ||
                                                data?.orderPayment
                                                    .selectedBillingAddress
                                                    .VATRegNo === ' ' ||
                                                data?.orderPayment
                                                    .selectedBillingAddress
                                                    .VATRegNo === undefined
                                                    ? `taxID: ${data?.orderPayment.selectedBillingAddress.taxID}`
                                                    : `VATRegNo: ${data?.orderPayment.selectedBillingAddress.VATRegNo}`}
                                            </div>
                                        </span>
                                    </div>
                                </address>
                            </div>

                            {/* Row 3 Column 1 - Empty */}

                            <div className="col-span-1 row-span-1">
                                Issued by:{' '}
                                {
                                    data?.orderMerchant.selectedMerchantData
                                        ?.salutation
                                }{' '}
                                {
                                    data?.orderMerchant.selectedMerchantData
                                        ?.forename
                                }{' '}
                                {
                                    data?.orderMerchant.selectedMerchantData
                                        ?.surname
                                }
                                <br />
                                E-Mail:{' '}
                                {
                                    data?.orderMerchant.selectedMerchantData
                                        ?.email
                                }
                                <br />
                                Web:{' '}
                                {
                                    data?.orderMerchant.completeMerchantData
                                        ?.merchantRegistration.web
                                }
                                <br />
                                IBAN:{' '}
                                {data?.orderMerchant.selectedMerchantData?.IBAN}
                            </div>

                            {/* Row 3 Column 2 - Empty */}

                            <div className="col-span-1 row-span-1">
                                Order creation date: {data?.orderCreationDate}{' '}
                                <br />
                                Delivery method:{' '}
                                {data?.mappedStrings.customDeliveryMethod}
                                <br />
                                Delivery date: {data?.orderDelivery.date} <br />
                                Variable symbol:{' '}
                                {data?.orderPayment?.invoiceNumber}
                            </div>

                            {/* Row 3 Column 3 - Empty */}

                            <div className="col-span-1 row-span-1">
                                Invoice issuance date:{' '}
                                {data?.orderPayment.recordIssuanceDate} <br />
                                Payment due date: {data?.orderPayment.dueDate}
                                <br />
                                Payment method:{' '}
                                {data?.mappedStrings.customPaymentMethod} <br />
                                Total due: {totalPriceFromChild}€
                            </div>
                        </div>
                        <ContentTable
                            productData={data?.orderProduct || []} // Adding a default empty array if products is undefined
                            priceData={data?.orderPayment?.selectedPrice || {}} // Pass priceData as a prop
                            packagingData={data?.orderPackaging || {}} // Pass priceData as a prop
                            mappedStrings={data?.mappedStrings || {}}
                            //otherData={/* Other relevant data you want to pass */}
                            summary={data.paymentSummary}
                            onTotalPriceChange={handleTotalPriceChange} // Pass the handler to the child
                        />

                        <div className="print:hidden mt-6 flex items-center justify-between">
                            <small className="italic">
                                Invoice was created on a computer and is valid
                                without the signature and seal.
                                <br />
                                Zapísaný v OR OS Nitra, odd,: Sro, vl.č.:42737/N
                            </small>
                            <Button
                                variant="solid"
                                onClick={() => window.print()}
                            >
                                Print
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </Loading>
    )
}

export default InvoiceContent
