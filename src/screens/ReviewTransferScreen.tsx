import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { memo } from 'react'
import { Button, Text, View } from 'react-native'
import { TransferStackParamList } from '../navigators/TransferStackNavigator'
import { useNavigation } from '@react-navigation/native'

type NavigationProp = NativeStackNavigationProp<
    TransferStackParamList,
    'ReviewTransferScreen'
>

// TODO: Setup and UI
const ReviewTransferScreen = () => {
    const { navigate } = useNavigation<NavigationProp>()

    const onPressFailed = () => {
        navigate('FailedTransferScreen')
    }

    const onPressSuccess = () => {
        navigate('SuccessTransferScreen')
    }

    return (
        <View>
            <Text>{'Success Transfer Screen'}</Text>
            <Button
                title={'Go to Success screen'}
                onPress={() => onPressSuccess()}
            />
            <Button
                title={'Go to Failed screen'}
                onPress={() => onPressFailed()}
            />
        </View>
    )
}

export default memo(ReviewTransferScreen)
