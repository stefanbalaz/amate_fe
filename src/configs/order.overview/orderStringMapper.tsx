import Tag from '@/components/ui/Tag'
import IconText from '@/components/shared/IconText'
import { HiClock } from 'react-icons/hi'
import { AiFillEuroCircle } from 'react-icons/ai'
import { HiExclamationCircle } from 'react-icons/hi'

export interface StatusInfo {
    orderStatusKey: string
    className: string
}

export const orderStatusMap: Record<string, StatusInfo> = {
    preliminary_order: {
        orderStatusKey: 'Preliminary Order',
        className:
            'text-pink-800 bg-pink-300 dark:text-pink-300 dark:bg-pink-800/20 border-0 rounded',
    },
    confirmed_order: {
        orderStatusKey: 'Confirmed Order',
        className:
            'text-teal-800 bg-teal-300 dark:text-teal-300 dark:bg-teal-800/20 border-0 rounded',
    },
    goods_in_preparation: {
        orderStatusKey: 'Goods in Preparation',
        className:
            'text-lime-800 bg-lime-300 dark:text-lime-300 dark:bg-lime-800/20 border-0 rounded',
    },
    goods_prepared: {
        orderStatusKey: 'Goods Prepared',
        className:
            'text-orange-800 bg-orange-300 dark:text-orange-300 dark:bg-orange-800/20 border-0 rounded',
    },
    goods_in_delivery: {
        orderStatusKey: 'Goods in Delivery',
        className:
            'text-cyan-800 bg-cyan-300 dark:text-cyan-300 dark:bg-cyan-800/20 border-0 rounded',
    },
    goods_delivered: {
        orderStatusKey: 'Goods Delivered',
        className:
            'text-purple-800 bg-purple-300 dark:text-purple-300 dark:bg-purple-800/20 border-0 rounded',
    },
    issue_invoice: {
        orderStatusKey: 'Issue Invoice',
        className:
            'text-blue-800 bg-blue-300 dark:text-blue-300 dark:bg-blue-800/20 border-0 rounded',
    },
    invoice_issued: {
        orderStatusKey: 'Invoice Issued',
        className:
            'text-yellow-800 bg-yellow-300 dark:text-yellow-300 dark:bg-yellow-800/20 border-0 rounded',
    },
    processed_order: {
        orderStatusKey: 'Processed Order',
        className:
            'text-rose-800 bg-rose-300 dark:text-rose-300 dark:bg-rose-800/20 border-0 rounded',
    },
    entered_in_fulfillment_system: {
        orderStatusKey: 'Entered in Fulfillment System',
        className:
            'text-indigo-800 bg-indigo-300 dark:text-indigo-300 dark:bg-indigo-800/20 border-0 rounded',
    },
    pick_up_bottles: {
        orderStatusKey: 'Pick up Bottles',
        className:
            'text-green-800 bg-green-300 dark:text-green-300 dark:bg-green-800/20 border-0 rounded',
    },
    bottles_picked_up: {
        orderStatusKey: 'Bottles Picked up',
        className:
            'text-amber-800 bg-amber-300 dark:text-amber-300 dark:bg-amber-800/20 border-0 rounded',
    },
    deliver_samples: {
        orderStatusKey: 'Deliver Samples',
        className:
            'text-blue-gray-800 bg-blue-gray-300 dark:text-blue-gray-300 dark:bg-blue-gray-800/20 border-0 rounded',
    },
    samples_delivered: {
        orderStatusKey: 'Samples Delivered',
        className:
            'text-gray-800 bg-gray-300 dark:text-gray-300 dark:bg-gray-800/20 border-0 rounded',
    },
}

export const DrawerOrderStatusContent: React.FC = () => {
    return (
        <div>
            {Object.values(orderStatusMap).map((statusInfo, index) => (
                <div key={index} className={statusInfo.className}>
                    <Tag>{statusInfo.orderStatusKey}</Tag>
                </div>
            ))}
        </div>
    )
}

export function mapOriginalToCustomStatus(originalStatus: string): JSX.Element {
    const statusInfo = orderStatusMap[originalStatus] || orderStatusMap.unknown

    return (
        <div className="mr-2 rtl:ml-2">
            <Tag className={statusInfo.className}>
                {statusInfo.orderStatusKey}
            </Tag>
        </div>
    )
}

export const paymentStatusMap: Record<string, StatusInfo> = {
    paid: {
        paymentStatusKey: 'Paid',
        className: 'text-green-600 rounded',
        icon: <AiFillEuroCircle className="text-lg" />,
    },
    unpaid: {
        paymentStatusKey: 'Unpaid',
        className: 'text-red-600 font-semibold rounded',
        icon: <HiExclamationCircle className="text-lg" />,
    },
    free: {
        paymentStatusKey: 'Free',
        className: 'text-sky-600 rounded',
        icon: null,
    },
    long_term_debt: {
        paymentStatusKey: 'Long Term Debt',
        className: 'text-gray-300 rounded',
        icon: <HiExclamationCircle className="text-lg" />,
    },
    first_reminder_sent: {
        paymentStatusKey: 'First Reminder Sent',
        className: 'text-amber-600 rounded',
        icon: <HiExclamationCircle className="text-lg" />,
    },
    second_reminder_sent: {
        paymentStatusKey: 'Second Reminder Sent',
        className: 'text-purple-400 rounded',
        icon: <HiExclamationCircle className="text-lg" />,
    },
    // Add other payment statuses here...
}

