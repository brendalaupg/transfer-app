export const isNumeric = (value: unknown): boolean => {
    if (value === null || value === undefined) {
        return false
    }

    return !isNaN(Number(value)) && !isNaN(parseFloat(String(value)))
}
