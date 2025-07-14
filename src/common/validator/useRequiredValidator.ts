import { Validation, Validator } from './types'

const useRequiredValidator = (): Validator => {
    const validate = (text: string): Validation => {
        if (text) {
            return {
                isValid: true,
                errorMessage: '',
            }
        } else {
            return {
                isValid: false,
                errorMessage: 'This field is required',
            }
        }
    }

    return {
        validate,
    }
}

export default useRequiredValidator
