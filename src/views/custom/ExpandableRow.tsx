import { Row } from '@tanstack/react-table'
import ExpandedContent from './ExpandedContent'

export const ExpandableRow = ({ row }: { row: Row<Order> }) => {
    const { original } = row
    const orderId = original._id // Adjust this based on your data structure

    return (
        /* Include the expanded content component with the orderId */
        <div className="flex-shrink-0 w-full sm:w-auto lg:w-auto px-2 py-1">
            <ExpandedContent orderId={orderId} />
        </div>
    )
}
