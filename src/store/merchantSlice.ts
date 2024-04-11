import { createSlice } from '@reduxjs/toolkit'

interface MerchantState {
    // Define your state properties here
    merchantID: string | null
}

const initialState: MerchantState = {
    merchantID: null,
}

const merchantSlice = createSlice({
    name: 'merchant',
    initialState,
    reducers: {
        setMerchantID: (state, action) => {
            state.merchantID = action.payload
        },
        // Other reducers if needed
    },
})

export const { setMerchantID } = merchantSlice.actions

export default merchantSlice.reducer
