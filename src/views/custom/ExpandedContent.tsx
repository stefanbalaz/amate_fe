import { useEffect, useState } from 'react'
import { Amount, PriceAmount } from '@/configs/custom/units'
import { fetchOrderWithPartnerMerchant } from '@/services/OrderService'

const getNestedPropertyValue = (obj: any, path: string): any => {
    const keys = path.split('.')
    return keys.reduce(
        (acc, key) => (acc && acc[key] !== 'undefined' ? acc[key] : undefined),
        obj
    )
}

const ExpandedContent = ({ orderId }) => {
    const [orderDetails, setOrderDetails] = useState(null)

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                // Fetch additional order details based on orderId using your API service
                const result = await fetchOrderWithPartnerMerchant(orderId)
                setOrderDetails(result)
                // console.log('result', result);
            } catch (error) {
                console.error('Error fetching order details:', error.message)
            }
        }
        fetchOrderDetails()
    }, [])

    console.log('ExpandedContent', orderDetails)

    const fieldBlocks = [
        // Define your blocks with headline and key-value pairs

        {
            headline: 'Price',
            keyValues: [
                {
                    field: 'field1',
                    label: 'Drink Net',
                    value: getNestedPropertyValue(
                        orderDetails,
                        'orderPayment.selectedPrice.drinkNet'
                    ),
                    renderWithPriceAmount: true,
                },
                {
                    field: 'field2',
                    label: 'Drink Reduced Net',
                    value: getNestedPropertyValue(
                        orderDetails,
                        'orderPayment.selectedPrice.drinkReducedNet'
                    ),
                    renderWithPriceAmount: true,
                },
                {
                    field: 'field3',
                    label: 'Deposit Glass',
                    value: getNestedPropertyValue(
                        orderDetails,
                        'orderPayment.selectedPrice.depositGlass'
                    ),
                    renderWithPriceAmount: true,
                },
                {
                    field: 'field4',
                    label: 'Deposit PET',
                    value: getNestedPropertyValue(
                        orderDetails,
                        'orderPayment.selectedPrice.depositPET'
                    ),
                    renderWithPriceAmount: true,
                },
                {
                    field: 'field5',
                    label: 'Deposit Crate',
                    value: getNestedPropertyValue(
                        orderDetails,
                        'orderPayment.selectedPrice.depositCrate'
                    ),
                    renderWithPriceAmount: true,
                },
                {
                    field: 'field6',
                    label: 'Deposit Cardboard',
                    value: getNestedPropertyValue(
                        orderDetails,
                        'orderPayment.selectedPrice.depositCardboard'
                    ),
                    renderWithPriceAmount: true,
                },
                {
                    field: 'field7',
                    label: 'Deposit Palette',
                    value: getNestedPropertyValue(
                        orderDetails,
                        'orderPayment.selectedPrice.depositPalette'
                    ),
                    renderWithPriceAmount: true,
                },
                // Add more key-value pairs for Block 1
            ],
        },

        {
            headline: 'Delivery Address',
            keyValues: [
                {
                    field: 'field1',
                    label: 'Company Name',
                    value: getNestedPropertyValue(
                        orderDetails,
                        'orderDelivery.selectedDeliveryAddress.companyName'
                    ),
                },
                {
                    field: 'field2',
                    label: 'Forename',
                    value: getNestedPropertyValue(
                        orderDetails,
                        'orderDelivery.selectedDeliveryAddress.forename'
                    ),
                },
                {
                    field: 'field3',
                    label: 'Surname',
                    value: getNestedPropertyValue(
                        orderDetails,
                        'orderDelivery.selectedDeliveryAddress.surname'
                    ),
                },
                {
                    field: 'field4',
                    label: 'Street Name Number',
                    value: getNestedPropertyValue(
                        orderDetails,
                        'orderDelivery.selectedDeliveryAddress.streetNameNumber'
                    ),
                },
                {
                    field: 'field5',
                    label: 'City',
                    value: getNestedPropertyValue(
                        orderDetails,
                        'orderDelivery.selectedDeliveryAddress.city'
                    ),
                },
                {
                    field: 'field6',
                    label: 'Country',
                    value: getNestedPropertyValue(
                        orderDetails,
                        'orderDelivery.selectedDeliveryAddress.country'
                    ),
                },
                {
                    field: 'field7',
                    label: 'Phone Number',
                    value: getNestedPropertyValue(
                        orderDetails,
                        'orderDelivery.selectedDeliveryAddress.phoneNumber'
                    ),
                },
                {
                    field: 'field8',
                    label: 'E-Mail',
                    value: getNestedPropertyValue(
                        orderDetails,
                        'orderDelivery.selectedDeliveryAddress.email'
                    ),
                },
                // Add more key-value pairs for Block 1
            ],
        },

        {
            headline: 'Delivery Details',
            keyValues: [
                {
                    field: 'field1',
                    label: 'Delivery Date',
                    value: getNestedPropertyValue(
                        orderDetails,
                        'orderDelivery.date'
                    ),
                },
                {
                    field: 'field2',
                    label: 'Delivery Note Number',
                    value: getNestedPropertyValue(
                        orderDetails,
                        'orderDelivery.deliveryNoteNumber'
                    ),
                },
                {
                    field: 'field3',
                    label: 'Method Detail',
                    value: getNestedPropertyValue(
                        orderDetails,
                        'mappedStrings.customDeliveryMethodDetail'
                    ),
                },
                {
                    field: 'field4',
                    label: 'Region',
                    value: getNestedPropertyValue(
                        orderDetails,
                        'mappedStrings.customDeliveryRegion'
                    ),
                },
                // Add more key-value pairs for Block 1
            ],
        },

        {
            headline: 'Billing Address',
            keyValues: [
                {
                    field: 'field1',
                    label: 'Company Name',
                    value: getNestedPropertyValue(
                        orderDetails,
                        'orderPayment.selectedBillingAddress.companyName'
                    ),
                },
                {
                    field: 'field2',
                    label: 'Forename',
                    value: getNestedPropertyValue(
                        orderDetails,
                        'orderPayment.selectedBillingAddress.forename'
                    ),
                },
                {
                    field: 'field3',
                    label: 'Surname',
                    value: getNestedPropertyValue(
                        orderDetails,
                        'orderPayment.selectedBillingAddress.surname'
                    ),
                },
                {
                    field: 'field4',
                    label: 'Street Name Number',
                    value: getNestedPropertyValue(
                        orderDetails,
                        'orderPayment.selectedBillingAddress.streetNameNumber'
                    ),
                },
                {
                    field: 'field5',
                    label: 'City',
                    value: getNestedPropertyValue(
                        orderDetails,
                        'orderPayment.selectedBillingAddress.city'
                    ),
                },
                {
                    field: 'field6',
                    label: 'Country',
                    value: getNestedPropertyValue(
                        orderDetails,
                        'orderPayment.selectedBillingAddress.country'
                    ),
                },
                {
                    field: 'field7',
                    label: 'Phone Number',
                    value: getNestedPropertyValue(
                        orderDetails,
                        'orderPayment.selectedBillingAddress.phoneNumber'
                    ),
                },
                {
                    field: 'field8',
                    label: 'E-Mail',
                    value: getNestedPropertyValue(
                        orderDetails,
                        'orderPayment.selectedBillingAddress.email'
                    ),
                },
                {
                    field: 'field9',
                    label: 'VAT Registration Number',
                    value: getNestedPropertyValue(
                        orderDetails,
                        'orderPayment.selectedBillingAddress.VATRegNo'
                    ),
                },
                {
                    field: 'field10',
                    label: 'Business ID',
                    value: getNestedPropertyValue(
                        orderDetails,
                        'orderPayment.selectedBillingAddress.businessID'
                    ),
                },
                {
                    field: 'field11',
                    label: 'Tax ID',
                    value: getNestedPropertyValue(
                        orderDetails,
                        'orderPayment.selectedBillingAddress.taxID'
                    ),
                },
                // Add more key-value pairs for Block 1
            ],
        },

        {
            headline: 'Payment Details',
            keyValues: [
                {
                    field: 'field1',
                    label: 'External Order Number',
                    value: getNestedPropertyValue(
                        orderDetails,
                        'orderPartner.externalOrderNumber'
                    ),
                },
                {
                    field: 'field2',
                    label: 'Payment Due Date',
                    value: getNestedPropertyValue(
                        orderDetails,
                        'orderPayment.dueDate'
                    ),
                },

                {
                    field: 'field6',
                    label: 'Record Issuance Date',
                    value: getNestedPropertyValue(
                        orderDetails,
                        'orderPayment.recordIssuanceDate'
                    ),
                },
                // Add more key-value pairs for Block 1
            ],
        },

        {
            headline: 'Packaging',
            keyValues: [
                {
                    field: 'field1',
                    label: 'Container Medium',
                    value: getNestedPropertyValue(
                        orderDetails,
                        'orderPackaging.containerMedium'
                    ),
                },
                {
                    field: 'field2',
                    label: 'Container Medium Receipt Amount',
                    value: getNestedPropertyValue(
                        orderDetails,
                        'orderPackaging.containerMediumReceiptAmount'
                    ),
                    renderWithAmount: true,
                },
                {
                    field: 'field6',
                    label: 'Transport Medium',
                    value: getNestedPropertyValue(
                        orderDetails,
                        'orderPackaging.transportMedium'
                    ),
                },

                {
                    field: 'field7',
                    label: 'Transport Medium Issuance Amount',
                    value: getNestedPropertyValue(
                        orderDetails,
                        'orderPackaging.transportMediumIssuanceAmount'
                    ),
                    renderWithAmount: true,
                },
                {
                    field: 'field8',
                    label: 'Transport Medium Receipt Amount',
                    value: getNestedPropertyValue(
                        orderDetails,
                        'orderPackaging.transportMediumReceiptAmount'
                    ),
                    renderWithAmount: true,
                },
                {
                    field: 'field9',
                    label: 'Units Per Transport Medium',
                    value: getNestedPropertyValue(
                        orderDetails,
                        'orderPackaging.unitsPerTransportMedium'
                    ),
                    renderWithAmount: true,
                },
                {
                    field: 'field3',
                    label: 'Pallet Issuance Amount',
                    value: getNestedPropertyValue(
                        orderDetails,
                        'orderPackaging.palletIssuanceAmount'
                    ),
                    renderWithAmount: true,
                },
                {
                    field: 'field4',
                    label: 'Pallet Receipt Amount',
                    value: getNestedPropertyValue(
                        orderDetails,
                        'orderPackaging.palletReceiptAmount'
                    ),
                    renderWithAmount: true,
                },
                // Add more key-value pairs for Block 1
            ],
        },

        {
            headline: 'Note',
            keyValues: [
                {
                    field: 'field1',
                    label: 'Note',
                    value: getNestedPropertyValue(orderDetails, 'orderNote'),
                },
                // Add more key-value pairs for Block 1
            ],
        },

        {
            headline: 'Order Number',
            keyValues: [
                {
                    field: 'field1',
                    label: 'Order Number',
                    value: getNestedPropertyValue(orderDetails, 'orderNumber'),
                },
                // Add more key-value pairs for Block 1
            ],
        },

        // Add more blocks as needed
    ]

    return (
        <div className="flex flex-wrap -mx-2">
            {fieldBlocks.map((block, index) => (
                <div
                    key={index}
                    className="flex-shrink-0 w-full sm:w-auto lg:w-auto px-2 py-1"
                    style={{ minWidth: '0' }}
                >
                    <div className="custom_h">{block.headline}</div>
                    <ul className="list-disc list-none">
                        {block.keyValues.map(
                            (
                                {
                                    field,
                                    label,
                                    value,
                                    renderWithPriceAmount,
                                    renderWithAmount,
                                },
                                keyValueIndex
                            ) => (
                                <li
                                    key={keyValueIndex}
                                    className="leading-tight leading-normal ml-0"
                                >
                                    <strong>{label}:</strong>{' '}
                                    {renderWithPriceAmount &&
                                    typeof value === 'number' ? (
                                        <PriceAmount amount={value} />
                                    ) : renderWithAmount &&
                                      typeof value === 'number' ? (
                                        <Amount amount={value} />
                                    ) : value !== undefined &&
                                      value !== null &&
                                      value !== '' ? (
                                        value
                                    ) : (
                                        '-'
                                    )}
                                </li>
                            )
                        )}
                    </ul>
                </div>
            ))}
        </div>
    )
}

export default ExpandedContent
