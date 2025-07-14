import { useNavigation } from '@react-navigation/native'
import React, { memo } from 'react'
import { IconButton } from 'react-native-paper'

const CloseButtonHeader = () => {
    const navigation = useNavigation()

    const onPressClose = () => {
        const parent = navigation.getParent()

        if (!parent) {
            console.log('Navigation: unable to find parent')
            return
        }

        if (parent.canGoBack()) {
            parent.goBack()
        } else {
            console.error('Navigation: unable to close stack')
        }
    }

    return (
        <IconButton size={28} icon={'close'} onPress={() => onPressClose()} />
    )
}

export default memo(CloseButtonHeader)
