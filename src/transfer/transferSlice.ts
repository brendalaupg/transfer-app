import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit'
import { TRANSFER_INITIAL_STATE } from './constants/transferConstants'
import { transferMoney } from './transferAsyncThunk'
import { TransferState } from './types'

const transferSlice = createSlice({
    name: 'transfer',
    initialState: TRANSFER_INITIAL_STATE,
    reducers: {
        setTransfers(state, action) {
            state.transferHistory = action.payload
        },
    },
    extraReducers: (builder: ActionReducerMapBuilder<TransferState>) => {
        builder.addCase(transferMoney.fulfilled, (state, action) => {
            state.transferHistory.unshift(action.payload)
        })
        builder.addCase(transferMoney.rejected, (state, action) => {
            console.error('Transfer failed:', action.payload)
        })
    },
})

export const TransferActions = transferSlice.actions
export const transferReducer = transferSlice.reducer
