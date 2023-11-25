import { useState, useMemo, useEffect, Fragment } from 'react'
import Table from '@/components/ui/Table'
import Input from '@/components/ui/Input'
import Pagination from '@/components/ui/Pagination'
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
}: ReactTableProps<OrderWithSubRow>) => {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [globalFilter, setGlobalFilter] = useState('')

    const columns = useMemo<ColumnDef<OrderWithSubRow>[]>(() => [
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
    ])

    //const [data] = useState(() => data10)

    const [data, setData] = useState<Order[]>([])

    const totalData = data?.length

    const pageSizeOption = [
        { value: 10, label: '10 / page' },
        { value: 20, label: '20 / page' },
        { value: 30, label: '30 / page' },
        { value: 40, label: '40 / page' },
        { value: 50, label: '50 / page' },
    ]

    useEffect(() => {
        const fetchData = async () => {
            try {
                const requestParam: OrderApiRequest = {}
                const fetchedOrders: Order[] = await fetchOrders(requestParam)
                setData(fetchedOrders)
                console.log('orderoverview fetchedOrders', fetchedOrders)
            } catch (error) {
                console.error('Error fetching orders:', error.message)
            }
        }

        fetchData()
    }, [])

    console.log('OrdersOverview DATA', data)

    const table = useReactTable({
        //data: dataWithSubRows,
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

    const onPaginationChange = (page: number) => {
        table.setPageIndex(page - 1)
    }

    const onSelectChange = (value = 0) => {
        table.setPageSize(Number(value))
    }

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
                                <Tr>
                                    {/* first row is a normal row */}
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <td key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </td>
                                        )
                                    })}
                                </Tr>
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

const renderSubComponent = ({ row }: { row: Row<Order> }) => {
    const { original } = row

    // Define fields to display in the expanded row with their respective labels
    const fieldLabels: Record<string, string> = {
        orderCreationDate: 'Creation Date',
        orderStatus: 'Order Status',
        _id: 'Order ID',
        // Add more field names and labels as needed
    }

    // Extract values for specified fields and their labels
    const fieldList = Object.entries(fieldLabels).map(([field, label]) => ({
        field,
        label,
        value: original[field],
    }))

    return (
        <div>
            <ul>
                {fieldList.map(({ field, label, value }) => (
                    <li key={field}>
                        <strong>{label}:</strong> {value}
                    </li>
                ))}
            </ul>
        </div>
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
