import { ContactItem } from '../types'

export const isContactItem = (item: unknown): item is ContactItem => {
    if (!item) {
        return false
    }

    if (
        typeof item === 'object' &&
        item !== null &&
        'phoneNumber' in item &&
        'name' in item
    ) {
        return true
    }
    return false
}
