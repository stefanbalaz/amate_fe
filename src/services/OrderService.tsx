import ApiService from './ApiService'
import { format } from 'date-fns'
//import Tag from '@/components/ui/Tag'
import {
    mapOriginalToCustomStatus,
    mapPaymentStatusToTag,
    mapDeliveryMethodToTag,
    mapDeliveryMethodDetailToTag,
    mapDeliveryRegionToTag,
    mapPaymentMethodToTag,
    mapPaymentRecordToTag,
} from '../configs/order.overview/orderStringMapper'

async function fetchPartner(partnerID: string) {
    try {
        const response = await ApiService.fetchData<PartnerApiResponse>({
            url: `http://localhost:8000/partner/${partnerID}`,
            method: 'get',
        })
        return response.data.data // Assuming the partner data is directly under data in the response
    } catch (error) {
        console.error('Error fetching partner:', error)
        throw error
    }
}

async function fetchMerchant(merchantID: string) {
    try {
        const response = await ApiService.fetchData<MerchantApiResponse>({
            url: `http://localhost:8000/merchant/${merchantID}`,
            method: 'get',
        })
        //console.log('MERCHANT DATA', response.data.data)
        return response.data.data
    } catch (error) {
        console.error('Error fetching partner:', error)
        throw error
    }
}

fetchMerchant()

/* async function fetchProduct(productId) {
    try {
        const response = await ApiService.fetchData<ProductApiResponse>({
            url: `http://localhost:8000/products/${productId}`, // Adjust the endpoint
            method: 'get',
        })
        return response.data.flavor // Assuming the flavor data is directly available in the response
    } catch (error) {
        throw error
    }
}
 */

/* export async function fetchOrdersWithPartner() {
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

                if (order.orderPayment) {
                    order.orderPayment.dueDate = format(
                        new Date(order.orderPayment.dueDate),
                        'dd.MM.yyyy'
                    )
                    order.orderPayment.recordIssuanceDate = format(
                        new Date(order.orderPayment.recordIssuanceDate),
                        'dd.MM.yyyy'
                    )
                }

                if (order.orderPartner && order.orderPartner.ID) {
                    const partnerData = await fetchPartner(
                        order.orderPartner.ID
                    )
                    const partnerName =
                        partnerData.partnerDisplayName ||
                        `${partnerData.partnerRegistration?.forename || ''} ${
                            partnerData.partnerRegistration?.surname || ''
                        }`
                    order.partnerName = partnerName
                    order.orderPartner = {
                        ...order.orderPartner,
                        ...partnerData,
                    }
                }

                if (order.orderMerchant && order.orderMerchant.ID) {
                    const merchantData = await fetchMerchant(
                        order.orderMerchant.ID
                    )

                    // Assign merchant data to order object
                    order.orderMerchant.completeMerchantData = merchantData
                }

                // Extracting delivery and billing addresses using their IDs
                const deliveryAddressId =
                    order.orderDelivery.orderDeliveryAddressId
                const partnerBillingAddressId =
                    order.orderPayment.orderPartnerBillingAddressId
                const productPriceId = order.orderPayment.partnerProductPriceId
                const merchantBillingAddressId =
                    order.orderMerchant?.merchantBillingAddressId

                //   console.log('Delivery Address ID:', deliveryAddressId)
                //   console.log('Billing Address ID:', billingAddressId)
                //console.log('productPriceId:', productPriceId)
                //console.log('merchantBillingAddressId:',merchantBillingAddressId)

                const deliveryAddress =
                    order.orderPartner.partnerDeliveryAddress?.find(
                        (address: any) => address._id === deliveryAddressId
                    )
                const partnerBillingAddress =
                    order.orderPartner.partnerBillingAddress?.find(
                        (address: any) =>
                            address._id === partnerBillingAddressId
                    )
                const productPrice =
                    order.orderPartner.partnerProductPrice?.find(
                        (address: any) => address._id === productPriceId
                    )

                const merchantBillingAddress =
                    order.orderMerchant.completeMerchantData.merchantBillingAddress?.find(
                        (address: any) =>
                            address._id === merchantBillingAddressId
                    )
                //  console.log('Found Delivery Address:', deliveryAddress)
                //  console.log('Found Billing Address:', billingAddress)
                //console.log('productPrice:', productPrice)
                //console.log('merchantBillingAddress:', merchantBillingAddress)

                // Attach the specific delivery and billing addresses to the order object
                order.orderDelivery.selectedDeliveryAddress = {
                    ...deliveryAddress,
                }
                order.orderPayment.selectedBillingAddress = {
                    ...partnerBillingAddress,
                }
                order.orderPayment.selectedPrice = { ...productPrice }
                order.orderMerchant.selectedMerchantData = {
                    ...merchantBillingAddress,
                }

                return order
            })
        )

        const ordersWithCustomData = formattedData.map((order) => ({
            ...order,
            mappedStrings: {
                customStatus: mapOriginalToCustomStatus(order.orderStatus),
                customPaymentStatus: mapPaymentStatusToTag(
                    order.orderPayment.status
                ),
                customDeliveryMethod: mapDeliveryMethodToTag(
                    order.orderDelivery.method
                ),

                customDeliveryMethodDetail: mapDeliveryMethodDetailToTag(
                    order.orderDelivery.methodDetail
                ),

                customDeliveryRegion: mapDeliveryRegionToTag(
                    order.orderDelivery.region
                ),

                customPaymentMethod: mapPaymentMethodToTag(
                    order.orderPayment.method
                ),

                customPaymentRecord: mapPaymentRecordToTag(
                    order.orderPayment.record
                ),
            },
        }))
        //  console.log('ordersWithCustomData', ordersWithCustomData)
        return ordersWithCustomData // Return the modified data here
    } catch (error) {
        console.error('Error fetching partner:', error)
        throw error
    }
}
 */

