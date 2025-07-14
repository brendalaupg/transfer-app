import React, { useState } from 'react'
import { TextInput, StyleSheet, View } from 'react-native'
import Typography from '../../common/Typography'
import { COLORS } from '../../constants/colors'

/**
 *
 * @returns Custom Text Field Input, for handling currency amount
 */

const MAX_LENGTH = 10 // Maximum length for the input, adjust as needed

interface AmountTextFieldProps {
    value?: number
    onChange?: (amount: number) => void
}

const AmountTextField = (props: AmountTextFieldProps) => {
    const { value, onChange } = props

    const [formattedValue, setFormattedValue] = useState<string>()

    const onChangeText = (text: string) => {
        if (!text) {
            onChange?.(0)
            setFormattedValue('')
            return
        }
        const cleaned = text.replace(/\D/g, '')

        const limited = cleaned.slice(0, MAX_LENGTH)
        const cents = parseInt(limited || '0', 10) // fallback to 0 if empty
        const _value = cents / 100

        const formattedString = `${_value.toFixed(2)}`
        onChange?.(_value)
        setFormattedValue(formattedString)
    }

    return (
        <View style={styles.container}>
            <Typography
                style={styles.currency}
                variant={'header'}
                size={'extra-large'}
            >
                {'RM'}
            </Typography>
            <View style={styles.amountContainer}>
                {!value && (
                    <Typography
                        style={styles.placeholder}
                        variant={'header'}
                        size={'extra-large'}
                    >
                        {'0.00'}
                    </Typography>
                )}
                <TextInput
                    value={formattedValue}
                    style={styles.textInput}
                    onChangeText={onChangeText}
                    keyboardType={'numeric'}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    amountContainer: {
        flex: 1,
        alignItems: 'center',
    },
    placeholder: {
        position: 'absolute',
        color: 'grey',
        left: 0,
    },
    currency: {},
    textInput: {
        flex: 1,
        width: '100%',
        color: COLORS.textPrimary,
        fontSize: 28,
        fontWeight: 'bold',
    },
})

export default AmountTextField