export function mapPaymentStatusToTag(paymentStatus: string): JSX.Element {
    const statusInfo =
        paymentStatusMap[paymentStatus] || paymentStatusMap.unknown

    if (statusInfo && statusInfo.className) {
        return (
            <div className="mr-2 rtl:ml-2">
                <Tag className={statusInfo.className}>
                    {statusInfo.paymentStatusKey}
                </Tag>
            </div>
        )
    } else {
        // Handle the case where statusInfo or its className is undefined/null
        // Return a default or placeholder element
        return <div>Payment Status Not Available</div>
    }
}

export const DrawerPaymentStatusContent: React.FC = () => {
    return (
        <div>
            {Object.values(paymentStatusMap).map((statusInfo, index) => (
                <div key={index} className={statusInfo.className}>
                    <Tag>{statusInfo.paymentStatusKey}</Tag>
                </div>
            ))}
        </div>
    )
}

export function mapDeliveryMethodToTag(deliveryMethod: string): JSX.Element {
    switch (deliveryMethod) {
        case 'manufacturer_delivery':
            return (
                <div className="mr-2 rtl:ml-2">
                    {/* <Tag className="text-blue-600 bg-blue-100 dark:text-blue-100 dark:bg-blue-500/20 border-0 rounded"> */}
                    Manufacturer Delivery
                    {/*  </Tag> */}
                </div>
            )
        case 'warehouse_pickup':
            return (
                <div className="mr-2 rtl:ml-2">
                    {/*   <Tag className="text-yellow-600 bg-yellow-100 dark:text-yellow-100 dark:bg-yellow-500/20 border-0 rounded"> */}
                    Warehouse Pickup
                    {/*   </Tag> */}
                </div>
            )
        case 'manufacturer_shop':
            return (
                <div className="mr-2 rtl:ml-2">
                    {/*  <Tag className="text-green-600 bg-green-100 dark:text-green-100 dark:bg-green-500/20 border-0 rounded"> */}
                    Manufacturer Shop
                    {/*  </Tag> */}
                </div>
            )
        case 'external_carrier':
            return (
                <div className="mr-2 rtl:ml-2">
                    {/*  <Tag className="text-purple-600 bg-purple-100 dark:text-purple-100 dark:bg-purple-500/20 border-0 rounded"> */}
                    External Carrier
                    {/*  </Tag> */}
                </div>
            )
        default:
            return (
                <div className="mr-2 rtl:ml-2">
                    {/*   <Tag className="text-gray-600 bg-gray-100 dark:text-gray-100 dark:bg-gray-500/20 border-0 rounded"> */}
                    Unknown
                    {/*    </Tag> */}
                </div>
            )
    }
}

export function mapDeliveryMethodDetailToTag(
    deliveryMethodDetail: string
): JSX.Element {
    switch (deliveryMethodDetail) {
        case 'warehouse_ba':
            return (
                <div className="mr-2 rtl:ml-2">
                    {/*   <Tag className="text-green-600 bg-green-100 dark:text-green-100 dark:bg-green-500/20 border-0 rounded"> */}
                    Warehouse BA
                    {/*  </Tag> */}
                </div>
            )
        case 'warehouse_zm':
            return (
                <div className="mr-2 rtl:ml-2">
                    {/*   <Tag className="text-green-600 bg-green-100 dark:text-green-100 dark:bg-green-500/20 border-0 rounded"> */}
                    Warehouse ZM
                    {/*  </Tag> */}
                </div>
            )
        case 'warehouse_po':
            return (
                <div className="mr-2 rtl:ml-2">
                    {/*     <Tag className="text-green-600 bg-green-100 dark:text-green-100 dark:bg-green-500/20 border-0 rounded"> */}
                    Warehouse PO
                    {/*   </Tag> */}
                </div>
            )
        case 'bike_courier':
            return (
                <div className="mr-2 rtl:ml-2">
                    {/*   <Tag className="text-green-600 bg-green-100 dark:text-green-100 dark:bg-green-500/20 border-0 rounded"> */}
                    Bike Courier
                    {/*  </Tag> */}
                </div>
            )
        case 'rf_pack':
            return (
                <div className="mr-2 rtl:ml-2">
                    {/*   <Tag className="text-green-600 bg-green-100 dark:text-green-100 dark:bg-green-500/20 border-0 rounded"> */}
                    RF Pack
                    {/*  </Tag>*/}
                </div>
            )
        case 'foxlog':
            return (
                <div className="mr-2 rtl:ml-2">
                    {/*  <Tag className="text-green-600 bg-green-100 dark:text-green-100 dark:bg-green-500/20 border-0 rounded"> */}
                    Foxlog
                    {/*  </Tag> */}
                </div>
            )
        default:
            return (
                <div className="mr-2 rtl:ml-2">
                    {/*  <Tag className="text-gray-600 bg-gray-100 dark:text-gray-100 dark:bg-gray-500/20 border-0 rounded"> */}
                    Unknown
                    {/*  </Tag> */}
                </div>
            )
    }
}

