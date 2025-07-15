import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit'
import { CONTACT_INITIAL_STATE } from './contactConstants'
import { ContactState } from './types'
import { getContactPermission } from './contactsAsyncThunk'

const contactSlice = createSlice({
    name: 'contact',
    initialState: CONTACT_INITIAL_STATE,
    reducers: {
        setContacts(state, action) {
            state.contacts = action.payload
        },
        setIsContactLoading(state, action) {
            state.isContactLoading = action.payload
        },
    },
    extraReducers(builder: ActionReducerMapBuilder<ContactState>) {
        builder.addCase(getContactPermission.fulfilled, (state, action) => {
            state.contacts = action.payload.flatMap((contact) =>
                (contact.phoneNumbers ?? []).map((phone) => ({
                    id: contact.id ?? '',
                    name: contact.name ?? '',
                    phoneNumber: phone.number ?? '',
                }))
            )
            state.permissionStatus = 'granted'
            state.isContactLoading = false
        })
        builder.addCase(getContactPermission.rejected, (state) => {
            state.contacts = []
            state.permissionStatus = 'denied'
            state.isContactLoading = false
        })
    },
})

export const ContactActions = contactSlice.actions
export const contactReducer = contactSlice.reducer
