import React, { memo } from 'react'
import { View, StyleSheet } from 'react-native'
import { Transfer, CreateTransfer } from '../types'
import { COLORS } from '../../constants/colors'
import Typography from '../../common/Typography'
import { Divider } from 'react-native-paper'
import { formatToRM } from '../../common/stringUtils'
import { isTransfer } from '../utils/transferUtils'
import { formatPhoneNumber } from '../../common/utils'

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

    const getFormattedPhoneNumber = (item: TransferInfoCardItem) => {
        const phoneNumber = isTransfer(item)
            ? item.toAccountNumber
            : (item as CreateTransfer).recipient

        return formatPhoneNumber(phoneNumber)
    }

    const transferInfo: RowProps[] = [
        {
            title: 'To',
            label: getFormattedPhoneNumber(item),
        },
        {
            title: 'Recipient Name',
            label: isTransfer(item)
                ? item.recipientName
                : (item as CreateTransfer).recipientName,
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
            title: 'From (your account)',
            label: item.fromAccountNumber,
        },
        {
            title: 'Note',
            label: item.note ?? '-',
        },
    ]

    const filteredInfo = transferInfo.filter((value) => value.label)

    const renderRow = (
        key: string,
        isLastRow: boolean,
        title: string,
        label?: string
    ) => (
        <View key={key} style={styles.transactionInfoContainer}>
            <View style={styles.infoContent}>
                <Typography variant={'body'} size={'medium'}>
                    {title}
                </Typography>
                <Typography variant={'header'} size={'medium'}>
                    {label}
                </Typography>
            </View>
            {!isLastRow && <Divider />}
        </View>
    )

    return (
        <View style={styles.container} testID={testId}>
            {filteredInfo.map((value, index) =>
                renderRow(
                    index.toString(),
                    index + 1 === filteredInfo.length,
                    value.title,
                    value.label
                )
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})
