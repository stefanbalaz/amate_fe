import { Fragment } from 'react'
import { useState } from 'react'
import React, { useEffect } from 'react'
import Table from '@/components/ui/Table'
import {
    useNotExpandableRow,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
} from '@tanstack/react-table'
import { NumericFormat } from 'react-number-format'
import isLastChild from '@/utils/isLastChild'
import productFlavorMap from '@/configs/order.overview/productFlavorMap'
import { Amount, PriceAmount, VatAmount } from '@/configs/custom/units'

export type Product = {
    id: string
    name: string
    productCode: string
    img: string
    price: number
    quantity: number
    total: number
    details: {
        color: string[]
        size: string[]
    }
}

export type Summary = {
    subTotal: number
    tax: number
    deliveryFees: number
    total: number
}

type ContentTableProps = {
    productData?: Product[]
    packagingData?: any
    priceData?: any
    summary?: Partial<Summary>
    mappedStrings?: any
    onTotalPriceChange?: (totalPrice: number) => void
}

type TFootRowsProps = {
    label: string
    value?: number
}

const { Tr, Th, Td, THead, TBody, TFoot } = Table

const TFootRows = ({ label, value }: TFootRowsProps) => {
    return (
        <Tr>
            <Td className="!border-t-0" colSpan={3}></Td>
            <Td className="font-semibold !border-t-0">{label}</Td>
            <Td className="!py-1 !border-t-0">
                <PriceAmount amount={value} />
            </Td>
        </Tr>
    )
}

const columnHelper = createColumnHelper<Product>()

