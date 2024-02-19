import { useCallback, useState, useMemo, useEffect, Fragment } from 'react'
import Table from '@/components/ui/Table'
import Input from '@/components/ui/Input'
import Drawer, { DrawerProps } from '@/components/ui/Drawer'
import Pagination from '@/components/ui/Pagination'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import ApiService from '@/services/ApiService' // Import ApiService
import {
    fetchOrdersWithPartner,
    fetchOrders,
    OrderApiRequest,
} from '@/services/OrderService'
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getExpandedRowModel,
    getFacetedMinMaxValues,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender,
} from '@tanstack/react-table'
import { rankItem } from '@tanstack/match-sorter-utils'
import { HiOutlineChevronRight, HiOutlineChevronDown } from 'react-icons/hi'
import type {
    // ColumnDef,
    FilterFn,
    ColumnFiltersState,
} from '@tanstack/react-table'
import type { InputHTMLAttributes } from 'react'
import type { ColumnDef, Row } from '@tanstack/react-table'
import type { ReactElement } from 'react'
import { renderSubComponent } from './ExpandableRow'
import productFlavorMap from '@/configs/order.overview/productFlavorMap'
import Invoice from '@/views/account/invoice/Invoice'
import { Link } from 'react-router-dom'
import Tag from '@/components/ui/Tag'
import {
    DrawerOrderStatusContent,
    orderStatusMap,
    mapOriginalToCustomStatus,
} from '@/configs/order.overview/orderStringMapper'
import DrawerStatusList from '@/configs/order.overview/DrawerStatusList'
import {
    paymentStatusMap,
    mapPaymentStatusToTag,
} from '@/configs/order.overview/orderStringMapper'

interface DebouncedInputProps
    extends Omit<
        InputHTMLAttributes<HTMLInputElement>,
        'onChange' | 'size' | 'prefix'
    > {
    value: string | number
    onChange: (value: string | number) => void
    debounce?: number
}

type ReactTableProps<T> = {
    renderRowSubComponent: (props: { row: Row<T> }) => ReactElement
    getRowCanExpand: (row: Row<T>) => boolean
    statusKey: string
}

const { Tr, Th, Td, THead, TBody, Sorter } = Table

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
    customStatus: string
}

function DebouncedInput({
    value: initialValue,
    onChange,
    debounce = 500,
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
        <div className="flex justify-end">
            <div className="flex items-center mb-4">
                <span className="mr-2">Search:</span>
                <Input
                    {...props}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
        </div>
    )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value)

    // Store the itemRank info
    addMeta({
        itemRank,
    })

    // Return if the item should be filtered in/out
    return itemRank.passed
}

