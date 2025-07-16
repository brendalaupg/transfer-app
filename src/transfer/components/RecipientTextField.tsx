import React, { useEffect, useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { ContactItem } from '../../contacts/types'
import Typography from '../../common/Typography'
import { IconButton } from 'react-native-paper'
import { COLORS } from '../../constants/colors'
import { formatPhoneNumber, validateMYPhoneNumber } from '../../common/utils'

interface RecipientTextFieldProps {
    recipient?: ContactItem
    onPressContact: () => void
}

const RecipientTextField = (props: RecipientTextFieldProps) => {
    const { recipient, onPressContact } = props

    const [isValid, setIsValid] = useState<boolean>(false)

    const displayPhoneNumber = formatPhoneNumber(recipient?.phoneNumber ?? '')

    useEffect(() => {
        if (recipient) {
            const result = validateMYPhoneNumber(recipient.phoneNumber)
            setIsValid(result)
        }
    }, [recipient])

    const onChangeText = (text: string) => {
        const result = validateMYPhoneNumber(text)
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
                value={displayPhoneNumber}
                onChangeText={onChangeText}
                keyboardType={'phone-pad'}
                editable={false}
            />
        </View>
    )

    const renderContactButton = () => (
        <View>
            <IconButton
                icon={'account'}
                size={24}
                containerColor={COLORS.accentPrimary}
                iconColor={COLORS.contentOnPrimary}
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
                    {'Invalid Phone Number. Must be +60'}
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
        color: COLORS.contentSecondary,
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
        color: COLORS.contentDisabled,
    },
    nameText: {
        color: COLORS.accentPrimary,
    },
    errorText: {
        color: COLORS.error,
    },
})
