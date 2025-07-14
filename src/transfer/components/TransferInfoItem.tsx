import React, { memo } from 'react'
import { StyleSheet, View } from 'react-native'
import Typography from '../../common/Typography'

interface TransferInfoProps {
    title: string
    value?: string
}

const TransferInfoItem = (props: TransferInfoProps) => {
    const { title, value } = props

    return (
        <View style={styles.container}>
            <Typography variant={'body'} size={'medium'}>
                {title}
            </Typography>
            <Typography variant={'label'} size={'large'}>
                {value}
            </Typography>
        </View>
    )
}

export default memo(TransferInfoItem)

const styles = StyleSheet.create({
    container: {
        gap: 4,
    },
})
