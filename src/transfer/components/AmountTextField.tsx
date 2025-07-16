import React, { useEffect, useState } from 'react'
import { TextInput, StyleSheet, View } from 'react-native'
import Typography from '../../common/Typography'
import { COLORS } from '../../constants/colors'

/**
 *
 * @returns Custom Text Field Input, for handling currency amount
 */

const MAX_LENGTH: number = 8

interface AmountTextFieldProps {
    value?: number
    onChange?: (amount: number) => void
}

const AmountTextField = (props: AmountTextFieldProps) => {
    const { value, onChange } = props

    useEffect(() => {
        if (value) {
            setFormattedValue(value.toFixed(2))
        }
    }, [value])

    const [formattedValue, setFormattedValue] = useState<string | undefined>(
        value?.toFixed(2)
    )

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

        const formattedString = _value.toFixed(2)
        onChange?.(_value)
        setFormattedValue(formattedString)
    }

    const renderPrefix = () => (
        <Typography variant={'header'} size={'extra-large'}>
            {'RM'}
        </Typography>
    )

    const renderTextInput = () => (
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
    )

    return (
        <View>
            <Typography style={styles.title} variant={'label'} size={'medium'}>
                {'Amount'}
            </Typography>
            <View style={styles.content}>
                {renderPrefix()}
                {renderTextInput()}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
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
    title: {
        color: COLORS.contentSecondary,
    },
    textInput: {
        flex: 1,
        width: '100%',
        color: COLORS.contentPrimary,
        fontSize: 28,
        fontWeight: 'bold',
    },
})

export default AmountTextField
