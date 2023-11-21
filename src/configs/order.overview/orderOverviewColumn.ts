import type { ColumnDef } from '@tanstack/react-table'

interface Order {
    orderPartner: {
        ID: string
        externalOrderNumber: string
    }
    orderPayment: {
        method: string
        record: string
        recordIssuanceDate: Date
        invoiceNumber: string
        dueDate: Date
        status: string
        // Add other properties
    }
    orderDelivery: {
        method: string
        methodDetail: string
        date: Date
        region: string
        // Add other properties
    }
    orderPackaging: {
        containerMedium: string
        containerMediumReceiptAmount: number
        transportMedium: string
        unitsPerTransportMedium: number
        transportMediumIssuanceAmount: number
        transportMediumReceiptAmount: number
        palletIssuanceAmount: number
        palletReceiptAmount: number
        // Add other properties
    }
    _id: string
    orderStatus: string
    orderCreationDate: string
    orderNote: string
    orderProduct: {
        ID: string
        quantity: number
        batchID: string
        volume: number
    }[]
    __v: number
}

export const orderColumns: ColumnDef<Order>[] = [
    { header: 'Order ID', accessorKey: '_id' },
    { header: 'Creation Date', accessorKey: 'orderCreationDate' },
    { header: 'Order Status', accessorKey: 'orderStatus' },
    {
        header: 'Partner Order ID',
        accessorKey: 'orderPartner.externalOrderNumber',
    },
    { header: 'Delivery Method', accessorKey: 'orderDelivery.method' },
    {
        header: 'Delivery Method Detail',
        accessorKey: 'orderDelivery.methodDetail',
    },
    { header: 'Delivery Date', accessorKey: 'orderDelivery.date' },
    { header: 'Delivery Region', accessorKey: 'orderDelivery.region' },
    // Add more columns as needed
]
