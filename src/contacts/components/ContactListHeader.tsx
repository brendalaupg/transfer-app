import React, { memo } from 'react'
import { View, StyleSheet } from 'react-native'
import Typography from '../../common/Typography'

const ContactListHeader = () => {
    return (
        <View style={styles.container}>
            <Typography variant={'header'} size={'extra-large'}>
                {'Your Contacts'}
            </Typography>
        </View>
    )
}

export default memo(ContactListHeader)

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
})
