import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { memo } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { TransferStackParamList } from '../types'
import { Button, Divider, Icon, Text } from 'react-native-paper'
import { COLORS } from '../../constants/colors'

type NavigationProp = NativeStackScreenProps<
    TransferStackParamList,
    'SuccessTransferScreen'
>

// TODO: Setup and UI
const SuccessTransferScreen = (props: NavigationProp) => {
    const { route, navigation } = props
    const { transferInfo } = route.params

    const onPressDone = () => {
        const parent = navigation.getParent()

        if (parent && parent.canGoBack()) {
            parent.goBack()
        }
    }

    const transactionInfo = (title: string, label: string) => (
        <View style={styles.transactionInfoContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.label}>{label}</Text>
        </View>
    )

    const renderTransferDetails = () => (
        <View style={styles.transferContainer}>
            {transactionInfo('Transfer ID', transferInfo.id)}
            <Divider />
            {transactionInfo('At', `${transferInfo.createdAt}`)}
            <Divider />
            {transactionInfo('Amount', `${transferInfo.amount}`)}
            <Divider />
            {transactionInfo('From', `${transferInfo.fromAccountNumber}`)}
            <Divider />
            {transactionInfo('To', `${transferInfo.toAccountNumber}`)}
            <Divider />
            {transactionInfo('Recipient Name', `${transferInfo.recipientName}`)}
            <Divider />
            {transactionInfo('Note', `${transferInfo.note}`)}
        </View>
    )

    const renderBottomButtonContainer = () => (
        <View style={styles.buttonContainer}>
            <Divider />
            <Button
                style={styles.button}
                mode={'contained'}
                onPress={() => onPressDone()}
            >
                {'Done'}
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
                    source={'check-circle-outline'}
                    size={100}
                    color={COLORS.success}
                />
                <Text style={styles.successLabel}>{'Transfer Successful'}</Text>
                {renderTransferDetails()}
            </ScrollView>
            {renderBottomButtonContainer()}
        </SafeAreaView>
    )
}

export default memo(SuccessTransferScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundPrimary,
    },
    scrollView: {
        flex: 1,
    },
    scrollViewContent: {
        gap: 12,
        margin: 16,
        alignItems: 'center',
    },
    buttonContainer: {
        height: 70,
        paddingHorizontal: 16,
        paddingTop: 8,
        gap: 8,
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
