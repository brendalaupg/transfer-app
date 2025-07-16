import { CreateTransfer, Transfer } from '../types'

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

export const isTransfer = (item: unknown): item is Transfer => {
    if (!item) {
        return false
    }

    if (typeof item !== 'object') {
        return false
    }

    if ('id' in item && 'createdAt' in item) {
        return true
    }
    return false
}
