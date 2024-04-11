import { createSlice } from '@reduxjs/toolkit'

interface ProductState {
    // Define your state properties here
    orderProductClassic: number
    orderProductMelon: number
    orderProductMint: number
    orderProductHemp: number
    orderProductGinger: number
}

const initialState: ProductState = {
    orderProductClassic: 0,
    orderProductMelon: 0,
    orderProductMint: 0,
    orderProductHemp: 0,
    orderProductGinger: 0,
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProductAmount: (state, action) => {
            const { productType, amount } = action.payload
            // Update the state based on the productType
            state[productType] = amount
        },
        // Other reducers if needed
    },
})

export const { setProductAmount } = productSlice.actions

export default productSlice.reducer
