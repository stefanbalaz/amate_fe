import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'

export type UserState = {
    avatar?: string
    userName?: string
    email?: string
    authority?: string[]
    partnerID?: string // Add partnerID to the UserState type
}

const initialState: UserState = {
    avatar: '',
    userName: '',
    email: '',
    authority: [],
    partnerID: '', // Initialize partnerID
}

const userSlice = createSlice({
    name: `${SLICE_BASE_NAME}/user`,
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            state.avatar = action.payload?.avatar
            state.email = action.payload?.email
            state.userName = action.payload?.userName
            state.authority = action.payload?.authority
            state.partnerID = action.payload?.partnerID // Update to include partnerID
        },
    },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
