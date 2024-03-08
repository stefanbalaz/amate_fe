import { createSlice } from '@reduxjs/toolkit'

interface ProductState {
    // Define your state properties here
    classic: number
    melon: number
    mint: number
    hemp: number
    ginger: number
}

const initialState: ProductState = {
    classic: 0,
    melon: 0,
    mint: 0,
    hemp: 0,
    ginger: 0,
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
