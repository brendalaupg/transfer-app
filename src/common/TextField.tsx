import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../constants/colors'
import { Validator } from './validator/types'
import { TextInput, TextInputProps } from 'react-native-paper'

interface TextFieldProps extends TextInputProps {
    title: string
    helperText?: string
    validator?: Validator
}

const TextField = (props: TextFieldProps) => {
    const { title, value, helperText, validator } = props

    const [isValid, setIsValid] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')

    const _onChangeText = (text: string) => {
        props.onChangeText?.(text)

        if (validator) {
            const { isValid: _isValid, errorMessage: _errorMessage } =
                validator.validate(text)
            setIsValid(_isValid)
            setErrorMessage(_errorMessage)
        }
    }

    return (
        <View testID={props.testID} style={styles.container}>
            <TextInput
                label={title}
                mode={'outlined'}
                value={value}
                testID={`${props.testID}.input`}
                returnKeyType={props.returnKeyType ?? 'next'}
                onChangeText={_onChangeText}
                {...props}
            />
            <Text
                testID={`${props.testID}.helper_text`}
                style={[
                    styles.helperText,
                    !isValid && errorMessage && styles.errorText,
                ]}
            >
                {errorMessage ? errorMessage : helperText}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 4,
    },
    title: {
        fontWeight: 'bold',
    },
    textInput: {
        flex: 1,
        height: 48,
        borderColor: COLORS.contentSecondary,
        borderWidth: 1,
        borderRadius: 8,
        padding: 8,
    },
    helperText: {
        fontSize: 12,
        color: COLORS.contentSecondary,
    },
    errorText: {
        color: COLORS.error,
    },
})

export default TextField
