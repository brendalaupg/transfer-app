import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import AccountSelectors from '../accountSelectors'
import { StyleSheet, View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import { COLORS } from '../../constants/colors'

const AccountSummary = () => {
    const accountBalance = useSelector(AccountSelectors.balance)
    const accountNumber = useSelector(AccountSelectors.accountNumber)

    const onPressCopyAccountNumber = () => {
        // TODO: copy account number to clipboard
    }

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
