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
            // url: `https://amate.onrender.com/partner/${partnerID}`,
            url: `https://amate.onrender.com/partner/${partnerID}`,

            method: 'get',
        })
        return response.data.data // Assuming the partner data is directly under data in the response
    } catch (error) {
        console.error('Error fetching partner:', error)
        throw error
    }
}

/* 
async function fetchAllPartners(partnerIDs) {
    try {
        const partnerPromises = partnerIDs.map(async (partnerID) => {
            const response = await ApiService.fetchData<PartnerApiResponse>({
                url: `https://amate.onrender.com/partner/${partnerID}`,
                method: 'get',
            })

            return response.data.data
        })

        // Wait for all promises to resolve
        const partnersData = await Promise.all(partnerPromises)

        return partnersData
    } catch (error) {
        console.error('Error fetching partners:', error)
        throw error
    }
} */

async function fetchMerchant(merchantID: string) {
    try {
        const response = await ApiService.fetchData<MerchantApiResponse>({
            // url: `https://amate.onrender.com/merchant/${merchantID}`,
            url: `https://amate.onrender.com/merchant/${merchantID}`,

            method: 'get',
        })
        //console.log('MERCHANT DATA', response.data.data)
        return response.data.data
    } catch (error) {
        console.error('Error fetching partner:', error)
        throw error
    }
}

// FETCH ALL ORDERS WITH PARTNER NAME

export async function fetchOrdersWithPartner() {
    try {
        const orderResponse = await ApiService.fetchData({
            url: 'https://amate.onrender.com/order/',
            method: 'get',
        })

        const orders = orderResponse.data.data

        // Extract partner IDs from orders
        const partnerIds = orders.map((order) => order.orderPartner._id)

        // Fetch all partner data in a single request
        const partnerResponse = await ApiService.fetchData({
            url: 'https://amate.onrender.com/partner/', // Adjust the URL based on your API
            method: 'get',
            data: { partnerIds }, // Send the list of partner IDs in the request body
        })

        const partnersData = partnerResponse.data.data

        const partnersMap = new Map(
            partnersData.map((partner) => [partner._id, partner])
        )

        // Process orders and attach partner data in parallel
        const formattedData = orders.map((order) => {
            if (order.orderCreationDate) {
                order.orderCreationDate = format(
                    new Date(order.orderCreationDate),
                    'dd.MM.yyyy'
                )
            }

            const partnerData = partnersMap.get(order.orderPartner.ID)

            // console.log('Order:', order)
            // console.log('PartnerData:', partnerData)

            if (partnerData) {
                const partnerName =
                    partnerData.partnerDisplayName ||
                    (partnerData.partnerRegistration
                        ? `${partnerData.partnerRegistration.forename || ''} ${
                              partnerData.partnerRegistration.surname || ''
                          }`
                        : '')
                order.partnerName = partnerName
            }

            return order
        })

        // console.log('formattedData', formattedData)

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

        return ordersWithCustomData
    } catch (error) {
        console.error('Error fetching orders:', error)
        throw error
    }
}

//
//
// FETCH ONE ORDER WITH ALL PARTNER AND MERCHANT DATA
//
//

export async function fetchOrderWithPartnerMerchant(orderId: string) {
    try {
        // Fetch the order data
        const orderResponse = await ApiService.fetchData({
            url: `https://amate.onrender.com/order/${orderId}`,
            method: 'get',
        })

        const order = orderResponse.data.data

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

        // Fetch and attach partner data
        if (order.orderPartner && order.orderPartner.ID) {
            const partnerData = await fetchPartner(order.orderPartner.ID)
            const partnerName =
                partnerData.partnerDisplayName ||
                `${partnerData.partnerRegistration?.forename || ''} ${
                    partnerData.partnerRegistration?.surname || ''
                }`
            order.partnerName = partnerName
            order.orderPartner = { ...order.orderPartner, ...partnerData }
        }

        // Fetch and attach merchant data
        if (order.orderMerchant && order.orderMerchant.ID) {
            const merchantData = await fetchMerchant(order.orderMerchant.ID)
            order.orderMerchant.completeMerchantData = merchantData
        }

        // Extracting delivery and billing addresses using their IDs
        const deliveryAddressId = order.orderDelivery.orderDeliveryAddressId
        const partnerBillingAddressId =
            order.orderPayment.orderPartnerBillingAddressId
        const productPriceId = order.orderPayment.partnerProductPriceId
        const merchantBillingAddressId =
            order.orderMerchant?.merchantBillingAddressId

        const deliveryAddress = order.orderPartner.partnerDeliveryAddress?.find(
            (address: any) => address._id === deliveryAddressId
        )
        const partnerBillingAddress =
            order.orderPartner.partnerBillingAddress?.find(
                (address: any) => address._id === partnerBillingAddressId
            )
        const productPrice = order.orderPartner.partnerProductPrice?.find(
            (address: any) => address._id === productPriceId
        )

        const merchantBillingAddress =
            order.orderMerchant.completeMerchantData.merchantBillingAddress?.find(
                (address: any) => address._id === merchantBillingAddressId
            )

        // Attach the specific delivery and billing addresses to the order object
        order.orderDelivery.selectedDeliveryAddress = { ...deliveryAddress }
        order.orderPayment.selectedBillingAddress = { ...partnerBillingAddress }
        order.orderPayment.selectedPrice = { ...productPrice }
        order.orderMerchant.selectedMerchantData = { ...merchantBillingAddress }

        // Map strings and return the modified order
        const orderWithCustomData = {
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
        }

        return orderWithCustomData
    } catch (error) {
        console.error('Error fetching order with partner and merchant:', error)
        throw error
    }
}
