import { createSlice } from '@reduxjs/toolkit'
import { CONTACT_INITIAL_STATE } from './contactConstants'

const contactSlice = createSlice({
    name: 'contact',
    initialState: CONTACT_INITIAL_STATE,
    reducers: {
        setContacts(state, action) {
            state.contacts = action.payload
        },
    },
})

export const ContactActions = contactSlice.actions
export const contactReducer = contactSlice.reducer
