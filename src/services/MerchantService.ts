import ApiService from './ApiService'

const function fetchMerchant(merchantID: string) {
    try {
        const response = await ApiService.fetchData<MerchantApiResponse>({
            
            url: `https://amate.onrender.com/merchant/${merchantID}`,

            method: 'get',
        })
        //console.log('MERCHANT DATA', response.data.data)
        return response.data.data
    } catch (error) {
        console.error('Error fetching merchant:', error)
        throw error
    }
}
