import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { memo } from 'react'
import { Button, Text, View } from 'react-native'
import { TransferStackParamList } from '../navigators/TransferStackNavigator'
import { useNavigation } from '@react-navigation/native'

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
        <View>
            <Text>{'Success Transfer Screen'}</Text>
            <Button
                title={'Go back to Account screen'}
                onPress={() => onPressDone()}
            />
        </View>
    )
}

export default memo(SuccessTransferScreen)
