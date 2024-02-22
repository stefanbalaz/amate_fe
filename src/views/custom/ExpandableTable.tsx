import { ExpandableRow } from './ExpandableRow'
import ReactTable from '@/views/custom/ReactTable'

const ExpandableTable = () => {
    return (
        <ReactTable<Order>
            renderRowExpandableTable={ExpandableRow}
            getRowCanExpand={() => true}
        />
    )
}

export default ExpandableTable
