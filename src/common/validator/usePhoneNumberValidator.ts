import { Validation, Validator } from './types'

/** Phone number reference from https://ihateregex.io/expr/phone/ */
const REGEX = '^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$'

export const EXAMPLE_PHONE_NUMBER = '+60174329603'

const usePhoneValidation = (): Validator => {
    const validate = (phone: string): Validation => {
        if (!phone.match(REGEX)) {
            return {
                isValid: false,
                errorMessage: `Enter a valid number e.g ${EXAMPLE_PHONE_NUMBER}`,
            }
        }

        return {
            isValid: true,
            errorMessage: '',
        }
    }

    return {
        validate,
    }
}

export default usePhoneValidation
