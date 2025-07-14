import { configureStore } from '@reduxjs/toolkit'
import { accountReducer } from '../account/accountSlice'
import { transferReducer } from '../transfer/transferSlice'
import { contactReducer } from '../contacts/contactSlice'

export const rootStore = configureStore({
    reducer: {
        account: accountReducer,
        transfer: transferReducer,
        contact: contactReducer,
    },
})

export type AppDispatch = typeof rootStore.dispatch
export type RootState = ReturnType<(typeof rootStore)['getState']>
