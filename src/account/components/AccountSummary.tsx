import React, { memo, useState } from 'react'
import { useSelector } from 'react-redux'
import AccountSelectors from '../accountSelectors'
import { StyleSheet, View } from 'react-native'
import { IconButton, Portal, Snackbar } from 'react-native-paper'
import { COLORS } from '../../constants/colors'
import * as Clipboard from 'expo-clipboard'
import Typography from '../../common/Typography'
import { formatToRM } from '../../common/stringUtils'

const AccountSummary = () => {
    const accountBalance = useSelector(AccountSelectors.balance)
    const accountNumber = useSelector(AccountSelectors.accountNumber)

    const [isSnackbarVisible, setIsSnackbarVisible] = useState<boolean>(false)

    const onPressCopyAccountNumber = async () => {
        try {
            const result = await Clipboard.setStringAsync(accountNumber)

            if (result) {
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

    const renderAccountBalance = () => (
        <>
            <Typography variant={'body'} size={'medium'}>
                {'Account Balance'}
            </Typography>
            <Typography variant={'title'} size={'extra-large'}>
                {formatToRM(accountBalance)}
            </Typography>
        </>
    )

    const renderAccountNumber = () => (
        <View style={styles.accountNumberContainer}>
            <Typography variant={'body'} size={'medium'}>
                {accountNumber}
            </Typography>
            <IconButton
                icon={'content-copy'}
                size={20}
                onPress={() => onPressCopyAccountNumber()}
            />
        </View>
    )

    return (
        <View style={styles.container}>
            {renderAccountBalance()}
            {renderAccountNumber()}
            {renderSnackbar()}
        </View>
    )
}

export default memo(AccountSummary)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundSecondary,
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    accountNumberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})
