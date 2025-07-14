import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { memo, useState } from 'react'
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from 'react-native'
import { TransferStackParamList } from '../types'
import { Button, TextInput } from 'react-native-paper'
import Typography from '../../common/Typography'
import TextField from '../../common/TextField'
import usePhoneValidation from '../../common/validator/usePhoneNumberValidator'
import useMinMaxValidator from '../../common/validator/useMinMaxValidator'
import AmountTextField from '../components/AmountTextField'

type NavigationProp = NativeStackNavigationProp<
    TransferStackParamList,
    'TransferScreen'
>

const TEST_ID_PREFIX = 'transfer_screen'

const TransferScreen = () => {
    const { navigate } = useNavigation<NavigationProp>()

    const [amount, setAmount] = useState<number>()
    const [phoneNumber, setPhoneNumber] = useState<string>('')
    const [note, setNote] = useState<string>('')

    const amountValidator = useMinMaxValidator(0, 1_000_000)
    const phoneNumberValidator = usePhoneValidation()

    const onPressSubmit = () => {
        if (!amount) {
            return
        }

        if (!phoneNumberValidator.validate(phoneNumber)) {
            return
        }

        if (amountValidator.validate(amount.toString())) {
            return
        }

        navigate('ReviewTransferScreen', {
            transferInfo: {
                amount,
                recipiantName: 'John Doe',
                recipiant: phoneNumber,
                note,
            },
        })
    }

    // const onPressContacts = () => {}

    const renderRecipientInput = () => (
        <TextField
            testID={`${TEST_ID_PREFIX}.recipient_input`}
            title={'Recipient (Phone Number)'}
            numberOfLines={1}
            value={phoneNumber}
            keyboardType={'number-pad'}
            validator={phoneNumberValidator}
            onChangeText={setPhoneNumber}
        />
    )

    const renderAmountInput = () => (
        <AmountTextField value={amount} onChange={setAmount} />
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
                        {'Transfer'}
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
})
