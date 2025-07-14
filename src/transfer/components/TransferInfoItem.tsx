import React, { memo } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

interface TransferInfoProps {
    title: string
    value?: string
}

const TransferInfoItem = (props: TransferInfoProps) => {
    const { title, value } = props

    return (
        <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    )
}

export default memo(TransferInfoItem)

const styles = StyleSheet.create({
    title: {
        fontSize: 17,
        fontWeight: '400',
    },
    value: {
        fontSize: 20,
        fontWeight: '500',
    },
})