export async function fetchOrdersWithPartner() {
    try {
        const response = await ApiService.fetchData<OrderApiResponse>({
            url: 'http://localhost:8000/order/',
            method: 'get',
        })

        const formattedData = await Promise.all(
            response.data.data.map(async (order: any) => {
                // Check and format order dates only if they exist and are not null/undefined
                if (order.orderCreationDate) {
                    order.orderCreationDate = format(
                        new Date(order.orderCreationDate),
                        'dd.MM.yyyy'
                    )
                }

                if (order.orderDelivery && order.orderDelivery.date) {
                    order.orderDelivery.date = format(
                        new Date(order.orderDelivery.date),
                        'dd.MM.yyyy'
                    )
                }

                if (order.orderPayment && order.orderPayment.dueDate) {
                    order.orderPayment.dueDate = format(
                        new Date(order.orderPayment.dueDate),
                        'dd.MM.yyyy'
                    )
                }

                if (order.orderPartner && order.orderPartner.ID) {
                    const partnerData = await fetchPartner(
                        order.orderPartner.ID
                    )
                    const partnerName =
                        partnerData.partnerDisplayName ||
                        `${partnerData.partnerRegistration?.forename || ''} ${
                            partnerData.partnerRegistration?.surname || ''
                        }`
                    order.partnerName = partnerName
                    order.orderPartner = {
                        ...order.orderPartner,
                        ...partnerData,
                    }
                }

                if (order.orderMerchant && order.orderMerchant.ID) {
                    const merchantData = await fetchMerchant(
                        order.orderMerchant.ID
                    )

                    // Assign merchant data to order object
                    order.orderMerchant.completeMerchantData = merchantData
                }

                // Extracting delivery and billing addresses using their IDs
                const deliveryAddressId =
                    order.orderDelivery.orderDeliveryAddressId
                const partnerBillingAddressId =
                    order.orderPayment.orderPartnerBillingAddressId
                const productPriceId = order.orderPayment.partnerProductPriceId
                const merchantBillingAddressId =
                    order.orderMerchant?.merchantBillingAddressId

                //   console.log('Delivery Address ID:', deliveryAddressId)
                //   console.log('Billing Address ID:', billingAddressId)
                //console.log('productPriceId:', productPriceId)
                //console.log('merchantBillingAddressId:',merchantBillingAddressId)

                const deliveryAddress =
                    order.orderPartner.partnerDeliveryAddress?.find(
                        (address: any) => address._id === deliveryAddressId
                    )
                const partnerBillingAddress =
                    order.orderPartner.partnerBillingAddress?.find(
                        (address: any) =>
                            address._id === partnerBillingAddressId
                    )
                const productPrice =
                    order.orderPartner.partnerProductPrice?.find(
                        (address: any) => address._id === productPriceId
                    )

                const merchantBillingAddress =
                    order.orderMerchant.completeMerchantData.merchantBillingAddress?.find(
                        (address: any) =>
                            address._id === merchantBillingAddressId
                    )
                //  console.log('Found Delivery Address:', deliveryAddress)
                //  console.log('Found Billing Address:', billingAddress)
                //console.log('productPrice:', productPrice)
                //console.log('merchantBillingAddress:', merchantBillingAddress)

                // Attach the specific delivery and billing addresses to the order object
                order.orderDelivery.selectedDeliveryAddress = {
                    ...deliveryAddress,
                }
                order.orderPayment.selectedBillingAddress = {
                    ...partnerBillingAddress,
                }
                order.orderPayment.selectedPrice = { ...productPrice }
                order.orderMerchant.selectedMerchantData = {
                    ...merchantBillingAddress,
                }

                return order
            })
        )

        const ordersWithCustomData = formattedData.map((order) => ({
            ...order,
            mappedStrings: {
                customStatus: mapOriginalToCustomStatus(order.orderStatus),
                customPaymentStatus: mapPaymentStatusToTag(
                    order.orderPayment.status
                ),
                customDeliveryMethod: mapDeliveryMethodToTag(
                    order.orderDelivery.method
                ),

                customDeliveryMethodDetail: mapDeliveryMethodDetailToTag(
                    order.orderDelivery.methodDetail
                ),

                customDeliveryRegion: mapDeliveryRegionToTag(
                    order.orderDelivery.region
                ),

                customPaymentMethod: mapPaymentMethodToTag(
                    order.orderPayment.method
                ),

                customPaymentRecord: mapPaymentRecordToTag(
                    order.orderPayment.record
                ),
            },
        }))
        //  console.log('ordersWithCustomData', ordersWithCustomData)
        return ordersWithCustomData // Return the modified data here
    } catch (error) {
        console.error('Error fetching partner:', error)
        throw error
    }
}
