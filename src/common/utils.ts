export const isNumeric = (value: unknown): boolean => {
    if (value === null || value === undefined) {
        return false
    }

    return !isNaN(Number(value)) && !isNaN(parseFloat(String(value)))
}
export const validatePhoneNumber = (phone: string) => {
    const cleaned = phone
        .trim()
        .replace(/^(\+)?|[^\d]/g, (_, plus) => (plus ? '+' : ''))

    // Check if it starts with +60 and is followed by 9 or 10 digits (Malaysian numbers)
    const malaysianPhoneRegex = /^\+60\d{9,10}$/
    return malaysianPhoneRegex.test(cleaned)
}
