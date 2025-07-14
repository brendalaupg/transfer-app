import { isNumeric } from '../utils'
import { Validation, Validator } from './types'

const useMinMaxValidator = (
    min: number,
    max: number,
    prefix: string = ''
): Validator => {
    const formattedMaxValue = prefix + max.toLocaleString()
    const formattedMinValue = prefix + min.toLocaleString()

    const defaultErrorMessage = `Enter a valid number between ${formattedMinValue} and ${formattedMaxValue}`

    const validate = (text: string): Validation => {
        if (!isNumeric(text)) {
            return {
                isValid: false,
                errorMessage: defaultErrorMessage,
            }
        }

        const value = parseInt(text)
        if (!value) {
            return {
                isValid: false,
                errorMessage: 'This field is required',
            }
        } else if (value > max) {
            return {
                isValid: false,
                errorMessage: `Amount should not be over ${formattedMaxValue}`,
            }
        } else if (value < min) {
            return {
                isValid: false,
                errorMessage: `Amount should not be under ${formattedMinValue}`,
            }
        } else {
            return {
                isValid: true,
                errorMessage: '',
            }
        }
    }

    return {
        validate,
    }
}

export default useMinMaxValidator
