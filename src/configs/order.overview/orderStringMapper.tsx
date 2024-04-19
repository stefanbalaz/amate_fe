import Tag from '@/components/ui/Tag'
import IconText from '@/components/shared/IconText'
import { HiClock } from 'react-icons/hi'
import { AiFillEuroCircle } from 'react-icons/ai'
import { HiExclamationCircle } from 'react-icons/hi'

interface StatusInfo {
    orderStatusKey: string
    className: string
    style: {
        backgroundColor: string
        color: string
        // Add other style properties as needed
    }
}

interface ProductVolumeInfo {
    productVolumeKey: string
    className: string
}

interface TransportMediumInfo {
    transportMediumKey: string
    className: string
}

interface ContainerMediumInfo {
    containerMediumKey: string
    className: string
}

interface UnitsPerTransportMediumInfo {
    unitsPerTransportMediumKey: string
    className: string
}

interface DeliveryMethodInfo {
    productVolumeKey: string
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
    const statusInfo = orderStatusMap[originalStatus] || orderStatusMap.other

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
    const statusInfo = paymentStatusMap[paymentStatus] || paymentStatusMap.other

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

export const deliveryMethodMap: Record<string, DeliveryMethodInfo> = {
    manufacturer_delivery: {
        deliveryMethodKey: 'Manufacturer Delivery',
        className: 'mr-2 rtl:ml-2',
        // Add other properties as needed
    },
    warehouse_pickup: {
        deliveryMethodKey: 'Warehouse Pickup',
        className: 'mr-2 rtl:ml-2',
        // Add other properties as needed
    },
    manufacturer_shop: {
        deliveryMethodKey: 'Manufacturer Shop',
        className: 'mr-2 rtl:ml-2',
        // Add other properties as needed
    },
    external_carrier: {
        deliveryMethodKey: 'External Carrier',
        className: 'mr-2 rtl:ml-2',
        // Add other properties as needed
    },
    other: {
        deliveryMethodKey: 'Other',
        className: 'mr-2 rtl:ml-2',
        // Add other properties as needed
    },
}

export function mapDeliveryMethodToTag(deliveryMethod: string): JSX.Element {
    const deliveryMethodInfo =
        deliveryMethodMap[deliveryMethod] || deliveryMethodMap.other

    return (
        <div className={deliveryMethodInfo.className}>
            {deliveryMethodInfo.deliveryMethodKey}
            {/* You can include other properties here as needed */}
        </div>
    )
}

export const deliveryMethodDetailMap: Record<string, DeliveryMethodDetailInfo> =
    {
        warehouse_ba: {
            deliveryMethodDetailKey: 'Warehouse BA',
            className: 'mr-2 rtl:ml-2',
            // Add other properties as needed
        },
        warehouse_zm: {
            deliveryMethodDetailKey: 'Warehouse ZM',
            className: 'mr-2 rtl:ml-2',
            // Add other properties as needed
        },
        warehouse_po: {
            deliveryMethodDetailKey: 'Warehouse PO',
            className: 'mr-2 rtl:ml-2',
            // Add other properties as needed
        },
        bike_courier: {
            deliveryMethodDetailKey: 'Bike Courier',
            className: 'mr-2 rtl:ml-2',
            // Add other properties as needed
        },
        rf_pack: {
            deliveryMethodDetailKey: 'RF Pack',
            className: 'mr-2 rtl:ml-2',
            // Add other properties as needed
        },
        foxlog: {
            deliveryMethodDetailKey: 'Foxlog',
            className: 'mr-2 rtl:ml-2',
            // Add other properties as needed
        },
        other: {
            deliveryMethodDetailKey: 'Other',
            className: 'mr-2 rtl:ml-2',
            // Add other properties as needed
        },
    }

export function mapDeliveryMethodDetailToTag(
    deliveryMethodDetail: string
): JSX.Element {
    const deliveryMethodDetailInfo =
        deliveryMethodDetailMap[deliveryMethodDetail] ||
        deliveryMethodDetailMap.other

    return (
        <div className={deliveryMethodDetailInfo.className}>
            {deliveryMethodDetailInfo.deliveryMethodDetailKey}
            {/* You can include other properties here as needed */}
        </div>
    )
}

export const deliveryRegionMap: Record<string, DeliveryRegionInfo> = {
    BA: {
        deliveryRegionKey: 'Bratislava',
        className: 'mr-2 rtl:ml-2',
        // Add other properties as needed
    },
    PO: {
        deliveryRegionKey: 'Presov',
        className: 'mr-2 rtl:ml-2',
        // Add other properties as needed
    },
    other: {
        deliveryRegionKey: 'Other',
        className: 'mr-2 rtl:ml-2',
        // Add other properties as needed
    },
}

export function mapDeliveryRegionToTag(deliveryRegion: string): JSX.Element {
    const deliveryRegionInfo =
        deliveryRegionMap[deliveryRegion] || deliveryRegionMap.other

    return (
        <div className={deliveryRegionInfo.className}>
            {deliveryRegionInfo.deliveryRegionKey}
            {/* You can include other properties here as needed */}
        </div>
    )
}

export const paymentMethodMap: Record<string, PaymentMethodInfo> = {
    bank_transfer: {
        paymentMethodKey: 'Bank Transfer',
        className: 'mr-2 rtl:ml-2',
        // Add other properties as needed
    },
    cash: {
        paymentMethodKey: 'Cash',
        className: 'mr-2 rtl:ml-2',
        // Add other properties as needed
    },
    free_of_charge: {
        paymentMethodKey: 'Free of Charge',
        className: 'mr-2 rtl:ml-2',
        // Add other properties as needed
    },
    internal_transaction: {
        paymentMethodKey: 'Internal Transaction',
        className: 'mr-2 rtl:ml-2',
        // Add other properties as needed
    },
    other: {
        paymentMethodKey: 'Other',
        className: 'mr-2 rtl:ml-2',
        // Add other properties as needed
    },
}

export function mapPaymentMethodToTag(paymentMethod: string): JSX.Element {
    const paymentMethodInfo =
        paymentMethodMap[paymentMethod] || paymentMethodMap.other

    return (
        <div className={paymentMethodInfo.className}>
            {paymentMethodInfo.paymentMethodKey}
            {/* You can include other properties here as needed */}
        </div>
    )
}

export const paymentRecordMap: Record<string, PaymentRecordInfo> = {
    invoice: {
        paymentRecordKey: 'Invoice',
        className: 'mr-2 rtl:ml-2',
        // Add other properties as needed
    },
    cash_receipt: {
        paymentRecordKey: 'Cash Receipt',
        className: 'mr-2 rtl:ml-2',
        // Add other properties as needed
    },
    promotion: {
        paymentRecordKey: 'Promotion',
        className: 'mr-2 rtl:ml-2',
        // Add other properties as needed
    },
    missing_document: {
        paymentRecordKey: 'Missing Document',
        className: 'mr-2 rtl:ml-2',
        // Add other properties as needed
    },
    internal_transaction: {
        paymentRecordKey: 'Internal Transaction',
        className: 'mr-2 rtl:ml-2',
        // Add other properties as needed
    },
    other: {
        paymentRecordKey: 'Other',
        className: 'mr-2 rtl:ml-2',
        // Add other properties as needed
    },
}

export function mapPaymentRecordToTag(paymentRecord: string): JSX.Element {
    const paymentRecordInfo =
        paymentRecordMap[paymentRecord] || paymentRecordMap.other

    return (
        <div className={paymentRecordInfo.className}>
            {paymentRecordInfo.paymentRecordKey}
            {/* You can include other properties here as needed */}
        </div>
    )
}

export const productVolumeMap: Record<string, ProductVolumeInfo> = {
    0.33: {
        productVolumeKey: '0,33',
        className:
            'text-pink-800 bg-pink-300 dark:text-pink-300 dark:bg-pink-800/20 border-0 rounded',
    },
    0.5: {
        productVolumeKey: '0,5',
        className:
            'text-teal-800 bg-teal-300 dark:text-teal-300 dark:bg-teal-800/20 border-0 rounded',
    },
}

export const transportMediumMap: Record<string, TransportMediumInfo> = {
    crate: {
        transportMediumKey: 'Crate',
        className:
            'text-pink-800 bg-pink-300 dark:text-pink-300 dark:bg-pink-800/20 border-0 rounded',
    },
    cardboard: {
        transportMediumKey: 'Cardboard',
        className:
            'text-teal-800 bg-teal-300 dark:text-teal-300 dark:bg-teal-800/20 border-0 rounded',
    },
}

export const containerMediumMap: Record<string, ContainertMediumInfo> = {
    glass: {
        containerMediumKey: 'Glass',
        className:
            'text-pink-800 bg-pink-300 dark:text-pink-300 dark:bg-pink-800/20 border-0 rounded',
    },
    plastic: {
        containerMediumKey: 'Plastic',
        className:
            'text-teal-800 bg-teal-300 dark:text-teal-300 dark:bg-teal-800/20 border-0 rounded',
    },
}

export const unitsPerTransportMediumMap: Record<
    string,
    UnitsPerTransportMediumInfo
> = {
    twenty: {
        unitsPerTransportMediumKey: '20',
        className:
            'text-pink-800 bg-pink-300 dark:text-pink-300 dark:bg-pink-800/20 border-0 rounded',
    },
    twentyfour: {
        unitsPerTransportMediumKey: '24',
        className:
            'text-teal-800 bg-teal-300 dark:text-teal-300 dark:bg-teal-800/20 border-0 rounded',
    },
}
