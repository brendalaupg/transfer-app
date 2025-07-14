import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { memo } from 'react'
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

type NavigationProp = NativeStackNavigationProp<
    TransferStackParamList,
    'TransferScreen'
>

// TODO: Setup and UI
const TransferScreen = () => {
    const { navigate } = useNavigation<NavigationProp>()

    const onPressSubmit = () => {
        navigate('ReviewTransferScreen')
    }

    const onPressContacts = () => {}

    const renderRecipientInput = () => (
        <TextInput
            mode={'outlined'}
            label={'Recipient (Phone Number)'}
            numberOfLines={1}
            keyboardType={'number-pad'}
            right={
                <TextInput.Icon
                    icon={'account-outline'}
                    onPress={() => onPressContacts()}
                />
            }
        />
    )

    const renderAmountInput = () => (
        <TextInput mode={'outlined'} label={'Amount'} placeholder={'RM0.00'} />
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
