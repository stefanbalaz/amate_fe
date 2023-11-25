import ApiService from './ApiService'
import { format } from 'date-fns'

export async function fetchOrders() {
    try {
        const response = await ApiService.fetchData<OrderApiResponse>({
            url: 'http://localhost:8000/order/',
            method: 'get',
        })
        console.log('API Response:', response.data.data)
        const formattedData = response.data.data.map((order: any) => {
            order.orderCreationDate = format(
                new Date(order.orderCreationDate),
                'dd.MM.yyyy'
            )
            if (order.orderDelivery && order.orderDelivery.date) {
                order.orderDelivery.date = format(
                    new Date(order.orderDelivery.date),
                    'dd.MM.yyyy'
                )
            }
            return order
        })

        return formattedData
    } catch (error) {
        // console.error('orderservice.ts - Error:', error)
        throw error
    }
}

/* async function fetchPartner(partnerID: string) {
    try {
        const response = await ApiService.fetchData<any>({
            url: `http://localhost:8000/partner/${partnerID}`, // Adjust the endpoint based on your API
            method: 'get',
        })
        return response.data // Assuming the partner data is directly under data in the response
    } catch (error) {
        throw error
    }
}

export async function fetchOrdersWithPartner() {
    try {
        const response = await ApiService.fetchData<OrderApiResponse>({
            url: 'http://localhost:8000/order/',
            method: 'get',
        })

        const formattedData = await Promise.all(
            response.data.data.map(async (order: any) => {
                order.orderCreationDate = format(
                    new Date(order.orderCreationDate),
                    'dd.MM.yyyy'
                )
                if (order.orderDelivery && order.orderDelivery.date) {
                    order.orderDelivery.date = format(
                        new Date(order.orderDelivery.date),
                        'dd.MM.yyyy'
                    )
                }
                if (order.orderPartner && order.orderPartner.ID) {
                    const partnerData = await fetchPartner(
                        order.orderPartner.ID
                    )
                    order.orderPartner = partnerData // Replace orderPartner with fetched partner data
                }
                return order
            })
        )

        return formattedData
    } catch (error) {
        throw error
    }
}
 */
