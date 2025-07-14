import React, { memo, useState } from 'react'
import { useSelector } from 'react-redux'
import AccountSelectors from '../accountSelectors'
import { StyleSheet, View } from 'react-native'
import { IconButton, Portal, Snackbar, Text } from 'react-native-paper'
import { COLORS } from '../../constants/colors'
import * as Clipboard from 'expo-clipboard'

const AccountSummary = () => {
    const accountBalance = useSelector(AccountSelectors.balance)
    const accountNumber = useSelector(AccountSelectors.accountNumber)

    const [isSnackbarVisible, setIsSnackbarVisible] = useState<boolean>(false)

    const onPressCopyAccountNumber = async () => {
        try {
            const result = await Clipboard.setStringAsync(accountNumber)

            if (result) {
                console.log('copied!')
                setIsSnackbarVisible(true)
            } else {
                throw Error('Unable to copy account number')
            }
        } catch (error) {
            console.error('onPressCopyAccountNumber:', error)
        }
    }

    // We'll keep the snackbar here for now, since its only used in this case atm
    const renderSnackbar = () => (
        <Portal>
            <Snackbar
                visible={isSnackbarVisible}
                onDismiss={() => {
                    setIsSnackbarVisible(false)
                }}
            >
                {`Account number ${accountNumber} copied!`}
            </Snackbar>
        </Portal>
    )

    return (
        <View style={styles.container}>
            <Text style={styles.labelTitle}>{'Account Balance'}</Text>
            <Text style={styles.label}>{accountBalance}</Text>
            <View style={styles.accountNumberContainer}>
                <Text style={styles.label}>{accountNumber}</Text>
                <IconButton
                    icon={'content-copy'}
                    onPress={() => onPressCopyAccountNumber()}
                />
            </View>
            {renderSnackbar()}
        </View>
    )
}

export default memo(AccountSummary)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundPrimary,
        borderRadius: 16,
        padding: 16,
        gap: 4,
    },
    labelTitle: {
        fontSize: 16,
        fontWeight: '500',
    },
    label: {
        fontSize: 20,
        fontWeight: '400',
    },
    accountNumberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})
