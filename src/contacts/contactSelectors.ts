import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { ContactState } from './types'

const contact = (state: RootState) => state.contact

const ContactSelectors = {
    contacts: createSelector(
        [contact],
        (contact: ContactState) => contact.contacts
    ),
    isPermissionGranted: createSelector(
        [contact],
        (contact: ContactState) => contact.permissionStatus === 'granted'
    ),
}

export default ContactSelectors
