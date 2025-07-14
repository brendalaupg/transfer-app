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

type NavigationProp = NativeStackNavigationProp<
    TransferStackParamList,
    'TransferScreen'
>

const TEST_ID_PREFIX = 'transfer_screen'

// TODO: Setup and UI
const TransferScreen = () => {
    const { navigate } = useNavigation<NavigationProp>()

    const [amount, setAmount] = useState<number>()
    const [phoneNumber, setPhoneNumber] = useState<string>('')

    const amountValidator = useMinMaxValidator(0, 1_000_000)
    const phoneNumberValidator = usePhoneValidation()

    const onPressSubmit = () => {
        navigate('ReviewTransferScreen')
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
        <TextField
            testID={`${TEST_ID_PREFIX}.recipient_input`}
            title={'Amount'}
            numberOfLines={1}
            value={amount?.toString()}
            keyboardType={'number-pad'}
            validator={amountValidator}
            onChangeText={(text) => setAmount(Number(text))}
        />
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
                    />
                    <Button mode={'contained'} onPress={() => onPressSubmit()}>
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
