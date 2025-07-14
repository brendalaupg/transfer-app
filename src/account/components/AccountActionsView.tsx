import React, { memo } from 'react'
import { IconButton, Text } from 'react-native-paper'
import { COLORS } from '../../constants/colors'
import { StyleSheet, View } from 'react-native'

interface AccountActionViewProps {
    onPressTransfer: () => void
    onPressContact: () => void
    onPressHistory: () => void
}

const AccountActionView = (props: AccountActionViewProps) => {
    const { onPressTransfer, onPressContact, onPressHistory } = props

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

    const renderContactButton = () => (
        <View style={styles.actionContainer}>
            <IconButton
                icon={'account'}
                onPress={() => onPressContact()}
                containerColor={COLORS.accentSecondary}
                iconColor={COLORS.textOnSecondary}
            />
            <Text style={styles.actionTitle}>{'Contacts'}</Text>
        </View>
    )

    const renderHistoryButton = () => (
        <View style={styles.actionContainer}>
            <IconButton
                icon={'history'}
                onPress={() => onPressHistory()}
                containerColor={COLORS.accentSecondary}
                iconColor={COLORS.textOnSecondary}
            />
            <Text style={styles.actionTitle}>{'History'}</Text>
        </View>
    )

    return (
        <View style={styles.container}>
            {renderTransferButton()}
            {renderContactButton()}
            {renderHistoryButton()}
        </View>
    )
}

export default memo(AccountActionView)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundSecondary,
        flexDirection: 'row',
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
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
