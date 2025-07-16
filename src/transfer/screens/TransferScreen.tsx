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
import { Button, TextInput } from 'react-native-paper'
import Typography from '../../common/Typography'
import TextField from '../../common/TextField'
import usePhoneValidation from '../../common/validator/usePhoneNumberValidator'
import AmountTextField from '../components/AmountTextField'
import { useSelector } from 'react-redux'
import AccountSelectors from '../../account/accountSelectors'
import { ContactItem } from '../../contacts/types'
import { formatToRM } from '../../common/stringUtils'
import { COLORS } from '../../constants/colors'

type NavigationProp = NativeStackScreenProps<
    TransferStackParamList,
    'TransferScreen'
>

const TEST_ID_PREFIX = 'transfer_screen'

const TransferScreen = (props: NavigationProp) => {
    const { navigation, route } = props
    const { prefill } = route?.params || {}

    const contact = prefill && 'phoneNumber' in prefill ? prefill : undefined
    const isPrefillTransfer = prefill && 'recipiant' in prefill
    const initialAmount = isPrefillTransfer ? prefill.amount : undefined
    const initialNote = isPrefillTransfer ? prefill.note ?? '' : ''
    const initialRecipient = isPrefillTransfer
        ? prefill.recipiant
        : contact?.phoneNumber || ''

    const [amount, setAmount] = useState<number | undefined>(initialAmount)
    const [recipiant, setRecipiant] = useState<ContactItem | undefined>(contact)
    const [phoneNumber, setPhoneNumber] = useState<string>(initialRecipient)
    const [note, setNote] = useState<string>(initialNote)

    const balanceAmount = useSelector(AccountSelectors.balance)
    const fromAccountNumber = useSelector(AccountSelectors.accountNumber)

    const phoneNumberValidator = usePhoneValidation()

    const isValidAmount = (amount ?? 0) <= balanceAmount

    const onPressSubmit = () => {
        if (!amount) {
            console.error('Amount is required')
            return
        }

        if (!isValidAmount) {
            console.error('Amount is above current balance')
        }

        if (!phoneNumberValidator.validate(phoneNumber)) {
            console.error('Invalid phone number:', phoneNumber)
            return
        }

        if (amount <= 0) {
            console.error('Invalid amount:', amount)
            return
        }

        navigation?.navigate('ReviewTransferScreen', {
            transferInfo: {
                amount,
                recipiantName: contact?.name,
                recipiant: phoneNumber,
                note,
                fromAccountNumber,
            },
        })
    }

    const onSelectContact = (contact: ContactItem) => {
        setRecipiant(contact)
    }

    const onPressContacts = () => {
        navigation.navigate('ContactSelectionScreen', {
            onSelect: onSelectContact,
        })
    }

    const renderRecipientInput = () => (
        <View>
            <TextField
                testID={`${TEST_ID_PREFIX}.recipient_input`}
                title={'Recipient (Phone Number)'}
                numberOfLines={1}
                value={phoneNumber}
                keyboardType={'number-pad'}
                validator={phoneNumberValidator}
                onChangeText={setPhoneNumber}
            />
            <Button onPress={onPressContacts}>{'contacts'}</Button>
        </View>
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
                    {renderAmountInput()}
                    <TextInput
                        mode={'outlined'}
                        label={'Additional Note (optional)'}
                        multiline={true}
                        style={{ minHeight: 150 }}
                        onChangeText={(text) => setNote(text)}
                        value={note}
                        testID={`${TEST_ID_PREFIX}.note_input`}
                    />
                    <Button
                        disabled={!phoneNumber || !amount}
                        mode={'contained'}
                        onPress={() => onPressSubmit()}
                    >
                        {'Transfer'}
                    </Button>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default memo(TransferScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundPrimary,
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
})
