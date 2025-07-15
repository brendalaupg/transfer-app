import React, { memo } from 'react'
import { View, StyleSheet } from 'react-native'
import { Transfer } from '../types'
import { COLORS } from '../../constants/colors'
import Typography from '../../common/Typography'
import { Divider } from 'react-native-paper'
import { formatToRM } from '../../common/stringUtils'

interface TransferInfoCardProps {
    item: Transfer
    testId?: string
}

interface RowProps {
    title: string
    label?: string
}

const TransferInfoCard = (props: TransferInfoCardProps) => {
    const { item, testId } = props

    const info: RowProps[] = [
        {
            title: 'Transfer ID',
            label: item.id,
        },
        {
            title: 'At',
            label: item.createdAt,
        },
        {
            title: 'Amount',
            label: formatToRM(item.amount),
        },
        {
            title: 'From',
            label: item.fromAccountNumber,
        },
        {
            title: 'To',
            label: item.toAccountNumber,
        },
        {
            title: 'Recipient Name',
            label: item.recipientName,
        },
        {
            title: 'Note',
            label: item.note ?? '-',
        },
    ]

    const renderRow = (key: string, title: string, label?: string) => (
        <View key={key} style={styles.transactionInfoContainer}>
            <View style={styles.infoContent}>
                <Typography variant={'body'} size={'medium'}>
                    {title}
                </Typography>
                <Typography variant={'header'} size={'medium'}>
                    {label}
                </Typography>
            </View>
            <Divider />
        </View>
    )

    return (
        <View style={styles.container} testID={testId}>
            {Object.entries(info).map(
                ([key, value]) =>
                    value.label && renderRow(key, value.title, value.label)
            )}
        </View>
    )
}

export default memo(TransferInfoCard)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: COLORS.backgroundSecondary,
        padding: 16,
        borderRadius: 16,
        gap: 8,
    },
    transactionInfoContainer: {
        flex: 1,
        gap: 8,
        paddingVertical: 8,
    },
    infoContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        flex: 1,
        width: '100%',
    },
})
