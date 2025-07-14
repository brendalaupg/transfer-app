export interface ContactItem {
    name: string
    phoneNumber: string
}

export interface ContactState {
    contacts: ContactItem[]
    isPermissionGranted: boolean
}
