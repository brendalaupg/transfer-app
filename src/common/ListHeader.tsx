import React, { memo } from 'react'
import { View, StyleSheet } from 'react-native'
import Typography from './Typography'
import { COLORS } from '../constants/colors'

interface ListHeaderProps {
    title: string
    testId?: string
}

const ListHeader = (props: ListHeaderProps) => {
    const { title, testId } = props

    return (
        <View testID={testId} style={styles.container}>
            <Typography variant={'header'} size={'extra-large'}>
                {title}
            </Typography>
        </View>
    )
}

export default memo(ListHeader)

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    title: {
        color: COLORS.contentPrimary,
    },
})
