import { useNavigation } from '@react-navigation/native'
import React, { memo } from 'react'
import { TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-paper'
import { COLORS } from '../constants/colors'

const CloseButtonHeader = () => {
    const navigation = useNavigation()

    const onPressClose = () => {
        const parent = navigation.getParent()

        if (!parent) {
            console.error('Navigation: unable to find parent')
            return
        }

        if (parent.canGoBack()) {
            parent.goBack()
        } else {
            console.error('Navigation: unable to close stack')
        }
    }

    return (
        <TouchableOpacity onPress={onPressClose}>
            <Icon size={28} source={'close'} color={COLORS.contentPrimary} />
        </TouchableOpacity>
    )
}

export default memo(CloseButtonHeader)
