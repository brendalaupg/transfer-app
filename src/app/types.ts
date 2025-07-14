export interface Recipient {
    id: string
    accountNumber: string
    name: string
}

export interface TransferInfo {
    amount: number
    recipiant: string
    note?: number
}

export interface Transaction {
    id: string
    createdAt: string
    updatedAt?: string
    amount: number
    recipiant: string
}
