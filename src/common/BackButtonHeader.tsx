import { useNavigation } from '@react-navigation/native'
import React, { memo } from 'react'
import { TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-paper'
import { COLORS } from '../constants/colors'

const BackButtonHeader = () => {
    const navigation = useNavigation()

    const onPressBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack()
        } else {
            console.error('Navigation: unable to go back')
        }
    }

    return (
        <TouchableOpacity onPress={onPressBack}>
            <Icon
                size={32}
                source={'chevron-left'}
                color={COLORS.contentPrimary}
            />
        </TouchableOpacity>
    )
}

export default memo(BackButtonHeader)
