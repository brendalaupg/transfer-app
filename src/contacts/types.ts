export interface ContactItem {
    id: string
    name: string
    phoneNumber: string
}

export interface ContactState {
    contacts: ContactItem[]
    permissionStatus: 'granted' | 'denied' | 'undetermined'
}

export type ContactScreenMode = 'list' | 'selection'
