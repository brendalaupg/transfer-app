import { configureStore } from '@reduxjs/toolkit'
import { accountReducer } from '../account/accountSlice'
import { transferReducer } from '../transfer/transferSlice'

export const rootStore = configureStore({
    reducer: {
        account: accountReducer,
        transfer: transferReducer,
    },
})

export type AppDispatch = typeof rootStore.dispatch
export type RootState = ReturnType<(typeof rootStore)['getState']>
