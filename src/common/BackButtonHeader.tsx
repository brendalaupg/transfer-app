import { useNavigation } from '@react-navigation/native'
import React, { memo } from 'react'
import { IconButton } from 'react-native-paper'

const BackButtonHeader = () => {
    const navigation = useNavigation()

    const onPressBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack()
        } else {
            console.error('Navigation: unable to go back')
        }
    }

    return <IconButton icon={'chevron-left'} onPress={() => onPressBack()} />
}

export default memo(BackButtonHeader)
