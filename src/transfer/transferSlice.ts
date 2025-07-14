import { createSlice } from '@reduxjs/toolkit'
import { TRANSFER_INITIAL_STATE } from './constants/transferConstants'

const transferSlice = createSlice({
    name: 'transfer',
    initialState: TRANSFER_INITIAL_STATE,
    reducers: {
        setTransfers(state, action) {
            state.transferHistory = action.payload
        },
    },
})

export const TransferActions = transferSlice.actions
export const transferReducer = transferSlice.reducer
