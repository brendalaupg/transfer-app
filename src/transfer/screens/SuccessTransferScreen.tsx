import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { memo } from 'react'
import { Button, SafeAreaView, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { TransferStackParamList } from '../types'

type NavigationProp = NativeStackNavigationProp<
    TransferStackParamList,
    'SuccessTransferScreen'
>

// TODO: Setup and UI
const SuccessTransferScreen = () => {
    const { getParent } = useNavigation<NavigationProp>()

    const onPressDone = () => {
        getParent()?.goBack()
    }

    return (
        <SafeAreaView>
            <Text>{'Success Transfer Screen'}</Text>
            <Button
                title={'Go back to Account screen'}
                onPress={() => onPressDone()}
            />
        </SafeAreaView>
    )
}

export default memo(SuccessTransferScreen)
