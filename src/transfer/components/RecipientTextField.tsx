import React, { Dispatch, SetStateAction, useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { ContactItem } from '../../contacts/types'
import Typography from '../../common/Typography'
import { IconButton } from 'react-native-paper'
import { COLORS } from '../../constants/colors'

interface RecipientTextFieldProps {
    recipient?: ContactItem
    phoneNumber?: string
    onPressContact: () => void
    clearRecipient?: () => void
    setPhoneNumber: Dispatch<SetStateAction<string>>
}

/** Phone number reference from https://ihateregex.io/expr/phone/ */
const PHONE_REGEX = '^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$'

const RecipientTextField = (props: RecipientTextFieldProps) => {
    const {
        recipient,
        phoneNumber,
        onPressContact,
        clearRecipient,
        setPhoneNumber,
    } = props

    const [isValid, setIsValid] = useState<boolean>(false)

    const displayPhoneNumber = (
        recipient?.phoneNumber ??
        phoneNumber ??
        ''
    ).replace(/[^0-9]/g, '')

    const onChangeText = (text: string) => {
        const numericText = text.replace(/[^0-9]/g, '')
        clearRecipient?.()
        setPhoneNumber(numericText)
        const result = RegExp(PHONE_REGEX).test(numericText)
        setIsValid(result)
    }

    const renderRecipiantInput = () => (
        <View style={styles.textFieldContent}>
            <Typography
                style={styles.nameText}
                size={'large'}
                variant={'label'}
            >
                {recipient?.name}
            </Typography>
            <TextInput
                style={styles.textInput}
                placeholder={'0123456789'}
                value={displayPhoneNumber}
                onChangeText={onChangeText}
                keyboardType={'phone-pad'}
            />
        </View>
    )

    const renderContactButton = () => (
        <View>
            <IconButton
                icon={'account'}
                size={24}
                containerColor={COLORS.accentPrimary}
                iconColor={COLORS.textOnPrimary}
                onPress={() => onPressContact()}
            />
            <Typography size={'small'} variant={'label'}>
                {'Contacts'}
            </Typography>
        </View>
    )

    const renderHelperText = () => (
        <>
            <Typography
                style={styles.helperText}
                size={'small'}
                variant={'body'}
            >
                {'Send via Duitnow'}
            </Typography>
            {!!displayPhoneNumber.length && !isValid && (
                <Typography
                    style={styles.errorText}
                    size={'small'}
                    variant={'body'}
                >
                    {'Invalid Phone Number'}
                </Typography>
            )}
        </>
    )

    return (
        <View style={styles.container}>
            <Typography style={styles.title} size={'medium'} variant={'label'}>
                {'Recipient'}
            </Typography>
            <View style={styles.content}>
                {renderRecipiantInput()}
                {renderContactButton()}
            </View>
            {renderHelperText()}
        </View>
    )
}

export default RecipientTextField

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        color: COLORS.textSecondary,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textFieldContent: {
        flex: 1,
    },
    textInput: {
        fontSize: 28,
    },
    helperText: {
        color: COLORS.textDisabled,
    },
    nameText: {
        color: COLORS.accentPrimary,
    },
    errorText: {
        color: COLORS.error,
    },
})
