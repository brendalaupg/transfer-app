export interface ContactItem {
    id: string
    name: string
    phoneNumber: string
}

export interface ContactState {
    contacts: ContactItem[]
    isContactLoading: boolean
    permissionStatus: 'granted' | 'denied' | 'undetermined'
}
