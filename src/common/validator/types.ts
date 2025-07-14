export interface Validation {
    isValid: boolean
    errorMessage: string
}

export interface Validator {
    validate: (text: string) => Validation
}

export interface TextFieldValidation {
    isValid: boolean
    errorMessage: string
}
