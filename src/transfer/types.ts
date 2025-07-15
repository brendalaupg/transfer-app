import { ContactItem } from '../contacts/types'

export interface Transfer {
    id: string
    createdAt: string
    fromAccountNumber: string
    toAccountNumber: string
    amount: number
    recipientName?: string
    note?: string
}

export interface CreateTransfer {
    amount: number
    recipiantName?: string
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
    PasscodeScreen: {
        transfer: CreateTransfer
    }
}

export interface TransferState {
    transferHistory: Transfer[]
}

export type TransferHistorySectionData = {
    title: string
    data: Transfer[]
}