const ContentTable = ({
    productData = [],
    priceData = {},
    summary = {},
    packagingData = {},
    mappedStrings = {},
    onTotalPriceChange,
}: ContentTableProps) => {
    // Retrieve the configured columns and rows
    const columnsConfig: TableColumn[] = [
        {
            label: 'Item',
            accessor: 'item',
            cellRenderer: (data) => {
                const productId = data.row?.original.ID
                const volume = data.row?.original.volume
                const flavorName =
                    productFlavorMap[productId][0] || 'Unknown Flavor'
                return (
                    <div>
                        AMATE {flavorName} {volume}l
                    </div>
                )
            },
        },
        {
            label: 'Quantity',
            accessor: 'quantity',
            cellRenderer: (data) => {
                const quantity = data.row?.original.quantity // Access the quantity for the specific row
                return <Amount amount={quantity} />
                //return <div>{quantity}</div>
            },
        },
        {
            label: 'Price Net',
            accessor: 'priceNet', // Accessor for the column
            cellRenderer: (data) => {
                const priceNet = priceData.drinkNet || 0
                return <PriceAmount amount={priceNet} />
            },
        },
        {
            label: 'VAT',
            accessor: 'priceVAT', // Accessor for the column
            cellRenderer: (data) => {
                const priceNet = priceData.VAT || 0
                return <VatAmount amount={priceNet} />
            },
        },
        {
            label: 'Total Price Gross',
            accessor: 'priceGross',
            cellRenderer: (data) => {
                const extendedPrice =
                    (priceData.drinkNet || 0) *
                    (1 + (priceData.VAT || 0)) *
                    (data.row?.original.quantity || 0)

                return <PriceAmount amount={extendedPrice} />
            },
        },
    ]
    //console.log('productData', productData) // Place console.log statement here
    //console.log('priceData', priceData) // Place console.log statement here
    //console.log('packagingData', packagingData) // Place console.log statement here

    // Calculate total quantity of all products
    const totalQuantity = productData.reduce(
        (acc, product) => acc + product.quantity,
        0
    )

    // Function to capitalize first letter
    const capitalizeFirstLetter = (str) => {
        if (!str || typeof str !== 'string') return '' // Guard clause to handle edge cases
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    const capitalizedContainerMedium = capitalizeFirstLetter(
        packagingData.containerMedium || ''
    )

    const capitalizedTransportMediumLabel = capitalizeFirstLetter(
        packagingData.transportMedium || ''
    )

    const getTransportMediumData = () => {
        const transportMedium =
            packagingData.transportMedium?.toLowerCase() || ''
        let deposit = 0

        if (transportMedium === 'crate') {
            deposit = priceData?.depositCrate || 0
        } else if (transportMedium === 'cardboard') {
            deposit = priceData?.depositCardboard || 0
        }

        return {
            label: capitalizeFirstLetter(packagingData.transportMedium),
            deposit: deposit,
        }
    }

    function summaryCalculation(params: any): any {
        let subTotalNetPriceVat = 0
        let subTotalNetPriceVatZero = 0
        let subTotalNet = 0
        let subTotalVat = 0
        let totalPrice = 0

        subTotalNetPriceVat = productData.reduce(
            (acc, product) => acc + priceData.drinkNet * product.quantity,
            0
        )

        subTotalNetPriceVatZero =
            totalQuantity * (priceData.depositGlass || 0) +
            packagingData.containerMediumReceiptAmount *
                (priceData.depositGlass || 0) +
            packagingData.transportMediumIssuanceAmount *
                (getTransportMediumData().deposit || 0) +
            packagingData.transportMediumReceiptAmount *
                (getTransportMediumData().deposit || 0) +
            totalQuantity * (priceData.depositGlass || 0) +
            packagingData.containerMediumReceiptAmount *
                (priceData.depositGlass || 0)

        subTotalNet = subTotalNetPriceVat + subTotalNetPriceVatZero

        subTotalVat = subTotalNetPriceVat * priceData.VAT

        totalPrice = subTotalNet + subTotalVat

        return {
            subTotalNetPriceVat,
            subTotalNetPriceVatZero,
            subTotalNet,
            subTotalVat,
            totalPrice,
        }
    }

    const partialCalculations = summaryCalculation()

    const rowsConfig: TableRow[] = [
        {
            label: `${capitalizedContainerMedium} Bottle Issued`,
            field: 'containerIssued',
            cells: [
                {
                    label: 'Container Issued',
                    value: <Amount amount={totalQuantity} />,
                },

                {
                    label: '',
                    value: <PriceAmount amount={priceData.depositGlass || 0} />,
                },
                { label: '', value: <VatAmount amount={0} /> },
                {
                    label: '',
                    value: (
                        <PriceAmount
                            amount={
                                totalQuantity * (priceData.depositGlass || 0)
                            }
                        />
                    ),
                },
            ],
        },
        {
            label: `${capitalizedContainerMedium} Bottle Received`,
            field: 'containerReceived',
            cells: [
                {
                    label: 'Container Received',
                    value: (
                        <Amount
                            amount={packagingData.containerMediumReceiptAmount}
                        />
                    ),
                },

                {
                    label: '',
                    value: <PriceAmount amount={priceData.depositGlass || 0} />,
                },
                { label: '', value: <VatAmount amount={0} /> },
                {
                    label: '',
                    value: (
                        <PriceAmount
                            amount={
                                packagingData.containerMediumReceiptAmount *
                                (priceData.depositGlass || 0)
                            }
                        />
                    ),
                },
            ],
        },
        {
            label: `${capitalizedTransportMediumLabel} Issued`,

            field: 'TransportMediumIssued',
            cells: [
                {
                    label: 'Transport Medium Issued',
                    value: (
                        <Amount
                            amount={packagingData.transportMediumIssuanceAmount}
                        />
                    ),
                },

                {
                    label: '',
                    value: (
                        <PriceAmount
                            amount={getTransportMediumData().deposit || 0}
                        />
                    ),
                },
                { label: '', value: <VatAmount amount={0} /> },
                {
                    label: '',
                    value: (
                        <PriceAmount
                            amount={
                                packagingData.transportMediumIssuanceAmount *
                                (getTransportMediumData().deposit || 0)
                            }
                        />
                    ),
                },
            ],
        },
        {
            label: `${capitalizedTransportMediumLabel} Received`,

            field: 'TransportMediumReceived',
            cells: [
                {
                    label: 'Transport Medium Received',
                    value: (
                        <Amount
                            amount={packagingData.transportMediumReceiptAmount}
                        />
                    ),
                },

                {
                    label: '',
                    value: (
                        <PriceAmount
                            amount={getTransportMediumData().deposit || 0}
                        />
                    ),
                },
                { label: '', value: <VatAmount amount={0} /> },
                {
                    label: '',
                    value: (
                        <PriceAmount
                            amount={
                                packagingData.transportMediumReceiptAmount *
                                (getTransportMediumData().deposit || 0)
                            }
                        />
                    ),
                },
            ],
        },
        {
            label: `Pallet Issued`,
            field: 'palletIssued',
            cells: [
                {
                    label: 'Pallet Issued',
                    value: <Amount amount={totalQuantity} />,
                },

                {
                    label: '',
                    value: <PriceAmount amount={priceData.depositGlass || 0} />,
                },
                { label: '', value: <VatAmount amount={0} /> },
                {
                    label: '',
                    value: (
                        <PriceAmount
                            amount={
                                totalQuantity * (priceData.depositGlass || 0)
                            }
                        />
                    ),
                },
            ],
        },
        {
            label: `Pallet Received`,
            field: 'palletReceived',
            cells: [
                {
                    label: 'Pallet Received',
                    value: (
                        <Amount
                            amount={packagingData.containerMediumReceiptAmount}
                        />
                    ),
                },

                {
                    label: '',
                    value: <PriceAmount amount={priceData.depositGlass || 0} />,
                },
                { label: '', value: <VatAmount amount={0} /> },
                {
                    label: '',
                    value: (
                        <PriceAmount
                            amount={
                                packagingData.containerMediumReceiptAmount *
                                (priceData.depositGlass || 0)
                            }
                        />
                    ),
                },
            ],
        },
    ]

    const tableConfig: TableConfig = {
        columns: columnsConfig,
        rows: rowsConfig,
    }

    // Use the configured columns to generate column definitions
    const columnDefinitions = columnsConfig.map((col) =>
        columnHelper.accessor(col.accessor, {
            header: col.label,
            cell: col.cellRenderer, // Use the predefined cellRenderer directly
        })
    )

    const productRows = productData.map((row, rowIndex) => (
        <Tr key={rowIndex}>
            {columnsConfig.map((col, colIndex) => (
                <Td key={`${rowIndex}-${colIndex}`}>
                    {col.cellRenderer({ row: { original: row } })}
                </Td>
            ))}
        </Tr>
    ))

    // Construct additional rows based on configuration
    const additionalRows = rowsConfig.map((row, index) => (
        <Tr key={`row-${index}-${row.label}`}>
            <Td>{row.label}</Td>
            {row.cells.map((cell, cellIndex) => (
                <Td key={`cell-${index}-${cellIndex}`}>{cell.value}</Td>
            ))}
        </Tr>
    ))

    useEffect(() => {
        // Whenever partialCalculations.totalPrice changes, invoke the prop function
        onTotalPriceChange?.(partialCalculations.totalPrice)
    }, [onTotalPriceChange, partialCalculations.totalPrice])

    // Render the table with the configured columns and rows
    return (
        <Table>
            <THead>
                <Tr>
                    {columnDefinitions.map((col, index) => (
                        <Th key={`column-${index}`}>{col.header}</Th>
                    ))}
                </Tr>
            </THead>

            <TBody>
                {productRows}
                {additionalRows}
            </TBody>

            <TFoot>
                <TFootRows
                    label="Base VAT 20% (Net)"
                    value={partialCalculations.subTotalNetPriceVat}
                />
                <TFootRows
                    label="Base VAT 0% (Net)"
                    value={partialCalculations.subTotalNetPriceVatZero}
                />
                <TFootRows
                    label="Subtotal Net"
                    value={partialCalculations.subTotalNet}
                />
                <TFootRows
                    label="VAT 20%"
                    value={partialCalculations.subTotalVat}
                />
                <Tr>
                    <Td className="!border-t-0" colSpan={3}></Td>
                    <Td className="font-semibold text-base">Grand Total</Td>
                    <Td className="font-semibold text-base !py-5">
                        <PriceAmount amount={partialCalculations.totalPrice} />
                    </Td>
                </Tr>
            </TFoot>
        </Table>
    )
}

export default ContentTable
