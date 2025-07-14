import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { memo } from 'react'
import { Button, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { TransferStackParamList } from '../types'
import { SafeAreaView } from 'react-native-safe-area-context'

type NavigationProp = NativeStackNavigationProp<
    TransferStackParamList,
    'FailedTransferScreen'
>

// TODO: Setup and UI
const FailedTransferScreen = () => {
    const { navigate, getParent } = useNavigation<NavigationProp>()

    const onPressTryAgain = () => {
        navigate('TransferScreen')
    }

    const onPressBack = () => {
        getParent()?.goBack()
    }

    return (
        <SafeAreaView>
            <Text>{'Failed Transfer Screen'}</Text>
            <Button
                title={'Go to Transfer screen'}
                onPress={() => onPressTryAgain()}
            />
            <Button
                title={'Go to Account screen'}
                onPress={() => onPressBack()}
            />
        </SafeAreaView>
    )
}

export default memo(FailedTransferScreen)
