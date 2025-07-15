import { createSlice } from '@reduxjs/toolkit'
import { ACCOUNT_INITIAL_STATE } from './accountConstants'
import { transferMoney } from '../transfer/transferAsyncThunk'

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
    extraReducers: (builder) => {
        builder.addCase(transferMoney.fulfilled, (state, action) => {
            state.balance += action.payload.amount
        })
    },
})

export const AccountActions = accountSlice.actions
export const accountReducer = accountSlice.reducer
