import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { memo } from 'react'
import { Button, SafeAreaView, Text } from 'react-native'
import { TransferStackParamList } from '../types'

type NavigationProp = NativeStackNavigationProp<
    TransferStackParamList,
    'TransferScreen'
>

// TODO: Setup and UI
const TransferScreen = () => {
    const { navigate } = useNavigation<NavigationProp>()

    const onPressSubmit = () => {
        navigate('ReviewTransferScreen')
    }

    return (
        <SafeAreaView>
            <Text>{'Transfer Screen'}</Text>
            <Button
                title={'Go to Review Transfer screen'}
                onPress={() => onPressSubmit()}
            />
        </SafeAreaView>
    )
}

export default memo(TransferScreen)
