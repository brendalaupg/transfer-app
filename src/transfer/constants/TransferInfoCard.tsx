import React, { memo } from 'react'
import { View, StyleSheet } from 'react-native'
import { Transfer, CreateTransfer } from '../types'
import { COLORS } from '../../constants/colors'
import Typography from '../../common/Typography'
import { Divider } from 'react-native-paper'
import { formatToRM } from '../../common/stringUtils'

type TransferInfoCardItem = Transfer | CreateTransfer

interface TransferInfoCardProps {
    item: TransferInfoCardItem
    testId?: string
}

interface RowProps {
    title: string
    label?: string
}

const TransferInfoCard = (props: TransferInfoCardProps) => {
    const { item, testId } = props

    // Helper to check if item is Transfer
    const isTransfer = (obj: TransferInfoCardItem): obj is Transfer => {
        return 'id' in obj && 'createdAt' in obj
    }

    const info: RowProps[] = [
        {
            title: 'To',
            label: isTransfer(item)
                ? item.toAccountNumber
                : (item as CreateTransfer).recipiant,
        },
        {
            title: 'Recipient Name',
            label: isTransfer(item)
                ? item.recipientName
                : (item as CreateTransfer).recipiantName,
        },
        {
            title: 'Transfer ID',
            label: isTransfer(item) ? item.id : undefined,
        },
        {
            title: 'At',
            label: isTransfer(item)
                ? new Date(item.createdAt).toLocaleString('en-MY')
                : undefined,
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
            {info.map(
                (value, idx) =>
                    value.label &&
                    renderRow(idx.toString(), value.title, value.label)
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
