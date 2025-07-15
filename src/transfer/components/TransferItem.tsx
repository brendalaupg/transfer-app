import React, { memo } from 'react'
import { Transfer } from '../types'
import Typography from '../../common/Typography'
import { COLORS } from '../../constants/colors'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-paper'
import { formatToRM } from '../../common/stringUtils'

interface TransferItemProps {
    item: Transfer
    index: number
    onPress: (transfer: Transfer) => void
}

const TransferItem = (props: TransferItemProps) => {
    const { item, index, onPress } = props

    const renderLeadingIcon = () => (
        <View style={styles.leadingIcon}>
            <Icon size={30} source={'call-made'} />
        </View>
    )

    const renderTrailingIcon = () => (
        <Icon size={24} source={'chevron-right'} color={COLORS.textSecondary} />
    )

    return (
        <TouchableOpacity key={index} onPress={() => onPress(item)}>
            <View style={styles.container}>
                {renderLeadingIcon()}
                <View style={styles.itemContent}>
                    <Typography
                        style={styles.title}
                        variant={'body'}
                        size={'large'}
                    >
                        {item.recipientName}
                    </Typography>
                    <Typography
                        style={styles.label}
                        variant={'title'}
                        size={'medium'}
                    >
                        {formatToRM(item.amount)}
                    </Typography>
                </View>
                {renderTrailingIcon()}
            </View>
        </TouchableOpacity>
    )
}

export default memo(TransferItem)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        marginHorizontal: 16,
        gap: 16,
        backgroundColor: COLORS.backgroundSecondary,
        borderRadius: 16,
        marginVertical: 4,
        alignItems: 'center',
    },
    itemContent: {
        flex: 1,
        gap: 4,
    },
    title: {
        color: COLORS.textPrimary,
    },
    label: {
        color: COLORS.textSecondary,
    },
    leadingIcon: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: COLORS.accentSecondary,
    },
})
