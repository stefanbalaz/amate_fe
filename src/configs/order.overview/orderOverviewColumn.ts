import type { ColumnDef } from '@tanstack/react-table'

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
