export const formatToRM = (
    value: number,
    showFractionDigits: boolean = true
) => {
    if (isNaN(value)) return 'RM 0.00'
    return (
        'RM ' +
        Number(value).toLocaleString('en-MY', {
            minimumFractionDigits: showFractionDigits ? 2 : 0,
            maximumFractionDigits: showFractionDigits ? 2 : 0,
        })
    )
}
