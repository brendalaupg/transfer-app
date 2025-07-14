import { configureStore } from '@reduxjs/toolkit'
import { accountReducer } from './accountSlice'

export const rootStore = configureStore({
    reducer: {
        account: accountReducer,
    },
})

export type AppDispatch = typeof rootStore.dispatch
export type RootState = ReturnType<(typeof rootStore)['getState']>
