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
    fromAccountNumber: string
}

export type TransferStackParamList = {
    TransferScreen: {
        prefill?: ContactItem | CreateTransfer
    }
    ReviewTransferScreen: {
        transferInfo: CreateTransfer
    }
    SuccessTransferScreen: {
        transferInfo: Transfer
    }
    FailedTransferScreen: {
        transferInfo: CreateTransfer
        error?: string
    }
    ContactListScreen: undefined
}

export interface TransferState {
    transferHistory: Transfer[]
}
