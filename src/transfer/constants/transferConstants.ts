import { Transfer, TransferState } from '../types'

export const TRANSFER_INITIAL_STATE: TransferState = {
    transferHistory: [],
}

export const MOCK_TRANSFER_LIST: Transfer[] = [
    {
        id: 'txn_001',
        createdAt: '2025-07-14T10:30:00Z',
        fromAccountNumber: '123-456-789',
        toAccountNumber: '987-654-321',
        recipientName: 'Alice Tan',
        amount: 250.75,
        note: 'Monthly rent',
    },
    {
        id: 'txn_002',
        createdAt: '2025-07-13T15:45:00Z',
        fromAccountNumber: '123-456-789',
        toAccountNumber: '555-666-777',
        recipientName: 'Jason Lee',
        amount: 100.0,
    },
    {
        id: 'txn_003',
        createdAt: '2025-07-12T08:20:00Z',
        fromAccountNumber: '321-654-987',
        toAccountNumber: '888-999-000',
        recipientName: 'Nadia Wong',
        amount: 567.89,
        note: 'Gift',
    },
]