export function mapDeliveryRegionToTag(deliveryRegion: string): JSX.Element {
    switch (deliveryRegion) {
        case 'BA':
            return (
                <div className="mr-2 rtl:ml-2">
                    {/*   <Tag className="text-blue-600 bg-blue-100 dark:text-blue-100 dark:bg-blue-500/20 border-0 rounded"> */}
                    Bratislava
                    {/*    </Tag> */}
                </div>
            )
        case 'PO':
            return (
                <div className="mr-2 rtl:ml-2">
                    {/*   <Tag className="text-yellow-600 bg-yellow-100 dark:text-yellow-100 dark:bg-yellow-500/20 border-0 rounded"> */}
                    Presov
                    {/*   </Tag> */}
                </div>
            )
        default:
            return (
                <div className="mr-2 rtl:ml-2">
                    {/*  <Tag className="text-gray-600 bg-gray-100 dark:text-gray-100 dark:bg-gray-500/20 border-0 rounded"> */}
                    Unknown
                    {/*  </Tag> */}
                </div>
            )
    }
}

export function mapPaymentMethodToTag(paymentMethod: string): JSX.Element {
    switch (paymentMethod) {
        case 'bank_transfer':
            return (
                <div className="mr-2 rtl:ml-2">
                    {/*   <Tag className="text-blue-600 bg-blue-100 dark:text-blue-100 dark:bg-blue-500/20 border-0 rounded"> */}
                    Bank Transfer
                    {/*   </Tag> */}
                </div>
            )
        case 'cash':
            return (
                <div className="mr-2 rtl:ml-2">
                    {/*   <Tag className="text-blue-600 bg-blue-100 dark:text-blue-100 dark:bg-blue-500/20 border-0 rounded"> */}
                    Cash
                    {/*  </Tag> */}
                </div>
            )
        case 'free_of_charge':
            return (
                <div className="mr-2 rtl:ml-2">
                    {/*    <Tag className="text-blue-600 bg-blue-100 dark:text-blue-100 dark:bg-blue-500/20 border-0 rounded"> */}
                    Free of Charge
                    {/*    </Tag> */}
                </div>
            )
        case 'internal_transaction':
            return (
                <div className="mr-2 rtl:ml-2">
                    {/*   <Tag className="text-blue-600 bg-blue-100 dark:text-blue-100 dark:bg-blue-500/20 border-0 rounded"> */}
                    Internal Transaction
                    {/*   </Tag> */}
                </div>
            )
        default:
            return (
                <div className="mr-2 rtl:ml-2">
                    {/*  <Tag className="text-gray-600 bg-gray-100 dark:text-gray-100 dark:bg-gray-500/20 border-0 rounded"> */}
                    Unknown
                    {/*   </Tag> */}
                </div>
            )
    }
}

export function mapPaymentRecordToTag(paymentRecord: string): JSX.Element {
    switch (paymentRecord) {
        case 'invoice':
            return (
                <div className="mr-2 rtl:ml-2">
                    {/*   <Tag className="text-blue-600 bg-blue-100 dark:text-blue-100 dark:bg-blue-500/20 border-0 rounded"> */}
                    Invoice
                    {/*    </Tag> */}
                </div>
            )
        case 'cash_receipt':
            return (
                <div className="mr-2 rtl:ml-2">
                    {/*  <Tag className="text-blue-600 bg-blue-100 dark:text-blue-100 dark:bg-blue-500/20 border-0 rounded"> */}
                    Cash Receipt
                    {/*  </Tag> */}
                </div>
            )
        case 'promotion':
            return (
                <div className="mr-2 rtl:ml-2">
                    {/*   <Tag className="text-blue-600 bg-blue-100 dark:text-blue-100 dark:bg-blue-500/20 border-0 rounded"> */}
                    Promotion
                    {/*   </Tag> */}
                </div>
            )
        case 'missing_document':
            return (
                <div className="mr-2 rtl:ml-2">
                    {/*    <Tag className="text-blue-600 bg-blue-100 dark:text-blue-100 dark:bg-blue-500/20 border-0 rounded"> */}
                    Missing Document
                    {/*  </Tag> */}
                </div>
            )
        case 'internal_transaction':
            return (
                <div className="mr-2 rtl:ml-2">
                    {/*  <Tag className="text-blue-600 bg-blue-100 dark:text-blue-100 dark:bg-blue-500/20 border-0 rounded"> */}
                    Internal Transaction
                    {/*  </Tag> */}
                </div>
            )
        default:
            return (
                <div className="mr-2 rtl:ml-2">
                    {/*  <Tag className="text-gray-600 bg-gray-100 dark:text-gray-100 dark:bg-gray-500/20 border-0 rounded"> */}
                    Unknown
                    {/*   </Tag> */}
                </div>
            )
    }
}
