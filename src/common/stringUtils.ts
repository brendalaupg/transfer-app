export const formatToRM = (
    value: number,
    showFractionDigits: boolean = true
) => {
    if (isNaN(value)) return 'RM 0.00'
    const prefix = value < 0 ? '-RM ' : 'RM '
    return (
        prefix +
        Math.abs(Number(value)).toLocaleString('en-MY', {
            minimumFractionDigits: showFractionDigits ? 2 : 0,
            maximumFractionDigits: showFractionDigits ? 2 : 0,
        })
    )
}
