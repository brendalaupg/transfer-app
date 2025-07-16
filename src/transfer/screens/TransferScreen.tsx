import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { memo, useState } from 'react'
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    View,
} from 'react-native'
import { TransferStackParamList } from '../types'
import { Button, Divider } from 'react-native-paper'
import Typography from '../../common/Typography'
import AmountTextField from '../components/AmountTextField'
import { useSelector } from 'react-redux'
import AccountSelectors from '../../account/accountSelectors'
import { ContactItem } from '../../contacts/types'
import { formatToRM } from '../../common/stringUtils'
import { COLORS } from '../../constants/colors'
import RecipientTextField from '../components/RecipientTextField'
import NoteTextField from '../components/NoteTextField'

type NavigationProp = NativeStackScreenProps<
    TransferStackParamList,
    'TransferScreen'
>

const TransferScreen = (props: NavigationProp) => {
    const { navigation, route } = props
    const { prefill } = route?.params || {}

    const contact = prefill && 'phoneNumber' in prefill ? prefill : undefined
    const isPrefillTransfer = prefill && 'recipient' in prefill
    const initialAmount = isPrefillTransfer ? prefill.amount : undefined
    const initialNote = isPrefillTransfer ? prefill.note ?? '' : ''
    const initialRecipient = isPrefillTransfer
        ? prefill.recipient
        : contact?.phoneNumber || ''

    const [amount, setAmount] = useState<number | undefined>(initialAmount)
    const [recipient, setRecipient] = useState<ContactItem | undefined>(contact)
    const [phoneNumber, setPhoneNumber] = useState<string>(initialRecipient)
    const [note, setNote] = useState<string>(initialNote)

    const balanceAmount = useSelector(AccountSelectors.balance)
    const fromAccountNumber = useSelector(AccountSelectors.accountNumber)

    // Validation
    const isValidAmount = (amount ?? 0) <= balanceAmount

    const hasRecipientOrPhone = !!recipient || !!phoneNumber.trim()
    const hasValidAmount =
        typeof amount === 'number' && amount > 0 && isValidAmount

    const isFormValid = hasRecipientOrPhone && hasValidAmount

    const onPressSubmit = () => {
        if (!hasRecipientOrPhone) {
            console.error('Recipient or phone number is required')
            return
        }

        if (!amount) {
            console.error('Amount is required')
            return
        }

        if (amount <= 0) {
            console.error('Amount must be greater than zero')
            return
        }

        if (!isValidAmount) {
            console.error('Amount exceeds balance')
            return
        }

        navigation?.navigate('ReviewTransferScreen', {
            transferInfo: {
                amount,
                recipientName: contact?.name,
                recipient: phoneNumber,
                note,
                fromAccountNumber,
            },
        })
    }

    const onSelectContact = (contact: ContactItem) => {
        setRecipient(contact)
    }

    const onPressContacts = () => {
        navigation.navigate('ContactSelectionScreen', {
            onSelect: onSelectContact,
        })
    }

    const renderRecipientInput = () => (
        <RecipientTextField
            onPressContact={onPressContacts}
            recipient={recipient}
            clearRecipient={() => {
                setRecipient?.(undefined)
            }}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
        />
    )

    const renderAmountInput = () => (
        <View style={styles.amountContainer}>
            <AmountTextField value={amount} onChange={setAmount} />
            <View style={styles.amountSubtitleContainer}>
                <Typography
                    variant={'body'}
                    size={'small'}
                >{`Balance: ${formatToRM(balanceAmount)}`}</Typography>
                {!isValidAmount && (
                    <Typography
                        style={styles.error}
                        variant={'label'}
                        size={'small'}
                    >
                        {'over balance amount'}
                    </Typography>
                )}
            </View>
        </View>
    )

    const renderNoteInput = () => (
        <NoteTextField note={note} setNote={setNote} />
    )

    const renderTransferButton = () => (
        <View style={styles.buttonContainer}>
            <Button
                disabled={!isFormValid}
                mode={'contained'}
                onPress={() => onPressSubmit()}
            >
                {'Transfer'}
            </Button>
        </View>
    )

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.keyboardAvoidingView}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollViewContent}
                    keyboardShouldPersistTaps={'handled'}
                    keyboardDismissMode={'on-drag'}
                    showsVerticalScrollIndicator={false}
                >
                    <Typography variant={'header'} size={'extra-large'}>
                        {'New Transfer'}
                    </Typography>
                    {renderRecipientInput()}
                    <Divider />
                    {renderAmountInput()}
                    <Divider />
                    {renderNoteInput()}
                    <Divider />
                </ScrollView>
                {renderTransferButton()}
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default memo(TransferScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundSecondary,
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollViewContent: {
        gap: 12,
        margin: 16,
    },
    error: {
        color: COLORS.error,
    },
    amountContainer: {
        flex: 1,
        gap: 4,
    },
    amountSubtitleContainer: {
        flexDirection: 'row',
        gap: 4,
    },
    buttonContainer: {
        marginHorizontal: 16,
        marginBottom: 16,
    },
})
