import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import Tag from '@/components/ui/Tag'
import {
    DrawerOrderStatusContent,
    orderStatusMap,
    paymentStatusMap,
} from '@/configs/order.overview/orderStringMapper'
import { OrderContext } from '@/services/OrderContextProvider'

const yourUpdateStatusApiCall = async (
    orderId,
    newStatusKey,
    showStatuses,
    isPaymentStatus
) => {
    try {
        const payload =
            showStatuses === 'payment_status'
                ? {
                      orderPayment: {
                          status: newStatusKey !== '' ? newStatusKey : '',
                      },
                  }
                : { orderStatus: newStatusKey !== '' ? newStatusKey : '' }

        //  console.log('isPaymentStatus', isPaymentStatus)
        // console.log('drawer newStatus before API CALL', newStatusKey)
        // console.log('drawer orderId', orderId)
        // console.log('drawer payload', payload) // Log the payload being sent

        const response = await fetch(`http://localhost:8000/order/${orderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })

        // console.log('drawer response', response)

        if (response.ok) {
            const data = await response.json()
            //  console.log('API Response Data:', data)
            //  console.log('Status updated successfully.')

            // Handle any necessary state changes or UI updates after updating the status
        } else {
            console.error('Failed to update status.')
        }
    } catch (error) {
        console.error('Error updating status:', error.message)
    }
}

const DrawerStatusList = ({
    orderId,
    onCloseDrawer,
    onStatusUpdate,
    orderStatusMap = {},
    paymentStatusMap = {},
    yourUpdateStatusApiCall2, // Pass the function as a prop
    showStatuses,
}) => {
    const [isLoading, setIsLoading] = useState(false)

    //    const [showStatuses, setShowStatuses] = useState(true)

    useEffect(() => {
        //   console.log('Order Status Map:', orderStatusMap)
        //   console.log('Payment Status Map:', paymentStatusMap)
        //   console.log('Show Order Statuses:', showStatuses)
    }, [orderStatusMap, paymentStatusMap, showStatuses])

    const handlePaymentStatusClick = async (statusKey) => {
        setIsLoading(true)

        try {
            if (paymentStatusMap[statusKey]) {
                await yourUpdateStatusApiCall(orderId, statusKey, showStatuses)
            } else {
                console.error(`Unrecognized order status key: ${statusKey}`)
                return
            }

            setIsLoading(false)
            onCloseDrawer()
            //  console.log(`Payment status '${statusKey}' updated successfully.`)
            onStatusUpdate()
        } catch (error) {
            setIsLoading(false)
            console.error('Error updating payment status:', error)
        }
    }

    const handleOrderStatusClick = async (statusKey) => {
        setIsLoading(true)

        try {
            if (orderStatusMap[statusKey]) {
                await yourUpdateStatusApiCall(orderId, statusKey, showStatuses)
            } else {
                console.error(`Unrecognized order status key: ${statusKey}`)
                return
            }

            setIsLoading(false)
            onCloseDrawer()
            // console.log(`Order status '${statusKey}' updated successfully.`)
            onStatusUpdate()
        } catch (error) {
            setIsLoading(false)
            console.error('Error updating order status:', error)
        }
    }

    const statusMap =
        showStatuses === 'order_status' ? orderStatusMap : paymentStatusMap

    return (
        <div>
            {Object.entries(statusMap).map(([statusKey, statusInfo], index) => (
                <div key={index} className="mb-4">
                    <Tag
                        className={statusInfo.className}
                        style={{
                            display: 'block',
                            maxWidth: 'fit-content',
                            whiteSpace: 'pre-line',
                            cursor: 'pointer',
                        }}
                        onClick={() => {
                            if (showStatuses === 'order_status') {
                                handleOrderStatusClick(statusKey)
                            } else if (showStatuses === 'payment_status') {
                                handlePaymentStatusClick(statusKey)
                            }
                        }}
                    >
                        {showStatuses === 'order_status'
                            ? statusInfo.orderStatusKey
                            : statusInfo.paymentStatusKey}
                    </Tag>
                </div>
            ))}
        </div>
    )
}

export default DrawerStatusList
