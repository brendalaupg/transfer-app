import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ReviewTransferScreen from '../screens/ReviewTransferScreen'
import SuccessTransferScreen from '../screens/SuccessTransferScreen'
import TransferScreen from '../screens/TransferScreen'
import FailedTransferScreen from '../screens/FailedTransferScreen'
import { TransferStackParamList } from '../types'

const Stack = createNativeStackNavigator<TransferStackParamList>()

export default function TransferStackNavigator() {
    return (
        <Stack.Navigator initialRouteName={'TransferScreen'}>
            <Stack.Screen name={'TransferScreen'} component={TransferScreen} />
            <Stack.Screen
                name={'ReviewTransferScreen'}
                component={ReviewTransferScreen}
            />
            <Stack.Screen
                name={'SuccessTransferScreen'}
                component={SuccessTransferScreen}
            />
            <Stack.Screen
                name={'FailedTransferScreen'}
                component={FailedTransferScreen}
            />
        </Stack.Navigator>
    )
}
