import { createSlice } from '@reduxjs/toolkit'
import { ACCOUNT_INITIAL_STATE } from '../constants/initialState'

const contactSlice = createSlice({
    name: 'contact',
    initialState: ACCOUNT_INITIAL_STATE,
    reducers: {
        setContacts(state, action) {
            state.contacts = action.payload
        },
    },
})

export const ContactActions = contactSlice.actions
export const contactReducer = contactSlice.reducer