const ReactTable = ({
    renderRowSubComponent,
    getRowCanExpand,
    statusKey = {
        /* Pass the value of statusKey */
    },
}: ReactTableProps<OrderWithSubRow>) => {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [globalFilter, setGlobalFilter] = useState('')

    const [data, setData] = useState<Order[]>([])

    const [isDrawerOpen, setIsDrawerOpen] = useState(false) // State to manage Drawer visibility

    const [drawerOrderId, setDrawerOrderId] = useState('')

    // const [showStatuses, setShowStatuses] = useState(true) // or false based on your initial condition
    const [showStatuses, setShowStatuses] = useState('') // or false based on your initial condition

    const handleCloseDrawer = () => {
        setIsDrawerOpen(false)
        //  console.log('Drawer closed.')
    }

    const columns = useMemo<ColumnDef<OrderWithSubRow>[]>(() => {
        const flavorColumns: Record<string, ColumnDef<OrderWithSubRow>> = {}

        // Dynamically generate columns for each flavor
        data?.forEach((order) => {
            order.orderProduct.forEach((product) => {
                const { ID } = product
                const flavorName = productFlavorMap[ID]

                if (!flavorColumns[flavorName]) {
                    flavorColumns[flavorName] = {
                        header: flavorName,
                        accessorKey: flavorName,
                        cell: ({ row }) => {
                            const flavorQuantity =
                                row.original.orderProduct.find(
                                    (p) => p.ID === ID
                                )?.quantity || 0 // Use logical OR to provide a default value of 0
                            return <div>{flavorQuantity}</div>
                        },
                    }
                }
            })
        })

        return [
            {
                // Make an expander cell
                header: () => null, // No header
                id: 'expander', // It needs an ID
                cell: ({ row }) => (
                    <>
                        {row.getCanExpand() ? (
                            <button
                                className="text-lg"
                                {...{ onClick: row.getToggleExpandedHandler() }}
                            >
                                {row.getIsExpanded() ? (
                                    <HiOutlineChevronDown />
                                ) : (
                                    <HiOutlineChevronRight />
                                )}
                            </button>
                        ) : null}
                    </>
                ),
                // We can override the cell renderer with a SubCell to be used with an expanded row
                subCell: () => null, // No expander on an expanded row
            },
            {
                header: 'Creation Date',
                accessorKey: 'orderCreationDate',
                filterFn: fuzzyFilter,
            },
            {
                header: 'Partner Name',
                accessorKey: 'partnerName',
                filterFn: fuzzyFilter,
            },
            {
                header: 'Order Status',
                accessorKey: 'customStatus',
                filterFn: fuzzyFilter,
                cell: ({ row }) => {
                    const status = row.original.mappedStrings.customStatus

                    const handleStatusClick = () => {
                        // Access the orderId associated with the clicked row
                        const orderId = row.original._id

                        // Perform actions when status is clicked
                        // For example, open the Drawer
                        setIsDrawerOpen(true)
                        setDrawerOrderId(orderId) // Store the orderId in state
                        setShowStatuses('order_status')
                    }

                    const handleCloseDrawer = () => {
                        setIsDrawerOpen(false)
                        //   console.log('Drawer closed.')
                    }
                    /* 
                    const clickedStatusIsOrderStatus =
                        Object.keys(orderStatusMap).includes(statusKey)
                    setShowStatuses(clickedStatusIsOrderStatus)
 */
                    return (
                        <div
                            style={{ cursor: 'pointer' }}
                            onClick={handleStatusClick}
                        >
                            {status}
                        </div>
                    )
                },
            },

            ...Object.values(flavorColumns),

            {
                header: 'Delivery Method',
                accessorKey: 'customDeliveryMethod',
                filterFn: fuzzyFilter,
                cell: ({ row }) => {
                    const deliveryMethod =
                        row.original.mappedStrings.customDeliveryMethod
                    return <div>{deliveryMethod}</div>
                },
            },

            {
                header: 'Payment Status',
                accessorKey: 'customPaymentStatus',
                filterFn: fuzzyFilter,
                cell: ({ row }) => {
                    const paymentStatus =
                        row.original.mappedStrings.customPaymentStatus

                    const handleStatusClick = () => {
                        // Access the orderId associated with the clicked row
                        const orderId = row.original._id

                        // Perform actions when status is clicked
                        // For example, open the Drawer
                        setIsDrawerOpen(true)
                        setDrawerOrderId(orderId) // Store the orderId in state
                        setShowStatuses('payment_status')
                    }

                    const handleCloseDrawer = () => {
                        setIsDrawerOpen(false)
                        //   console.log('Drawer closed.')
                    }
                    /* 
                    const clickedStatusIsPaymentStatus =
                        Object.keys(paymentStatusMap).includes(statusKey)
                    setShowStatuses(clickedStatusIsPaymentStatus)
 */
                    return (
                        <div
                            style={{ cursor: 'pointer' }}
                            onClick={handleStatusClick}
                        >
                            {paymentStatus}
                        </div>
                    )
                },
            },

            {
                header: 'Payment Method',
                accessorKey: 'customPaymentMethod',
                filterFn: fuzzyFilter,
                cell: ({ row }) => {
                    const paymentMethod =
                        row.original.mappedStrings.customPaymentMethod
                    return <div>{paymentMethod}</div>
                },
            },
            {
                header: 'Payment Record',
                accessorKey: 'customPaymentRecord',
                filterFn: fuzzyFilter,
                cell: ({ row }) => {
                    const paymentRecord =
                        row.original.mappedStrings.customPaymentRecord
                    return <div>{paymentRecord}</div>
                },
            },

            {
                header: 'Invoice',
                accessorKey: 'orderPayment.invoiceNumber',
                filterFn: fuzzyFilter,
                cell: ({ row }) => (
                    <div className="inline-flex flex-wrap xl:flex gap-2">
                        {row.original.orderPayment.invoiceNumber ? (
                            <Tag className="bg-emerald-100 text-emerald-600 dark:bg-emerald-100 dark:text-emerald-900 border-0 rounded">
                                <Link
                                    to={{
                                        pathname: `/OrdersOverview/Invoice/${row.original._id}`,
                                    }}
                                    /* className="text-amber-700 font-bold" */
                                >
                                    #{row.original.orderPayment.invoiceNumber}
                                </Link>
                            </Tag>
                        ) : (
                            <Link
                                to={{
                                    pathname: `/OrdersOverview/Invoice/${row.original._id}`,
                                }}
                            >
                                {/*      <Button size="xs" variant="twoTone">
                                    Create Invoice
                                </Button> */}
                                <Tag className="bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100 border-0 rounded">
                                    Create
                                </Tag>
                            </Link>
                        )}
                    </div>
                ),
            },

            {
                header: 'Edit',
                accessorKey: 'buttonColumn',
                cell: () => (
                    <div className="inline-flex flex-wrap xl:flex gap-2">
                        <Button
                            size="xs"
                            variant="twoTone"
                            /*  onClick={() => console.log('Button clicked')} */
                        >
                            Edit
                        </Button>
                    </div>
                ),
            },
        ]
    }, [data, productFlavorMap])

    const totalData = data?.length
    const pageSizeOption = [
        { value: 10, label: '10 / page' },
        { value: 20, label: '20 / page' },
        { value: 30, label: '30 / page' },
        { value: 40, label: '40 / page' },
        { value: 50, label: '50 / page' },
    ]

    useEffect(() => {
        console.log('Component is mounting')
        const fetchData = async () => {
            try {
                const requestParam: OrderApiRequest = {}
                const fetchedOrders: Order[] = await fetchOrdersWithPartner(
                    requestParam
                )
                setData(fetchedOrders)
                console.log('orderoverview fetchedOrders', fetchedOrders)
            } catch (error) {
                console.error('Error fetching orders:', error.message)
            }
        }

        fetchData()
    }, [])

    console.log('Component is rerendering')
    console.log('OrdersOverview DATA', data)

    const table = useReactTable({
        data: data,
        columns,
        getRowCanExpand,
        getExpandedRowModel: getExpandedRowModel(),
        filterFns: {
            fuzzy: fuzzyFilter,
        },
        state: {
            columnFilters,
            globalFilter,
        },
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: fuzzyFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
        debugHeaders: true,
        debugColumns: false,
    })

    /*     const onPaginationChange = (page: number) => {
        table.setPageIndex(page - 1)
    }

    const onSelectChange = (value = 0) => {
        table.setPageSize(Number(value))
    } */

    const onPaginationChange = useCallback(
        (page: number) => {
            table.setPageIndex(page - 1)
        },
        [table]
    )

    const onSelectChange = useCallback(
        (value = 0) => {
            table.setPageSize(Number(value))
        },
        [table]
    )

    const handleStatusUpdate = async () => {
        try {
            // You might want to fetch the updated data here
            const requestParam: OrderApiRequest = {} // Adjust the request parameters if needed
            const fetchedOrders: Order[] = await fetchOrdersWithPartner(
                requestParam
            )
            setData(fetchedOrders)
            //  console.log('Updated data after status change:', fetchedOrders)
        } catch (error) {
            console.error(
                'Error updating status and fetching orders:',
                error.message
            )
        }
    }

    //  console.log('Status Key:', statusKey) // Verify if statusKey is correctly passed and accessed

    return (
        <>
            <DebouncedInput
                value={globalFilter ?? ''}
                className="p-2 font-lg shadow border border-block"
                placeholder="Search all columns..."
                onChange={(value) => setGlobalFilter(String(value))}
            />
            <Table>
                <THead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <Th key={header.id} colSpan={header.colSpan}>
                                    {header.isPlaceholder ? null : (
                                        <div
                                            className={
                                                header.column.getCanSort()
                                                    ? 'cursor-pointer select-none'
                                                    : ''
                                            }
                                            onClick={header.column.getToggleSortingHandler()}
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {
                                                <Sorter
                                                    sort={header.column.getIsSorted()}
                                                />
                                            }
                                        </div>
                                    )}
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </THead>
                <TBody>
                    {table.getRowModel().rows.map((row) => {
                        return (
                            <Fragment key={row.id}>
                                {
                                    <Tr>
                                        {row.getVisibleCells().map((cell) => {
                                            return (
                                                <td key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef
                                                            .cell,
                                                        cell.getContext()
                                                    )}
                                                </td>
                                            )
                                        })}
                                    </Tr>
                                }

                                {row.getIsExpanded() && (
                                    <Tr>
                                        {/* 2nd row is a custom 1 cell row */}
                                        <Td
                                            colSpan={
                                                row.getVisibleCells()?.length
                                            }
                                        >
                                            {renderRowSubComponent({ row })}
                                        </Td>
                                    </Tr>
                                )}
                            </Fragment>
                        )
                    })}

                    <Drawer
                        isOpen={isDrawerOpen}
                        title="Status"
                        onClose={() => setIsDrawerOpen(false)}
                    >
                        {/* Pass orderStatusMap as a prop to DrawerStatusList */}
                        <DrawerStatusList
                            orderId={drawerOrderId}
                            statusKey={statusKey}
                            initialStatus={data?.orderStatus}
                            onCloseDrawer={handleCloseDrawer}
                            onStatusUpdate={handleStatusUpdate}
                            paymentStatusMap={paymentStatusMap}
                            mapPaymentStatusToTag={mapPaymentStatusToTag}
                            orderStatusMap={orderStatusMap}
                            showStatuses={showStatuses} // Pass the correct boolean value
                        />
                    </Drawer>
                </TBody>
            </Table>
            <div className="flex items-center justify-between mt-4">
                <Pagination
                    pageSize={table.getState().pagination.pageSize}
                    currentPage={table.getState().pagination.pageIndex + 1}
                    total={totalData}
                    onChange={onPaginationChange}
                />

                <div style={{ minWidth: 130 }}>
                    <Select<Option>
                        size="sm"
                        isSearchable={false}
                        value={pageSizeOption.filter(
                            (option) =>
                                option.value ===
                                table.getState().pagination.pageSize
                        )}
                        options={pageSizeOption}
                        onChange={(option) => onSelectChange(option?.value)}
                    />
                </div>
            </div>
        </>
    )
}

const SubComponent = () => {
    return (
        <ReactTable
            renderRowSubComponent={renderSubComponent}
            getRowCanExpand={() => true}
        />
    )
}

export default SubComponent
