import React, { memo } from 'react'
import { Button, Text, View } from 'react-native'
import { MainStackParamList } from '../navigators/MainStackNavigator'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'

type NavigationProp = NativeStackNavigationProp<
    MainStackParamList,
    'AccountDashboard'
>

// TODO: Setup and UI
const AccountDashboard = () => {
    const { navigate } = useNavigation<NavigationProp>()

    const onPressTransfer = () => {
        navigate('TransferStack')
    }

    return (
        <View>
            <Text>{'Account Dashboard'}</Text>
            <Button
                title="To Transfer Screen"
                onPress={() => onPressTransfer()}
            />
        </View>
    )
}

export default memo(AccountDashboard)
