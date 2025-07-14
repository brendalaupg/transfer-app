import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TransferScreen from '../screens/TransferScreen'
import ReviewTransferScreen from '../screens/ReviewTransferScreen'
import FailedTransferScreen from '../screens/FailedTransferScreen'
import SuccessTransferScreen from '../screens/SuccessTransferScreen'

export type TransferStackParamList = {
    TransferScreen: undefined
    ReviewTransferScreen: undefined
    SuccessTransferScreen: undefined
    FailedTransferScreen: undefined
}

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
