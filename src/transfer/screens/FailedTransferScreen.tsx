import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { memo } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { TransferStackParamList } from '../types'
import { COLORS } from '../../constants/colors'
import { Button, Divider, Icon, Text } from 'react-native-paper'
import { MOCK_TRANSFER_LIST } from '../constants/transferConstants'

type NavigationProp = NativeStackNavigationProp<
    TransferStackParamList,
    'FailedTransferScreen'
>

// TODO: Setup and UI
const FailedTransferScreen = () => {
    const { navigate, getParent } = useNavigation<NavigationProp>()

    // TODO: setup actual transfer
    const transferInfo = MOCK_TRANSFER_LIST[1]

    const onPressTryAgain = () => {
        navigate('TransferScreen')
    }

    const onPressBack = () => {
        getParent()?.goBack()
    }

    const transactionInfo = (title: string, label: string) => (
        <View style={styles.transactionInfoContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.label}>{label}</Text>
        </View>
    )

    const renderTransferDetails = () => (
        <View style={styles.transferContainer}>
            {transactionInfo('Amount', `${transferInfo.amount}`)}
            <Divider />
            {transactionInfo('From', `${transferInfo.fromAccountNumber}`)}
            <Divider />
            {transactionInfo('To', `${transferInfo.toAccountNumber}`)}
            <Divider />
            {transactionInfo('Recipient Name', `${transferInfo.recipientName}`)}
            {transferInfo.note && (
                <>
                    <Divider />
                    {transactionInfo('Note', `${transferInfo.note}`)}
                </>
            )}
        </View>
    )

    const renderBottomButtonContainer = () => (
        <View style={styles.buttonContainer}>
            <Divider />
            <Button mode={'contained'} onPress={() => onPressTryAgain()}>
                {'Try Again'}
            </Button>
            <Button mode={'contained-tonal'} onPress={() => onPressBack()}>
                {'Back to Account Dashboard'}
            </Button>
        </View>
    )

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContent}
            >
                <Icon
                    source={'close-outline'}
                    size={100}
                    color={COLORS.error}
                />
                <Text style={styles.successLabel}>{'Transfer Failed'}</Text>
                {renderTransferDetails()}
            </ScrollView>
            {renderBottomButtonContainer()}
        </SafeAreaView>
    )
}

export default memo(FailedTransferScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundPrimary,
    },
    scrollView: {
        flex: 1,
    },
    buttonContainer: {
        height: 70,
        paddingHorizontal: 16,
        paddingTop: 8,
        gap: 8,
    },
    scrollViewContent: {
        gap: 12,
        margin: 16,
        alignItems: 'center',
    },
    transferContainer: {
        flex: 1,
        width: '100%',
        gap: 12,
        backgroundColor: COLORS.backgroundSecondary,
        padding: 16,
        borderRadius: 16,
    },
    transactionInfoContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        width: '100%',
    },
    title: {
        fontSize: 16,
        fontWeight: 400,
    },
    label: {
        fontSize: 16,
        fontWeight: 600,
    },
    successLabel: {
        fontWeight: '700',
        fontSize: 28,
    },
})
