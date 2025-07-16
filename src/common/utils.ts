export const isNumeric = (value: unknown): boolean => {
    if (value === null || value === undefined) {
        return false
    }

    return !isNaN(Number(value)) && !isNaN(parseFloat(String(value)))
}
export const validateMYPhoneNumber = (phone: string) => {
    const cleaned = phone
        .trim()
        .replace(/^(\+)?|[^\d]/g, (_, plus) => (plus ? '+' : ''))

    // Check if it starts with +60, 60, or 01 and is followed by 9 or 10 digits (Malaysian numbers)
    // or starts with 01 and is followed by 8 or 9 digits (local Malaysian format)
    const malaysianPhoneRegex = /^(?:\+60\d{9,10}|60\d{9,10}|01\d{8,9})$/
    return malaysianPhoneRegex.test(cleaned)
}
