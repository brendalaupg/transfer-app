export type TransferStackParamList = {
    TransferScreen: undefined
    ReviewTransferScreen: undefined
    SuccessTransferScreen: undefined
    FailedTransferScreen: undefined
}

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
    recipiant: string
    note?: number
}

export interface TransferState {
    transferHistory: Transfer[]
}
