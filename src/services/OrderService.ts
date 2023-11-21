/* import ApiService from './ApiService'

// Define your response and request types
type OrderApiResponse = {
    orderId: string
    productName: string
    // ...other fields
}

type OrderApiRequest = {
    userId: string
    // ...other fields
}

export async function fetchOrders(data: OrderApiRequest) {
    try {
        const response = await ApiService.fetchData<
            OrderApiResponse,
            OrderApiRequest
        >({
            url: 'http://localhost:8000/order/', // Replace with your actual API URL
            method: 'get', // Specify your HTTP method
            data, // Pass the data to the API call
        })

        return response.data // Return the response data
    } catch (error) {
        throw error // Throw an error to handle it wherever this function is used
    }
}
 */

import ApiService from './ApiService'

export async function fetchOrders() {
    try {
        const response = await ApiService.fetchData<OrderApiResponse>({
            url: 'http://localhost:8000/order/',
            method: 'get',
        })
        // console.log('orderservice.ts - Retrieved Data:', response.data)
        return response.data
    } catch (error) {
        // console.error('orderservice.ts - Error:', error)
        throw error
    }
}
