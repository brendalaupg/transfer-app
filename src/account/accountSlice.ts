import { createSlice } from '@reduxjs/toolkit'
import { ACCOUNT_INITIAL_STATE } from './accountConstants'

const accountSlice = createSlice({
    name: 'account',
    initialState: ACCOUNT_INITIAL_STATE,
    reducers: {
        setBalance(state, action) {
            state.balance = action.payload
        },
        setAccountNumber(state, action) {
            state.accountNumber = action.payload
        },
    },
})

export const AccountActions = accountSlice.actions
export const accountReducer = accountSlice.reducer
