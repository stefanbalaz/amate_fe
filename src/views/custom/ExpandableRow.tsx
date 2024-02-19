import { Row } from '@tanstack/react-table'
import { Amount, PriceAmount, VatAmount } from '@/configs/custom/units'

const getNestedPropertyValue = (obj: any, path: string): any => {
    const keys = path.split('.')
    return keys.reduce(
        (acc, key) => (acc && acc[key] !== 'undefined' ? acc[key] : undefined),
        obj
    )
}

export const renderSubComponent = ({ row }: { row: Row<Order> }) => {
    const { original } = row // Destructure original from row object
    // console.log('original', original)
    //  console.log('row', row)
    const fieldBlocks = [
        // Define your blocks with headline and key-value pairs

        {
            headline: 'Price',
            keyValues: [
                {
                    field: 'field1',
                    label: 'Drink Net',
                    value: getNestedPropertyValue(
                        original,
                        'orderPayment.selectedPrice.drinkNet'
                    ),
                    renderWithPriceAmount: true,
                },
                {
                    field: 'field2',
                    label: 'Drink Reduced Net',
                    value: getNestedPropertyValue(
                        original,
                        'orderPayment.selectedPrice.drinkReducedNet'
                    ),
                    renderWithPriceAmount: true,
                },
                {
                    field: 'field3',
                    label: 'Deposit Glass',
                    value: getNestedPropertyValue(
                        original,
                        'orderPayment.selectedPrice.depositGlass'
                    ),
                    renderWithPriceAmount: true,
                },
                {
                    field: 'field4',
                    label: 'Deposit PET',
                    value: getNestedPropertyValue(
                        original,
                        'orderPayment.selectedPrice.depositPET'
                    ),
                    renderWithPriceAmount: true,
                },
                {
                    field: 'field5',
                    label: 'Deposit Crate',
                    value: getNestedPropertyValue(
                        original,
                        'orderPayment.selectedPrice.depositCrate'
                    ),
                    renderWithPriceAmount: true,
                },
                {
                    field: 'field6',
                    label: 'Deposit Cardboard',
                    value: getNestedPropertyValue(
                        original,
                        'orderPayment.selectedPrice.depositCardboard'
                    ),
                    renderWithPriceAmount: true,
                },
                {
                    field: 'field7',
                    label: 'Deposit Palette',
                    value: getNestedPropertyValue(
                        original,
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
                        original,
                        'orderDelivery.selectedDeliveryAddress.companyName'
                    ),
                },
                {
                    field: 'field2',
                    label: 'Forename',
                    value: getNestedPropertyValue(
                        original,
                        'orderDelivery.selectedDeliveryAddress.forename'
                    ),
                },
                {
                    field: 'field3',
                    label: 'Surname',
                    value: getNestedPropertyValue(
                        original,
                        'orderDelivery.selectedDeliveryAddress.surname'
                    ),
                },
                {
                    field: 'field4',
                    label: 'Street Name Number',
                    value: getNestedPropertyValue(
                        original,
                        'orderDelivery.selectedDeliveryAddress.streetNameNumber'
                    ),
                },
                {
                    field: 'field5',
                    label: 'City',
                    value: getNestedPropertyValue(
                        original,
                        'orderDelivery.selectedDeliveryAddress.city'
                    ),
                },
                {
                    field: 'field6',
                    label: 'Country',
                    value: getNestedPropertyValue(
                        original,
                        'orderDelivery.selectedDeliveryAddress.country'
                    ),
                },
                {
                    field: 'field7',
                    label: 'Phone Number',
                    value: getNestedPropertyValue(
                        original,
                        'orderDelivery.selectedDeliveryAddress.phoneNumber'
                    ),
                },
                {
                    field: 'field8',
                    label: 'E-Mail',
                    value: getNestedPropertyValue(
                        original,
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
                        original,
                        'orderDelivery.date'
                    ),
                },
                {
                    field: 'field3',
                    label: 'Method Detail',
                    value: getNestedPropertyValue(
                        original,
                        'mappedStrings.customDeliveryMethodDetail'
                    ),
                },
                {
                    field: 'field4',
                    label: 'Region',
                    value: getNestedPropertyValue(
                        original,
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
                        original,
                        'orderPayment.selectedBillingAddress.companyName'
                    ),
                },
                {
                    field: 'field2',
                    label: 'Forename',
                    value: getNestedPropertyValue(
                        original,
                        'orderPayment.selectedBillingAddress.forename'
                    ),
                },
                {
                    field: 'field3',
                    label: 'Surname',
                    value: getNestedPropertyValue(
                        original,
                        'orderPayment.selectedBillingAddress.surname'
                    ),
                },
                {
                    field: 'field4',
                    label: 'Street Name Number',
                    value: getNestedPropertyValue(
                        original,
                        'orderPayment.selectedBillingAddress.streetNameNumber'
                    ),
                },
                {
                    field: 'field5',
                    label: 'City',
                    value: getNestedPropertyValue(
                        original,
                        'orderPayment.selectedBillingAddress.city'
                    ),
                },
                {
                    field: 'field6',
                    label: 'Country',
                    value: getNestedPropertyValue(
                        original,
                        'orderPayment.selectedBillingAddress.country'
                    ),
                },
                {
                    field: 'field7',
                    label: 'Phone Number',
                    value: getNestedPropertyValue(
                        original,
                        'orderPayment.selectedBillingAddress.phoneNumber'
                    ),
                },
                {
                    field: 'field8',
                    label: 'E-Mail',
                    value: getNestedPropertyValue(
                        original,
                        'orderPayment.selectedBillingAddress.email'
                    ),
                },
                {
                    field: 'field9',
                    label: 'VAT Registration Number',
                    value: getNestedPropertyValue(
                        original,
                        'orderPayment.selectedBillingAddress.VATRegNo'
                    ),
                },
                {
                    field: 'field10',
                    label: 'Business ID',
                    value: getNestedPropertyValue(
                        original,
                        'orderPayment.selectedBillingAddress.businessID'
                    ),
                },
                {
                    field: 'field11',
                    label: 'Tax ID',
                    value: getNestedPropertyValue(
                        original,
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
                        original,
                        'orderPartner.externalOrderNumber'
                    ),
                },
                {
                    field: 'field2',
                    label: 'Payment Due Date',
                    value: getNestedPropertyValue(
                        original,
                        'orderPayment.dueDate'
                    ),
                },

                {
                    field: 'field6',
                    label: 'Record Issuance Date',
                    value: getNestedPropertyValue(
                        original,
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
                        original,
                        'orderPackaging.containerMedium'
                    ),
                },
                {
                    field: 'field2',
                    label: 'Container Medium Receipt Amount',
                    value: getNestedPropertyValue(
                        original,
                        'orderPackaging.containerMediumReceiptAmount'
                    ),
                    renderWithAmount: true,
                },
                {
                    field: 'field6',
                    label: 'Transport Medium',
                    value: getNestedPropertyValue(
                        original,
                        'orderPackaging.transportMedium'
                    ),
                },

                {
                    field: 'field7',
                    label: 'Transport Medium Issuance Amount',
                    value: getNestedPropertyValue(
                        original,
                        'orderPackaging.transportMediumIssuanceAmount'
                    ),
                    renderWithAmount: true,
                },
                {
                    field: 'field8',
                    label: 'Transport Medium Receipt Amount',
                    value: getNestedPropertyValue(
                        original,
                        'orderPackaging.transportMediumReceiptAmount'
                    ),
                    renderWithAmount: true,
                },
                {
                    field: 'field9',
                    label: 'Units Per Transport Medium',
                    value: getNestedPropertyValue(
                        original,
                        'orderPackaging.unitsPerTransportMedium'
                    ),
                    renderWithAmount: true,
                },
                {
                    field: 'field3',
                    label: 'Pallet Issuance Amount',
                    value: getNestedPropertyValue(
                        original,
                        'orderPackaging.palletIssuanceAmount'
                    ),
                    renderWithAmount: true,
                },
                {
                    field: 'field4',
                    label: 'Pallet Receipt Amount',
                    value: getNestedPropertyValue(
                        original,
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
                    value: getNestedPropertyValue(original, 'orderNote'),
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
                    value: getNestedPropertyValue(original, 'orderNumber'),
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
                                    {/* Check if the field should use PriceAmount */}
                                    {renderWithPriceAmount &&
                                    typeof value === 'number' ? (
                                        <PriceAmount amount={value} />
                                    ) : // Check if the field should use Amount
                                    renderWithAmount &&
                                      typeof value === 'number' ? (
                                        <Amount amount={value} />
                                    ) : // Render other values directly
                                    value !== undefined &&
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
