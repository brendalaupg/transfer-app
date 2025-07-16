import { CreateTransfer } from '../types'

export const isCreateTransfer = (item: unknown): item is CreateTransfer => {
    if (!item) {
        return false
    }

    if (typeof item !== 'object') {
        return false
    }

    if (
        'amount' in item &&
        'fromAccountNumber' in item &&
        'recipient' in item
    ) {
        return true
    }
    return false
}
