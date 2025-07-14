import React, { memo } from 'react'
import { IconButton, Text } from 'react-native-paper'
import { COLORS } from '../../constants/colors'
import { StyleSheet, View } from 'react-native'

interface AccountActionViewProps {
    onPressTransfer: () => void
}

const AccountActionView = (props: AccountActionViewProps) => {
    const { onPressTransfer } = props

    const renderTransferButton = () => (
        <View style={styles.actionContainer}>
            <IconButton
                icon={'send'}
                onPress={() => onPressTransfer()}
                containerColor={COLORS.accentPrimary}
                iconColor={COLORS.textOnPrimary}
            />
            <Text style={styles.actionTitle}>{'Transfer'}</Text>
        </View>
    )

    return <View style={styles.container}>{renderTransferButton()}</View>
}

export default memo(AccountActionView)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundPrimary,
        flexDirection: 'row',
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
    },
    actionTitle: {
        fontSize: 16,
        fontWeight: '500',
    },
    actionContainer: {
        alignItems: 'center',
        gap: 4,
    },
})
