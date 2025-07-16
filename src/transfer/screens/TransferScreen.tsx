import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { memo, useEffect, useState } from 'react'
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    View,
} from 'react-native'
import { CreateTransfer, TransferStackParamList } from '../types'
import { Button, Divider } from 'react-native-paper'
import Typography from '../../common/Typography'
import AmountTextField from '../components/AmountTextField'
import { useSelector } from 'react-redux'
import AccountSelectors from '../../account/accountSelectors'
import { formatToRM } from '../../common/stringUtils'
import { COLORS } from '../../constants/colors'
import RecipientTextField from '../components/RecipientTextField'
import NoteTextField from '../components/NoteTextField'
import { ContactItem } from '../../contacts/types'
import { isCreateTransfer } from '../utils/transferUtils'

type NavigationProp = NativeStackScreenProps<
    TransferStackParamList,
    'TransferScreen'
>

type Prefill = ContactItem | CreateTransfer | undefined

const TransferScreen = (props: NavigationProp) => {
    const { navigation, route } = props
    const { prefill } = route?.params || {}

    const [recipient, setRecipiant] = useState<ContactItem | undefined>()
    const [amount, setAmount] = useState<number | undefined>()
    const [note, setNote] = useState<string>('')

    const prefillInitialForm = (prefill: Prefill) => {
        if (!prefill) {
            return
        }

        if (isCreateTransfer(prefill)) {
            const {
                amount,
                note,
                recipient: _recipient,
                recipientName,
            } = prefill
            setAmount(amount)
            setNote(note ?? '')
            setRecipiant({
                id: _recipient ?? '', // Use phone number as id if no better id is available
                name: recipientName ?? '',
                phoneNumber: _recipient ?? '',
            })
        }
    }

    useEffect(() => {
        prefillInitialForm(prefill)
    }, [prefill])

    const balanceAmount = useSelector(AccountSelectors.balance)
    const fromAccountNumber = useSelector(AccountSelectors.accountNumber)

    // Validation
    const isValidAmount = (amount ?? 0) <= balanceAmount
    const hasValidAmount =
        typeof amount === 'number' && amount > 0 && isValidAmount

    const isFormValid = hasValidAmount && recipient

    const onPressSubmit = () => {
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
                recipientName: recipient?.name,
                recipient: recipient?.phoneNumber ?? '',
                note,
                fromAccountNumber,
            },
        })
    }

    const onPressContacts = () => {
        navigation.goBack()
    }

    const renderRecipientInput = () => (
        <RecipientTextField
            onPressContact={onPressContacts}
            recipient={recipient}
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
