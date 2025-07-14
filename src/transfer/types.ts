import { ContactItem } from '../contacts/types'

export interface Transfer {
    id: string
    createdAt: string
    fromAccountNumber: string
    toAccountNumber: string
    recipientName: string
    amount: number
    note?: string
}

export interface CreateTransfer {
    amount: number
    recipiantName: string
    recipiant: string
    note?: string
}

export type TransferStackParamList = {
    TransferScreen: {
        contact?: ContactItem
    }
    ReviewTransferScreen: {
        transferInfo: CreateTransfer
    }
    SuccessTransferScreen: undefined
    FailedTransferScreen: undefined
    TransferHistoryScreen: undefined
    ContactListScreen: undefined
}

export interface TransferState {
    transferHistory: Transfer[]
}
